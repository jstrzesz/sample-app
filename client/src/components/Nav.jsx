import React, { Component } from 'react';
import axios from 'axios';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    // console.log(props, 'Nav');
    this.state = {
      input: '',
      foundUser: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
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
        this.setState({ user: res.data })
        this.redirectToProfile();
      })
      .catch(err => console.error(err))
  }

  redirectToProfile() {
    this.props.history.push('/profile', { foundUser: this.state.foundUser });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="navbar-toggler-icon"></span>
        </button> <a className="navbar-brand" href="#">Brand</a>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Link <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown">Dropdown link</a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a> <a className="dropdown-item" href="#">Another action</a> <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider">
                </div> <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
          </ul>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <input className="form-control mr-sm-2" type="text" onChange={this.handleChange}/>
            <button className="btn btn-primary my-2 my-sm-0" type="submit" onClick={this.redirectToProfile}>
              Search
						</button>
          </form>
        </div>
      </nav>
    )
  }
}