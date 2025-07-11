import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { HttpStatusEnum } from '../enums/http-status.enum'
import ErrorResponse from '../models/error-response'

import CategoryService from '../services/category-service'

export default class CategoryController {
	private service!: CategoryService

	constructor() {
		this.service = container.resolve(CategoryService)
	}

	async create(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Category']
			#swagger.description = 'Creates a category'
    */

		const name = request.body.name as string
		/*  
      #swagger.requestBody = {
        required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CategoryRequest"
              }  
            }
          }
        } 
    */

		try {
			const category = await this.service.create({ name })

			response.status(HttpStatusEnum.CREATED).json(category)
			/*  
        #swagger.responses[201] = {
            content: {
              "application/json": {
                schema:{
                  $ref: "#/components/schemas/CategoryResponse"
                }
              }           
            }
        }   
      */
		} catch (e: any) {
			response.status(HttpStatusEnum.BAD_REQUEST).json(new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e))
			/*  
        #swagger.responses[400] = {
            content: {
              "application/json": {
                schema:{
                  $ref: "#/components/schemas/Error"
                }
              }           
            }
        }   
      */
		}
	}

	async findAll(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Category']
      #swagger.description = 'Finds all categories'
    */

		const name = request.query.name as string
		/*  
      #swagger.parameters['name'] = {
        in: 'query',
        type: 'string',
        example: 'Alimentação'
      } 
    */

		const categories = await this.service.findAll(name)

		response.status(HttpStatusEnum.OK).json(categories)
		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                $ref: "#/components/schemas/CategoryListResponse"
              }
            }           
          }
      }   
    */
	}

	async findById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Category']
      #swagger.description = 'Finds a category by its id'
    */

		const { category_id } = request.params
		/*  
      #swagger.parameters['category_id'] = {
        type: 'number',
        example: 1
      } 
    */

		const category = await this.service.findById(+category_id)

		if (!category) response.status(HttpStatusEnum.NOT_FOUND).send()
		else response.status(HttpStatusEnum.OK).json(category)
		/*  
      #swagger.responses[404] = {
        description: "",
      }   
    */

		/*  
      #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                $ref: "#/components/schemas/CategoryResponse"
              }
            }           
          }
      }   
    */
	}

	async update(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Category']
      #swagger.description = 'Updates a category'
    */

		const { category_id } = request.params
		const id = +category_id
		/*  
      #swagger.parameters['category_id'] = {
        type: 'number',
        example: 1
      } 
    */

		const name = request.body.name as string
		/*  
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CategoryRequest"
            }  
          }
        }
      } 
    */

		try {
			const category = await this.service.update({ id, name })

			if (!category) response.status(HttpStatusEnum.NOT_FOUND).send()
			/*  
        #swagger.responses[404] = {
          description: "",
        }   
      */

			response.status(HttpStatusEnum.OK).json(category)
			/*  
        #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                $ref: "#/components/schemas/CategoryResponse"
              }
            }           
          }
        }   
      */
		} catch (e: any) {
			response.status(HttpStatusEnum.BAD_REQUEST).json(new ErrorResponse(HttpStatusEnum.BAD_REQUEST, e.message, e))
			/*  
        #swagger.responses[400] = {
          content: {
            "application/json": {
              schema:{
                $ref: "#/components/schemas/Error"
              }
            }           
          }
        }   
      */
		}
	}

	async deleteAll(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Category']
      #swagger.description = 'Deletes all categories'
    */

		const { ids } = request.query
		/*  
      #swagger.parameters['ids'] = {
        type: 'string',
        example: '1,4'
      } 
    */
		const arrayIds: number[] = (ids as string)?.split(',').map((id) => +id)

		await this.service.deleteAll(arrayIds)

		response.status(HttpStatusEnum.NO_CONTENT).send()
		/*  
      #swagger.responses[204] = {
          description: "",
      }   
    */
	}

	async deleteById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Category']
      #swagger.description = 'Deletes a category by its id'
    */

		const { category_id } = request.params
		/*  
      #swagger.parameters['category_id'] = {
        type: 'number',
        example: 1
      } 
    */

		await this.service.deleteById(+category_id)

		response.status(HttpStatusEnum.NO_CONTENT).send()
	}
}
