import { Button } from 'antd'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteProduct({ productId }) {
  const navigate = useNavigate();
    const handleDelete = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: token,
        }
        const response = await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${productId}`, {
            headers: headers
        })
        if(response.data) {
            navigate(0)
        }
    } catch(err) {
        console.log('Xatolik yuz berdi ', err);
    }
    }
  return (
    <div>
      <Button onClick={handleDelete} type='primary'>Delete</Button>
    </div>
  )
}

export default DeleteProduct
