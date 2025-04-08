import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import CustomToast from '../components/CustomToast';
import banner1 from '../assets/preview-banner.jpg';
import banner2 from '../assets/preview-banner1.jpg';
import banner3 from '../assets/preview-banner2.jpg';

const banners = [
  {
    image: banner1,
    text: 'Every product you add helps Lumicare glow.',
    position: 'left',
    color: '#ffffff',
  },
  {
    image: banner2,
    text: '',
    position: 'center',
    color: '#000000',
  },
  {
    image: banner3,
    text: '',
    position: 'right',
    color: '#ffffff',
  },
];

// 🌟 Fade + Scale animation
const fadeScale = keyframes`
  0% { opacity: 0; transform: scale(1.03); }
  50% { opacity: 0.5; transform: scale(1.01); }
  100% { opacity: 1; transform: scale(1); }
`;

const Container = styled.div`
  background-color: #000;
  color: #fff;
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  background-color: black;
`;
const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  animation: ${fadeScale} 1.2s ease-in-out;
  display: block;
  margin: 0 auto;
`;


const BannerText = styled.div`
  position: absolute;
  bottom: 10%;
  ${({ position }) => position}: 5%;
  font-size: 1.6rem;
  color: ${({ color }) => color};
  font-weight: 500;
  z-index: 2;
  text-shadow: 1px 1px 5px rgba(255, 250, 250, 0.4);

  @media (max-width: 768px) {
    font-size: 1rem;
    ${({ position }) => position}: 3%;
  }
`;

const FormSection = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #111;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1.2rem 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  align-self: center;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid #444;
  background: #111;
  color: #fff;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid #444;
  background: #111;
  color: #fff;
  font-size: 1rem;
`;

const FileUploadWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  padding: 0.6rem 1.2rem;
  background: transparent;
  border: 1px solid #fff;
  color: white;
  font-weight: 500;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const SubmitButton = styled.button`
  grid-column: span 2;
  background: linear-gradient(to right, #fff, #ccc);
  color: #000;
  font-weight: 600;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 2rem;
  max-width: 240px;
  justify-self: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    grid-column: span 1;
    width: 100%;
  }
`;

const Admin = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    subcategory: '',
    description: '',
    tags: '',
    images: null,
  });

  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setProduct({ ...product, images: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setToast({ show: true, message: '❌ Admin access required.', type: 'error' });
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/upload-product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setToast({ show: true, message: '✅ Product uploaded successfully', type: 'success' });

      setProduct({
        name: '',
        price: '',
        category: '',
        subcategory: '',
        description: '',
        tags: '',
        images: null,
      });
    } catch (err) {
      setToast({ show: true, message: '❌ Upload failed.', type: 'error' });
    }
  };

  return (
    <Container>
      <BannerWrapper>
        <BannerImage key={banners[currentIndex].image} src={banners[currentIndex].image} alt="Banner" />
        <BannerText position={banners[currentIndex].position} color={banners[currentIndex].color}>
          {banners[currentIndex].text}
        </BannerText>
      </BannerWrapper>

      <FormSection>
        <Title>Upload New Product</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Product Name</Label>
          <Input name="name" value={product.name} onChange={handleChange} required />

          <Label>Price</Label>
          <Input name="price" type="number" value={product.price} onChange={handleChange} required />

          <Label>Category</Label>
          <Input name="category" value={product.category} onChange={handleChange} required />

          <Label>Subcategory</Label>
          <Input name="subcategory" value={product.subcategory} onChange={handleChange} />

          <Label>Description</Label>
          <TextArea name="description" rows="3" value={product.description} onChange={handleChange} required />

          <Label>Tags</Label>
          <Input name="tags" value={product.tags} onChange={handleChange} />

          <Label>Upload Image</Label>
          <FileUploadWrapper>
            <FileLabel htmlFor="imageUpload">Choose Image</FileLabel>
            <FileInput id="imageUpload" name="images" type="file" accept="image/*" onChange={handleChange} required />
          </FileUploadWrapper>

          <SubmitButton type="submit">Upload Product</SubmitButton>
        </Form>
      </FormSection>

      {toast.show && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </Container>
  );
};

export default Admin;
