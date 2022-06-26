import { Router } from 'express'
import * as showsCtrl from '../controllers/shows.js'

const router = Router()

router.get('/', showsCtrl.index)

export {
  router
}