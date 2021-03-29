export function phone(val?: string) {
  if (val && !/^(86)?\d{11}$/.test(val)) {
    return '手机号必须为 11 位数字';
  }
}

export function checkLogin() {
  let token = window.localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}

export function getProfile() {
  let p = window.localStorage.getItem('profile');
  if (p) {
    return JSON.parse(p);
  }
  return {
    avatarUrl: 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg',
  };
}