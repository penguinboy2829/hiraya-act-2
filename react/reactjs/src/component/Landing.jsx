import React from 'react';
import { useEffect, useEffectEvent } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import '../OJT.css';

function Landing({}) {
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
  }, []); // empty dependency array to run the effect only once on mount

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
              <input id="login" type="text" placeholder="First Name" />
              <input id="login" type="text" placeholder="Last Name" />
              <input id="login" type="text" placeholder="Username" />
              <input id="login" type="email" placeholder="Email" />
              <input id="login" type="password" placeholder="Password" />
              <button className = 'button'>Sign Up</button>
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
              <input id="login" type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot your password?</a>
              <a href = '/' className = 'button'>
                Log In
              </a>
                
            </form>
          </div>
            
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">
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
