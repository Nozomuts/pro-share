import React, { useEffect, useState } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import RankingRecord from './RankingRecord';
import firebase from './../config/firebase';
import { Button } from 'semantic-ui-react';
import { RankingType } from '../Types';

const Ranking = () => {
  const [synthesisRanking, setSynthesisRanking] = useState<RankingType[]>([]);
  const [dailyRanking, setDailyRanking] = useState<RankingType[]>([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    firebase
      .firestore()
      .collection('records')
      .onSnapshot((snapshot) => {
        const synthesisArray = snapshot.docs
          .filter((doc) => doc.data().open)
          .map((doc) => {
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
            return {
              name: doc.data().name,
              avatar: doc.data().avatar,
              time: hourSum + minSum,
            };
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
    <>
      <div style={{ marginTop: 100, paddingBottom: 100 }}>
        <Header activeItem='ranking' />
        <MediaQuery query='(min-width: 671px)'>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>
              <h1>デイリーランキング</h1>
              <RankingRecord ranking={dailyRanking} />
            </div>
            <div>
              <h1>総合ランキング</h1>
              <RankingRecord ranking={synthesisRanking} />
            </div>
          </div>
        </MediaQuery>
        <MediaQuery query='(max-width: 670px)'>
          <div style={{ width: '90vw', margin: '10px 5vw' }}>
            <h1>勉強時間ランキング</h1>
            <Button
              style={{ width: '45vw', margin: 0 }}
              active={!toggle}
              onClick={() => setToggle(false)}
            >
              デイリー
            </Button>
            <Button
              style={{ width: '45vw', margin: 0 }}
              active={toggle}
              onClick={() => setToggle(true)}
            >
              合計
            </Button>
          </div>
          {toggle ? (
            <RankingRecord ranking={synthesisRanking} />
          ) : (
            <RankingRecord ranking={dailyRanking} />
          )}
          <Footer activeItem='ranking' />
        </MediaQuery>
      </div>
    </>
  );
};

export default Ranking;
