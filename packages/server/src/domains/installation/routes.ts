import { Router } from 'express'
import InstallationController from './controllers/installation.controllers'
import { authMiddleware } from '../auth/middlewares/auth.middleware'

const router = Router()

router.get(
  '/api/installation',
  authMiddleware,
  InstallationController.getInstallation
)

router.delete(
  '/api/installation',
  authMiddleware,
  InstallationController.deleteInstallation
)

export default router
