import React from 'react';
import Aux from '../../hoc/Util';
import Classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={Classes.content}>
            {props.children}
        </main>
    </Aux>
);


export default layout;