import { Product } from './../models/Product'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {

}

export default ProductRepository
