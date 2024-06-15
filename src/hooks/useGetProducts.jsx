import axios from 'axios';
import { useEffect, useState } from 'react'

function useGetProducts() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function getProducts() {
            try {
                const url = 'https://ecommerce-backend-fawn-eight.vercel.app';
                const response = await axios.get(`${url}/api/products`)
                if(response.data) {
                    setProducts(response.data)
                } 
            } catch(eror) {
                console.log(eror);
            }
        }
        getProducts()
    }, [])
    return products
}

export default useGetProducts
