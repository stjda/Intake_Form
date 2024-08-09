import React from "react";
import { CampsSection } from "./sections/CampsSection/CampsSection";
import { Navigation } from "./sections/Navigation";
import { PhotoNumbers } from "./sections/PhotoNumbers";
import { TitleTextsButton } from "./sections/TitleTextButtons";
import styled from "styled-components";

const StyledHeroSection = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 48px;
  justify-content: flex-end;
  padding: 0px 10px;
  position: relative;
  width: 100%;

  & .play-button {
    align-items: flex-start;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 100%);
    border: 1px solid;
    border-color: transparent;
    border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1)) 1;
    border-radius: 50px;
    display: inline-flex;
    left: 1260px;
    padding: 24px;
    position: absolute;
    top: 686px;

    & .vector {
      height: 13.86px;
      position: relative;
      width: 12px;
    }
  }
`;

export const HeroSection = () => {
  return (
    <StyledHeroSection>
      <Navigation />
      <TitleTextsButton />
      <PhotoNumbers />
      <CampsSection />
    </StyledHeroSection>
  );
};