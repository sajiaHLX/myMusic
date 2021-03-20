import React from 'react';
import { getMusicUrl, checkMusic } from '@services/index';
import { inject, observer } from 'mobx-react';
import { Slider, message } from 'antd';
import './index.less'

const PlayType = [
  {
    className: 'icn-loop',
    title: '循环',
  },
  {
    className: 'icn-shuffle',
    title: '随机',
  },
  {
    className: 'icn-one',
    title: '单曲循环',
  }
]

interface IAppProps {
  MusicList?: any  //  这里比较关键 ？表示可或缺，如果没有就会报错。
}

@inject('MusicList')
@observer
class MyPlayBar extends React.Component<IAppProps> {
  audioRef: HTMLAudioElement | null = null;
  myInterval: number | undefined;
  playTypeIndex: number = 0;

  constructor(props: IAppProps) {
    super(props);
  }

  state = {
    isLock: false,
    isShowVoice: false,
    url: '',
    stop: false,
    musicLong: 0,
    nowTime: 0,
    playing: this.props.MusicList.playing,
  }

  componentDidMount = async () => {
    let { musicList, playing } = this.props.MusicList;
    if (musicList.length === 0) return;
    playing = musicList[0];
    this.setState({
      playing,
    }, () => {
      this.getMusicUrl();
    })
  }

  getMusicUrl = async (play?: boolean) => {
    let { playing, playIndex, musicList } = this.props.MusicList;
    if (!playing) return;
    checkMusic({ id: playing.id }).then(async (resolve) => {
      if (!playing) return;
      const res = await (await getMusicUrl({ id: playing.id })).data;
      this.setState({
        url: res.data[0].url,
      }, () => {
        if (play) {
          if (!this.audioRef) return;
          this.getTime();
          this.audioRef.play();
        }
      });
    }).catch(err => {
      window.clearInterval(this.myInterval);
      message.error("版权方要求，当前专辑需单独付费，购买数字专辑即可无限畅享，自动播放下一首");
      if (playIndex === musicList.length - 1) {
        playIndex = 0;
      } else {
        playIndex += 1;
      }
      this.props.MusicList.setPlayIndex(playIndex);
      return;
    })
  }

  getTime = () => {
    window.clearInterval(this.myInterval);
    const { musicLong } = this.state;
    if (this.audioRef) {
      this.myInterval = setInterval(() => {
        if (!this.audioRef) return;
        if (this.audioRef.currentTime === this.audioRef.duration) {
          if (this.playTypeIndex === 0) {
            this.playNext();
          } else if (this.playTypeIndex === 1) {
            // 随机
          } else if (this.playTypeIndex === 2) {
            this.audioRef.currentTime = 0;
            this.audioRef.play();
          }
        }
        if (musicLong !== this.audioRef.duration) {
          this.getTotalTime();
        }
        this.setState({
          nowTime: this.audioRef.currentTime,
          stop: true,
        });
      }, 1000) as unknown as number
    }
  }

  getTotalTime = () => {
    if (this.audioRef?.duration) {
      this.setState({
        musicLong: this.audioRef.duration,
      });
      return this.audioRef.duration;
    }
    return 0;
  }

  playPrev = () => {
    const { musicList, playIndex } = this.props.MusicList;
    window.clearInterval(this.myInterval);
    if (playIndex > 0) {
      this.setState({
        playing: musicList[playIndex - 1],
        stop: true,
      }, () => {
        this.getMusicUrl(true);
        this.props.MusicList.setPlayIndex(playIndex - 1);
      });
    } else {
      this.setState({
        playing: musicList[musicList.length - 1],
        stop: true,
      }, () => {
        this.getMusicUrl(true);
        this.props.MusicList.setPlayIndex(musicList.length - 1);
      });
    }
  }

  playNext = () => {
    const { musicList, playIndex } = this.props.MusicList;
    window.clearInterval(this.myInterval);
    if (playIndex < musicList.length - 1) {
      this.setState({
        playing: musicList[playIndex + 1],
        stop: true,
      }, () => {
        this.getMusicUrl(true);
        this.props.MusicList.setPlayIndex(playIndex + 1);
      });
    } else {
      this.setState({
        playing: musicList[0],
        stop: true,
      }, () => {
        this.getMusicUrl(true);
        this.props.MusicList.setPlayIndex(0);
      });
    }
  }

