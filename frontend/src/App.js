import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header.js'
import Home from './modules/Home/Home.js';
import {Routes, Route} from 'react-router-dom'
import ProductMod from './modules/ProductMod/ProductMod';
import ProductCategories from './modules/ProductCategories/ProductCategories';
import Cart from './modules/Cart/Cart';
import About from './components/About/About';
import { StoreProvider } from './Context/Context';
import Signin from './modules/Forms/Signin.js';
import Signup from './modules/Forms/Signup.js';
import PostProductForm from './modules/Forms/PostProductForm';
import FAQS from './components/FAQS/FAQS';
import ProductCard from "./modules/ProductCard/productCard.js"
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import Categories from './components/Categories/Categories';





//comment
function App() {
  return (
    <StoreProvider>
      <Header/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
   
        <Route path='/products' element={<ProductMod/>}/>
        <Route path='/product/:id' element={<ProductCard/>}/>
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:name' element={<ProductCategories />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
  
        <Route
          path="/post-product"
          element={
            <>
              <SignedIn>
                <PostProductForm />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path= '/faqs' element= {<FAQS/>}/>
        <Route path= '*' element = {<div>404 no page</div>}/>
      </Routes>
      <Footer/>
    </StoreProvider>
  );
}

export default App;
