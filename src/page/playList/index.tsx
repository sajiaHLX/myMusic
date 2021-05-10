import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import qs from 'querystring';
import { Table, Input, Comment, List, Pagination, message, Avatar } from 'antd';
import { getPlayList, getMusicDetail, getCommentList, sendComment, commentLike } from '@services/index';
import moment from 'moment';
import { checkLogin, getProfile } from '@utils/checkers';
import './index.less';

const { TextArea } = Input;

interface IState {
  playListId: string | string[],
  playListDetail: any,
  commentList: any,
  pageNo: number,
  myComment: string,
}

interface IProps extends RouteComponentProps {
  MusicList: any;
}

@inject('MusicList')
@observer
class PlayList extends React.Component<IProps, IState> {
  state: IState = {
    playListId: '0',
    playListDetail: {},
    commentList: {},
    pageNo: 0,
    myComment: '',
  }


  componentDidMount = async () => {
    window.scrollTo({
      top: 0,
    });
    let playListId = qs.parse(this.props.location.search.replace(/^\?/, '')).id
    const res = await (await getPlayList({ id: +playListId })).data;
    const comment = await (await getCommentList({ id: +playListId })).data;
    this.setState({
      playListId,
      playListDetail: res.playlist,
      commentList: comment,
    });
  }

  getCommentList = async () => {
    const { playListId, pageNo } = this.state;
    const comment = await (await getCommentList({ id: +playListId, pageNo: pageNo })).data;
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
                type: 2,
                id: +this.state.playListId,
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

  getElementToPageTop: any = (el: any) => {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
  }

  render() {
    const { playListDetail, commentList, pageNo, myComment, playListId } = this.state;
    const { playing } = this.props.MusicList;
    return <div className="play-list-detail">
      <div className="music-info clear">
        <div className="cover">
          <img src={`${playListDetail?.coverImgUrl}?param=200y200`} className="j-img" />
          <span className="msk"></span>
        </div>
        <div className="info">
          <div className="content">
            <div className="hd clear">
              <i className="icn"></i>
              <div className="tit">
                <h2 >{playListDetail?.name}</h2>
              </div>
            </div>
            <div className="user clear">
              <span className="face">
                <img src={`${playListDetail?.creator?.avatarUrl}?param=40y40`} />
              </span>
              <span className="name">
                <a href={`/user/home?id=${playListDetail?.creator?.userId}`}>{playListDetail?.creator?.nickname}</a>
              </span>
              <span className="time s-fc4">{moment(playListDetail?.createTime).format('YYYY-MM-DD')}&nbsp;创建</span>
            </div>
            <div className="action clear">
              <a className="play" title="播放" onClick={() => {
                this.props.MusicList.changePlayList(playListDetail.tracks);
              }}>
                <i>
                  <em className="ply"></em>播放
                  </i>
              </a>
              <a className="add" title="添加到播放列表" onClick={() => {
                this.props.MusicList.addPlayList(playListDetail.tracks);
              }}></a>
            </div>
            <div className="tags clear">
              <b>标签：</b>
              {playListDetail.tags?.map((item: string, index: number) => {
                return <a key={index} className="u-tag">
                  <i>{item}</i>
                </a>
              })}
            </div>
            <p className="intr clear">
              <b>介绍：</b>
              {playListDetail?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="music-table clear">
        <div className="u-title">
          <h3>
            <span className="list">歌曲列表</span>
          </h3>
          <span className="sub">
            <span>{playListDetail.trackCount}</span>首歌
          </span>
          <div className="more">播放：
            <strong id="play-count">{playListDetail?.playCount}</strong>次
          </div>
        </div>
        <div className="table-wrap">
          <Table
            className="my-table"
            columns={this.renderColumns()}
            dataSource={playListDetail.tracks}
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
            共<span>{playListDetail.trackCount}</span>条评论
          </span>
        </div>
        <div className="my-comment clear">
          <div id="music-comment" className="input-wrap">
            <div className="head">
              <img src={`${getProfile()?.avatarUrl}?param=50y50`} />
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
                      type: 2,
                      id: +playListId,
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

export default PlayList;