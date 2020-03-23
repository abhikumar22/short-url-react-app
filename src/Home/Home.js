import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "./Home.css";
import {BASE_URL,GET_SHORT_URL,NETLIFY_URL} from "../utils/constants"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', toShow: false, resultWebPage: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  loginFun(event) {
    fetch(BASE_URL+GET_SHORT_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.state.value,
      })
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ toShow: true, resultWebPage: res.short_url })
      })
      .catch(error => console.log('Authorization failed : ' + error.message));
  }

  goToThePage() {
    let url = '/' + this.state.resultWebPage
    window.open(url)
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Short Url Service</h1>
          <form>
            {/* <Button variant="btn btn-success" onClick={() => history.push('/Products')}>Click button to view products</Button> */}
            {/* <Button variant="btn btn-success" onClick={() => history.push('/AllUserScreen')}>Click to login</Button> */}
          </form>

          <form onSubmit={this.handleSubmit}>
            <label>
          <input placeholder={'enter long url'} type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            {/* <input type="submit" value="Submit" /> */}
            <Button variant="btn btn-success" onClick={() => this.loginFun()}>Click to Generate Url</Button>
          </form>

        </div>
        {this.state.toShow &&
        <div style={{alignSelf:'center',justifyContent:'center',width:'100%'}}>
         <p>{NETLIFY_URL+this.state.resultWebPage}</p>
          <button  style={{cursor: 'pointer'}} onClick={() => { this.goToThePage() }}>click to redirect</button>
         <button onClick={() => {navigator.clipboard.writeText(NETLIFY_URL+this.state.resultWebPage)}}>click here to copy</button>
         </div>
         }
     
      </div>
    );
  }
}
