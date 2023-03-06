import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineContactSupport } from "react-icons/md";
const index = () => {
  return (
    <div id="footer" className="w-full  bg-slate-900 text-gray-300 py-2 px-2">
      <div className="flex flex-col">
        <h6 className="contact-header font-Roboto_Mono font-bold text-2xl flex items-center justify-center text-center uppercase pt-5">
          Contact
          <MdOutlineContactSupport className="ml-5 text-4xl  hover:animate-bounce" />
        </h6>
        <div className="max-w-[1240px] mx-auto grid text-center  md:grid-cols-2 border-b-2 border-gray-600 py-8">
          <div>
            <h4 className="font-bold camelcase py-1">Head Office:</h4>
            <ol>
              <li className="text-sm text-left max-w-[90%] mx-auto ">
                Sai Market, Batahghuli Tiniali, Panjabari <br /> Guwahati - 37
                <br /> Kamrup (M) <br /> Assam <br />
                <a className="text-blue-600" href="tel:+916000709754">
                (Contact No. +91 8011620847)
                </a>
              </li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold camelcase py-1">Our Branches:</h4>
            <ol className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {/* <li className="text-sm text-left max-w-[80%] mx-auto">
                Dhakuakhana,<br /> North Lakhimpur, Assam. <br></br>
                <a className="text-blue-600" href="tel:+916000709754">
                  (Contact No. +91 6000709754)
                </a>
              </li> */}
              <li className="text-sm text-left max-w-[90%] mx-auto">
                Haflong,<br />
              Dima Hasao, Assam. <br />  
                <a className="text-blue-600" href="tel:+916000879790">
                  (Contact No. +91 6000879790)
                </a>
              </li>
{/* 
              <li className="text-sm text-left max-w-[80%] mx-auto">
                Dhemaji Town, Dhemaji, Assam. <br />
                <a className="text-blue-600" href="tel:+916003529441">
                  (Contact No. +91 6003529441)
                </a>
              </li> */}
              {/* <li className="text-sm text-left max-w-[80%] mx-auto">
              Dibrugarh Town <br/> Dibrugarh, Assam.<br />
                <a className="text-blue-600" href="tel:+916001612330">
                  (Contact No. +91 6001612330)
                </a>
              </li> */}
            </ol>
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4  m-auto justify-between items-center sm:flex-col text-center text-gray-500">
        <p className="py-4">@2023 Apex Design & Construction . All Rights Reserved</p>
        <div className="flex items-center justify-around  sm:w-[300px] text-2xl">
          <a href="https://www.facebook.com/profile.php?id=100086318563244">
            <FaFacebook className="w-[30px] hover:cursor-pointer hover:w-[30px] hover:h-[40px] ease-out duration-200" />
          </a>
          <a href="https://www.google.com">
            <FaInstagram className="w-[30px] hover:cursor-pointer hover:w-[30px] hover:h-[40px] ease-out duration-200" />
          </a>
          <FaYoutube className="w-[30px] hover:cursor-pointer hover:w-[30px] hover:h-[40px] ease-out duration-200" />
        </div>
      </div>
    </div>
  );
};

export default index;
