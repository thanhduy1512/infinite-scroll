import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../api/axios';

interface Product {
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  images: string[];
}

const DataTable = () => {
  const tableRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);

  const onTableScroll = (event: any) => {
    if (!tableRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = tableRef?.current;
    const reachedBottom = scrollTop + clientHeight === scrollHeight;
    if (reachedBottom) {
      console.log('reached bottom');

      getProducts(20, products.length);
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

  useEffect(() => {
    getProducts(20, 0);
  }, []);

  return (
    <div>
      <h1>DataTable</h1>
      <TableContainer
        style={{ overflowY: 'scroll', height: 600 }}
        component={Paper}
        onScroll={onTableScroll}
        ref={tableRef}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.id + row.brand}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
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
