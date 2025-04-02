import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AdminWrapper = styled.div`
  padding: 4rem;
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  border-radius: 16px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #111;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #000;
  color: white;
  padding: 0.9rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`;

const Admin = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('tags', product.tags);
    formData.append('image', product.image); // ✅ Correct way

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/upload-product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Product uploaded successfully');
      setProduct({
        name: '',
        description: '',
        category: '',
        tags: '',
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert('❌ Error uploading product');
    }
  };

  return (
    <AdminWrapper>
      <Title>Upload New Product</Title>
      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <TextArea name="description" placeholder="Product Description" value={product.description} onChange={handleChange} required />
        <Input name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
        <Input name="tags" placeholder="Tags (comma separated)" value={product.tags} onChange={handleChange} />
        <Input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <Button type="submit">Upload Product</Button>
      </Form>
    </AdminWrapper>
  );
};

export default Admin;
