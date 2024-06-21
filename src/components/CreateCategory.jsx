// import { Button, Modal } from 'antd'
// import React, { useState } from 'react'
// import CategoryForm from './CategoryForm';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function CreateCategory() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handleCreate = async (productForm) => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const navigate = useNavigate()
//     const token = localStorage.getItem('token')
//     const headers = {
//         Authorization: token,
//     };
//     const data = {
//         image: productForm.image,
//         name: productForm.name
//     }
//     const response = await axios.post(`https://ecommerce-backend-fawn-eight.vercel.app/api/products`, data, {
//         headers: headers
//     });
//     if(response.data) {
//         navigate('/')
//     }
//     if(response) {
//       alert('Succes')
//     }
//     handleOk()
//   }

//   return (
//     <div>
//       <Button onClick={showModal} type='primary'>Create</Button>
//       <Modal 
//         title="Basic Modal" 
//         open={isModalOpen} 
//         onOk={handleOk} 
//         onCancel={handleCancel}
//     >
//         <CategoryForm onSubmit={handleCreate} />
//       </Modal>
//     </div>
//   )
// }

// export default CreateCategory
// import { Button, Modal } from 'antd'
// import React, { useState } from 'react'
// import ProductsForm from './ProductsForm';
// import { createProducts } from '../api';

// function CreateProducts() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handleCreate = async (productForm) => {
//     const response = await createProducts(productForm)
//     if(response) {
//       alert('Succes')
//     }
//     handleOk()
//   }

//   return (
//     <div>
//       <Button onClick={showModal} type='primary'>Create</Button>
//       <Modal 
//         title="Basic Modal" 
//         open={isModalOpen} 
//         onOk={handleOk} 
//         onCancel={handleCancel}
//     >
//         <ProductsForm onSubmit={handleCreate} />
//       </Modal>
//     </div>
//   )
// }

// export default CreateProducts
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Flex } from 'antd';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

const categorySchema = Joi.object().keys({
  image: Joi.string().required(),
  name: Joi.string().required()
});

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectCategory, setCategory] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (category) => {
    setCategory(category)
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: token
      }
      const data = {
        name: selectCategory.name,
        image: selectCategory.image
      }
      const response = await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${selectCategory._id}`, data, {
        headers: headers
      })
      navigate(0)
      console.log(response);
    } catch(error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form, setForm] = useState({
    image: '',
    name: ''
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate])

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  const handleCreate = async () => {
    try {
      const { error } = categorySchema.validate(form);
      if (error) {
        console.error(error);
        return;
      }
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: token
      }
      const data = {
        name: form.name,
        image: form.image
      }
      const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/categories', data, {
        headers: headers
      });
      setCategories([...categories, response.data]);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory((categoryOld) => ({
      ...categoryOld, [name]: value
    }))
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: token,
      }
        const response = await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${id}`, {
        headers: headers
      })
        if(response.data) {
        navigate(0)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => <img width={100} src={image} alt="category rasmi" />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Edit',
      dataIndex: 'editOperation',
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => showModal(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'deleteOperation',
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => handleDelete(record._id)}>
            Delete
          </Typography.Link>
        );
      },
    }
];
return (
  <div>
    <Button type="primary" onClick={() => setModalVisible(true)}>
Create Category
    </Button>
    <Modal
      title="Create Category"
      visible={modalVisible}
      onOk={handleCreate}
      onCancel={() => setModalVisible(false)}
    >
      <Form>
        <Form.Item label="Image">
          <Input value={form.image} onChange={(e) => setForm({...form, image: e.target.value })} />
        </Form.Item>
        <Form.Item label="Title">
          <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value })} />
        </Form.Item>
      </Form>
    </Modal>
    <Modal 
      title="Edit Modal" 
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={handleCancel}>
      <form action="">
        <Flex gap='middle' vertical>
          <div>
            <Input 
              placeholder='Name' 
              value={selectCategory?.name} 
              onChange={handleChange}
              name='name'
              />
          </div>
          <div>
            <Input 
              placeholder='Image' 
              value={selectCategory?.image}
              onChange={handleChange}
              name='image'
              />
          </div>
        </Flex>
      </form>
    </Modal>
    <Table columns={columns} dataSource={categories} loading={loading} />
  </div>
);
};

export default Categories;