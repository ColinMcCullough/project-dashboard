module.exports = {
  scrapers: {
    photos: true,
    amenities: true,
    address: true,
    emails: true,
    phoneNumber: true,
    social: true
  },
  template: {
    address: {
      selector: null
    },
    phone: {
      selector: null
    },
    email: {
      selector: null
    },
    amenities: {
      selector: null,
      slug: null
    }
  }
}
