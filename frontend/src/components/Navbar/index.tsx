import React, { Fragment, useState } from "react";
// import '../../styles/main.css'
import { Bars4Icon } from "@heroicons/react/24/solid";
import logo from "/apex_logo.png";
import { Link, Outlet } from "react-router-dom";
import { Link as SLink, animateScroll as scroll } from "react-scroll";
import x_mark from "/cross.svg";
const index = () => {
  const [nav, setNav] = useState(false);
  const handleToggle = () => {
    //console.log("clicked");
    setNav(!nav);
  };
  return (
    <Fragment>
      <div className="fixed w-full h-[80px] z-10 bg-gradient-to-b from-zinc-300 to-slate-100 drop-shadow-lg">
        <div className="px-2 flex justify-around items-center w-full h-full">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} className="h-[150px] " />
            </Link>

            {/* <h1 className="text-3xl font-bold mr-4 sm:text-4xl">BRAND</h1> */}
            <ul className="hidden md:flex">
              <li onClick={handleToggle} className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="home" smooth={true} offset={50} duration={500}>
                  Home
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="about" smooth={true} offset={-100} duration={500}>
                  About
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="services" smooth={true} offset={-100} duration={500}>
                  Services
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="gallery" smooth={true} offset={-100} duration={500}>
                  Gallery
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="events" smooth={true} offset={-100} duration={500}>
                  Events
                </SLink>
              </li>

              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="offers" smooth={true} offset={50} duration={500}>
                  Offers
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="booking" smooth={true} offset={-100} duration={500}>
                  Booking
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="payment" smooth={true} offset={-100} duration={500}>
                  Payment
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="career" smooth={true} offset={-100} duration={500}>
                  Careers
                </SLink>
              </li>
              <li className="hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200">
                <SLink to="footer" smooth={true} offset={50} duration={500}>
                  Contact
                </SLink>
              </li>
            </ul>
          </div>
          <div className="hoverclass md:hidden">
            {nav ? (
              <img
                onClick={handleToggle}
                src={x_mark}
                alt="/"
                className="w-[40px] hover:opacity-70 hover:text-slate-400"
              />
            ) : (
              <Bars4Icon
                className="h-[50px] w-[50px] hover:cursor-pointer p-2 hover:text-slate-400 ease-out duration-200 hover:opacity-80"
                onClick={handleToggle}
              />
            )}
          </div>
        </div>
        <ul
          className={
            !nav ? "hidden" : "md:hidden absolute bg-zinc-100 w-full px-8"
          }
        >
          <li className="hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="home"
              smooth={true}
              offset={50}
              duration={500}
            >
              Home
            </SLink>
          </li>
          <li className="hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="about"
              smooth={true}
              offset={-100}
              duration={500}
            >
              About
            </SLink>
          </li>
          <li className="hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="services"
              smooth={true}
              offset={-100}
              duration={500}
            >
              Services
            </SLink>
          </li>
          <li className=" hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="gallery"
              smooth={true}
              offset={-100}
              duration={500}
            >
              Gallery
            </SLink>
          </li>
          <li className=" hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="events"
              smooth={true}
              offset={-100}
              duration={500}
            >
              Events
            </SLink>
          </li>
          <li className=" hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="offers"
              smooth={true}
              offset={-100}
              duration={500}
            >
              Offers
            </SLink>
          </li>
          <li className=" hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="booking"
              smooth={true}
              offset={-100}
              duration={500}
            >
              Booking
            </SLink>
          </li>
          <li className=" hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="payment"
              smooth={true}
              offset={-100}
              duration={500}
            >
              Payment
            </SLink>
          </li>
          <li className=" hover:cursor-pointer flex justify-center border-b-2 border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="career"
              smooth={true}
              offset={-100}
              duration={500}
            >
              Careers
            </SLink>
          </li>
          <li className=" hover:cursor-pointer flex justify-center border-zinc-300 w-full p-2 hover:text-slate-400 ease-out duration-200">
            <SLink
              onClick={handleToggle}
              to="footer"
              smooth={true}
              offset={50}
              duration={500}
            >
              Contact
            </SLink>
          </li>
        </ul>
      </div>
      <Outlet/>
    </Fragment>
  );
};

export default index;
