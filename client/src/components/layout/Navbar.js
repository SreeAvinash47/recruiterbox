import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component{
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();
    }
    render(){
        const { isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul>
                <li>
                    <Link to='/dashboard'>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <a href="" onClick={(e)=>this.onLogoutClick(e)} >
                        Logout
                    </a>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul>
                <li>
                    <Link to='/register'>
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>
            </ul>
        );
        return(<nav>
            <div>
                <Link to='/'>
                    Sree47
                </Link>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>)
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);