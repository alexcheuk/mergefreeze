import { Router } from 'express'
import '../../configs/passport.github'
import { authMiddleware } from '../auth/middlewares/auth.middleware'
import UserController from './controller/user.controller'

const router = Router()

router.get('/api/profile', authMiddleware, UserController.getProfile)

export default router
