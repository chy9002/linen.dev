import PageLayout from 'components/layout/PageLayout';
import { ThreadByIdProp } from '../../../types/apiResponses/threads/[threadId]';
import { useRef } from 'react';
import { buildThreadSeo } from 'utilities/seo';
import Content from './Content';
import ButtonPagination from 'components/ButtonPagination';
import CustomLinkHelper from 'components/Link/CustomLinkHelper';

export function ThreadPage({
  thread,
  channels,
  communities,
  currentChannel,
  currentCommunity,
  threadUrl,
  isBot,
  isSubDomainRouting,
  settings,
  permissions,
  pagination,
}: ThreadByIdProp) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <PageLayout
      key={thread.id}
      seo={{
        ...buildThreadSeo({
          isSubDomainRouting,
          channelName: currentChannel.channelName,
          messages: thread.messages,
          settings,
          incrementId: thread.incrementId,
          slug: thread.slug || '',
        }),
      }}
      currentChannel={currentChannel}
      channels={channels}
      communities={communities}
      currentCommunity={currentCommunity}
      settings={settings}
      isSubDomainRouting={isSubDomainRouting}
      permissions={permissions}
      innerRef={ref}
    >
      <div className="flex flex-col w-full">
        <Content
          thread={thread}
          currentChannel={currentChannel}
          currentCommunity={currentCommunity}
          threadUrl={threadUrl}
          isBot={isBot}
          isSubDomainRouting={isSubDomainRouting}
          settings={settings}
          permissions={permissions}
        />
        <div className="text-center p-4">
          {pagination?.prev && (
            <ButtonPagination
              href={CustomLinkHelper({
                isSubDomainRouting,
                communityName: settings.communityName,
                communityType: settings.communityType,
                path: `/t/${pagination?.prev.incrementId}/${
                  pagination?.prev.slug?.toLowerCase() || 'topic'
                }`,
              })}
              label="Previous"
            />
          )}
          {pagination?.next && (
            <ButtonPagination
              href={CustomLinkHelper({
                isSubDomainRouting,
                communityName: settings.communityName,
                communityType: settings.communityType,
                path: `/t/${pagination?.next.incrementId}/${
                  pagination?.next.slug?.toLowerCase() || 'topic'
                }`,
              })}
              label="Next"
              className="ml-3"
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
