import React, { Component } from 'react';
import {BASE_URL,GET_FULL_URL} from "../utils/constants"



class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            badReq:false
         };
    
      }
    componentWillMount() {
        let varr = window.location.pathname.replace(/[^\w\s]/gi, '')
        fetch(BASE_URL+GET_FULL_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                short_url: varr,
            })
        })
            .then(response => response.json())
            .then(res => {
                if(res.status===200){
                    let urlToRedirect;

                    let status = res.full_url.includes("https://");
                    if(status){
                        urlToRedirect = res.full_url
                    }else{
                        urlToRedirect = 'https://' + res.full_url
                    }
                    this.setState({badReq:false},()=>{
                        window.location.replace(urlToRedirect)
                    })
                }else{
                    this.setState({badReq:true})
                }
            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                {this.state.badReq&&<div><h2>Contact Page</h2></div>}
            </div>
        );
    }
}

export default Contact;