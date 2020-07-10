import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../repositories/UserRepository'
import authConfig from '../config/auth'

import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'

class SessionController {
  async store (req: Request, res: Response) {
    try {
      const userRepository = getCustomRepository(UserRepository)

      const { email, password } = req.body

      const user = await userRepository.findOne({
        where: { email }
      })

      if (!user) {
        return res.status(400).json({ error: 'E-mail ou senha inválido' })
      }

      const passwordMath = await compare(password, user.password)

      if (!passwordMath) {
        return res.status(400).json({ error: 'E-mail ou senha inválido' })
      }

      const token = sign({ provider: user.provider }, authConfig.secret, {
        subject: String(user.id),
        expiresIn: authConfig.expiresIn
      })

      delete user.password

      return res.json({ user, token })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new SessionController()
