import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getUserInfo } from '@services/index';
import './index.less';

interface IState {
  userInfo: any
}

interface IProps extends RouteComponentProps {

}

class UserHome extends React.Component<IProps, IState> {
  state: IState = {
    userInfo: {},
  }

  componentDidMount = async () => {
    const res = await (await getUserInfo()).data;
    console.log(res, 'as');
  }

  render() {
    return <div className="user-home">
      <dl className="m-proifo f-cb" id="head-box">
        <dt className="f-pr" id="ava">
          <img src="http://p1.music.126.net/fxrx6Rx1KtLCAIwfvGY8KQ==/109951165830067125.jpg?param=180y180" />
          <div className="btm"><a href="/user/update?id=436340822&amp;sub=ava" className="upload">更换头像</a></div>
        </dt>
        <dd>
          <div className="name f-cb">
            <div className="f-cb">
              <div className="rect" id="newmusician"></div>
              <h2 id="j-name-wrap" className="wrap f-fl f-cb ">
                <span className="tit f-ff2 s-fc0 f-thide">法海懂爱了</span>
                <span className="vip-code-220-1"></span>
                <span className="lev">8<i className="right"></i></span>
                <i className="icn"></i>
              </h2>
            </div>
          </div>
          <ul className="data" id="tab-box">
            <li className="fst"><a href="/user/event?id=436340822"><strong id="event_count">0</strong><span>动态</span></a></li>
            <li><a href="/user/follows?id=436340822"><strong id="follow_count">5</strong><span>关注</span></a></li>
            <li>
              <a href="/user/fans?id=436340822">
                <strong id="fan_count">1</strong>
                <span>粉丝</span>
                <i className="u-icn"></i>
              </a></li>
          </ul>
          <div className="inf">
            <span>所在地区：四川省 - 成都市</span>
          </div>
          <div className="inf">
            <span className="tit">社交网络：</span>
            <ul className="u-logo">
              <li><i className="u-slg" title="新浪微博"></i></li>
            </ul>
          </div>
        </dd>
      </dl>
    </div>
  }
}

export default UserHome;