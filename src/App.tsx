import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TopPage from './TopPage/TopPage';
import MyPage from './MyPage/MyPage';
import Ranking from './Ranking/Ranking';
import ReadArticle from './ReadArticle/ReadArticle';
import WriteArticle from './WriteArticle/WriteArticle';
import Favorites from './Favorites/Favorites';
import UserSettings from './UserSettings/UserSettings';
import firebase from './config/firebase'
import history from './history'

import 'semantic-ui-css/semantic.min.css'

function App() {
  const user=firebase.auth().currentUser
  useEffect(()=>{
    if(!user){
      history.push('/toppage')
    }
  },[])
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/toppage" component={TopPage}/>
        <Route path="/mypage" component={MyPage}/>
        <Route path="/ranking" component={Ranking}/>
        <Route path="/read" component={ReadArticle}/>
        <Route path="/write" component={WriteArticle}/>
        <Route path="/favorites" component={Favorites}/>
        <Route path="/settings" component={UserSettings}/>
        {/* <Route render={()=><h1>404 Page Not Found</h1>}/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
