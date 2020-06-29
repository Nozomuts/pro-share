import React from 'react';
import { Select } from 'semantic-ui-react';
import { categoryOptions, languageOptions } from '../UI/SelectOptions';

const Category = ({ category, language, setCategory, setLanguage }: any) => {
  return (
    <div style={{ width: '90vw', margin: '10px auto', maxWidth: 800 }}>
      <div>
        カテゴリー１：
        <Select
          placeholder='選択してください'
          value={language}
          options={languageOptions}
          onChange={(e: any, { value }: any) => setLanguage(value)}
        />
      </div>
      <div>
        カテゴリー２：
        <Select
          placeholder='選択してください'
          value={category}
          options={categoryOptions}
          onChange={(e: any, { value }: any) => setCategory(value)}
        />
      </div>
    </div>
  );
};

export default Category;
