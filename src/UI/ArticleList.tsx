import React from 'react';
import Article from './Article';

const ArticleList = ({ article }: any) => {
  return (
    <>
      {article.length > 0 ? (
        article.map((el: any, i: number) => (
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
