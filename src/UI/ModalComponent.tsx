import React, { useState } from 'react';
import { Modal, Icon, Button } from 'semantic-ui-react';

const ModalComponent = ({ text, clickEvent }: any) => {
  const [modal, setModal] = useState(false);

  const handleClick=()=>{
    clickEvent()
    setModal(false)
  }
  return (
    <React.Fragment>
      <Button color="red" onClick={()=>setModal(true)}>{text}</Button>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Modal.Content>
          <p>本当に{text}しますか？</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setModal(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={handleClick}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default ModalComponent;
