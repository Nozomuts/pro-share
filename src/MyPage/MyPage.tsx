import React, { useState, useEffect } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import Record from './Record';
import firebase from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setColors } from './../re-ducks/color/actions';

const MyPage = () => {
  const dispatch = useDispatch();

  const [usersRef] = useState(firebase.firestore().collection('users'));
  const user = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (user && user.uid) {
      usersRef.onSnapshot((snapshot: any) => {
        const userArray = snapshot.docs.map((doc: any) => {
          return { ...doc.data() };
        });
        if (userArray.filter((el: any) => el.id === user.uid).length > 0) {
          const colorArray = userArray.filter(
            (el: any) => el.id === user.uid
          );
          dispatch(
            setColors(colorArray[0].color)
          );
        }
      });
    }
  }, [user]);

  return (
    <React.Fragment>
      <Header activeItem='mypage' />
        <h1 style={{ marginTop: 200 }}>my page</h1>
        <Record user={user} />
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='mypage' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default MyPage;
