import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataDisplay = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://fisssionbackendpro.onrender.com//users");
      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users", err);
    }
  };
//  Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged Out Successfully");
    navigate("/");
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) return;

    try {
      await axios.delete(`https://fisssionbackendpro.onrender.com//${id}`);
      alert("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-3">User Details</h3>
         <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      <div className="table-responsive shadow rounded">
        <table className="table table-striped table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Picture</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="9">No Users Found</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.pnumber}</td>
                  <td>{user.cname}</td>

                  <td>
                    {user.pic ? (
                      <img
                        src={`http://localhost:3001${user.pic}`}
                        alt="profile"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/update/${user._id}`)}
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataDisplay;
