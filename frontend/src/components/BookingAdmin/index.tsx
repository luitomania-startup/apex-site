import React,{useEffect,useState} from 'react'
import {Button} from './shared/Button'
import {fetchBookingTypes,
    addNewCategory_,
    deleteType_,
    deleteTypeValue_,
    updateTypeName_,
    updateTypeValue_,
    addNewTypeValue_,selectBookingTypes,selectLoading} from '../store/booking/bookingSlice'
import { useAppDispatch, useAppSelector } from "../../components/store";
import AddDimensionModal from './modals/dimensionModal';
import AddNewTypeModal from './modals/addNewTypeModal';
import { getBookingUploadSign } from "../../routes/Booking/service";
const index = () => {
 const [addTypeModal,setAddTypeModal] = useState(false);
 const [selectedCategory , setSelectedCategory] = useState("");
 const [dimensionModal, setDimensionModal] = useState(false);
 const [selectedDimension,setSelectedDimension] = useState("")
 const [bookingUploadedFilename, setBookingUploadedFilename] = useState("");
 const [bookingUploadedFilenamePublic, setBookingUploadedFilenamePublic] = useState("");
 const [selectedType,setSelectedType] = useState("");
 
 const toggleAddTypeModal = (category:string)=>{
    setSelectedCategory(category);
    setAddTypeModal(!addTypeModal);
 }

 const toggleDimensionModal = (typeValue:string,categoryType:string)=>{
    setSelectedType(categoryType)
    setSelectedDimension(typeValue);
    setDimensionModal(!dimensionModal);
 }
 const bookingTypeList = useAppSelector(selectBookingTypes)
 const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const fetchbookings = async()=>{
        await dispatch(fetchBookingTypes())
        // //console.log(bookingTypeList.filter(x=>x.category=='Supply')[0].types)

        //console.log(bookingTypeList);
    }
    fetchbookings();
   
  },[   ])
  const resetPublicUrl = ()=>{
    setBookingUploadedFilename('')
  }

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
    <div className=" mx-auto max-w-[600px] sm:max-w-[1024px]">
    <h1 className=" text-white bg-black border-5 border-white p-3 shadow-lg shadow-black text-4xl text-center font-poppins uppercase my-10"> CUSTOMIZE BOOKING VARIABLES</h1>
        
        {
            loading == 'idle' || loading == 'pending' ? <h1 className="m-5 text-center">Loading...</h1> :
            
            bookingTypeList.map((category)=><div className="my-10 border-2 border-blue-100 p-10">
            <h2 className="text-4xl font-Roboto_Mono font-bold">CATEGORY: {category.category} <Button onClick = {()=>toggleAddTypeModal(category.category)} className="pl-5 bg-blue-500 hover:bg-blue-400">ADD NEW TYPE</Button></h2>
            {   
                Object.entries(category.types).map(([type,values])=>
                    <div className="pt-2  border-2 border-orange-50">  
                    <p className=" font-Roboto_Mono text-2xl font-bold flex flex-row justify-between">TYPE: {type}
                      <div>
                      <Button className="pl-5 bg-green-500 hover:bg-green-400">ADD VALUE</Button><Button className="pl-5 bg-yellow-500 hover:bg-yellow-400">EDIT</Button><Button className=" bg-red-500 hover:bg-red-400">DELETE</Button>
                     
                      </div>
                     </p>
                    
                    <ol>
                    {
                        values.map((value)=><li className="font-Roboto_Mono flex flex-row justify-between  list-disc text-xl ">{value} 
                        <div>
                        <Button className="bg-yellow-500 hover:bg-yellow-400">EDIT</Button><Button className="bg-red-500 hover:bg-red-400">DELETE</Button>
                        
                        </div>
                        </li>)
                    }
                    </ol>
                    </div>
                    // //console.log(key)

                )
            }
        </div> )
        }
    </div>
    {addTypeModal ? <AddNewTypeModal toggleModal={toggleAddTypeModal} category={selectedCategory}/>:""}

    <div className="mx-auto max-w-[600px] sm:max-w-[1024px] ">
        <h1 className=" text-white bg-black border-5 border-white p-3 shadow-lg shadow-black text-6xl text-center font-poppins uppercase my-10"> Set Dimensions</h1>
        {
            (loading=="succeeded" && bookingTypeList)? Object.entries(bookingTypeList.filter(x=>x.category=="Supply")[0].types).map(([type,values])=>
            <div className="pt-2  border-2 border-orange-50">  
            <div className=" font-Roboto_Mono text-2xl font-bold flex flex-row justify-between">TYPE: {type}
              
             </div>
            
            <ol>
            {
                values.map((value)=><li className="font-Roboto_Mono flex flex-row justify-between  list-disc text-xl ">{value} 
                <div>
                    <Button onClick = {()=>toggleDimensionModal(value,type)} className="bg-red-500 hover:bg-red-400">ADD/UPDATE DIMENSION</Button>
                
                </div>
                </li>)
            }
            </ol>
            </div>) :""
        }
    </div>

    {dimensionModal ? <AddDimensionModal type={selectedType} reseturl={resetPublicUrl} toggleModal={toggleDimensionModal} urlval={bookingUploadedFilename} geturlFunc ={BookingUpload} typeValue={selectedDimension}/>:""}

    </>
    
    
  )
}



export default index