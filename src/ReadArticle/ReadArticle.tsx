import React, { useState, useEffect } from 'react';
import Header from '../UI/Header';
import MediaQuery from 'react-responsive';
import Footer from '../UI/Footer';
import Category from './Category';
import ArticleList from '../UI/ArticleList';
import Search from './Search';
import { useSelector } from 'react-redux';
import firebase from './../config/firebase';
import { RootState } from '../re-ducks/store';
import { ArticleType } from '../Types';

const ReadArticle = () => {
  const [article, setArticle] = useState<ArticleType[]>([]);
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection('articles')
        .onSnapshot((snapshot) => {
          const articleArray: ArticleType[] = [];
          snapshot.docs.map((doc) => {
            articleArray.push(...doc.data().article);
            return articleArray;
          });
          let newArray = articleArray;
          if (category) {
            newArray = newArray.filter((el: ArticleType) => el.category === category);
          }
          if (language) {
            newArray = newArray.filter((el: ArticleType) => el.language === language);
          }
          if (searchItem) {
            newArray = newArray.filter(
              (el: ArticleType) =>
                el.title.includes(searchItem) ||
                el.text.includes(searchItem) ||
                el.language.includes(searchItem) ||
                el.name.toLowerCase().includes(searchItem.toLowerCase())
            );
          }
          setArticle(newArray);
        });
    }
  }, [category, language, searchItem]);

  return (
    <>
      <div style={{ marginTop: 100, paddingBottom: 100 }}>
        <Header activeItem='article' />
        <Category
          category={category}
          language={language}
          setCategory={(value: any) => setCategory(value)}
          setLanguage={(value: any) => setLanguage(value)}
        />
        <Search searchItem={searchItem} setSearchItem={setSearchItem} />
        <ArticleList article={article} />
        <MediaQuery query='(max-width: 670px)'>
          <Footer activeItem='article' />
        </MediaQuery>
      </div>
    </>
  );
};

export default ReadArticle;
