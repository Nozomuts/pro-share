import React from 'react';
import { Message, Image } from 'semantic-ui-react';

const Synthesis = ({ ranking }: any) => {
  return (
    <React.Fragment>
      {ranking.map((rank: any, i: number) => {
        return (
          <Message key={i.toString()}>
            <Image src={rank.avatar} avatar />:{rank.name}:
            {`${Math.floor(rank.time / 60)}時間${rank.time % 60}分`}
          </Message>
        );
      })}
    </React.Fragment>
  );
};

export default Synthesis;
