import React from 'react'
import { TableBody, TableCell, TableRow } from '@material-ui/core'
import { Product } from '../../App'
import { AddRemoveItems } from './Table.styles'

type Props = {
  data: Product
  handleAddToCart: (clickedItem: Product) => void
  removeFromCart: (id: number) => void
}

const TableData: React.FC<Props> = ({
  data,
  handleAddToCart,
  removeFromCart,
}) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>{data.category.name}</TableCell>
        <TableCell>{data.name}</TableCell>
        <TableCell>${data.price}</TableCell>
        <TableCell style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AddRemoveItems onClick={() => removeFromCart(data.id)}>
            (-)
          </AddRemoveItems>{' '}
          Select
          <AddRemoveItems onClick={() => handleAddToCart(data)}>
            (+)
          </AddRemoveItems>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default TableData
