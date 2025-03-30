import React, { memo } from 'react';

const SubmitButton = memo(({ text }) => (
  <button
    className="w-full py-3 text-xl font-light tracking-wide text-black mb-6 transition duration-300  "
    style={{
      border: "1px solid #00ACC1",
      background: "transparent",
      borderRadius: "100px",
    }}
    aria-label={text}
    type='submit'

  >
    {text}
  </button>
));

export default SubmitButton;