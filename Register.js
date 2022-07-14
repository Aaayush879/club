import React,{useState} from 'react';
import{Form,Button} from 'react-bootstrap';
import './Register.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


const Register=()=>{
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [phone ,setPhone] = useState('');
    const [img , setImg] = useState('');
    const [password , setPassword] = useState('');
    const [otp,setOtp] = useState('');
    const history = useNavigate();
    

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(name,email,phone,img,password);
        const formdata = new FormData();
        formdata.append('name',name)
        formdata.append('email',email)
        formdata.append('phone',phone)
        formdata.append('test',img)
        formdata.append("password",password)
        console.log(formdata);
        setName("");
        setEmail("");
        setImg("");
        setPassword("");
        setName("");
        axios.post('http://localhost:5000/',formdata).then(()=>{
            console.log('data submitted');
            console.log(formdata);
            alert('enter otp send at your mail id');
        })
        alert('data submitted')
    }
    const onVerify=(e)=>{
        e.preventDefault();
        const data={otp:otp};
        console.log(data);
        setOtp("");
        axios.post('http://localhost:5000/otp',data).then((res)=>{
            console.log(res);
            console.log('submitted');
            console.log(data);
            if(res.data=='verified'){
                history('/home');
            }
            else{
                alert("invalid otp");
            }
        })
    }
    return(
        <div className='we'>
            <h1>hi</h1>
            <div className='as bg-success'>
                <Form onSubmit={onSubmit} encType="multipart/form-data">
                    <Form.Label className='a'>Register</Form.Label>
                    <Form.Group>
                        <Form.Label className='a'>Name</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='name'
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group
                     className='re'>
                        <Form.Group>
                            <Form.Control
                            placeholder='email'
                            type='email'
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                            placeholder='phone no'
                            type='phone'
                            value={phone}
                            onChange={(e=>{setPhone(e.target.value)})}
                            
                            />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='a'>Image</Form.Label>
                        <Form.Control
                        type='file'
                        filename="test"
                        onChange={(e)=>{setImg(e.target.files[0])}}
                        
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>
                    <Button className='a' onClick={onSubmit} >submit</Button>
                </Form>
                <Form onSubmit={onVerify}>
                    <Form.Group>
                        <Form.Label>OTP</Form.Label>
                        <Form.Control
                        placeholder='otp'
                        type='text'
                        value={otp}
                        onChange={(e)=>{setOtp(e.target.value)}}/>
                    </Form.Group>
                    <Button onClick={onVerify}>Verify</Button>
                </Form>
            </div>

        </div>
    )
}
export default Register;