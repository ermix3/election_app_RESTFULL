import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Candidat} from '../models';
import {CandidatRepository} from '../repositories';

export class CandidatController {
  constructor(
    @repository(CandidatRepository)
    public candidatRepository : CandidatRepository,
  ) {}

  @post('/candidats')
  @response(200, {
    description: 'Candidat model instance',
    content: {'application/json': {schema: getModelSchemaRef(Candidat)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidat, {
            title: 'NewCandidat',
            exclude: ['id'],
          }),
        },
      },
    })
    candidat: Omit<Candidat, 'id'>,
  ): Promise<Candidat> {
    return this.candidatRepository.create(candidat);
  }

  @get('/candidats/count')
  @response(200, {
    description: 'Candidat model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Candidat) where?: Where<Candidat>,
  ): Promise<Count> {
    return this.candidatRepository.count(where);
  }

  @get('/candidats')
  @response(200, {
    description: 'Array of Candidat model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Candidat, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Candidat) filter?: Filter<Candidat>,
  ): Promise<Candidat[]> {
    return this.candidatRepository.find(filter);
  }

  @patch('/candidats')
  @response(200, {
    description: 'Candidat PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidat, {partial: true}),
        },
      },
    })
    candidat: Candidat,
    @param.where(Candidat) where?: Where<Candidat>,
  ): Promise<Count> {
    return this.candidatRepository.updateAll(candidat, where);
  }

  @get('/candidats/{id}')
  @response(200, {
    description: 'Candidat model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Candidat, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Candidat, {exclude: 'where'}) filter?: FilterExcludingWhere<Candidat>
  ): Promise<Candidat> {
    return this.candidatRepository.findById(id, filter);
  }

  @patch('/candidats/{id}')
  @response(204, {
    description: 'Candidat PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Candidat, {partial: true}),
        },
      },
    })
    candidat: Candidat,
  ): Promise<void> {
    await this.candidatRepository.updateById(id, candidat);
  }

  @put('/candidats/{id}')
  @response(204, {
    description: 'Candidat PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() candidat: Candidat,
  ): Promise<void> {
    await this.candidatRepository.replaceById(id, candidat);
  }

  @del('/candidats/{id}')
  @response(204, {
    description: 'Candidat DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.candidatRepository.deleteById(id);
  }
}
