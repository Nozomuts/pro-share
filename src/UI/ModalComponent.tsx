import React, { useState } from 'react';
import { Modal, Icon, Button } from 'semantic-ui-react';

type Props = {
  text: string;
  clickEvent: () => void;
  tiny?: boolean;
};

const ModalComponent:React.FC<Props> = ({ text, clickEvent, tiny }) => {
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    clickEvent();
    setModal(false);
  };
  return (
    <React.Fragment>
      {tiny ? (
        <Icon
          name='trash alternate'
          onClick={() => setModal(true)}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <Button color='red' onClick={() => setModal(true)}>
          {text === '削除' && <Icon name='trash alternate' />}
          {text}
        </Button>
      )}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        size='small'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
        }}
      >
        <Modal.Content>
          <p>本当に{text}しますか？</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={handleClick}>
            <Icon name='checkmark' /> はい
          </Button>
          <Button color='red' onClick={() => setModal(false)}>
            <Icon name='remove' /> いいえ
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default ModalComponent;
