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
    <div>
      <Input
          loading={searchLoading}
          value={searchItem}
          onChange={handleSearchChange}
          size='mini'
          icon='search'
          name='searchTerm'
          placeholder='Search Articles'
        />
    </div>
  )
}

export default Search
