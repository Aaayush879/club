import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Home.css';
const Home=()=>{
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/home')
        .then((res)=>setData(res.data))
        .catch((e)=>{
            console.log(e);
        })
    })
    
    return(
        <div className='container-fluid'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                {
                data.map((s,ind)=>{
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(s.img)))
                    return(
                        <tr key={ind}>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td><img src={`data:image/png;base64,${base64String}`}/></td>
                        </tr>
                        
                    )

                })
            }

                </tbody>
            </table>
            

        </div>
    )
}
export default Home;