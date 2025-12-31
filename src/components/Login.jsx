import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="container p-4 shadow rounded" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Login</h3>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) errors.email = "Email required";
          if (!values.password) errors.password = "Password required";
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await axios.post(
              "https:fisssionbackendpro.onrender.com/login",
              values,
              { withCredentials: true }   // allow cookies if backend sends JWT cookie
            );

            alert("Login Successful");

            // If backend returns token
            if (res.data.token) {
              localStorage.setItem("token", res.data.token);
            }

            navigate("/data");
          } catch (err) {
            if (err.response) {
              alert(err.response.data.message || "Login failed");
            } else {
              alert("Server not reachable");
            }
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
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <small className="text-danger">{errors.email}</small>
            )}

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <small className="text-danger">{errors.password}</small>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              disabled={isSubmitting}
            >
              Login
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => navigate("/create")}
            >
              Create Account
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
