import * as React from 'react';
import { Input, Menu, Modal, message } from 'antd';
import { getUserFollow, updatePlayList, getUserPlayList, createPlayList, deletePlayList, getUserSinger } from '@services/index';
import { RouteComponentProps } from 'react-router-dom';
import MyMusicContent from './myPlayList';
import MySinger from './mySinger';
import './index.less';

const { SubMenu } = Menu;

interface IProps extends RouteComponentProps {
  MusicList: any;
}

interface IState {
  userInfo: any;
  userFollow: any;
  userPlayList: any;
  followPlayList: any;
  isCreateVisible: boolean;
  playListName: string;
  isEditVisible: boolean;
  playListId: string;
  showSinger: boolean;
}
class MyMusic extends React.Component<IProps, IState> {
  state: IState = {
    userInfo: {},
    userFollow: {},
    userPlayList: [],
    followPlayList: [],
    isCreateVisible: false,
    playListName: '',
    isEditVisible: false,
    playListId: "0",
    showSinger: true,
  }

  componentDidMount = async () => {
    let userInfo = this.getProfile();
    this.getUserPlayList(userInfo);
    this.setState({
      userInfo,
    });
  }

  getUserPlayList = async (userInfo: any) => {
    const userFollow = await (await getUserFollow({ uid: userInfo.userId, offset: 0 })).data;
    const res = await (await getUserPlayList({ uid: userInfo.userId, offset: 0 })).data;
    let userPlayList: any = [];
    let followPlayList: any = [];
    res.playlist?.map((item: any) => {
      if (item.subscribed) {
        followPlayList.push(item);
      } else {
        userPlayList.push(item);
      }
    })
    this.setState({
      userFollow: userFollow,
      userPlayList,
      followPlayList,
    });
  }

  getProfile = () => {
    let p = window.localStorage.getItem('profile');
    if (p) {
      return JSON.parse(p);
    }
  }


  handleClick = (e: any) => {
    if (e.key !== 'artist') {
      this.setState({
        showSinger: false,
        playListId: e.key,
      });
    } else {
      this.setState({
        showSinger: true,
      })
    }
  };

  render() {
    const { userInfo, userFollow, userPlayList, playListId, followPlayList, isCreateVisible, playListName, isEditVisible } = this.state;
    return <div className="my-music">
      <div className="menu-wrap clear">
        <Menu
          onClick={this.handleClick}
          style={{ width: 240 }}
          defaultSelectedKeys={['artist']}
          mode="inline"
          className="my-menu"
        >
          <Menu.Item key="artist">
            我的歌手 ({userFollow.count || '0'})
          </Menu.Item>
          <SubMenu key="userPlayList" title={
            <div className="title">
              <span>创建的歌单 ({userPlayList.length || '0'})</span>
              <a className="u-btn" onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ isCreateVisible: true })
              }}><i>新建</i></a>
            </div>
          }>
            {userPlayList.map((item: any) => {
              return <Menu.Item key={item.id}>
                <div className="item">
                  <div className="left">
                    <a className="avatar">
                      <img src={`${item.coverImgUrl}?param=40y40`} alt="" />
                    </a>
                  </div>
                  <p className="name">
                    <a className="nm" title={item.name}>{item.name}</a>
                  </p>
                  <p className="num">{item.trackCount}首</p>
                </div>
                {item.name === (userInfo.nickname + '喜欢的音乐') ? null : <span className="oper">
                  <a title="编辑" className="edit" onClick={async () => {
                    this.setState({
                      isEditVisible: true,
                      playListId: item.id,
                    })
                  }}></a>
                  <a title="删除" className="delt" onClick={async () => {
                    const res = await (await deletePlayList(item.id)).data
                    if (res.code === 200) {
                      message.success('删除成功!');
                      this.getUserPlayList(userInfo);
                    } else {
                      message.error('删除失败!');
                    }
                  }}></a>
                </span>}
              </Menu.Item>
            })}
          </SubMenu>
          <SubMenu key="followPlayList" title={`收藏的歌单 (${followPlayList.length || '0'})`}>
            {followPlayList.map((item: any) => {
              return <Menu.Item key={item.id}>
                <div className="item">
                  <div className="left">
                    <a className="avatar">
                      <img src={`${item.coverImgUrl}?param=40y40`} alt="" />
                    </a>
                  </div>
                  <p className="name">
                    <a className="nm" title={item.name}>{item.name}</a>
                  </p>
                  <p className="num">{item.trackCount}首</p>
                </div>
                <span className="oper">
                  <a title="删除" className="delt" onClick={async () => {
                    const res = await (await deletePlayList(item.id)).data
                    if (res.code === 200) {
                      message.success('删除成功!');
                      this.getUserPlayList(userInfo);
                    } else {
                      message.error('删除失败!');
                    }
                  }}></a>
                </span>
              </Menu.Item>
            })}
          </SubMenu>
        </Menu>
      </div>
      <div className="content-wrap">
        {this.state.showSinger ? <MySinger /> :
          <MyMusicContent {...this.props} playListId={String(this.state.playListId)} />
        }
      </div>
      <Modal title="新建歌单" visible={isCreateVisible}
        onOk={async () => {
          const { playListName } = this.state;
          if (!playListName.trim()) {
            message.error("请输入歌单名称");
            return;
          }
          const res = await (await createPlayList(playListName.trim())).data;
          if (res.id && res.code === 200) {
            message.success("创建成功！");
            this.setState({
              isCreateVisible: false,
              playListName: '',
            });
            this.getUserPlayList(userInfo);
            return;
          } else {
            message.error("创建失败！请稍后重试")
          }
        }}
        okText="新建"
        onCancel={() => {
          this.setState({
            isCreateVisible: false,
            playListName: '',
          });
        }}
        cancelText="取消"
      >
        <div style={{
          margin: '20px',
          display: 'flex',
        }}>
          <p style={{
            lineHeight: '31px',
            margin: 0,
          }}>歌单名：</p>
          <Input value={playListName} style={{ width: '270px' }} onChange={(e) => {
            this.setState({
              playListName: e.target.value,
            });
          }} />
        </div>
      </Modal>
      <Modal title="编辑歌单" visible={isEditVisible}
        onOk={async () => {
          const { playListName } = this.state;
          if (!playListName.trim()) {
            message.error("请输入歌单名称");
            return;
          }
          const res = await (await updatePlayList(playListId, playListName.trim())).data;
          if (res.code === 200) {
            message.success("修改成功！");
            this.setState({
              isEditVisible: false,
              playListName: '',
            });
            this.getUserPlayList(userInfo);
            return;
          } else {
            message.error("修改失败！请稍后重试")
          }
        }}
        okText="修改"
        onCancel={() => {
          this.setState({
            isEditVisible: false,
            playListName: '',
          });
        }}
        cancelText="取消"
      >
        <div style={{
          margin: '20px',
          display: 'flex',
        }}>
          <p style={{
            lineHeight: '31px',
            margin: 0,
          }}>歌单名：</p>
          <Input value={playListName} style={{ width: '270px' }} onChange={(e) => {
            this.setState({
              playListName: e.target.value,
            });
          }} />
        </div>
      </Modal>
    </div >
  }
}

export default MyMusic;