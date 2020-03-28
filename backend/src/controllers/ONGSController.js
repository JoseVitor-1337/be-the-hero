const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
  async insert(request, response) {

    const { name, email, whatsapp, city, uf } = request.body
    const id = generateUniqueId()

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({ id })
  },

  async select(request, response) {
    const ongs = await connection('ongs').select('*')

    return response.json(ongs)
  }
}