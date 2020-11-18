import * as React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { render, unmountComponentAtNode } from 'react-dom';
import './index.less'

function ShowLoginModal() {
  const destroy = () => {
    unmountComponentAtNode(div);
  }
  let modalX: number | undefined = 0;
  let modalY: number | undefined = 0;
  let clientX: number = 0;
  let clientY: number = 0;
  let top = 0;
  let left = 0;
  let loginModal: HTMLElement | null = null;

  
  const div = document.createElement('div');
  document.body.appendChild(div);
  render(<div>
    <div className='login-modal' id='login-modal'
      onMouseMove={(a) => {
        if (!loginModal) return
        if (modalX === 0 && modalY === 0) {
          modalX = loginModal?.offsetLeft;
          modalY = loginModal?.offsetTop;
        }
        if (clientX === 0 && clientY === 0) {
          clientX = a.clientX;
          clientY = a.clientY;
        }
        if (clientX !== 0 && clientY !== 0) {
          left = a.clientX - clientX;
          top = a.clientY - clientY;
        }
        if (loginModal && a.clientX !== 0 && a.clientY !== 0) {
          console.log(modalX, modalY, top, left);
          loginModal.style.left = (modalX! + left) + 'px';
          loginModal.style.top = (modalY! + top) + 'px';
        }
      }}>
      <div className="login-header"
        onMouseDown={() => {
          if (!loginModal) {
            loginModal = document.getElementById('login-modal');
          }
        }}
        onMouseUp={() => {
          loginModal = null;
        }}
      >
        <div className="set" >
          <em>登陆</em><CloseOutlined onClick={destroy} className="close-b" />
        </div>
      </div>
    </div>
    <div className="cover"></div>
  </div >, div)
}

export {
  ShowLoginModal,
}