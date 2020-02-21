import express from 'express'
import scaleCtrl from '../controllers/scale.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/scales')
  .get(scaleCtrl.list)
  .post(scaleCtrl.create)


router.route('/api/scales/:scaleId')
  .get(authCtrl.requireSignin, scaleCtrl.read)
  .put(authCtrl.requireSignin, scaleCtrl.update)
  .delete(authCtrl.requireSignin, scaleCtrl.remove)


router.param('scaleId', scaleCtrl.scaleByID)

export default router
