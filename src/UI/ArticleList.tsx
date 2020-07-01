import React from 'react';
import Article from './Article';
import { ArticleType } from '../Types';

type Props = {
  article: ArticleType[]
}

const ArticleList:React.FC<Props> = ({ article }) => {
  return (
    <>
      {article.length > 0 ? (
        article.map((el: ArticleType, i: number) => (
          <Article el={el} key={i.toString()} article={article} />
        ))
      ) : (
        <h1 style={{ width: '90vw', margin: '10px auto', maxWidth: 800 }}>
          記事がありません
        </h1>
      )}
    </>
  );
};

export default ArticleList;
