import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom';
import Menu from './views/Menu';
import Layout from './views/Layout';
import NotFound from './views/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
