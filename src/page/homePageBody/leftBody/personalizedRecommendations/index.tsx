import * as React from 'react';
import { getPersonalizedRecommendations } from '@services/index';
import { Link } from 'react-router-dom';
import './index.less';

interface Persona {
  id: number,
  type: number,
  name: string,
  copywriter: string,
  picUrl: string,
  playcount: number,
  createTime: number,
  creator: {
    mutual: false,
    remarkName: null,
    avatarImgIdStr: string,
    backgroundImgIdStr: string,
    userId: number,
    detailDescription: "",
    defaultAvatar: false,
    expertTags: string[],
    djStatus: number,
    followed: boolean,
    backgroundUrl: string,
    avatarImgId: number,
    backgroundImgId: number,
    accountStatus: number,
    vipType: number,
    province: number,
    avatarUrl: string,
    authStatus: number,
    userType: number,
    nickname: string,
    gender: number,
    birthday: number,
    city: number,
    description: string,
    signature: string,
    authority: number
  },
  trackCount: number,
  userId: number,
  alg: string
}

export default class PersonalizedRecommendations extends React.Component {
  state = {
    persona: [],
  }

  componentDidMount = async () => {
    const res = await (await getPersonalizedRecommendations()).data;
    this.setState({
      persona: res.recommend.slice(0, 3),
    })
  }

  render() {
    return <div className="personalized-recommendations">
      <div className="v-hd2">
        <span className="tit">个性化推荐</span>
      </div>
      <div className="personalized-content">
        <ul className="li-wrap">
          <li className="everyday">
            <p title="每日歌曲推荐" className="date">
              <span className="head">星期一</span>
              <span className="bd">15</span>
              <Link className="mask" title="每日歌曲推荐" to="/discover/recommend/taste"></Link>
            </p>
            <p className="dec">
              <Link className="tit s-fc0" title="每日歌曲推荐" to="/discover/recommend/taste">
                每日歌曲推荐
              </Link>
            </p>
            <p className="idv" title="根据你的口味生成，每天6:00更新">
              根据你的口味生成，<br />每天6:00更新
            </p>
          </li>
          {this.state.persona.map((item: Persona) => {
            return <li key={item.id}>
              <div className="u-cover u-cover-1">
                <img src={`${item.picUrl}?param=140y140`} />
                <Link title={item.name} to={`/playlist?id=${item.id}`} className="msk"></Link>
                <div className="bottom">
                  <a className="icon-play f-fr" title="播放"></a>
                  <span className="icon-headset"></span>
                  <span className="nb">{item.playcount < 100000 ? item.playcount : `${String(item.playcount).substring(0, String(item.playcount).length - 4)}万`}</span>
                </div>
              </div>
              <p className="dec">
                <Link title={`${item.name}`} className="tit s-fc0" to={`/playlist?id=${item.id}`}>
                  {item.name}
                </Link>
              </p>
              <p className="idv f-brk s-fc4" title={item.copywriter}>
                <em>{item.copywriter}</em>
              </p>
            </li>
          })}
        </ul>
      </div>
    </div>
  }
}