import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faBlackboard } from "@fortawesome/free-solid-svg-icons";

const styles = {};
const MOOD = [
  { id: 1, name: "Sad", mood: "sad", msg: "I am sad" },
  { id: 2, name: "Angry", mood: "angry", msg: "I am angry" },
  { id: 3, name: "Neutral", mood: "neutral", msg: "I am neutral" },
  { id: 4, name: "Uplifted", mood: "uplifted", msg: "I am uplifted" },
  { id: 5, name: "Happy", mood: "happy", msg: "I am happy" },
  { id: 6, name: "Amazing", mood: "amazing", msg: "I feel amazing" }
];

export default class Mood extends React.Component {
  constructor(props) {
  super(props);
  this.state = {mood: ""};
  }

  getUserClick = data => {
   this.setState({selectedMood: data},
      () => {
      alert(data);}
    );
  };


render() {
  const { selectedMood } = this.state;

  return (
    <div style={styles.container}>
      <div style={{ textTransform: "capitalize", textAlign: "center", marginTop: "10px", fontWeight: "bold"}}>
          Mood:{" "}
          {selectedMood === undefined || selectedMood === ""
            ? "Not selected"
            : selectedMood}
        </div>
        <div style={{ marginTop: "20px", textAlign: "center", marginTop: "10px", paddingTop: "10px", paddingBottom: "10px"} }>
          {MOOD && MOOD.length
            ? MOOD.map(mood => (
                <button
                  style={ 
                    mood.mood === selectedMood
                      ? { marginRight: "10px", border: "1px solid red"}
                      : { marginRight: "30px" }
                      
                  }
                  onClick={
                    selectedMood === mood.mood
                      ? () => alert("This is the current selected mood")
                      : () => this.getUserClick(mood.mood)
                  }
                >
                  {mood.name}
                </button>
              ))
            : null}
        </div>
      </div>
    );
  }
}

