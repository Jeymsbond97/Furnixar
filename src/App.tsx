
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './pages/index'
import About from './pages/inner-pages/about'
import Team from './pages/inner-pages/team'
import OurClients from './pages/inner-pages/our-clients'
import Faq from './pages/inner-pages/faq'
import TermsAndConditions from './pages/inner-pages/terms-and-conditions'
import Error from './pages/special/error'
import MyProfile from './pages/account/my-profile'
import MyAccount from './pages/account/my-account'
import EditAccount from './pages/account/edit-account'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ComingSoon from './pages/special/coming-soon'
import PaymentMethod from './pages/shop/payment-method'
import PaymentConfirmation from './pages/shop/payment-confirmation'
import PaymentSuccess from './pages/shop/payment-success'
import Cart from './pages/shop/cart'
import Checkout from './pages/shop/checkout'
import ShopV1 from './pages/shop/shop-v1'
import ProductDetails from './pages/index/product-details'
import Contact from './pages/inner-pages/contact'
import useBasket from './hooks/useBasket'

function App() {
  const { onAdd, onDelete, onDeleteAll, cartItems, onRemove} = useBasket();

  return (
    <>
    <Routes>
        <Route path="/about" element={<About
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/team" element={<Team
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/our-clients" element={<OurClients
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/faq" element={<Faq
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
          <Route path="/error" element={<Error/>} />
        <Route path="/my-profile" element={<MyProfile
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/my-account" element={<MyAccount
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/edit-account" element={<EditAccount
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/login" element={<Login
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}
        cartItems={cartItems}
        />} />
        <Route path="/register" element={<Register
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}
        cartItems={cartItems}
        />} />
          <Route path="/coming-soon" element={<ComingSoon/>} />
        <Route path="/payment-method" element={<PaymentMethod
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/payment-success" element={<PaymentSuccess
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/cart" element={<Cart
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/checkout" element={<Checkout
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/shop-v1" element={<ShopV1  cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd} />} />
        <Route path="/product-details" element={<ProductDetails
            cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}/>} />
        <Route path="/product-details/:id" element={<ProductDetails
            cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}/>} />
        <Route path="/contact" element={<Contact
        cartItems={cartItems}
        onDelete={onDelete}
        onRemove={onRemove}
        onDeleteAll={onDeleteAll}
        onAdd={onAdd}/>} />
        <Route path="/" element={
          <Index
            cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}
        />} />
    </Routes>
    </>
  )
}

export default App
