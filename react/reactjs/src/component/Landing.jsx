import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import '../OJT.css';

function Landing({}) {
    return (
      <div className='col d-flex border m-2 align-items-center justify-content-center' style={{ height: "100vh" }}>
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
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Sign Up</button>
                
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
                <input type="email" placeholder="Email" />
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