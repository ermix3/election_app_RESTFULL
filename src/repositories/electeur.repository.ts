import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Electeur, ElecteurRelations} from '../models';

export class ElecteurRepository extends DefaultCrudRepository<
  Electeur,
  typeof Electeur.prototype.id,
  ElecteurRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Electeur, dataSource);
  }
}
