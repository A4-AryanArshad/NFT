import React, { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../Components/dashboard.css';
import Owned from './Owned';
import Created from './Created';
import Collection from './Collection';
import Activity from './Activity';

const Dashboard = () => {

  const navigate = useNavigate();

  const [credential, setCredential] = useState({ namee: "Name", emaile: "Email" });
  const [coverImgLink, setCoverImgLink] = useState(null);
  const [profileImgLink, setProfileImgLink] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Toggle Dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // On mount, check token and fetch user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login');
    } else {
      const savedCredential = JSON.parse(localStorage.getItem('user'));
      if (savedCredential) {
        setCredential({
          namee: savedCredential.name,
          emaile: savedCredential.email,
        });
        fetchImages(savedCredential.email); // Fetch images using the saved email
      }
    }
  }, [navigate]);






  const fetchImages = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/getimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email in the request body
      });
      const data = await response.json();

      console.log(data.bannerImgUrl)
      console.log(data.profileImgUrl)

      if (data.success) {
        setCoverImgLink(data.bannerImgUrl);
        setProfileImgLink(data.profileImgUrl);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };








  // Function to check login status
  const checkLoginStatus = useCallback(() => {
    if (!localStorage.getItem('token')) {
      navigate('/Home');
    }
  }, [navigate]);

  // Set interval to check login status every 100 milliseconds
  useEffect(() => {
    const intervalId = setInterval(checkLoginStatus, 100);

    return () => clearInterval(intervalId);
  }, [checkLoginStatus]);






  // Function to upload Cover (Banner) Image
  const uploadCoverImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024;
  
    if (!validFileTypes.includes(file.type)) {
      return alert('Invalid file type. Please upload a JPEG or PNG image.');
    }
  
    if (file.size > maxSize) {
      return alert('File size exceeds 5MB limit.');
    }
  
    const imgLink = URL.createObjectURL(file);
    setCoverImgLink(imgLink);
  
    const formData = new FormData();
    formData.append('banner', file);  // 'banner' key matches backend expectation
    formData.append('email', credential.emaile);
  
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/updatebanner', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();

      console.log(data)

      if (data.success) {
        alert('Banner updated successfully!');
      } else {
        alert('Failed to update banner: ' + data.message);
      }
    } catch (error) {
      alert('Error uploading banner: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  







const uploadProfileImage = async (event) => {
  const file = event.target.files[0];
  console.log(file)
  if (!file) return;

  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const maxSize = 5 * 1024 * 1024;

  if (!validFileTypes.includes(file.type)) {

    return alert('Invalid file type. Please upload a JPEG , PNG or JPG image.');
  }

  if (file.size > maxSize) {
    return alert('File size exceeds 5MB limit.');
  }

  const imgLink = URL.createObjectURL(file);
  console.log(imgLink)

  setProfileImgLink(imgLink);

  const formData = new FormData();
  formData.append('profile', file);  // Ensure 'profile' matches what the backend is expecting
  formData.append('email', credential.emaile);  // Include email in form-data, not JSON

  console.log(formData);

  setLoading(true);

  try {
   const response = await fetch('http://localhost:5000/api/auth/updateprofile', {
      method: 'POST',
    
      body: formData,  
    });

    const data = await response.json();
    if (data.success) {
      alert('Profile picture updated successfully!');
    } else {
      alert('Failed to update profile picture: ' + data.message);
    }
  } catch (error) {
    alert('Error uploading profile picture: ' + error.message);
    console.error('Upload error:', error);
  } finally {
    setLoading(false);
  }
};








  const handleOptionClick = (option, event) => {
    event.preventDefault();
    setSelectedOption(option);
    closeDropdown();
  };

  useEffect(() => {
    const handleMouseLeave = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
        closeDropdown();
      }
    };

    const dropdownElement = dropdownRef.current;
    if (dropdownElement) {
      dropdownElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (dropdownElement) {
        dropdownElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div>
      <Navbar />

      {/* Cover Image Upload Section */}
      <div className="full-width-upload">
        <label htmlFor="input-cover-file" id="drop-area" className="d-block text-center">
          <input
            type="file"
            accept="image/*"
            id="input-cover-file"
            className="form-control-file"
            onChange={uploadCoverImage}
            hidden
          />
          <div
            className="image-view"
            style={{
              backgroundImage: coverImgLink ? `url(${coverImgLink})` : 'none',
              border: coverImgLink ? 'none' : '2px solid black',
            }}
          >
            {!coverImgLink && (
              <img
                src={require('../upload1.png')}
                alt="Upload icon"
                style={{ height: '160px', width: '150px' }}
              />
            )}
          </div>
        </label>
      </div>

      {/* Profile Image Upload Section */}
      <div className="profile-pic">
        <label htmlFor="input-profile-file" id="drop-area" className="d-block text-center">
          <input
            type="file"
            accept="image/*"
            id="input-profile-file"
            className="form-control-file"
            onChange={uploadProfileImage}
            hidden
          />
          <div
            className="profile-view"
            style={{
              backgroundImage: profileImgLink ? `url(${profileImgLink})` : 'none',
              border: profileImgLink ? 'none' : '2px solid black',
              borderRadius: '50%',
            }}
          >
            {!profileImgLink && (
              <img
                src={require('../profile1.png')}
                alt="Upload icon"
                style={{ height: '100px', width: '120px' }}
              />
            )}
          </div>
        </label>
      </div>

      <div className="namee" style={{ marginTop: '20px', paddingLeft: '30px' }}>
        <h1>{credential.namee} <i className="fa-solid fa-certificate fa-1x"></i> <span style={{ fontSize: '25px', fontFamily: 'inherit', fontStyle: 'normal' }}>Get Verified</span></h1>
      </div>

      <div className='editprofile'>
        <ul className="unorder">
          <li><Link to='edit'>Edit Profile</Link></li>
          <li><Link to='/owned'>Sell</Link></li>
          <li><Link to='/owned'><i className="fa-solid fa-arrow-up-right-from-square"></i></Link></li>
        </ul>
      </div>

      <div className='option'>
        <ul className="list">
          <li><Link to='/owned' onClick={(e) => handleOptionClick('Owned', e)}>Owned</Link></li>
          <li><Link to='/collection' onClick={(e) => handleOptionClick('Collection', e)}>Collection</Link></li>
          <li><Link to='/created' onClick={(e) => handleOptionClick('Created', e)}>Created</Link></li>
          <li><Link to='/activity' onClick={(e) => handleOptionClick('Activity', e)}>Activity</Link></li>
          <div className="btn-group" ref={dropdownRef}>
            <div className="dropdown" onClick={toggleDropdown}>
              <Link 
                type="button" 
                className="btn dropdown-toggle" 
                aria-expanded={isDropdownOpen}>
                More..
              </Link>
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to="#" onClick={(e) => handleOptionClick('Sold', e)}>Sold</Link></li>
                <li><Link className="dropdown-item" to="#" onClick={(e) => handleOptionClick('Liked', e)}>Liked</Link></li>
                <li><Link className="dropdown-item" to="#" onClick={(e) => handleOptionClick('Hidden', e)}>Hidden</Link></li>
              </ul>
            </div>
          </div>
        </ul>
      </div>

      <hr style={{ width: '100%', border: '1px solid #000', margin: '20px 0' }} />

      {/* Conditional Rendering Based on Selected Option */}
      {selectedOption === 'Owned' && <Owned />}
      {selectedOption === 'Collection' && <Collection />}
      {selectedOption === 'Created' && <Created />}
      {selectedOption === 'Activity' && <Activity />}
      {selectedOption === 'Sold' && <div>Sold Component Content</div>}
      {selectedOption === 'Liked' && <div>Liked Component Content</div>}
      {selectedOption === 'Hidden' && <div>Hidden Component Content</div>}
  

      {loading && <div className="spinner">Uploading...</div>}


     
    </div>
  );
};

export default Dashboard;
