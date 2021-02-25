export function phone(val?: string) {
  if (val && !/^(86)?\d{11}$/.test(val)) {
    return '手机号必须为 11 位数字';
  }
}