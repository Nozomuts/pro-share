import React from 'react';
import Task from './Task';
import firebase from './../config/firebase';
import { useSelector } from 'react-redux';

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
  return (
    <div>
      daily
      {`${Math.floor(time / 60)}時間${time % 60}分`}
      {record &&
        record.map((el: any, i: number) => {
          return (
            <Task el={el} key={i.toString()} record={record} deleteRecord={deleteRecord} />
          );
        })}
    </div>
  );
};

export default Daily;
