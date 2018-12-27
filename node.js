const ParseData = require('./parse.json');
const fs = require('fs');

const uniqueDataArray = [];

ParseData.forEach(data => {
  if (!uniqueDataArray.some((d) => d.url === data.url)) {
    uniqueDataArray.push(data);
  }
});

uniqueDataArray.forEach((d, i) => {
  d.id = i;
  d.name = `解析${i}号`;
});

uniqueDataArray.push({
  id: uniqueDataArray.length,
  name: '人人VIP视频网站解析',
  url: 'http://v.renrenfabu.com/jiexi.php?url=',
});

const json = JSON.stringify(uniqueDataArray);
fs.writeFile('parse2.json', json);
console.log(uniqueDataArray);

