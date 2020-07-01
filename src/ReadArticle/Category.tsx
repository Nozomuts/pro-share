import React from 'react';
import { Select } from 'semantic-ui-react';
import { categoryOptions, languageOptions } from '../UI/SelectOptions';

type Props = {
  category: string
  language: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const Category:React.FC<Props> = ({ category, language, setCategory, setLanguage }) => {
  return (
    <div style={{ width: '90vw', margin: '10px auto', maxWidth: 800 }}>
      <div>
        カテゴリー１：
        <Select
          placeholder='選択してください'
          value={language}
          options={languageOptions}
          onChange={(
            e: React.SyntheticEvent<HTMLElement, Event>,
            { value }: any
          ) => setLanguage(value)}
        />
      </div>
      <div>
        カテゴリー２：
        <Select
          placeholder='選択してください'
          value={category}
          options={categoryOptions}
          onChange={(
            e: React.SyntheticEvent<HTMLElement, Event>,
            { value }: any
          ) => setCategory(value)}
        />
      </div>
    </div>
  );
};

export default Category;
