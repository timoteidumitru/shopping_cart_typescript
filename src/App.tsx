import { useEffect, useState } from 'react'
import axios from 'axios'
// import { BrowserRouter as Routes, Switch, Route, Link } from 'react-router-dom';
// Components
import Cart from './components/Cart/Cart'
import Drawer from '@material-ui/core/Drawer'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import { Paper, Table, TableCell, TableHead, TableRow } from '@material-ui/core'
// Styles
import { Wrapper, StyledButton } from './App.styles'
import React from 'react'
import TableData from 'components/Table/TableData'

// Interfaces
interface Category {
  id: string
  name: string
}

export interface Product {
  name: string
  category: Category
  price: number
  id: number
  amount: number
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as Product[])
  const [products, setProducts] = useState<Product[]>()
  const [sortOrderByPrice, setSortOrderByPrice] = useState<boolean>(true)
  const [sortOrderByCategory, setSortOrderByCategory] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get<Product[]>('http://localhost:3001/api/products')
      .then((response) => {
        setProducts(response.data)
      })
  }, [])

  const getTotalItems = (items: Product[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0)

  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as Product[])
    )
  }

  const handlesortByPrice = (products: Product[]) => {
    if (sortOrderByPrice) {
      products.sort((obj1: Product, obj2: Product) => {
        if (obj1.price > obj2.price) return 1
        if (obj1.price < obj2.price) return -1
        return 0
      })
      setSortOrderByPrice(false)
    } else {
      products.sort((obj1: Product, obj2: Product) => {
        if (obj1.price < obj2.price) return 1
        if (obj1.price > obj2.price) return -1
        return 0
      })
      setSortOrderByPrice(true)
    }
  }

  const handlesortByCatedory = (products: Product[]) => {
    if (sortOrderByCategory) {
      products.sort((obj1: Product, obj2: Product) => {
        if (obj1.category.name > obj2.category.name) return 1
        if (obj1.category.name < obj2.category.name) return -1
        return 0
      })
      setSortOrderByCategory(false)
    } else {
      products.sort((obj1: Product, obj2: Product) => {
        if (obj1.category.name < obj2.category.name) return 1
        if (obj1.category.name > obj2.category.name) return -1
        return 0
      })
      setSortOrderByCategory(true)
    }
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton
        onClick={() => setCartOpen(true)}
        style={{ float: 'right', top: '-2em' }}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Paper
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '5em',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handlesortByCatedory(products!)}
                style={{ cursor: 'pointer' }}
              >
                Category
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell
                onClick={() => handlesortByPrice(products!)}
                style={{ cursor: 'pointer' }}
              >
                Price
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {products?.map((item) => (
            <TableData
              key={item.id}
              data={item}
              handleAddToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          ))}
        </Table>
      </Paper>
    </Wrapper>
  )
}

export default App
