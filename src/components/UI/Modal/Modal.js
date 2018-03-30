import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Util/Util';

class Modal extends Component{

    /**
     * Check if we really need to re-render this component
     * It should be re-render only if visible to a user - after show prop is changed
     * If in the future we will be required to add more checks on the prop object,
     * we should extend from PureComponent and let Reach handle it
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState){
        return  nextProps.show !== this.props.show;
    }


    /**
     *
     * @returns {*}
     */
    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                         opacity: this.props.show ? 1 : 0
                     }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}


export default Modal;