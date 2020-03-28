const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
 
const ONGSController = require('./controllers/ONGSController')
const CasesController = require('./controllers/CasesController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

let routes = express.Router()
 
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), SessionController.insert)

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), ONGSController.insert)
routes.get('/ongs', ONGSController.select)

routes.post('/cases', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
}), CasesController.insert)

routes.get('/cases',celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), CasesController.select)

routes.delete('/cases/:id',celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), CasesController.delete)

routes.get('/profiles', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.select)

module.exports = routes