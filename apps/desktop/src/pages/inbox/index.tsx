import 'react';
import Inbox from '../../components/Pages/Inbox';
import { get } from '../../utilities/http';
import { Scope, ThreadState } from '@linen/types';

function App() {
  const fetchInbox = () => {
    return get(
      `/api/v2/inbox?communityName=linen&scope=${Scope.All}&state=${ThreadState.OPEN}&page=1`
    ).then((response) => response.data);
  };

  const fetchThread = () => {
    // TODO add  v2 api
    return get(`/api/v2/todo`);
  };

  const putThread = () => {
    // TODO add v2 api
    return get(`/api/v2/todo`);
  };

  return (
    <Inbox
      fetchInbox={fetchInbox}
      fetchThread={fetchThread}
      putThread={putThread}
    />
  );
}

export default App;
