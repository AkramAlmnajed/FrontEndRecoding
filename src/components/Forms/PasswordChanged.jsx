import React, { memo } from 'react';
import SuccessMessage from './SuccessMessage';
const PasswordChanged = memo(() => (
<SuccessMessage
    title="Password Changed!"
    description="Your password has been changed successfully!"
  />
));

export default PasswordChanged;