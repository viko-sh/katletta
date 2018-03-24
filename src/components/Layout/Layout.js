import React from 'react';
import Aux from '../../hoc/Util';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrower, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);


export default layout;