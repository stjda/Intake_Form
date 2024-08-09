import React from "react";
import { Card } from "../../../../../../../../components/Card";
import styled from "styled-components";
import { Button as MuiButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ItemsWrapper = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <StyledItemsWrapper className="items-wrapper">
      <Card
        buttonComponent={
          <MuiButton 
            className='button' 
            variant="contained" 
            color="primary"
            onClick={handleNavigate}
          >
            Learn More
          </MuiButton>
        }
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo science-camp"
        property1="ver-1"
        text="Empowerment Through Education at Camp"
        text1="Through interactive, supportive, and fun learning experiences, we help each camper to understand their condition, and achieve their goals."
        text2="Science Camp"
        textClassName="text-content"
      />
      <Card
        buttonComponent={
          <MuiButton 
            className='button' 
            variant="contained" 
            color="primary"
            onClick={handleNavigate}
          >
            Learn More
          </MuiButton>
        }
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo nature-camp"
        property1="ver-1"
        text="Be Part of Something Bigger"
        text1="We ensure that no child is left behind because of Join us in this crucial mission—because every child deserves the right to a healthy future."
        text2="Nature Camp"
        textClassName="text-content"
      />
    </StyledItemsWrapper>
  );
};

const StyledItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  width: 80%;

  .card {
    flex: 1 1 calc(50% - 10px);
    min-width: 300px;
    box-shadow: 0px 4px 4px #00000040;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .photo {
    background-position: 50% 50%;
    background-size: cover;
    height: 60%;
    width: 100%;
  }

  .science-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-6@2x.png);
  }

  .nature-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-7@2x.png);
  }

  .text-content {
    background-color: #1479cc;
    color: white;
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-width: fit-content
  }

  .button {
    background-color: var(--blue);
    padding: 8px 24px;
    margin-top: auto;
    align-self: flex-start;
    margin-left: 10px
  }

  @media (max-width:1000px) {
    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .text-content {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(-10%, 1330%);
      max-width: 80%;
      text-align: center;
      background-color: rgba(20, 121, 204, 0.9);
      padding: 10px;
      border-radius: 5px;
    }
  }

  @media (max-width:835px) {
    .text-content {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(120%, 1330%);
      max-width: 80%;
      text-align: center;
      background-color: rgba(20, 121, 204, 0.9);
      padding: 10px;
      border-radius: 5px;
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;
    .text-content {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translate(12%, 410%);
      max-width: 80%;
      text-align: center;
      background-color: rgba(20, 121, 204, 0.9);
      padding: 10px;
      border-radius: 5px;
    }
    .card {
      flex: 1 1 100%;
    }
  }
`;