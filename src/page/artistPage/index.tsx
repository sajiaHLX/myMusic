import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getArtistDetail, getMusicDetail, getArtistAlbumDetail, getArtistDescDetail } from '@services/index';
import { Table, Pagination } from 'antd';
import qs from 'querystring';
import moment from 'moment';
import './index.less';



interface IProps extends RouteComponentProps {
  MusicList: any;
}

interface IState {
  artist: any;
  songs: any;
  menuType: string;
  albums: any;
  pageNo: number;
  artistId: number;
  desc: any;
}


const MenuType = [
  {
    key: '热门作品',
    type: '1',
  },
  {
    key: '所有专辑',
    type: '2',
  },
  {
    key: '艺人介绍',
    type: '3',
  },
];

@inject('MusicList')
@observer
class Artist extends React.Component<IProps>{
  state: IState = {
    artist: {},
    songs: [],
    menuType: '1',
    albums: [],
    pageNo: 0,
    artistId: 0,
    desc: {}
  }

  componentDidMount = async () => {
    let artistId = qs.parse(this.props.location.search.replace(/^\?/, '')).id
    const res = await (await getArtistDetail({ id: +artistId })).data;
    const albums = await (await getArtistAlbumDetail({ id: +artistId, offset: 0 })).data;
    const desc = await (await getArtistDescDetail({ id: +artistId })).data;
    this.setState({
      artist: res.artist,
      songs: res.hotSongs,
      albums: albums.hotAlbums,
      artistId: artistId,
      desc,
    });
  }

  getData = async (offset: number) => {
    const { artistId } = this.state;
    const albums = await (await getArtistAlbumDetail({ id: artistId, offset: offset })).data;
    this.setState({
      artist: albums.artist,
      albums: albums.hotAlbums,
    });
  }

  renderColumns = () => {
    return [
      {
        title: '',
        dataIndex: 'key',
        width: '25px',
        render: (_a: string, record: any, index: number) => {
          return <>
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
        width: '280px',
        render: (item: any, record: any) => {
          return <div style={{
            width: '280px',
          }} className="text">
            <Link to={`/song?id=${record.id}`} title={item}>{item}</Link>
          </div>
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '96px',
        render: (_: any, record: any) => {
          return <div className="action">
            <a className="icn-add" title="添加到播放列表" onClick={() => {
              this.props.MusicList.addList(record);
            }}></a>
            <span className="icn icn-fav" title="收藏"></span>
          </div>
        }
      },
      {
        title: '专辑',
        dataIndex: 'al',
        render: (item: any) => {
          return <div style={{
            width: '180px',
          }} className="text">
            {item?.name}
          </div>
        }
      },
    ];
  }

  renderArt = (ar: any) => {
    if (!ar) return <></>;
    return ar.map((item: { name: string; id: number; }, index: number) => {
      return <span key={index} title={item.name}>
        <Link to={`/artist?id=${item.id}`}>{item.name}</Link>
        {ar.length === index + 1 ? '' : '/'}
      </span>
    })
  }

  renderDetail = (type: string) => {
    const { songs, albums, pageNo, artist, desc } = this.state;
    if (type === '1') {
      return <div className="songs-wrap">
        <div id="content-operation" className="btns">
          <a className="u-ply" title="播放">
            <i><em className="ply"></em>播放</i>
          </a>
          <a className="u-add" title="添加到播放列表"></a>
        </div>
        <div className="song-list">
          <Table
            showHeader={false}
            className="my-table"
            columns={this.renderColumns()}
            dataSource={songs}
            rowKey={item => item.id}
            pagination={false}
            rowClassName={(record, index) => {
              let className = 'light-row';
              if (index % 2 === 1) className = 'dark-row';
              return className;
            }}
          />
        </div>
      </div>
    } else if (type === '2') {
      return <div className="album-wrap">
        <ul className="album-list clear">
          {albums?.map((item: any) => {
            return <li>
              <div className="u-cover" title={item.name}>
                <img src={`${item.picUrl}?param=120y120`} />
                <a href={`/album?id=${item.id}`} className="msk"></a>
                <a className="icon-play" title="播放"></a>
              </div>
              <p className="dec" title={item.name}>
                <Link to={`/album?id=${item.id}`} className="tit">{item.name}</Link>
              </p>
              <p><span className="time">{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</span></p>
            </li>
          })}
        </ul>
        <Pagination
          className="pagination"
          hideOnSinglePage
          current={pageNo + 1}
          defaultPageSize={12}
          total={artist.albumSize}
          showSizeChanger={false}
          size="small"
          onChange={(e) => {
            this.setState({
              pageNo: e - 1,
            }, () => {
              this.getData(e - 1);
              window.scrollTo({
                top: 300,
              });
            })
          }}
        />
      </div>
    } else if (type === '3') {
      return <div className="desc-wrap">
        <h2><i>&nbsp;</i>{artist.name}简介</h2>
        <p>{desc.briefDesc}</p>
        {desc.introduction?.map((item: any) => {
          return <>
            <h2>{item.ti}</h2>
            <p>{item.txt}</p>
          </>
        })}
      </div>
    }
  }

  render() {
    const { artist, songs, menuType, artistId, pageNo } = this.state;
    return <div className="artist-page">
      <div className="n-artist">
        <div className="btm">
          <h2 className="sname" title={artist.name}>{artist.name}</h2>
        </div>
        <img src={`${artist.picUrl}?param=640y300`} />
        <div className="mask"></div>
      </div>
      <ul className="m-tabs">
        {MenuType.map(item => {
          return <li key={item.type} className={item.type === menuType ? 'fst' : ''} onClick={() => {
            this.setState({
              menuType: item.type,
              pageNo: 0,
            });
            this.getData(0);
          }}><a className="z-slt"><em>{item.key}</em></a></li>
        })}
      </ul>
      <div className="content">
        {this.renderDetail(this.state.menuType)}
      </div>
    </div>
  }
}

export default Artist;