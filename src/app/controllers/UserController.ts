import { Response, Request } from 'express'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../repositories/UserRepository'
import bcrypt from 'bcryptjs'

class UserController {
  async store (req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const data = req.body

    // Verificando se já tem um usuario cadastrado com esse email
    const checkUserExists = await userRepository.findOne({
      where: { email: data.email }
    })

    if (checkUserExists) {
      return res.status(400).json({ error: 'Já existe uma conta com esse e-mail' })
    }

    // Criptografar a senha do usuario antes de salvar no banco
    data.password = await bcrypt.hash(data.password, 8)

    const user = userRepository.create({
      ...data,
      provider: false
    })

    await userRepository.save(user)

    return res.json(user)
  }
}

export default new UserController()
