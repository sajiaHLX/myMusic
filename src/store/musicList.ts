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
  @observable musicList: Playing[] = [
    {
      "name": "陷",
      "id": 1829850316,
      "ar": [
        {
          "id": 13057513,
          "name": "朱正廷",
        }
      ],
      "al": {
        "id": 124574443,
        "name": "陷",
        "picUrl": "http://p4.music.126.net/oybBmblKQJYZi0qLKocUYA==/109951165811454756.jpg",
      },
      "mv": 0,
    },
    {
      "name": "爱就一个字",
      "id": 1828026086,
      "ar": [
        {
          "id": 47091532,
          "name": "王赫野",
        }
      ],
      "al": {
        "id": 124351705,
        "name": "爱就一个字（吉他版）",
        "picUrl": "http://p3.music.126.net/sXY3pJFHq2WVDkv7tpWUJw==/109951165808483827.jpg",
      },
      "mv": 0,
    },
  ];

  @observable playing: Playing | undefined = undefined;

  @action addList = (music: Playing) => {
    this.musicList.push(music)
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
}

const musicList = new MusicList();
export default musicList;