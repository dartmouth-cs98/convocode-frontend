// General Use Functions


export function objToString(obj) {
  return Object.entries(obj).reduce((str, [p, val]) => {
    return str += `${val}`;
  }, '');
}