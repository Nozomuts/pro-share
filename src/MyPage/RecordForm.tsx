import React, { useState } from 'react';
import {
  Input,
  TextArea,
  Form,
  Message,
  Button,
  Select,
  Modal
} from 'semantic-ui-react';
import firebase from '../config/firebase';
import shortid from 'shortid';
import { hourOptions, minOptions } from '../UI/SelectOptions';

const RecordForm = ({ user, record }: any) => {
  const [title, setTitle] = useState('');
  const [hour, setHour] = useState<any>('');
  const [min, setMin] = useState<any>('');
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !detail) {
      setError('値が入力されていません');
    } else {
      const date = new Date();
      const y = date.getFullYear();
      const mo = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const mi = date.getMinutes();
      const newItem = {
        title: title,
        hour: hour,
        min: min,
        detail: detail,
        time: `${y}年${mo}月${d}日${h}時${mi}分`,
        id: shortid.generate(),
      };
      record.push(newItem);
      firebase.firestore().collection('records').doc(user.uid).set({
        record: record,
        open: false,
        name: user.displayName,
        avatar: user.photoURL,
      });
      setTitle('');
      setDetail('');
      setError('');
      setHour('');
      setMin('');
      setModal(false);
    }
  };

  return (
    <>
      <Button
        style={{
          width: '60vw',
          margin: '30px 20vw',
        }}
        onClick={() => setModal(true)}
      >
        ＋追加する
      </Button>
      <Modal
          style={{ width: '90vw', margin: '0 auto', maxWidth: 700 }}
          onClose={() => setModal(false)}
          open={modal}
        >
          <Form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80vw',
              maxWidth: 600,
              margin: '10px auto',
            }}
          >
            <Input
              style={{ width: '100%', marginBottom: '10px' }}
              placeholder='タイトルを入力'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <TextArea
              placeholder='詳細を入力'
              style={{ width: '100%', marginBottom: '10px' }}
              value={detail}
              onChange={(e: any) => setDetail(e.target.value)}
            />
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Select
                placeholder='選択してください'
                value={hour}
                options={hourOptions}
                onChange={(
                  e: React.SyntheticEvent<HTMLElement, Event>,
                  { value }: any
                ) => setHour(value)}
              />
              時間
              <Select
                placeholder='選択してください'
                value={min}
                options={minOptions}
                onChange={(
                  e: React.SyntheticEvent<HTMLElement, Event>,
                  { value }: any
                ) => setMin(value)}
              />
              分
            </div>

            {error && <Message negative>{error}</Message>}
            <div style={{ display: 'flex', justifyContent: 'center', maxWidth: 600,width: '100%' }}>
              <Button style={{width: '50%'}}>追加</Button>
              <Button style={{width: '50%'}} type='button' onClick={() => setModal(false)}>
                キャンセル
              </Button>
            </div>
          </Form>
        </Modal>
    </>
  );
};

export default RecordForm;
