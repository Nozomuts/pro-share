import React, { useState } from 'react';
import { Input, TextArea, Form, Message, Button } from 'semantic-ui-react';
import firebase from '../config/firebase';
import shortid from 'shortid';

const RecordForm = ({ user, record }: any) => {
  const [title, setTitle] = useState('');
  const [hour, setHour] = useState<any>(0);
  const [min, setMin] = useState<any>(0);
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState(false);

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
      setHour(0);
      setMin(0);
      setForm(false)
    }
  };

  return (
    <React.Fragment>
      <Button onClick={()=>setForm(!form)}>{form?'×閉じる':'＋追加する'}</Button>
      {form&&<Form onSubmit={handleSubmit}>
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
        />時間
        <Input
          value={min}
          type='number'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMin(e.target.value)
          }
        />分
        <TextArea
          value={detail}
          onChange={(e: any) => setDetail(e.target.value)}
        />
        {error && <Message negative>{error}</Message>}
        <Button>追加</Button>
      </Form>}
    </React.Fragment>
  );
};

export default RecordForm;
