import React, { useEffect, useState } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import Daily from '../Ranking/Daily';
import Synthesis from '../Ranking/Synthesis';
import firebase from './../config/firebase';
import { Button } from 'semantic-ui-react';

const Ranking = () => {
  const [synthesisRanking, setSynthesisRanking] = useState([]);
  const [dailyRanking, setDailyRanking] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection('records')
      .onSnapshot((snapshot: any) => {
        const synthesisArray = snapshot.docs
          .filter((doc: any) => doc.data().open)
          .map((doc: any) => {
            const hourSum = doc
              .data()
              .record.reduce((result: number, current: any) => {
                return result + Number(current.hour * 60);
              }, 0);
            const minSum = doc
              .data()
              .record.reduce((result: number, current: any) => {
                return result + Number(current.min);
              }, 0);
            return { name: doc.data().name,avatar: doc.data().avatar,time: hourSum + minSum };
          });
        const newSynthesisArray = synthesisArray
          .sort((a: any, b: any) => {
            return a.time - b.time;
          })
          .reverse();
        setSynthesisRanking(newSynthesisArray);

        const dailyArray = snapshot.docs
          .filter((doc: any) => doc.data().open)
          .map((doc: any) => {
            const date = new Date();
            const y = date.getFullYear();
            const m = date.getMonth() + 1;
            const d = date.getDate();
            const hourSum = doc
              .data()
              .record.reduce((result: number, current: any) => {
                if (String(current.time).includes(`${y}年${m}月${d}日`)) {
                  return result + Number(current.hour * 60);
                }
                return result;
              }, 0);
            const minSum = doc
              .data()
              .record.reduce((result: number, current: any) => {
                if (String(current.time).includes(`${y}年${m}月${d}日`)) {
                  return result + Number(current.min);
                }
                return result;
              }, 0);
            return {
              name: doc.data().name,
              avatar: doc.data().avatar,
              time: hourSum + minSum,
            };
          });
        const newDailyArray = dailyArray
          .sort((a: any, b: any) => {
            return a.time - b.time;
          })
          .reverse();
        setDailyRanking(newDailyArray);
      });
  }, []);

  return (
    <React.Fragment>
      <Header activeItem='ranking' />
      <h1 style={{ marginTop: 200 }}>ranking</h1>
      <MediaQuery query='(min-width: 671px)'>
        <Daily ranking={dailyRanking} />
        <Synthesis ranking={synthesisRanking} />
      </MediaQuery>
      <MediaQuery query='(max-width: 670px)'>
        <Button active={toggle} onClick={() => setToggle(true)}>
          合計
        </Button>
        <Button active={!toggle} onClick={() => setToggle(false)}>
          デイリー
        </Button>
        {toggle ? (
          <Synthesis ranking={synthesisRanking} />
        ) : (
          <Daily ranking={dailyRanking} />
        )}
        <Footer activeItem='ranking' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default Ranking;
