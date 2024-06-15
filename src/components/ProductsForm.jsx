import { Button, Flex, Input } from 'antd'
import React, { useEffect, useState } from 'react'

const initialSate = {
    title: '',
    subtitle: '',
    image: '',
    description: '',
    rate: '',
    price: "",
    size: '',
    color: ''
}

function ProductsForm({ onSubmit, initialValues }) {
    const [prodForm, setProdForm] = useState(initialSate)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProdForm((prevProdForm) => ({ ...prevProdForm, [name]: value}))
    }

    const handleSubmit = () => {
        onSubmit(prodForm)
    }

    useEffect(() => {
        if (initialValues) {
            setProdForm(initialValues)
        }
        return () => {
            setProdForm(initialSate)
        }
    }, [initialValues])

  return (
    <div>
      <form action="">
        <Flex vertical gap='middle'>
            <div>
                <Input placeholder='Enter Title'  name='title' value={prodForm.title} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter SubTitle' name='subtitle' value={prodForm.subtitle} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter Image' name='image' value={prodForm.image} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter Description' name='description' value={prodForm.description} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter Rate' name='rate' value={prodForm.rate} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter Price' name='price' value={prodForm.price} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter Size' name='size' value={prodForm.size} onChange={handleChange} />
            </div>
            <div>
                <Input placeholder='Enter Color' name='color' value={prodForm.color} onChange={handleChange} />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
        </Flex>
      </form>
    </div>
  )
}

export default ProductsForm
