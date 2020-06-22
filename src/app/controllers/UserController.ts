import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../repositories/UserRepository'
import bcrypt from 'bcryptjs'
// import UserRepository from '../repositories/UserRepository'

class UserController {
  async store (req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const data = req.body

    const checkUserExists = await userRepository.findOne({
      where: { email: data.email }
    })

    if (checkUserExists) {
      return res.status(400).json({ error: 'Já existe uma conta com esse e-mail' })
    }

    data.password = await bcrypt.hash(data.password, 8)

    const user = userRepository.create(data)

    await userRepository.save(user)

    return res.json(user)
  }
}

export default new UserController()
