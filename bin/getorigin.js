const parse = require('parse-git-config')
 
const parsed = parse.sync()

const remoteOrigin = parsed[`remote "origin"`]

if(!remoteOrigin){
  console.log("ERROR no origin")
  process.exit(1)
}

let url = remoteOrigin.url

if(!url){
  console.error("ERROR no url for origin")
  process.exit(1)
}

const urlParts = url.split(new RegExp("\/+"))

console.log("url", url, "parts", urlParts)

if(urlParts[1].match("@")){
  urlParts[1] = urlParts[1].split("@")[1]
  url = `${urlParts[0]}//${urlParts[1]}/${urlParts[2]}/${urlParts[3]}`
  console.log("new parts", urlParts, "new url", url)
}

require('fs').writeFileSync("bin/exportorigin.sh", `
export GIT_REMOTE_ORIGIN_URL="${url}"
export GIT_PUSH_URL="${urlParts[0]}//${urlParts[2]}:${process.env["GIT_TOKEN"]}@${urlParts[1]}/${urlParts[2]}/${urlParts[3]}"
export GIT_USER_EMAIL="${urlParts[2]}@gmail.com"
export GIT_USER_NAME="${urlParts[2]}"
`)