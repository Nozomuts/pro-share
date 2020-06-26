import React from 'react';
import { Message } from 'semantic-ui-react';
import ModalComponent from './../UI/ModalComponent';


const Task = ({ el,deleteRecord }: any) => {

  return (
    <React.Fragment>
      <Message>
        <p>{el.title}</p>
        <p>{el.detail}</p>
        <p>{`${el.hour}時間${el.min}分`}</p>
        <p>{el.time}</p>
      <ModalComponent text='削除' clickEvent={()=>deleteRecord(el.id)}/>
      </Message>
    </React.Fragment>
  );
};

export default Task;
