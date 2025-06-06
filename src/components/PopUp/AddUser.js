import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import InputField from "../FormElements/InputField";
import SubmitButton from "../FormElements/SubmitButton";
import ErrorMessage from "../FormElements/error_message";
import { useState } from "react";
import axios from "axios";

const allowedPositions = [
  "Co-Head",
  "Co-Head, Senior Leader",
  "Corrdinator",
  "Corrdinator, Junior Leader",
  "Head",
  "Junior",
  "Junior Leader, Corrdinator",
  "Senior Leader",
  "Senior Leader, Co-Head"
];

const allowedDepartments = [
  "ADMIN DEPARTMENT",
  "DESIGN DEPARTMENT",
  "EDUCATION DEPARTMENT",
  "FUNDRAISING & NETWORKING DEPARTMENT",
  "FUNDRAISING DEPARTMENT",
  "IT & AI DEPARTMENT",
  "MEDIA DEPARTMENT",
  "RESEARCH DEPARTMENT"
];

const allowedLayers = [
  "Culture and heritage",
  "Other",
  "building code",
  "data collection and analysis",
  "ecological factor",
  "economic factor",
  "public health",
  "resources management",
  "social factor",
  "technology and infrastructure",
  "urban planning"
];

const ModalAddUser = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    position: Yup.string()
      .required("Position is required")
      .notOneOf(["Select position"], "Please select a valid position")
      .oneOf(allowedPositions, "Please select a valid position"),
    department: Yup.string()
      .required("Department is required")
      .notOneOf(["Select department"], "Please select a valid department")
      .oneOf(allowedDepartments, "Please select a valid department"),
    layer: Yup.string()
      .required("Layer is required")
      .notOneOf(["Select layer"], "Please select a valid layer")
      .oneOf(allowedLayers, "Please select a valid layer"),
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

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setSuccessMessage("");
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setApiError("Authentication token not found. Please login again.");
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/users",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          position: data.position,
          department: data.department,
          layer: data.layer,
          status: "active",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("User added successfully! 🎉");
      reset();
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 1200);
    } catch (error) {
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setApiError("Unauthorized. Please check your access token.");
      } else {
        setApiError("An error occurred while adding user.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 z-10">
        <h2 className="text-3xl font-light mb-7">Add a user</h2>

        {apiError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-center">{apiError}</div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-center">{successMessage}</div>
        )}

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
            <select {...register("position")} className="w-full border rounded px-3 py-2">
              <option>Select position</option>
              {allowedPositions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.position?.message} />
          </div>

          <div className="mb-4">
            <select {...register("department")} className="w-full border rounded px-3 py-2">
              <option>Select department</option>
              {allowedDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.department?.message} />
          </div>

          <div className="mb-4">
            <select {...register("layer")} className="w-full border rounded px-3 py-2">
              <option>Select layer</option>
              {allowedLayers.map((layer) => (
                <option key={layer} value={layer}>
                  {layer}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.layer?.message} />
          </div>

          <SubmitButton text={loading ? "Adding..." : "Add"} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default ModalAddUser;
