import React from 'react';
import { commentLike, getAlbumDetail, getMusicDetail, getAlbumCommentList, sendComment } from '@services/index';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Table, Input, Comment, List, Pagination, message, Avatar } from 'antd';
import qs from 'querystring';
import moment from 'moment';
import './index.less'
import { checkLogin } from '@utils/checkers';


const { TextArea } = Input;

interface IProps extends RouteComponentProps {
  MusicList: any;
}

interface IState {
  albumId: string;
  albumSongsDetail: any;
  albumDetail: any;
  showDesc: boolean;
  pageNo: number;
  myComment: string;
  commentList: any;
}

@inject('MusicList')
@observer
class Album extends React.Component<IProps> {
  state: IState = {
    albumId: '',
    albumSongsDetail: [],
    albumDetail: [],
    showDesc: false,
    pageNo: 0,
    myComment: '',
    commentList: {}
  }

  componentDidMount = async () => {
    let albumId = qs.parse(this.props.location.search.replace(/^\?/, '')).id;
    const res = await (await getAlbumDetail({ id: +albumId })).data;
    const comment = await (await getAlbumCommentList({ id: +albumId })).data;
    this.setState({
      albumId,
      albumSongsDetail: res.songs,
      albumDetail: res.album,
      commentList: comment,
    });
  }

