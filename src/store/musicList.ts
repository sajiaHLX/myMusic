import { action, observable } from "mobx";

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
  @observable userInfo: any = JSON.parse(window.localStorage.getItem('profile') || '');

  @observable onChange: boolean = false;

  @observable musicList: any[] = [];

  @observable playing: any | undefined = undefined;

  @observable playIndex: number = 0;

  @action addList = (music: any) => {
    let res = this.musicList.filter((item: any, index: number) => {
      if (item.id !== music.id) {
        return true;
      }
    })
    if (res.length === this.musicList.length) {
      this.musicList.push(music)
    }
  }

  @action setPlayIndex = (num: number) => {
    this.playIndex = num;
    this.playing = this.musicList[num];
  }

  @action delMusicList = (music: any) => {
    this.musicList = this.musicList.filter((item, index) => {
      if (item.id !== music.id) {
        return true
      } else {
        if (index < this.playIndex) {
          this.playIndex -= 1;
        } else if (index === this.playIndex) {
          this.playIndex += 1;
          this.playing = this.musicList[this.playIndex];
        }
      }
    })
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

  @action addPlayList = (newList: any) => {
    let json = this.musicList.concat(newList); //两个数组对象合并
    for (let item1 of json) {  //循环json数组对象的内容
      let flag = true;  //建立标记，判断数据是否重复，true为不重复
      for (let item2 of this.musicList) {  //循环新数组的内容
        if (item1.id == item2.id) { //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
          flag = false;
        }
      }
      if (flag) { //判断是否重复
        this.musicList.push(item1); //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
      }
    }
    // this.musicList
  }

}

const musicList = new MusicList();
export default musicList;