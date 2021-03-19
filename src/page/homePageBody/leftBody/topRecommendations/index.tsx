import * as React from 'react';
import { getHotRecommendations } from '@services/index';
import './index.less'

interface HotR {
  id: number,
  type: number,
  name: string,
  copywriter: string,
  picUrl: string,
  canDislike: boolean,
  trackNumberUpdateTime: number,
  playCount: number,
  trackCount: number,
  highQuality: boolean,
  alg: string
}

export default class TopRecommendations extends React.Component {
  state = {
    hotR: [],
  }
  componentDidMount = async () => {
    const res = await (await getHotRecommendations()).data
    this.setState({
      hotR: res.result.slice(0, 8),
    })
  }
  render() {
    return <div className="top-recommendations">
      <div className="v-hd2">
        <a href="/discover/playlist/" className="tit f-ff2 f-tdn">热门推荐</a>
        <div className="tab">
          <a href="/discover/playlist/?cat=%E5%8D%8E%E8%AF%AD" className="s-fc3">华语</a>
          <span className="line">|</span>
          <a href="/discover/playlist/?cat=%E6%B5%81%E8%A1%8C" className="s-fc3">流行</a>
          <span className="line">|</span>
          <a href="/discover/playlist/?cat=%E6%91%87%E6%BB%9A" className="s-fc3">摇滚</a>
          <span className="line">|</span>
          <a href="/discover/playlist/?cat=%E6%B0%91%E8%B0%A3" className="s-fc3">民谣</a>
          <span className="line">|</span>
          <a href="/discover/playlist/?cat=%E7%94%B5%E5%AD%90" className="s-fc3">电子</a>
        </div>
        <span className="more">
          <a href="/discover/playlist/" className="s-fc3">更多</a>
          <i className="cor s-bg s-bg-6">&nbsp;</i>
        </span>
      </div>
      <div className="top-content">
        <ul className="li-wrap">
          {this.state.hotR.map((item: HotR) => {
            return <li key={item.id}>
              <div className="u-cover u-cover-1">
                <img src={`${item.picUrl}?param=140y140`} />
                <a title={item.name} href={`/playlist?id=${item.id}`} className="msk"></a>
                <div className="bottom">
                  <a className="icon-play f-fr" title="播放"></a>
                  <span className="icon-headset"></span>
                  <span className="nb">{item.playCount < 100000 ? item.playCount : `${String(item.playCount).substring(0, String(item.playCount).length - 4)}万`}</span>
                </div>
              </div>
              <p className="dec">
                <a title={`${item.name}`} className="tit s-fc0" href={`/playlist?id=${item.id}`}>
                  {item.name}
                </a>
              </p>
            </li>
          })}
        </ul>
      </div>
    </div>
  }
}