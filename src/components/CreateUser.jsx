import React from 'react'
import { Formik } from 'formik';
import '../assets/css/Create.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const CreateUser = () => {
    const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center 100vw">
   <div className=' form-box1 p-3 shadow border-2 '>
            <p className='fs-4'>Create Account</p>
            <Formik
           initialValues={{
 fullName:'',
 email:'',
 password:'',
 pnumber:'',
 cname:'',
 pic:'',
 accountType:''
}}

           validate={values => {
             const errors = {};
             if (!values.email) {
               errors.email = 'Required';
             } else if (
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
             ) {
               errors.email = 'Invalid email address';
             }
             return errors;
           }}
onSubmit={async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("pnumber", values.pnumber);
      formData.append("cname", values.cname);
      formData.append("accountType", values.accountType);
      formData.append("pic", values.pic);

      await axios.post("http://localhost:3001/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("User created successfully");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
    navigate('/');
    setSubmitting(false);
  }}
>{({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue
}) => (


            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>

               
                <input
                 className='form-control'
                 type="text"
                 placeholder='Enter Your Name'
                 name="fullName"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.fullName}
                 
               />
               <label htmlFor="">Full Name <b className='text-danger'>*</b></label>
                 <input
               className='form-control'
                 type="tel"
                 pattern='[0-9]{10}'
                 placeholder='Enter Your Phone Number'
                 name="pnumber"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.pnumber}
                 
               />
               <label htmlFor="">Phone Number <b className='text-danger'>*</b></label>
               <input
               className='form-control'
                 type="email"
                 placeholder='Enter Your Email address'
                 name="email"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.email}
                 
               />
               <label>Email <b className='text-danger'>*</b></label>
               {errors.email && touched.email && errors.email}
               <input
               className='form-control'
                 type="password"
                 name="password"
                 placeholder='Enter Your Password'
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.password}
               />
               <label id='lab2'>Password <b className='text-danger'>*</b></label>
               {errors.password && touched.password && errors.password}
                
                       <input
               className='form-control'
                 type="text"
                 placeholder='Enter Your Company Name'
                 name="cname"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.cname}
                 
               />
                <label htmlFor="">Company Name <b className='text-danger'>*</b></label>
               
                
          <input
  type="file"
  name="pic"
  className="form-control"
  accept="image/*"
  onChange={(e) => setFieldValue("pic", e.target.files[0])}
/>

          <label className="form-label">Upload Image <b className='text-danger'>*</b></label>
               <h5>Are You Agency ?</h5>
                 <div>
               <input
              type="radio"
              id="personal"
              name="accountType"
              value="Yes"
              onChange={handleChange}
              checked={values.accountType === "Yes"}
            />
            <label id="rlab" htmlFor="personal" className="ms-2">Yes</label>
            &nbsp;&nbsp;
            <input
              type="radio"
              id="business"
              name="accountType"
              value="no"
              onChange={handleChange}
              checked={values.accountType === "no"}
            />
            <label id="rlab" htmlFor="business" className="ms-2">No</label>
          </div>


               <button type="submit" className='form-control p-3 btn' disabled={isSubmitting}>
  Create Account
</button>
<button type='submit'  className='btn btn danger' onClick={()=>navigate('/')}>LOgin</button>
             </form>
           )}
         </Formik>
        </div>
</div>
  )
}

export default CreateUser