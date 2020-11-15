import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

class Header extends React.Component {
  state = {
    onC: 0,
    sIndex: 0,
  }

  changeI = (_e: any, index: number) => this.setState({ onC: index })
  render() {
    let menu = [
      { name: '发现音乐', path: '/' },
      { name: '我的音乐', path: '/myMusic' },
      { name: '朋友', path: '/friend' },
      { name: '商城', path: '/store' },
      { name: '音乐人', path: '/music-p' },
      { name: '下载客户端', path: '/download' },
    ];
    let sMenu = [
      { name: '推荐', path: '/recommend' },
      { name: '排行榜', path: '/leader-board' },
      { name: '歌单', path: '/song-list' },
      { name: '主播电台', path: '/anchor-station' },
      { name: '歌手', path: '/singer' },
      { name: '新碟上架', path: '/new-song' },
    ]
    return (
      <header className="header">
        <div className="box">
          <div className="logo">
            <Link to={'/'}>林虓云音乐</Link>
          </div>
          <ul className="nav">
            {
              menu.map((item, index) => {
                // console.log(index);
                return <li key={index}>
                  <span className={this.state.onC === index ? 'cho' : ''} >
                    <Link to={item.path} onClick={() => {
                      this.setState({
                        onC: index,
                      })
                    }}>
                      <strong>{item.name}</strong>
                      <div className={this.state.onC === index ? 'cho-s' : ''}></div>
                    </Link>
                  </span>
                </li>
              })
            }

          </ul>

        </div>
        <div className="clear"></div>
        <div className={`${this.state.onC === 0 ? 'line' : 'line-c'}`}>
          {
            this.state.onC === 0 ? <div className="header-2">
              <ul>
                {
                  sMenu.map((item, index) => {
                    return (
                      <li>
                        <Link onClick={() => this.setState({ sIndex: index })} to={item.path}><em className={this.state.sIndex === index ? 'cho-h2' : ''}>{item.name}</em></Link>
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

export default Header;
