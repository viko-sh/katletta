import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        {
            controls.map(ctrl=>(
                <BuildControl key={ctrl.label}
                              label={ctrl.label}
                              removeHadnler={()=>props.removeHadnler(ctrl.type)}
                              addHandler={()=>props.addHandler(ctrl.type)}
                              disabled={props.disabled[ctrl.type]}/>
            ))
        }
        <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER ONE</button>
    </div>
);


export default buildControls;