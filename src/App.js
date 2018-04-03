import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {


  render() {
    return (
        <BrowserRouter>
            <Layout>
                <Route exact path='/' component={BurgerBuilder} />
                <Route exact path='/checkout' component={Checkout} />
            </Layout>
        </BrowserRouter>
    );
  }
}

export default App;
