import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { render } from 'react-dom';
import AllToast from '@components/Toast';
import { Checkbox, Form, Input, message } from 'antd';
import { phone } from '@utils/checkers';
import { FormInstance } from 'antd/lib/form';
import { PhoneLogin } from '@services/index';
import MusicList from '@store/musicList';
import './index.less'

enum LoginType {
  Index,
  Phone,
  Registered,
}

interface State {
  check: boolean,
  loginType: LoginType,
}
class LoginModal extends React.Component {
  private form: null | FormInstance = null;
  state: State = {
    check: false,
    loginType: 0,
  }
  ref: Node | null = null;
  modalX: number | undefined = 0;
  modalY: number | undefined = 0;
  clientX: number = 0;
  clientY: number = 0;
  top = 0;
  left = 0;
  loginModal: HTMLElement | null = null;

  onLoginBtnClick = (type: LoginType) => {
    if (!this.state.check) {
      AllToast()
      return;
    }
    this.setState({
      loginType: type,
      check: false,
    })
  }

  removeChild = () => {
    if (this.ref) {
      const parent = this.ref.parentElement
      parent?.removeChild(this.ref);
      parent?.parentElement?.removeChild(parent);
    }
  }

  private LoginModalWidthAHeight = [
    {
      height: 372,
    },
    {
      height: 314,
    },
    {
      height: 341,
    },
  ]

  private LoginModalType = [
    {
      type: LoginType.Index,
      title: '登录',
      com: <div className="default-login">
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
              <a className="btn-1" onClick={() => this.onLoginBtnClick(LoginType.Phone)}><i className="btn-t-1">手机号登陆</i></a>
            </div>
            <div className="login-btn">
              <a className="btn-2" onClick={() => this.onLoginBtnClick(LoginType.Registered)}><i className="btn-t-2">注  册</i></a>
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
              <Checkbox defaultChecked={this.state.check} onChange={() => {
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
      </div>,
    },
    {
      type: LoginType.Phone,
      title: '手机号登录',
      com: <div className="phone-login">
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
            <em>手机号登录</em><CloseOutlined onClick={this.removeChild} className="close-b" />
          </div>
        </div>
        <div className="content">
          {/* <div></div> */}
          <Form
            ref={(r) => {
              this.form = r;
            }}
          >
            <Form.Item
              name="phone"
              required={true}
              validateTrigger="onSubmit"
              rules={[
                { required: true, message: '请输入手机号' },
                {
                  validator: (_rules, val: string, cb) => {
                    if (val && phone(val)) {
                      cb('请输入正确的手机号');
                    }
                    cb();
                  }
                }
              ]}
            >
              <Input placeholder="请输入手机号" allowClear />
            </Form.Item>
            <Form.Item
              name="password"
              required={true}
              rules={[
                { required: true, message: '请输入密码！' }
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item className="login-btn">
              <a className="btn-1" onClick={() => {
                this.form?.validateFields().then(async (res) => {
                  const result = await (await PhoneLogin(res as { phone: string, password: string })).data;
                  if (result.code !== 200) {
                    message.error(result.msg)
                  } else {
                    window.localStorage.setItem('token', result.token);
                    window.localStorage.setItem('profile', JSON.stringify(result.profile));
                    window.localStorage.setItem('account', JSON.stringify(result.account));
                    this.removeChild();
                    window.location.reload();
                  }
                })
              }}>
                <i className="btn-t-1">登陆</i>
              </a>
            </Form.Item>
          </Form>
        </div>
        <div className="bottom">
          <a className="back" onClick={() => {
            this.setState({
              loginType: LoginType.Index,
            });
          }}>&lt;&nbsp;&nbsp;其他登录方式</a>
          <a className="registered" onClick={() => {
            this.setState({
              loginType: LoginType.Registered,
            });
          }}>没有帐号？免费注册&nbsp;&nbsp;&gt;</a>
        </div>
      </div>,
    },
    {
      type: LoginType.Registered,
      title: '手机号注册',
      com: <div className="registered-login">
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
            <em>手机号注册</em><CloseOutlined onClick={this.removeChild} className="close-b" />
          </div>
        </div>
        <div className="content">
          <a onClick={()=>{
            this.setState({
              loginType: LoginType.Index
            })
          }}>敬请期待，暂未开发！点击跳回登录！</a>
        </div>
      </div>,
    }
  ]

  render() {
    const { loginType } = this.state;
    const WAH = this.LoginModalWidthAHeight[loginType]
    return (
      <div id='login-modal' ref={ref => this.ref = ref}>
        <div className='login-modal'
          style={{ height: WAH.height }}
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
          {this.LoginModalType[loginType].com}
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