import React from 'react';
import { getUserSinger } from '@services/index';
import { Link } from 'react-router-dom';
import './index.less';

class MySinger extends React.Component {
  state = {
    mySingerList: [],
  }

  componentDidMount = async () => {
    const userSinger = await (await getUserSinger()).data;
    this.setState({
      mySingerList: userSinger.data
    })
  }

  render() {
    const { mySingerList } = this.state;
    return <div className="my-singer">
      <div className="u-title">
        <h3><span className="tit">我的歌手（{mySingerList.length}）</span></h3>
      </div>
      <div className="singer-list">
        {mySingerList.map((item: any) => {
          return <div className="itm">
            <div className="cvr">
              <Link to={`/artist?id=${item.id}`} className="f-a">
                <img src={`${item.picUrl}?param=80y80`} />
              </Link>
            </div>
            <div className="cnt">
              <h4 className="tit">
                <Link to={`/artist?id=${item.id}`}>法老</Link>
              </h4>
              <p className="num">{`${item.albumSize}个专辑 ${item.mvSize}个MV`}</p>
            </div>
          </div>

        })}
      </div>
    </div>
  }
}
export default MySinger;