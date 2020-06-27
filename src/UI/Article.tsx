import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import {
  Message,
  Modal,
  Header,
  Button,
  Image,
  Input,
  Form,
  Select,
  TextArea,
  Icon,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';
import { categoryOptions, languageOptions } from './SelectOptions';
import ModalComponent from './ModalComponent';

const Article = ({ el, article }: any) => {
  const user = useSelector((state: any) => state.user.currentUser);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [languageValue, setLanguageValue] = useState(el.language);
  const [categoryValue, setCategoryValue] = useState(el.category);
  const [title, setTitle] = useState(el.title);
  const [text, setText] = useState(el.text);
  const [unFavorite, setUnFavorite] = useState(false);
  const [favorite, setFavorite] = useState<any>([]);
  const [alert, setAlert] = useState(false);
  const [usersRef] = useState(firebase.firestore().collection('users'));
  const [articlesRef] = useState(firebase.firestore().collection('articles'));

  useEffect(() => {
    if (user && user.uid) {
      usersRef.onSnapshot((snapshot: any) => {
        snapshot.docs
          .filter((doc: any) => user.uid === doc.id)
          .map((doc: any) => {
            setFavorite(doc.data().favorite);
            console.log(doc.data().favorite);
            return doc;
          });
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      const newArticle = article.map((element: any) => {
        if (element.id === el.id) {
          element.title = title;
          element.text = text;
          element.category = categoryValue;
          element.language = languageValue;
        }
        return element;
      });
      articlesRef
        .doc(user.uid)
        .update({
          article: newArticle,
        })
        .then(() => {
          console.log('Success');
        })
        .catch((err: string) => {
          console.error(err);
        });
      setEdit(false);
    }
  };

  const deleteArticle = () => {
    const newArticle = article.filter((element: any) => element.id !== el.id);
    articlesRef
      .doc(user.uid)
      .update({
        article: newArticle,
      })
      .then(() => {
        console.log('Success!');
      })
      .catch((err: string) => {
        console.error(err);
      });
  };

  const changeFavorite = () => {
    if (favorite.includes(el.id)) {
      const newfavorite = favorite.filter((element: any) => element !== el.id);
      console.log(newfavorite);
      usersRef
        .doc(user.uid)
        .update({
          favorite: newfavorite,
        })
        .then(() => {
          console.log('Success!');
          setAlert(true);
          setUnFavorite(true);
          setModal(false);
        })
        .catch((err: string) => {
          console.error(err);
        });
    } else {
      favorite.push(el.id);
      usersRef
        .doc(user.uid)
        .update({
          favorite: favorite,
        })
        .then(() => {
          console.log('Success!');
          setUnFavorite(false);
        })
        .catch((err: string) => {
          console.error(err);
        });
    }
  };

  return (
    <Message onClick={() => setModal(true)}>
      <p>{el.title}</p>
      <p>
        書いた人:
        <Image avatar src={el.avatar} />:{el.name}
        {unFavorite && '(削除済み)'}
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
            <Button type='button' onClick={() => setEdit(false)}>
              キャンセル
            </Button>
          </Form>
        ) : (
          <React.Fragment>
            <Header as='h1'>{el.title}</Header>
            <Button onClick={changeFavorite}>
              {favorite.includes(el.id)
                ? 'お気に入りから削除'
                : 'お気に入りに追加'}
            </Button>
            <Message>{el.text}</Message>
            <p>カテゴリー１：{el.category}</p>
            <p>カテゴリー２：{el.language}</p>
            {user.uid === el.uid && (
              <>
                <Button onClick={() => setEdit(true)}>編集</Button>
                <ModalComponent text='削除' clickEvent={deleteArticle} />
              </>
            )}
            <Comment />
          </React.Fragment>
        )}
      </Modal>
      <Modal onClose={() => setAlert(false)} open={alert}>
        <Modal.Content>
          <p>ページを移動すると変更が反映されます</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => setAlert(false)}>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
    </Message>
  );
};

export default Article;
