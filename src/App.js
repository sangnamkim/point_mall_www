import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import Login from "./point_mall/Login";
import Home from "./point_mall/Home";
import ItemDetail from "./point_mall/ItemDetail" ;
import Header from "./point_mall/Header";
import Footer from "./point_mall/Footer";
import MyItems from "./point_mall/MyItems";
import Cartitems from './point_mall/Cartitems'

function App() {
  return (
   <Router>
     <div>
       <Header />
       <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cate/:cateId" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/items/:itemId" component={ItemDetail} />
          <Route exact path="/me/Items" component={MyItems} />
          <Route exact path="/cart/items" component={Cartitems} />
        </Switch>
        <Footer />
     </div>
   </Router>
  );
}

export default App;
