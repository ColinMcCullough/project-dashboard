const mockAxios = require('axios')
const PlacesApi = require('../../../server/controllers/places-api')

describe('Places API Class', () => {
  const validParams = {
    address: '550 NW Franklin Ave',
    city: 'Bend',
    state: 'OR',
    zip: '97702',
    vertical: 'mf',
    types: ['restaurant', 'clothing_store', 'primary_school']
  }
  let placesApi
  beforeEach(() => {
    placesApi = new PlacesApi(validParams)
    placesApi.key = 'AIzaSyD0qNg1CyA0l4_m_reeJP7JbKPUL5wway4'
  })

  test('bad constructor props', () => {
    expect(() => {
      new PlacesApi()
    }).toThrow('missing constructor param')
  })

  test('constructor prop tests', () => {
    expect(placesApi.address).toEqual('550 NW Franklin Ave')
    expect(placesApi.city).toEqual('Bend')
    expect(placesApi.state).toEqual('OR')
    expect(placesApi.zip).toEqual('97702')
    expect(placesApi.types).toEqual(['restaurant', 'clothing_store', 'primary_school'])
    expect(placesApi.vertical).toEqual('mf')
    expect(typeof placesApi.address).toEqual('string')
    expect(typeof placesApi.city).toEqual('string')
    expect(typeof placesApi.state).toEqual('string')
    expect(typeof placesApi.zip).toEqual('string')
    expect(Array.isArray(placesApi.types)).toEqual(true)
    expect(placesApi.types.length).toEqual(3)
    expect(typeof placesApi.vertical).toEqual('string')
  })

  test('validateParams', () => {
    expect(() => {
      placesApi.validateParams({
        address: '550 NW Franklin Ave',
        city: null,
        state: null,
        zip: null,
        vertical: null,
        types: null
      })
    }).toThrow('missing constructor param')
    expect(() => {
      placesApi.validateParams({
        address: '550 NW Franklin Ave',
        city: 'Bend',
        state: null,
        zip: null,
        vertical: null,
        types: null
      })
    }).toThrow('missing constructor param')
    expect(() => {
      placesApi.validateParams({
        address: '550 NW Franklin Ave',
        city: 'Bend',
        state: 'OR',
        zip: null,
        vertical: null,
        types: null
      })
    }).toThrow('missing constructor param')
    expect(() => {
      placesApi.validateParams({
        address: '550 NW Franklin Ave',
        city: 'Bend',
        state: 'OR',
        zip: '97702',
        vertical: null,
        types: null
      })
    }).toThrow('missing constructor param')
    expect(() => {
      placesApi.validateParams({
        address: '550 NW Franklin Ave',
        city: 'Bend',
        state: 'OR',
        zip: '97702',
        vertical: 'mf',
        types: null
      })
    }).toThrow('missing constructor param')
    expect(() => {
      placesApi.validateParams({
        address: '550 NW Franklin Ave',
        city: 'Bend',
        state: 'OR',
        zip: '97702',
        vertical: 'mf',
        types: 'wrong type'
      })
    }).toThrow('missing constructor param')
  })

  test('getPage', async () => {
    const url = 'https://www.getg5.com'
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          results: [
            { name: 'Noi Thai Cuisine' },
            { name: 'Thump Coffee' },
            { name: 'Brickhouse' }
          ]
        }
      })
    )
    const { data } = await placesApi.fetch(url)
    expect(data).toEqual({
      results: [
        { name: 'Noi Thai Cuisine' },
        { name: 'Thump Coffee' },
        { name: 'Brickhouse' }
      ]
    })
    expect(mockAxios.get).toHaveBeenCalled()
    expect(mockAxios.get).toHaveBeenCalledWith(url)
  })

  test('getLatLong', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          results: [
            {
              geometry: {
                location: {
                  lat: 44.0575752,
                  lng: -121.313289
                }
              }
            }
          ]
        }
      })
    )
    const data = await placesApi.getLatLong()
    expect(typeof data).toEqual('object')
    expect(data).toHaveProperty('lat')
    expect(data).toHaveProperty('long')
    expect(data).toEqual({
      lat: 44.0575752,
      long: -121.313289
    })
    expect(mockAxios.get).toHaveBeenCalled()
    expect(mockAxios.get).toHaveBeenCalledWith('https://maps.googleapis.com/maps/api/geocode/json?address=550 NW Franklin AveBendOR97702&key=AIzaSyD0qNg1CyA0l4_m_reeJP7JbKPUL5wway4')
  })

  test('getPlaces', async () => {
    const mockGetLatLong = jest.spyOn(placesApi, 'getLatLong').mockImplementation(() => {
      return {
        lat: 44.0575752,
        long: -121.313289
      }
    })
    const mockFetch = jest.spyOn(placesApi, 'fetch').mockImplementation(() => {
      return {
        data: {
          results: [
            { name: 'Noi Thai Cuisine' },
            { name: 'Thump Coffee' },
            { name: 'Brickhouse' }
          ]
        }
      }
    })
    const places = await placesApi.getPlaces()
    expect(mockGetLatLong).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledTimes(3)
    expect(mockFetch).toHaveBeenCalledWith('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.0575752,-121.313289&types=restaurant&rankby=distance&key=AIzaSyD0qNg1CyA0l4_m_reeJP7JbKPUL5wway4')
    expect(typeof places).toEqual('object')
    expect(places).toHaveProperty('restaurant')
    expect(places).toHaveProperty('clothing_store')
    expect(places).toHaveProperty('primary_school')
  })

  test('getPlaces with 10+ results', async () => {
    const mockGetLatLong = jest.spyOn(placesApi, 'getLatLong').mockImplementation(() => {
      return {
        lat: 44.0575752,
        long: -121.313289
      }
    })
    const mockFetch = jest.spyOn(placesApi, 'fetch').mockImplementation(() => {
      return {
        data: {
          results: [
            { name: 'Noi Thai Cuisine' },
            { name: 'Thump Coffee' },
            { name: 'Brickhouse' },
            { name: 'Noi Thai Cuisine' },
            { name: 'Thump Coffee' },
            { name: 'Brickhouse' },
            { name: 'Noi Thai Cuisine' },
            { name: 'Thump Coffee' },
            { name: 'Brickhouse' },
            { name: 'Noi Thai Cuisine' },
            { name: 'Thump Coffee' },
            { name: 'Brickhouse' }
          ]
        }
      }
    })
    const places = await placesApi.getPlaces()
    expect(mockGetLatLong).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledTimes(3)
    expect(mockFetch).toHaveBeenCalledWith('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.0575752,-121.313289&types=restaurant&rankby=distance&key=AIzaSyD0qNg1CyA0l4_m_reeJP7JbKPUL5wway4')
    expect(typeof places).toEqual('object')
    expect(places).toHaveProperty('restaurant')
    expect(places.restaurant.length).toEqual(placesApi.numberPlaces)
    expect(places).toHaveProperty('clothing_store')
    expect(places.clothing_store.length).toEqual(placesApi.numberPlaces)
    expect(places).toHaveProperty('primary_school')
    expect(places.primary_school.length).toEqual(placesApi.numberPlaces)
  })

  test('getPlaces fail', async () => {
    const mockGetLatLong = jest.spyOn(placesApi, 'getLatLong').mockImplementation(() => {
      return {
        lat: undefined,
        long: undefined
      }
    })
    const places = await placesApi.getPlaces()
    expect(mockGetLatLong).toHaveBeenCalledTimes(1)
    expect(typeof places).toEqual('object')
    expect(places).toEqual({})
  })

  test('formatAddress', () => {
    placesApi.address = '123 Fake St # 3'
    const address = placesApi.formatAddress()
    expect(address).toEqual('123 Fake St')

    placesApi.address = '123 Fake St'
    const address2 = placesApi.formatAddress()
    expect(address2).toEqual('123 Fake St')
  })
})
