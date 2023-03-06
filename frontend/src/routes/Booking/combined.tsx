import React , { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../components/store";
import Combined from './combined'
import {
  fetchBookingDimension_,
  fetchBookingTypes,
  selectBookingTypes,
  selectCurrentDimensionURL,
  
} from "../../components/store/booking/bookingSlice";
interface IBookingTypeList {
  category: string;
  // value: number;
  types: {
    [key: string]: Array<string>;
  };
}
import { getBookingUploadSign, sendMessageEmail } from "./service";
import ColorPallate from "/ColorPallate_demo.png";
import ColorCode from "/color.png";
import { AiTwotoneStar } from "react-icons/ai";
import Checkbox from "./shared/CheckBox";
import { Button, PageButton } from "./shared/Button";

const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
const uploadPreset = "booking"; // replace with your own upload preset
const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;


const combined = ({props}:any) => {
  //console.log(props)
    const bookingTypeList = useAppSelector(selectBookingTypes);
    const dimensionUrl = useAppSelector(selectCurrentDimensionURL);
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchBookingTypes())
        .then(() =>{
        
        })
        .catch((err) => {
          //console.log(err.message);
        });
    }, []);
    const [categoryTypeDesign_val, setDesignCategoryType] = useState<string>("");
    const [categoryTypeSupply_val, setSupplyCategoryType] = useState<string>("");


    const [checked, setChecked] = useState<boolean>(true);
    const [bookingUploadedFilename, setBookingUploadedFilename] = useState("");
    const [bookingUploadedFilenamePublic, setBookingUploadedFilenamePublic] = useState("");
    // const [toggleDimensionModal, setToggleDimensionModal] = useState(false);

    const BookingUpload = async () => {
      const res = await getBookingUploadSign();
      //console.log(res);
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
            //console.log("Done! Here is the file info: ", result.info);
            setBookingUploadedFilename(result.info.secure_url);
            setBookingUploadedFilenamePublic(result.info.public_id);
          }
        }
      );
      //myWidget.open();
    };
  

    const handleDesignCategoryType = (val: string) => {
        setBookingUploadedFilename("");
        if (val == "-- Select Category Type --") {
          setDesignCategoryType("");
          return;
        }
        setDesignCategoryType(val);
      };

      const handleSupplyCategoryType = (val: string) => {
        setBookingUploadedFilename("");
        if (val == "-- Select Category Type --") {
          setSupplyCategoryType("");
          return;
        }
        setSupplyCategoryType(val);
      };

      const handlerDimension = (requirement:string) => {

        dispatch(fetchBookingDimension_({ type: categoryTypeSupply_val+"-"+requirement }))
          .then(() => {
            //console.log(dimensionUrl);
            props.togglemodalValue();
          })
          .catch((err) => console.log("Unable to Fetch Dimension", err.message));
      };

      
