import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/axios';
import SearchBar from './SearchBar';

interface Product {
  id: number;
  brand: string;
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
}

const DataTable = () => {
  const tableRef = useRef(null);
  const LIMIT = 20;
  const [showingProducts, setShowingProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const onTableScroll = () => {
    if (!tableRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = tableRef?.current;
    const reachedBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (reachedBottom && filteredProducts.length === 0) {
      getProducts(LIMIT, products.length);
    }
  };

  const getProducts = async (limit: number, skip: number) => {
    const data = await axiosInstance.get('', {
      params: {
        limit,
        skip,
      },
    });
    if (products.length === 0) setProducts(data.data.products);
    else setProducts([...products, ...data.data.products]);
  };

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

  useEffect(() => {
    //initial fetch
    if (products.length === 0) getProducts(LIMIT, 0);

    //filtering
    if (filteredProducts.length === 0) {
      setShowingProducts(products);
    } else {
      setShowingProducts(filteredProducts);
    }
  }, [filteredProducts, products]);

  return (
    <div>
      <h1>Products Table</h1>
      <SearchBar onInputSearch={onInputSearch} />
      <TableContainer
        style={{ overflowY: 'scroll', height: '80vh' }}
        component={Paper}
        onScroll={onTableScroll}
        ref={tableRef}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showingProducts.map((row) => (
              <TableRow
                key={row.id + row.title + row.description}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <img
                    style={{ width: 100, height: 100 }}
                    src={row.images[0]}
                    alt={row.images[0]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default DataTable;
