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
import {Electeur} from '../models';
import {ElecteurRepository} from '../repositories';

export class ElecteurController {
  constructor(
    @repository(ElecteurRepository)
    public electeurRepository : ElecteurRepository,
  ) {}

  @post('/electeurs')
  @response(200, {
    description: 'Electeur model instance',
    content: {'application/json': {schema: getModelSchemaRef(Electeur)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Electeur, {
            title: 'NewElecteur',
            exclude: ['id'],
          }),
        },
      },
    })
    electeur: Omit<Electeur, 'id'>,
  ): Promise<Electeur> {
    return this.electeurRepository.create(electeur);
  }

  @get('/electeurs/count')
  @response(200, {
    description: 'Electeur model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Electeur) where?: Where<Electeur>,
  ): Promise<Count> {
    return this.electeurRepository.count(where);
  }

  @get('/electeurs')
  @response(200, {
    description: 'Array of Electeur model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Electeur, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Electeur) filter?: Filter<Electeur>,
  ): Promise<Electeur[]> {
    return this.electeurRepository.find(filter);
  }

  @patch('/electeurs')
  @response(200, {
    description: 'Electeur PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Electeur, {partial: true}),
        },
      },
    })
    electeur: Electeur,
    @param.where(Electeur) where?: Where<Electeur>,
  ): Promise<Count> {
    return this.electeurRepository.updateAll(electeur, where);
  }

  @get('/electeurs/{id}')
  @response(200, {
    description: 'Electeur model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Electeur, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Electeur, {exclude: 'where'}) filter?: FilterExcludingWhere<Electeur>
  ): Promise<Electeur> {
    return this.electeurRepository.findById(id, filter);
  }

  @patch('/electeurs/{id}')
  @response(204, {
    description: 'Electeur PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Electeur, {partial: true}),
        },
      },
    })
    electeur: Electeur,
  ): Promise<void> {
    await this.electeurRepository.updateById(id, electeur);
  }

  @put('/electeurs/{id}')
  @response(204, {
    description: 'Electeur PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() electeur: Electeur,
  ): Promise<void> {
    await this.electeurRepository.replaceById(id, electeur);
  }

  @del('/electeurs/{id}')
  @response(204, {
    description: 'Electeur DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.electeurRepository.deleteById(id);
  }
}
