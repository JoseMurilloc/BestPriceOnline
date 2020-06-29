import { List } from './../models/list'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(List)
class ListRepository extends Repository<List> {

}

export default ListRepository