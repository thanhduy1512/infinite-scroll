import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRef } from 'react';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 11111, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 111111111, 9.0, 37, 4.3),
  createData('Eclair', 222222, 16.0, 24, 6.0),
  createData('Cupcake', 333333, 3.7, 67, 4.3),
  createData('Gingerbread', 44444, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 111111, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 1111112111, 9.0, 37, 4.3),
  createData('Eclair', 2322222, 16.0, 24, 6.0),
  createData('Cupcake', 3334333, 3.7, 67, 4.3),
  createData('Gingerbread', 445444, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 11114411, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 111221112111, 9.0, 37, 4.3),
  createData('Eclair', 232233222, 16.0, 24, 6.0),
  createData('Cupcake', 333411333, 3.7, 67, 4.3),
  createData('Gingerbread', 42245444, 16.0, 49, 3.9),
];

const DataTable = () => {
  const tableRef = useRef(null);
  const onTableScroll = (event: any) => {
    if (!tableRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = tableRef?.current;
    const reachedBottom = scrollTop + clientHeight === scrollHeight;
    if (reachedBottom) {
      console.log('reached bottom');
    }
  };

  return (
    <div>
      <h1>DataTable</h1>
      <TableContainer
        style={{ overflow: 'scroll', height: 600 }}
        component={Paper}
        onScroll={onTableScroll}
        ref={tableRef}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name + row.calories}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default DataTable;
