const data = {
  code: 1,
  data: [
    {
      id: 1,
      name: 'data1',
    }
  ]
}

module.exports = {
  ['/api/data1'](res) {
    setTimeout(() => {
      res(data)
    }, 1000);
  }
}