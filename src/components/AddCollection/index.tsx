import React from 'react';
import { render } from 'react-dom';
import { getUserPlayList, addSingsToUserList } from '@services/index';
import './index.less';
import { message } from 'antd';


interface IProps {
  userPlayList: any
  id: string;
}

class AddCollection extends React.Component<IProps> {
  ref: Node | null = null;
  state = {
    userPlayList: this.props.userPlayList || [],
    id: this.props.id || '',
  }

  removeChild = () => {
    if (this.ref) {
      const parent = this.ref.parentElement
      parent?.removeChild(this.ref);
      parent?.parentElement?.removeChild(parent);
    }
  }

  render() {
    const { userPlayList, id } = this.state;
    console.log(userPlayList);
    return <div className="add-collection-modal" ref={ref => this.ref = ref}>
      <div className="bar">
        <div className="add">添加到歌单</div>
      </div>
      <div className="content-wrap">
        <ul>
          {userPlayList?.map((item: any) => {
            return <li className="xtag" onClick={async () => {
              const res = await (await addSingsToUserList({ op: 'add', pid: item.id, tracks: id})).data;
              if(res.status === 200){
                message.success("添加成功！");
                this.removeChild();
                return;
              }else{
                message.error("添加失败！");
                return;
              }
              
            }}>
              <div className="item">
                <div className="left">
                  <a className="avatar">
                    <img alt="" src={`${item.coverImgUrl}?param=40y40`} />
                  </a>
                </div>
                <p className="name">
                  <a>{item.name}</a>
                </p>
                <p className="number">{item.trackCount}首</p>
              </div>
            </li>
          })}
        </ul>
      </div>
      <span className="close" title="关闭窗体" onClick={() => {
        this.removeChild();
      }}>×</span>
    </div>
  }
}

const AddCollectionModal = async (id: string) => {
  let p = window.localStorage.getItem('profile');
  if (!p) {
    message.error("请先登录！");
    return;
  }
  let userInfo = JSON.parse(p);
  const res = await (await getUserPlayList({ uid: userInfo.userId, offset: 0 })).data;
  let userPlayList: any = [];
  res.playlist?.map((item: any) => {
    if (!item.subscribed) {
      userPlayList.push(item);
    }
  })
  const div = document.createElement('div');
  document.body.appendChild(div);
  render(<AddCollection userPlayList={userPlayList} id={id} />, div);
}

export default AddCollectionModal;