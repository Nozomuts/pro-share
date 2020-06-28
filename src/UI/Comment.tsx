import React, { useState } from 'react';
import { Button, Message, Image, Modal, Icon, Input } from 'semantic-ui-react';
import ModalComponent from './ModalComponent';

const Comment = ({ comment, user, changeComment, deleteComment }: any) => {
  const [text, setText] = useState(comment.text);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    if(text){
      changeComment(comment.id, text)
      setModal(false)
      setError('')
    }else{
      setError('テキストを入力してください')
    }
  }

  return (
    <>
      <Image avatar src={comment && comment.avatar} />
      {comment && comment.name}
      {comment && comment.time}
      <Message>
        {comment && comment.text}
        {user.photoURL === comment.avatar && (
          <>
            <Button onClick={() => setModal(true)}>
              編集
            </Button>
            <ModalComponent clickEvent={() => deleteComment(comment.id)} text='削除'/>
          </>
        )}
      </Message>
      <Modal onClose={() => setModal(false)} open={modal}>
        <Modal.Content>
          <Input
            focus
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
          {error&&<Message>{error}</Message>}
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
    </>
  );
};

export default Comment;