  dealTime = (duration: number) => {
    let time = '00:00'
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);
    time = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    return time
  }

  storeChange = (playing: any) => {
    if (playing?.id !== this.state.playing?.id) {
      this.setState({
        playing: this.props.MusicList.playing,
      }, () => {
        this.getMusicUrl(true);
      });
    }
  }

  render() {
    const { isLock, isShowVoice, stop, musicLong, playing } = this.state;
    this.storeChange(this.props.MusicList.playing);
    let showVoice: 'visible' | 'hidden' = `${isShowVoice ? 'visible' : 'hidden'}` as 'visible' | 'hidden';
    return (
      <div className="wrap">
        <div className={`my-play-bar ${isLock ? 'lockBar' : ''}`}>
          <div className="updn">
            <div className="left">
              <a className={`btn ${isLock ? 'lock' : ''}`} onClick={() => {
                this.setState({
                  isLock: !isLock,
                })
              }}></a>
            </div>
            <div className="right"></div>
          </div>
          <div className="bg"></div>
          <div className="action-wrap">
            <div className="btns">
              <a className="prv" title="上一首(ctrl+←)" onClick={() => {
                this.playPrev();
              }}>上一首</a>
              <a className={`ply ${stop ? 'stop' : ''}`} title="播放/暂停(p)" onClick={() => {
                if (!stop) {
                  this.audioRef?.play();
                  this.getTime();
                } else {
                  this.audioRef?.pause();
                  window.clearInterval(this.myInterval);
                }
                this.setState({
                  stop: !stop,
                })
              }}>播放/暂停</a>
              <a className="nxt" title="下一首(ctrl+→)" onClick={() => {
                this.playNext();
              }}>下一首</a>
            </div>
            <div className="head">
              {playing ? <>
                <img src={`${playing.al.picUrl}?param=34y34`} />
                <a href={`/song?id=${playing.id}`} className="mask"></a>
              </> : <>
                <img />
                <a className="mask"></a>
              </>}
            </div>
            <div className="play">
              {playing ? <div className="words">
                <a href={`/song?id=${playing.id}`} className="name" title={playing.name}>{playing.name}</a>
                <span className="by">
                  {
                    playing.ar.map((item: { name: string; id: number; }, index: number) => {
                      return <span key={index} title={item.name}>
                        <a className="" href={`/artist?id=${item.id}`}>{item.name}</a>
                        {playing.ar.length === index + 1 ? '' : '/'}
                      </span>
                    })
                  }
                </span>
              </div> : <div className="words">
                <a className="name" ></a>
                <span className="by">
                </span>
              </div>}
              <div className="m-pbar">
                <div className="barbg" id="barbg">
                  <Slider className="my-slider" tipFormatter={null} value={this.state.nowTime} max={musicLong} onChange={(e: number) => {
                    if (!this.audioRef) return;
                    this.audioRef.currentTime = e;
                    this.setState({
                      nowTime: e
                    })
                  }} />
                </div>
                <span className="time"><em>{this.dealTime(this.state.nowTime)}</em> / {this.dealTime(this.state.musicLong)}</span>
              </div>
            </div>
            <div className="oper">
              <a className="icn-add" title="收藏">收藏</a>
              <a className="icn-share" title="分享">分享</a>
            </div>
            <div className="ctrl">
              <div className="m-vol" style={{ visibility: showVoice }}>
                <div className="barbg"></div>
                <div className="vbg">
                  <Slider className="my-slider" vertical defaultValue={100} onChange={(e: number) => {
                    if (!this.audioRef) return;
                    this.audioRef.volume = e / 100;
                  }} />
                </div>
              </div>
              <a className="icn-vol" onClick={() => {
                this.setState({
                  isShowVoice: !isShowVoice,
                })
              }}></a>
              <a className={PlayType[this.playTypeIndex].className} title={PlayType[this.playTypeIndex].className} onClick={() => {
                this.playTypeIndex = this.playTypeIndex >= 2 ? 0 : this.playTypeIndex + 1
              }} />
              <span className="add f-pr">
                <span className="tip" style={{ display: 'none' }}>已添加到播放列表</span>
                <a title="播放列表" className="icn-list">{this.props.MusicList.musicList.length}</a>
              </span>
              <div className="tip tip-1" style={{ display: 'none' }}>循环</div>
            </div>
          </div>

        </div>
        <audio ref={ref => {
          this.audioRef = ref
        }} src={this.state.url}></audio>
      </div>
    )
  }
}

export default MyPlayBar;