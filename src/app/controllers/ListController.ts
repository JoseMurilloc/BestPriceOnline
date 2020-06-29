import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import ListRepository from '../repositories/ListRepository'

interface RequestList {
  description: string;
  user_id: number;
}

class ListController {
  async store (req: Request, res: Response) {

   try {
    const listRepository = getCustomRepository(ListRepository)

    
    const data: RequestList = req.body;
    data.user_id =  Number(req.user.id)

    const list = listRepository.create(data)

    const { description, id } = await listRepository.save(list)


    return res.status(201).json({
      description,
      id
    })
   } catch {
     return res.status(500).json({ error: 'Erro interno no servidores' })
   }
  }
}

export default new ListController()
