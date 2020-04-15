export default (timeout: number | undefined = 0) =>
  new Promise(res => setTimeout(res, timeout));
