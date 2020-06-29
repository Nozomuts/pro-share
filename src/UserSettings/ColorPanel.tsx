import React, { useState, useEffect } from 'react';
import { Button, Modal, Icon, Label, Segment } from 'semantic-ui-react';
import { SwatchesPicker } from 'react-color';
import firebase from '../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setColors } from '../re-ducks/color/actions';

const ColorPanel = () => {
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState('');
  const [usersRef] = useState(firebase.firestore().collection('users'));
  const user = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.uid) {
      usersRef.onSnapshot((snapshot: any) => {
        const userArray = snapshot.docs.map((doc: any) => {
          return { ...doc.data() };
        });
        if (userArray.filter((el: any) => el.id === user.uid).length > 0) {
          const colorArray = userArray.filter((el: any) => el.id === user.uid);
          setColor(colorArray[0].color);
          dispatch(setColors(colorArray[0].color));
        }
      });
    }
  }, []);

  const changeColor = (color: any) => {
    setColor(color.hex);
  };

  const handleSaveColors = () => {
    if (color) {
      usersRef
        .doc(user.uid)
        .update({
          color: color
        })
        .then(() => {
          console.log('Colors added');
          setModal(false);
        })
        .catch((err: string) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Button style={{ width: '80vw', maxWidth: 400,marginBottom: 10 }} onClick={()=>setModal(true)}>カラー変更</Button>
      <Modal open={modal} style={{ width: 320 }} onClose={()=>setModal(false)}>
        <Modal.Header>カラー変更</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label content='color'/>
            <SwatchesPicker width={250} color={color} onChange={changeColor}/>
          </Segment>
        </Modal.Content>
        <Modal.Actions style={{display: 'flex' }}>
          <Button color='green' onClick={handleSaveColors}>
            <Icon name='checkmark'/> 保存
          </Button>
          <Button color='red' onClick={()=>setModal(false)}>
            <Icon name='remove'/> キャンセル
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ColorPanel;
