import request from 'superagent';

const token = process.env.PUSH_SERVICE_KEY;
const pushURL = process.env.PUSH_SERVICE_URL;

type PushType = {
  channelId: string;
  threadId: string;
  messageId: string;
  imitationId?: string;
  isThread: boolean;
  isReply: boolean;
};

export type PushMessageType = {
  channel_id: string;
  thread_id: string;
  message_id: string;
  imitation_id: string;
  is_thread: boolean;
  is_reply: boolean;
};
export type CommunityPushType = PushMessageType & {
  community_id: string;
};

export const push = ({
  channelId,
  threadId,
  messageId,
  imitationId,
  isThread,
  isReply,
}: PushType) => {
  return request.post(`${pushURL}/api/message`).send({
    channel_id: channelId,
    thread_id: threadId,
    message_id: messageId,
    imitation_id: imitationId,
    is_thread: isThread,
    is_reply: isReply,
    token,
  });
};

export const pushChannel = ({
  channelId,
  threadId,
  messageId,
  imitationId,
  isThread,
  isReply,
}: PushType) => {
  return request.post(`${pushURL}/api/channel`).send({
    channel_id: channelId,
    thread_id: threadId,
    message_id: messageId,
    imitation_id: imitationId,
    is_thread: isThread,
    is_reply: isReply,
    token,
  });
};

export const pushUserMention = ({
  userId,
  threadId,
  channelId,
}: {
  userId: string;
  threadId: string;
  channelId: string;
}) => {
  return request.post(`${pushURL}/api/user`).send({
    user_id: userId,
    thread_id: threadId,
    channel_id: channelId,
    is_mention: true,
    token,
  });
};

export const pushCommunity = ({
  communityId,
  channelId,
  threadId,
  messageId,
  imitationId,
  isThread,
  isReply,
}: {
  communityId: string;
} & PushType) => {
  if (!communityId) return Promise.resolve();
  return request.post(`${pushURL}/api/community`).send({
    community_id: communityId,
    channel_id: channelId,
    thread_id: threadId,
    message_id: messageId,
    imitation_id: imitationId,
    is_thread: isThread,
    is_reply: isReply,
    token,
  });
};
