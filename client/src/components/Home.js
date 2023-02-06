import React, { useState, useEffect,useContext } from 'react'
import '../App.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from 'react-router-dom';
import { adddata,updatedata, deldata} from './context/ContextProvider';
function Home() {
   

    const navigate = useNavigate();
    const [getuserdata, setuserData] = useState([])
    console.log(getuserdata);
    const getdata = async (e) => {

        const res = await fetch("http://localhost:5000/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error ");
            alert("error");

        } else {

            setuserData(data)
            console.log("get data");

        }
    }
    useEffect(() => {
        getdata();
    }, []);
    const deleteuser = async (id) => {

        const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setuserData(deletedata)
            getdata();
            navigate("/")
        }

    }
    return (
        <>
           
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mr-4">
                        <NavLink to="/register" className="btn btn-primary">
                            + Add data</NavLink>
                    </div>
                    <table className="table m-1">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Mobile No</th>
                                <th scope="col" >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                        </>

                                    )
                                }
                                )
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Home
