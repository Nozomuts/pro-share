export type CommentType = {
  avatar: string;
  id: string;
  name: string;
  text: string;
  time: string;
};

export type ArticleType = {
  avatar: string;
  category: string;
  comment: CommentType[];
  id: string;
  language: string;
  name: string;
  text: string;
  time: Date;
  title: string;
  uid: string;
};

export type RecordType = {
  detail: string;
  hour: string;
  id: string;
  min: string;
  time: string;
  title: string;
};

export type RankingType = {
  name: string;
  avatar: string;
  time: number;
};
