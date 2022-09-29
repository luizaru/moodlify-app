import React from "react";
import styled from "styled-components";
import { SocialIcon } from 'react-social-icons';
import PropTypes from "prop-types";


const StyledSocialDiv = styled.div`
    text-align: center;
    padding-top: 10px; 
    paddinf-left: 200px;
    color: ${props => props.theme.colors.green};
`;

const SocialMediaForm = (props) => {
    const { onSocialSubmit } = props;


    return (
        <div>
            <form>
                <StyledSocialDiv>
                    <SocialIcon network="twitter" onClick={ () => onSocialSubmit("twitter")  } />
                    <SocialIcon network="facebook" onClick={ () => onSocialSubmit("facebook") } />
                    <SocialIcon network="google" onClick={() => onSocialSubmit("google") } />
                    <SocialIcon network="instagram" onClick={ () => onSocialSubmit("instagram") } />
                </StyledSocialDiv>
            </form>
        </div>
    );
};

SocialMediaForm.propTypes = {
    onSocialSubmit: PropTypes.func.isRequired
};

export default SocialMediaForm;