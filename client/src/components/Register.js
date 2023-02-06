import React ,{ useState,useContext} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'

function Register() {
   
    const navigate = useNavigate();
    const [inpVal,setINP]= useState({
        name:"",
        email:'',
        age:'',
        mobile:'',
        work:'',
        add:'',
        desc:''

    });
    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, work, add, mobile, desc, age } = inpVal;

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, work, add, mobile, desc, age
            })
        });

        const data = await res.text();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error ");
            alert("error");

        } else {
            navigate("/")
            alert("data added")
            setINP(data)
            console.log("data added");

        }
    }
    return (
        <>
            <div className="container">
                <NavLink to='/'>Home</NavLink>

                <form>
                    <div className="row mt-5">
                        <div className="mb-3 col-lg-6 col-mid-6 col-12">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" onChange={setdata} name="name" value={inpVal.name} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-mid-6 col-12">
                            <label for="exampleInput Password1" className="form-label">Email</label>
                            <input type="email" onChange={setdata} name="email" value={inpVal.email} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-mid-6 col-12">
                            <label for="exampleInput Password1" className="form-label">Age</label>
                            <input type="text" onChange={setdata} name="age" value={inpVal.age} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-mid-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Mobile</label>
                            <input type="number" onChange={setdata} name="mobile" value={inpVal.mobile} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-mid-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Work</label>
                            <input type="text" onChange={setdata} name="work" value={inpVal.work} className="form-control" id="exampleInput Password1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-mid-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" onChange={setdata} name='add' value={inpVal.add} className="form-control" id="exampleInput Password1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-mid-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Discription</label>
                            <textarea type="text" onChange={setdata} name='desc' value={inpVal.desc} className="form-control" id="exampleInput Password1" />
                        </div>
                        
                    </div>
                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Register
