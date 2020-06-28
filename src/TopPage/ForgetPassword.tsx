import React, { useState } from 'react';
import firebase from '../config/firebase';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [completeShow, setCompleteShow] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('send');
        setLoading(false);
        setCompleteShow(true);
      });
  };

  return completeShow ? (
    <Grid textAlign='center' verticalAlign='middle' style={{ marginTop: 200 }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon color='green' textAlign='center'>
          <Icon name='user' color='green' />
          パスワード再設定
        </Header>
        <Segment stacked>メールが送信されました、確認してください</Segment>
      </Grid.Column>
      <Message>
      <Link to='/'>
          <Icon name='redo' />
          戻る
        </Link>
      </Message>
    </Grid>
  ) : (
    <Grid textAlign='center' verticalAlign='middle' style={{ paddingTop: 200 }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon color='green' textAlign='center'>
          <Icon name='user' color='green' />
          パスワード再設定
        </Header>
        <Form onSubmit={handleSubmit} size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='メールアドレス'
              onChange={(e) => {
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
          </Segment>
        </Form>
        <Message>
          <Link to='/'>
            <Icon name='redo' />
            戻る
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default ForgetPassword;
