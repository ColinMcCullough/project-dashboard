module.exports = [
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000006oUcOAAU', 'a1b3l000007cMedAAE'],
    name: {
      default: 'Domain Information'
    },
    priority: 1,
    fields: [
      {
        dataKey: 'current_website',
        inputType: 'url',
        required: true,
        displayOnlyOnCorp: false,
        displayOnCorp: true,
        bulkEditable: false,
        isHub: false,
        displayVertical: ['MF', 'SS', 'SL'],
        label: { default: 'Current Website' },
        settings: null,
        placeholder: null
      },
      {
        dataKey: 'naked_domain',
        inputType: 'url',
        required: true,
        displayOnlyOnCorp: false,
        displayOnCorp: true,
        bulkEditable: false,
        isHub: true,
        displayVertical: ['MF', 'SS', 'SL'],
        label: { default: 'Domain for G5 to Build on' },
        settings: null,
        placeholder: null
      },
      {
        dataKey: 'registrar',
        inputType: 'text',
        required: true,
        displayOnlyOnCorp: false,
        displayOnCorp: true,
        bulkEditable: true,
        isHub: false,
        displayVertical: ['MF', 'SS', 'SL'],
        label: { default: 'Domain Registrar' },
        settings: null,
        placeholder: null
      },
      {
        dataKey: 'domain_manager_contact',
        inputType: 'email',
        required: false,
        displayOnlyOnCorp: false,
        displayOnCorp: true,
        bulkEditable: true,
        isHub: false,
        displayVertical: ['MF', 'SS', 'SL'],
        label: { default: 'Domain Manager Contact' },
        settings: null,
        placeholder: null
      },
      {
        dataKey: 'domain_credentials',
        inputType: 'text',
        required: false,
        displayOnlyOnCorp: false,
        displayOnCorp: true,
        bulkEditable: true,
        isHub: false,
        displayVertical: ['MF', 'SS', 'SL'],
        label: { default: 'Domain Credentials' },
        settings: null,
        placeholder: null
      },
      {
        dataKey: 'other_domains',
        inputType: 'url',
        required: true,
        displayOnlyOnCorp: false,
        displayOnCorp: true,
        bulkEditable: false,
        isHub: false,
        displayVertical: ['MF', 'SS', 'SL'],
        label: { default: 'Other Domains to Reference' },
        settings: null,
        placeholder: null
      }
    ]
  },
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000006oUcOAAU', 'a1b3l000007cMedAAE'],
    name: {
      MF: 'Property Contact Information',
      SL: 'Community Contact Information',
      SS: 'Facility Contact Information',
      corp: 'Company Contact Information',
      default: 'Property Contact Information'
    },
    priority: 2,
    fields: [{
      dataKey: 'name',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { SL: 'Name of Community', SS: 'Name of Facility', MF: 'Name of Property', corp: 'Name of Corporate', default: 'Branded Name of Property' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'street_address_1',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Street Address 1' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'street_address_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Street Address 2' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'city',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'City' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'state',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'State' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'postal_code',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Zip Code' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'country',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Country' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'display_phone_number',
      inputType: 'phone',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { SL: 'Community Phone Number', SS: 'Facility Phone Number', MF: 'Property Phone Number', corp: 'Corporate Phone Number', default: 'Phone Number' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'local_phone_number',
      inputType: 'phone',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Forward to/Lead Tracking Phone Number' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'email',
      inputType: 'email',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { SL: 'Community Email Address', SS: 'Facility Email Address', MF: 'Property Email Address', corp: 'Corporate Email Address', default: 'Property Email Address' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'fax',
      inputType: 'phone',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Fax Number' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'lead_vendor_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS'],
      label: { default: 'Vendor & Product Name of Lead Management System' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'auto_response',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: true,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS'],
      label: { default: 'Does your lead tracking email provide an auto response customer email?' },
      settings: { options: { default: ['Yes', ' No', ' N/A'] } },
      placeholder: null
    },
    {
      dataKey: 'suppress_auto_response',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: true,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS'],
      label: { default: 'If yes to the above, would you like G5 to suppress the G5 auto response customer email?' },
      settings: { options: { default: ['Yes', ' No', ' N/A'] } },
      placeholder: null
    },
    {
      dataKey: 'lead_email',
      inputType: 'email',
      required: true,
      displayOnlyOnCorp: true,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Website Leads Email Address' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'office_hours',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Office Hours' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'access_hours',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Access Hours' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'access_hours',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Desk Hours' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUTTAA2'],
    name: {
      default: 'Design Selection'
    },
    priority: 2,
    fields: [{
      dataKey: 'desired_launch_date',
      inputType: 'date',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Desired Launch Date' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'location_clone',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Location to Clone' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU'],
    name: {
      MF: 'Property Type & General Information',
      SL: 'Community Type & General Information',
      SS: 'Facility Type & General Information',
      corp: 'Company Type & General Information',
      default: 'Property Type & General Information'
    },
    priority: 3,
    fields: [{
      dataKey: 'geographic_type',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Property Geographic Type' },
      settings: { options: { default: ['Suburban', ' Urban'] } },
      placeholder: null
    },
    {
      dataKey: 'class_type',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['MF', 'SS'],
      label: { SS: 'Facility Class Type', default: 'Property Class Type' },
      settings: { options: { MF: ['Class A', ' Class B', ' Class C'], SS: ['High-end', ' Mid-range'] } },
      placeholder: null
    },
    {
      dataKey: 'target_lifestyle',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Primary Target Lifestyle' },
      settings: { options: { default: ['On the Go', ' Happy at Home'] } },
      placeholder: null
    },
    {
      dataKey: 'property_feature_1',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Feature 1' },
      settings: { options: { default: ['Luxury', ' Affordable', ' Modern', ' Gated', ' Furnished', ' Garden Style', ' High-Rise', ' New', ' Upgraded'] } },
      placeholder: null
    },
    {
      dataKey: 'property_feature_2',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Feature 2' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'property_feature_4',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Feature 3' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'property_feature_4',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Feature 4' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'property_status',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Property Status' },
      settings: { options: { default: ['Development', ' Pre-Leasing', ' Lease-Up', ' Low Occupancy', ' Mid Occupancy', ' High Occupancy'] } },
      placeholder: null
    },
    {
      dataKey: 'senior_student_demographics',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Is your location specifically designed for Senior or Student demographics?' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'primary_unit_type',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Primary Property & Unit Type' },
      settings: { options: { default: ['Apartments & Townhomes', ' Condos', ' Apartments', ' Townhomes'] } },
      placeholder: null
    },
    {
      dataKey: 'floor_plans',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Floor Plans' },
      settings: { options: { default: ['Studio', ' 1', ' 2', ' 3', ' Other'] } },
      placeholder: null
    },
    {
      dataKey: 'most_need_floorplans',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Floor Plans most in need of new residents' },
      settings: { options: { default: ['Studio', ' 1', ' 2', ' 3', ' Other'] } },
      placeholder: null
    },
    {
      dataKey: 'neighborhood',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Neighborhood' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'neighborhood_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Neighborhood 2' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'no_target_neighborhood',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Nearby neighborhoods to NOT TARGET' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'landmark_1_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Landmark' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'landmark_1_type',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Lankmark Type' },
      settings: { options: { default: ['One of Hospital', ' Lake', ' Recreation Area', ' Military Base', ' Employer', ' University'] } },
      placeholder: null
    },
    {
      dataKey: 'landmark_2_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Landmark 2' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'landmark_2_type',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Landmark 2 Type' },
      settings: { options: { default: ['One of Hospital', ' Lake', ' Recreation Area', ' Military Base', ' Employer', ' University'] } },
      placeholder: null
    },
    {
      dataKey: 'nearby_employers',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Nearby Employer' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_employer_1',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Nearby Employer' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_employer_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Nearby Employer' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_employer_3',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Nearby Employer' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_schools',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Nearby School' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_school_1',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Nearby School' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_school_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Nearby School' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_restaurants',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Nearby Restaurants' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_shopping',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Nearby Shopping Centers & Grocery Stores' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_recreation',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Nearby Recreation & Entertainment' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'pet_friendly',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Pet Friendly' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {
      dataKey: 'pet_policy',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Pet Policy' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'value_proposition',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Unique Value Proposition' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'convenience_category',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Convenience Category' },
      settings: { options: { default: ['Neighborhood', ' Freeway Access', ' Willing to Travel'] } },
      placeholder: null
    },
    {
      dataKey: 'property_feature_1',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Primary Feature Class' },
      settings: { options: { default: ['Basic', ' Premium', ' Boat and RV'] } },
      placeholder: null
    },
    {
      dataKey: 'property_feature_2',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Secondary Feature Class' },
      settings: { options: { default: ['Basic', ' Premium', ' Boat and RV'] } },
      placeholder: null
    },
    {
      dataKey: 'nearby_roadway_1',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Nearby Location/Street (1)' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_roadway_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Nearby Location/Street (2)' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_gasoline',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Nearby Gas Station' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'gmb_login',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Google My Business (GMB) Login Email & Password' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'ga_login',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Google Analytics (GA) Login Email & Password' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU'],
    name: {
      default: 'Care Levels'
    },
    priority: 4,
    fields: [{
      dataKey: 'care_level_1',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Community Care Levels' },
      settings: { options: { default: ['Independent Living', ' Assisted Living', ' Hospice Care', ' Memory Care', ' Alzheimers Care', ' Dementia Care', ' Respite Care', ' Skilled Nursing', ' Personal Care', ' At Home Care', ' Adult Day Care'] } },
      placeholder: null
    },
    {
      dataKey: 'care_level_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Community Care Levels' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'care_level_3',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Community Care Levels' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'care_level_4',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Community Care Levels' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'care_level_5',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Community Care Levels' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'care_level_6',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Community Care Levels' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'care_level_verbiage',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Please Indicate if you would like to update specific Care Levels verbiage from the selected names' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'accepts_medicare_medicade',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: true,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Accepts Medicare or Medicaid?' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {
      dataKey: 'legal_restrictions',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Is there any terminology we can not use? Legal restrictions within the state, etc.?' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'nearby_healthcare_1',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Nearby Healthcare Facilities' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU'],
    name: {
      default: 'Apartment & Community Amenities & Services'
    },
    priority: 5,
    fields: [{
      dataKey: 'apartment_amenity_1',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Primary Apartment Amenity 1' },
      settings: { options: { default: ['Air Conditioning', ' Cable Included', ' Custom Cabinetry', ' Dishwasher', ' Energy-Efficient Appliances', ' Fireplace', ' Garages Available', ' Granite Counters', ' Hardwood Flooring', ' High Ceilings', ' High Speed Internet Access', ' Private Balcony', ' Private Patio', ' Soundproof Walls', ' Stainless-Steel Appliances', ' Vaulted Ceilings', ' Walk-In Closets', ' Washer/Dryer Connections', ' Washer/Dryer Included', ' Wood-Style Flooring'] } },
      placeholder: null
    },
    {
      dataKey: 'apartment_amenity_2',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Primary Apartment Amenity 2' },
      settings: { options: { default: ['Air Conditioning', ' Cable Included', ' Custom Cabinetry', ' Dishwasher', ' Energy-Efficient Appliances', ' Fireplace', ' Garages Available', ' Granite Counters', ' Hardwood Flooring', ' High Ceilings', ' High Speed Internet Access', ' Private Balcony', ' Private Patio', ' Soundproof Walls', ' Stainless-Steel Appliances', ' Vaulted Ceilings', ' Walk-In Closets', ' Washer/Dryer Connections', ' Washer/Dryer Included', ' Wood-Style Flooring'] } },
      placeholder: null
    },
    {
      dataKey: 'apartment_amenity_3',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Primary Apartment Amenity 3' },
      settings: { options: { default: ['Air Conditioning', ' Cable Included', ' Custom Cabinetry', ' Dishwasher', ' Energy-Efficient Appliances', ' Fireplace', ' Garages Available', ' Granite Counters', ' Hardwood Flooring', ' High Ceilings', ' High Speed Internet Access', ' Private Balcony', ' Private Patio', ' Soundproof Walls', ' Stainless-Steel Appliances', ' Vaulted Ceilings', ' Walk-In Closets', ' Washer/Dryer Connections', ' Washer/Dryer Included', ' Wood-Style Flooring'] } },
      placeholder: null
    },
    {
      dataKey: 'additional_amenities',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Additional Apartment Amenities' },
      settings: { options: { default: ['Air Conditioning', ' Cable Included', ' Custom Cabinetry', ' Dishwasher', ' Energy-Efficient Appliances', ' Fireplace', ' Garages Available', ' Granite Counters', ' Hardwood Flooring', ' High Ceilings', ' High Speed Internet Access', ' Private Balcony', ' Private Patio', ' Soundproof Walls', ' Stainless-Steel Appliances', ' Vaulted Ceilings', ' Walk-In Closets', ' Washer/Dryer Connections', ' Washer/Dryer Included', ' Wood-Style Flooring'] } },
      placeholder: null
    },
    {
      dataKey: 'apartment_styles',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'Apartment Styles and room (e.g., townhome/apartment/suite, 1-2 bedoom)' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'in_unit_features',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SL'],
      label: { default: 'In-Home/In-Unit Features' },
      settings: { options: { default: ['Move-In Assistance', ' LEED Certified', ' Other Green Initiatives', ' Air Conditioning', ' Cable Included', ' WiFi Available', ' Ceiling Fans', ' Custom Lighting', ' Full Kitchen', ' Kitchenette', ' Kitchen Island or Bar', ' Granite Counters', ' Custom Cabinetry', ' Energy-Efficient Appliances', ' Stainless-Steel Appliances', ' Refrigerator', ' Dishwasher', ' Microwave', ' Garbage Disposal', ' Utilities Included', ' Weekly Housekeeping', ' Washer/Dryer Connections', ' In-Home Washer/Dryer', ' Trash Service', ' Laundry Service', ' Walk-In Closets', ' Fireplace', ' Curtains or Blinds Included', ' Hardwood Floors', ' Hardwood-Style Floors', ' HighCeilings', ' Vaulted Ceilings', ' Cathedral Ceilings', ' Private Balcony', ' Private Patio', ' Smoke Free', ' Addtional Storage'] } },
      placeholder: null
    },
    {
      dataKey: 'community_amenity_1',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SL'],
      label: { MF: 'Primary Property Amenity 1', default: 'Primary Community Amenity 1' },
      settings: { options: { MF: ['Basketball Court', ' Business Center', ' Carport Parking Available', ' Close to Dog Park', ' Close to Park', ' Clubhouse', ' Fitness Center', ' Furnished Apartments Available', ' Gated Electronic Entrance', ' Laundry Facility', ' On-Site Dog Park', ' Online Rental Payments', ' Onsite Management', ' Playground', ' Recycling Center', ' Spa/Hot Tub', ' Swimming Pool', ' Tennis Court', ' Volleyball Court', ' WiFi Available', ' Other'], SL: ['Gated Electronic Entrance', ' Parking Garage', ' Covered Parking', ' Private Garages Available', ' Transportation Services', ' Restaurant-Style Dining', ' In-Room Dining', ' Personal Care', ' Clubhouse', ' Fitness Center', ' Yoga/ Pilates Studio', ' Swimming Pool', ' Spa/Hot Tub', ' Cabanas', ' Fitness Classes', ' Outdoor Grilling/BBQ Stations', ' Playground', ' Basketball', ' Volleyball', ' Tennis Courts', ' Laundry Facilities On-Site', ' Recycling Center', ' 24-Hour Emergency Maintenance', ' Walking Trails on or near Property', ' Close to Parks', ' Close to Dog Park', ' On-Site Dog Park', ' Pet Friendly', ' Cat Friendly', ' Dog Friendly', ' Organized Activities'] } },
      placeholder: null
    },
    {
      dataKey: 'community_amenity_2',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SL'],
      label: { MF: 'Primary Property Amenity 2', default: 'Primary Community Amenity 2' },
      settings: { options: { MF: ['Basketball Court', ' Business Center', ' Carport Parking Available', ' Close to Dog Park', ' Close to Park', ' Clubhouse', ' Fitness Center', ' Furnished Apartments Available', ' Gated Electronic Entrance', ' Laundry Facility', ' On-Site Dog Park', ' Online Rental Payments', ' Onsite Management', ' Playground', ' Recycling Center', ' Spa/Hot Tub', ' Swimming Pool', ' Tennis Court', ' Volleyball Court', ' WiFi Available', ' Other'], SL: ['Gated Electronic Entrance', ' Parking Garage', ' Covered Parking', ' Private Garages Available', ' Transportation Services', ' Restaurant-Style Dining', ' In-Room Dining', ' Personal Care', ' Clubhouse', ' Fitness Center', ' Yoga/ Pilates Studio', ' Swimming Pool', ' Spa/Hot Tub', ' Cabanas', ' Fitness Classes', ' Outdoor Grilling/BBQ Stations', ' Playground', ' Basketball', ' Volleyball', ' Tennis Courts', ' Laundry Facilities On-Site', ' Recycling Center', ' 24-Hour Emergency Maintenance', ' Walking Trails on or near Property', ' Close to Parks', ' Close to Dog Park', ' On-Site Dog Park', ' Pet Friendly', ' Cat Friendly', ' Dog Friendly', ' Organized Activities'] } },
      placeholder: null
    },
    {
      dataKey: 'community_amenity_3',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SL'],
      label: { MF: 'Primary Property Amenity 3', default: 'Primary Community Amenity 3' },
      settings: { options: { MF: ['Basketball Court', ' Business Center', ' Carport Parking Available', ' Close to Dog Park', ' Close to Park', ' Clubhouse', ' Fitness Center', ' Furnished Apartments Available', ' Gated Electronic Entrance', ' Laundry Facility', ' On-Site Dog Park', ' Online Rental Payments', ' Onsite Management', ' Playground', ' Recycling Center', ' Spa/Hot Tub', ' Swimming Pool', ' Tennis Court', ' Volleyball Court', ' WiFi Available', ' Other'], SL: ['Gated Electronic Entrance', ' Parking Garage', ' Covered Parking', ' Private Garages Available', ' Transportation Services', ' Restaurant-Style Dining', ' In-Room Dining', ' Personal Care', ' Clubhouse', ' Fitness Center', ' Yoga/ Pilates Studio', ' Swimming Pool', ' Spa/Hot Tub', ' Cabanas', ' Fitness Classes', ' Outdoor Grilling/BBQ Stations', ' Playground', ' Basketball', ' Volleyball', ' Tennis Courts', ' Laundry Facilities On-Site', ' Recycling Center', ' 24-Hour Emergency Maintenance', ' Walking Trails on or near Property', ' Close to Parks', ' Close to Dog Park', ' On-Site Dog Park', ' Pet Friendly', ' Cat Friendly', ' Dog Friendly', ' Organized Activities'] } },
      placeholder: null
    },
    {
      dataKey: 'additional_community_amenities',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Additional Community Amenities& Services' },
      settings: { options: { MF: ['Basketball Court', ' Business Center', ' Carport Parking Available', ' Close to Dog Park', ' Close to Park', ' Clubhouse', ' Fitness Center', ' Furnished Apartments Available', ' Gated Electronic Entrance', ' Laundry Facility', ' On-Site Dog Park', ' Online Rental Payments', ' Onsite Management', ' Playground', ' Recycling Center', ' Spa/Hot Tub', ' Swimming Pool', ' Tennis Court', ' Volleyball Court', ' WiFi Available', ' Other'], SL: ['Gated Electronic Entrance', ' Parking Garage', ' Covered Parking', ' Private Garages Available', ' Transportation Services', ' Restaurant-Style Dining', ' In-Room Dining', ' Personal Care', ' Clubhouse', ' Fitness Center', ' Yoga/ Pilates Studio', ' Swimming Pool', ' Spa/Hot Tub', ' Cabanas', ' Fitness Classes', ' Outdoor Grilling/BBQ Stations', ' Playground', ' Basketball', ' Volleyball', ' Tennis Courts', ' Laundry Facilities On-Site', ' Recycling Center', ' 24-Hour Emergency Maintenance', ' Walking Trails on or near Property', ' Close to Parks', ' Close to Dog Park', ' On-Site Dog Park', ' Pet Friendly', ' Cat Friendly', ' Dog Friendly', ' Organized Activities'] } },
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU'],
    name: {
      default: 'Facility Features & Storage Types'
    },
    priority: 6,
    fields: [{
      dataKey: 'property_feature_1',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Primary Facility Feature 1\n' },
      settings: { options: { default: ['Climate Controlled', 'Free Moving Truck', 'Movign Truck Available to Rent', 'Ground Floor Units', 'RV & Car Storage', 'Package Delivery', 'Online Bill Payment', 'Month to Month', 'Military Discounts', 'Free Truck Use', 'Onsite Manager', 'Free Dolly & Cart Use'] } },
      placeholder: null
    },
    {
      dataKey: 'property_feature_2',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Primary Facility Feature 2' },
      settings: { options: { default: ['Climate Controlled', 'Free Moving Truck', 'Movign Truck Available to Rent', 'Ground Floor Units', 'RV & Car Storage', 'Package Delivery', 'Online Bill Payment', 'Month to Month', 'Military Discounts', 'Free Truck Use', 'Onsite Manager', 'Free Dolly & Cart Use'] } },
      placeholder: null
    },
    {
      dataKey: 'property_feature_3',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Primary Facility Feature 3' },
      settings: { options: { default: ['Climate Controlled', 'Free Moving Truck', 'Movign Truck Available to Rent', 'Ground Floor Units', 'RV & Car Storage', 'Package Delivery', 'Online Bill Payment', 'Month to Month', 'Military Discounts', 'Free Truck Use', 'Onsite Manager', 'Free Dolly & Cart Use'] } },
      placeholder: null
    },
    {
      dataKey: 'property_feature_4',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['SS'],
      label: { default: 'Primary Facility Feature 4' },
      settings: { options: { default: ['Climate Controlled', 'Free Moving Truck', 'Movign Truck Available to Rent', 'Ground Floor Units', 'RV & Car Storage', 'Package Delivery', 'Online Bill Payment', 'Month to Month', 'Military Discounts', 'Free Truck Use', 'Onsite Manager', 'Free Dolly & Cart Use'] } },
      placeholder: null
    },
    {
      dataKey: 'storage_type',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Storage Types' },
      settings: { options: { default: ['Automobile Storage', ' Boat Storage', ' Business and/or Commercial Storage (files', ' etc)', ' Climate-Controlled Storage Units', ' Cold Storage Facility', ' Ground-Level Units', ' Indoor Storage', ' Motorcycle Storage', ' Outdoor Storage', ' Pod Storage', ' Records Storage Facility (Documents', ' etc)', ' RV Storage', ' Storage Locker Rental', ' Temperature Controlled Storage (only temperature controlled)', ' Warehouse', ' Wine Storage'] } },
      placeholder: null
    },
    {
      dataKey: 'rentals_services',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Rentals & Services' },
      settings: { options: { default: ['Business Suite Rentals', ' Conference Room Rentals', ' Deliveries Accepted', ' Mailbox Rental Service', ' Month-to-Month Rentals', ' Moving Service', ' Paper Shredding Service', ' Piano Moving Service', ' Removal Service', ' Tenant Insurance Available', ' Trailer Rental Service', ' Truck Rental - FREE Use', ' Truck', ' Van or Car Rentals - PAID', ' U-Haul Truck Rentals', ' 24 Hour Access Storage', ' 24-Hour Security Monitoring (video recording', ' live monitoring', ' security guard - please specify)', ' Access 7 Days a Week', ' Business Center', ' Covered Drive-Thru Access', ' Covered Loading / Unloading', ' Digital Surveillance System', ' Dollies and Carts Available', ' Drive-Up Access Storage', ' Electrical Outlets in Units', ' Electronic Gate Access', ' Fully Fenced', ' High Ceilings', ' Individually Alarmed Units', ' Major Credit Cards Accepted', ' Online Bill Payment', ' On-Site Management', ' Packing and Moving Supplies Sold at Location', ' RV Charging Station', ' RV Sewage Depository', ' Well Lit/ Motion Detecting Lights', ' Wide Driveways'] } },
      placeholder: null
    },
    {
      dataKey: 'discounts_fees',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Discounts & Fees' },
      settings: { options: { default: ['Military Discounts', ' No Administration Fee', ' No Deposits', ' No Late Fees', ' Regularly Offered Specials', ' Senior Discounts', ' Student Discounts'] } },
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU'],
    name: {
      default: 'Integration & Leads'
    },
    priority: 7,
    fields: [{
      dataKey: 'lead_vendor_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'What is your Lead Management System (LMS)?' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'auto_response',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Does your lead tracking email provide an auto response customer email?' },
      settings: { options: { default: ['Yes', ' No', ' N/A'] } },
      placeholder: null
    },
    {
      dataKey: 'suppress_auto_response',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'If yes to the above, would you like G5 to suppress the G5 auto response customer email?' },
      settings: { options: { default: ['Yes', ' No', ' N/A'] } },
      placeholder: null
    },
    {
      dataKey: 'pms_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Do you use a Property Management System (PMS)? If so, please provide the Vendor & Product name.' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'pms_credentials',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'PMS Integration Credentials' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'pms_property_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'PMS Property Code' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'rms',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Do you use a Revenue Management System (RMS)? If so, please provide the Vendor & Product name.' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'rms_credentials',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'RMS Integration Credentials' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'rms_property_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'RMS Integration Property Code' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'unit_inventory_vendor',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Unit Inventory Vendor' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'corporate_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Corporate Code' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'faciliy_id',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Facility ID' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'integration_api_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'API User Name' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'integration_api_password',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'API Password' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'integration_endpoint',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SS'],
      label: { default: 'Endpoint (not needed for Sitelink)' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'lead_vendor_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Do you use a Lead Management System (LMS)? If so, please provide the Product name.' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'integration_company_key',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Company Key' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'integration_location_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Location/Property Code' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUU2AAM', 'a1b3l000006oUduAAE', 'a1b3l000006oUTUAA2', 'a1b3l000006oUTZAA2', 'a1b3l000006oUbzAAE', 'a1b3l000006oUbuAAE', 'a1b3l000006oUc0AAE', 'a1b3l000006oUTTAA2', 'a1b3l000007cMchAAE', 'a1b3l000007cMcmAAE', 'a1b3l000007cMciAAE', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000007cMkmAAE', 'a1b3l000006oUcOAAU', 'a1b3l000007cMWUAA2', 'a1b3l000007cMlQAAU', 'a1b3l000007cMWPAA2', 'a1b3l000007cMUeAAM', 'a1b3l000007cMeiAAE', 'a1b3l000007cMenAAE', 'a1b3l000007cMedAAE', 'a1b3l000007cMaWAAU', 'a1b3l000007cMaRAAU', 'a1b3l000006oUTLAA2', 'a1b3l000006oUTKAA2', 'a1b3l000007cMbeAAE', 'a1b3l000006oUacAAE', 'a1b3l000007cMbZAAU', 'a1b3l000007cMgFAAU', 'a1b3l000007cMg5AAE', 'a1b3l000007cMgAAAU', 'a1b3l000006oUcOAAU', 'a1b3l000007cMedAAE'],
    name: {
      default: 'Portals & Links'
    },
    priority: 8,
    fields: [{

      dataKey: 'yelp_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Yelp Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'facebook_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Facebook Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'twitter_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Twitter Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'pinterest_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Pinterest Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'instagram_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Instagram Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'youtube_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'YouTube Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'linkedin_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'LinkedIn Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'pay_online_url',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Pay Online Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'online_leasing_application',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Online Leasing Application' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'online_leasing_availability',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Online Leasing Floor Plan Availability' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'resident_portal',
      inputType: 'url',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Resident Portal' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'maintenance_request',
      inputType: 'url',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Maintenance Request' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'employment_portal',
      inputType: 'url',
      required: false,
      displayOnlyOnCorp: true,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS'],
      label: { default: 'Employment Portal' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'investor_portal',
      inputType: 'url',
      required: false,
      displayOnlyOnCorp: true,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS'],
      label: { default: 'Investor Portal' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'careers_portal',
      inputType: 'url',
      required: false,
      displayOnlyOnCorp: true,
      displayOnCorp: true,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS'],
      label: { default: 'Careers Portal' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oURpAAM', 'a1b3l000006oUSGAA2', 'a1b3l000006oURqAAM'],
    name: {
      default: 'Custom Copy Questionnaire'
    },
    priority: 9,
    fields: [{

      dataKey: 'tagline',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Do you have a slogan, tagline, or mission statement?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'communicate_audience',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What is the most important thing you want to communicate to your audience?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'best_solution',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What kind of “pain” is your customer in? How are your services the best solution for them?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apart_competitors',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What do you feel sets you apart from your competitors?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'awards',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Do you have any awards, affiliations, or case studies you’d like to mention?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'highest_rated_asset',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What do you consider to be your highest-rated asset?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'buzzwords',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Give us a list of buzzwords or phrases that best describes your organization. Are there any words that we should avoid?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'existing_collateral',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: "Do you have existing collateral (brochures, press releases, sales slicks) or content that you would like us to review while creating your content? Tell us what you like/don't like about it." },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'include_in_content',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: "Is there anything else that you want us to include in your content? Don't be shy here; this is your story and we want to tell it right." },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUWpAAM', 'a1b3l000006oURYAA2', 'a1b3l000006oURkAAM', 'a1b3l000006oURgAAM', 'a1b3l000006oUReAAM'],
    name: {
      default: 'Custom Copy Questionnaire'
    },
    priority: 10,
    fields: [{

      dataKey: 'copy_tone',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'How do you want your copy to sound? Choose 3 to 5 from the list or come up with your own words.' },
      settings: { options: { default: ['Trendy', ' traditional', ' warm', ' inviting', ' playful', ' edgy', ' authoritative', ' polished', ' irreverent', ' upbeat', ' straightforward', ' casual', ' other (HTML FOR THEM TO FILL OUT)'] } },
      placeholder: null
    },
    {

      dataKey: 'property_differentiators',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Any Unique Differentiators about the property?\n(ex: amenities, price within the market, etc.)' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'tagline',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Key Message/Tagline\n(if applicable)' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'buzzwords',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Give us a list of buzzwords or phrases that describe your community. (ex. boutique, homey, resort-style, etc)' },
      settings: { options: { default: ['Classic', ' charming', ' cozy', ' hip', ' boutique', ' high-end', ' resort-style', ' industrial', ' Craftsman', ' high-tech', ' eco-friendly', ' Other (HTML FOR THEM TO FILL OUT)'] } },
      placeholder: null
    },
    {

      dataKey: 'communicate_audience',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What is the most important thing you want to communicate to your audience?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apart_competitors',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What sets you apart from your competitors?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'no_use_terms',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Is there any terminology we CANNOT use? Or legal restrictions within the state? If so, please clarify.' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'copy_likes_dislikes',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What do you like about your current copy? What could be improved upon?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'tagline',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Do you have an established tagline/slogan? \nIf so, what is it?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'buzzwords',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Give us 3 to 5 buzzwords that describe your interior and exterior spaces.' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'property_differentiators',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What is the main reason a prospect would choose to rent at this community as opposed to a comparable competitor?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'no_use_terms',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Due to state, other regulations, or your preferences, is there any terminology we CANNOT or SHOULD NOT use? If so, please clarify.' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'income_restrictions',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Are any or all of your units income-restricted? Specify whether it is all or some units and which type.' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oURiAAM', 'a1b3l000006oURaAAM', 'a1b3l000006oURhAAM', 'a1b3l000006oUSYAA2'],
    name: {
      default: 'Portfolio Copy Questionnaire'
    },
    priority: 11,
    fields: [{

      dataKey: 'copy_wants',
      inputType: 'select',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What feel do you want your copy to have?' },
      settings: { options: { default: ['Trendy', ' traditional', ' warm', ' inviting', ' playful', ' edgy', ' authoritative', ' polished', ' irreverent', ' upbeat', ' straightforward', ' casual', ' other (HTML FOR THEM TO FILL OUT)'] } },
      placeholder: null
    },
    {

      dataKey: 'location_consistencies',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'What are the consistencies across your locations (ex. pools, pet friendly, W/D hook ups etc.)' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'taglie',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Do you have a key message or tagline?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'communicate_audience',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What is the most important quality you want users to know about your properties?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'property_differentiators',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Broadly, what sets your properties apart from your competitors?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'no_use_terms',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Is there any terminology we CANNOT use or legal restrictions within the state(s)? If so, please clarify.' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUbaAAE', 'a1b3l000006oUSrAAM'],
    name: {
      default: 'Blog Questionnaire'
    },
    priority: 12,
    fields: [{

      dataKey: 'blog_audience',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Who is the primary target audience for your blog?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'blog_topics',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What sort of topics would you like your blog to address? Do you have any blog posts in mind?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'blog_imagery',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What sort of imagery would you like us to use for your blog posts?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'language_avoid',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Is there any specific language you would like us to avoid?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'blog_publish_preferences',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Do you have any preference about when your blogs will be published?' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oURxAAM'],
    name: {
      default: 'Refresh Questionnaire'
    },
    priority: 13,
    fields: [{

      dataKey: 'refresh_goal',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What is your main goal with this refresh?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'buzzwords',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Give us a list of buzzwords or phrases that describe your community.' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'new_features',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Do you have any new features, amenities, or neighborhood destinations you would like to include?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'copy_wants',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'What feel do you want your copy to have?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'extra_knowledge',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Is there anything else you would like us to know about this project?' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUWkAAM', 'a1b3l000007cMlGAAU', 'a1b3l000007cMccAAE', 'a1b3l000007cMcXAAU', 'a1b3l000007cMeYAAU', 'a1b3l000007cMjoAAE', 'a1b3l000007cMjtAAE'],
    name: {
      default: 'Digital Advertising'
    },
    priority: 14,
    fields: [{

      dataKey: 'focus_location',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Location of Focus' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {

      dataKey: 'competitive_landscape',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Competitive Landscape' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'untilities_included',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Untilities Included' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {

      dataKey: 'single_family_homes',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Single Family Homes' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {

      dataKey: 'competitors',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Competitors' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000007cMeYAAU', 'a1b3l000007cMjoAAE', 'a1b3l000007cMjtAAE'],
    name: {
      default: 'Location Information'
    },
    priority: 15,
    fields: [{

      dataKey: 'off_platform_link',
      inputType: 'url',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Current Website URL' },
      settings: null,
      placeholder: null
    },
    {
      dataKey: 'website_provider',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Website Provider' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { SL: 'Name of Community', SS: 'Name of Facility', MF: 'Name of Property', corp: 'Name of Corporate', default: 'Name of Property' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'street_address_1',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Street Address' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'street_address_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Street Address' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'city',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'City' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'state',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'State' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'postal_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Zipcode' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'listing_phone',
      inputType: 'phone',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Forward to/Lead Tracking Phone Number' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'local_phone_number',
      inputType: 'phone',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Local Phone Number' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'property_class',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Class Type' },
      settings: { options: { default: ['Class A', ' Class B', ' Class C'] } },
      placeholder: null
    },
    {

      dataKey: 'property_status',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Status' },
      settings: { options: { default: ['Development', ' Pre-Leasing', ' Lease-Up', ' Low Occupancy', ' Mid Occupancy', ' High Occupancy'] } },
      placeholder: null
    },
    {

      dataKey: 'most_need_floorplans',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Floor Plans most in need of new residents' },
      settings: null,
      placeholder: null
    }
    ]
  },
  {
    packageIds: ['a1b3l000007cMeYAAU', 'a1b3l000007cMjoAAE', 'a1b3l000007cMjtAAE'],
    name: {
      default: 'Social Media Links'
    },
    priority: 16,
    fields: [{

      dataKey: 'facebook_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Facebook Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'instagram_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Instagram Link' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000007cMeYAAU', 'a1b3l000007cMjoAAE', 'a1b3l000007cMjtAAE'],
    name: {
      default: 'Integration Information'
    },
    priority: 17,
    fields: [{

      dataKey: 'pms_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'PMS Vendor & Product name' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'integration_credentials',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Integration Credentials' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'pms_property_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'PMS Property Code' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apartment_days_available',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Display Apartments Available Up To X Days Out' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'max_apartments_available',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Max Number of Apartments per Floor Plan to Display' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUTcAAM'],
    name: {
      default: 'Location Information'
    },
    priority: 18,
    fields: [{

      dataKey: 'off_platform_link',
      inputType: 'url',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Current Website URL' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'website_provider',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Website Provider' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { SL: 'Name of Community', SS: 'Name of Facility', MF: 'Name of Property', corp: 'Name of Corporate', default: 'Name of Property' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'street_address_1',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Street Address' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'street_address_2',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Street Address' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'city',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'City' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'state',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'State' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'postal_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Zipcode' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'listing_phone',
      inputType: 'phone',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Forward to/Lead Tracking Phone Number' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'local_phone_number',
      inputType: 'phone',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Local Phone Number' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'property_class',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Class Type' },
      settings: { options: { default: ['Class A', ' Class B', ' Class C'] } },
      placeholder: null
    },
    {

      dataKey: 'property_status',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Status' },
      settings: { options: { default: ['Development', ' Pre-Leasing', ' Lease-Up', ' Low Occupancy', ' Mid Occupancy', ' High Occupancy'] } },
      placeholder: null
    },
    {

      dataKey: 'most_need_floorplans',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Floor Plans most in need of new residents' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'facebook_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Facebook Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'instagram_username',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF', 'SS', 'SL'],
      label: { default: 'Instagram Link' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'pms_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'PMS Vendor & Product name' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'integration_credentials',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Integration Credentials' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'pms_property_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'PMS Property Code' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apartment_days_available',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Display Apartments Available Up To X Days Out' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'max_apartment_available',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Max Number of Apartments per Floor Plan to Display' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'off_platform_link',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Website URL' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'website_provider',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Website Provider (if off platform)' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'city',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'City' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'state',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'State' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'postal_code',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Zip' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'timezone',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Time Zone' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'local_phone_number',
      inputType: 'phone',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Phone Number (non-tracking number)' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'email',
      inputType: 'email',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Property Email Address' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'email_recipients',
      inputType: 'email',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: true,
      displayVertical: ['MF'],
      label: { default: 'Lead Email Address(es)' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'lead_crm',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Lead CRM (if applicable)' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000006oUVIAA2', 'a1b3l000006oUTcAAM'],
    name: {
      default: 'Bot Selection & Features'
    },
    priority: 19,
    fields: [{

      dataKey: 'icon_selection',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Icon Selection' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'color_selectino',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Color Selection' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'prospect_sms',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Does property allow for contacting prospects via SMS Text?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'virtual_tours',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Virtual Tours?' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'virtual_tour',
      inputType: 'url',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Virtual Tour 1' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'virtual_tour2',
      inputType: 'url',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Virtual Tour 2' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000007cMjeAAE', 'a1b3l000006oUUHAA2', 'a1b3l000007cMjZAAU'],
    name: {
      default: 'Account Settings'
    },
    priority: 20,
    fields: [{

      dataKey: 'primary_response_contact_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Primary Contact Name for Reviewing Responses' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'primary_response_contact_email',
      inputType: 'email',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Primary Contact Email for Reviewing Responses' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'primary_response_contact_phone',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Primary Contact Phone Number for Reviewing Responses' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'below_three_start_draft',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Typically, we respond directly to 3+ star reviews on your behalf. We escalate a drafted response to 1 & 2 star reviews for your approval before posting.' },
      settings: { options: { default: ['Yes - use the standard strategy', ' No - I want to review every response before posting'] } },
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000007cMjeAAE', 'a1b3l000006oUUHAA2', 'a1b3l000007cMjZAAU'],
    name: {
      default: 'Location Response Settings'
    },
    priority: 21,
    fields: [{

      dataKey: 'escalate_response_options',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Escalate Response Options' },
      settings: { options: { default: ['Escalate All Responses w/ 24 Hour Delay', ' Escalate All 1 and 2 Star Responses w/ 24 Hour Delay', ' Escalate All 1 and 2 Star Responses w/ unlimited Delay', ' Escalate All Responses w/ unlimited Delay'] } },
      placeholder: null
    },
    {

      dataKey: 'daily_alert',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Daily Alert For All 1 and 2 Star Reviews' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {

      dataKey: 'no_default_reports',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Turn Off Default Reports' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {

      dataKey: 'escalate_revised_response',
      inputType: 'select',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Escalate Revised Response' },
      settings: { options: { default: ['Yes', ' No'] } },
      placeholder: null
    },
    {

      dataKey: 'location_escalation_contact_name',
      inputType: 'text',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Location Escalation Contact Name' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'location_escalation_contact_email',
      inputType: 'email',
      required: false,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF', 'SL'],
      label: { default: 'Location Escalation Contact Email' },
      settings: null,
      placeholder: null
    }]
  },
  {
    packageIds: ['a1b3l000007cMjeAAE', 'a1b3l000006oUUHAA2', 'a1b3l000007cMjZAAU'],
    name: {
      default: 'Review Platform Account Access'
    },
    priority: 22,
    fields: [{

      dataKey: 'apartments.com_username',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Apartments.com\nUsername' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apartments.com_password',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Apartments.com\nPassword' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apartment_guide_username',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Apartment Guide\nUsername' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apartment_guide_password',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Apartment Guide \nPassword' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apartmentRating_username',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'ApartmentRatings\nUsername' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'apartmentRating_password',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'ApartmentRatings\nPassword' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'yelp_username',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Yelp\nUsername' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'yelp_password',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['MF'],
      label: { default: 'Yelp\nPassword' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'caring.com_username',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Caring.com\nUsername' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'caring.com_password',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'Caring.com\nPassword' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'seniorAdvisor_username',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'SeniorAdvisor\nUsername' },
      settings: null,
      placeholder: null
    },
    {

      dataKey: 'seniorAdvisor_password',
      inputType: 'text',
      required: true,
      displayOnlyOnCorp: false,
      displayOnCorp: false,
      bulkEditable: false,
      isHub: false,
      displayVertical: ['SL'],
      label: { default: 'SeniorAdvisor\nPassword' },
      settings: null,
      placeholder: null
    }]
  }
]
