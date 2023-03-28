import { useState } from 'react';
import axios from "axios"
import { useEffect, useEffectEvent } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import '../OJT.css';

function Landing() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [uname, setUname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

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
    axios.post('http://127.0.0.1:5000/tixsys/register',
    {
        first_name: fname,
        last_name: lname,
        username: uname,
        email: email,
        password: password
    },
    {
      headers: {
        token: ""
      }
    }
    )
      .then(result => {
      console.log(result.data)
      alert('Sign up success')
    })
    .catch(error => {
      alert('Service Error')
      console.log(error)
    })
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

    // Cleanup function to remove event listeners
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
      <div className='col d-flex border align-items-center justify-content-center' 
          style={{ height: "100vh", paddingLeft: "20vw", paddingRight: "20vw"}}>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="/" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="/project" className="social">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-slack" />
                </a>
              </div>
              <span>or use your email for registration</span>
              <input className="login" onChange= {handleFname} value = {fname} type="text" placeholder="First Name" required/>
              <input className="login" onChange= {handleLname} value = {lname} type="text" placeholder="Last Name" required/>
              <input className="login" onChange= {handleUname} value = {uname} type="text" placeholder="Username" required/>
              <input className="login" onChange= {handleEmail} value = {email} type="email" placeholder="Email" required/>
              <input className="login" onChange= {handlePassword} value = {password} type="password" placeholder="Password" required/>
              <button className = 'button' onClick={handleRegister}>Sign Up</button>
            </form>
          </div>
      
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-slack" />
                </a>
              </div>
              <span>or use your account</span>
              <input className="login"  onChange= {handleEmail} value = {email} type="email" placeholder="Email" />
              <input type="password"  onChange= {handlePassword} value = {password} placeholder="Password" />
              <a id="forgot" href="#">Forgot your password?</a>
              <a href ="/tixsys" className = 'button'>
                Log In
                </a>
                
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
    );
}

export default Landing;
