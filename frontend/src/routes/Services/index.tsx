import React from "react";
import CareerImg from '/career.png'
import {CheckIcon} from '@heroicons/react/24/solid'
const Services = () => {
 
  const supplyServices = ['ACC Blocks','Steel Bar','Cement','Wall Plaster','Wall Putty',' Fix-o-block',
    'Tiles Adhesive','Paints','Tiles','Sand','Aggregates','Tin Roof','Plastic Roof' , 'Red Brick'
  ]
  const designServices = [
    'Architectural','3D Modeling','Structural','MEP','Estimation'
  ];
  const constructionServices = ['Residential','Commercial']
  return (
      <div  id="services" className="w-[80%] mt-32 mb-10 mx-auto drop-shadow-lg">
        <div className="max-w-[1000px] mx-auto px-2">
          <h2 className="text-5xl font-bold text-center ">Services Offered</h2>
          <p className="text-2xl py-8 text-gray-500 text-center">At Apex we provide a variety of services dealing with Design, Supply and Construction </p>
        </div>
      <div className="text-center grid border-2 rounded-xl sm:grid-cols-3 lg:grid-cols-3 gap-3 pt-10 pb-10">
       
          <div >
            <h3  className="font-bold text-xl mb-5">Construction</h3>
            {
              constructionServices.map((element)=>{
                return <div className="grid grid-cols-3" key={element}>
                  <div className="flex justify-end items-center">
                  <CheckIcon className="w-7 mr-4 text-green-600"/>
                  </div>
                <span className=" col-span-2 flex justify-start px-10 text-base pt-2 pb-4"> {element}</span>
                </div>
              })
            }
          </div>
          <div>
            <h3 className="font-bold text-xl mb-5">Supply</h3>
            {
              supplyServices.map((element)=>{
                return <div className="grid grid-cols-3" key={element}>
                <div className="flex justify-end items-center">
                  <CheckIcon className="w-7 mr-4 text-green-600"/>
                  </div>
                <span className=" col-span-2 flex justify-start text-left px-10 text-base pt-2 pb-4"> {element}</span>
                </div>
              })
            }
              
          </div>
          <div>
            <h3 className="font-bold text-xl mb-5">Design</h3>
            {
              designServices.map((element)=>{
                return <div className="grid grid-cols-3" key={element}>
                <div className="flex justify-end items-center">
                  <CheckIcon className="w-7 mr-4 text-green-600"/>
                  </div>
                <span className=" col-span-2 flex justify-start px-10 text-base pt-2 pb-4"> {element}</span>
                </div>
              })
            }</div>
        </div>
      {/* </div> */}
      </div>
    )
  };

export default Services;
