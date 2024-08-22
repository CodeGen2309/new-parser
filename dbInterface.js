import { Database } from "sqlite-async"

export default class {
  constructor () {
    this.conn
  }

  async openConn () {
    let db = await Database.open('autoitems.sqlite', Database.OPEN_READWRITE)
    this.conn = db
    return this.conn
  }

  async closeConn () {
    await this.conn.close()
    return this.conn
  }

  setupInsertQuery (item) {
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

  
  async insertItemsInTable (items) {
    let rawData, db, req, res
  
    db = await Database.open('autoitems.sqlite', Database.OPEN_READWRITE)
    
    for (let item of rawData) {
      req = setupString(item)
      res = db.exec(req)
    }
  
    db.close()
  }
 

  async getFields (field = '*') {
    let query  = `SELECT ${field} FROM products`
    let db = await Database.open('autoitems.sqlite', Database.OPEN_READWRITE)
    let res = await db.all(query)
  
    await db.close()  
    return res
  }


  async insertImg (article, link) {
    let query, req

    query = `
      UPDATE products
      SET img = '${link}'
      WHERE article = '${article}'
      AND img IS NULL
    `

    req = await this.conn.exec(query)
    return req
  }
}