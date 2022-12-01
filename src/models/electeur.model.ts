import {Entity, model, property} from '@loopback/repository';

@model()
export class Electeur extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    default: "",
  })
  prenom?: string;

  @property({
    type: 'string',
  })
  nom?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  candidats?: object[];


  constructor(data?: Partial<Electeur>) {
    super(data);
  }
}

export interface ElecteurRelations {
  // describe navigational properties here
}

export type ElecteurWithRelations = Electeur & ElecteurRelations;
