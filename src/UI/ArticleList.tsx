import React from 'react'
import Article from './Article';

const ArticleList = ({article}:any) => {
  return (
    <>
      {article&&article.map((el:any,i:number)=><Article el={el} key={i.toString()} article={article}/>)}
    </>
  )
}

export default ArticleList
