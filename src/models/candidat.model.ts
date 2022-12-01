import {Entity, model, property} from '@loopback/repository';

@model()
export class Candidat extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nom?: string;

  @property({
    type: 'string',
  })
  prenom?: string;

  @property({
    type: 'date',
  })
  dateNaissance?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  electeurs?: object[];


  constructor(data?: Partial<Candidat>) {
    super(data);
  }
}

export interface CandidatRelations {
  // describe navigational properties here
}

export type CandidatWithRelations = Candidat & CandidatRelations;
