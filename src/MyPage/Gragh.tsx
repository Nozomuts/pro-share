import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Legend,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Gragh = ({ record }: any) => {
  const data = record
    .reduce((result: any, current: any) => {
      const element = result.find(
        (el: any) => el['日付'] === current.time.split('日')[0] + '日'
      );
      if (element) {
        element['時間'] +=
          Number(current.hour) + Number((current.min / 60).toFixed(1));
      } else {
        result.push({
          日付: current.time.split('日')[0] + '日',
          時間: Number(current.hour) + Number((current.min / 60).toFixed(1)),
        });
      }
      return result;
    }, [])
    .sort((a: any, b: any) => {
      if (a['日付'] > b['日付']) {
        return 1;
      } else {
        return -1;
      }
    });

  return (
    <>
      {record.length > 0 ? (
        <div style={{ width: '90%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart width={700} height={500} data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='日付' interval='preserveStartEnd' />
              <YAxis interval='preserveStartEnd' />
              <Tooltip />
              <Legend />
              <Line dataKey='時間' stroke='#8884d8' activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <h2 style={{ textAlign: 'center' }}>記録がまだありません</h2>
      )}
    </>
  );
};

export default Gragh;
