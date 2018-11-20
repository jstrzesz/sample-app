import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import About from '../components/About.jsx';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      user: this.props.location.state.foundUser,
      // userId: this.props.location.state.foundUser.id,
      newPhoneNumber: '',
      retrievedNumber: '',
      aboutMe: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNewPhoneNumber = this.getNewPhoneNumber.bind(this);
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this);
    this.updateAboutMeParent = this.updateAboutMeParent.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({ input: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = {
      name: this.state.input
    };
    console.log(params, 'line 25');
    axios.post('/input', params)
      .then(res => {
        console.log('post sent', res)
        this.setState({ foundUser: res.data })
        console.log(this.state.foundUser)
        this.redirectToProfile();
      })
      .catch(err => console.error(err))
  }

  redirectToProfile() {
    this.props.history.push('/profile', { foundUser: this.state.foundUser });
  }

  getNewPhoneNumber(e) {
    this.setState({ newPhoneNumber: e.target.value })
  }

  updateAboutMeParent(e) {
    e.preventDefault();
    this.setState({ aboutMe: e.target.value })
    console.log(this.state, 'line 56')
  }

  updatePhoneNumber(e) {
    e.preventDefault();
    const params = {
      id: this.state.user._id,
      newPhoneNumber: this.state.newPhoneNumber
    };

    axios.post('/updatePhone', params)
      .then(res => {
        console.log(res)
        this.setState({ retrievedNumber: res.data })
      })
  }


  render() {
    const retrievedNumber = this.state.retrievedNumber;
    return (
      <div className="container" style={{background: 'lightblue'}}>
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link to="/">Home</Link>
                  </li>
                <li className="nav-item active">
                    <a className="navbar-brand" href="#"> </a>
                </li>
                </ul>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                  <input className="form-control mr-sm-2" type="text" onChange={this.handleChange} />
                  <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th> </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src={this.state.user.bigImage} alt="profile pic"></img>
                    <div>{this.state.user.username}</div>
                  </td>
                  <td>{this.state.user.fullName}</td>
                  <td>{this.state.user.email}</td>
                  <td>{`${this.state.user.street}, ${this.state.user.city}, ${this.state.user.state} ${this.state.user.zip}`}</td>
                  <div>
                    {retrievedNumber ? (
                      <td>{this.state.retrievedNumber}</td>
                    ) : (
                      <td>{this.state.user.phone}</td>
                    )}
                  </div>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <form >
              <div className="form-group" >
                <label htmlFor="newNumber" >New Phone Number</label>
                <input type="text" className="form-control" id="newNumber" onChange={this.getNewPhoneNumber}/>
              </div>
              <button className="btn btn-success" type="submit" onClick={this.updatePhoneNumber}>Submit</button>
            </form>
          </div>
          <div className="col-md-9">
           <About id={this.state.user._id} handler={this.updateAboutMeParent}/>
          </div>
        </div>
      </div>
    )
  }
}