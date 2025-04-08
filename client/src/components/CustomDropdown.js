// components/CustomDropdown.js
import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Toggle = styled.div`
  background: #000;
  border: 1px solid #444;
  color: #aaa;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: #000;
  border: 1px solid #333;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  animation: ${fadeIn} 0.15s ease;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  padding: 0.7rem 1rem;
  color: #aaa;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    color: #fff;
    background: #111;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  color: #ccc;
  font-size: 0.95rem;
`;

const CustomDropdown = ({ label, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={ref}>
      {label && <Label>{label}</Label>}
      <Toggle onClick={() => setOpen(!open)}>
        {selected || `Select ${label}`}
      </Toggle>
      {open && (
        <DropdownList>
          {options.map((opt, i) => (
            <DropdownItem
              key={i}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              {opt}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Wrapper>
  );
};

export default CustomDropdown;
