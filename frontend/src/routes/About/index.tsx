import React from 'react'

const About = () => {
  return (
    <div id='about' className="w-full">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold mt-20">About The Company</h2>
          <h2 className="my-2 text-4xl text-slate-600 font-bold">Trusted By People</h2>
          <p className="text-gray-500 font-bold px-5 text-2xl my-6 ">APEX DESIGN AND CONSTRUCTION was established in 2022 and is one of the leading construction company in Assam.
           This company is very well known for providing design, construction and building materials supply in North East India.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border border-purple-100 py-8 my-1 rounded-xl shadow-md md:shadow-xl">
            <p className="text-6xl  font-bold text-indigo-600">100%</p>
            <p  className="text-gray-400 mt-2">Completion</p>
          </div>
          <div className="border border-purple-100 py-8 my-1 rounded-xl shadow-md md:shadow-xl">
            <p className="text-6xl font-bold text-indigo-600 ">100%</p>
            <p className="text-gray-400 mt-2">Response</p>
          </div>
          <div className="border border-purple-100 py-8 my-1 rounded-xl shadow-md md:shadow-xl">
            <p className="text-6xl  font-bold text-indigo-600">100%</p>
            <p className="text-gray-400 mt-2">Transaction</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About