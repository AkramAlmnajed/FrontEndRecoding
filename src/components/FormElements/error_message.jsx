import { memo } from 'react';

const ErrorMessage = memo(({ message }) => {
    if (!message) return null;

    return (
        <p
            className=" font-light text-red-500 transition duration-300 mb-[1rem] text-center"
            style={{
                color: 'red',
                fontSize: '0.8rem',
                height: '1rem'
            }}
            aria-label="Error message"
        >
            {message}
        </p>
    );
});

export default ErrorMessage;