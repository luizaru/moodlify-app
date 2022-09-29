import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import SignupForm from "../Components/SignupForm";
import SocialMediaForm from "../Components/SocialMediaForm";
import useAuth from "../config/services/useAuth";


const StyledParagraph = styled.p`
    text-align: center;
    padding-top: 5px;
    color: ${props => props.theme.colors.green};
`;

const StyledHeading1 = styled.h1`
    text-align: center;
    padding-top: 40px;
    color: ${props => props.theme.colors.green};
`;


const Signup = (props) => {
    const { createEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();
    const [severErrorMessage, setServerErrorMessage] = useState("");

    const handleEmailSubmit = async (data) => {
        console.log("Signin.handleEmailSubmit(): data = ", data);

        try {
            const { email, password } = data;
            await createEmailUser(email, password);
        } catch (e) {
            setServerErrorMessage(e.message);
            console.log(e);
        }
    };


    const handleSocialMediaSubmit = async (authenticationMethod) => {
        console.log("Signin.handleSocialMediaSubmit() authenticationMethod=", authenticationMethod);

        try {
            if (authenticationMethod === "facebook") {
                await signInFacebookUser();
            } else if (authenticationMethod === "google") {
                await signInGoogleUser();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <StyledHeading1> Sign Up With Social Account </StyledHeading1>
            <SocialMediaForm onSocialSubmit = { handleSocialMediaSubmit } />
            <StyledHeading1> OR </StyledHeading1>
            <SignupForm
                onEmailSubmit = { handleEmailSubmit }
                serverErrorMessage={severErrorMessage}
            />
            <StyledParagraph>
                <Link to="/signin">Already a member? Sign In</Link>
            </StyledParagraph>
        </div>
    );
};

Signup.propTypes = {};

export default Signup;