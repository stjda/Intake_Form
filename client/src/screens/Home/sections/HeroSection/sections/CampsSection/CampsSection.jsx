import React from "react";
import { Items } from "./sections/Items";
import { ItemsWrapper } from "./sections/ItemsWrapper";
import { TitlePages } from "./sections/TitlePages";
import styled from "styled-components";

const StyledDonationSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: auto;
  width: 100%;
`;

export const CampsSection = () => {
  return (
    <StyledDonationSection>
      <TitlePages />
      <Items />
      <ItemsWrapper />
    </StyledDonationSection>
  );
};
