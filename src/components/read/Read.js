import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Update() {

  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState();
  
  const getData = () => {
    axios.get("http://localhost:3000/data").then((getData) => {
      setApiData(getData.data);
      setData(getData.data);
    });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3000/data${id}`).then(() => {
      getData();
    });
  }

  const searchValue = (e) => {
    let value = e.target.value;
    let dataSearchValue = data.filter((items) => {
      return  items.fullname.toLowerCase().includes(value.toLowerCase());
    })
    setApiData(dataSearchValue);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" flex justify-center ">
      <div className="container">
        <input className="form-control" placeholder="Finding..." type="text" onChange={ e => {searchValue(e)}}/>
      </div>
      <table className="table table-striped table-hover table-hover-cell" >
        <thead>
          <tr>
            <th>ID</th>
            <th className="px-2 py-3">Name</th>
            <th>Class Name</th>
            <th>
              <Link to="/" className="btn btn-primary">ADD</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((val) => {
            return (
              <tr
                key={val.id}
              >
                <td>
                  {val.id }
                </td>
                <td>{val.fullname}</td>
                <td>{val.className}</td>
                <td>
                  <button>
                    <Link to={`/update/${val.id}`}>Update</Link>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => onDelete(val.id)}
                  >
                    Delete
                    {/* <Link to="/delete">Delete</Link> */}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Update;
