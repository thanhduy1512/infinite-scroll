import React, { ChangeEvent } from 'react';
import axiosInstance from '../api/axios';
import { Product } from '../interfaces/Product';

interface Props {
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SearchBar = ({ setFilteredProducts }: Props) => {
  const onInputSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const data = await axiosInstance.get('search', {
      params: {
        q: value,
      },
    });

    setFilteredProducts(data.data.products);
    if (value === '') {
      setFilteredProducts([]);
    }
  };

  return (
    <div style={{ marginBlock: '20px' }}>
      <label>Search</label>
      <input onChange={onInputSearch} />
    </div>
  );
};
export default SearchBar;
