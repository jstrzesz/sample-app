import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
// import './App.css';
import Individual from './individualUser';
import Nav from './Nav';
import './Home.css';
import About from '../components/About.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      foundUser: {},
      dropdownIsOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.toggleOpenDropdown = this.toggleOpenDropdown.bind(this);
    this.sortByUsername = this.sortByUsername.bind(this);
  }

  componentDidMount() {
    fetch('/randomUsers')

    axios.get('/users')
      .then(res => {
        console.log(res);
        this.setState({ users: res.data })
      });
  }

  toggleOpenDropdown() {
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen })
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
    // console.log(params, 'line 25');
    axios.post('/input', params)
      .then(res => {
        console.log('post sent', res)
        this.setState({ foundUser: res.data })
        console.log(this.state.foundUser)
        this.redirectToProfile();
      })
      .catch(err => console.error(err))
  }

  sortByUsername() {
    this.state.users.sort((x, y) => {
      if (x.fullName < y.fullName) {
        return -1;
      }
      if (x.fullName > y.fullName) {
        return 1;
      }
      return 0;
    })
    // console.log(sortedArr);
  }

  redirectToProfile() {
    this.props.history.push('/profile', { foundUser: this.state.foundUser });
  }


  render() {
    const dropdownMenuClass = `dropdown-menu${this.state.dropdownIsOpen ? " show" : ""}`;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div>
                  <h1>Users</h1>
                </div>
                  <form className="form-inline" onSubmit={this.handleSubmit}>
                    <input className="form-control mr-sm-2" type="text" onChange={this.handleChange} />
                    <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                  </form>
                  <ul>

                <div className="dropdown" onClick={this.toggleOpenDropdown}>
                  <button className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true">Sort</button>
                    <div className={dropdownMenuClass} aria-labelledby="dropdownMenuButton" onClick={this.sortByUsername}>
                      Sort By Username
                    </div>
                    </div>
                  </ul>
              </nav>
              <div className="row">
                <div className="col-md-1"></div>
              
                <div className="col-md-10">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>User Since</th>
                        <th>Time</th>

                      </tr>
                    </thead>
                    <tbody>{this.state.users.map(user => {
                      // console.log(user, 'line 60')
                      return (<Individual key={user.id}
                        name={user.fullName}
                        img={user.image}
                        phone={user.phone}
                        email={user.email}
                        joined={user.registration}
                        years={user.yearsOfRegistration}
                        city={user.city} />)
                    })}</tbody>
                  </table>
                </div>
              <div className="col-md-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


