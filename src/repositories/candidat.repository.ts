import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Candidat, CandidatRelations} from '../models';

export class CandidatRepository extends DefaultCrudRepository<
  Candidat,
  typeof Candidat.prototype.id,
  CandidatRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Candidat, dataSource);
  }
}
