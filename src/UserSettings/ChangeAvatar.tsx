import React, { useState, useRef } from 'react';
import firebase from '../config/firebase';
import {
  Grid,
  Icon,
  Image,
  Modal,
  Input,
  Button,
  Message,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import MediaQuery from 'react-responsive';
import { RootState } from '../re-ducks/store';

const ChangeAvatar = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [modal, setModal] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [cropedImage, setCroppedImage] = useState('');
  const [blob, setBlob] = useState<any>('');
  const [form, setForm] = useState(false);
  const [storageRef] = useState(firebase.storage().ref());
  const [userRef] = useState<any>(firebase.auth().currentUser);
  const [metadata] = useState({ contentType: 'image/jpeg' });
  const [uploadedCroppedImage, setUploadedCroppedImage] = useState('');
  const [usersRef] = useState(firebase.firestore().collection('users'));
  const [userName, setUserName] = useState(user && user.displayName);
  const [error, setError] = useState('');
  const avatarEditor: any = useRef(null);

  const updateCroppedImage = () => {
    storageRef
      .child(`avatars/user-${userRef.uid}`)
      .put(blob, metadata)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadURL) => {
          setUploadedCroppedImage(downloadURL);
          userRef
            .updateProfile({
              photoURL: downloadURL,
            })
            .then(() => {
              console.log('photoURL updated');
              usersRef
                .doc(user.uid)
                .update({ avatar: uploadedCroppedImage })
                .then(() => {
                  console.log(uploadedCroppedImage);
                })
                .catch((err) => {
                  console.error(err);
                });
              setModal(false);
            })
            .catch((err: string) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateName = () => {
    if (userName) {
      userRef
        .updateProfile({
          displayName: userName,
        })
        .then(() => {
          console.log('displayName updated');
          usersRef
            .doc(user.uid)
            .update({ name: userName })
            .then(() => {
              console.log(userName);
            })
            .catch((err) => {
              console.error(err);
            });
          setForm(false);
        })
        .catch((err: string) => {
          console.error(err);
        });
    } else {
      setError('1文字以上入力してください');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
    const file = e.target.files[0];
    const reader: any = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setPreviewImage(reader.result);
      });
    }
  };

  const handleCropImage = () => {
    if (avatarEditor.current) {
      avatarEditor.current.getImageScaledToCanvas().toBlob((blob: any) => {
        let imageUrl = URL.createObjectURL(blob);
        setCroppedImage(imageUrl);
        setBlob(blob);
      });
    }
  };

  return (
    <>
      <Button
        style={{ width: '80vw', maxWidth: 400, marginBottom: 10 }}
        onClick={() => setForm(true)}
      >
        ユーザー名変更
      </Button>
      <Button
        style={{ width: '80vw', maxWidth: 400, marginBottom: 10 }}
        onClick={() => setModal(true)}
      >
        プロフィール画像変更
      </Button>
      <Modal
        onClose={() => setForm(false)}
        open={form}
        size='small'
      >
        <Modal.Header>ユーザー名変更</Modal.Header>
        <Modal.Content>
          <Input
            focus
            icon='user'
            iconPosition='left'
            value={userName}
            style={{ width: '100%' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
          {error && <Message>{error}</Message>}
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={updateName}>
            <Icon name='checkmark' /> 保存
          </Button>
          <Button color='red' onClick={() => setForm(false)}>
            <Icon name='remove' /> キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Modal.Header>画像変更</Modal.Header>
        <Modal.Content>
          <Input
            onChange={handleChange}
            fluid
            type='file'
            label='Image'
            name='previewImage'
          />
          <Grid centered stackable columns={2}>
            <Grid.Row centered>
              <Grid.Column className='ui center aligned grid'>
                {previewImage && (
                  <AvatarEditor
                    ref={avatarEditor}
                    image={previewImage}
                    width={120}
                    height={120}
                    border={50}
                    scale={1.2}
                  />
                )}
              </Grid.Column>
              <Grid.Column>
                {cropedImage && (
                  <Image
                    style={{ margin: '3.5em auto' }}
                    width={100}
                    height={100}
                    src={cropedImage}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          {cropedImage && (
            <Button color='green' onClick={updateCroppedImage}>
              <Icon name='save' /> 確定
            </Button>
          )}
          <Button color='green' onClick={handleCropImage}>
            <Icon name='image' /> プレビュー
          </Button>
          <Button color='red' onClick={() => setModal(false)}>
            <Icon name='remove' /> キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ChangeAvatar;
