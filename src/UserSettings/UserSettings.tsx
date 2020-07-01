import React, { useState } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import ChangeAvatar from './ChangeAvatar';
import ColorPanel from './ColorPanel';
import firebase from '../config/firebase';
import { Button, Input, Modal, Image, Message, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RootState } from '../re-ducks/store';

const UserSettings = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [completeShow, setCompleteShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleClick = () => {
    if (email) {
      setLoading(true);
      setCompleteShow(false);
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('send');
          setLoading(false);
          setCompleteShow(true);
          setEmail('');
        })
        .catch((err: string) => {
          console.error(err);
        });
    } else {
      setError('正しいメールアドレスを入力してください');
    }
  };

  return (
    <>
      <div style={{ marginTop: 100 , paddingBottom: 100 }}>
        <Header activeItem='settings' />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <MediaQuery query='(max-width: 670px)'>
            <Image
              style={{ borderRadius: '50%', width: 100 }}
              src={user && user.photoURL}
            />
            <h2 style={{ textAlign: 'center' }}>{user && user.displayName}</h2>
            <ChangeAvatar />
            <ColorPanel />
            <Button
              style={{ width: '80vw', maxWidth: 400, marginBottom: 10 }}
              onClick={() => setModal(true)}
            >
              パスワード再設定
            </Button>
          </MediaQuery>
          <MediaQuery query='(min-width: 671px)'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 100,
                height: '60vh',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  marginRight: '5vw',
                }}
              >
                <Image
                  style={{
                    borderRadius: '50%',
                    width: 300,
                    margin: '20px auto',
                  }}
                  src={user && user.photoURL}
                />
                <h2 style={{ textAlign: 'center', marginBottom: 10 }}>
                  {user && user.displayName}
                </h2>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  height: '40vh'
                }}
              >
                <ChangeAvatar />
                <ColorPanel />
                <Button
                  style={{ width: '80vw', maxWidth: 400, marginBottom: 10 }}
                  onClick={() => setModal(true)}
                >
                  パスワード再設定
                </Button>
              </div>
            </div>
          </MediaQuery>
        </div>
        <Modal
        onClose={() => setModal(false)}
        open={modal}
        size='small'
      >
        <Modal.Header>パスワード再設定</Modal.Header>
        <Modal.Content>
          <Input
            focus
            placeholder='メールアドレス'
            icon='mail'
            iconPosition='left'
            value={email}
            style={{ width: '100%' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          {error && <Message>{error}</Message>}
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={handleClick} loading={loading}>
            <Icon name='check' /> 送信
          </Button>
          <Button color='red' onClick={() => setModal(false)}>
            <Icon name='remove' /> キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
        {completeShow && <p>メールが送信されました</p>}
        <MediaQuery query='(max-width: 670px)'>
          <Footer activeItem='settings' />
        </MediaQuery>
      </div>
    </>
  );
};

export default UserSettings;
