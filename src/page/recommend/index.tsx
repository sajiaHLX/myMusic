import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import { getMusicDetail, getRecommendSongs } from '@services/index';
import moment from 'moment';
import './index.less';

enum week {
  '一' = 1,
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
}

interface IState {
  playListDetail: any,
  playing: any,
}

interface IProps extends RouteComponentProps {
  MusicList: any;
}

@inject('MusicList')
@observer
class Recommend extends React.Component<IProps, IState> {
  state: IState = {
    playListDetail: [],
    playing: {},
  }


  componentDidMount = async () => {
    const res = await (await getRecommendSongs()).data;
    this.setState({
      playListDetail: res.data.dailySongs,
    });
  }

  renderArt = (ar: any) => {
    return ar.map((item: { name: string; id: number; }, index: number) => {
      return <span key={index} title={item.name}>
        <Link to={`/artist?id=${item.id}`}>{item.name}</Link>
        {ar.length === index + 1 ? '' : '/'}
      </span>
    })
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
        title: '专辑',
        dataIndex: 'al',
        render: (item: any) => {
          return <div style={{
            width: '127px',
          }} className="text">
            {item.name}
          </div>
        }
      },
    ];
  }

  render() {
    const { playListDetail } = this.state;
    const { playing } = this.props.MusicList;
    return <div className="play-list-daily">
      <div className="music-info clear">
        <div className="bg">
          <div className="cal">
            <div className="head">星期{week[+moment().format('E')]}</div>
            <div className="bd">{moment().get('date')}</div>
            <span className="mask"></span>
          </div>
        </div>
        <div className="btn-wrap">
          <div className="btn">
            <a className="play" onClick={() => {
              this.props.MusicList.changePlayList(playListDetail);
            }}>
              <i>
                <em className="ply"></em>播放全部
              </i>
            </a>
            <a className="add" onClick={() => {
              this.props.MusicList.addPlayList(playListDetail);
            }}></a>
          </div>
        </div>
      </div>
      <div className="music-table clear">
        <div className="u-title">
          <h3>
            <span className="list">歌曲列表</span>
          </h3>
          <span className="sub">
            <span>{playListDetail?.length}</span>首歌
          </span>
        </div>
        <div className="table-wrap">
          <Table
            className="my-table"
            columns={this.renderColumns()}
            dataSource={playListDetail}
            rowClassName={(record, index) => {
              let className = 'light-row';
              if (index % 2 === 1) className = 'dark-row';
              return className;
            }}
            pagination={false}
          >
          </Table>
        </div>
      </div>
    </div>
  }
}

export default Recommend;