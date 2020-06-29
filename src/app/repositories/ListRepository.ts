import { List } from '../models/List'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(List)
class ListRepository extends Repository<List> {

}

export default ListRepository