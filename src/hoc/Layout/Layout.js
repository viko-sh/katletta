import React, {Component} from 'react';
import Aux from '../Util/Util';
import Classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

    state={
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false});
    };

    drawerToggleHandler = () =>{
        this.setState((prevState)=>{return {showSideDrawer: !prevState.showSideDrawer}});
    };

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleHandler={this.drawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}/>
                <main className={Classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}


export default Layout;