import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckinHistory from "../Components/CheckinHistory";
//import Note from "../Components/Note";
import useAuth from "../config/services/useAuth";
import useCheckin from "../config/services/useCheckin";
import { serverTimestamp } from "firebase/firestore";

function Dash(props) {
  const { user } = useAuth();
  const [checkins, setCheckins] = useState([]);
  const { createCheckinComment, getCheckins } = useCheckin();

  const getCheckinData = async () => {
    const checkinsSnap = await getCheckins();
    let checkins = [];
    if (checkinsSnap.size) {
      checkinsSnap.forEach((doc) => {
        checkins.push({ ...doc.data(), ...{ id: doc.id } });
      });
      setCheckins(checkins.reverse());
    }
  };

  useEffect(() => {
    getCheckinData();
  }, []);

  return (
    <div>
      <CheckinHistory days={15} checkins={checkins}>
        {" "}
      </CheckinHistory>
  
    </div>
  );
}

Dash.propTypes = {
  checkins: PropTypes.array.isRequired,
};

export default Dash;
