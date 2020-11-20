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
            loginModal!.style.cursor = 'move';
          }
        }}
        onMouseUp={() => {
          loginModal!.style.cursor = '';
          loginModal = null;
        }}
      >
        <div className="set" >
          <em>登陆</em><CloseOutlined onClick={destroy} className="close-b" />
        </div>
      </div>
      <div className="content">
        <div className="l-main">
          <div className="login-png"></div>
          <div className="login-btn">
            <a className="btn-1"><i className="btn-t-1">手机号登陆</i></a>
          </div>
          <div className="login-btn">
            <a className="btn-2"><i className="btn-t-2">注  册</i></a>
          </div>
        </div>
        <div className="l-alt">
          <ul>
            <li><a><i className="mlg2 mlg2-wx"></i>微信登陆</a></li>
            <li><a><i className="mlg2 mlg2-qq"></i>QQ登陆</a></li>
            <li><a><i className="mlg2 mlg2-wb"></i>微博登录</a></li>
            <li><a><i className="mlg2 mlg2-wy"></i>网易邮箱账号登陆</a></li>
          </ul>
        </div>
        <div className="l-bottom">
          <div className="u-official-terms">
            <input type="checkbox" id="j-official-terms" />
            <label style={{ marginLeft: '2px' }}>同意</label>
            <a href="http://st.music.163.com/official-terms/service" target="_blank" rel="noopener noreferrer"  style={{ color: '#507DAF' }}>《服务条款》</a>
            <a href="http://st.music.163.com/official-terms/privacy" target="_blank" rel="noopener noreferrer"  style={{ color: '#507DAF' }}>《隐私政策》</a>
            <a href="https://st.music.163.com/official-terms/children" target="_blank" rel="noopener noreferrer"  style={{ color: '#507DAF' }}>《儿童隐私政策》</a>
          </div>
        </div>
      </div>
    </div>
    <div className="cover"></div>
  </div >, div)
}

export {
  ShowLoginModal,
}