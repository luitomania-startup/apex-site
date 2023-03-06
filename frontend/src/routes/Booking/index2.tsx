import React, { useEffect, useState } from "react";

interface IBookingTypeList {
  category: string;
  value: number;
  types: {
    [key: string]: Array<string>;
  };
}

interface IConstructionTypeList {
  category: string;
  value: number;
  types: {
    Residential: Array<string>;
    Commercial: {
      [key: string]: Array<string>;
    };
  };
}

import ColorPallate from "/ColorPallate_demo.png";
import ColorCode from "/color.png";
import { AiTwotoneStar } from "react-icons/ai";
const constructionTypeList: IConstructionTypeList = {
  category: "Construction",
  value: 1,
  types: {
    Residential: ["Assam Type House", "G+1", "G+2", "G+3", "G+4", "G+5"],
    Commercial: {
      Institutional: [
        "Restaurant",
        "Office Building",
        "Hotel",
        "School",
        "College",
        "HealthCare",
        "Retail",
      ],
      Industrial: ["Mill", "Factory"],
    },
  },
};

const bookingTypeList: Array<IBookingTypeList> = [
  {
    category: "Design",
    value: 0,
    types: {
      "2D Architectural": [
        "No of Rooms",
        "Normal Bedroom or Master Bedroom or Both",
        "No of Normal Bedrooms",
        "No. of Master Bedrooms",
        "No. of Balcony",
        "No. of Verandah",
      ],
      "3D Modeling": [
        "Do you need Exterior Elevation ?",
        "Do you need Interior Elevation ?",
        "DO you need Walkthrough ?",
      ],
      "Structural Design": [],
      "MEP Design": [],
      Estimation: [],
    },
  },
  {
    category: "Construction",
    value: 1,
    types: {
      Residential: ["Assam Type House", "G+1", "G+2", "G+3", "G+4", "G+5"],
      Commercial_Institutional: [
          "Restaurant",
          "Office Building",
          "Hotel",
          "School",
          "College",
          "HealthCare",
          "Retail",
        ],
      Commercial_Industrial: ["Mill", "Factory"]
    },
  },

  {
    category: "Supply",
    value: 2,
    types: {
      "ACC Block": ["CuM ( Cubic Meters)", "Dimension"],
      Cement: ["Bags"],
      "Steel Bar": ["Diameter", "Kg"],
      "Wall Plaster": ["Bags", "Kg"],
      "Wall Putty": ["Bags", "Kg"],
      "Fix-o-Block": ["Bags", "Kg"],
      "Tiles Adhesive": ["Bags"],
      Paint: ["ColorCode", "Litre"],
      Sand: ["Bags"],
      Aggregates: ["CuM ( Cubic Meters)"],
      "Tin & Plastic Roof": ["Dimension", "Quantity"],
    },
  },
];
interface FormDataType {
  [key: string]: string;
}
const Booking = () => {
  const [category_val, setCategory] = useState<string>("");
  const [categoryType_val, setCategoryType] = useState<string>("");
  const [requirementType,setRequirementType] = useState<string>("");
  const handleCategory = async (val: string) => {
    setCategory(val);
    // //console.log(bookingTypeList[val].category)
    setCategoryType("");

    // //console.log(typeof categoryType_val)
  };
  const handleCategoryType = (val: string) => {
    setCategoryType(val);
    // let key = val;
    // //console.log(val);
    // //console.log("inside handleCategoryType: " + categoryType_val);
    // //console.log(
    //   bookingTypeList[
    //     bookingTypeList.findIndex((x) => x.category == category_val)
    //   ].types[categoryType_val]
    // );
  };
  const handleRequirementChange = (val:string)=>{
    setRequirementType(val)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const values = [...formData.entries()];

    const formDataObj = Object.fromEntries(formData.entries());
    //console.log(formDataObj);
    // //console.log(formData.entries());
    // //console.log(values);
    alert(JSON.stringify(formDataObj));
  };


  return (
    <>
      <div
        id="booking"
        className="flex flex-col items-center w-full h-[1200px]  mx-auto my-24 py-12"
      >
        <h4 className="text-center font-bold text-5xl mb-10 md:text-6xl">
          Book an Appointment
        </h4>

        <form
          className="shadow-md p-5 flex flex-col w-[400px] sm:w-[500px] md:w-[800px]"
          action=""
          id="bookingForm"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid my-2 border-b-2 pb-5">
            <div className="grid grid-cols-3">
              <label
                className=" drop-shadow-md font-bold text-xl p-2  flex items-center"
                htmlFor="name"
              >
                <AiTwotoneStar className="mr-2" /> Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                className=" col-span-2 border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
              />
            </div>
            <div className="grid grid-cols-3">
              <label
                className=" drop-shadow-md font-bold text-xl p-2  flex items-center"
                htmlFor="email"
              >
                <AiTwotoneStar className="mr-2" /> Email
              </label>
              <input
                name="email"
                type="email"
                id="name"
                className=" col-span-2 border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
              />
            </div>
            <div className="grid grid-cols-3">
              <label
                className="drop-shadow-md font-bold text-xl p-2  flex items-center"
                htmlFor="contact"
              >
                <AiTwotoneStar className="mr-2" /> Contact
              </label>
              <input
                name="contact"
                type="number"
                id="name"
                className=" col-span-2 border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
              />
            </div>
            {category_val == "Supply" ? (
              <div className="grid grid-cols-3">
                <label
                  className="drop-shadow-md font-bold text-xl p-2  flex items-center"
                  htmlFor="address"
                >
                  <AiTwotoneStar className="mr-2" /> Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  className=" col-span-2 border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <label
            className=" drop-shadow-md flex items-center font-bold text-xl p-2 my-2"
            htmlFor="category"
          >
            <AiTwotoneStar className="mr-2" /> Category
          </label>

          <select
            className=" p-2 rounded-md shadow-md my-2"
            name="category"
            id="category"
            onChange={(e: any) => handleCategory(e.target.value)}
          >
            <option>-- Select Category --</option>
            {bookingTypeList.map((type) => (
              <option className="p-4" value={type.category}>
                {type.category}
              </option>
            ))}
            <option className="p-4" value="Construction">Construction</option>
          </select>
          <label
            className="flex items-center font-bold text-xl p-2 my-2"
            htmlFor="categoryType"
          >
            <AiTwotoneStar className="mr-2" /> Category Type
          </label>

          <select
            onChange={(e) => handleCategoryType(e.target.value)}
            value={categoryType_val}
            className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
            name="categoryType"
            id="categoryType"
          >
            <option>-- Select Category Type --</option>
            {category_val != "" && category_val !="Construction"
              ? Object.keys(
                  bookingTypeList[
                    bookingTypeList.findIndex((x) => x.category == category_val)
                  ].types!
                ).map((type) => <option value={type}>{type}</option>)
              : ""}

              {
                category_val != "" && category_val =="Construction"
                ? Object.keys(
                    constructionTypeList.types
                  ).map((type) => <option value={type}>{type}</option>)
                : ""
              }
          </select>
          {category_val == "Construction" ? (
            <>
              <label
                className="font-bold flex items-center text-xl p-2 my-2"
                htmlFor="categoryType"
              >
                <AiTwotoneStar className="mr-2" /> Requirement Type
              </label>

              <select
                className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                name="requirementType"
                id="requirementType"
                onChange = {e=>handleRequirementChange(e.target.value)}
              >
                { categoryType_val=="Commercial"?<option>-- Select Commercial Type --</option>: <option>-- Select Requirement Type --</option>}
                {categoryType_val.length != 0 && category_val !="Construction"
                  ? Object.values(
                      bookingTypeList[
                        bookingTypeList.findIndex(
                          (x) => x.category == category_val
                        )
                      ].types[categoryType_val]
                    ).map((type) => <option value={type}>{type}</option>)
                  : ""}
                  {
                    categoryType_val.length != 0 && category_val =="Construction" && categoryType_val=="Residential"
                    ? 
                      constructionTypeList.types.Residential.map((type:string) => <option value={type}>{type}</option>): ""
                  }
                  {
                    categoryType_val.length != 0 && category_val =="Construction" && categoryType_val=="Commercial"
                    ? 
                      Object.keys(constructionTypeList.types.Commercial).map((type:string) => <option value={type}>{type}</option>): ""
                  }
              </select>

              {
                requirementType == 'Industrial'
              }
            </>
          ) : (
            ""
          )}
          <div className="grid my-2  px-2">
            {(category_val == "Design" || category_val == "Supply") &&
            categoryType_val != ""
              ? bookingTypeList[
                  bookingTypeList.findIndex((x) => x.category == category_val)
                ].types[categoryType_val].map((requirement, idx) => (
                  <div>
                    <div className="grid grid-cols-2">
                      <label
                        className="flex items-center"
                        htmlFor={requirement}
                      >
                        {requirement}
                        {requirement == "ColorCode" ? (
                          <img
                            data-bs-toggle="modal"
                            data-bs-target="#colorPallate_modal"
                            className="ml-10 w-10 hover:cursor-pointer hover:animate-spin"
                            src={ColorCode}
                            alt=""
                          />
                        ) : (
                          ""
                        )}
                      </label>

                      <input
                        name={requirement}
                        id={requirement}
                        className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                      />
                    </div>
                  </div>
                ))
              : ""}
          </div>

          <button
            type="submit"
            className="inline-block w-[100px]  px-4 mt-10 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg  transition duration-150 ease-in-out"
            data-mdb-ripple="true"
          >
            {category_val == "Supply" ? "ORDER" : "BOOK NOW"}
          </button>
        </form>
      </div>
      <div
        className="modal fade fixed top-0 right-0 md:right-10  hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="colorPallate_modal"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-screen pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body md:h-[400px] md:w-[600px] relative p-4">
              <img className="w-full h-full" src={ColorPallate} />
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
