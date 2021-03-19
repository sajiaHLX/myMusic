import * as React from 'react';
import { getTopListFastUp, getNewSongList, getOriginalList } from '@services/index';
import { observer } from 'mobx-react';
import MusicList from '@store/musicList';
import { getMusicDetail } from '@services/index';
import './index.less'

interface Item {
  id: number,
  name: string,
}

@observer
export default class TopList extends React.Component {
  state = {
    fastUpList: [],
    newList: [],
    originalList: []
  }
  componentDidMount = async () => {
    const res = await (await getTopListFastUp()).data;
    const res1 = await (await getNewSongList()).data;
    const res2 = await (await getOriginalList()).data;
    this.setState({
      fastUpList: res.playlist.tracks.slice(0, 10),
      newList: res1.playlist.tracks.slice(0, 10),
      originalList: res2.playlist.tracks.slice(0, 10),
    });
  }

  renderAction = (item: any) => {
    return <div className="oper">
      <a className="s-bg" title="播放" onClick={async () => {
        const res = await (await getMusicDetail({id: item.id})).data;
        console.log(item, '123', res.songs[0]);
      }}></a>
      <a className="u-icn" title="添加到播放列表" onClick={() => {
        console.log(item, '123');
      }}></a>
      <a className="record" title="收藏"></a>
    </div>
  }

  render() {
    return <div className="top-list-wrap">
      <div className="v-hd2">
        <a href="/discover/toplist" className="tit">榜单</a>
        <span className="more">
          <a href="/discover/toplist">更多</a>
          <i className="cor">&nbsp;</i>
        </span>
      </div>
      <div className="top-list">
        <dl className="blk">
          <dt className="top">
            <div className="cver">
              <img className="j-img" src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100" />
              <a href="/discover/toplist?id=19723756" className="msk" title="飙升榜"></a>
            </div>
            <div className="tit">
              <a href="/discover/toplist?id=19723756" title="飙升榜">
                <h3 className="f-fs1 f-thide">飙升榜</h3>
              </a>
              <div className="btn">
                <a className="play">播放</a>
                <a className="subscribe-flag">收藏</a>
              </div>
            </div>
          </dt>
          <dd>
            <ol>
              {this.state.fastUpList.map((item: Item, index) => {
                return <li key={index}>
                  <span className={`no ${(index + 1) <= 3 ? 'no-top' : ''}`}>{index + 1}</span>
                  <a href={`/song?id=${item.id}`} className="nm" title={item.name}>{item.name}</a>
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
              <a href="/discover/toplist?id=3779629" className="msk" title="新歌榜"></a>
            </div>
            <div className="tit">
              <a href="/discover/toplist?id=3779629" title="新歌榜">
                <h3 className="f-fs1 f-thide">新歌榜</h3>
              </a>
              <div className="btn">
                <a className="play">播放</a>
                <a className="subscribe-flag">收藏</a>
              </div>
            </div>
          </dt>
          <dd>
            <ol>
              {this.state.newList.map((item: Item, index) => {
                return <li key={index}>
                  <span className={`no ${(index + 1) <= 3 ? 'no-top' : ''}`}>{index + 1}</span>
                  <a href={`/song?id=${item.id}`} className="nm" title={item.name}>{item.name}</a>
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
              <a href="/discover/toplist?id=2884035" className="msk" title="原创榜"></a>
            </div>
            <div className="tit">
              <a href="/discover/toplist?id=2884035" title="原创榜">
                <h3 className="f-fs1 f-thide">原创榜</h3>
              </a>
              <div className="btn">
                <a className="play">播放</a>
                <a className="subscribe-flag">收藏</a>
              </div>
            </div>
          </dt>
          <dd>
            <ol>
              {this.state.originalList.map((item: Item, index) => {
                return <li key={index}>
                  <span className={`no ${(index + 1) <= 3 ? 'no-top' : ''}`}>{index + 1}</span>
                  <a href={`/song?id=${item.id}`} className="nm" title={item.name}>{item.name}</a>
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