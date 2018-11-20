import React, { Component } from 'react';
import './IndividualUser.css';

export default class Individual extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      date: ''
    }

    this.convertedDateJoined = this.convertedDateJoined.bind(this);
  }
  convertedDateJoined() {
    let date = this.props.joined.split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2].slice(0, 2);
    this.setState({
      date: `${month}/${day}/${year}`
    })
  }

  componentDidMount() {
    this.convertedDateJoined();
  }
  render() {
    return (
      // <tr style={{background: 'white'}}>
      <tr className="userRow" >
        <td>
          <img src={this.props.img} alt="user pic" className="userImg"></img>
        </td>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
        <td>{this.props.city}</td>
        <td>{this.props.phone}</td>
        <td>{this.state.date}</td>
        <td>{this.props.years}</td>
      </tr>
      
    )
  }
}