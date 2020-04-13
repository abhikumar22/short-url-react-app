import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "./Home.css";
import { BASE_URL, GET_SHORT_URL, NETLIFY_URL } from "../utils/constants"
import Loader from 'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', toShow: false, resultWebPage: '', toShowLoader: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  notify = () =>{
    navigator.clipboard.writeText(NETLIFY_URL+this.state.resultWebPage)
    toast("Copied to Clipboard");
  } 

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  loginFun(event) {
    fetch(BASE_URL + GET_SHORT_URL, {
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
        this.setState({ toShow: true, toShowLoader: false, resultWebPage: res.short_url })
      })
      .catch(error => console.log('Authorization failed : ' + error.message));
  }

  goToThePage() {
    let url = '/' + this.state.resultWebPage
    window.open(url)
  }

  render() {
    return (
      <div className="Home" style={{ height: '100vh' }}>
        <div className="lander">
          <h1 style={{ color: 'white', fontWeight: 'bold' }}>Short Url Service</h1>

          <form onSubmit={this.handleSubmit} style={{ marginTop:30}}>
            <label>
              <input placeholder={'enter long url'} type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            {/* <input type="submit" value="Submit" /> */}
            <Button style={{ marginLeft: 10 }} variant="btn btn-success" onClick={() => {
              this.setState({ toShow: false, toShowLoader: true }, () => {
                this.loginFun()
              })
            }}>Click to Generate Url</Button>
          </form>

        </div>
        {!this.state.toShow ?
          <div className="lander" >
            {this.state.toShowLoader && <Loader type="Ball-Triangle" color="yellow" height={80} width={80} />}
          </div>
          :
          <div className="lander" >
            <p style={{ fontWeight: 'bold' }}>Url : {this.state.value} -> {this.state.value.length} characters</p>
            <p style={{ fontWeight: 'bold' }}>Tiny url : {NETLIFY_URL + this.state.resultWebPage} -> {this.state.resultWebPage.length + 29} characters</p>

            <button style={{ cursor: 'pointer' }} onClick={() => { this.goToThePage() }}>click to redirect</button>
            <button style={{ marginLeft: 10 }} onClick={this.notify}>copy to clipboard</button>
            <ToastContainer autoClose={2000} />
          </div>
        }

      </div>
    );
  }
}
