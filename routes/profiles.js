import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.get('/:id/edit', isLoggedIn, profilesCtrl.edit)
router.patch('/:id', isLoggedIn, profilesCtrl.update)
// router.get('/:id', isLoggedIn, profilesCtrl.show)
// router.post('/:id/shows', isLoggedIn, profilesCtrl.createShow)
// router.delete('/shows/:id', isLoggedIn, profilesCtrl.deleteShow)


export {
  router
}