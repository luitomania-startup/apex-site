import axios from "axios";
import { IDeleteType,IDeleteTypeValue,INewType,IUpdateTypeName,IUpdateTypeValue , IPostBookingDimension, IGetBookingDimension} from '../../types/types'
const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;

const baseUrl = `${VITE_SERVERURL}/api/booking`;

const sendMessageEmail = (data:any)=>{
    return axios.post(baseUrl+"/sendEmail",data,{
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

const  getAllBookingType = ()=>{
    return axios.get(baseUrl+"/getAllTypes");
}


const addNewCategory =  (data : any)=>{
    return axios.post(baseUrl+"/addNewCategory",data,{
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

const addNewTypeValue  = ( data: INewType) => {
    return axios.post(baseUrl+ "/addNewTypeValue",data , {
        headers : {
            'Content-Type': 'application/json'
        }
    })
}

const updateTypeName = (data : IUpdateTypeName)=>{

     return axios.post(baseUrl+ "/updateTypeName",data , {
        headers : {
            'Content-Type': 'application/json'
        }
    })
}

const updateTypeValue = (data : IUpdateTypeValue)=>{

    return axios.post(baseUrl+ "/updateTypeVlaue",data , {
       headers : {
           'Content-Type': 'application/json'
       }
   })
}
const deleteType = (data : IDeleteType) =>{

    return axios.post(baseUrl+ "/deleteType",data , {
       headers : {
           'Content-Type': 'application/json'
       }
   })
}

const deleteTypeValue = (data: IDeleteTypeValue) => {
    return axios.post(baseUrl+ "/deleteType",data , {
        headers : {
            'Content-Type': 'application/json'
        }
    })
};

const getBookingUploadSign = () => {
    return axios.get(`${VITE_SERVERURL}/api/cloudinary/booking`);
}


const postbookingDimension = (data: IPostBookingDimension) => {
    return axios.post(baseUrl+ "/Add_dimension",data , {
        headers : {
            'Content-Type': 'application/json'
        }
    })
};



const getBookingDimension = (data:IGetBookingDimension) => {
    return axios.post(baseUrl+ "/getDimensionData",data , {
        headers : {
            'Content-Type': 'application/json'
        }
    })
};


export {
    sendMessageEmail,
    getAllBookingType,
    addNewCategory,
    deleteType,
    deleteTypeValue,
    updateTypeName,
    updateTypeValue,
    addNewTypeValue,
    getBookingUploadSign, 
    postbookingDimension,
    getBookingDimension
}
