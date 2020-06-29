import React from 'react';
import { Message, Image } from 'semantic-ui-react';
import Crown from '../image/crown.png';

const Daily = ({ ranking }: any) => {
  return (
    <>
      {ranking.map((rank: any, i: number) => {
        return (
          <Message
            style={{ width: '90vw', margin: '10px 5vw' }}
            key={i.toString()}
          >
            <h4>
            {i + 1 === 1 || i + 1 === 2 || i + 1 === 3 ? (
                <span
                  style={{
                    backgroundImage: `url(${Crown})`,
                    backgroundPositionX: 0,
                    backgroundSize: 'cover',
                    padding: '0 5px',
                    color: 'yellow',
                    marginRight: 10
                  }}
                >
                  {(i + 1).toString()}
                </span>
              ) : (
                <span style={{
                  padding: '0 5px',
                  marginRight: 10
                }}>{(i + 1).toString()}</span>
              )}
              <Image src={rank.avatar} avatar />{rank.name}：
              {`${Math.floor(rank.time / 60)}時間${rank.time % 60}分`}
            </h4>
          </Message>
        );
      })}
    </>
  );
};

export default Daily;
