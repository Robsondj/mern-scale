import Scale from '../models/scale.model'
import _ from 'lodash'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
  const scale = new Scale(req.body)
  scale.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: "Successfully created!"
    })
  })
}

/**
 * Load scale and append to req.
 */
const scaleByID = (req, res, next, id) => {
  Scale.findById(id).exec((err, scale) => {
    if (err || !scale)
      return res.status('400').json({
        error: "Scale not found"
      })
    req.scale = scale
    next()
  })
}

const read = (req, res) => {
  return res.json(req.scale)
}

const list = (req, res) => {
  Scale.find((err, scales) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(scales)
  }).select('day department scaleds updated created')
}

const update = (req, res, next) => {
  let scale = req.scale
  scale = _.extend(scale, req.body)
  scale.updated = Date.now()
  scale.save((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(scale)
  })
}

const remove = (req, res, next) => {
  let scale = req.scale
  scale.remove((err, deletedScale) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    deletedScale.hashed_password = undefined
    deletedScale.salt = undefined
    res.json(deletedScale)
  })
}

export default {
  create,
  scaleByID,
  read,
  list,
  remove,
  update
}
