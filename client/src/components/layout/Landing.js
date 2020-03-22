import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    render(){
        return (
            <div>
                Hello nobody, Please register or login
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps)(Landing);