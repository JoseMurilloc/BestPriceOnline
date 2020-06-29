import { Response, Request } from 'express'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../repositories/UserRepository'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import uploadConfig from '../config/upload'
import path from 'path'

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

  async create (req: Request, res: Response) {
    try {
     
      const userRepository = getCustomRepository(UserRepository)

      const user = await userRepository.findOne(req.user.id)

      if (!user) {
        return res.status(400).json('Somente usuario authenticados podem mudar o avatar')
      }

      if (user.avatar) {
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

        if(userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath)
        }
      }

      user.avatar = req.file.filename

      await userRepository.save(user)
  

      return res.json(user)
    } catch(err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

export default new UserController()
