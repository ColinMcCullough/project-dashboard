const mapUpdatables = {
  'G5Updatable::Client': 'clientUrn',
  'G5Updatable::Location': 'locationUrn'
}

module.exports = {
  dynamicFilter
}

function dynamicFilter(query, userRoles) {
  const userPerms = {}
  if (userRoles) {
    for (let i = 0; i < userRoles.length; i++) {
      
    }
  }
  // create client and location URN arrays
  return replaceWhere(query, userRoles)
}

function replaceWhere(obj, userPerms) {
  for (const k in obj) {
    // calls itself with next depth of object
    if (typeof obj[k] === 'object') {
      if (k === 'where' && !Array.isArray(obj[k]) && obj[k].replace) {
        obj[k].replace.forEach((r) => {
          obj[k][r.col] = userPerms[r.data]
        })
        delete obj[k].replace
      } else if (Array.isArray(obj[k]) && k === 'include') {
        for (let i = 0; i < obj[k].length; i++) {
          obj[k][i] = replaceWhere(obj[k][i], userPerms)
        }
      }
    }
  }
  return obj
}
