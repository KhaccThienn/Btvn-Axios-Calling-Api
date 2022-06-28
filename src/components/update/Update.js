import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
// import { Swal } from 'sweetalert2';

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    axios.put(`http://localhost:3000/data${id}`, {
      fullname,
      className,
    });
    navigate("/read");
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/data/${id}`).then((response) => {
      setFormData(response.data);
    });
  }, [id]);

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
              Update
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
