import React from "react";
import JoyRide from "react-joyride";
import { connect } from 'react-redux';
import { onboarding } from "../../../state/actions/user";
const TOUR_STEPS = [
    {
        target: ".stop1",
        content: "👋🏼 Welcome to the ConvoCode IDE. Here you can explore prompting AI with task to complete in HTML, CSS, and JavaScript. 🎙 We are here to help you engage with AI and other developers. Let's show you around to navigate our platform.",
        placement: "center"
    },
       {
        target: ".stop2",
        content:"🗣 Prompt our Open AI with anything you may wish to create, but keep in mind you are being language specific with each prompt."
       },
       {
        target:".stop3",
        content: "💻 Once submitted, the AI generated code will populate the appropriate editor and compile in the output box below. "
       },
       {
        target:".stop4",
        content:"🌐 Ready to share with other developers or save to your projects? Press the Post button and fill out the necessary information",
       }

];

const Tour = (props) => {

  // Call back function to stop onboarding
  const  printCallback = (prop) => {
    console.log(prop)
    if (prop.index == 3){ 
      props.onboarding()
    }
    if (prop.action == "skip"){
      props.onboarding()
    }
    if (prop.action == "close"){
      props.onboarding()
    }
  }
  return (
    <>
      <JoyRide
        steps={TOUR_STEPS}
        run={props.onboarded}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        disableBeacon={true}
        callback={printCallback}
        styles={{
          tooltipContainer: {
              textAlign: "left",
              margin: "10px",
              padding: "25px"
         
            },
          buttonNext: {
              backgroundColor: "gold",

            },
          buttonBack: {
              marginRight: 10,
              backgroundColor: "white",
              textColor: "black"
            }
        }}
      />
    </>
  );
};

const mapStateToProps = (reduxstate) => {
  return {
    onboarded: reduxstate.user.onboarded
  };
};

export default  connect(mapStateToProps, { onboarding })(Tour);

