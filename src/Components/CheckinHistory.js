import React from "react";
import PropTypes from "prop-types";
import Histogram from "../Components/Histogram";
import ProgressBar from "../Components/ProgressBar";
import styled from "styled-components";

function CheckinHistory(props) {
  const { days, checkins } = props;

  const StyledCheckinHistoryHeading = styled.h2`
    text-align: center;
    padding-top: 20px;
    color: ${ props => props.theme.colors.green};
  `;

  const StyledRootDiv = styled.div`
    display: grid;
    grid-template-columns: 0.8fr;
    grid-template-rows: 55px 80px 20px auto;
    justify-content: center;
  `;

  const StyledGoalHeading = styled.h4`
    color: #1f2041;
  `;
  
  return (
    <div>
    <StyledRootDiv>
      <StyledCheckinHistoryHeading> {30} Days Mood Stats </StyledCheckinHistoryHeading>
      <StyledGoalHeading>
        <strong>20%</strong> Sad
        <ProgressBar percentage="20" />
        <strong>10%</strong> Angry
        <ProgressBar percentage="10" />
        <strong>30%</strong> Neutral
        <ProgressBar percentage="30" />
        <strong>45%</strong> Uplifted
        <ProgressBar percentage="45" />
        <strong>25%</strong> Happy
        <ProgressBar percentage="25" />
        <strong>25%</strong> Amazing
        <ProgressBar percentage="10" />
      </StyledGoalHeading>
      <Histogram barCount={30} bars={checkins.map(c => c.score * 5)} />
    </StyledRootDiv>
  </div>
  );
}

CheckinHistory.propTypes = {
  days: PropTypes.number,
  checkins: PropTypes.array.isRequired
};

CheckinHistory.defaultProps = {
  days: 0
};

export default CheckinHistory;
