import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Components/creation_nft.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [animateBox1, setAnimateBox1] = useState(false);
  const [animateBox2, setAnimateBox2] = useState(false);
  const [nftDetails, setNftDetails] = useState({
    image: null,
    name: '',
    description: '',
    price: '',
    expirationDate: '',
    collection: '',
    royalties: '',
  });

  useEffect(() => {
    // Check user login status at regular intervals
    const interval = setInterval(() => {
      const isLoggedIn = !!localStorage.getItem('token'); // Example check, replace with your logic

      if (!isLoggedIn) {
        navigate('/home'); // Redirect to home page if user is not logged in
      }
    }, 1000); // Check every second (adjust as necessary)

    // Animation setup
    const timer1 = setTimeout(() => {
      setAnimateBox1(true);
    }, 100); // Delay for box 1

    const timer2 = setTimeout(() => {
      setAnimateBox2(true);
    }, 300); // Delay for box 2

    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]); // Add navigate to dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftDetails({
      ...nftDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNftDetails({
      ...nftDetails,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <>
      <Navbar />
      <h1 style={{ fontSize: '35px', fontWeight: 'bold', fontFamily: 'cursive', color: 'black', marginTop: '150px', marginLeft: '20px' }}>NFT Creation :</h1>
      <p style={{ fontSize: '15px', fontWeight: 'bold', fontFamily: 'cursive', color: 'black', marginLeft: '20px' }}>
        Please fill in the details below to create your very own NFT.
        This includes important information such as the name, description, and price.
        Make sure to upload a high-quality image that represents your NFT well.
        Additionally, provide the necessary information, including royalties and expiration date.
      </p>

      <div className='contacts'>
        {/* Box 1 - NFT Creation Form */}
        <div className={`box b1 ${animateBox1 ? 'animate slide-in-left' : ''}`}>
          <h1 style={{ fontFamily: 'cursive', color: 'white', fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Create NFT Here </h1>
          <br />
          <button className="btnn"> ON Ethereum </button>
          <label>Upload Image*</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          <label>Name*</label>
          <input type="text" name="name" placeholder="Enter NFT Name" onChange={handleInputChange} />
          <br />
          <label>Description*</label>
          <input type="textarea" name="description" placeholder="Enter Description" onChange={handleInputChange} />
          <br />
          <label>Price (in Ethereum)*</label>
          <input type="number" name="price" placeholder="Enter Price" onChange={handleInputChange} />
          <br />
          <label>Expiration Date*</label>
          <input type="date" name="expirationDate" onChange={handleInputChange} />
          <br />
          <label>Choose Collection</label>
          <select name="collection" onChange={handleInputChange}>
            <option value="">Select Collection</option>
            <option value="collection1">Collection 1</option>
            <option value="collection2">Collection 2</option>
            <option value="collection3">Collection 3</option>
          </select>
          <br />
          <label>Royalties (%)*</label>
          <input type="text" name="royalties" placeholder="Enter Royalties" onChange={handleInputChange} />
          <button className='btn'>Create NFT</button>
        </div>

        {/* Box 2 - NFT Preview */}
        <div className={`box b2 ${animateBox2 ? 'animate slide-in-right' : ''}`}>
          <h1 style={{ fontFamily: 'cursive', color: 'black', fontSize: '35px', fontWeight: 'bold', textAlign: 'center' }}>Preview Your NFT</h1>
          <div className="preview-content">
            {nftDetails.image && (
              <img src={nftDetails.image} alt="NFT Preview" className="nft-preview" />
            )}
            <div className="nft-details">
              <label>Name</label>
              <input type="text" value={nftDetails.name} disabled />

              <label>Description</label>
              <input type="textarea" value={nftDetails.description} disabled />

              <label>Price (in Ethereum)</label>
              <input type="text" value={nftDetails.price} disabled />

              <label>Expiration Date</label>
              <input type="text" value={nftDetails.expirationDate} disabled />

              <label>Collection</label>
              <input type="text" value={nftDetails.collection} disabled />

              <label>Royalties (%)</label>
              <input type="text" value={nftDetails.royalties} disabled />
            </div>
          </div>
        </div>
      </div>

      <br /><br /><br /><br />
      <Footer />
    </>
  );
}

export default Contact;
