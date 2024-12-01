import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import Footer from '../Footer/Footer';
import Marquee from '../Marquee/Marquee';
import Collection from '../Collection';

const NavbarCarousel = () => {
    const [sliderItems, setSliderItems] = useState([
        { src: "image/01.png", author: "LUNDEV", title: "DESIGN SLIDER", topic: "ANIMAL", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?" },
        { src: "image/05.jpeg", author: "LUNDEV", title: "DESIGN SLIDER", topic: "ANIMAL", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?" },
        { src: "image/0010.png", author: "LUNDEV", title: "DESIGN SLIDER", topic: "ANIMAL", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?" },
        { src: "image/08.jpeg", author: "LUNDEV", title: "DESIGN SLIDER", topic: "ANIMAL", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?" }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [walletAddress, setWalletAddress] = useState(""); // To store wallet address
    const timeoutRef = useRef(null);
    const autoNextTimeoutRef = useRef(null);
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const showSlider = (type) => {
        resetTimeout();
        if (type === 'next') {
            setSliderItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
        } else {
            setSliderItems((prevItems) => [prevItems[prevItems.length - 1], ...prevItems.slice(0, prevItems.length - 1)]);
            setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderItems.length) % sliderItems.length);
        }
        timeoutRef.current = setTimeout(() => {
            document.querySelector('.carousel').classList.remove('next', 'prev');
        }, timeRunning);

        clearTimeout(autoNextTimeoutRef.current);
        autoNextTimeoutRef.current = setTimeout(() => {
            document.getElementById('next').click();
        }, timeAutoNext);
    };

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]); // Set the wallet address after connection
            } catch (error) {
                console.error("User rejected the request:", error);
            }
        } else {
            alert("Please install MetaMask to use this feature.");
        }
    };

    useEffect(() => {
        autoNextTimeoutRef.current = setTimeout(() => {
            document.getElementById('next').click();
        }, timeAutoNext);

        return () => {
            clearTimeout(autoNextTimeoutRef.current);
        };
    }, []);

    return (
        <>
<div id="cover">
        <div id="ioi">
            {/* Navbar */}
            <header>
                <nav id="upper">
                    <div>
                    <a href="/">Home</a>
                    <a href="/contacts">Contacts</a>
                    <a href="/info">Info</a>
                    </div>
                    
                    <button  id="mybutton"onClick={connectMetaMask}>
                        {walletAddress ? walletAddress : "Connect MetaMask"}
                    </button>
                </nav>
            </header>

            {/* Carousel */}
            <div className="carousel">
                <div className="list">
                    {sliderItems.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.src} alt={item.title} />
                            <div className="content">
                                <div className="author">{item.author}</div>
                                <div className="title">{item.title}</div>
                                <div className="topic">{item.topic}</div>
                                <div className="des">{item.description}</div>
                                <div className="buttons">
                                    <button>SEE MORE</button>
                                    <button>SUBSCRIBE</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="thumbnail">
                    {sliderItems.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.src} alt={item.title} />
                            <div className="content">
                                <div className="title">Name Slider</div>
                                <div className="description">Description</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="arrows">
                    <button id="prev" onClick={() => showSlider('prev')}>&lt;</button>
                    <button id="next" onClick={() => showSlider('next')}>&gt;</button>
                </div>
                <div className="time"></div>
            </div>
        </div>
   
   
        </div>

      </>
    );
};

export default NavbarCarousel;
