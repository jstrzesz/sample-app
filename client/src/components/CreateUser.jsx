import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      image: ''
    }
    this.redirectToUserData = this.redirectToUserData.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword1 = this.updatePassword1.bind(this);
    this.updatePassword2 = this.updatePassword2.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  updateUsername(e) {
    e.preventDefault();
    this.setState({ username: e.target.value })
  }

  updateEmail(e) {
    e.preventDefault();
    this.setState({ email: e.target.value })
  }

  updatePassword1(e) {
    e.preventDefault();
    this.setState({ password1: e.target.value })
  }

  updatePassword2(e) {
    e.preventDefault();
    this.setState({ password2: e.target.value })
  }

  updateImage(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({ image: e.target.value })
  }

  redirectToUserData() {
    this.props.history.push('/userInfo');
  }
  render() {
    return (
      <div className="container" style={{background: 'lightblue'}}>
	    <div className="row">
		  <div className="col-md-12">
		  	<form role="form">
          <div className="form-group">
            <label for="usernameInput">Username</label>
            <input type="username" className="form-control" id="usernameInput" onChange={this.updateUsername}/>
          </div>
				<div className="form-group">
					<label for="emailInput">Email address</label>
					<input type="email" className="form-control" id="emailInput" onChange={this.updateEmail}/>
				</div>
				<div className="form-group">
					<label for="passwordInput">Password</label>
					<input type="password1" className="form-control" id="passwordInput1" onChange={this.updatePassword1}/>
				</div>
        <div className="form-group">
          <label for="passwordInput">Re-Enter Password</label>
          <input type="password2" className="form-control" id="passwordInput2" onChange={this.updatePassword2}/>
        </div>
				<div className="form-group"> 
					<label for="fileInput">Upload Image</label>
					<input type="file" className="form-control-file" id="fileInput" />
				</div>
        
				<div className="checkbox">
					<label>
						<input type="checkbox" /> I am not a robot
					</label>
				</div> 
				<button type="submit" className="btn btn-primary" onClick={this.redirectToUserData}>Submit</button>
			</form>
		</div>
	</div>
</div>
    )
  }
}