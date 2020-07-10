import { hash } from 'bcryptjs';
import { Provider } from './../models/Provider';
import { User } from './../models/User';
import { Request, Response } from "express";
import { getRepository } from "typeorm";

class ProviderController {

  async index(req: Request, res: Response) {
    const providerRepository = getRepository(Provider)
    const userRepository = getRepository(User)
    const { id } = req.user

    try {
      const providers = await userRepository.find({
        where: {
          user_id: id
        },
        join: {
          alias: 'provider',
          leftJoinAndSelect: {
            user: 'provider.user'
          }
        },
        select: ['email', 'name', 'avatar']
      })


      return res.json(providers)
    } catch(err) {
      return res.status(400).json({ error: err.message })
    }
  }

  async store(req: Request, res: Response) {

      const userRepository = getRepository(User)
      const providerRepository = getRepository(Provider)
      const data = req.body;

      try {
        const provider = await providerRepository.findOne(data.provider_id);

        if (!provider) return res.status(400).json(
          {
            error: 'O fornecedor selecionado para este vendedor não existe'
          }
        )

        const checkUserExists = await userRepository.findOne({
          where: { email: data.email }
        })

        if (checkUserExists) {
          return res.status(400).json({ error: 'Já existe uma conta com esse e-mail' })
        }

        // Criptografar a senha do usuario antes de salvar no banco
        data.password = await hash(data.password, 8)

        const userProvider = userRepository.create({
          ...data,
          provider: true,
          user_id: Number(req.user.id),
          provider_id: provider.id
        })

        await userRepository.save(userProvider)

        return res.json(userProvider)
      } catch(err) {
        return res.status(400).json({
          error: err.message
        })
      }

  }

}

export default new ProviderController();
