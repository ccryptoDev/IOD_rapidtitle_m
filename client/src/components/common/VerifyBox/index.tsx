import React, { BaseSyntheticEvent, useState } from 'react';
import './index.view.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';

function VerifyBox() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('')
  return (
    <div className='otp-verify'>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
    </div>
  );
}

export default VerifyBox;
