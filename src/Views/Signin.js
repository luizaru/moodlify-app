import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import SigninForm from "../Components/SigninForm";
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


const Signin = (props) => {
    const { signInEmailUser, signInFacebookUser, signInGoogleUser } = useAuth();
    const [severErrorMessage, setServerErrorMessage] = useState("");

    const handleEmailSubmit = async (data) => {
        console.log("Signin.handleEmailSubmit(): data = ", data);

        try {
            const { email, password } = data;
            await signInEmailUser(email, password);
        } catch (e) {
            setServerErrorMessage(e.message);
            console.log(e);
        }
    };

    const handleSocialMediaSubmit = async (authenticationMethod) => {
        console.log("Login.handleSocialMediaSubmit() authenticationMethod=", authenticationMethod);

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
        
            <StyledHeading1> Sign In With Social Account </StyledHeading1>
            <SocialMediaForm onSocialSubmit={handleSocialMediaSubmit} />
            <StyledHeading1> OR </StyledHeading1>
            <SigninForm
                onEmailSubmit={handleEmailSubmit}
                serverErrorMessage={severErrorMessage}
            />
            <StyledParagraph>
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </StyledParagraph>
        </div>
    );
};

Signin.propTypes = {};

export default Signin;