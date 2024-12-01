import React from 'react'
import './Marquee.css';
import Scroll from '../Scroll/Scroll';
import Scroll2 from '../Scroll2/Scroll2';
import Scroll3 from '../Scroll3/Scroll3';
import Marquee2 from '../Marquee2/Marquee2';
import Scroll4 from '../Scroll4/Scroll4';
import Marquee3 from '../Marquee3/Merquee3';

const Marquee = () => {
  return (
    <>
    <Scroll/>
<div id="cen">
    <h1 id="one">ENTER </h1>
    <h1 id="two">THE </h1>
    <h1 id="three">OTHERSIDE</h1>
</div>
<div id="wrap2">
<div id="wrap">
<p>You got here just in time.</p>
<p id="opui">Otherside is a gamified, interoperable metaverse currently under development. The game blends mechanics from massively multiplayer online role playing games (MMORPGs) and web3-enabled virtual worlds. Think of it as a metaRPG where the players own the world, your NFTs can become playable characters, and thousands can play together in real time.</p>
</div>
</div>
<Scroll2/>
<Marquee2/>
<Scroll3/>
<Scroll4/>
<Marquee3/>


</>
  )
}

export default Marquee