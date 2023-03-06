import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../components/store";

import Combined from './combined'
import {
  fetchBookingDimension_,
  fetchBookingTypes,
  selectBookingTypes,
  selectCurrentDimensionURL,
  resetFetchedDimension
} from "../../components/store/booking/bookingSlice";

const Residential_Requirements = ['Assam Type House',"G+1","G+2","G+3","G+4","G+5","G+6"]
interface IBookingTypeList {
  category: string;
  // value: number;
  types: {
    [key: string]: Array<string>;
  };
}
import ReCAPTCHA from "react-recaptcha";
import { getBookingUploadSign, sendMessageEmail } from "./service";
import ColorPallate from "/ColorPallate_demo.png";
import ColorCode from "/color.png";
import { AiTwotoneStar } from "react-icons/ai";
import Checkbox from "./shared/CheckBox";
import { Button, PageButton } from "./shared/Button";

interface FormDataType {
  [key: string]: string;
}
const Booking = () => {
  const [isVerified, setVerified] = useState(false);
  function onChange(response: any) {
    if (response) {
      setVerified(true);
    }
  }
  const bookingTypeList = useAppSelector(selectBookingTypes);
  const dimensionUrl = useAppSelector(selectCurrentDimensionURL);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBookingTypes())
      .then(() =>{
      
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [category_val, setCategory] = useState<string>("");
  const [categoryType_val, setCategoryType] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(true);
  const [bookingUploadedFilename, setBookingUploadedFilename] = useState("");
  const [bookingUploadedFilenamePublic, setBookingUploadedFilenamePublic] = useState("");
  const [toggleDimensionModal, setToggleDimensionModal] = useState(false);

  const toggleDimensionModalHandler = ()=>{
    setToggleDimensionModal(!toggleDimensionModal);
  }
  const handleCategory = async (val: string) => {
    setBookingUploadedFilename("");
    if (val == "-- Select Category --") {
      setCategory("");
      return;
    }
    setCategory(val);
    setCategoryType(""); 
  };
  const handleCategoryType = (val: string) => {
    setBookingUploadedFilename("");
    if (val == "-- Select Category Type --") {
      setCategoryType("");
      return;
    }
    setCategoryType(val);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if(isVerified){
      const formData = new FormData(e.target);

      const values = [...formData.entries()];
  
      const formDataObj = Object.fromEntries(formData.entries());
      var attachment;
      // //console.log("Entries", {...formDataObj, ...attachment})
      // //console.log(formDataObj);
      // //console.log(formData.entries());
      // //console.log(values);
      // alert(JSON.stringify(formDataObj));
      try {
        if (bookingUploadedFilename !== "") {
          attachment = {
            UploadPlanFile: bookingUploadedFilename,
          };
          await sendMessageEmail(
            JSON.stringify({ ...formDataObj, ...attachment })
          );
        } else if (categoryType_val!="2D-Architectural-Commercial" && categoryType_val!="2D-Architectural-Residential"){
          alert('Please Upload Plan'); throw new Error();
        }
        else await sendMessageEmail(JSON.stringify({ ...formDataObj }));
  
        alert("booking request successfull sent");
      } catch (err) {
        alert("booking request unsuccessful" + (err as Error).message);
      }

    // }
    // else{
      // alert('Invalid Captcha Try Again')
    // }
    
  };

  const handlerDimension = (requirement:string) => {
    // //console.log("type:"+categoryType_val +" requirement: "+requirement)
    // //console.log("AT HANDLER DIMENSION")
    dispatch(fetchBookingDimension_({ type: categoryType_val+"-"+requirement }))
      .then(() => {
        // //console.log(dimensionUrl);
        setToggleDimensionModal(!toggleDimensionModal);
      })
      .catch((err:Error) => console.log("Unable to Fetch Dimension", (err as Error).message));
  };

  const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
  const uploadPreset = "booking"; // replace with your own upload preset
  const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;

  const BookingUpload = async () => {
    const res = await getBookingUploadSign();
    // //console.log(res);
    var myWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        uploadSignatureTimestamp: res.data.timestamp,
        uploadSignature: res.data.signature,
        cropping: false,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false, //restrict upload to a single file
        // folder: "career_attachments", //upload files to the specified folder
        tags: ["booking"], //add the given tags to the uploaded files
        apiKey: api_key,

        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
        styles: {
          palette: {
            window: "#F5F5F5",
            sourceBg: "#FFFFFF",
            windowBorder: "#90a0b3",
            tabIcon: "#0094c7",
            inactiveTabIcon: "#69778A",
            menuIcons: "#0094C7",
            link: "#53ad9d",
            action: "#8F5DA5",
            inProgress: "#0194c7",
            complete: "#53ad9d",
            error: "#c43737",
            textDark: "#000000",
            textLight: "#FFFFFF",
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true,
            },
          },
        },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          // //console.log("Done! Here is the file info: ", result.info);
          setBookingUploadedFilename(result.info.secure_url);
          setBookingUploadedFilenamePublic(result.info.public_id);
        }
      }
    );
    //myWidget.open();
  };

  return (
    <>
      <div
        id="booking"
        className="flex flex-col items-center w-full   mx-auto my-12 py-12"
      >
        <h4 className="text-center font-bold text-5xl mb-10 md:text-6xl">
          Book an Appointment
        </h4>

        <form
          className="shadow-md p-5 flex flex-col  sm:w-[500px] md:w-[800px] border rounded-md"
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
                required
                maxLength={50}
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
                required
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
                required
                name="contact"
                type="number"
                id="name"
                className=" col-span-2 border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
              />
            </div>
            {category_val == "Supply" || category_val =="Construction" ? (
              <div className="grid grid-cols-3">
                <label
                  className="drop-shadow-md font-bold text-xl p-2  flex items-center"
                  htmlFor="address"
                >
                  <AiTwotoneStar className="mr-2" /> Address
                </label>
                <textarea
                  required
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
            {bookingTypeList.map((type:any) => (
              <option key={type.category} className="p-4" value={type.category}>
                {type.category}
              </option>
            ))}
          </select>
          {
            category_val!="Construction" ?
            <>
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
            {(category_val != "") 
              ? Object.keys(
                  bookingTypeList[
                    bookingTypeList.findIndex((x:any) => x.category == category_val)
                  ].types!
                ).map((type) => (
                  <Fragment key={type}>
                    {type != "3D-Architectural" ? (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ) : (
                      ""
                    )}
                  </Fragment>
                ))
              : 
          ""}
          </select>
            </>
          
                :<Combined props={{
                  handleCategory:handleCategory,
                  handleCategoryType:handleCategoryType,
                  handlerDimension:handlerDimension,
                  toggleDimensionModal:toggleDimensionModal,
                  setToggleDimensionModal:()=>setToggleDimensionModal,
                  togglemodalValue : toggleDimensionModalHandler
                }} />

              }



          

          {category_val == "Design" &&
          categoryType_val != "" &&
          categoryType_val != "2D-Architectural-Residential" &&
          categoryType_val != "2D-Architectural-Commercial" ? (
            <div className="mt-6">
              <Button
                className="w-[120px] mb-2 inline-block bg-gradient-to-t from-yellow-500 to-yellow-200 font-bold"
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  e.preventDefault();
                  BookingUpload();
                }}
              >
                Upload Plan
              </Button>
              <Button
                data-bs-toggle="modal"
                data-bs-target="#modal2"
                className="ml-2 w-[120px] mb-2 inline-block bg-gradient-to-t from-green-500 to-green-200 font-bold"
              >
                Order Plan
              </Button>
              {bookingUploadedFilename !== "" && (
                <>
                  <p>
                    Plan is uploaded at{" "}
                    <a
                      href={bookingUploadedFilename}
                      className="text-yellow-700 font-bold"
                    >
                      {bookingUploadedFilename}
                    </a>
                  </p>
                </>
              )}
            </div>
          ) : (
            ""
          )}

          {category_val == "Design" ? (
            <>
              <label
                className="font-bold flex items-center text-xl p-2 my-2"
                htmlFor="categoryType"
              >
                <AiTwotoneStar className="mr-2" /> Requirement Type
              </label>

              
            
                {/* one to select house structure and one to select house type for commercial */}
                
                {
                  categoryType_val.length != 0 && categoryType_val=="2D-Architectural-Commercial"?
                  <>
                  <select
                  className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                  name="CommercialStrucutreType"
                  id="CommercialStrucutreType"
                  required
                >
                    <option>-- Select Structure Type--</option>
                    {Residential_Requirements.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                </select>
                <select
                className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                name="CommercialHouseType"
                id="CommercialHouseType"
                required
              >
                  <option>-- Select Building Type --</option>
                  {
                  Object.values(
                    bookingTypeList[
                      bookingTypeList.findIndex(
                        (x:any) => x.category == category_val
                      )
                    ].types[categoryType_val]
                  )
                  
                 .map((type:any) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
              </select>
                  
                  </> 

                
                  :""
                }
              


                {categoryType_val.length != 0
                  ? ( categoryType_val == "2D-Architectural-Residential"?


                  (
                    
                    <select
                className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                name="ResidentialHouseType"
                id="ResidentialHouseType"
                required
              >
                  <option>-- Select House Structure Type --</option>
                  {
                 Residential_Requirements
                 .map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
              </select>
                  
                  )


                     :
                   ""
                  ) 
                  
                  : ""}
             
            </>
          ) : (
            ""
          )}

          
          {/* 3d requirement needed? */}
          <div className="grid my-2  px-2">
            {(category_val == "Design" || category_val == "Supply") &&
            categoryType_val != "" &&
            categoryType_val != "2D-Architectural-Commercial"
              ? bookingTypeList[
                  bookingTypeList.findIndex((x) => x.category == category_val)
                ].types[categoryType_val].map((requirement:string, idx:number) => (
                  <div key={idx} className="grid grid-cols-2">
                    <label className="flex items-center" htmlFor={requirement}>
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
                      {( category_val=="Supply" && !["Kg", "ColorCode"].includes(requirement)) ? (
                        <Button
                          onClick={()=>{
                           
                            handlerDimension(requirement)
                          }
                          }
                          className="ml-2 w-[180px] mb-2 inline-block bg-slate-700 hover:bg-slate-600 text-slate-50 first-letter:font-bold"
                        >
                          Check Availability
                        </Button>
                      ) : (
                        ""
                      )}
                      {/* 
                  <Button  onClick = {handlerDimension} className="ml-2 w-[150px] mb-2 inline-block bg-gradient-to-t from-green-500 to-green-200 font-bold">Check Available</Button> */}
                    </label>

                    <input
                      name={requirement}
                      id={requirement}
                      className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                    />
                  </div>
                ))
              : ""}
          </div>
          {category_val == "Design" &&
          (categoryType_val == "2D-Architectural-Residential" ||
            categoryType_val == "2D-Architectural-Commercial") ? (
            <Checkbox
              label="Do you have 3D Architectural Requirements? "
              category={
                bookingTypeList.filter((x:any) => x.category == "Design")[0]
              }
              rest={{ className: "p-5" }}
            />
          ) : (
            ""
          )}

          {category_val == "Design" &&
          categoryType_val != "" &&
          categoryType_val != "2D-Architectural-Residential" ? (
            <p className="px-5">
              For further requirements, Contact :{" "}
              <a className="text-purple-700 font-bold" href="tel:+918011620847">
                +91 80116 20847
              </a>
            </p>
          ) : (
            ""
          )}
          {/* <ReCAPTCHA
                className="mt-10"
                sitekey="6Ld_V4MiAAAAAM4OiIlsrIuAHGuYIk05-z4bkn0q"
                verifyCallback={onChange}
                // theme  = "dark"
              /> */}
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

      {/* Modal for ORDER PLAN */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modal2"
        aria-labelledby="modal2"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-body relative p-4">
              <p> SELECT YOUR REQUIREMENT</p>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="inline-block px-6 mb-5 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                onClick={() => setCategoryType("2D-Architectural-Residential")}
              >
                2D-Architectural-Residential
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                onClick={() => setCategoryType("2D-Architectural-Commercial")}
              >
                2D-Architectural-Commercial
              </button>
            </div>
          </div>
        </div>
      </div>
      {toggleDimensionModal ? (
        <div
          className="modal fixed top-0 right-0 md:right-10  w-full h-full outline-none overflow-x-hidden overflow-y-auto "
          aria-labelledby="dimensionModal"
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered relative pointer-events-none">
            <div className="modal-content bg-green-100 border-none shadow-lg relative flex flex-col w-screen pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  onClick={() => {
                    //console.log("clicked");
                    setToggleDimensionModal(!toggleDimensionModal);
                  }}
                ></button>
              </div>
              <div className="modal-body md:w-[600px] relative p-4">
                <img className="w-full h-full" src={`${dimensionUrl}`} alt="Dimensions Not available" />
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
     
    </>
  );
};

export default Booking;

// const bookingTypeList1: Array<IBookingTypeList> = [
//   {
//     category: "Design",

//     types: {
//       "2D Architectural": [
//         "No of Rooms",
//         "Normal Bedroom or Master Bedroom or Both",
//         "No of Normal Bedrooms",
//         "No. of Master Bedrooms",
//         "No. of Balcony",
//         "No. of Verandah",
//       ],
//       "3D Modeling": [
//         "Do you need Exterior Elevation ?",
//         "Do you need Interior Elevation ?",
//         "DO you need Walkthrough ?",
//       ],
//       "Structural Design": [],
//       "MEP Design": [],
//       Estimation: [],
//     },
//   },
//   {
//     category: "Construction",

//     types: {
//       Residential: ["Assam Type House", "G+1", "G+2", "G+3", "G+4", "G+5"],
//       Commercial_Institutional: [
//         "Restaurant",
//         "Office Building",
//         "Hotel",
//         "School",
//         "College",
//         "HealthCare",
//         "Retail",
//       ],
//       Commercial_Industrial:[ "Mills","R&D","Warehouses"]
//     },
//   },
// {
//   category: "Supply",

//   types: {
//     "ACC Block": ["CuM ( Cubic Meters)", "Dimension"],
//     "Cement": ["Bags"],
//     "Steel Bar": ["Diameter", "Kg"],
//     "Wall Plaster": ["Bags", "Kg"],
//     "Wall Putty": ["Bags", "Kg"],
//     "Fix-o-Block": ["Bags", "Kg"],
//     "Tiles Adhesive": ["Bags"],
//     "Paint": ["ColorCode", "Litre"],
//     "Sand": ["Bags"],
//     "Aggregates": ["CuM ( Cubic Meters)"],
//     "Tin & Plastic Roof": ["Dimension", "Quantity"],
//   },
// },
// ];
