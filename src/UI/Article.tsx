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
  Segment,
} from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';
import { categoryOptions, languageOptions } from './SelectOptions';
import ModalComponent from './ModalComponent';
import shortid from 'shortid';

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
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
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

  const sendComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentText && user) {
      const date = new Date();
      const y = date.getFullYear();
      const mo = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const mi = date.getMinutes();
      const time = `${y}年${mo}月${d}日${h}時${mi}分`;
      const newComment = {
        name: user.displayName,
        avatar: user.photoURL,
        text: commentText,
        time: time,
        id: shortid.generate(),
      };
      const newArticle = article.map((element: any) => {
        if (el.id === element.id) {
          element.comment.push(newComment);
        }
        return element;
      });

      articlesRef
        .doc(el.uid)
        .update({
          article: newArticle,
        })
        .then(() => {
          setCommentText('');
          setError('');
        });
    } else {
      setError('コメントを入力してください');
    }
  };

  const deleteComment = (id: string) => {
    const newArticle = article.map((element: any) => {
      element.comment = element.comment.filter((el: any) => {
        return el.id !== id;
      });
      return element;
    });
    console.log(newArticle)
    articlesRef
      .doc(el.uid)
      .update({
        article: newArticle,
      })
      .then(() => {
        console.log('delete');
      })
      .catch((err: string) => {
        console.error(err);
      });
  };

  const changeComment = (id: string, text: string) => {
    const newArticle = article.map((element: any) => {
      element.comment.map((el: any) => {
        if (el.id === id) {
          el.text = text;
        }
        return el;
      });
      return element;
    });
    articlesRef
      .doc(el.uid)
      .update({
        article: newArticle,
      })
      .then(() => {
        console.log('change');
      })
      .catch((err: string) => {
        console.error(err);
      });
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
            <Form onSubmit={sendComment}>
              <Input
                value={commentText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCommentText(e.target.value)
                }
              />
              <Button>送信</Button>
            </Form>
            {error && <Message negative>{error}</Message>}
            <Segment>
              {el.comment.length > 0 &&
                el.comment.map((el: any, i: number) => (
                  <Comment
                    key={i.toString()}
                    comment={el}
                    user={user}
                    changeComment={changeComment}
                    deleteComment={deleteComment}
                  />
                ))}
            </Segment>
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
