const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generete Unique ID', () => {
  it('should generate as unique ID', () => {
    const id = generateUniqueId()

    expect(id).toHaveLength(8)
  })
});