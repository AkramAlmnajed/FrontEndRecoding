import React, { memo } from 'react';

const ErrorMessage = memo(({ message }) => {
    if (!message) return null;

    return (
        <p
            className="text-xl font-light text-red-500 mb-2 transition duration-300"
            style={{
                color: 'red',
                fontSize: '1rem',
                height: '1rem'
            }}
            aria-label="Error message"
        >
            {message}
        </p>
    );
});

export default ErrorMessage;