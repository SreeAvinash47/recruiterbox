import React, { Component } from 'react'
import {connect} from 'react-redux'

class Dashboard extends Component {
    render() {
        const {isAuthenticated, user} = this.props.auth;
        return (
            <div>
               You are logged in as {user.name} 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(Dashboard);