import React from "react";
import styled from "styled-components";
import CheckinForm from "../Components/CheckinForm";
import useAuth from "../config/services/useAuth.js";
import useCheckin from "../config/services//useCheckin";
import Mood from "../Components/Mood";
import { useHistory } from "react-router-dom";


const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.green};
`;

const DailyCheckin = (props) => {
  const history = useHistory();
  const { user } = useAuth();
  const { createCheckin } = useCheckin();
  const handleSubmit = async (checkin) => {
    const moodcheck = {
      ...checkin,
      ...{
        photo: user.photoURL,
        userId: user.uid,
        userName: user.displayName || user.email,
        time: new Date(),
      },
    };

    try {
      await createCheckin(moodcheck);
      history.push("/");
    } catch (e) {
      console.log(e);
      console.log(e);
    }
  };

  const date = new Date(); 

    const dateFormat = new Date(date);

    dateFormat.setMinutes(dateFormat.getMinutes() + dateFormat.getTimezoneOffset());
    const dateStr = dateFormat.toDateString();

  return (
    <div>
      <StyledHeading> Log your progress for { dateStr } </StyledHeading>
      <Mood></Mood>
      <CheckinForm onSubmit={handleSubmit} />
    </div>
  );
};

DailyCheckin.propTypes = {};

export default DailyCheckin;
