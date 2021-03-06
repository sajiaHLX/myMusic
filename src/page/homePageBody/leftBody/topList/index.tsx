import * as React from 'react';
import { getPlayList } from '@services/index';
import { observer } from 'mobx-react';
import MusicList from '@store/musicList';
import { getMusicDetail, addPlayListToUserList } from '@services/index';
import { Link } from 'react-router-dom';
import addCollectionModal from '@components/AddCollection';
import './index.less'
import { message } from 'antd';

interface Item {
  id: number,
  name: string,
}

@observer
export default class TopList extends React.Component {
  state = {
    showFastUpList: [],
    showNewList: [],
    showOriginalList: []
  }

  componentDidMount = async () => {
    const res = await (await getPlayList({ id: 19723756 })).data;
    const res1 = await (await getPlayList({ id: 3779629 })).data;
    const res2 = await (await getPlayList({ id: 2884035 })).data;
    this.setState({
      showFastUpList: res.playlist.tracks.slice(0, 10),
      showNewList: res1.playlist.tracks.slice(0, 10),
      showOriginalList: res2.playlist.tracks.slice(0, 10),
    });
  }

  renderAction = (item: any) => {
    return <div className="oper">
      <a className="s-bg" title="播放" onClick={async () => {
        const res = await (await getMusicDetail({ id: item.id })).data;
        MusicList.checkRepetition(res.songs[0]);
      }}></a>
      <a className="u-icn" title="添加到播放列表" onClick={async () => {
        const res = await (await getMusicDetail({ id: item.id })).data;
        MusicList.addList(res.songs[0]);
      }}></a>
      <a className="record" title="收藏" onClick={() => {
        addCollectionModal(item.id);
      }}></a>
    </div>
  }

  addPlayList = async (id: string) => {
    const res = await (await addPlayListToUserList({ t: 1, id: id })).data;
    if (res.code === 200) {
      message.success("添加成功！");
      return;
    } else {
      message.error('添加失败！');
    }
  }

  render() {
    return <div className="top-list-wrap">
      <div className="v-hd2">
        <Link to="/discover/toplist" className="tit">榜单</Link>
        <span className="more">
          <Link to="/discover/toplist">更多</Link>
          <i className="cor">&nbsp;</i>
        </span>
      </div>
      <div className="top-list">
        <dl className="blk">
          <dt className="top">
            <div className="cver">
              <img className="j-img" src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100" />
              <Link to="/discover/toplist?id=19723756" className="msk" title="飙升榜"></Link>
            </div>
            <div className="tit">
              <Link to="/discover/toplist?id=19723756" title="飙升榜">
                <h3 className="f-fs1 f-thide">飙升榜</h3>
              </Link>
              <div className="btn">
                <a className="play" onClick={() => {
                  MusicList.changePlayList(this.state.showFastUpList);
                }}>播放</a>
                <a className="subscribe-flag" onClick={() => {
                  this.addPlayList('19723756');
                }}>收藏</a>
              </div>
            </div>
          </dt>
          <dd>
            <ol>
              {this.state.showFastUpList.map((item: Item, index) => {
                return <li key={index}>
                  <span className={`no ${(index + 1) <= 3 ? 'no-top' : ''}`}>{index + 1}</span>
                  <Link to={`/song?id=${item.id}`} className="nm" title={item.name}>{item.name}</Link>
                  {this.renderAction(item)}
                </li>
              })}
            </ol>
          </dd>
        </dl>
        <dl className="blk">
          <dt className="top">
            <div className="cver">
              <img className="j-img" src="http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100" />
              <Link to="/discover/toplist?id=3779629" className="msk" title="新歌榜"></Link>
            </div>
            <div className="tit">
              <Link to="/discover/toplist?id=3779629" title="新歌榜">
                <h3 className="f-fs1 f-thide">新歌榜</h3>
              </Link>
              <div className="btn">
                <a className="play" onClick={() => {
                  MusicList.changePlayList(this.state.showNewList);
                }}>播放</a>
                <a className="subscribe-flag" onClick={() => {
                  this.addPlayList('3779629');
                }}>收藏</a>
              </div>
            </div>
          </dt>
          <dd>
            <ol>
              {this.state.showNewList.map((item: Item, index) => {
                return <li key={index}>
                  <span className={`no ${(index + 1) <= 3 ? 'no-top' : ''}`}>{index + 1}</span>
                  <Link to={`/song?id=${item.id}`} className="nm" title={item.name}>{item.name}</Link>
                  {this.renderAction(item)}
                </li>
              })}
            </ol>
          </dd>
        </dl>
        <dl className="blk">
          <dt className="top">
            <div className="cver">
              <img className="j-img" src="http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100" />
              <Link to="/discover/toplist?id=2884035" className="msk" title="原创榜"></Link>
            </div>
            <div className="tit">
              <Link to="/discover/toplist?id=2884035" title="原创榜">
                <h3 className="f-fs1 f-thide">原创榜</h3>
              </Link>
              <div className="btn">
                <a className="play" onClick={() => {
                  MusicList.changePlayList(this.state.showOriginalList);
                }}>播放</a>
                <a className="subscribe-flag" onClick={() => {
                  this.addPlayList('2884035');
                }}>收藏</a>
              </div>
            </div>
          </dt>
          <dd>
            <ol>
              {this.state.showOriginalList.map((item: Item, index) => {
                return <li key={index}>
                  <span className={`no ${(index + 1) <= 3 ? 'no-top' : ''}`}>{index + 1}</span>
                  <Link to={`/song?id=${item.id}`} className="nm" title={item.name}>{item.name}</Link>
                  {this.renderAction(item)}
                </li>
              })}
            </ol>
          </dd>
        </dl>
      </div>
    </div>
  }
}