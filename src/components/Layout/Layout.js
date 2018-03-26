import React from 'react';
import Aux from '../../hoc/Util';
import Classes from './Layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrower, Backdrop</div>
        <main className={Classes.content}>
            {props.children}
        </main>
    </Aux>
);


export default layout;