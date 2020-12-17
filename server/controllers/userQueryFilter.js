const mapUpdatables = {
  'G5Updatable::Client': 'clientUrn',
  'G5Updatable::Location': 'locationUrn'
}

module.exports = {
  dynamicFilter
}

function dynamicFilter(query, userRoles) {
  const query = {
    where: [{ col: 'clientUrn', data: 'clientUrns' }],
    include: [{
      model: models.location,
      where: [{ col: 'clientUrn', data: 'clientUrns' }],
      include: [{
        model: models.linkDiscoverer
      }
      ]
    },
    {
      model: models.salesforceAccount,
      where: [{ col: 'locationurn', data: 'locationUrns' }]
    }],
    order: [
      [models.location, models.linkDiscoverer, 'createdAt', 'DESC']
    ]
  }
  const keys = Object.keys(query)
  keys.forEach((k) => {
    if (k === 'where') {
      // replace where key
    }
    if (k === 'include') {
      // loop through each include and look for where key
    }
  })

  keys.map((k) => {

  })
}
