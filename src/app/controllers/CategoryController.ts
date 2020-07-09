import { Category } from './../models/Category';
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

class CategoryController {
  async index (req: Request, res: Response) {
    const categoryRepository = getRepository(Category)

    const categories = await categoryRepository.find(
      { select: ['description'] }
    )

    return res.json(categories)
  }
}

export default new CategoryController()
