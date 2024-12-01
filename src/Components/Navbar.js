import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../Components/navbar.css';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  
  const [credential, setCredential] = useState({ namee: "Name", emaile: "Email" });

  const getuser = async () => {
    const tokenn = localStorage.getItem('token');
    console.log(tokenn);
    if (!tokenn) {
      console.warn("No token found in local storage.");
      return null; // No token found
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/getdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': tokenn,
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error fetching user data:", errorResponse.error);
        alert(errorResponse.error);
        return null; // Indicate failure to fetch user data
      }
  
      const json = await response.json();
      console.log("User data received:", json); // Log the user data received
  
      if (json.user) {
        const userData = {
          namee: json.user.name || "Name",
          emaile: json.user.email || "Email"
        };
        setCredential(userData);
        localStorage.setItem('user', JSON.stringify({ name: json.user.name, email: json.user.email }));
        return userData; // Return user data
      } else {
        console.warn("No user data in response:", json);
        return null; // No user data in the response
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      return null; // Indicate failure
    }
  };
  

  const handleViewProfile = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    
    const userData = await getuser(); // Wait for user data to be fetched
    if (userData) {
      console.log('Navigating to Dashboard with:', userData);
      navigate("/dashboard", { state: userData });
    } else {
      console.error("User credentials not available.");
    }
  };

  const handleLogout = () => {
    // Clear all local storage items
    localStorage.clear();
    navigate("/login");

    
  };
  

  useEffect(() => {
    getuser(); // Fetch user data on mount
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/home" style={{ fontSize: '25px', fontFamily: "monospace", fontStyle: 'oblique', fontWeight: 'bold' }}>
        MetaMart
      </Link>
  
      {/* Toggler should align to the left */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  
      {/* Collapse section for navbar items */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ paddingLeft: '20px' }}>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontFamily: 'initial', fontStyle: 'revert', fontSize: '18px' }}>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/aboutus">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create_nft">Create</Link>
          </li>
        </ul>
  
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '300px' }} />
          <button className="btn search-button" type="submit" style={{ width: '100px' }}>Search</button>
        </form>
  
        {/* User authentication buttons */}
        {localStorage.getItem('token') ? (
          <li className="nav-item dropdown ms-auto" style={{ paddingBottom: '0px' }}>
            <Link className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0', fontSize: '20px', backgroundImage: 'none' }}>
              {credential.namee.charAt(0)}
            </Link>
            <ul className="dropdown-menu" style={{ zIndex: '1000', backgroundColor: 'white', left: 'auto', right: '0' }}>
              <li><Link className="dropdown-item" onClick={handleViewProfile}>View Profile</Link></li>
              <li><Link className="dropdown-item" onClick={handleViewProfile}>Owned NFTs</Link></li>
              <li><Link className="dropdown-item" onClick={handleViewProfile}>NFT collection</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="#" onClick={handleLogout}>Logout</Link></li>
            </ul>
          </li>
        ) : (
          <form className="d-flex ms-auto" role="search">
            <Link type="button" className="btn btn-primary me-2" to="/login">Login</Link>
            <Link type="button" className="btn btn-primary" to="/signup">Signup</Link>
          </form>
        )}
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
