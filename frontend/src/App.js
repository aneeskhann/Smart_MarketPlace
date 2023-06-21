import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header.js'
import Home from './modules/Home/Home.js';
import {Routes, Route} from 'react-router-dom'
import Product from './modules/Product/Product';
import ProductMod from './modules/ProductMod/ProductMod';
import ProductCategories from './modules/ProductCategories/ProductCategories';
import Cart from './modules/Cart/Cart';
import About from './components/About/About';
import { Store_Provider } from './Context/Context';
import Contact from './components/Contact/Contact';
import Signin from './modules/Forms/Signin';
import Signup from './modules/Forms/Signup';
import PostProductForm from './modules/Forms/Admin';
import FAQS from './components/FAQS/FAQS';

//comment
function App() {
  return (
    <div>
      <Store_Provider>
      <Header/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path="/products/:id" element= {<Product/>}/>
        <Route path='/products' element={<ProductMod/>}/>
        <Route path='/categories/:name' element={<ProductCategories/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/add' element={<PostProductForm/>}/>
        <Route path= '/faqs' element= {<FAQS/>}/>
        <Route path= '*' element = {<div>404</div>}/>
      </Routes>
      <Footer/>
      </Store_Provider>
      
    </div>
  );
}

export default App;
