import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../repositories/UserRepository'
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

      const passwordMath = compare(password, user.password)

      if (!passwordMath) {
        return res.status(400).json({ error: 'E-mail ou senha inválido' })
      }

      const token = sign({ provider: user.provider }, 'bb4f6b6babc0c14f67e99f4601aaaaca', {
        subject: String(user.id),
        expiresIn: '1d'
      })

      delete user.password

      return res.json({ user, token })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new SessionController()
