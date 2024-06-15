import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import ProductsForm from './ProductsForm';
import { createProducts } from '../api';

function CreateProducts() {
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
    const response = await createProducts(productForm)
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
        <ProductsForm onSubmit={handleCreate} />
      </Modal>
    </div>
  )
}

export default CreateProducts
