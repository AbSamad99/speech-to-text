import React,{Component} from 'react';

class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      registerName:'',
      registerEmail:'',
      registerPassword:''
    };
  }

  onNameChange=(event) => {
    this.setState({registerName:event.target.value});
  }

  onEmailChange=(event) => {
    this.setState({registerEmail:event.target.value});
  }

  onPasswordChange=(event) => {
    this.setState({registerPassword:event.target.value});
  }

  onRegisterSubmit=(event) => {
    event.preventDefault();
    fetch('https://sleepy-lake-61257.herokuapp.com/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:this.state.registerName,
        email:this.state.registerEmail,
        password:this.state.registerPassword
      })
    })
    .then(response=>response.json())
    .then(user=>{
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }

  render(){
    return(
      <div className="br3 shadow-5 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlfor="name">Name</label>
                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" type="text" name="name"  id="name"/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlfor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlfor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Register;
