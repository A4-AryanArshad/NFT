import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner'; // Import the loader component
import '../Components/login.css';
import Navbar from './Navbar';



const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credential.email, password: credential.password }),
      });

      const json = await response.json();

      if (json.success && !json.verify) {
        alert("Please complete email verification first");
        navigate(`/Email_Verify?email=${credential.email}`);
      } else if (!json.success) {
        alert("Invalid credentials");
        navigate("/Login");
      } else if (json.success && json.verify) {
        localStorage.setItem('token', json.token);
        props.showalert("Successfully Logged In", "Success");
        navigate("/Home");
      }
    } catch (error) {
      console.error("Error during login:", error);
      props.showalert("Account Not Found", "Failure");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const hidePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <Navbar />
      <div className={`signup-container1 ${loading ? 'blur-background' : ''}`}>
        <div className="info-box1">
          <h1 style={{ color: 'black', fontFamily: "inherit", fontWeight: 'bold', fontStyle: 'revert', fontSize: '50px' }}>Welcome Back</h1>
          <p>Log in to access an exclusive collection of NFTs, each offering something rare and unique. Discover a wide range of digital assets that you won’t find anywhere else. Whether you're a collector or just exploring, exciting new possibilities await!</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
            New here?
            <Link
              to="/Signup"
              style={{
                textDecoration: 'none',
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '50px',
                marginLeft: '10px',
                fontWeight: 'bold',
              }}
            >
              Get Register
            </Link>
          </p>
        </div>

        <div className="wrapper1">
          <div className="form-box1 login">
            <form onSubmit={handleSubmit}>
              <h1 style={{ color: 'white' }}><b>Login</b></h1>
              <div className="input-box1">
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  onChange={onChange}
                  value={credential.email}
                />
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="input-box1">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  value={credential.password}
                  onChange={onChange}
                />
                <i
                  className={`fa-solid ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                  onClick={hidePassword}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>

              <div className="remember-forgot">
                <label className='lable1' style={{ color: 'white' }}><input type="checkbox" /> Remember me</label>
                <Link to="/ForgotPage" style={{ color: 'white' }}>Forgot password?</Link>
              </div>
              <br />
              <button type="submit" className="button1" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className="register-link1">
                <p>Don't have an account? <Link to="/Signup" style={{ paddingLeft: '10px' }}>Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loader">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        </div>
      )}
    </>
  );
};

export default Login;
