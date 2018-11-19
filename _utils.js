
// ['port=1024'] to { port: '1024' }
function arr2obj(args) {
  if (!args || !args.length) {
    return {}
  }
  let resault = {}
  args.forEach(arg => {
    if (arg && typeof arg === 'string') {
      let [key, value] = arg.split('=');
      resault[key] = value;
    }
  })
  return resault;
}

module.exports = {
  arr2obj,
}