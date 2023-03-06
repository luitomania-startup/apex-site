import React from "react";
import bgimg from "/bg.png";
import Design from "/design.png";
import Supply from "/supply.png";
import Construction from "/construction.png";
import About from "../About";
import Career from "../Career";
import Services from "../Services";
import Payment from "../Payment";
import Gallery from "../Gallery";
import Footer from "../../components/Footer";
import Events from "../Events";
import Booking from "../Booking";
import Contact from "../../components/ContactForm";
import Offers from "../../components/Offers";
import Map from '../../components/map'
import Location from '../../components/Location'
const Home = () => {
  return (
    <div className="reative">
    
    <div id="home" className=" w-full h-screen bg-gradient-to-b from-slate-300 to-slate-100 flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
          <h1 className="px-10 py-3 text-5xl md:text-6xl font-bold"> Welcome to Apex Design and Construction</h1>
          <p className=" px-10 text-2xl"> We deal with Design, Construction and Building materials Supply </p>
        </div>
        <div>
          <img src={bgimg} alt="" className="w-full" />
        </div>
        <div className="absolute flex flex-col py-8 mx-auto left-5 right-5  bottom-[2%]  
        max-w-[500px]
        md:max-w-[760px] md:left-[5%] md:right-[5%]  md:bottom-[6%] lg:left-5 lg:right-5 transform
         bg-zinc-100 border border-slate-300
        rounded-xl text-center shadow-xl">
          <p className="text-2xl font-bold">Services</p>
          <div className="flex justify-between  flex-wrap px-4">
            <div className="flex justify-center px-4 py-2 font-bold text-slate-500"><img src={Design} alt="/" className="h-6 w-5 mx-[5px]" /> Design</div>
            <div  className="flex px-4 py-2 font-bold text-slate-500"> <img src={Construction} alt="/" className="h-6 w-5 mx-[5px]" /> Construction</div>
            <div className="flex px-4 py-2 font-bold text-slate-500"><img src={Supply} alt="/" className="h-6 w-5 mx-[5px]" /> Supply</div>
          </div>
        </div>
      </div>
    </div>
    <About/>
    <Services/>   
    <Gallery/>
    
    <Events/>
    <Offers/>
    <Booking/>
    <Payment/>
    <Contact/>
    <Career/>
    <Location/>
    {/* <Map/> */}
    <Footer/>
    
    
    </div>
  );
};

export default Home;
