import React, { useState } from 'react';
import { Select } from 'semantic-ui-react';
import {categoryOptions,languageOptions} from '../UI/SelectOptions'

const Category = () => {
  const [languageValue, setLanguageValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  
  return (
    <React.Fragment>
      <Select
        placeholder='選択してください'
        value={languageValue}
        options={languageOptions}
        onChange={(e: any,{value}:any) => setLanguageValue(value)}
      />
      <Select
        placeholder='選択してください'
        value={categoryValue}
        options={categoryOptions}
        onChange={(e: any,{value}:any) => setCategoryValue(value)}
      />
    </React.Fragment>
  );
};

export default Category;
