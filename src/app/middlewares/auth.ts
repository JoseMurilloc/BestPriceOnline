
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'
import { Request, Response, NextFunction } from 'express'

interface TokenPayload {
  provider: boolean;
  iat: number;
  exp: number;
  sub: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token inválido' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.secret)
    // decoded basicamente é os dados do payload do Token
    const { provider, sub } = decoded as TokenPayload

    if (provider) {
      return res.status(400).json({
        error: 'User is not access to resources'
      })
    }

    req.user = {
      id: sub,
      provider
    }

    return next()

  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' })
  }
}
