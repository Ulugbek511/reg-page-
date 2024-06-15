import axios from "axios";

const url = 'https://ecommerce-backend-fawn-eight.vercel.app';

export async function createProducts(data) {
    try {
        const response = await axios.post(`${url}/api/products`, data)
        console.log(response);
        return response;
    } catch(error) {
        console.log(error);
    }
}

export async function getProductById(productId) {
    try {
        const response = await axios.get(`${url}/api/products/${productId}`)
        return response;
    } catch(error) {
        console.log(error);
    }
}

export async function editProduct(data, productId) {
    try {
        const response = await axios.put(`${url}/api/products/${productId}`, data)
        return response;
    } catch(error) {
        console.log(error);
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await axios.delete(`${url}/api/products/${productId}`)
        return response
    } catch(error) {
        console.log(error);
    }
}