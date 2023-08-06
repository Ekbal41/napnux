function wslash(x) {
  return x.charCodeAt(0) === 47 ? x : "/" + x;
}

function base(x) {
  let y = x.indexOf("/", 1);
  return y > 1 ? x.substring(0, y) : x;
}
function mutate(str, req) {
  req.url = req.url.substring(str.length) || "/";
  req.path = req.path.substring(str.length) || "/";
}

module.exports = {
  wslash,
  base,
  mutate,
};