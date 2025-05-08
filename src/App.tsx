
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
import ProductCategory from './pages/shop/product-category'
import useBasket from './hooks/useBasket'

function App() {
  const { onAdd, onDelete, onDeleteAll, cartItems, onRemove} = useBasket();

  return (
    <>
    <Routes>
        <Route path="/" element={
          <Index
            cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}
        />} />
          <Route path="/about" element={<About/>} />
          <Route path="/team" element={<Team/>} />
          <Route path="/our-clients" element={<OurClients/>} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
          <Route path="/error" element={<Error/>} />
          <Route path="/my-profile" element={<MyProfile/>} />
          <Route path="/my-account" element={<MyAccount/>} />
          <Route path="/edit-account" element={<EditAccount/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/coming-soon" element={<ComingSoon/>} />
          <Route path="/payment-method" element={<PaymentMethod/>} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation/>} />
          <Route path="/payment-success" element={<PaymentSuccess/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
        <Route path="/shop-v1" element={<ShopV1  cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd} />} />
          <Route path="/product-details" element={<ProductDetails  cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}/>} />
          <Route path="/product-details/:id" element={<ProductDetails  cartItems={cartItems}
            onDelete={onDelete}
            onRemove={onRemove}
            onDeleteAll={onDeleteAll}
            onAdd={onAdd}/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/product-category" element={<ProductCategory/>} />
    </Routes>
    </>
  )
}

export default App
