const query = {
  where: { replace: [{ col: 'clientUrn', data: 'clientUrns' }] },
  include: [
    {
    model: 'models.location',
    where: { replace: [{ col: 'clientUrn', data: 'clientUrns' }] },
    include: [{
      model: 'models.linkDiscoverer',
      where: { replace: [{ col: 'locationurn', data: 'locationUrns' }] }
    }
    ]
  },
  {
    model: 'models.salesforceAccount',
    where: {
      replace: [{ col: 'locationurn', data: 'locationUrns' }]
    }
  }],
  order: [
    ['models.location', 'models.linkDiscoverer', 'createdAt', 'DESC']
  ]
}
const userPerms = {
  clientUrns: ['urn1'],
  locationUrns: ['locUrn']
}
// const query = {
//   where: {
//     id: 4,
//     replace: [{ col: 'clientUrn', data: 'clientUrns' }]
//   },
//   include: [{
//     model: 'models.location',
//     where: {
//       id: 4,
//       replace: [{ col: 'clientUrn', data: 'clientUrns' }]
//     }
//   }],
//   order: [
//     ['models.location', 'models.linkDiscoverer', 'createdAt', 'DESC']
//   ]
// }

function recursivelyReplace(obj, userPerms) {
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
          obj[k][i] = recursivelyReplace(obj[k][i], userPerms)
        }
      }
    }
  }
  return obj
}
