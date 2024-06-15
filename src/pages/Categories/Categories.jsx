import React, { useEffect, useState } from 'react';
import { Flex, Form, Input, InputNumber, Modal, Table, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateCategory from '../../components/CreateCategory';
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Categories = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [selectCategory, setSelectedCategory] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/register')
    }
  }, [navigate])  

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
        setData(response.data)
      } catch(err) {
        console.log(err);
      }
    }
    getCategory()
  }, [])
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
    } catch(err) {
      console.log(err);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (category) => {
    setSelectedCategory(category)
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const response = await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${selectCategory._id}`, {
        name: selectCategory.name,
        image: selectCategory.image
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedCategory((categoryOld) => ({
      ...categoryOld, [name]: value
    }))
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: '25%',
      editable: false,
      render: (_, record) => {
        return <img width={100} src={record.image} alt={record.name} />
      }
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
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
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <CreateCategory />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
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
    </Form>
  );
};
export default Categories;