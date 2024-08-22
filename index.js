import dbInterface from "./dbInterface.js"
import nirax from "./nirax.js"
import fs from "fs/promises"



async function insertOldImages () {
  let rawFile, data, tempArticle, tempImg,
  db, logs, conn

  rawFile = await fs.readFile('./oldres.json')
  data = JSON.parse(rawFile)
  db = new dbInterface()
  conn = await db.openConn()

  for (let item of data) {
    tempArticle = item.vin
    tempImg = item.article

    logs = await db.insertImg(tempArticle, tempImg)
    console.log(logs);
  }

  db.closeConn()
}




async function nirxImgs () {
  let inter = new dbInterface()
  let nrx = new nirax()
  
  let articles = await inter.getFields('article')
  let sessid = await nrx.openSession()
  console.log(sessid);
  
  
  await inter.openConn()
  
  for (let item of articles) {
    let art, search, img
  
    art = item.article
    search = await nrx.getArticle(sessid, art)
  
  
    if (!search.result) {
      console.log('Ошибка в поиске');
      continue
    }
  
    if (search.data.length == 0) {
      console.log('Поиск пустой');
      continue
    }
    
    img = search['data'][0]['FileImageFull']
    if (img == '') {  continue }
  
    inter.insertImg(art, img)
    console.log(img);
  }
  
  inter.closeConn()
  await nrx.closeSession(sessid)
}


async function main () {
}


insertOldImages()