import { Request } from 'express'
import { JWTPayload } from '../dtos/jwt-payload'

export type AuthenticatedUser = JWTPayload

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload
}
