import React,{useState} from 'react'
import { Input } from 'semantic-ui-react'

type Props = {
  searchItem: string
  setSearchItem: React.Dispatch<React.SetStateAction<string>>
}

const Search:React.FC<Props> = ({searchItem,setSearchItem}) => {
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
    }, 1000);
  };


  return (
    <div style={{width: '90vw', margin: '10px auto', maxWidth: 800, marginBottom: 50}}>
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
