import React, { useState } from 'react';
import { Button, Message, Image, Modal, Icon, Input } from 'semantic-ui-react';
import ModalComponent from './ModalComponent';

const Comment = ({ comment, user, changeComment, deleteComment }: any) => {
  const [text, setText] = useState(comment.text);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    if (text) {
      changeComment(comment.id, text);
      setModal(false);
      setError('');
    } else {
      setError('テキストを入力してください');
    }
  };

  return (
    <div style={{ width: '100%', marginBottom: 10 }}>
      <Message>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Image avatar src={comment && comment.avatar} />
            {comment && comment.name}
          </div>
          {comment && comment.time}
        </div>
        <br />
        {comment && comment.text}
        {user.photoURL === comment.avatar && (
          <div style={{ textAlign: 'right' }}>
            <Icon
              name='write'
              onClick={() => setModal(true)}
              style={{ cursor: 'pointer', marginRight: 5 }}
            />
            <ModalComponent
              clickEvent={() => deleteComment(comment.id)}
              text='削除'
              tiny
            />
          </div>
        )}
      </Message>
      <Modal
        size='small'
        onClose={() => setModal(false)}
        open={modal}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
        }}
      >
        <Modal.Content>
          <Input
            focus
            value={text}
            style={{ width: '100%' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
          {error && <Message>{error}</Message>}
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
    </div>
  );
};

export default Comment;
