import React, { useState, useEffect } from 'react';
import Daily from './Daily';
import Synthesis from './Synthesis';
import firebase from '../config/firebase';
import MediaQuery from 'react-responsive';
import { Button, Message } from 'semantic-ui-react';
import RecordForm from './RecordForm';

const Record = ({ user }: any) => {
  const [dailyRecord, setDailyRecord] = useState([]);
  const [synthesisRecord, setSynthesisRecord] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [recordsRef] = useState(firebase.firestore().collection('records'));

  useEffect(() => {
    if (user) {
      recordsRef.onSnapshot((snapshot: any) => {
        const recordArray = snapshot.docs
          .filter((doc: any) => doc.id === user.uid)
          .map((doc: any) => {
            return doc.data();
          });
        if (recordArray.length > 0) {
          setOpen(recordArray[0].open);
          setSynthesisRecord(recordArray[0].record);
          const date = new Date();
          const y = date.getFullYear();
          const m = date.getMonth() + 1;
          const d = date.getDate();
          const dailyRecordArray = recordArray[0].record.filter((record: any) =>
            String(record.time).includes(`${y}年${m}月${d}日`)
          );
          setDailyRecord(dailyRecordArray);
        }
      });
    }
  }, []);

  const changeOpen = () => {
    if (synthesisRecord.length > 0) {
      recordsRef.doc(user.uid).update({
        open: !open,
      });
      setError('');
    } else {
      setError('公開するデータがありません');
    }
  };

  return (
    <React.Fragment>
      <Button onClick={changeOpen}>{open ? '非公開にする' : '公開する'}</Button>
      {error&&<Message negative>{error}</Message>}
      
      <RecordForm user={user} record={synthesisRecord} />
      <MediaQuery query='(max-width: 670px)'>
        <Button active={toggle} onClick={() => setToggle(true)}>
          合計
        </Button>
        <Button active={!toggle} onClick={() => setToggle(false)}>
          デイリー
        </Button>
        {toggle ? (
          <Synthesis record={synthesisRecord} />
        ) : (
          <Daily record={dailyRecord} />
        )}
      </MediaQuery>
      <MediaQuery query='(min-width: 671px)'>
        <div style={{ display: 'flex', marginBottom: '50px' }}>
          <Daily record={dailyRecord} />
          <Synthesis record={synthesisRecord} />
        </div>
      </MediaQuery>
    </React.Fragment>
  );
};

export default Record;
