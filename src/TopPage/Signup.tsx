import React, { useState } from 'react';
import md5 from 'md5';
import {
  Grid,
  Form,
  Button,
  Message,
} from 'semantic-ui-react';
import firebase from '../config/firebase';
import { Error } from '../Type';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [loading, setLoading] = useState(false);
  const [userRef] = useState(firebase.firestore().collection('users'));

  const isFormValid = () => {
    let errors: Error[] = [];
    let error: Error;

    if (isFormEmpty()) {
      error = { message: 'Fill in all fields' };
      console.log(error);
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid()) {
      error = { message: 'Password is invalid' };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  const isPasswordValid = () => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  let displayErrors = () =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const passwordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser: any) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                console.log('user saved');
              });
            })
            .catch((err: Error) => {
              console.error(err);
              setErrors(errors.concat(err));
              setLoading(false);
            });
        })
        .catch((err) => {
          console.error(err);
          setErrors(errors.concat(err));
          setLoading(false);
        });
    }
  };

  const saveUser = (createdUser: any) => {
    return userRef.doc(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      id: createdUser.user.uid,
      primary: '#b9c42f',
      secondary: '#eee',
      favorite: [],
    });
  };

  const handleInputError = (inputName: string) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ width: '60vw' }}>
        <Form onSubmit={handleSubmit} size='large'>
          <Form.Input
            fluid
            name='user'
            icon='user'
            iconPosition='left'
            placeholder='Username'
            onChange={usernameChange}
            value={username}
            type='text'
          />
          <Form.Input
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder='Email Address'
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
            placeholder='Password'
            onChange={passwordChange}
            value={password}
            className={handleInputError('password')}
            type='password'
          />
          <Form.Input
            fluid
            name='passwordConfirmation'
            icon='repeat'
            iconPosition='left'
            placeholder='Password Confirmation'
            onChange={passwordConfirmationChange}
            value={passwordConfirmation}
            className={handleInputError('password')}
            type='password'
          />

          <Button
            disabled={loading}
            className={loading ? 'loading' : ''}
            color='orange'
            fluid
            size='large'
          >
            Submit
          </Button>
        </Form>
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

export default Signup;
