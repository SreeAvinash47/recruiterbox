import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getKudos } from '../../actions/kudoActions';

class Dashboard extends Component {
    render() {
        const {user} = this.props.auth;
        const {my_kudos} = this.props;
        return (
            <div>
               You are logged in as {user.name} 
               <Link to='/givekudos'>Give Kudos</Link>
               <button onClick={()=>this.props.getKudos()}>My Kudos</button>
               My Kudos
               <div>
                   {my_kudos.map((item,index)=>(
                       <div key={index}>{item.message}</div>
                   ))}
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    my_kudos: state.kudos.my_kudos
  });

export default connect(mapStateToProps, {getKudos})(Dashboard);