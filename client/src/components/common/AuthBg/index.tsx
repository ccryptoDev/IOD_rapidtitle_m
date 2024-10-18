import React from 'react';
import loginBg from 'assets/img/login-bg.png';
import logo from 'assets/img/logo.png';
import ImageViewer from 'components/common/ImageViewer';
import './index.view.css';

function AuthBg() {
  return (
    <>
      <div
        className="login-bg h-[100%] w-screen absolute bottom-0"
        style={{ backgroundImage: `url('${loginBg}')` }}
      ></div>
      <ImageViewer
        source={logo}
        width={121}
        height={48}
        className={'absolute bottom-[28px] left-[28px]'}
      />
    </>
  );
}

export default AuthBg;
