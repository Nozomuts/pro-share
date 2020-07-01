import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import {
  Message,
  Modal,
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
import { ArticleType, CommentType } from '../Types';
import { RootState } from '../re-ducks/store';

type Props = {
  el: ArticleType;
  article: ArticleType[];
};

const Article: React.FC<Props> = ({ el, article }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [languageValue, setLanguageValue] = useState(el.language);
  const [categoryValue, setCategoryValue] = useState(el.category);
  const [title, setTitle] = useState(el.title);
  const [text, setText] = useState(el.text);
  const [unFavorite, setUnFavorite] = useState(false);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [alert, setAlert] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [usersRef] = useState(firebase.firestore().collection('users'));
  const [articlesRef] = useState(firebase.firestore().collection('articles'));

  useEffect(() => {
    if (user && user.uid) {
      usersRef.onSnapshot((snapshot) => {
        snapshot.docs
          .filter((doc) => user.uid === doc.id)
          .map((doc) => {
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
      const newArticle = article.map((element: ArticleType) => {
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
    const newArticle = article
      .filter((element: ArticleType) => element.uid === user.uid)
      .filter((element: ArticleType) => element.id !== el.id);
    articlesRef
      .doc(user.uid)
      .update({
        article: newArticle,
      })
      .then(() => {
        console.log('Success!');
        setModal(false);
      })
      .catch((err: string) => {
        console.error(err);
        setModal(false);
      });
  };

  const changeFavorite = () => {
    if (favorite.includes(el.id)) {
      const newfavorite = favorite.filter(
        (element: string) => element !== el.id
      );
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
      const newComment: CommentType = {
        name: user.displayName,
        avatar: user.photoURL,
        text: commentText,
        time: time,
        id: shortid.generate(),
      };
      const newArticle = article
        .filter((element: ArticleType) => element.uid === el.uid)
        .map((element: ArticleType) => {
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
    const newArticle = article
      .filter((element: ArticleType) => element.uid === el.uid)
      .map((element: ArticleType) => {
        element.comment = element.comment.filter(
          (el: CommentType) => el.id !== id
        );
        return element;
      });
    console.log(newArticle);
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
    const newArticle = article
      .filter((element: ArticleType) => element.uid === el.uid)
      .map((element: ArticleType) => {
        element.comment.map((el: CommentType) => {
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
    <>
      <Message
        onClick={() => setModal(true)}
        style={{ width: '90vw', margin: '10px auto', maxWidth: 800 }}
      >
        <h1>
          {el.title}
          {unFavorite && '(お気に入り解除済み)'}
        </h1>
        <p>
          書いた人：
          <Image avatar src={el.avatar} /> {el.name}
        </p>
      </Message>
      <Modal
        onClose={() => setAlert(false)}
        open={alert}
        style={{ width: '90vw', margin: '10px auto', maxWidth: 600 }}
      >
        <Modal.Content>
          <p>ページを移動すると変更が反映されます</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => setAlert(false)}>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
        }}
        open={edit}
        onClose={() => setEdit(false)}
        size='small'
      >
        <Modal.Header>記事編集</Modal.Header>
        <Form
          style={{
            width: '80vw',
            margin: '30px auto',
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <Input
            style={{ width: '100%', marginBottom: 10 }}
            placeholder='タイトルを入力'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <TextArea
            style={{ width: '100%', marginBottom: 10 }}
            placeholder='テキストを入力'
            value={text}
            rows={15}
            onChange={(e: any) => setText(e.target.value)}
          />
          <div style={{ width: '100%', marginBottom: 10 }}>
            <Select
              placeholder='選択してください'
              value={categoryValue}
              options={categoryOptions}
              onChange={(
                e: React.SyntheticEvent<HTMLElement, Event>,
                { value }: any
              ) => setCategoryValue(value)}
              style={{ marginRight: '10px' }}
            />
            <Select
              value={languageValue}
              options={languageOptions}
              onChange={(
                e: React.SyntheticEvent<HTMLElement, Event>,
                { value }: any
              ) => setLanguageValue(value)}
              placeholder='選択してください'
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: 600,
              width: '100%',
            }}
          >
            <Button color='green' style={{ width: '50%' }}>
              <Icon name='check' />
              変更
            </Button>
            <Button
              style={{ width: '50%' }}
              type='button'
              color='red'
              onClick={() => setEdit(false)}
            >
              <Icon name='remove' />
              キャンセル
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal open={modal} onClose={() => setModal(false)} size='small'>
        <div
          style={{
            width: '80vw',
            margin: '30px auto',
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
          }}
        >
          <Modal.Header style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1 style={{ width: '100%', marginBottom: 10 }}>
                {favorite.includes(el.id) ? (
                  <Icon
                    onClick={changeFavorite}
                    size='small'
                    name='star'
                    color='yellow'
                    style={{ lineHeight: '36px' }}
                  />
                ) : (
                  <Icon
                    onClick={changeFavorite}
                    size='small'
                    name='star outline'
                    color='black'
                    style={{ lineHeight: '36px' }}
                  />
                )}{' '}
                {el.title}
              </h1>
              <Icon
                name='remove'
                style={{ cursor: 'pointer' }}
                onClick={() => setModal(false)}
              />
            </div>
            <p style={{ width: '100%', marginBottom: 10 }}>
              書いた人：
              <Image avatar src={el.avatar} /> {el.name}
              {unFavorite && '(お気に入り削除済み)'}
            </p>
          </Modal.Header>
          <Modal.Content scrolling>
            <Message style={{ width: '100%', marginBottom: 10 }}>
              {el.text}
            </Message>
          </Modal.Content>
          <div style={{ width: '100%', marginBottom: 10 }}>
            <p>カテゴリー１：{el.category}</p>
            <p>カテゴリー２：{el.language}</p>
          </div>
          <Modal.Content scrolling style={{ marginBottom: 20 }}>
            <Segment>
              <p>コメント：(Enterキーで送信)</p>
              <Form
                onSubmit={sendComment}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  margin: '10px auto',
                }}
              >
                <Input
                  value={commentText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCommentText(e.target.value)
                  }
                  placeholder='コメントを入力してください'
                  style={{ width: '100%' }}
                />
              </Form>
              {error && <Message negative>{error}</Message>}
              {el.comment.length > 0 ? (
                el.comment.map((el: CommentType, i: number) => (
                  <Comment
                    key={i.toString()}
                    comment={el}
                    user={user}
                    changeComment={changeComment}
                    deleteComment={deleteComment}
                  />
                ))
              ) : (
                <p>コメントはありません</p>
              )}
            </Segment>
          </Modal.Content>
          {user.uid === el.uid && (
            <div style={{ textAlign: 'right', marginBottom: 30 }}>
              <Button onClick={() => setEdit(true)}>
                <Icon name='write' />
                編集
              </Button>
              <ModalComponent text='削除' clickEvent={deleteArticle} />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Article;
