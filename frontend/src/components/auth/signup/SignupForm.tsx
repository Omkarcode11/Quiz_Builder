// SignupForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import classes from "./SignupForm.module.css";
import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): FormErrors => {
    let validationErrors: FormErrors = {};
    if (!formData.username) {
      validationErrors.username = "Invalid name";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid Email";
    }
    if (formData.password.length < 6) {
      validationErrors.password = "Weak password";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Password doesn't match";
    }
    return validationErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      let { token }: { token: string } = (
        await axios.post(BASE_URL + "/api/auth/register", formData)
      ).data;
      localStorage.setItem("quiz_builder", JSON.stringify(token));
      navigate('/dashboard')
      // Perform submission actions like sending data to a server
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.formGroup}>
        <label>Name</label>
        <input
          type="text"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? classes.inputError : ""}
        />
      </div>
      {errors.username && (
        <div className={classes.errorText}>{errors.username}</div>
      )}

      <div className={classes.formGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? classes.inputError : ""}
        />
      </div>
      {errors.email && <div className={classes.errorText}>{errors.email}</div>}

      <div className={classes.formGroup}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? classes.inputError : ""}
        />
      </div>
      {errors.password && (
        <div className={classes.errorText}>{errors.password}</div>
      )}

      <div className={classes.formGroup}>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? classes.inputError : ""}
        />
      </div>
      {errors.confirmPassword && (
        <div className={classes.errorText}>{errors.confirmPassword}</div>
      )}

      <button type="submit" className={classes.submitButton}>
        Sign-Up
      </button>
    </form>
  );
};

export default SignupForm;
