import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledParagraph = styled.p`
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
    color: ${props => props.theme.colors.green};   
`;

const StyledParagraphOptions = styled.p`
    text-align: center;
`;

const StyledParagraphFormValidationErrors = styled.p`
    text-align: center;
    color: red;
`;

const CheckinForm = (props) => {

    const [totalScore, setTotalScore] = useState(0);

    const schema = yup.object().shape({
        positive: yup
            .string()
            .required("you must check-in the mood info")
            .nullable(),
        happy: yup
            .string()
            .required("you must check-in the mood info")
            .nullable(),
        neutral: yup
            .string()
            .required("you must check-in the mood info")
            .nullable(),
        anxious: yup
            .string()
            .required("you must check-in the mood info")
            .nullable(),
        angry: yup
            .string()
            .required("you must check-in the mood info")
            .nullable(),
        sad: yup
            .string()
            .required("you must check-in the mood info")
            .nullable(),
        lonely: yup
            .string()
            .required("you must check-in the mood info")
            .nullable(),
    });
   

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log(data);
    };

    const formInputValues = watch(); 

    const checkinMinScores = {
        positive: 0,
        happy: 0,
        neutral: 0,
        anxious: 0,
        angry: 0,
        sad: 0,
        lonely: 0
    };

    const checkinMaxScores = {
        positive: 10,
        happy: 8,
        neutral: 6,
        anxious: 4,
        angry: 2,
        sad: 1,
        lonely: 1
    };



    const checkinScores = {
        positive: checkinMinScores.positive,
        happy: checkinMinScores.happy,
        neutral: checkinMinScores.neutral,
        anxious: checkinMinScores.anxious,
        angry: checkinMinScores.angry,
        sad: checkinMinScores.sad,
        lonely: checkinMinScores.lonely
    };

    useEffect(() => {
      
        checkinScores.positive = !formInputValues.positive ? 0 : parseInt(formInputValues.positive);
        checkinScores.happy = !formInputValues.happy ? 0 : parseInt(formInputValues.happy);
        checkinScores.neutral = !formInputValues.neutral ? 0 : parseInt(formInputValues.neutral);
        checkinScores.anxious = !formInputValues.anxious ? 0 : parseInt(formInputValues.anxious);
        checkinScores.angry = !formInputValues.angry ? 0 : parseInt(formInputValues.angry);
        checkinScores.sad = !formInputValues.sad ? 0 : parseInt(formInputValues.sad);
        checkinScores.lonely = !formInputValues.lonely ? 0 : parseInt(formInputValues.lonely);
    

        console.log('checkinScores = ', checkinScores);
        setTotalScore(checkinScores.positive + checkinScores.happy + checkinScores.neutral + checkinScores.anxious + checkinScores.angry + checkinScores.sad + checkinScores.lonely);
    });


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <StyledParagraph> Did you feel positive today? ({ checkinMaxScores.positive })? </StyledParagraph> 
            <StyledParagraphOptions>
                <input {...register("positive", { required: true })} type="radio" value={checkinMaxScores.positive} name="positive" /> Yes
                <input {...register("positive", { required: true })} type="radio" value={checkinMinScores.positive} name="positive" /> No
            </StyledParagraphOptions>
            <StyledParagraphFormValidationErrors>{errors.positive && errors.positive.message}</StyledParagraphFormValidationErrors>

            <br></br>

            <StyledParagraph> Did you feel happy today? ({ checkinMaxScores.happy })? </StyledParagraph>
            <StyledParagraphOptions>
                <input {...register("happy", { required: true })} type="radio" value={ checkinMaxScores.happy } name="happy" /> Yes
                <input {...register("happy", { required: true })} type="radio" value={ checkinMinScores.happy } name="happy" /> No
            </StyledParagraphOptions>
            <StyledParagraphFormValidationErrors>{errors.happy && errors.happy?.message}</StyledParagraphFormValidationErrors>

            <br></br>

            <StyledParagraph> Did you feel neutral today? ({ checkinMaxScores.anxious })? </StyledParagraph>
            <StyledParagraphOptions>
                <input {...register("neutral", { required: true })} type="radio" value={checkinMaxScores.neutral} name="neutral" /> Yes
                <input {...register("neutral", { required: true })} type="radio" value={checkinMinScores.neutral} name="neutral" /> No
            </StyledParagraphOptions>
            <StyledParagraphFormValidationErrors>{errors.neutral && errors.neutral.message}</StyledParagraphFormValidationErrors>

            <br></br>
           
            <StyledParagraph> Did you feel anxious today? ({ checkinMaxScores.anxious })? </StyledParagraph>
            <StyledParagraphOptions>
                <input {...register("anxious", { required: true })} type="radio" value={checkinMaxScores.anxious} name="anxious" /> Yes
                <input {...register("anxious", { required: true })} type="radio" value={checkinMinScores.anxious} name="anxious" /> No
            </StyledParagraphOptions>
            <StyledParagraphFormValidationErrors>{errors.anxious && errors.anxious?.message}</StyledParagraphFormValidationErrors>

            <br></br>

            <StyledParagraph> Did you feel angry today? ({ checkinMaxScores.angry })? </StyledParagraph>
            <StyledParagraphOptions>
                <input {...register("angry", { required: true })} type="radio" value={checkinMaxScores.angry} name="angry" /> Yes
                <input {...register("angry", { required: true })} type="radio" value={checkinMinScores.angry} name="angry" /> No
            </StyledParagraphOptions>
            <StyledParagraphFormValidationErrors>{errors.angry && errors.angry?.message}</StyledParagraphFormValidationErrors>

            <br></br>

            <StyledParagraph> Did you feel sad today? ({ checkinMaxScores.sad })? </StyledParagraph>
            <StyledParagraphOptions>
                <input {...register("sad", { required: true })} type="radio" value={checkinMaxScores.sad} name="sad" /> Yes
                <input {...register("sad", { required: true })} type="radio" value={checkinMinScores.sad} name="sad" /> No
            </StyledParagraphOptions>
            <StyledParagraphFormValidationErrors>{errors.sad && errors.sad?.message}</StyledParagraphFormValidationErrors>

            <br></br>

            <StyledParagraph> Did you feel lonely today? ({ checkinMaxScores.lonely  })? </StyledParagraph>
            <StyledParagraphOptions>
                <input {...register("lonely", { required: true })} type="radio" value={checkinMaxScores.lonely} name="lonely" /> Yes
                <input {...register("lonely", { required: true })} type="radio" value={checkinMinScores.lonely} name="lonely" /> No
            </StyledParagraphOptions>
            <StyledParagraphFormValidationErrors>{errors.lonely && errors.lonely?.message}</StyledParagraphFormValidationErrors>

            <br></br>

            <StyledParagraph> Note </StyledParagraph>
            <StyledParagraphOptions>
                <textarea rows="10" cols="90"> </textarea>
            </StyledParagraphOptions>

            <br></br>

            <StyledParagraph> Total: { totalScore } points </StyledParagraph>
            
            <br></br>

            <StyledParagraph>
                <input type="submit" value="Check-In"></input>
            </StyledParagraph>
        </form>
    );
};

CheckinForm.propTypes = {};

export default CheckinForm;