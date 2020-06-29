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
          const colorArray = userArray.filter((el: any) => el.id === user.uid);
          dispatch(setColors(colorArray[0].color));
        }
      });
    }
  }, [user]);

  return (
    <>
      <div style={{ marginTop: 100 , paddingBottom: 100 }}>
        <Header activeItem='mypage' />
        <Record user={user} />
        <MediaQuery query='(max-width: 670px)'>
          <Footer activeItem='mypage' />
        </MediaQuery>
      </div>
    </>
  );
};

export default MyPage;
