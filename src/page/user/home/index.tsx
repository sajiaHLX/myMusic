import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getUserDetail, getUserRecord, getMusicDetail, getUserPlayList } from '@services/index';
import qs from 'querystring';
import { Divider, message, Table } from 'antd';
import './index.less';

interface IState {
  userInfo: any,
  uid: string,
  weekData: any,
  maxCount: number,
  userPlayList: any,
  followPlayList: any,
}

interface IProps extends RouteComponentProps {
  MusicList: any;
}


@inject('MusicList')
@observer
class UserHome extends React.Component<IProps, IState> {
  state: IState = {
    userInfo: {},
    uid: qs.parse(this.props.location.search.replace(/^\?/, '')).id as string,
    weekData: [],
    maxCount: 0,
    userPlayList: [],
    followPlayList: [],
  }

  componentDidMount = async () => {
    this.getUserPlayList(this.state.uid);
    this.getUserRecord();
    const res = await (await getUserDetail(this.state.uid)).data;
    this.setState({
      userInfo: res,
    });
  }

  getUserRecord = async () => {
    const res1 = await (await getUserRecord(this.state.uid)).data;
    let songList: any = [];
    if (res1.weekData.length > 0) {
      res1.weekData.map((item: any) => {
        item.song.playCount = item.playCount;
        songList.push(item.song);
      })
    }
    this.setState({
      weekData: songList,
      maxCount: songList[0]?.playCount,
    })
  }

  getUserPlayList = async (id: string) => {
    const res = await (await getUserPlayList({ uid: id, offset: 0 })).data;
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
      userPlayList,
      followPlayList,
    });
  }

  renderColumns = () => {
    return [
      {
        title: '',
        dataIndex: 'key',
        width: '75px',
        render: (_a: string, record: any, index: number) => {
          return <>
            <a> {index + 1}</a>
            <span className={`ply ${record.id === this.props.MusicList.playing?.id ? 'playing' : ''}`} onClick={async () => {
              const res = await (await getMusicDetail({ id: record.id })).data;
              this.props.MusicList.checkRepetition(res.songs[0]);
            }}>&nbsp;</span>
          </>
        }
      },
      {
        title: '歌曲标题',
        dataIndex: 'name',
        width: '237px',
        render: (item: any, record: any) => {
          return <div style={{
            width: '237px',
          }} className="text">
            <Link to={`/song?id=${record.id}`} title={item}>{item}</Link>
          </div>
        }
      },
      {
        title: '歌手',
        dataIndex: 'ar',
        width: '89px',
        render: (item: any) => {
          return <div style={{
            width: '89px',
          }} className="text">
            {this.renderArt(item)}
          </div>;
        }
      },
      {
        title: '听歌排行',
        dataIndex: 'playCount',
        render: (count: number) => {
          const { maxCount } = this.state;
          return <div>
            <span className="playCount-width" style={{
              width: `${count / maxCount * 100}%`,
            }}></span>
            <span>{count}次</span>
          </div>
        }
      }
    ];
  }


  renderArt = (ar: any) => {
    return ar.map((item: { name: string; id: number; }, index: number) => {
      return <span key={index} title={item.name}>
        <Link to={`/artist?id=${item.id}`}>{item.name}</Link>
        {ar.length === index + 1 ? '' : '/'}
      </span>
    })
  }

  render() {
    const { userInfo, weekData, userPlayList, followPlayList } = this.state;
    console.log(userInfo, '123123a ');
    return <div className="user-home">
      <dl className="m-proifo" id="head-box">
        <dt className="f-pr" id="ava">
          <img src={userInfo?.profile?.avatarUrl} />
        </dt>
        <dd>
          <div className="name">
            <div>
              <h2 className="name-wrap">
                <span className="tit">{userInfo?.profile?.nickname}</span>
                <span className="lev">{userInfo?.level}<i className="right"></i></span>
              </h2>
            </div>
          </div>
          <ul className="data">
            <li className="fst">
              <strong className="count">{userInfo?.profile?.eventCount}</strong>
              <span>动态</span>
            </li>
            <li>
              <strong className="count">{userInfo?.profile?.follows}</strong>
              <span>关注</span>
            </li>
            <li>
              <strong className="count">{userInfo?.profile?.followeds}</strong>
              <span>粉丝</span>
            </li>
          </ul>
        </dd>
      </dl>
      {weekData.length > 0 ? <><div className="u-title">
        <h3><span className="paihang">听歌排行</span></h3>
        <div className="nav">
          <span>最近一周</span>
        </div>
      </div>
        <div className="table-wrap">
          <Table
            className="my-table"
            columns={this.renderColumns()}
            dataSource={weekData.slice(0, 10)}
            rowClassName={(record, index) => {
              let className = 'light-row';
              if (index % 2 === 1) className = 'dark-row';
              return className;
            }}
            pagination={false}
          >
          </Table>
        </div></> : null}
      <div className="u-title">
        <h3><span className="paihang" style={{ color: '#000' }}>我创建的歌单（{userPlayList.length}）</span></h3>
      </div>
      <div className="list-wrap">
        <ul>
          {userPlayList.map((item: any) => {
            return <li key={item.id}>
              <div className="u-cover">
                <img src={`${item.coverImgUrl}?param=140y140`} />
                <Link to={`/playlist?id=${item.id}`} className="msk" title={item.name}></Link>
                <div className="bottom">
                  <a className="icon-play" title="播放" ></a>
                  <span className="icon-headset"></span>
                  <span className="nb">{item.playCount < 100000 ? item.playCount : `${String(item.playCount).substring(0, String(item.playCount).length - 4)}万`}</span>
                </div>
              </div>
              <p className="dec">
                <Link className="tit" to={`/playlist?id=${item.id}`} title={`${item.name}`}>{item.name}</Link>
              </p>
            </li>
          })}
        </ul>
      </div>
      <div className="u-title">
        <h3><span className="paihang" style={{ color: '#000' }}>我收藏的歌单（{followPlayList.length}）</span></h3>
      </div>
      <div className="list-wrap">
        <ul>
          {followPlayList.map((item: any) => {
            return <li key={item.id}>
              <div className="u-cover">
                <img src={`${item.coverImgUrl}?param=140y140`} />
                <Link to={`/playlist?id=${item.id}`} className="msk" title={item.name}></Link>
                <div className="bottom">
                  <a className="icon-play" title="播放" ></a>
                  <span className="icon-headset"></span>
                  <span className="nb">{item.playCount < 100000 ? item.playCount : `${String(item.playCount).substring(0, String(item.playCount).length - 4)}万`}</span>
                </div>
              </div>
              <p className="dec">
                <Link className="tit" to={`/playlist?id=${item.id}`} title={`${item.name}`}>{item.name}</Link>
              </p>
            </li>
          })}
        </ul>
      </div>
    </div>
  }
}

export default UserHome;