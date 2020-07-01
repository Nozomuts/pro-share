import React from 'react';
import { Message, Image } from 'semantic-ui-react';
import Crown from '../image/crown.png';
import MediaQuery from 'react-responsive';
import {RankingType} from '../Types'

type Props = {
  ranking: RankingType[]
}

const RankingRecord:React.FC<Props> = ({ ranking }) => {
  const jsx = ranking.map((rank: RankingType, i: number) => {
    return (
      <Message key={i.toString()}>
        <h4>
          {i + 1 === 1 || i + 1 === 2 || i + 1 === 3 ? (
            <span
              style={{
                backgroundImage: `url(${Crown})`,
                backgroundPositionX: 0,
                backgroundSize: 'cover',
                padding: '0 5px',
                color: 'yellow',
                marginRight: 10,
              }}
            >
              {(i + 1).toString()}
            </span>
          ) : (
            <span
              style={{
                padding: '0 5px',
                marginRight: 10,
              }}
            >
              {(i + 1).toString()}
            </span>
          )}
          <Image src={rank.avatar} avatar />
          {rank.name}：{`${Math.floor(rank.time / 60)}時間${rank.time % 60}分`}
        </h4>
      </Message>
    );
  });

  return (
    <>
      <MediaQuery query='(min-width: 671px)'>
        <div style={{ width: '45vw' }}>{jsx}</div>
      </MediaQuery>
      <MediaQuery query='(max-width: 670px)'>
        <div style={{ width: '90vw', margin: '0 5vw' }}>{jsx}</div>
      </MediaQuery>
    </>
  );
};

export default RankingRecord;
