import React,{useState} from 'react'
import { Input } from 'semantic-ui-react'

const Search = ({searchItem,setSearchItem}:any) => {
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
    }, 1000);
  };


  return (
    <div style={{width: '90vw', margin: '10px 5vw', marginBottom: 50}}>
      検索：<Input
          loading={searchLoading}
          value={searchItem}
          onChange={handleSearchChange}
          size='small'
          icon='search'
          name='searchTerm'
          placeholder='検索'
        />
    </div>
  )
}

export default Search