  getCommentList = async () => {
    const { albumId, pageNo } = this.state;
    const comment = await (await getAlbumCommentList({ id: +albumId, pageNo: pageNo })).data;
    this.setState({
      commentList: comment,
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

  renderComment = (item: any) => {
    return <Comment
      key={item.commentId}
      author={<Link to={`/user/home?id=${item.user.userId}`} className="author" >{item.user.nickname}</Link>}
      avatar={<div onClick={() => {
        this.props.history.push(`/user/home?id=${item.user.userId}`);
      }}><Avatar src={item.user.avatarUrl} /></div>}
      content={
        <div>
          {item.content}
        </div>
      }
      datetime={(
        <div className="time">
          {moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
          <a>
            <i className={`zan ${item.liked ? 'liked' : ''}`} onClick={async () => {
              if (!checkLogin()) return message.error('请登录！');
              let t = item.liked ? 0 : 1;
              const res = await (await commentLike({
                t,
                type: 3,
                id: +this.state.albumId,
                cid: item.commentId,
              })).data;
              if (res.code === 200) {
                this.getCommentList();
              } else {
                message.error('点赞失败！请稍后重试！')
              }
            }}></i> ({item.likedCount})
        </a>
        </div>
      )}
    >
      {item.beReplied?.map((rItem: any) => {
        return this.renderComment(rItem)
      })}
    </Comment>
  }

  render() {
    const { albumDetail, albumSongsDetail, showDesc, myComment, albumId, commentList, pageNo } = this.state;
    const desc = albumDetail.description?.split('\n').filter((item: string) => {
      if (item) return item;
    });
    console.log(albumDetail, 'as');
    return <div className="album-page">
      <div className="music-info clear">
        <div className="cover">
          <img src={`${albumDetail?.blurPicUrl}?param=177y177`} className="j-img" />
          <span className="msk"></span>
        </div>
        <div className="info">
          <div className="content">
            <div className="hd clear">
              <i className="icn"></i>
              <div className="tit">
                <h2 >{albumDetail?.name}</h2>
              </div>
            </div>
            <div className="intr clear">
              <b>歌手：</b>
              <span>
                {albumDetail.artists?.map((item: any, index: number) => {
                  return <span key={index}>
                    <Link to={`/artist?id=${item.id}`}>{item.name}</Link>
                    {albumDetail?.artists.length - 1 !== index ? ' / ' : ''}
                  </span>
                })}
              </span>
            </div>
            <p className="intr">
              <b>发行时间：</b>{moment(albumDetail?.publishTime).format('YYYY-MM-DD')}
            </p>
            <p className="intr">
              <b>发行公司：</b>{albumDetail?.company}
            </p>
            <div className="action clear">
              <a className="play" title="播放" onClick={() => {
                if (albumSongsDetail.length === 0) {
                  message.error("暂无版权，抱歉");
                  return;
                }
                this.props.MusicList.changePlayList(albumSongsDetail);
              }}>
                <i>
                  <em className="ply"></em>播放
                </i>
              </a>
              <a className="add" title="添加到播放列表" onClick={() => {
                this.props.MusicList.addPlayList(albumDetail.tracks);
              }}></a>
            </div>
          </div>
          <div className="description">
            <h3>专辑介绍：</h3>
            <div className="brk">
              {desc?.slice(0, 4).map((item: string) => {
                if (item) {
                  return <p>{item}</p>;
                }
              })}
            </div>
            <div className="brk" style={{
              display: `${showDesc ? 'block' : 'none'}`
            }}>
              {desc?.slice(4).map((item: string) => {
                if (item) {
                  return <p>{item}</p>;
                }
              })}
            </div>
            {desc?.length > 4 ? <div className="crl" onClick={() => {
              this.setState({
                showDesc: !showDesc,
              })
            }}>
              <a className="open">
                {showDesc ? '收起' : '展开'}
                <i className={`icn ${showDesc ? 'icn-open' : ''}`}></i>
              </a>
            </div> : null}
          </div>
        </div>
      </div>
      <div className="music-table clear">
        <div className="u-title">
          <h3>
            <span className="list">歌曲列表</span>
          </h3>
          <span className="sub">
            <span>{albumSongsDetail?.length}</span>首歌
          </span>
        </div>
        <div className="table-wrap">
          <Table
            className="my-table"
            columns={this.renderColumns()}
            dataSource={albumSongsDetail}
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
      <div className="music-comment">
        <div className="title">
          <h3>
            <span className="comment">评论</span>
          </h3>
          <span className="sub">
            共<span>{commentList.total}</span>条评论
          </span>
        </div>
        <div className="my-comment clear">
          <div id="music-comment" className="input-wrap">
            <div className="head">
              <img src="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=50y50" />
            </div>
            <div>
              <div className="inp">
                <div className="inp-wrap">
                  <TextArea className="ii" rows={3} maxLength={140} value={myComment} onChange={(e) => {
                    this.setState({
                      myComment: e.target.value,
                    })
                  }} />
                </div>
                <div className="btns">
                  <a className="btn" onClick={async () => {
                    let content = myComment.trim();
                    if (!checkLogin()) return message.error('请登录！');
                    if (!content) return message.warning('请填写内容！');
                    const res = await (await sendComment({
                      t: 1,
                      type: 3,
                      id: +albumId,
                      content,
                    })).data;
                    if (res.code === 200) {
                      message.success("评论成功！");
                      this.setState({
                        myComment: '',
                      })
                      this.getCommentList();
                    } else {
                      message.error('评论失败！请稍后重试！')
                    }
                  }}>评论</a>
                  <span>{140 - myComment.length}</span>
                </div>
                <div className="corr">
                  <em className="arrline">◆</em>
                  <span className="arrclr">◆</span>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-list-wrap">
            {commentList.hotComments?.length > 0 ?
              <List
                className="comment-list-top"
                header="精彩评论"
                itemLayout="horizontal"
                dataSource={commentList.hotComments}
                renderItem={(item: any) => (
                  <li>
                    {this.renderComment(item)}
                  </li>
                )}
              /> : null}
            <List
              className="comment-list"
              header={`最新评论(${commentList?.total || ''})`}
              itemLayout="horizontal"
              dataSource={commentList.comments}
              renderItem={(item: any) => (
                <li>
                  {this.renderComment(item)}
                </li>
              )}
            />
            <Pagination
              className="pagination"
              hideOnSinglePage
              current={pageNo + 1}
              defaultPageSize={20}
              total={commentList.total}
              showSizeChanger={false}
              size="small"
              onChange={(e) => {
                this.setState({
                  pageNo: e - 1,
                }, () => {
                  this.getCommentList();
                  window.scrollTo({
                    top: 800,
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

export default Album;