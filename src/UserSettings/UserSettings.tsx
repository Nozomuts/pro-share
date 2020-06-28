import React, { useState } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import ChangeAvatar from './ChangeAvatar';
import ColorPanel from './ColorPanel';
import firebase from '../config/firebase';
import { Form, Button, Input } from 'semantic-ui-react';

const UserSettings = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [completeShow, setCompleteShow] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    setCompleteShow(false)
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('send');
        setLoading(false);
        setCompleteShow(true);
        setEmail('')
      }).catch((err:string)=>{
        console.error(err)
      });
  };
  return (
    <React.Fragment>
      <Header activeItem='settings' />
      <h1 style={{ marginTop: '13vh', marginLeft: '7vw' }}>設定</h1>
      <hr />
      <ChangeAvatar />
      <ColorPanel />
      <p>パスワード再設定</p>
      <Form onSubmit={handleSubmit}>
        <Input
          fluid
          name='email'
          icon='mail'
          iconPosition='left'
          placeholder='メールアドレス'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          value={email}
          type='email'
        />
        <Button
          disabled={loading}
          className={loading ? 'loading' : ''}
          color='green'
          fluid
          size='large'
        >
          送る
        </Button>
        {completeShow&&<p>メールが送信されました</p>}
      </Form>
      <MediaQuery query='(max-width: 670px)'>
        <Footer activeItem='settings' />
      </MediaQuery>
    </React.Fragment>
  );
};

export default UserSettings;
