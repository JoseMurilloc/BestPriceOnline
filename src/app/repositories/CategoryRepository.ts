import { Category } from './../models/Category'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {

}

export default CategoryRepository
