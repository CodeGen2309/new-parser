export default class {
  async openSession () {
    let url, req, res
  
    url = `
      http://web.nirax.ru/api/index.php?
      action=sessionOpen&
      login=jrjcdr&
      password=ZaEbAlI2309&
      keySoftware=Cross
    `
  
    req = await fetch(url)
    res = null
  
    if (req.ok) { res = await req.json() }
    else { console.log(req) }
    return res.idSession
  }
  

  async closeSession (session) {
    let url, res, req
    
    url = `
      http://web.nirax.ru/api/index.php?
      action=sessionClose&
      login=jrjcdr&
      password=ZaEbAlI2309&
      keySoftware=Cross&
      idSession=${session}
    `

    req = await fetch(url)
    res = null

    if (req.ok) { res = await req.json() }
    else { console.log(req) }
    return res
  }


  async getArticle (session, code) {
    let url, res, req
    
    url = `
      http://web.nirax.ru/api/index.php?
      action=getArticlesSearchCode&
      idSession=${session}&
      keySoftware=Cross&
      FoundString=${code}
    `
    req = await fetch(url)
    res = null
  
    if (req.ok) { res = await req.json() }
    else { console.log(req) }
    return res
  }


  async niraxSearch (code) {
    let open = await this.openSession()
    let sessionID = open.idSession
  
    let article = await this.getArticle(sessionID, code)
    let close = await this.closeSession(sessionID)
    return article
  }  
}