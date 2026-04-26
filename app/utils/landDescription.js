export function generateLandDescription1(form) {
  const templates = [
    `<p>Prime <strong>{quantity} {unit}</strong> of land located at <strong>{city}, {state}</strong>. This property is ideal for residential development and long-term investment.</p>
    
    <p>Situated in a fast-growing and highly accessible neighborhood with good road network and developing infrastructure.</p>
    
    <p><strong>Features:</strong></p>
    <ul>
      <li>Secure environment</li>
      <li>Good road access</li>
      <li>Developing area</li>
      <li>High investment value</li>
    </ul>
    
    <p>Perfect opportunity for serious investors looking for land in a promising location.</p>`,

    `<p>Available for sale: <strong>{quantity} {unit}</strong> of land in <strong>{city}, {state}</strong>.</p>
    
    <p>This land is located in a peaceful and rapidly developing area, suitable for residential or investment purposes.</p>
    
    <p>Good access road and secure environment make it a great buy.</p>`,

    `<p>Secure a premium <strong>{quantity} {unit}</strong> of land in the heart of <strong>{city}, {state}</strong>.</p>
    
    <p>This property is perfect for investors looking for high-value appreciation in a fast-developing environment.</p>
    
    <p>The area offers excellent accessibility, steady development, and strong future returns.</p>`,

    `<p>Excellent <strong>{quantity} {unit}</strong> of land located in <strong>{city}, {state}</strong>, ideal for building residential or commercial structures.</p>
    
    <p>The land is situated in a developing area with good road access and stable environment.</p>
    
    <p>Perfect for developers and builders looking for a solid project location.</p>`,

    `<p>Hot deal! <strong>{quantity} {unit}</strong> of land available in <strong>{city}, {state}</strong>.</p>
    
    <p>This is a rare opportunity in a fast-growing area with increasing demand and rising value.</p>
    
    <p>Secure your investment today before prices increase.</p>`,

    `<p>Well-located <strong>{quantity} {unit}</strong> of land in <strong>{city}, {state}</strong>, perfect for residential development.</p>
    
    <p>Peaceful environment suitable for family housing and community living.</p>
    
    <p>Good road access and nearby developing residential estates.</p>`,

    `<p><strong>{quantity} {unit}</strong> of land for sale in <strong>{city}, {state}</strong>.</p>
    
    <p>Located in a developing area with good accessibility and future growth potential.</p>
    
    <p>Ideal for residential or investment use.</p>`,

    `<p>Strategically located <strong>{quantity} {unit}</strong> of land in <strong>{city}, {state}</strong>.</p>
    
    <p>Perfect for estate development, residential buildings, or commercial projects.</p>
    
    <p>The area is experiencing rapid growth with increasing property demand.</p>`,

    `<p>Affordable <strong>{quantity} {unit}</strong> of land available in <strong>{city}, {state}</strong>.</p>
    
    <p>This property offers excellent value for money in a developing and accessible area.</p>
    
    <p>Good for long-term investment and future development plans.</p>`,

    `<p>Premium land opportunity: <strong>{quantity} {unit}</strong> located in <strong>{city}, {state}</strong>.</p>
    
    <p>This property sits in a high-potential growth area with strong infrastructure development.</p>
    
    <p>Ideal for investors seeking long-term capital appreciation and strategic land banking.</p>`
  ]

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)]

  const safe = (val) => val || ''

  return randomTemplate
    .replaceAll('{city}', safe(form.location?.city))
    .replaceAll('{state}', safe(form.location?.state))
    .replaceAll('{quantity}', safe(form.landDetails?.quantity) || 1)
    .replaceAll('{unit}', safe(form.landDetails?.unit) || 'plot')
}

