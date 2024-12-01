import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner';
import '../Components/signup.css';
import Footer from './Footer';

const Signup = (props) => {
  const [credential, setCredential] = useState({ name: "", email: "", password: ""});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader
  const navigate = useNavigate();

  const handleScroll = () => {
    const elements = document.querySelectorAll('.animate');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        el.classList.add('in-view');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(credential.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true); // Show loader
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credential),
    });

    const json = await response.json();
    setLoading(false); // Hide loader

    if (json.success) {
      props.showalert("Account Created Successfully. Please verify your email.", "Success");
      navigate(`/Email_Verify?email=${credential.email}`);
    } else {
      alert(json.error || "User already exists");
      navigate("/Login");
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
  <div className={`main-content ${loading ? 'blur-background' : ''}`}>
    <div className="signup-container">
      <div className="info-box">
        <h1>Explore NFTs</h1>
        <p>Discover rare digital collectibles with NFTs on our platform! Own exclusive artworks each a unique asset just for you. Start your journey today and unlock the beauty and value of NFTs!</p>
        <p style={{ fontSize: '24px', fontFamily: "revert", fontStyle: 'initial', fontWeight: 'bold' }}>We are Providing the services:</p>
        <div className="button-group">
          <button>Create NFT</button>
          <button>Sale NFT</button>
          <button>Purchase NFT</button>
          <button>Virtual Mall</button>
          <button>Gaming Experience</button>
        </div>
      </div>
      <div className="wrapper">
        <div className="form-box register">
          <form onSubmit={handleSubmit}>
            <h1><b>Registration</b></h1>
            <div className="input-box">
              <input type="text" placeholder="Full Name" name="name" id="name" value={credential.name} onChange={onChange} required style={{ color: 'black' }} />
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" name="email" id="email" value={credential.email} onChange={onChange} required style={{ color: 'black' }} />
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="input-box">
              <input type={passwordVisible ? 'text' : 'password'} placeholder="Password" name="password" id="password" value={credential.password} onChange={onChange} required style={{ color: 'black' }} />
              <i className={`fa-solid ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`} onClick={hidePassword} style={{ cursor: 'pointer' }}></i>
            </div>
        
            <br />
            <button className='sub' type="submit">Register</button>
            <div className="register-link">
              <p>Already have an account? <Link to="/Login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <h1 style={{ fontSize: '35px', fontWeight: 'bold', fontFamily: 'cursive', fontStyle: "revert", color: 'black', marginTop: '50px', marginLeft: '20px' }}> What we Provide :</h1>
      <p style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'cursive', fontStyle: "revert", color: 'black', marginLeft: '20px' }}>
      As a leading NFT platform on Ethereum, we offer a secure and transparent marketplace. Discover unique digital assets, connect with creators, and build a valuable collection. Our platform ensures the authenticity and provenance of every NFT.
      </p>
      <div className='contain'>
        <div className='box b1 animate animate-left'>
          <img 
            src={require('../mission.jpg')} 
            alt="NFT Preview"
            style={{ height: '120px', width: '120px', borderRadius: '50%' }} 
          />
          <br></br>
          <h3>Our Mission</h3>
          <p>To inspire creativity and innovation through Technology and art and also discover a new virtual mall gaming Experience for user.</p>
        </div>

        <div className='box b2 animate animate-right'>
          <img 
            src={require('../vision.jpg')} 
            alt="NFT Preview"
            style={{ height: '120px', width: '120px', borderRadius: '50%' }} 
          />
          <br></br>
          <h3>Our Vision</h3>
          <p>To be the leader in Digital art solutions, fostering a global community of creators and also for user to Experience a new shoping platform.</p>
        </div>

        <div className='box b3 animate animate-left'>
          <img 
            src={require('../value.jpg')} 
            alt="NFT Preview"
            style={{ height: '120px', width: '120px', borderRadius: '50%' }} 
          />
          <br></br>
          <h3>Our Values</h3>
          <p>Creativity, Collaboration, and Community are at the heart of everything we do.</p>
        </div>
      </div>
        <br></br>
        <br></br>
      


        <video
        width="100%"
        height="550px"
        controls
        style={{ display: "block", margin: "0", border: "none" }}
        referrerPolicy="strict-origin-when-cross-origin"
      >
        <source
            src={require('../mall.mp4')} 
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <br />
      <br />
      <br />
    <Footer />
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

export default Signup;
