import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import qs from 'querystring';
import { Input, Comment, List, Pagination, message } from 'antd';
import { sendComment, commentLike, getSongCommentList, getMusicDetail } from '@services/index';
import moment from 'moment';
import { checkLogin } from '@utils/checkers';
import './index.less';

const { TextArea } = Input;

interface IState {
  songId: string | string[],
  songDetail: any,
  playing: any,
  commentList: any,
  pageNo: number,
  myComment: string,
}

interface IProps extends RouteComponentProps {
  MusicList: any;
}

@inject('MusicList')
@observer
class SongDetail extends React.Component<IProps, IState> {
  state: IState = {
    songId: '0',
    songDetail: {},
    playing: {},
    commentList: {},
    pageNo: 0,
    myComment: '',
  }


  componentDidMount = async () => {
    let songId = qs.parse(this.props.location.search.replace(/^\?/, '')).id
    const songDetail = await (await getMusicDetail({ id: +songId })).data;
    const commentList = await (await getSongCommentList({ id: +songId })).data;
    this.setState({
      songId,
      commentList,
      songDetail: songDetail.songs[0],
    });
  }

  getCommentList = async () => {
    const { songId, pageNo } = this.state;
    const comment = await (await getSongCommentList({ id: +songId, pageNo: pageNo })).data;
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

  renderComment = (item: any) => {
    return <Comment
      key={item.commentId}
      // actions={item.actions}
      author={<a className="author">{item.user.nickname}</a>}
      avatar={item.user.avatarUrl}
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
                id: +this.state.songId,
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
    const { songDetail, commentList, pageNo, myComment, songId } = this.state;
    const { playing } = this.props.MusicList;
    return <div className="song-detail">
      <div className="song-info clear">
        <div className="cvr-wrap">
          <div className="u-cover">
            <img src={`${songDetail.al?.picUrl}?param=130y130`} className="j-img" />
            <span className="msk"></span>
          </div>
        </div>
      </div>
      <div className="song-comment">
        <div className="title">
          <h3>
            <span className="comment">评论</span>
          </h3>
          <span className="sub">
            共<span>{songDetail.trackCount}</span>条评论
          </span>
        </div>
        <div className="my-comment clear">
          <div className="input-wrap">
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
                      type: 0,
                      id: +songId,
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

export default SongDetail;