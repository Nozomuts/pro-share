import React from 'react';
import Task from './Task';
import firebase from './../config/firebase';
import { useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';

const Daily = ({ record }: any) => {
  const user = useSelector((state: any) => state.user.currentUser);

  let time = 0;
  if (record) {
    record.map((el: any) => {
      time += Number(el.hour) * 60 + Number(el.min);
      return time;
    });
  }

  const deleteRecord = (id: string) => {
    const newRecord = record.filter((el: any) => el.id !== id);
    firebase.firestore().collection('records').doc(user.uid).update({
      record: newRecord,
    });
  };


  const jsx = (
    <div>

      <h3 style={{textAlign: 'center'}}>今日の勉強時間：
      {`${Math.floor(time / 60)}時間${time % 60}分`}</h3>
      {record &&
        record.map((el: any, i: number) => {
          return (
            <Task
              el={el}
              key={i.toString()}
              record={record}
              deleteRecord={deleteRecord}
            />
          );
        })}
    </div>
  );

  return (
    <>
      <MediaQuery query='(min-width: 671px)'>
        <div style={{ width: '35vw', margin: 10 }}>{jsx}</div>
      </MediaQuery>
      <MediaQuery query='(max-width: 670px)'>
        <div style={{ width: '90vw',margin: '10px 5vw' }}>{jsx}</div>
      </MediaQuery>
    </>
  );
};

export default Daily;
