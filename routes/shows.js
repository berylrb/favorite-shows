import { Router } from 'express'
import * as showsCtrl from '../controllers/shows.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.post('/search', isLoggedIn, showsCtrl.showSearch)
// router.get('/', showsCtrl.index)

export {
  router
}