import React, { useState, useRef } from 'react';
import firebase from '../config/firebase';
import { Grid, Icon, Image, Modal, Input, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';

const ChangeAvatar = () => {
  const user = useSelector((state:any) => state.user.currentUser);
  const [modal, setModal] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [cropedImage, setCroppedImage] = useState('');
  const [blob, setBlob] = useState<any>('');
  const [storageRef] = useState(firebase.storage().ref());
  const [userRef] = useState<any>(firebase.auth().currentUser);
  const [metadata] = useState({ contentType: 'image/jpeg' });
  const [uploadedCroppedImage, setUploadedCroppedImage] = useState('');
  const [usersRef] = useState(firebase.firestore().collection('users'));
  const [userName, setUserName] = useState(user&&user.displayName);
  const avatarEditor:any = useRef(null);

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
            .catch((err:string) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateName = () => {
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
        setModal(false);
      })
      .catch((err:string) => {
        console.error(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|any>) => {
    const file = e.target.files[0];
    const reader:any = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setPreviewImage(reader.result);
      });
    }
  };

  const handleCropImage = () => {
    if (avatarEditor) {
      avatarEditor.current.getImageScaledToCanvas().toBlob((blob:any) => {
        let imageUrl = URL.createObjectURL(blob);
        setCroppedImage(imageUrl);
        setBlob(blob);
      });
    }
  };

  return (
    <React.Fragment>
      <Image src={user&&user.photoURL} />
      <input style={{border: 'none',lineHeight: 36,height: 36}} value={userName} onChange={e=>setUserName(e.target.value)} onBlur={updateName}/>
      <Button onClick={() => setModal(true)}>変更</Button>
      <Modal basic open={modal} onClose={() => setModal(false)}>
        <Modal.Header>Change Avatar</Modal.Header>
        <Modal.Content>
          <Input
            onChange={handleChange}
            fluid
            type='file'
            label='New Avatar'
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
            <Button color='green' inverted onClick={updateCroppedImage}>
              <Icon name='save' /> 確定
            </Button>
          )}
          <Button color='green' inverted onClick={handleCropImage}>
            <Icon name='image' /> プレビュー
          </Button>
          <Button color='red' inverted onClick={() => setModal(false)}>
            <Icon name='remove' /> キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default ChangeAvatar;
