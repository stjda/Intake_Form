import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  align-items: center;
  background-color: var(--white);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  height: 658px;
  justify-content: space-between;
  padding: 16px;
  position: relative;
  width: 400px;

  & .photo {
    // background-color: #d9d9d9;
    border-radius: 25px;
    flex: 0 0 auto;
    position: relative;
  }

  & .contents {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 20px;
    position: relative;
  }

  & .text {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  & .accessible-education {
    color: var(--black);
    font-family: var(--heading-3-font-family);
    font-size: var(--heading-3-font-size);
    font-style: var(--heading-3-font-style);
    font-weight: var(--heading-3-font-weight);
    height: 72px;
    letter-spacing: var(--heading-3-letter-spacing);
    line-height: var(--heading-3-line-height);
    margin-top: -1px;
    position: relative;
    width: 368px;
  }

  & .our-project-aims-to {
    color: var(--black);
    font-family: var(--heading-6-font-family);
    font-size: var(--heading-6-font-size);
    font-style: var(--heading-6-font-style);
    font-weight: var(--heading-6-font-weight);
    height: 72px;
    letter-spacing: var(--heading-6-letter-spacing);
    line-height: var(--heading-6-line-height);
    opacity: 0.5;
    position: relative;
    width: 368px;
  }

  & .progress-bar-amount {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 16px;
    position: relative;
  }

  // & .progress-bar {
  //   background-position: 50% 50%;
  //   background-size: cover;
  //   border-radius: 50px;
  //   height: 8px;
  //   position: relative;
  //   width: 368px;
  // }

  // & .amount-reached {
  //   align-items: flex-end;
  //   align-self: stretch;
  //   display: flex;
  //   flex: 0 0 auto;
  //   justify-content: space-between;
  //   position: relative;
  //   width: 100%;
  // }

  & .div {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    position: relative;
  }

  & .text-wrapper {
    color: var(--black);
    font-family: var(--heading-6-font-family);
    font-size: var(--heading-6-font-size);
    font-style: var(--heading-6-font-style);
    font-weight: var(--heading-6-font-weight);
    letter-spacing: var(--heading-6-letter-spacing);
    line-height: var(--heading-6-line-height);
    margin-top: -1px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }

  & .text-wrapper-2 {
    color: var(--black);
    font-family: var(--heading-4-font-family);
    font-size: var(--heading-4-font-size);
    font-style: var(--heading-4-font-style);
    font-weight: var(--heading-4-font-weight);
    letter-spacing: var(--heading-4-letter-spacing);
    line-height: var(--heading-4-line-height);
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }

  & .button-instance {
    flex: 0 0 auto !important;
  }

  & .badge-save-button {
    align-items: flex-start;
    display: flex;
    height: 40px;
    justify-content: space-between;
    left: 32px;
    position: absolute;
    top: 32px;
    width: 336px;

  }

  & .education-wrapper {
    align-items: center;
    border-color: transparent;
    border-radius: 50px;
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    padding: 8px 24px;
    position: relative;
    transition: background 0.3s ease, transform 0.3s ease; 
  }

  & .education-wrapper:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  & .education {
    color: var(--white);
    font-family: var(--heading-5-font-family);
    font-size: var(--heading-5-font-size);
    font-style: var(--heading-5-font-style);
    font-weight: var(--heading-5-font-weight);
    letter-spacing: var(--heading-5-letter-spacing);
    line-height: var(--heading-5-line-height);
    margin-top: -1px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
    transition: color 0.3s ease;
  }

  & .education:hover {
    color: var(--black);
  }

  & .save-button {
    flex: 0 0 auto;
    position: relative;
  }

  &.ver-1 {
    box-shadow: var(--drop-shadow);
  }

  &.ver-2 {
    border: 1px solid;
    border-color: var(--black-10);
  }
`;

export const Card = ({
  property1,
  className,
  photoClassName,
  text,
  text1 = "Our project aims to provide worldwide access to educational resources, helping break the cycle of poverty especially in vulnerable communities.",
  hasProgressBar = false,
  hasAmountReached = false,
  buttonComponent,
  textClassName,
  text2,
}) => {
  return (
    <StyledCard className={`card ${property1} ${className}`}>
      <div className={`photo ${photoClassName}`} />
      <div className="contents">
        <div className="text">
          <p className="accessible-education">{text}</p>
          <p className="our-project-aims-to">{text1}</p>
        </div>
        <div className="progress-bar-amount">
          {hasProgressBar && <div className="progress-bar" />}

          <div className="amount-reached">
            {hasAmountReached && (
              <div className="div">
                <div className="text-wrapper">Reached</div>
                <div className="text-wrapper-2">$32,000</div>
              </div>
            )}

            {buttonComponent}
          </div>
        </div>
      </div>
      <div className="badge-save-button">
        <div className={`education-wrapper ${textClassName}`}>
          <div className="education">{text2}</div>
        </div>
        <img className="save-button" src={property1 === "ver-2" ? img : null} />
      </div>
    </StyledCard>
  );
};

Card.propTypes = {
  property1: PropTypes.oneOf(["ver-2", "ver-1"]),
  text: PropTypes.string,
  text1: PropTypes.string,
  hasProgressBar: PropTypes.bool,
  hasAmountReached: PropTypes.bool,
  buttonText: PropTypes.string,
  text2: PropTypes.string,
  saveButton: PropTypes.string,
  img: PropTypes.string,
};
