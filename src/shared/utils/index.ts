export const getRandomString = (digit: number = 4): string => {
  let str = '';
  for (let i = 0; i < digit; ++i) {
    str += Math.floor(Math.random() * 9).toString();
  }
  return str;
};
