import Button from '@material-ui/core/Button';
import React from 'react';
// Types
import { Product } from '../../App';
// Styles
import { Wrapper } from './CartItem.styles';
import { Table, Paper, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';

type Props = {
  item: Product;
  addToCart: (clickedItem: Product) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{item.category.name}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell
              style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
            >
              <Button onClick={() => removeFromCart(item.id)}>(-)</Button> Remove{' '}
              <Button onClick={() => addToCart(item)}>(+)</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  </Wrapper>
);

export default CartItem;
