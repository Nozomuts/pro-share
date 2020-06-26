import React, { useEffect } from 'react';
import './App.css';
import {  Switch, Route } from 'react-router-dom';
import TopPage from './TopPage/TopPage';
import MyPage from './MyPage/MyPage';
import Ranking from './Ranking/Ranking';
import ReadArticle from './ReadArticle/ReadArticle';
import WriteArticle from './WriteArticle/WriteArticle';
import Favorites from './Favorites/Favorites';
import UserSettings from './UserSettings/UserSettings';
import firebase from './config/firebase'
import 'semantic-ui-css/semantic.min.css'
import ForgetPassword from './TopPage/ForgetPassword';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './re-ducks/user/actions';

function App({history}:any) {
  const dispatch = useDispatch()

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        dispatch(setUser(user))
        history.push('/mypage')
      }else{
        history.push('/toppage')
        dispatch(clearUser())
      }
    })
    firebase.firestore().collection('users')
  },[])

  return (
      <Switch>
        <Route path="/toppage" component={TopPage}/>
        <Route path="/mypage" component={MyPage}/>
        <Route path="/ranking" component={Ranking}/>
        <Route path="/read" component={ReadArticle}/>
        <Route path="/write" component={WriteArticle}/>
        <Route path="/favorites" component={Favorites}/>
        <Route path="/settings" component={UserSettings}/>
        <Route path="/forget" component={ForgetPassword}/>
        {/* <Route render={()=><h1>404 Page Not Found</h1>}/> */}
      </Switch>
  );
}


export default App
