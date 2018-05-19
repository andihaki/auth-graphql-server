import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import currentUserQuery from '../queries/CurrentUser';
//High Order Component

export default(WrappedComponent) => {
    class requireAuth extends Component{        
        // selalu dipanggil setiap ada query update
        componentWillUpdate(nextProps){            
            // loading data belum selesai dan data user tidak ada maka lempar ke login
            if(!nextProps.data.user && !nextProps.data.loading){
                hashHistory.push('/login');
            }
        }
        render(){
            return <WrappedComponent {...this.props} />;
        }
    }
    return graphql(currentUserQuery)(requireAuth);
}
