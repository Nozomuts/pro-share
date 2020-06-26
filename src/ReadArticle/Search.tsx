import React,{useState} from 'react'
import { Input } from 'semantic-ui-react'

const Search = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [searchLoading, setSearchLoading] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  //   setSearchLoading(true);
  //   handleSearchMessages(e.target.value);
  // };

  // const handleSearchMessages = (searchTerm: string) => {
  //   const channelMessages = [...messages];
  //   const regex = new RegExp(searchTerm, 'gi');
  //   const searchResults = channelMessages.reduce((acc, message) => {
  //     if (
  //       (message.content && message.content.match(regex)) ||
  //       message.user.name.match(regex)
  //     ) {
  //       acc.push(message);
  //     }
  //     return acc;
  //   }, []);
  //   setSearchResults(searchResults);
  //   setTimeout(() => {
  //     setSearchLoading(false);
  //   }, 1000);
  // };
  return (
    <div>
      <Input
          // loading={searchLoading}
          // onChange={handleSearchChange}
          size='mini'
          icon='search'
          name='searchTerm'
          placeholder='Search Articles'
        />
    </div>
  )
}

export default Search
