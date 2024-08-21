import nirax from "./nirax.js";
import { Database } from "sqlite-async"
import fs from "fs/promises"




async function getRawData () {
  let file = await fs.readFile('raw.json')
  let data = JSON.parse(file)
  return data
}


function setupString (item) {
  let props = []
  let values = []
  let reqString = ''

  for (let prop in item) {
    props.push(`'${prop}'`)
    values.push(`'${item[prop]}'`)
  }

  reqString = `INSERT INTO products (${props.join()}) VALUES (${values.join()})`
  return reqString
}


async function insertDataInTable () {
  let rawData, db, req, res

  rawData = await getRawData()
  db = await Database.open('autoitems.sqlite', Database.OPEN_READWRITE)
  console.log(db);
  
  
  for (let item of rawData) {
    req = setupString(item)
    res = db.exec(req)
  }

  db.close()
}


async function getArticles () {
  let query  = 'SELECT article FROM products'
  let db = await Database.open('autoitems.sqlite', Database.OPEN_READWRITE)
  let res = await db.all(query)
  await db.close()
  
  console.log(res);
  console.log(db);
}


async function main () {
  let nrx, req, res, reqString

  // nrx = new nirax()
  // req  = await nrx.niraxSearch('12120039664')
  // console.log(req);
  // code = 'A6420943004'
  // testBase()

}

getArticles()