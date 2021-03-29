import React from 'react';
import qs from 'querystring';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Input, Table, Pagination } from 'antd';
import { search, getMusicDetail } from '@services/index';
import { inject, observer } from 'mobx-react';
import './index.less';


interface Query {
  s: string,
  type: string,
  pageNo: number,
}

const SearchType = [
  {
    key: '单曲',
    type: '1',
  },
  {
    key: '歌手',
    type: '100',
  },
  {
    key: '专辑',
    type: '10',
  },
  {
    key: '歌词',
    type: '1006',
  },
];

const defaultUserImg = 'http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg'

interface IProps extends RouteComponentProps {
  MusicList: any
}

@inject('MusicList')
@observer
class SearchPage extends React.Component<IProps> {
  state = {
    search: '',
    searchII: '',
    searchType: '',
    pageNo: 0,
    searchResult: [],
    playing: {},
    dataSource: [],
    totalCount: 0,
  }

  componentDidMount = async () => {
    let query = qs.parse(this.props.location.search.replace(/^\?/, ''))
    this.startSearch({
      s: query.s as string,
      type: query.type as string,
      pageNo: 0,
    });
  }

  componentWillReceiveProps = (newProps: any) => {
    let query = qs.parse(newProps.location.search.replace(/^\?/, ''));
    this.setState({
      search: query.s,
      searchType: query.type,
      pageNo: 0,
    }, () => {
      this.startSearch({
        s: query.s as string,
        type: query.type as string,
        pageNo: 0,
      });
    });
  }

  startSearch = async (query: Query) => {
    const res = await (await search({
      keywords: query.s as string,
      type: +query.type,
      offset: query.pageNo,
    })).data;
    let searchResult = [];
    let totalCount = 0;
    if (query.type === '1' || query.type === '1006') {
      searchResult = res.result.songs;
      totalCount = res.result.songCount;
    } else if (query.type === '100') {
      searchResult = res.result.artists;
      totalCount = res.result.artistCount;
    } else if (query.type === '10') {
      searchResult = res.result.albums;
      totalCount = res.result.albumCount;
    }
    this.setState({
      search: query.s,
      searchType: query.type,
      searchResult,
      totalCount,
    });
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

  renderColumns = () => {
    return [
      {
        title: '',
        dataIndex: 'key',
        width: '17px',
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
        width: '370px',
        render: (item: any, record: any) => {
          return <div style={{
            width: '370px',
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
        title: '歌手',
        dataIndex: 'ar',
        width: '130px',
        render: (item: any) => {
          return <div style={{
            width: '130px',
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
            width: '156px',
          }} className="text">
            {item?.name}
          </div>
        }
      },
    ];
  }

  renderResult = (type: string) => {
    const { searchResult } = this.state;
    if (!searchResult) return <></>;
    if (type === '1' || type === '1006') {
      return <div>
        <Table
          showHeader={false}
          className="my-table"
          columns={this.renderColumns()}
          dataSource={searchResult}
          rowKey={item => item.id}
          pagination={false}
        />
      </div>
    } else if (type === '100') {
      return <div className="art clear">
        <ul>
          {searchResult.map((item: any) => {
            return <li>
              <div className="u-cover">
                <Link to={`/artist?id=${item?.id}`}>
                  <img src={`${item?.picUrl || defaultUserImg}?param=130y130`} />
                  <span title={item?.name} className="msk"></span>
                </Link>
              </div>
              <p className="title">
                <Link className="nm" to={`/artist?id=${item?.id}`} title={item?.name}>
                  <span className="s-fc7">{item?.name}</span>
                </Link>
              </p>
            </li>
          })}
        </ul>
      </div>
    } else if (type === '10') {
      return <div className="album clear">
        <ul>
          {searchResult.map((item: any) => {
            return <li>
              <div className="u-cover">
                <Link to={`/album?id=${item.id}`}>
                  <img src={`${item.picUrl}?param=180y180`} />
                  <span title={item.name} className="msk"></span>
                </Link>
                <a title="播放" className="icon-play"></a>
              </div>
              <p className="dec">
                <Link to={`/album?id=${item.id}`} className="tit" title={item.name}>
                  {item.name}
                </Link>
              </p>
              <p>
                <span className="nm" title="Beyond">
                  <Link to={`/artist?id=${item.artist?.id}`} className="singer">{item.artist?.name}</Link>
                </span>
              </p>
            </li>
          })}
        </ul>
      </div>
    }
  }

  render() {
    const { search, searchType } = this.state;
    return <div className="search-page">
      <div className="search-wrap">
        <Input className="search-input" onChange={(e: any) => {
          this.setState({
            searchII: e.target.value,
          });
        }} onPressEnter={(e: any) => {
          this.startSearch({
            s: e.target.value,
            type: this.state.searchType,
            pageNo: 0,
          });
          this.setState({
            searchII: e.target.value,
            pageNo: 0,
          })
        }}></Input>
        <a className="search-btn" onClick={() => {
          this.startSearch({
            s: this.state.searchII,
            type: this.state.searchType,
            pageNo: 0,
          });
          this.setState({
            search: this.state.searchII,
            pageNo: 0,
          })
        }}></a>
      </div>
      <div className="search-content">
        <div className="result">
          搜索“{search}”，找到
          <em>{this.state.totalCount}</em>
          项
        </div>
        <ul className="m-tabs">
          {SearchType.map(item => {
            return <li key={item.type} className={item.type === searchType ? 'fst' : ''} onClick={() => {
              this.props.history.replace(`/search?s=${search}&type=${item.type}`);
            }}><a className="z-slt"><em>{item.key}</em></a></li>
          })}
        </ul>
        <div className="search-result">
          {this.renderResult(searchType)}
          <div className="pagination">
            <Pagination
              className="my-p"
              defaultCurrent={1}
              total={this.state.totalCount}
              current={this.state.pageNo + 1}
              showSizeChanger={false}
              defaultPageSize={30}
              onChange={(e) => {
                this.setState({
                  pageNo: e - 1,
                }, () => {
                  this.startSearch({
                    s: this.state.search,
                    type: this.state.searchType,
                    pageNo: this.state.pageNo,
                  })
                  window.scrollTo({
                    top: 0,
                  });
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  }
}

export default SearchPage;