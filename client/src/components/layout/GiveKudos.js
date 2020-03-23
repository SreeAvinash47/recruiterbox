import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getGivenKudos, giveKudos, getKudosCount} from '../../actions/kudoActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

class GiveKudos extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      message: '',
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount(){

    this.props.getGivenKudos();
    this.props.getKudosCount();
  }
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    const newKudo = {
      userName: this.state.userName,
      message: this.state.message,
    };

    this.props.giveKudos(newKudo);
    
    this.setState({
        userName:'',
        message:''
    })
  }

    render() {
        const { given_kudos, kudos_count } = this.props;
        console.log('Given kudsos: ', given_kudos)
        const errors = this.state.errors;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="UserName"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onChange}
                  error={errors.userName}
                />
                <TextAreaFieldGroup
                  placeholder="Kudos Message"
                  name="message"
                  value={this.state.message}
                  onChange={this.onChange}
                  error={errors.message}
                />
                <input type="submit" value='Give Kudo' className="" disabled={kudos_count<1} />
                </form>
               All Given Kudos 
               {given_kudos.map((item,index)=>(
                 <div key={index}>{item.name}: {item.message}</div>
               ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    given_kudos: state.kudos.given_kudos,
    kudos_count: state.kudos.kudos_count
});

export default connect(mapStateToProps, {giveKudos, getGivenKudos, getKudosCount})(GiveKudos);