import React, { useEffect, useRef, useState } from "react";
import {motion}  from 'framer-motion'
// import './carousal.css'
interface ICarouselProps{
 data : Array<any>
}
const carousal = ( {data}:ICarouselProps) => {
 const [width,setWidth] = useState(0);
 const carousel = useRef<any>();

 useEffect(()=>{
    console.log(carousel.current.scrollWidth , carousel.current.offsetWidth)
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
 },[])
  return (
    <div className=" max-w-[400px] md:max-w-[1024px] mx-aut mb-12 w-full">



         <motion.div ref = {carousel} className="py-10 cursor-grab overflow-hidden">
            <motion.div drag="x" dragConstraints={{right:0,left: -width}} className="flex">
            {
               data.map((item)=>{
                     return (
                        <motion.div className=" min-w-[300px] my-auto mx-[10px]">
                            <div className="grid grid-rows-4 shadow-md  p-10 h-[400px] w-[300px] rounded-lg pointer-events-none">
                            <h3 className="row-span-1 font-bold font-Gemini_Libre text-3xl">{item.title}</h3>
                              <p className=" row-span-2 text-2xl font-Gemini_Libre">{item.summary}</p>
                              <p className="row-span-1 text-sm text-gray-500 mt-5 font-Gemini_Libre">{item.date}</p>
                           
                            </div>
                              
                        </motion.div>
                     )
                })
            }
            </motion.div>
         </motion.div>
      
    </div>
  );
};

export default carousal;

