import React, { useState } from 'react';
import {
  Message,
  Button,
  Modal,
  Input,
  TextArea,
  Form,
  Select,
  Icon,
} from 'semantic-ui-react';
import ModalComponent from './../UI/ModalComponent';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { minOptions, hourOptions } from './../UI/SelectOptions';
import { RecordType } from '../Types';
import {RootState} from '../re-ducks/store'

type Props = {
  el: RecordType
  deleteRecord: (id: string) => void
  record: RecordType[]
}

const Task:React.FC<Props> = ({ el, deleteRecord, record }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(el.title);
  const [detail, setDetail] = useState(el.detail);
  const [hour, setHour] = useState(el.hour);
  const [min, setMin] = useState(el.min);
  const [error, setError] = useState('');
  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !detail) {
      setError('値が入力されていません');
    } else {
      if (user) {
        const newRecord = record.map((element: RecordType) => {
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
        <div style={{ textAlign: 'right' }}>
          <Button onClick={() => setModal(true)}><Icon name='write'/>編集</Button>
          <ModalComponent text='削除' clickEvent={() => deleteRecord(el.id)} />
        </div>
        <Modal size='small' onClose={() => setModal(false)} open={modal}>
          <Modal.Header>勉強記録追加</Modal.Header>
          <Modal.Content>
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
                  marginBottom: 50,
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: 600,
                  width: '100%',
                }}
              >
                <Button color='green' style={{ width: '50%' }}>
                  <Icon name='check' />
                  保存
                </Button>
                <Button
                  style={{ width: '50%' }}
                  type='button'
                  onClick={() => setModal(false)}
                  color='red'
                >
                  <Icon name='remove' />
                  キャンセル
                </Button>
              </div>
            </Form>
          </Modal.Content>
        </Modal>
      </Message>
    </>
  );
};

export default Task;
