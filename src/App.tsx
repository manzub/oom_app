import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom';
import Menu from './views/Menu';
import NotFound from './views/NotFound';
import Downwind from './views/Actions/Downwind';
import ClearYourSht from './views/Actions/ClearYourSht';
import ForFutureSelf from './views/Actions/ForFutureSelf';
import useAppUser from './data/use-app-user';
import Loading from './views/LoadingComp';
import Conversations from './views/Actions/conversations/Home';
import NewConversation from './views/Actions/conversations/NewConversation';
import PawsNReflect from './views/Actions/PawsNReflect';
import Journals from './views/Actions/Journals';

function App() {

  const { loading, appUser, updateUserListener } = useAppUser();

  return (
    <div className="App">
      {loading && <React.Fragment>
        <Loading />
      </React.Fragment>}
      {!loading && <React.Fragment>
        <Routes>
          <Route path='/'>
            <Route index element={<Menu appUser={appUser} />} />
            <Route path='downwind' element={<Downwind />} />
            <Route path='clearyoursht' element={<ClearYourSht />} />
            <Route path='forfutureself' element={<ForFutureSelf appUser={appUser} updateListener={updateUserListener} />} />
            <Route path='/conversations'>
              <Route index element={<Conversations />} />
              <Route path='new_conversation' element={<NewConversation />} />
            </Route>
            <Route path='pawsnreflect' element={<PawsNReflect />} />
            <Route path='journals' element={<Journals />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </React.Fragment>}
    </div>
  );
}

export default App;
