import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import CategoryForm from './CategoryForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCategory() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreate = async (productForm) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const headers = {
        Authorization: token,
    };
    const data = {
        image: productForm.image,
        name: productForm.name
    }
    const response = await axios.post(`https://ecommerce-backend-fawn-eight.vercel.app/api/products`, data, {
        headers: headers
    });
    if(response.data) {
        navigate('/')
    }
    if(response) {
      alert('Succes')
    }
    handleOk()
  }

  return (
    <div>
      <Button onClick={showModal} type='primary'>Create</Button>
      <Modal 
        title="Basic Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
    >
        <CategoryForm onSubmit={handleCreate} />
      </Modal>
    </div>
  )
}

export default CreateCategory
