import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { Route, Routes } from 'react-router-dom';
import Menu from './views/Menu';
import NotFound from './views/NotFound';
import Downwind from './views/Actions/Downwind';
import ClearYourSht from './views/Actions/ClearYourSht';
import ForFutureSelf from './views/Actions/ForFutureSelf';
import useAppUser from './data/use-app-user';
import Loading from './views/LoadingComp';
import Conversations from './views/Actions/conversations/Home';
import Conversation from './views/Actions/conversations/Conversation';
import PawsNReflect from './views/Actions/PawsNReflect';
import Journals from './views/Actions/Journals';
import Notifications from './views/Notifications';
import More from './views/More';
import { Toaster } from 'react-hot-toast';

function App() {
  const [appLoaded, setAppLoaded] = useState(false)
  const { loading, appUser } = useAppUser();

  useEffect(() => {
    if (!loading) {
      setAppLoaded(true)
    }
  }, [loading])

  return (
    <div className="App">
      {!appLoaded && <React.Fragment>
        <Loading />
      </React.Fragment>}
      {appLoaded && <React.Fragment>
        <Routes>
          <Route path='/'>
            <Route index element={<Menu appUser={appUser} />} />
            <Route path='downwind' element={<Downwind />} />
            <Route path='clearyoursht' element={<ClearYourSht />} />
            <Route path='forfutureself' element={<ForFutureSelf />} />
            <Route path='/conversations'>
              <Route index element={<Conversations />} />
              <Route path='conversation/:userid/:convId' element={<Conversation />} />
            </Route>
            <Route path='pawsnreflect' element={<PawsNReflect />} />
            <Route path='journals' element={<Journals />} />
            <Route path='/more' element={<More />}>
              <Route path='notifications' element={<Notifications />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </React.Fragment>}
      <Toaster />
    </div>
  );
}

export default App;
