import { ChangeEvent } from 'react';

interface Props {
  onInputSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onInputSearch }: Props) => {
  return (
    <div style={{ marginBlock: '20px' }}>
      <label>Search</label>
      <input onChange={onInputSearch} />
    </div>
  );
};
export default SearchBar;
