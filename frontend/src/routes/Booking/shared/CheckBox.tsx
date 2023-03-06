import { useState } from "react";
interface ICheckboxProp {
    label : string;
    category: any;
    rest: any;
}
const Checkbox = ({ label ,category, rest } : ICheckboxProp) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggle = () => {
    setIsChecked(!isChecked)
  }
  //console.log(category.types["3D-Architectural"]);
  return (
    <div className={`${rest.className} checkbox-wrapper`}>
      <label>
        <input className="w-4 h-4" type="checkbox" checked={isChecked} onChange = {toggle}/>
        <span className="pl-2">{label}</span>
        {
          isChecked? <>
           {category.types["3D-Architectural"].map((requirement:any,idx:any)=><div  key = {idx} className="grid grid-cols-2">
              <label className="flex items-center" htmlFor={requirement}>{requirement}</label>
              
              <input name={requirement}  id={requirement} className=" border-2 border-transparent   hover:border-black-200 focus:border-black p-2 rounded-md shadow-md my-2" />
              </div>)}
          
          </>:""
        }
      </label>
    </div>
  );
};
export default Checkbox;