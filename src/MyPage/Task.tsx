import React, { useState } from 'react';
import {
  Message,
  Button,
  Modal,
  Input,
  TextArea,
  Form,
} from 'semantic-ui-react';
import ModalComponent from './../UI/ModalComponent';
import firebase from 'firebase';
import { useSelector } from 'react-redux';

const Task = ({ el, deleteRecord, record }: any) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(el.title);
  const [detail, setDetail] = useState(el.detail);
  const [hour, setHour] = useState(el.hour);
  const [min, setMin] = useState(el.min);
  const user = useSelector((state: any) => state.user.currentUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      console.log(newRecord)
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
  };

  return (
    <React.Fragment>
      <Message>
        <p>{el.title}</p>
        <p>{el.detail}</p>
        <p>{`${el.hour}時間${el.min}分`}</p>
        <p>{el.time}</p>
        <ModalComponent text='削除' clickEvent={() => deleteRecord(el.id)} />
        <Button onClick={() => setModal(true)}>編集</Button>
        <Modal onClose={() => setModal(false)} open={modal}>
          <Form onSubmit={handleSubmit}>
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <Input
              value={hour}
              type='number'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setHour(e.target.value)
              }
            />
            時間
            <Input
              value={min}
              type='number'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMin(e.target.value)
              }
            />
            分
            <TextArea
              value={detail}
              onChange={(e: any) => setDetail(e.target.value)}
            />
            <Button>変更</Button>
            <Button type='button' onClick={() => setModal(false)}>
              キャンセル
            </Button>
          </Form>
        </Modal>
      </Message>
    </React.Fragment>
  );
};

export default Task;
