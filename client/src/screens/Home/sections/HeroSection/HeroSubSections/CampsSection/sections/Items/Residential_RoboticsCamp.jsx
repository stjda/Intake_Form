import React from "react";
import { Card } from "../../../../../../../../components/Card";
import styled from "styled-components";
import { Button as MuiButton} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Items = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/registration');
  };

  return (
    <StyledItems className="items-wrapper" >
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
        photoClassName="photo residential-camp"
        property1="ver-1"
        text="A Summer Experience Where Every Child Thrives"
        text1="Our mission is focused on breaking down barriers to diabetes management education for children, empowering youth with knowledge is the key."
        text2="Residential Camp"
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
        photoClassName="photo robotics-camp"
        property1="ver-1"
        text="Empowering Youth through Education for All"
        text1="By equipping children and their families with essential skills and knowledge, we're not just managing diabetes—we're transforming lives."
        text2="Robotics Camp"
        textClassName="text-content"
      />

      
    </StyledItems>
  );
};

const StyledItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  width: 80%;

  .card {
    flex: 1 1 calc(50% - 10px);
    min-width: 300px;
    box-shadow: 0px 4px 4px #00000040 !important;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .photo {
    background-position: 50% 50% !important;
    background-size: cover !important;
    height: 60%;
    width: 100%;
  }

  .residential-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-4@2x.png) !important;
  }

  .robotics-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-5@2x.png) !important;
  }

  .text-content {
    background-color: #1479cc !important;
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

  @media (max-width: 1000px) {
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

  @media (max-width: 835px) {
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