import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    className: "",
  });
  const { fullname, className } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const sendDataToAPI = () => {
    if (fullname === "" || className === "") {
      return (
        Swal.fire({
          icon: "error",
          position: "top",
          title: "Oops...",
          text: "FullName and Class Name is required",
          confirmButtonText: "Ok",
        })
      )
    } else {
      Swal.fire({
        icon: "success",
        title: "Successfully...",
        text: "Sending data to API...",
        timer: 1500
      });
      axios
        .post("http://localhost:3000/data", {
          fullname,
          className,
        })
        .then((response) => {
          console.log(response);
          navigate("/read");
          setFormData({ fullname: "", className: "" });
        });
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center py-16 container">
        <form className="flex flex-col py-2" onSubmit={onSubmit}>
          <div className="pt-3">
            <input
              type="text"
              className="w-100 shadow appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:shadow-outline"
              id="fullname"
              name="fullname"
              value={fullname}
              placeholder="Enter your Full Name"
              onChange={onChange}
            />
          </div>
          <div className="pt-3">
            <input
              type="className"
              className="w-100 shadow appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:shadow-outline"
              id="className"
              name="className"
              value={className}
              placeholder="Enter your className"
              onChange={onChange}
            />
          </div>

          <div className="pt-3 row container">
            <button
              type="submit"
              className="btn btn-primary font-bold rounded mr-2"
              onClick={sendDataToAPI}
            >
              {/* <Link to="/read">Submit</Link> */}
              Submit
            </button>
            <Link
              to="/read"
              className="w-full font-bold rounded btn btn-primary"
            >
              View All List
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Create;
