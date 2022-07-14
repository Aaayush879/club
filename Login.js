import React,{useState} from 'react';
import{Form,Button} from 'react-bootstrap';
import axios from 'axios';
import './Login.css';
import {Navigate , useNavigate} from 'react-router-dom';
const Login=()=>{

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [me ,setMe] = useState('');
    const history = useNavigate();

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const data={email:email,password:password}
        alert('submitted');
        console.log(data);
        axios.post('http://localhost:5000/login',data).then((res)=>{
            console.log(res);
            setMe(res.data);
            if(me=='succeesful'){
                history('/home');
            }
        })
    }
    const handleRegister=()=>{
        history('/register');
    }
    return(
        <div className='we'>
            <div className='as bg-success'>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Label>Login in</Form.Label>
                    <Form.Group>
                        <Form.Label>USER ID</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='email/phone'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
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
                    <Button onClick={handleOnSubmit}>submit</Button>
                </Form>
                <br/>
                <Button onClick={handleRegister}>Register</Button>
            </div>

        </div>
    )
}
export default Login;