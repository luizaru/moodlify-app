import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";

const StyledParagraph = styled.p`
    text-align: center;
    justify-content: center;
    color: ${props => props.theme.colors.green};
   
`;

const StyledParagraphFormValidationErrors = styled.p`
    text-align: center;
    color: red;
`;

const SigninForm = (props) => {
    const { onEmailSubmit, serverErrorMessage } = props;

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("email is not valid")
            .required("you must enter an email"),
        password: yup
            .string()
            .required("password is required")
            .min(2, "password must be at least longer than two letters"),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
       console.log(data);
    };


    return (
        <form onSubmit={handleSubmit(onEmailSubmit) }>
            <StyledParagraph>
                <label>Email </label>
                <input {...register("email", { required: true })}></input>
            </StyledParagraph>
            <StyledParagraphFormValidationErrors>{errors.email && errors.email?.message}</StyledParagraphFormValidationErrors>

            <br></br>

            <StyledParagraph>
                <label>Password </label>
                <input {...register("password", { required: true })}></input>
            </StyledParagraph>
            <StyledParagraphFormValidationErrors> {errors.password && errors.password?.message} </StyledParagraphFormValidationErrors>

            <br></br>
            
            <StyledParagraph>
            <input type="button" value="Login"></input>
            </StyledParagraph>
        </form>
    );
};

SigninForm.propTypes = {
    onEmailSubmit: PropTypes.func.isRequired,
    serverErrorMessage: PropTypes.string.isRequired
};

export default SigninForm;