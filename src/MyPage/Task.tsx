import React, { useState } from 'react';
import {
  Message,
  Button,
  Modal,
  Input,
  TextArea,
  Form,
  Select,
} from 'semantic-ui-react';
import ModalComponent from './../UI/ModalComponent';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { minOptions, hourOptions } from './../UI/SelectOptions';

const Task = ({ el, deleteRecord, record }: any) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(el.title);
  const [detail, setDetail] = useState(el.detail);
  const [hour, setHour] = useState(el.hour);
  const [min, setMin] = useState(el.min);
  const [error, setError] = useState('');
  const user = useSelector((state: any) => state.user.currentUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !detail) {
      setError('値が入力されていません');
    } else {
      if (user) {
        const newRecord = record.map((element: any) => {
          if (element.id === el.id) {
            element.title = title;
            element.detail = detail;
            element.hour = hour;
            element.min = min;
          }
          return element;
        });
        console.log(newRecord);
        firebase
          .firestore()
          .collection('records')
          .doc(user.uid)
          .update({
            record: newRecord,
          })
          .then(() => {
            console.log('Success');
          })
          .catch((err: string) => {
            console.error(err);
          });
        setModal(false);
      }
    }
  };

  return (
    <>
      <Message>
        <p>タイトル：{el.title}</p>
        <p>説明：{el.detail}</p>
        <p>勉強時間：{`${el.hour}時間${el.min}分`}</p>
        <p>{el.time}</p>
        <Button onClick={() => setModal(true)}>編集</Button>
        <ModalComponent text='削除' clickEvent={() => deleteRecord(el.id)} />
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
              <Button style={{width: '50%'}}>変更</Button>
              <Button style={{width: '50%'}} type='button' onClick={() => setModal(false)}>
                キャンセル
              </Button>
            </div>
          </Form>
        </Modal>
      </Message>
    </>
  );
};

export default Task;
