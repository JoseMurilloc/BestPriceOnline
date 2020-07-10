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

  async update (req: Request, res: Response) {
    const { email, OldPassword, password } = req.body;

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne(req.user.id);

    if (email && email !== user.email) {
      const userExists = await userRepository.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe' });
      } else {
        user.email = email
      }
    }

    // const checkPassword = async() => await bcrypt.compare(user.password, oldPassword)

    if (OldPassword) {
      const checkPassword = await bcrypt.compare(OldPassword, user.password)

      if (!checkPassword) {
        return res.status(401).json({ error: 'Senha antiga não corresponde' });
      } else {
        user.password = await bcrypt.hash(password, 8)
      }
    }

    await userRepository.save(user);

    return res.json({
      user
    });
  }
}

export default new UserController()
