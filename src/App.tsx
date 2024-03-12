import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import GroupList from './components/Header/GroupList/GroupList';

function App() {
  return (
    <div className="page">
      <div className="content">
      <Header/>
      <GroupList/>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
