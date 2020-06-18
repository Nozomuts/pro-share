import React, { useState } from 'react';
import {
  Grid,
  Form,
  Button,
  Message,
} from 'semantic-ui-react';
import firebase from '../config/firebase';
import { Error } from '../Type';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ width: '60vw' }}>
        <Form onSubmit={handleSubmit} size='large'>
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

          <Button
            disabled={loading}
            className={loading ? 'loading' : ''}
            color='violet'
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

export default Signin;
