// Admin.js (cleaned: removed duplicate button, fixed smooth banner transitions)
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import CustomToast from '../components/CustomToast';
import CustomDropdown from '../components/CustomDropdown';
import banner1 from '../assets/preview-banner.jpg';
import banner2 from '../assets/preview-banner1.jpg';
import banner3 from '../assets/preview-banner2.jpg';

const banners = [
  { image: banner1, text: 'Every product you add helps Lumicare glow.', position: 'left', color: '#ffffff' },
  { image: banner2, text: '', position: 'center', color: '#000000' },
  { image: banner3, text: '', position: 'right', color: '#ffffff' },
];

const categories = ['Skincare', 'Body', 'Hair', 'Fragrance','Gifts'];

const subcategoryMap = {
  Skincare: ['Cleansers', 'Moisturizers', 'Serums', 'Toners', 'Masks', 'Eye Creams', 'SPF'],
  'Body': ['Body Wash', 'Body Lotion', 'Exfoliators', 'Deodorants', 'Hand Cream'],
  Hair: ['Shampoo', 'Conditioner', 'Hair Oil', 'Styling', 'Scalp Care'],
  Fragrance: ['Perfume', 'Mist', 'Essential Oils'],
  'New Arrivals': [],
  'Best Sellers': [],
  Memberships: [],
  Gifts: ['For Her', 'For Him', 'Luxury Sets'],
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div` background-color: #000; color: #fff; `;
const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  background-color: black;
  overflow: hidden;
`;
const BannerImage = styled.img`
  position: absolute;
  width: 100%;
  height: 190%;
  object-fit: cover;
  top: 0;
  left: 0;
  animation: ${fadeIn} 1s ease-in-out;
  transition: opacity 0.5s ease-in-out;
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
  max-width: 900px; margin: 3rem auto; padding: 2rem; background: #111; border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
`;
const Title = styled.h2` text-align: center; font-size: 2rem; font-weight: 600; margin-bottom: 2rem; `;
const Form = styled.form`
  display: grid; grid-template-columns: 160px 1fr; gap: 1.2rem 2rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;
const Label = styled.label`
  font-size: 1rem; align-self: center; text-align: right;
  @media (max-width: 768px) { text-align: left; }
`;
const Input = styled.input`
  padding: 0.8rem 1rem; border-radius: 10px; border: 1px solid #444; background: #111; color: #fff; font-size: 1rem;
`;
const TextArea = styled.textarea`
  padding: 0.8rem 1rem; border-radius: 10px; border: 1px solid #444; background: #111; color: #fff; font-size: 1rem;
`;
const FileUploadWrapper = styled.div` display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; `;
const FileInput = styled.input` display: none; `;
const FileLabel = styled.label`
  padding: 0.6rem 1.2rem; background: transparent; border: 1px solid #fff; color: white; font-weight: 500; border-radius: 20px; cursor: pointer;
  &:hover { background: #fff; color: #000; }
`;
const PreviewImage = styled.img`
  height: 64px; border-radius: 8px; object-fit: cover; margin-top: 1rem;
`;
const SubmitButton = styled.button`
  grid-column: span 2; background: linear-gradient(to right, #fff, #ccc); color: #000; font-weight: 600;
  padding: 0.7rem 2rem; font-size: 1rem; border-radius: 30px; border: none; cursor: pointer;
  transition: 0.3s ease; margin-top: 2rem; max-width: 240px; justify-self: center;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
  @media (max-width: 768px) { grid-column: span 1; width: 100%; }
`;

const Admin = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState({ name: '', price: '', category: '', subcategory: '', description: '', tags: '', images: null });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex(prev => (prev + 1) % banners.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') setProduct({ ...product, images: files });
    else setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return setToast({ show: true, message: '❌ Admin access required.', type: 'error' });

    const formData = new FormData();
    Object.entries(product).forEach(([key, val]) => {
      if (key === 'images' && val instanceof FileList) Array.from(val).forEach(file => formData.append('images', file));
      else formData.append(key, val);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/upload-product`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setToast({ show: true, message: '✅ Product uploaded successfully', type: 'success' });
      setProduct({ name: '', price: '', category: '', subcategory: '', description: '', tags: '', images: null });
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
          <CustomDropdown label="" options={categories} selected={product.category} onSelect={val => setProduct({ ...product, category: val, subcategory: '' })} />

          <Label>Subcategory</Label>
          <CustomDropdown label="" options={subcategoryMap[product.category] || []} selected={product.subcategory} onSelect={val => setProduct({ ...product, subcategory: val })} />

          <Label>Description</Label>
          <TextArea name="description" rows="3" value={product.description} onChange={handleChange} required />

          <Label>Tags</Label>
          <Input name="tags" value={product.tags} onChange={handleChange} />

          <Label>Upload Images</Label>
          <FileUploadWrapper>
            <FileLabel htmlFor="imageUpload">Choose Images</FileLabel>
            <FileInput id="imageUpload" name="images" type="file" multiple accept="image/*" onChange={handleChange} required />
            {product.images && Array.from(product.images).map((file, i) => (
              <PreviewImage key={i} src={URL.createObjectURL(file)} alt={`preview-${i}`} />
            ))}
          </FileUploadWrapper>

          <SubmitButton type="submit">Upload Product</SubmitButton>
        </Form>
      </FormSection>

      {toast.show && <CustomToast message={toast.message} type={toast.type} onClose={() => setToast({ show: false, message: '', type: '' })} />}
    </Container>
  );
};

export default Admin;