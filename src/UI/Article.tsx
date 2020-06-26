import React, { useState } from 'react';
import Comment from './Comment';
import { Message, Modal, Header, Button, Image, Input, Form, Select, TextArea } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';
import {categoryOptions,languageOptions} from './SelectOptions'
import ModalComponent from './ModalComponent';


const Article = ({ el, article }: any) => {
  const user = useSelector((state: any) => state.user.currentUser);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [languageValue, setLanguageValue] = useState(el.language);
  const [categoryValue, setCategoryValue] = useState(el.category);
  const [title, setTitle] = useState(el.title);
  const [text, setText] = useState(el.text);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const newArticle=article.map((element:any)=>{
        if(element.id===el.id){
          element.title=title
          element.text=text
          element.category=categoryValue
          element.language=languageValue
        }
        return element
      })
      firebase.firestore().collection('articles').doc(user.uid).update({
        article: newArticle,
      }).then(()=>{
        console.log('Success')
      }).catch((err:string)=>{
        console.error(err)
      })
      setEdit(false)
    }
  };

  const deleteArticle = () => {
    const newArticle = article.filter((element: any) => element.id !== el.id);
    firebase.firestore().collection('articles').doc(user.uid).update({
      article: newArticle,
    }).then(()=>{
      console.log('Success!')
    }).catch((err:string)=>{
      console.error(err)
    })
  };

  return (
    <Message onClick={() => setModal(true)}>
      <p>{el.title}</p>
      <p>
        書いた人:
        <Image avatar src={el.avatar} />:{el.name}
      </p>
      <Modal open={modal} onClose={() => setModal(false)}>
        {edit ? (
          <Form onSubmit={handleSubmit}>
          <Input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <TextArea
              value={text}
              onChange={(e: any) => setText(e.target.value)}
            />
            <Select
              placeholder='選択してください'
              value={categoryValue}
              options={categoryOptions}
              onChange={(e: any, { value }: any) => setCategoryValue(value)}
            />
            <Select
              search
              selection
              value={languageValue}
              options={languageOptions}
              onChange={(e: any, { value }: any) => setLanguageValue(value)}
              placeholder='Select Language'
            />
            <Button>変更</Button>
            <Button type="button" onClick={()=>setEdit(false)}>キャンセル</Button>
          </Form>
        ) : (
          <React.Fragment>
            <Header as='h1'>{el.title}</Header>
            <Message>{el.text}</Message>
            <p>カテゴリー１：{el.category}</p>
            <p>カテゴリー２：{el.language}</p>
            {user.uid === el.uid && (
              <>
                <Button onClick={() => setEdit(true)}>編集</Button>
                <ModalComponent text='削除' clickEvent={deleteArticle}/>
              </>
            )}
            <Comment />
          </React.Fragment>
        )}
      </Modal>
    </Message>
  );
};

export default Article;
