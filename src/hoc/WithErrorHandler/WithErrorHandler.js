import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Util/Util';

/**
*@returns JSX
*/
const withErrorHandler = (WrappedComponent, axios)=>{

    return  class extends Component{

        constructor(props){
            super();

            this.props = props;

            this.state = {
                error: null
            };

            this.interceptorsInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(res => res, error=>{
                this.setState({error: error});
            });
        }

        /**
         * Clean Up the interceptors
         * For each time we use this class, we create an instance of interceptors
         * In order of preventing memory leeks, we need to remove them using axios api
         */
        componentWillUnmount(){
            axios.interceptors.request.eject(this.interceptorsInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error: null});
        };

        render(){
            console.log("render");

            return (
                <Aux>
                    <Modal
                        show={this.state.error !== null}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};



export default withErrorHandler;