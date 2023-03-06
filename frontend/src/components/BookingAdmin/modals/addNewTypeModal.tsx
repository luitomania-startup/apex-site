import React from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
interface IaddNewTypeModalProps {
  category : string ; 
  toggleModal : (category:string)=> void ;
}

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

const addNewTypeModal = (props:IaddNewTypeModalProps) => {
  const formInitialValues = {
    category: props.category,
    type: "",
    newvalue: ""
  };
   const handleSubmit = ()=>{

   }
   const toggle = ()=>{
    props.toggleModal(props.category);
   }
  return (
    <div className= "modal fixed top-0 left-0  w-screen h-screen outline-none overflow-x-hidden overflow-y-auto"
  id="exampleModal"  >
  <div className="modal-dialog relative w-auto pointer-events-none">
    <div
      className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Modal title</h5>
        <button type="button" onClick={toggle}
          className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          ></button>
      </div>
      <div className="modal-body relative p-4">
      <Formik
        initialValues={formInitialValues}
        validate={(values) => {
          const errors: any = {};
          if (!values.category) {
            errors.category = "First Name is Required";
          } else if (!/^[A-Za-z]{5,30}$/.test(values.category)) {
            errors.category =
              "First Name should not contain special characters or numbers.";
          }

          if (!values.type) {
            errors.type = "Last Name is Required";
          } else if (!/^[A-Za-z]{5,30}$/.test(values.type)) {
            errors.type =
              "Last Name should not contain special characters or numbers.";
          }

          if (!values.newvalue) {
            errors.newvalue = "newvalue is Required";
          } else if (!/^[A-Za-z]{5,30}$/.test(values.newvalue)) {
            errors.newvalue = "Invalid newvalue address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
       
          
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
                <label className={styles.label} htmlFor="category">
                  category<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.category && errors.category ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="category"
                  placeholder="category" disabled
                />
                <ErrorMessage
                  name="category"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-1 px-sm-3">
                <label className={styles.label} htmlFor="type">
                  Type<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.type && errors.type ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="type"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="type"
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
                    SEND
                  </div>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      </div>
    </div>
  </div>
</div>
  )
}

export default addNewTypeModal