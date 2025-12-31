import React, { useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="form-box1 p-3 shadow border-2">
        <p className="fs-4">Update User</p>

        <Formik
  initialValues={{
    fullName: "",
    email: "",
    password: "",
    pnumber: "",
    cname: "",
    accountType: "",
    pic: null,
  }}
  enableReinitialize
  onSubmit={async (values) => {
    try {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      await axios.put(`https://fisssionbackendpro.onrender.com/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("User Updated Successfully");
      navigate("/data");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  }}
>
  {({ values, handleChange, handleSubmit, setFieldValue, setValues }) => {

    useEffect(() => {
      axios
        .get(`https://fisssionbackendpro.onrender.com/${id}`)
        .then((res) => {
          setValues(res.data);
        })
        .catch(() => alert("User Not Found"));
    }, []);
    return (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  className="form-control"
                  type="text"
                  name="fullName"
                  placeholder="Enter Name"
                  value={values.fullName}
                  onChange={handleChange}
                />
                <label>Full Name</label>

                <input
                  className="form-control"
                  type="tel"
                  name="pnumber"
                  value={values.pnumber}
                  onChange={handleChange}
                />
                <label>Phone</label>

                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <label>Email</label>

                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <label>Password</label>

                <input
                  className="form-control"
                  type="text"
                  name="cname"
                  value={values.cname}
                  onChange={handleChange}
                />
                <label>Company</label>

                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFieldValue("pic", e.target.files[0])}
                />
                <label>Upload Image</label>

                <h5>Are You Agency?</h5>
                <input
                  type="radio"
                  name="accountType"
                  value="Yes"
                  checked={values.accountType === "Yes"}
                  onChange={handleChange}
                />{" "}
                Yes
                &nbsp;
                <input
                  type="radio"
                  name="accountType"
                  value="No"
                  checked={values.accountType === "No"}
                  onChange={handleChange}
                />{" "}
                No
                <br />

                <button className="btn btn-success form-control mt-3" type="submit">
                  Update User
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateUser;
