import React, { useEffect, useState } from 'react';
import '../Components/contact.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  const [animateBox1, setAnimateBox1] = useState(false);
  const [animateBox2, setAnimateBox2] = useState(false);
  const [animateMap, setAnimateMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBox1(true);
    }, 100); 

    const timer2 = setTimeout(() => {
      setAnimateBox2(true);
    }, 300); 

    const timer3 = setTimeout(() => {
      setAnimateMap(true);
    }, 500); 

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <>
      <Navbar />
      <h1 style={{ fontSize: '35px', fontWeight: 'bold', fontFamily: 'cursive', fontStyle: "revert", color: 'black', marginTop: '150px', marginLeft: '20px' }}>For Any Information :</h1>
      <p style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'cursive', fontStyle: "revert", color: 'black', marginLeft: '20px' }}>
        Feel free to contact us or give us a call. We're available 24/7 to assist with any inquiries or support you may need. Your satisfaction is our priority, and we look forward to hearing from you! You can contact us through email, phone, or visit us at our office. We strive to respond as quickly as possible and look forward to connecting with you.
      </p>

      <div className='contacts'>
        <div className={`box b1 ${animateBox1 ? 'animate slide-in-left' : ''}`}>
          <h1 style={{ fontFamily: 'cursive', color: 'white', fontSize: '30px', fontWeight: 'bold', fontStyle: 'revert', textAlign: 'center' }}>Send Us Message</h1>
          <br />
          <br />
          <label>Email</label>
          <input type="text" />
          <br />
          <label>Password</label>
          <input type="text" />
          <br />
          <label>Message</label>
          <input type="textarea" />
          <button className='btn'>Send Message</button>
        </div>

        <div className={`box b2 ${animateBox2 ? 'animate slide-in-right' : ''}`}>
          <h1 style={{ fontFamily: 'cursive', color: 'black', fontSize: '35px', fontWeight: 'bold', fontStyle: 'initial', textAlign: 'center' }}>Contact Us</h1>
          <div className="contact-item">
            <i className="fa-solid fa-location-dot fa-3x"></i>
            <p>Neat Millat Tractor Sheikupura Road Lahore</p>
          </div>
          <div className="contact-item">
            <i className="fa-solid fa-envelope fa-3x"></i>
            <p>sohialshahid706@gmail.com</p>
          </div>
          <div className="contact-item">
            <i className="fa-solid fa-phone-volume fa-3x"></i>
            <p>(+92) 310 4464875</p>
          </div>
          <div className="contact-item">
            <h2 style={{ color: 'black', fontFamily: 'cursive', fontStyle: 'initial', fontWeight: 'bold' }}>Note:</h2>
            <p style={{ fontFamily: 'cursive', fontStyle: 'revert', fontSize: '14px', color: 'black', marginTop: '20px', paddingLeft: '10px' }}>
              Kindly contact us. Service available 24/7. If no one responds, please <br /> be patient as it may be a system error. We will contact you soon.
            </p>
          </div>
        </div>
      </div>

      <div className={`map ${animateMap ? 'animate slide-in-left' : ''}`}>
        <h1 style={{ fontFamily: 'cursive', color: 'black', fontSize: '35px', fontWeight: 'bold', fontStyle: 'initial', textAlign: 'center', marginTop: '20px' }}>Location (Map):</h1>
        <br /><br /><br />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13590.550237309675!2d74.260781!3d31.6163897!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191db5947915ad%3A0x71a0babc7c51eb4f!2zTWlsbGF0IFRyYWN0b3JzIExpbWl0ZWQgKNmF2YTYqiDZudix24zaqdm52LHYsiDZhNmF24zZudqIKQ!5e0!3m2!1sen!2s!4v1729351577100!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <br /><br /><br /><br />
      <Footer />
    </>
  );
}

export default Contact;
