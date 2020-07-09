import { Category } from './../models/Category';
import { Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'

import ProductRepository from '../repositories/ProductRepository'

interface RequestProduct {
  description: string;
  unity: string;
  barcode: string;
  brand: string;
  user_id: number;
  category_id: number;
}

class ProductController {


  async index(req: Request, res: Response) {
    try {
      const productRepository = getCustomRepository(ProductRepository)

      const products = await productRepository.find({
        select: ['description', 'barcode', 'brand', 'unity'],
        where: { user_id: req.user.id }
      })

      return res.json(products)
    } catch(err) {
      return res.status(500).json(
        {
          message_error: err.message
        }
      )
    }
  }

  async store (req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)
    const categoryRepository = getRepository(Category)

    let data : RequestProduct;

    data = req.body;
    data.user_id = Number(req.user.id);

    let category = await categoryRepository.findOne({
      where: { description: data.category_id }
    })

    // Se a categoria não existe
    if (!category) {
      const newCategory = categoryRepository.create({
        description: String(data.category_id),
      })

      const response = await categoryRepository.save(newCategory)
      console.log(response)
      data.category_id = response.id;
    }

    data.category_id = category.id

    const product = productRepository.create(data)

    await productRepository.save(product)
    return res.json(product)
  }
}

export default new ProductController()
