import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Input, Avatar, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ShowLoginModal } from '@components/Login';
import './index.less';

interface IProps extends RouteComponentProps {
}

interface IState {
  onC: number,
  sIndex: number,
  showModal: boolean,
  isLogin: boolean,
  userInfo: any,
}

class Header extends React.Component<IProps, IState> {
  state: IState = {
    onC: 0,
    sIndex: 0,
    showModal: false,
    isLogin: window.localStorage.getItem('token') ? true : false,
    userInfo: {},
  }

  componentDidMount = () => {
    console.log();
    if (this.props.location.pathname === '/myMusic') {
      this.setState({
        onC: 1,
      })
    }
    this.setState({
      userInfo: this.getProfile(),
    })
  }

  getProfile = () => {
    let p = window.localStorage.getItem('profile');
    if (p) {
      return JSON.parse(p);
    }
  }

  changeI = (_e: any, index: number) => this.setState({ onC: index })
  render() {
    let menu = [
      { name: '发现音乐', path: '/' },
      { name: '我的音乐', path: '/myMusic' },
    ];
    let sMenu = [
      { name: '推荐', path: '/' },
      // { name: '排行榜', path: '/leader-board' },
      // { name: '歌单', path: '/song-list' },
      // { name: '主播电台', path: '/anchor-station' },
      // { name: '歌手', path: '/singer' },
      // { name: '新碟上架', path: '/new-song' },
    ];
    const { userInfo } = this.state;
    return (
      <header className="header">
        <div className="box">
          <div className="logo">
            <Link onClick={() => { this.setState({ onC: 0 }) }} to={'/'}>林虓云音乐</Link>
          </div>
          <ul className="nav">
            {
              menu.map((item, index) => {
                return <li key={index} onClick={() => {
                  if (index === 1) {
                    if (this.getProfile()) {
                      this.setState({
                        onC: index,
                      });
                      this.props.history.push(item.path);
                      return;
                    }
                    message.error("清先登录！");
                    return;
                  }
                  this.setState({
                    onC: index,
                  });
                  this.props.history.push(item.path);
                }}>
                  <span className={this.state.onC === index ? 'cho' : ''} >
                    <a>
                      <strong>{item.name}</strong>
                      <div className={this.state.onC === index ? 'cho-s' : ''}></div>
                    </a>
                  </span>
                </li>
              })
            }
          </ul>
          <div className="tools">
            <span className="avatar-item">
              {
                this.state.isLogin ? <>
                  <Avatar src={userInfo.avatarUrl} />
                  <div className="login-action">
                    <ul>
                      <li>
                        <Link className="itm-1" to="/user/home?id=436340822">
                          <i className="icn icn-hm"></i>
                          <em>我的主页</em>
                        </Link>
                      </li>
                      <li>
                        <Link className="itm-1" to="/user/home?id=436340822">
                          <i className="icn icn-msg"></i>
                          <em>我的消息</em>
                        </Link>
                      </li>
                      <li>
                        <Link className="itm-1" to="/user/home?id=436340822">
                          <i className="icn icn-lv"></i>
                          <em>我的等级</em>
                        </Link>
                      </li>
                      <li>
                        <Link className="itm-1" to="/user/home?id=436340822">
                          <i className="icn icn-mbr"></i>
                          <em>VIP会员</em>
                        </Link>
                      </li>
                      <li>
                        <Link className="itm-1" to="/user/home?id=436340822">
                          <i className="icn icn-st"></i>
                          <em>个人设置</em>
                        </Link>
                      </li>
                      <li>
                        <Link className="itm-1" to="/user/home?id=436340822">
                          <i className="icn icn-verify"></i>
                          <em>实名认证</em>
                        </Link>
                      </li>
                      <li>
                        <a className="itm-1">
                          <i className="icn icn-ex"></i>
                          <em onClick={() => {
                            window.localStorage.clear();
                            this.setState({
                              onC: 0,
                            })
                            this.props.history.replace('/');
                            window.location.reload();
                          }}>退出</em>
                        </a>
                      </li>
                    </ul>
                  </div>
                </> : <em className="login-btn" onClick={() => { ShowLoginModal() }}>登陆</em>
              }
            </span>
            <Link className="create-c" to="">创作者中心</Link>
            <div className="search">
              <Input className="ser-i" prefix={<SearchOutlined />} placeholder="音乐/视频/用户/电台" onPressEnter={(e: any) => {
                this.props.history.push(`/search?s=${e.target.value}&type=1`);
              }} />
            </div>
          </div>
        </div>
        <div className="clear"></div>
        <div className={`${this.state.onC === 0 ? 'line' : 'line-c'}`}>
          {
            this.state.onC === 0 ? <div className="header-2">
              <ul>
                {
                  sMenu.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link onClick={() => this.setState({ sIndex: index })} to={item.path}>
                          <strong className={this.state.sIndex === index ? 'cho-h2' : ''}>{item.name}</strong>
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div> : null
          }
        </div>
        <div className="clear"></div>
      </header>
    )
  }
}

export default withRouter(Header);
