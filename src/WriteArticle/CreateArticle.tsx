import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  TextArea,
  Select,
  Icon,
  Modal,
  Message,
} from 'semantic-ui-react';
import firebase from './../config/firebase';
import shortid from 'shortid';
import { categoryOptions, languageOptions } from '../UI/SelectOptions';

const CreateArticle = ({ user, article }: any) => {
  const [form, setForm] = useState(false);
  const [languageValue, setLanguageValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && title && text) {
      const newArticle = {
        title: title,
        text: text,
        category: categoryValue,
        language: languageValue,
        id: shortid.generate(),
        time: new Date(),
        name: user.displayName,
        avatar: user.photoURL,
        uid: user.uid,
        comment: [],
      };
      article.push(newArticle);
      firebase.firestore().collection('articles').doc(user.uid).set({
        article: article,
        id: user.uid,
      });
      setTitle('');
      setText('');
      setCategoryValue('');
      setLanguageValue('');
      setForm(false);
      setError('');
    } else {
      setError('タイトルとテキストを入力してください');
    }
  };

  return (
    <>
      <div style={{width: '90vw', maxWidth: 800, margin: '0 auto', marginBottom: 50 }}>
        <Button onClick={() => setForm(true)}>
          <Icon name='write' />
          記事を書く
        </Button>
      </div>
      <Modal
        open={form}
        onClose={() => setForm(false)}
        style={{ width: '90vw', margin: '0 auto', maxWidth: 700 }}
      >
        <Modal.Header>記事作成</Modal.Header>
        <Form
          style={{
            width: '80vw',
            margin: '30px auto',
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <Input
            style={{ width: '100%', marginBottom: 10 }}
            placeholder='タイトルを入力'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <TextArea
            style={{ width: '100%', marginBottom: 10 }}
            placeholder='テキストを入力'
            value={text}
            rows={15}
            onChange={(e: any) => setText(e.target.value)}
          />
          <div style={{ width: '100%', marginBottom: 10 }}>
            <Select
              placeholder='選択してください'
              value={categoryValue}
              options={categoryOptions}
              onChange={(e: any, { value }: any) => setCategoryValue(value)}
              style={{ marginRight: '10px' }}
            />
            <Select
              value={languageValue}
              options={languageOptions}
              onChange={(e: any, { value }: any) => setLanguageValue(value)}
              placeholder='選択してください'
            />
          </div>
          {error&&<Message negative>{error}</Message>}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: 600,
              width: '100%',
            }}
          >
            <Button color='green' style={{ width: '50%' }}><Icon name='check'/>作成</Button>
            <Button
              style={{ width: '50%' }}
              type='button'
              onClick={() => setForm(false)}
              color='red'
            >
              <Icon name='remove'/>
              キャンセル
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateArticle;
