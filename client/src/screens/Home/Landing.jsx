import React from "react";
import { AboutUsSection } from "./sections/AboutUsSection";
import { CtaFooterSection } from "./sections/CtaFooterSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import styled from "styled-components";
import { CampRegistrationAccordion } from './sections/HeroSection/sections/SignUpForm'

const StyledLandingPage = styled.div`
  align-items: flex-start;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: flex-end;
  padding: 24px 0px 0px;
  position: relative;
`;

export const LandingPage = () => {
  return (
    <>
    <StyledLandingPage>
      <HeroSection />
      <AboutUsSection />
      {/* <CampRegistrationAccordion /> */}
      <CtaFooterSection />
   </StyledLandingPage>
    </>
  );
};


