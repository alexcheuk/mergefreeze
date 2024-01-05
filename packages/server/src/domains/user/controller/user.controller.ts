import { Request, Response } from 'express'

export const getProfile = (req: Request, res: Response) => {
  res.json(req.user)
}

export default {
  getProfile,
}
