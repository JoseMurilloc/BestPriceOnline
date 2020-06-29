import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import CategoryRepository from '../repositories/CategoryRepository'


class CategoryController {
  async index (req: Request, res: Response) {
    const categoryRepository = getCustomRepository(CategoryRepository)

    const categories = await categoryRepository.find(
      { select: ['description'] }
    )

    return res.json(categories)
  }
}

export default new CategoryController()
