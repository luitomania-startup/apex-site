import React from 'react'
import paymentImg from '/payment.png'
import sampleQR from '/sampleQR.jpg'
const Payment = () => {
  return (
    
    <div id="payment" className="mt-12 w-full bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
      <div>
          <img src={paymentImg} alt="" className="w-[400px] md:w-full" />
        </div>
        <div className="flex flex-col justify-center items-center w-full px-2 py-8">
          <h1 className="px-10 py-3 text-5xl md:text-6xl font-bold"> Payment</h1>
          <p className=" px-10 text-2xl"> We Accept UPI Payments </p>
          {/* <img src={sampleQR} alt="/" className="mt-4 w-[120px]" /> */}
          {/* <button  data-mdb-ripple="true" data-mdb-ripple-color="light" type="button" className="inline-block px-6 py-2.5 bg-gray-900  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-800 hover:shadow-lg focus:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out mt-5">Other Methods</button> */}

        </div>
        
       
      </div>
    </div>
  )
}

export default Payment