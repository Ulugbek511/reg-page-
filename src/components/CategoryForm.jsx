import { Button, Flex, Input } from 'antd'
import React, { useEffect, useState } from 'react'

const initialSate = {
    image: '',
    name: ''
}

function CategoryForm({ onSubmit, initialValues }) {
    const [categoryForm, setCategoryForm] = useState(initialSate)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoryForm((prevProdForm) => ({ ...prevProdForm, [name]: value}))
    }

    const handleSubmit = () => {
        onSubmit(categoryForm)
    }

    useEffect(() => {
        if (initialValues) {
            setCategoryForm(initialValues)
        }
        return () => {
            setCategoryForm(initialSate)
        }
    }, [initialValues])

  return (
    <div>
      <form action="">
        <Flex vertical gap='middle'>
            <div>
                <Input placeholder='Enter Image'  name='image' value={categoryForm.image} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter Name' name='name' value={categoryForm.name} onChange={handleChange} />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
        </Flex>
      </form>
    </div>
  )
}

export default CategoryForm
