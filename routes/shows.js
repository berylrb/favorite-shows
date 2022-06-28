import { Router } from 'express'
import * as showsCtrl from '../controllers/shows.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.post('/search', isLoggedIn, showsCtrl.showSearch)
router.get('/:id', isLoggedIn, showsCtrl.show)
router.patch("/:id/addToCollection", isLoggedIn, showsCtrl.addToCollection)
router.patch("/:id/removeFromCollection", isLoggedIn, showsCtrl.removeFromCollection)

export {
  router
}