export function generateLandDescription2(form) {
  const templates = [
    `<p>Well-positioned <strong>{quantity} {unit}</strong> of land available at <strong>{city}, {state}</strong>. Suitable for residential development and future investment.</p>

    <p>Located in a growing area with good accessibility and peaceful surroundings.</p>

    <p>Perfect for buyers seeking value and long-term returns.</p>`,

    `<p>Now selling <strong>{quantity} {unit}</strong> of land in <strong>{city}, {state}</strong>.</p>

    <p>This property is ideal for building a home, estate project, or land banking opportunity.</p>

    <p>Secure environment with promising development prospects.</p>`,

    `<p>Excellent land opportunity in <strong>{city}, {state}</strong>. This <strong>{quantity} {unit}</strong> parcel is suitable for residential or commercial use.</p>

    <p>Accessible road network and fast-growing neighborhood make it a smart purchase.</p>`,

    `<p>Own a valuable <strong>{quantity} {unit}</strong> of land located in <strong>{city}, {state}</strong>.</p>

    <p>Strategically positioned in a developing area with rising property demand.</p>

    <p>Ideal for serious investors and developers.</p>`,

    `<p>Affordable <strong>{quantity} {unit}</strong> of land for sale at <strong>{city}, {state}</strong>.</p>

    <p>Suitable for private residence, rental development, or future resale.</p>

    <p>Great chance to secure land in a promising location.</p>`,

    `<p>Prime dry land measuring <strong>{quantity} {unit}</strong> situated in <strong>{city}, {state}</strong>.</p>

    <p>The area offers easy access, steady growth, and strong investment potential.</p>

    <p>An excellent choice for land buyers.</p>`,

    `<p>Strategically located <strong>{quantity} {unit}</strong> of land now available in <strong>{city}, {state}</strong>.</p>

    <p>Perfect for housing projects, private homes, or commercial development.</p>

    <p>Secure neighborhood with developing infrastructure.</p>`,

    `<p>Premium land listing: <strong>{quantity} {unit}</strong> in <strong>{city}, {state}</strong>.</p>

    <p>Located in a peaceful and fast-rising area with increasing property value.</p>

    <p>Smart opportunity for long-term investors.</p>`,

    `<p><strong>{quantity} {unit}</strong> of land for sale in <strong>{city}, {state}</strong>.</p>

    <p>This property is positioned in a desirable area with good road access and nearby developments.</p>

    <p>Suitable for immediate or future development.</p>`,

    `<p>Secure this attractive <strong>{quantity} {unit}</strong> of land at <strong>{city}, {state}</strong>.</p>

    <p>Good location, peaceful setting, and excellent growth potential.</p>

    <p>Ideal for anyone looking to invest in land today.</p>`
  ]

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)]

  const safe = (val) => val || ''

  return randomTemplate
    .replaceAll('{city}', safe(form.location?.city))
    .replaceAll('{state}', safe(form.location?.state))
    .replaceAll('{quantity}', safe(form.landDetails?.quantity) || 1)
    .replaceAll('{unit}', safe(form.landDetails?.unit) || 'plot')
}

export function generateLandDescription3(form) {
  const templates = [
    `<p>Prime <strong>{quantity} {unit}</strong> of land available at <strong>{city}, {state}</strong>. Ideal for residential development or smart investment.</p>
     <p>Located in a peaceful and growing environment with excellent future value.</p>
     {featuresBlock}
     <p>A great opportunity to secure land in a promising location.</p>`,

    `<p>Now selling <strong>{quantity} {unit}</strong> of land in <strong>{city}, {state}</strong>.</p>
     <p>This property is suitable for private homes, estate projects, or long-term land banking.</p>
     {featuresBlock}
     <p>Perfect for buyers seeking value and growth potential.</p>`,

    `<p>Well-positioned <strong>{quantity} {unit}</strong> of land located in <strong>{city}, {state}</strong>.</p>
     <p>Fast-developing area with strong demand and easy accessibility.</p>
     {featuresBlock}
     <p>Secure this property today for future returns.</p>`,

    `<p>Premium land opportunity: <strong>{quantity} {unit}</strong> at <strong>{city}, {state}</strong>.</p>
     <p>Excellent choice for developers, investors, or personal residential use.</p>
     {featuresBlock}
     <p>Situated in a location with increasing property value.</p>`,

    `<p><strong>{quantity} {unit}</strong> of land for sale in <strong>{city}, {state}</strong>.</p>
     <p>Good environment, strategic location, and ideal for building projects.</p>
     {featuresBlock}
     <p>Rare chance to own land in a fast-rising area.</p>`
  ]

  const featureMap = {
    dry: 'Dry Land',
    roadAccess: 'Good Road Access',
    tarredRoad: 'Tarred Road',
    fenced: 'Fenced',
    tableLand: 'Flat/Table Land',
    electricity: 'Electricity Available',
    waterSupply: 'Water Supply Nearby',
    drainage: 'Drainage System',
    boreholePossible: 'Borehole Possible',
    gatedEstate: 'Inside Estate',
    security: 'Security Area',
    cornerPiece: 'Corner Piece',
    developedArea: 'Developed Neighborhood',
    sandFilled: 'Sand Filled',
    floodFree: 'Flood Free',
    cleared: 'Cleared / Ready to Build',
    rocky: 'Rocky Soil'
  }

  const selectedFeatures = Array.isArray(form.features)
    ? form.features
        .map(item => {
          if (typeof item === 'string') return featureMap[item]
          if (item?.key) return featureMap[item.key]
          return null
        })
        .filter(Boolean)
        .slice(0, 6)
    : []

  const featuresBlock = selectedFeatures.length
    ? `
      <p><strong>Features:</strong></p>
      <ul>
        ${selectedFeatures.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `
    : ''

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)]

  const safe = (val) => val || ''

  return randomTemplate
    .replaceAll('{city}', safe(form.location?.city))
    .replaceAll('{state}', safe(form.location?.state))
    .replaceAll('{quantity}', safe(form.landDetails?.quantity) || 1)
    .replaceAll('{unit}', safe(form.landDetails?.unit) || 'plot')
    .replaceAll('{featuresBlock}', featuresBlock)
}

export function generateLandDescription(form) {
  const generators = [
    generateLandDescription1,
    generateLandDescription2,
    generateLandDescription3
  ]

  const random =
    generators[Math.floor(Math.random() * generators.length)]

  return random(form)
}