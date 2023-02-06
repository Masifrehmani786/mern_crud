import React ,{useState,useEffect} from 'react'
import { NavLink,useParams,useNavigate } from 'react-router-dom'
function Edit() {
    const navigate = useNavigate("");
    const [inpVal,setINP]= useState({
        name:"",
        email:'',
        age:'',
        mobile:'',
        work:'',
        add:'',
        disc:'',

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

    const { id } = useParams("");
    console.log(id);


    const getdata = async () => {

        const res = await fetch(`http://localhost:5000/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {name,email,work,add,mobile,desc,age} = inpVal;

        const res2 = await fetch(`http://localhost:5000/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,email,work,add,mobile,desc,age
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate("/")
            set(data2);
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
                            <input type="text" onChange={setdata}  value={inpVal.name}  name="name" className="form-control" id="exampleInputEmaill" aria-describedby="emailHelp" placeholder="Enter name"/>
                           <div id="emailHelp" className="form-text"> We'll never share your email with anyone else
                        </div>
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
                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </form>
            </div>
  </>
  )
}

export default Edit
