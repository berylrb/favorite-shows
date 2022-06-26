import { Router } from 'express'
import * as showsCtrl from '../controllers/shows.js'
// import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', showsCtrl.index)
// router.get('/new', showsCtrl.new)

export {
  router
}