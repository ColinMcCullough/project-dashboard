/* eslint-disable camelcase */
const axios = require('axios')
const xmlparser = require('xml-js')
const { USPS_USER_ID } = process.env
module.exports = validateAddress

async function validateAddress(data) {
  const {
    street_address_1,
    city,
    state,
    postal_code
  } = data

  const address = `
    <AddressValidateRequest USERID="${USPS_USER_ID}">
      <Revision>1</Revision>
      <Address ID="1">
        <Address1/>
        <Address2>${street_address_1}</Address2>
        <City>${city}</City>
        <State>${state}</State>
        <Zip5>${postal_code}</Zip5>
        <Zip4/>
      </Address>
    </AddressValidateRequest>
  `

  const response = await axios.get(`http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${address}`)
  return xmlparser.xml2json(response.data)
}
