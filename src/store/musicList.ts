import { action, observable } from "mobx";
import { threadId } from "worker_threads";

export interface Playing {
  name: string,
  id: number,
  ar: {
    id: number,
    name: string,
  }[],
  al: {
    id: number,
    name: string,
    picUrl: string,
  },
  mv: number,
}

class MusicList {
  @observable onChange: boolean = false;

  @observable musicList: any[] = [];

  @observable playing: any | undefined = undefined;

  @observable playIndex: number = 0;

  @action addList = (music: any) => {
    this.musicList.push(music)
  }

  @action setPlayIndex = (num: number) => {
    this.playIndex = num;
    this.playing = this.musicList[num];
  }

  @action getUserPlayList = async () => {
    let musicList = window.localStorage.getItem('musicList')
    if (musicList) {
      musicList = JSON.parse(musicList);
    }
  }

  @action changePlaying = (music: any) => {
    this.playing = music
  }

  @action checkRepetition = (newMusic: any) => {
    let res = this.musicList.filter((item: any, index: number) => {
      if (item.id === newMusic.id) {
        this.playIndex = index;
        return true;
      }
    })
    if (res.length === 0) {
      this.addList(newMusic);
      this.playIndex = this.musicList.length - 1;
    }
    this.playing = { ...newMusic };
    this.onChange = true;
  }

  @action changePlayList = (newMusicList: any) => {
    this.musicList = newMusicList;
    this.playIndex = 0;
    this.playing = newMusicList[0];
  }
}

const musicList = new MusicList();
export default musicList;