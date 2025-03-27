import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { FiEdit,FiEdit2, FiUser, FiMapPin, FiHeart, FiShoppingCart, FiHelpCircle, FiBox } from 'react-icons/fi';

const Container = styled.div`
  max-width: 900px;
  margin: 4rem auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #111;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProfilePicWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #eee;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover::after {
    content: 'Change';
    position: absolute;
    background: rgba(0,0,0,0.6);
    color: #fff;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UsernameInput = styled.input`
  font-size: 1.4rem;
  font-weight: 500;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 0.5rem 0;
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: #d60480;
  }
`;
const Username = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  color: #222;
  letter-spacing: 1px;
`;

const EditIcon = styled(FiEdit2)`
  font-size: 1.2rem;
  color: #d60480;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #a20364;
  }
`;

const EditableInput = styled.input`
  font-size: 1.8rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  border: none;
  border-bottom: 2px solid #d60480;
  background: transparent;
  color: #222;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #aaa;
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  }

  svg {
    font-size: 1.8rem;
    color: #d60480;
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 0.85rem;
    color: #777;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Profile = () => {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    axios.get('https://api.swotandstudy.com/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.data) {
          setUsername(res.data.username || '');
          setProfilePic(res.data.profilePic || null);
        }
      })
      .catch(err => {
        console.error('Error loading profile:', err);
      });
  }, []);
  const saveProfile = (updatedFields) => {
    const token = localStorage.getItem('token');
  
    axios.post('https://api.swotandstudy.com/api/profile', updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('✅ Profile saved successfully');
    })
    .catch((err) => {
      console.error('❌ Failed to save profile:', err);
    });
  };
  const compressBase64 = (base64) => {
    const MAX_LENGTH = 500000; // ~500kb
    if (base64.length > MAX_LENGTH) {
      alert('Image is too large. Please upload a smaller image.');
      return null;
    }
    return base64;
  };
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('profilePic', file);
  
    try {
      const response = await axios.post(
        'https://api.swotandstudy.com/api/profile/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data && response.data.profilePic) {
        setProfilePic(response.data.profilePic);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };
  
  
   

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfilePic(base64); // preview
        saveProfile({ profilePic: base64 }); // send to backend
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  

  return (
    <Container>
      <Header>
        <label htmlFor="fileInput">
          <ProfilePicWrapper>
            {profilePic ? (
              <img src={profilePic} alt="Profile" />
            ) : (
              <img src="/images/default-profile.jpg" alt="Default" />
            )}
          </ProfilePicWrapper>
        </label>
        <HiddenFileInput type="file" id="fileInput" accept="image/*" onChange={handleFileChange} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  {isEditing ? (
    <EditableInput
      type="text"
      value={username}
      autoFocus
      onChange={(e) => setUsername(e.target.value)}
      onBlur={() => {
        setIsEditing(false);
        saveProfile({ username });
      }}
      
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setIsEditing(false);
          saveProfile({ username });
        }
      }}
      
    />
  ) : (
    <>
      <Username>{username}</Username>
      <EditIcon onClick={() => setIsEditing(true)} />
    </>
  )}
</div>


      </Header>

      <SectionGrid>
        <Card>
          <FiUser />
          <h4>Profile Settings</h4>
          <p>Manage your name, email & password</p>
        </Card>
        <Card>
          <FiMapPin />
          <h4>Shipping Address</h4>
          <p>Edit or add delivery addresses</p>
        </Card>
        <Card>
          <FiShoppingCart />
          <h4>Your Cart</h4>
          <p>View items ready for checkout</p>
        </Card>
        <Card>
          <FiHeart />
          <h4>Wishlist</h4>
          <p>Your favorite saved products</p>
        </Card>
        <Card>
          <FiBox />
          <h4>Subscription</h4>
          <p>Manage your plan & billing</p>
        </Card>
        <Card>
          <FiHelpCircle />
          <h4>Help & Support</h4>
          <p>Contact us or browse FAQs</p>
        </Card>
      </SectionGrid>
    </Container>
  );
};

export default Profile;
