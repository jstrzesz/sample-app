import React, { Component } from 'react';
import axios from 'axios';

export default class About extends Component {
  constructor(props) {
    super(props);
    console.log(props, 'about')
    this.state = {
      aboutMe: '',
      aboutMeReceived: ''
    }; 
    this.updateAboutMe = this.updateAboutMe.bind(this);
    this.submitAboutMe = this.submitAboutMe.bind(this);
  }

  updateAboutMe(e) {
    e.preventDefault();
    this.setState({ aboutMe: e.target.value })
    // this.refs.form.reset();
  }

  submitAboutMe(e) {
    e.preventDefault();
    const params = {
      about: this.state.aboutMe,
      id: this.props.id
    };

    axios.post('/about', params)
      .then(res => {
        console.log(res, 'About line 25')
        this.setState({ aboutMeReceived: res.data })
        this.refs.form.reset();
      })
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <th>About Me</th>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.aboutMeReceived}</td>
            </tr>
            <br/>
            <br/>
            <tr>
              <td>
              <form ref="form">
                <div className="form-group" >
                  <label htmlFor="aboutMe">About Me</label>
                  <input type="text" className="form-control" id="aboutMe" placeholder="" onChange={this.updateAboutMe}/>
                </div>
                <button className="btn" type="submit" onClick={this.submitAboutMe}>Submit</button>
              </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}