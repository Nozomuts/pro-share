import React, { useState } from 'react';
import { Button, Form, Input, TextArea, Select, Message, Icon } from 'semantic-ui-react';
import firebase from './../config/firebase';
import shortid from 'shortid';
import {categoryOptions,languageOptions} from '../UI/SelectOptions'

const CreateArticle = ({ user, article }: any) => {
  const [form, setForm] = useState(false);
  const [languageValue, setLanguageValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error,setError]=useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user&&title&&text) {
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
      article.push(newArticle)
      firebase.firestore().collection('articles').doc(user.uid).set({
        article: article,
        id: user.uid,
      });
      setTitle('')
      setText('')
      setCategoryValue('')
      setLanguageValue('')
      setForm(false)
      setError('')
    }else{
      setError('タイトルとテキストを入力してください')
    }
  };


  return (
    <>
      {form ? (
        <div style={{width: '90vw', margin: '0 5vw'}}>
          <Button onClick={() => setForm(false)}>×閉じる</Button>
          <Form onSubmit={handleSubmit}>
            <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <TextArea
              value={text}
              onChange={(e: any) => setText(e.target.value)}
              rows={15}
            />
            <Select
              placeholder='選択してください'
              value={categoryValue}
              options={categoryOptions}
              onChange={(e: any, { value }: any) => setCategoryValue(value)}
            />
            <Select
              search
              selection
              value={languageValue}
              options={languageOptions}
              onChange={(e: any, { value }: any) => setLanguageValue(value)}
              placeholder='Select Language'
            />
            <Button>作成</Button>
          </Form>
            {error&&<Message negative>{error}</Message>}
        </div>
      ) : (
        <Button style={{marginLeft: '5vw'}} onClick={() => setForm(true)}><Icon name="write"/>記事を書く</Button>
      )}
    </>
  );
};

export default CreateArticle;
