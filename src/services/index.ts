import axios from 'axios';

export const PhoneLogin = (params: { phone: string, password: string }) => axios.post(`/login/cellphone?timestamp=${Date.now()}`, params);

export const getHomePageBanner = () => axios.get('/banner?type=0');

export const getHotRecommendations = () => axios.get('/personalized');

export const getPersonalizedRecommendations = () => axios.get('/recommend/resource');

export const getNewCD = () => axios.get('/top/album');

export const getPlayList = (params: { id: number }) => axios.get(`/playlist/detail?id=${params.id}`)

export const getMusicUrl = (params: { id: number }) => axios.get(`/song/url?id=${params.id}`);

export const checkMusic = (params: { id: number }) => axios.get(`/check/music?id=${params.id}`);

export const getMusicDetail = (params: { id: number }) => axios.get(`/song/detail?ids=${params.id}`);

export const getCommentList = (params: { id: number, pageNo?: number }) => axios.get(`/comment/playlist?timestamp=${Date.now()}`, {
  params: {
    ...params,
    offset: params.pageNo ? params.pageNo * 30 : '',
  }
});

export const getSongCommentList = (params: { id: number, pageNo?: number }) => axios.get(`/comment/music?timestamp=${Date.now()}`, {
  params: {
    ...params,
    offset: params.pageNo ? params.pageNo * 30 : '',
  }
});

export const getAlbumCommentList = (params: { id: number, pageNo?: number }) => axios.get(`/comment/album?timestamp=${Date.now()}`, {
  params: {
    ...params,
    offset: params.pageNo ? params.pageNo * 30 : '',
  }
});

export const getRecommendSongs = () => axios.get('/recommend/songs');

export const getSongLyric = (params: { id: number }) => axios.get(`/lyric?id=${params.id}`);

export const sendComment = (params: {
  t: number,          // 1 发送, 2 回复
  type: number,       // 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  id: number,         // 对应资源 id
  content: string,    // 要发送的内容
  commentId?: string,  // 回复的评论id (回复评论时必填)
}) => axios.get(`/comment?t=${params.t}&type=${params.type}&id=${params.id}&content=${params.content}&commentId=${params.commentId || ''}`);

export const commentLike = (params: {
  t: number,          // 是否点赞 ,1 为点赞 ,0 为取消点赞
  type: number,       // 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  id: number,         // 对应资源 id
  cid: number,        // 评论id
}) => axios.get(`/comment/like?t=${params.t}&type=${params.type}&id=${params.id}&&cid=${params.cid}`);

export const search = (params: {
  keywords: string,
  offset: number,
  type: number,           //搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
}) => axios.get(`/cloudsearch?timestamp=${Date.now()}`, {
  params: {
    ...params,
    offset: params.offset * 30,
  }
});

export const getAlbumDetail = (params: { id: number }) => axios.get(`/album?id=${params.id}`);

export const getArtistDetail = (params: { id: number }) => axios.get(`/artists?id=${params.id}`);

export const getArtistAlbumDetail = (params: { id: number, offset: number }) => axios.get(`/artist/album`, {
  params: {
    ...params,
    offset: params.offset * 12,
    limit: 12,
  }
});

export const getArtistDescDetail = (params: { id: number }) => axios.get(`/artist/desc`, {
  params: {
    ...params,
  }
});

export const getUserInfoCount = () => axios.get('/user/subcount');

export const getUserInfo = () => axios.get('/user/account');

export const getUserFollow = (params: { uid: number, offset: number }) => axios.get('/artist/sublist', {
  params: {
    ...params,
    offset: params.offset * 100,
    limit: 100,
  }
});

export const getUserPlayList = (params: { uid: number, offset: number }) => axios.get(`/user/playlist?timestamp=${Date.now()}`, {
  params: {
    ...params,
    offset: params.offset * 100,
    limit: 100,
  }
});


export const createPlayList = (name: string) => axios.get('/playlist/create', {
  params: {
    name,
  }
});

export const deletePlayList = (id: number) => axios.get('/playlist/delete', {
  params: {
    id,
  }
});

export const updatePlayList = (id: string, name: string) => axios.get('/playlist/name/update', {
  params: {
    id,
    name,
  }
});

export const getUserSinger = () => axios.get('/artist/sublist');

export const addSingsToUserList = (params: {
  op: 'add' | 'del',
  pid: string, //歌单id，
  tracks: string, //歌曲id
}) => axios.get('/playlist/tracks', {
  params: {
    ...params,
  }
});


export const addPlayListToUserList = (params: {
  t: 1 | 2,//1:收藏,2:取消收藏
  id: string, //歌单id，
}) => axios.get('/playlist/subscribe', {
  params: {
    ...params,
  }
});







