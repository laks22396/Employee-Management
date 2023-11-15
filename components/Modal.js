import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
  addEmployee,
  setModalOpen,
  setSelectedEmployee,
  updateEmployee,
} from "@/store";

export function Modal() {
  const { register, handleSubmit, errors, reset, setValue } = useForm();

  const state = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  const closeModal = () => {
    reset();
    dispatch(setModalOpen(false));
    dispatch(setSelectedEmployee(undefined));
  };

  const validateName = (value) => {
    if (!value) {
      return "Name is required!";
    }

    // Truncate the name if its length is more than 25 characters
    const truncatedName = value.length > 25 ? `${value.slice(0, 25)}...` : value;

    return truncatedName;
  };

  const validateAge = (value) => {
    const age = parseInt(value, 10);
    if (isNaN(age) || age < 18) {
      return "Age must be 18 or older.";
    }
    return true; // Validation passed
  };

  const validatePositiveInteger = (value) => {
    const integerValue = parseInt(value, 10);
    if (isNaN(integerValue) || integerValue <= 0 || value.includes('.') || value.includes('-')) {
      return 'Please enter a positive integer for the salary with no decimal digits.';
    }
    return true; // Validation passed
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValue('uploadFile', file);
  };

  const onSubmitHandler = (data) => {
    if (data) {
      closeModal();
    }
    if (state.selectedEmployee) {
      dispatch(
        updateEmployee({
          _id: state.selectedEmployee._id,
          ...data,
        })
      );
    } else {
      dispatch(addEmployee(data));
    }
  };

  useEffect(() => {
    if (state.selectedEmployee) {
      setValue("name", state.selectedEmployee.name);
      setValue("age", state.selectedEmployee.age);
      setValue("salary", state.selectedEmployee.salary);
    }
  }, [state.selectedEmployee, setValue]);

  return state.isModalOpen
    ? ReactDOM.createPortal(
        <div className="modal">
          <div className="modal__content">
            <header className="header modal__header">
              <h1 className="header__h2">
                {state.selectedEmployee ? (
                  <>
                    Edit <span>Employee</span>
                  </>
                ) : (
                  <>
                    Add <span>Employee</span>
                  </>
                )}
              </h1>
              <button
                className="btn btn__compact btn__close"
                onClick={closeModal}
              >
                <CloseSVG />
              </button>
            </header>

            <form
              className="form modal__form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
            >
              <div className="form__element">
                <label
                  htmlFor="nameInput"
                  className={cx("label", errors.name && "label--error")}
                >
                  {errors.name ? (
                    "Full name is required!"
                  ) : (
                    <>
                      Full name&nbsp;<span className="label__required">*</span>
                    </>
                  )}
                </label>
                <input
                  type="text"
                  id="nameInput"
                  name="name"
                  placeholder="Full name"
                  className={cx("input", errors.name && "input--error")}
                  ref={register({
                    required: true,
                    // validate: validateName,
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div className="form__element">
                <label
                  htmlFor="ageInput"
                  className={cx("label", errors.email && "label--error")}
                >
                  {errors.email ? (
                    `${errors.email.message}`
                  ) : (
                    <>
                      Age&nbsp;<span className="label__required">*</span>
                    </>
                  )}
                </label>
                <input
                  type="number"
                  id="ageInput"
                  name="age"
                  placeholder="Age"
                  className={cx("input", errors.age && "input--error")}
                  ref={register({
                    required: "Age is required!",
                    minLength: {
                      value: 2,
                      message: "Minimum of 2 digits",
                    },
                    maxLength: {
                      value: 2,
                      message: "Maximum of 2 digits",
                    },
                    validate: validateAge,
                  })}
                />
                {errors.age && <p>{errors.age.message}</p>}
              </div>

              <div className="form__element">
                <label
                  htmlFor="salary"
                  className={cx("label", errors.email && "label--error")}
                >
                  {errors.email ? (
                    `${errors.email.message}`
                  ) : (
                    <>
                      Salary&nbsp;<span className="label__required">*</span>
                    </>
                  )}
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  placeholder="Salary"
                  className={cx("input", errors.salary && "input--error")}
                  ref={register({
                    required: "Salary is required!",
                    validate: validatePositiveInteger,
                  })}
                />
                {errors.salary && <p>{errors.salary.message}</p>}
              </div>

              <div className="form__element">
                <label htmlFor="uploadFile" className="label">
                  Upload File:
                </label>
                <input
                  type="file"
                  id="uploadFile"
                  name="uploadFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="input"
                  ref={register}
                />
              </div>

              <div className="form__action">
                <button
                  className="btn btn__icon btn__cancel"
                  type="button"
                  onClick={closeModal}
                >
                  <CloseSVG /> Cancel
                </button>
                <button className="btn btn__primary btn__icon" type="submit">
                  <CheckSVG /> {state.selectedEmployee ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )
    : null;
}
