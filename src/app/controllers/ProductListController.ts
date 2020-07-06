import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import ListProductRepository from '../repositories/ListProductRepository';

class ProductListController {
  async store(req: Request, res: Response) {

    const listProductRepository = getCustomRepository(ListProductRepository)

    const listProducts = listProductRepository.create(req.body);

    await listProductRepository.save(listProducts)

    return res.json(listProducts)
  }
}

export default new ProductListController()
