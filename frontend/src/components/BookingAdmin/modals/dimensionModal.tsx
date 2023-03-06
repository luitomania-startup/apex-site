import React,{useState} from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
interface IaddNewTypeModalProps {
  typeValue: string ; 
  toggleModal : (typeValue:string)=> void ;
}
import {useAppDispatch,useAppSelector} from '../../store'

import {postBookingDimension_,selectLoading} from '../../store/booking/bookingSlice'
import { Button } from '../shared/Button';

const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:bg-gray-200",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  textarea:
    "bg-gray-100 w-[300px] sm:w-[600px] lg:w-[800px] focus:shadow-outline rounded block w-full appearance-none focus:bg-gray-200 p-5",
};



const addDimensionModal= (props:any) => {
  const [publicurl,setpublicurl] = useState()
  const dispatch = useAppDispatch()
  const formInitialValues = {
    typeValue: props.type+"-"+props.typeValue,
    public_url: ""
  };
  
   const toggle = ()=>{
    props.toggleModal(props.toggleDimensionModal);
   }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className= "  modal fixed top-0 left-0  w-screen h-screen outline-none overflow-x-hidden overflow-y-auto"
  id="exampleModal"  >
  <div className="modal-dialog relative w-auto pointer-events-none">
    <div
      className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Set dimension for Your Supply Value</h5>
        <button type="button" onClick={toggle}
          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          ></button>
      </div>
      <div className="modal-body relative p-4">
      <Formik
        initialValues={formInitialValues}
        validate={(values) => {
          const errors: any = {};
          // if(!values.public_url){
          //   errors.public_url = " Image URL is required, please click on upload Image"
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          // //console.log(values)
          
          const data = {
            type:values.typeValue,
            public_url: props.urlval
          }
          //console.log('data')
          //console.log(data)
          // dispatch(postBookingDimension_(values))
          props.reseturl();
          dispatch(postBookingDimension_(data))
          .then(()=>{
            alert('Successfully updated boooking dimensions')
          })
          .catch(err=>{
            alert("ERROR"+ JSON.stringify((err as Error).message))
          })

          
        }}
      >
        {({
          values,
          isSubmitting,
          isValid,
          errors,
          touched,
          setFieldValue,
        }) => (
          <div className="w-full flex justify-center my-10">
            <Form className=" form-training w-[300px] sm:w-[600px] lg:w-[800px]">
              <div className="form-group row py-sm-1 px-sm-3">
                <label className={styles.label} htmlFor="typeValue">
                  Type-Value<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.typeValue && errors.typeValue ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="typeValue"
                  placeholder="typeValue" disabled
                />
                <ErrorMessage
                  name="typeValue"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-1 px-sm-3">
                <label className={styles.label} htmlFor="type">
                  Public URL<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.public_url && errors.public_url? "is-invalid" : ""
                  }`}
                  type="text"
                  name="public_url"
                  value ={props.urlval}
                  placeholder="Copy Paste Your File public url after upload completes"
                />
                <ErrorMessage
                  name="public_url"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>   
              <div className=" flex justify-center flex-wrap items-center p-4 border-t border-gray-200 rounded-b-md">
               
                <button
                  type="submit"
                  className="px-6
                  py-2.5
                  bg-purple-600
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-purple-700 hover:shadow-lg
                  focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-purple-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out
                  ml-1"
                  disabled={isSubmitting}
                  style={{
                    color: "white",
                  }}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <div className="flex flex-row gap-1">
                    {" "}
                    UPLOAD
                  </div>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      <Button className="bg-green-400 hover:bg-green-500 transition-all ease-linear duration-200" onClick={()=> {
        props.geturlFunc();
        }} > Upload Image File </Button>
                {/* {props.urlval!=''?<span>{props.urlval}</span>:''} */}
      </div>
    </div>
  </div>
</div>
    </div>
    
  )
}

export default addDimensionModal