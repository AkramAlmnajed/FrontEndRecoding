import React, { memo } from 'react';
import SuccessMessage from './SuccessMessage';
const AccountCreated = memo(() => (
  
   <SuccessMessage
    title="Account Created!"
    description="Your account has been created successfully!"
  />
   

));

export default AccountCreated;