import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function FormValidationDemo(props) {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email("email is not valid")
            .required("you must enter a email"),
        name: yup
            .string()
            .required("password is required")
            .min(2, "name must be at least longer than two letters"),
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
        <div>
            <h1>Join Our Mailing List</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true })} />
                <p> {errors.name && errors.name?.message} </p>
                <input {...register("email", { required: true })} />
                <p>{errors.email && errors.email?.message}</p>
                <input type="submit" />
            </form>
        </div>
    );
}

FormValidationDemo.propTypes = {};

export default FormValidationDemo;
