import React from "react";
import InputField from "../FormElements/InputField";
import SubmitButton from "../FormElements/SubmitButton";
import ErrorMessage from "../FormElements/error_message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";



const ModalAddUser = ({ show, onClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    position: Yup.string().required("Position is required").notOneOf(["Select position"], "Please select a valid position"),
    department: Yup.string().required("Department is required").notOneOf(["Select department"], "Please select a valid department"),
    layer: Yup.string().required("Layer is required").notOneOf(["Select layer"], "Please select a valid layer"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("User Added:", data);
    reset(); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 z-10">
        <h2 className="text-6xl font-light mb-14">Add a user</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            icon="/assets/User.png"
            placeholder="Name"
            {...register("name")}
          />
          <ErrorMessage message={errors.name?.message} />

          <InputField
            type="email"
            icon="/assets/Mail.png"
            placeholder="Email"
            {...register("email")}
          />
          <ErrorMessage message={errors.email?.message} />

          <InputField
            type="password"
            icon="/assets/Password.png"
            placeholder="Password"
            {...register("password")}
          />
          <ErrorMessage message={errors.password?.message} />

          <div className="mb-4">
            <select {...register("position")} className="...">
              <option>Select position</option>
              <option>Volunteer</option>
              <option>Leader</option>
              <option>Head</option>
              <option>Co-Head</option>
            </select>
            <ErrorMessage message={errors.position?.message} />
          </div>

          <div className="mb-4">
            <select {...register("department")} className="...">
              <option>Select department</option>
              <option>Public Health</option>
              <option>IT</option>
            </select>
            <ErrorMessage message={errors.department?.message} />
          </div>

          <div className="mb-4">
            <select {...register("layer")} className="...">
              <option>Select layer</option>
              <option>Layer1</option>
              <option>Layer2</option>
              <option>Layer3</option>
            </select>
            <ErrorMessage message={errors.layer?.message} />
          </div>

          <SubmitButton text="Add" />
        </form>
      </div>
    </div>
  );
};

export default ModalAddUser;
