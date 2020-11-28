import React from 'react';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { render, unmountComponentAtNode } from 'react-dom';
import AllToast from '@components/Toast';
import './index.less'

class LoginModal extends React.Component {
  state = {
    check: false
  }
  ref: Node | null = null;
  modalX: number | undefined = 0;
  modalY: number | undefined = 0;
  clientX: number = 0;
  clientY: number = 0;
  top = 0;
  left = 0;
  loginModal: HTMLElement | null = null;

  onLoginBtnClick = () => {
    if (!this.state.check) {
      AllToast()
    }
  }
  removeChild = () => {
    if (this.ref) {
      const parent = this.ref.parentElement
      parent?.removeChild(this.ref);
      parent?.parentElement?.removeChild(parent);
    }
  }

  render() {
    return (
      <div id='login-modal' ref={ref => this.ref = ref}>
        <div className='login-modal'
          onMouseMove={(a) => {
            if (!this.loginModal) return
            if (this.modalX === 0 && this.modalY === 0) {
              this.modalX = this.loginModal?.offsetLeft;
              this.modalY = this.loginModal?.offsetTop;
            }
            if (this.clientX === 0 && this.clientY === 0) {
              this.clientX = a.clientX;
              this.clientY = a.clientY;
            }
            if (this.clientX !== 0 && this.clientY !== 0) {
              this.left = a.clientX - this.clientX;
              this.top = a.clientY - this.clientY;
            }
            if (this.loginModal && a.clientX !== 0 && a.clientY !== 0) {
              this.loginModal.style.left = (this.modalX! + this.left) + 'px';
              this.loginModal.style.top = (this.modalY! + this.top) + 'px';
            }
          }}>
          <div className="login-header"
            onMouseDown={() => {
              if (!this.loginModal) {
                this.loginModal = document.getElementById('login-modal');
                this.loginModal!.style.cursor = 'move';
              }
            }}
            onMouseUp={() => {
              this.loginModal!.style.cursor = '';
              this.loginModal = null;
            }}
          >
            <div className="set" >
              <em>登陆</em><CloseOutlined onClick={this.removeChild} className="close-b" />
            </div>
          </div>
          <div className="content">
            <div className="l-main">
              <div className="login-png"></div>
              <div className="login-btn">
                <a className="btn-1" onClick={this.onLoginBtnClick}><i className="btn-t-1">手机号登陆</i></a>
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
                <input type="checkbox" id="j-official-terms" onChange={() => {
                  this.setState({
                    check: !this.state.check
                  })
                }} />
                <label style={{ marginLeft: '2px' }}>同意</label>
                <a href="http://st.music.163.com/official-terms/service" target="_blank" rel="noopener noreferrer" style={{ color: '#507DAF' }}>《服务条款》</a>
                <a href="http://st.music.163.com/official-terms/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#507DAF' }}>《隐私政策》</a>
                <a href="https://st.music.163.com/official-terms/children" target="_blank" rel="noopener noreferrer" style={{ color: '#507DAF' }}>《儿童隐私政策》</a>
              </div>
            </div>
          </div>
        </div>
        <div className="cover"></div>
      </div >
    )
  }
}

function ShowLoginModal() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  render(<LoginModal />, div);
}

export {
  ShowLoginModal,
}