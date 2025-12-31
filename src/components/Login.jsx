import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../assets/css/Sign.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='container-fluid form-box p-3 d-flex flex-column justify-content-center  shadow border-2'>
        <p className='fs-4'>Sign in to  account</p>
        
        <Formik
       initialValues={{ email: '', password: '' }}
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
    const res = await axios.post("https://fisssionbackendpro.onrender.com//login", {
      email: values.email,
      password: values.password
    });

    alert("Login Successful");
    navigate("/data");
  } catch (err) {
    console.log("LOGIN ERROR", err);
    if (err.response) alert(err.response.data);
    else alert("Server not running");
  }

  setSubmitting(false);
}}
>
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form  className=" mb-3" onSubmit={handleSubmit}>
           
           <input
           className='form-control'
             type="email"
             placeholder='Enter Your Email address'
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             
           />
           <label className='label1'>Email</label>
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
           <label className='label1'>Password</label>
           {errors.password && touched.password && errors.password}
           <button className=" form-control btn"  type="submit" disabled={isSubmitting}>
             Submit
           </button>
           <button type='submit'  className='btn btn danger' onClick={()=>navigate('/create')}>Create User</button>
         </form>
       )}
     </Formik>
    </div>
  )
}

export default Login
