import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


class App extends Component {


  render() {
    return (
        <BrowserRouter>
            <Layout>
                <Route exact path='/' component={BurgerBuilder} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/orders' component={Orders} />
            </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
