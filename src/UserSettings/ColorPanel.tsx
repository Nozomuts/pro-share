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
      <Button icon='pencil' size='small' color='blue' onClick={()=>setModal(true)} />
      <Modal basic open={modal} onClose={()=>setModal(false)}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label content='color'/>
            <SwatchesPicker color={color} onChange={changeColor} />
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={handleSaveColors}>
            <Icon name='checkmark'/> Save Colors
          </Button>
          <Button color='red' inverted onClick={()=>setModal(false)}>
            <Icon name='remove'/> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ColorPanel;
