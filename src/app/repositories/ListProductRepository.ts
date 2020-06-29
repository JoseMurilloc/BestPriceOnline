import { ListProduct } from '../models/ListProduct'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(ListProduct)
class ListProductRepository extends Repository<ListProduct> {

}

export default ListProductRepository
