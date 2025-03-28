import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Wrapper, ProgressBar, Content, HeaderRow, BackArrow,
  SkinColorOption, SkinTypeOption, SkinColorLabel,
  Title, FadeWrapper, Question, Options, Option,
  OptionWithImage, NextButton
} from './Preferences.styles';

const Preferences = () => {
  const [gender, setGender] = useState('');
  const [skinType, setSkinType] = useState('');
  const [skinColor, setSkinColor] = useState('');
  const [skinConcerns, setSkinConcerns] = useState([]);

  const token = localStorage.getItem('token');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const totalSteps = 4;
  const navigate = useNavigate();
  const progress = ((questionIndex + 1) / totalSteps) * 100;

  // ✅ Fetch existing preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + '/api/preferences',
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        const data = res.data;
        if (data) {
          setGender(data.gender || '');
          setSkinType(data.skinType || '');
          setSkinColor(data.skinColor || '');
          setSkinConcerns(data.skinConcerns || []);
        }
      } catch (err) {
        console.log('No existing preferences or error:', err.message);
      }
    };
    fetchPreferences();
  }, [token]);

  // ✅ Save preferences and go to dashboard
  const handleNext = async () => {
    setShowQuestion(false);
    const token = localStorage.getItem('token');
    console.log("✅ JWT Token being sent:", token);
    if (questionIndex === totalSteps - 1) {
      try {
        
        await axios.post(
          process.env.REACT_APP_API_URL + '/api/preferences',
          {
            gender,
            skinType,
            skinColor,
            skinConcerns,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log('✅ Preferences saved!');
        navigate('/dashboard');
      } catch (error) {
        console.error('❌ Error saving preferences:', error);
        navigate('/dashboard');
      }
    }

    setTimeout(() => {
      setQuestionIndex((prev) => prev + 1);
      setShowQuestion(true);
    }, 500);
  };

  const handleBack = () => {
    setShowQuestion(false);
    setTimeout(() => {
      setQuestionIndex((prev) => prev - 1);
      setShowQuestion(true);
    }, 300);
  };

  const toggleConcern = (concern) => {
    setSkinConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((item) => item !== concern)
        : [...prev, concern]
    );
  };

  return (
    <Wrapper>
      <ProgressBar progress={progress} />
      <Content>
        <HeaderRow>
          {questionIndex > 0 && <BackArrow onClick={handleBack}>&lt;</BackArrow>}
          <Title>Tell us about yourself</Title>
        </HeaderRow>

        {/* Step 1: Gender */}
        {questionIndex === 0 && (
          <FadeWrapper $show={showQuestion}>
            <Question>What is your gender?</Question>
            <Options>
              <Option onClick={() => setGender('male')} selected={gender === 'male'}>
                <img src="/images/male.png" alt="Male" />
                <span>Male</span>
              </Option>
              <Option onClick={() => setGender('female')} selected={gender === 'female'}>
                <img src="/images/female.png" alt="Female" />
                <span>Female</span>
              </Option>
            </Options>
            <NextButton disabled={!gender} onClick={handleNext}>Next</NextButton>
          </FadeWrapper>
        )}

        {/* Step 2: Skin Type */}
        {questionIndex === 1 && (
          <FadeWrapper $show={showQuestion}>
            <Question>What's your skin type?</Question>
            <Options>
              {['oily', 'dry', 'combination', 'normal'].map((type) => (
                <SkinTypeOption key={type} onClick={() => setSkinType(type)} selected={skinType === type}>
                  <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                </SkinTypeOption>
              ))}
            </Options>
            <NextButton disabled={!skinType} onClick={handleNext}>Next</NextButton>
          </FadeWrapper>
        )}

        {/* Step 3: Skin Color */}
        {questionIndex === 2 && (
          <FadeWrapper $show={showQuestion}>
            <Question>What is your skin color?</Question>
            <Options>
              {['Fair', 'Medium', 'Olive', 'Deep'].map((label) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <SkinColorOption
                    bg={`/images/skin-${label.toLowerCase()}.png`}
                    selected={skinColor === label}
                    onClick={() => setSkinColor(label)}
                  />
                  <SkinColorLabel>{label}</SkinColorLabel>
                </div>
              ))}
            </Options>
            <NextButton disabled={!skinColor} onClick={handleNext}>Next</NextButton>
          </FadeWrapper>
        )}

        {/* Step 4: Skin Concerns */}
        {questionIndex === 3 && (
          <FadeWrapper $show={showQuestion}>
            <Question>What are your main skin concerns?</Question>
            <Options>
              {['Acne', 'Dark Spots', 'Wrinkles', 'Dryness', 'Sensitivity', 'Redness'].map((concern) => (
                <div key={concern} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <OptionWithImage
                    selected={skinConcerns.includes(concern)}
                    onClick={() => toggleConcern(concern)}
                  >
                    <img src={`/images/${concern.toLowerCase().replace(' ', '')}.png`} alt={concern} />
                  </OptionWithImage>
                  <SkinColorLabel>{concern}</SkinColorLabel>
                </div>
              ))}
            </Options>
            <NextButton disabled={skinConcerns.length === 0} onClick={handleNext}>Finish</NextButton>
          </FadeWrapper>
        )}
      </Content>
    </Wrapper>
  );
};

export default Preferences;
