export const languageOptions = [
  { key: 'not', value: '', text: '未選択' },
  { key: 'js', value: 'Javascript', text: 'Javascript' },
  { key: 'jq', value: 'jQuery', text: 'jQuery' },
  { key: 'vu', value: 'Vue', text: 'Vue' },
  { key: 're', value: 'React', text: 'React' },
  { key: 'an', value: 'Angular', text: 'Angular' },
  { key: 'no', value: 'Node', text: 'Node' },
  { key: 'ex', value: 'Express', text: 'Express' },
  { key: 'de', value: 'Deno', text: 'Deno' },
  { key: 'ot', value: 'その他', text: 'その他' },
];
export const categoryOptions = [
  { key: 'not', value: '', text: '未選択' },
  { key: 'is', value: '情報共有', text: '情報共有' },
  { key: 'qu', value: '質問', text: '質問' },
  { key: 'di', value: '日記', text: '日記' },
  { key: 'ot', value: 'その他', text: 'その他' },
];


const _hourOptions = [];
for (let i = 0; i < 24; i++) {
  const array = { key: `${i}`, value: `${i}`, text: `${i}` };
  _hourOptions.push(array);
}
export const hourOptions = _hourOptions;

const _minOptions = [];
for (let i = 0; i < 60; i++) {
  const array = { key: `${i}`, value: `${i}`, text: `${i}` };
  _minOptions.push(array);
}
export const minOptions = _minOptions;
