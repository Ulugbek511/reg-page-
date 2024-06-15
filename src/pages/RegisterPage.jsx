import React, { useState } from 'react';
import { Button, Flex, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const Submit = async () => {
    if(!email || !password) {
      toast('Maydonlarni toldiring !')
    }
    try {
        const response = await axios.post(`https://ecommerce-backend-fawn-eight.vercel.app/api/auth`, {
        email: email,
        password: password
      })
      if(response.data) {
        navigate('/products')
        localStorage.setItem('token', response.data)
      }
    }catch(err) {
      console.log('Xatolik yuz berdi', err);
      toast('Email yoki Password xato kiritilgan')
    }
  }
  return (
    <div className='forest'>
      <Flex vertical gap='middle'>
      <div style={{display:"flex",alignItems:"center",flexDirection:"column",lineHeight:"3",justifyContent:"center",color:"brown"}}><h1>Login</h1>
        <label style={{color:"white"}} htmlFor="email">Email</label>
        <Input style={{width:"300px"}} onChange={(e) => setEmail(e.target.value)} value={email} id='email' name='email' placeholder='Enter email' />
        <label style={{color:"white"}} htmlFor="password">Password</label>
        <Input style={{width:"300px"}} onChange={(e) => setPassword(e.target.value)} value={password} name='password' id='password' placeholder='Enter password' />
        <Button style={{marginTop:"30px"}} type='primary' onClick={Submit}>Submit</Button>
        <ToastContainer /></div>
      </Flex>
    </div>
  )

};
export default Register;