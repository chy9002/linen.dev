import { findAccountById } from '../../lib/models';
import {
  SyncStatus,
  updateAndNotifySyncStatus,
} from '../../services/syncStatus';
import { fetchToken } from './fetchToken';
import { syncChannels } from './syncChannels';
import { syncUsers } from './syncUsers';
import { fetchAllTopLevelMessages } from './fetchAllTopLevelMessages';
import { saveAllThreads } from './saveAllThreads';

export async function slackSync({
  accountId,
  channelId,
  domain,
}: {
  accountId: string;
  channelId?: string;
  domain?: string;
}) {
  console.log(new Date());

  const account = await findAccountById(accountId);

  if (!account || !account.slackTeamId) {
    throw { status: 404, error: 'Account not found' };
  }

  await updateAndNotifySyncStatus(accountId, SyncStatus.IN_PROGRESS);

  try {
    //TODO test multiple slack authorization or reauthorization
    const token = await fetchToken({ account, domain, accountId });

    // create and join channels
    const channels = await syncChannels({
      account,
      token,
      accountId,
      channelId,
    });

    //paginate and find all the users
    const usersInDb = await syncUsers({ accountId, token, account });

    //fetch and save all top level conversations
    await fetchAllTopLevelMessages({ channels, account, usersInDb, token });

    // Save all threads
    // only fetch threads with single message
    // There will be edge cases where not all the threads are sync'd if you cancel the script
    await saveAllThreads({ channels, token, usersInDb });

    await updateAndNotifySyncStatus(accountId, SyncStatus.DONE);

    return {
      status: 200,
      body: {},
    };
  } catch (err) {
    console.error(err);

    await updateAndNotifySyncStatus(accountId, SyncStatus.ERROR);

    throw {
      status: 500,
      error: String(err),
    };
  }
}
