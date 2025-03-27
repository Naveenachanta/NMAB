import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Wrapper,
  ProgressBar,
  Content,
  HeaderRow,
  BackArrow,
  SkinColorOption,
  SkinTypeOption,
  SkinColorLabel,
  Title,
  FadeWrapper,
  Question,
  Options,
  Option,
  OptionWithImage,
  NextButton
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

  // ✅ Fetch preferences after login
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/preferences', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  const handleNext = async () => {
    setShowQuestion(false);

    if (questionIndex === totalSteps - 1) {
      try {
        await axios.post(
          'http://localhost:5001/api/preferences',
          {
            gender,
            skinType,
            skinColor,
            skinConcerns,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

        {questionIndex === 0 && (
          <FadeWrapper $show={showQuestion}>
            <Question>What is your gender?</Question>
            <Options>
              <Option
                onClick={() => setGender('male')}
                selected={gender === 'male'}
              >
                <img src="/images/male.png" alt="Male" />
                <span>Male</span>
              </Option>
              <Option
                onClick={() => setGender('female')}
                selected={gender === 'female'}
              >
                <img src="/images/female.png" alt="Female" />
                <span>Female</span>
              </Option>
            </Options>
            <NextButton disabled={!gender} onClick={handleNext}>
              Next
            </NextButton>
          </FadeWrapper>
        )}

        {questionIndex === 1 && (
          <FadeWrapper $show={showQuestion}>
            <Question>What's your skin type?</Question>
            <Options>
              <SkinTypeOption onClick={() => setSkinType('oily')} selected={skinType === 'oily'}>
                <strong>Oily</strong>
                <p>Shiny & breakout-prone.</p>
              </SkinTypeOption>
              <SkinTypeOption onClick={() => setSkinType('dry')} selected={skinType === 'dry'}>
                <strong>Dry</strong>
                <p>Tight & flaky.</p>
              </SkinTypeOption>
              <SkinTypeOption onClick={() => setSkinType('combination')} selected={skinType === 'combination'}>
                <strong>Combination</strong>
                <p>Oily & dry combo.</p>
              </SkinTypeOption>
              <SkinTypeOption onClick={() => setSkinType('normal')} selected={skinType === 'normal'}>
                <strong>Normal</strong>
                <p>Balanced & low-maintenance</p>
              </SkinTypeOption>
            </Options>
            <NextButton disabled={!skinType} onClick={handleNext}>
              Next
            </NextButton>
          </FadeWrapper>
        )}

        {questionIndex === 2 && (
          <FadeWrapper $show={showQuestion}>
            <Question>What is your skin color?</Question>
            <Options>
              {[
                { label: 'Fair', img: '/images/skin-fair.png' },
                { label: 'Medium', img: '/images/skin-medium.png' },
                { label: 'Olive', img: '/images/skin-olive.png' },
                { label: 'Deep', img: '/images/skin-deep.png' },
              ].map((option) => (
                <div key={option.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <SkinColorOption
                    bg={option.img}
                    selected={skinColor === option.label}
                    onClick={() => setSkinColor(option.label)}
                  />
                  <SkinColorLabel>{option.label}</SkinColorLabel>
                </div>
              ))}
            </Options>
            <NextButton disabled={!skinColor} onClick={handleNext}>
              Next
            </NextButton>
          </FadeWrapper>
        )}

{questionIndex === 3 && (
  <FadeWrapper $show={showQuestion}>
    <Question>What are your main skin concerns?</Question>
    <Options>
  {[
    { label: 'Acne', image: '/images/acne.png' },
    { label: 'Dark Spots', image: '/images/darkspots.png' },
    { label: 'Wrinkles', image: '/images/wrinkles.png' },
    { label: 'Dryness', image: '/images/dryness.png' },
    { label: 'Sensitivity', image: '/images/sensitivity.png' },
    { label: 'Redness', image: '/images/redness.png' },
  ].map((concern) => (
    <div key={concern.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <OptionWithImage
        selected={skinConcerns.includes(concern.label)}
        onClick={() => toggleConcern(concern.label)}
      >
        <img src={concern.image} alt={concern.label} />
      </OptionWithImage>
      <SkinColorLabel>{concern.label}</SkinColorLabel>
    </div>
  ))}
</Options>

    <NextButton disabled={skinConcerns.length === 0} onClick={handleNext}>
      Finish
    </NextButton>
  </FadeWrapper>
)}

      </Content>
    </Wrapper>
  );
};

export default Preferences;
