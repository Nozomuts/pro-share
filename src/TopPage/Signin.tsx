import React, { useState } from 'react';
import { Grid, Form, Button, Message, Icon } from 'semantic-ui-react';
import firebase, {
  providerTwitter,
  providerFacebook,
  providerGoogle,
} from '../config/firebase';
import { Error } from '../Type';
import Spinner from './../UI/Spinner';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  let displayErrors = () =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((err) => {
          console.error(err);
          setErrors(errors.concat(err));
          setLoading(false);
        });
    }
  };

  const isFormValid = () => email && password;

  const handleInputError = (inputName: string) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  const twitterLogin = () => {
    setSpinner(true);
    firebase
      .auth()
      .signInWithPopup(providerTwitter)
      .then((res: any) => {
        return firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            name: res.user.displayName,
            avatar: res.user.photoURL,
            id: res.user.uid,
            color: '#000',
            favorite: [],
          })
          .then(() => {
            console.log('login');
            setSpinner(false);
          })
          .catch((err: string) => {
            console.error(err);
            setSpinner(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  };

  const facebookLogin = () => {
    setSpinner(true);
    firebase
      .auth()
      .signInWithPopup(providerFacebook)
      .then((res: any) => {
        setSpinner(false);
        return firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            name: res.user.displayName,
            avatar: res.user.photoURL,
            id: res.user.uid,
            color: '#000',
            favorite: [],
          })
          .then(() => {
            console.log('login');
          })
          .catch((err: string) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  };


  const googleLogin = () => {
    setSpinner(true);
    firebase
      .auth()
      .signInWithPopup(providerGoogle)
      .then((res: any) => {
        setSpinner(false);
        return firebase
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set({
            name: res.user.displayName,
            avatar: res.user.photoURL,
            id: res.user.uid,
            color: '#000',
            favorite: [],
          })
          .then(() => {
            console.log('login');
          })
          .catch((err: string) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
      });
  };

  return spinner ? (
    <Spinner />
  ) : (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ width: '60vw' }}>
        <Form onSubmit={handleSubmit} size='large'>
          <Form.Input
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder='メールアドレス'
            onChange={emailChange}
            value={email}
            className={handleInputError('email')}
            type='email'
          />
          <Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='パスワード'
            onChange={passwordChange}
            value={password}
            className={handleInputError('password')}
            type='password'
          />

          <Button
            disabled={loading}
            className={loading ? 'loading' : ''}
            color='green'
            fluid
            size='large'
            style={{marginBottom: 10}}
          >
            ログイン
          </Button>
        </Form>
        <Button color='twitter' onClick={twitterLogin} fluid size='large' style={{marginBottom: 10}}>
          <Icon name='twitter' />
          Twitterでログイン
        </Button>
        <Button color='facebook' onClick={facebookLogin} fluid size='large' style={{marginBottom: 10}}>
          <Icon name='facebook' />
          Facebookでログイン
        </Button>
        <Button color='red' onClick={googleLogin} fluid size='large' style={{marginBottom: 10}}>
          <Icon name='google' />
          Googleでログイン
        </Button>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors()}
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Signin;
