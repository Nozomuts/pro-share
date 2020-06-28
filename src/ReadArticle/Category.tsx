import React from 'react';
import { Select } from 'semantic-ui-react';
import {categoryOptions,languageOptions} from '../UI/SelectOptions'

const Category = ({category,language,setCategory,setLanguage}:any) => {
  
  return (
    <React.Fragment>
      <Select
        placeholder='選択してください'
        value={language}
        options={languageOptions}
        onChange={(e: any,{value}:any) => setLanguage(value)}
      />
      <Select
        placeholder='選択してください'
        value={category}
        options={categoryOptions}
        onChange={(e: any,{value}:any) => setCategory(value)}
      />
    </React.Fragment>
  );
};

export default Category;
