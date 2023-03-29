import { useState } from 'react';
import {LoginSocialFacebook} from 'reactjs-social-login'
import {LoginSocialGoogle } from 'reactjs-social-login';
import {LoginSocialGithub} from 'reactjs-social-login';
import { useEffect, useEffectEvent } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link, Navigate, Redirect  } from "react-router-dom";
import axios from "axios";
import '../OJT.css';

export const API_URL = "http://127.0.0.1:5000";

const CLIENT_ID = "840fbd6329d3b87f6d7a"

function loginWithGithub(){
  window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}

function Landing() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [uname, setUname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  

  const handleFname = (event)=>{
    setFname(event.target.value)
  }
  const handleLname = (event)=>{
    setLname(event.target.value)
  }

  const handleUname = (event)=>{
    setUname(event.target.value)
  }

  const handleEmail = (event)=>{
    setEmail(event.target.value)
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }

  const handleRegister = () =>{
    console.log (fname, lname, uname, email, password)
    axios.post(`${API_URL}/tixsys/register`,
    {
        first_name: fname,
        last_name: lname,
        username: uname,
        email: email,
        password: password
    }
    )
      .then(result => {
      console.log(result.data)
      alert('Sign up Success!')
    })
    .catch(error => {
      alert('Service Error')
      console.log(error)
    })
  }

  const handleLogin = () =>{
    console.log (email, password)

    axios
      .post(`${API_URL}/tixsys/login`,
        {
            email: email,
            password: password
        }
      )
      .then(result => {
          if(email !== "" && password !== "" ){
            const token = result.data.access_token;
            localStorage.setItem('token', token);
            console.log(token)
            alert('Login success')
            setLoggedIn(true);
          }else{
            alert('Error!')
          }
        }
      )
    .catch(error => {
      alert('Service Error')
      console.log(error)
      }
    )
  }

   useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
   
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
        
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    return () => {
      signUpButton.removeEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
        
      signInButton.removeEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    };
  }) 
 

    return (
      <>
      {loggedIn? (<Navigate to = '/tixsys' />):(null)}
        <div className='col d-flex border align-items-center justify-content-center' 
        style={{ height: "100vh", paddingLeft: "20vw", paddingRight: "20vw"}}>
          <div className="container" id="container">
            <div className="form-container sign-up-container">
              <form action="#">
                <h1>Create Account</h1>
                
                {/* <span>or use your email for registration</span> */}
                <input className="login mb-2" onChange= {handleFname} value = {fname} type="text" placeholder="First Name" required/>
                <input className="login mb-2" onChange= {handleLname} value = {lname} type="text" placeholder="Last Name" required/>
                <input className="login mb-2" onChange= {handleUname} value = {uname} type="text" placeholder="Username" required/>
                <input className="login mb-2" onChange= {handleEmail} value = {email} type="email" placeholder="Email" required/>
                <input className="login mb-2" onChange= {handlePassword} value = {password} type="password" placeholder="Password" required/>
                <button className = 'button' onClick={handleRegister}>Sign Up</button>
              </form>
            </div>
        
            <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="" className="social">
                  <LoginSocialFacebook
                      appId ="583228890409051"
                      onResolve={(response) =>{
                        console.log(response);
                      }}
                      onReject={(error) =>{
                        alert('HAHA')
                        console.log(error);
                      }}
                      >
                        <i className="fab fa-facebook-f"/>
                    </LoginSocialFacebook>
                </a>
                <a href="#" className="social">
                <LoginSocialGoogle
                     client_id ={"900638633715-m1nnngmr7931q6ch5pbusn0rur76h9tj.apps.googleusercontent.com"}
                     scope ="openid profile email"
                     discoveryDocs="claims_supported"
                     access_type="offline"
                     onResolve={({provider,data}) =>{
                       console.log(provider,data);
                     }}
                     onReject={(error) =>{
                       console.log(error);
                     }}
                     >
                        <i className="fab fa-google" />
                    </LoginSocialGoogle>
                </a>
                <a href="#" className="social">
                <LoginSocialGithub
              
                      >
                        <i className="fab fa-github"  onClick={loginWithGithub}/>
                    </LoginSocialGithub>
                </a>
              </div>
              <span>or use your account</span>
              <input className="login mb-2"  onChange= {handleEmail} value = {email} type="email" placeholder="Email" />
              <input type="password"  onChange= {handlePassword} value = {password} placeholder="Password" />
              <a id="forgot" href="#">Forgot your password?</a>
              <button className = 'button' onClick={handleLogin}>Login</button>
            </form>
          </div>
              
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button  className="ghost" id="signIn">
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>   
                  <button className="ghost" id="signUp">
                    Sign Up
                  </button>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      
    );
}

export default Landing;
