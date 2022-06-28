import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as reviewsCtrl from "../controllers/reviews.js"

const router = Router()


router.post('/:id', isLoggedIn, reviewsCtrl.create)

export {
  router
}