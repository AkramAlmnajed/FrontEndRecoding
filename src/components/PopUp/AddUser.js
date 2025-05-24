import React from "react";
import InputField from "../FormElements/InputField";
import SubmitButton from "../FormElements/SubmitButton";
import ErrorMessage from "../FormElements/error_message";

const ModalAddUser = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 z-10">
        <h2 className="text-6xl font-light mb-14">Add a user</h2>
        <form>
          <InputField type="text" icon="/assets/User.png" placeholder=" Name" />

          <InputField
            type="email"
            icon="/assets/Mail.png"
            placeholder="Email"
          />

          <InputField
            type="password"
            icon="/assets/Password.png"
            placeholder="Password"
          />

          <div className="mb-4">
            <select
              id="position"
              className="border-b-2 border-gray-300 w-full p-2 text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option>Select position</option>
              <option>Volunteer</option>
              <option>Leader</option>
              <option>Head</option>
              <option>Co-Head</option>
            </select>
          </div>

          <div className="mb-4">
            <select
              id="department"
              className="border-b-2 border-gray-300 w-full p-2 text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option>Select department</option>
              <option>Public Health</option>
              <option>IT</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              id="layer"
              className="border-b-2 border-gray-300 w-full p-2 text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option>Select layer</option>
              <option>Layer1</option>
              <option>Layer2</option>
              <option>Layer3</option>
            </select>
          </div>
          <SubmitButton text="Add" />
        </form>
      </div>
    </div>
  );
};

export default ModalAddUser;
