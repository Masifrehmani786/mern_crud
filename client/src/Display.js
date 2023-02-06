import React, { useState, useEffect } from 'react'
import './App.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IjkzYzVhMTA0LTY4ODYtMTJmMC0wNDFiLTNhMDc3ZTE1NzMwZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6Ijg4YTcyNjQyLTY4NDMtNDY5NC1iOTNhLWE2YjU0M2Q3ZmJhOCIsImlhdCI6MTY3NTI0NDM3NiwibmJmIjoxNjc1MjQ0Mzc2LCJleHAiOjE2NzUzMzA3NzYsImlzcyI6IkRpYXJ5IiwiYXVkIjoiRGlhcnkifQ.5KctMN9Ar6VA5hWPlnuqAp6DLTybksJIirLCsZS9cC0'

function Display() {
    const [getuserdata, setuserData] = useState([])
    console.log(getuserdata);
    const getdata = async (e) => {

        const res = await fetch("https://localhost:44379/api/services/app/Province/GetAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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

        const res2 = await fetch(`https://localhost:44379/api/services/app/Province/Delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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
        }

    }
    return (

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
                            <th scope="col">Province Name</th>
                            <th scope="col">Province Description</th>
                            
                            <th scope="col">creatorUserId</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {  getuserdata &&
                            getuserdata.map((element, id) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.provinceName}</td>
                                            <td>{element.provinceDescription}</td>
                                            <td>{element.creatorUserId}</td>
                                            <td className="d-flex justify-content-between">
                                                {/* <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink> */}
                                                <button className="btn btn-danger" ><DeleteIcon /></button>
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

    )
}

export default Display