const Residential_Requirements = ['Assam Type House',"G+1","G+2","G+3","G+4","G+5","G+6"]
  return (
<>
<label
                className="border-b-2 my-4 drop-shadow-md font-bold text-xl p-2  w-full flex items-center"
                htmlFor="email"
              >
                 DESIGN REQUIREMENTS
        </label>



<label
                className="  drop-shadow-md font-bold text-xl p-2  w-full flex items-center"
                htmlFor="email"
              >
                <AiTwotoneStar className="mr-2" /> Select Design Category Type
        </label>


        <select
            onChange={(e) => handleDesignCategoryType(e.target.value)}
            value={categoryTypeDesign_val}
            className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
            name="categoryType"
            id="categoryType"
          >
            <option>-- Select Category Type --</option>
            {Object.keys(
                  bookingTypeList[
                    bookingTypeList.findIndex((x) => x.category =="Design")
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
          
        }
          </select>
          {categoryTypeDesign_val.length != 0
                  ? ( categoryTypeDesign_val == "2D-Architectural-Residential"?


                  (
                    
                    <select
                className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                name="ResidentialHouseType"
                id="ResidentialHouseType"
                required
              >
                  <option>-- Select Structure Type --</option>
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
             

        {
          categoryTypeDesign_val != "" &&
          categoryTypeDesign_val != "2D-Architectural-Residential" &&
          categoryTypeDesign_val != "2D-Architectural-Commercial" ? (
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
                data-bs-target="#modalDesign"
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

{(
            categoryTypeDesign_val == "2D-Architectural-Commercial") ? (
            <>
              <label
                className="font-bold flex items-center text-xl p-2 my-2"
                htmlFor="categoryType"
              >
                <AiTwotoneStar className="mr-2" /> Select Requirement Type
              </label>
              <>
      
              <select
                className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                name="DesignCommercialBuildingStructureType"
                id="DesignCommercialBuildingType"
                required
              >
                <option>-- Select Building Structure Type --</option>
                {categoryTypeDesign_val.length != 0
                  ? Residential_Requirements.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))
                  
                  
                  
                  : ""}
              </select>
              <select
                className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
                name="DesignCommercialHouseStructureType"
                id="DesignCommercialHouseType"
                required
              >
                <option>-- Select Building Type --</option>
                {categoryTypeDesign_val.length != 0
                  ? Object.values(
                      bookingTypeList[
                        bookingTypeList.findIndex(
                          (x) => x.category == "Design"
                        )
                      ].types[categoryTypeDesign_val]
                    ).map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))
                  
                  
                  
                  : ""}
              </select>
              </>


            </>
          ) : (
            ""
          )}

<div className="grid my-2  px-2">
            {
            categoryTypeDesign_val != "" &&
            categoryTypeDesign_val != "2D-Architectural-Commercial"
              ? bookingTypeList[
                  bookingTypeList.findIndex((x) => x.category == "Design")
                ].types[categoryTypeDesign_val].map((requirement, idx) => (
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

          {
          (categoryTypeDesign_val == "2D-Architectural-Residential" ||
            categoryTypeDesign_val == "2D-Architectural-Commercial") ? (
            <Checkbox
              label="Do you have 3D Architectural Requirements? "
              category={
                bookingTypeList.filter((x) => x.category == "Design")[0]
              }
              rest={{ className: "p-5" }}
            />
          ) : (
            ""
          )}

{
          categoryTypeDesign_val != "" &&
          categoryTypeDesign_val != "2D-Architectural-Residential" ? (
            <p className="px-5">
              For further requirements, Contact :{" "}
              <a className="text-purple-700 font-bold" href="tel:+918011620847">
                +91 80116 20847
              </a>
            </p>
          ) : (
            ""
          )}





        <label
                className=" border-b-2 my-4 drop-shadow-md font-bold text-xl p-2 w-full  flex items-center"
                htmlFor="email"
              >
                 SUPPLY REQUIREMENTS
        </label>



        <>
            <label
            className="flex items-center font-bold text-xl p-2 my-2"
            htmlFor="categoryType"
          >
            <AiTwotoneStar className="mr-2" /> Select Supply Category Type
          </label>

                <select
            onChange={(e) => handleSupplyCategoryType(e.target.value)}
            value={categoryTypeSupply_val}
            className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2"
            name="supplyType"
            id="supplyType"
          >
            <option>-- Select Category Type --</option>
            {Object.keys(
                  bookingTypeList[
                    bookingTypeList.findIndex((x) => x.category == "Supply")
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
              }
          </select>
            </>
        
        

         
          {/* 3d requirement needed? */}
          <div className="grid my-2  px-2">
            {
            categoryTypeSupply_val != ""
              ? bookingTypeList[
                  bookingTypeList.findIndex((x) => x.category == "Supply")
                ].types[categoryTypeSupply_val].map((requirement, idx) => (
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
                      {!["Kg", "ColorCode"].includes(requirement) ? (
                        <Button
                          onClick={()=>{handlerDimension(requirement)}}
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
          

      
          <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="modalDesign"
        aria-labelledby="modalDesign"
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
                onClick={() => setDesignCategoryType("2D-Architectural-Residential")}
              >
                2D-Architectural-Residential
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                onClick={() => setDesignCategoryType("2D-Architectural-Commercial")}
              >
                2D-Architectural-Commercial
              </button>
            </div>
          </div>
        </div>
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

export default combined;
