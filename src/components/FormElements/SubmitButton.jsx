import { memo } from 'react';

const SubmitButton = memo(({ text, onClick }) => (
  <button
    type="submit"
    aria-label={text}
    onClick={onClick}
    className="
    w-full py-3 text-xl font-light tracking-wide mb-6
  rounded-full border border-[#2a93c8] bg-[#2a93c8]
  text-white transition duration-300 hover:bg-white hover:text-[#2a93c8] focus:outline-none focus:ring-2 focus:ring-[#2a93c8]
    "
  >
    {text}
  </button>
));

export default SubmitButton;