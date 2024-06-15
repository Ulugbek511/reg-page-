import React from 'react'
import CategoryForm from '../components/CategoryForm';
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div style={{lineHeight:"2",fontSize:"20px"}}>
        <a  href='/category'> Categories page</a> <br />
        <a href="/products">Products page</a> <br />
        <a href="/register">Register page</a>
      </div>
     
      {/* <link rel="stylesheet" href={CategoryForm} /> */}
    </div>
  )
}

export default Home;
