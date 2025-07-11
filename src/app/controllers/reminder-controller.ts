import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { HttpStatusEnum } from '../enums/http-status.enum'
import ErrorResponse from '../models/error-response'
import IReminderParams from '../interfaces/reminder-params'
import IReminderRequest from '../interfaces/request/reminder-request'
import ReminderService from '../services/reminder-service'

export default class ReminderController {
	private service!: ReminderService

	constructor() {
		this.service = container.resolve(ReminderService)
	}

	async create(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Reminder']
      #swagger.description = 'Creates a reminder'
    */

		const { name, color, categoryId, description, scheduledAt } = request.body
		const reminderRequest: IReminderRequest = {
			name,
			...(color && { color }),
			...(categoryId && { categoryId: +categoryId }),
			...(description && { description }),
			...(scheduledAt && { scheduledAt }),
		}
		/*  
      #swagger.requestBody = {
        required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ReminderRequest"
              }  
            }
          }
        } 
    */

		try {
			const reminder = await this.service.create(reminderRequest)

			response.status(HttpStatusEnum.CREATED).json(reminder)
			/*  
        #swagger.responses[201] = {
          content: {
            "application/json": {
              schema:{
                $ref: "#/components/schemas/ReminderResponse"
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
      #swagger.tags = ['Reminder']
      #swagger.description = 'Finds all reminders'
    */

		const keyword = request.query.keyword as string
		/*  
      #swagger.parameters['keyword'] = {
        in: 'query',
        description: 'Finds all reminders by keyword',
        type: 'string',
        example: 'supermercado'
      } 
    */
		const categoryId = request.query.categoryId as string
		/*  
      #swagger.parameters['categoryId'] = {
        in: 'query',
        description: 'Finds all reminders by categoryId',
        type: 'number',
        example: 1
      } 
    */
		const color = request.query.color as string
		/*  
      #swagger.parameters['color'] = {
        in: 'query',
        description: 'Finds all reminders by hexadecimal color',
        type: 'string',
        example: '#F6F5FF'
      } 
    */

		const params: IReminderParams = {
			...(keyword && { keyword }),
			...(color && { color }),
			...(categoryId && { categoryId: +categoryId }),
		}

		const reminders = await this.service.findAll(params)

		response.status(HttpStatusEnum.OK).json(reminders)
		/*  
      #swagger.responses[200] = {
        description: "",
        content: {
          "application/json": {
            schema:{
              $ref: "#/components/schemas/ReminderListResponse"
            }
          }           
        }
      }   
    */
	}

	async findById(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Reminder']
      #swagger.description = 'Finds a reminder by its id'
    */

		const { reminder_id } = request.params
		/*  
      #swagger.parameters['reminder_id'] = {
        type: 'number',
        example: 1
      } 
    */

		const reminder = await this.service.findById(+reminder_id)

		if (!reminder) response.status(HttpStatusEnum.NOT_FOUND).send()
		else response.status(HttpStatusEnum.OK).json(reminder)
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
              $ref: "#/components/schemas/ReminderResponse"
            }
          }           
        }
      }   
    */
	}

	async update(request: Request, response: Response): Promise<void> {
		/*
      #swagger.tags = ['Reminder']
      #swagger.description = 'Updates a reminder'
    */

		const { reminder_id } = request.params
		/*  
      #swagger.parameters['reminder_id'] = {
        type: 'number',
        example: 1
      } 
    */

		const { name, color, categoryId, description, scheduledAt } = request.body

		const data: IReminderRequest = {
			id: +reminder_id,
			name,
			...(color && { color }),
			...(categoryId && { categoryId: +categoryId }),
			...(description && { description }),
			...(scheduledAt && { scheduledAt }),
		}
		/*  
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
                $ref: "#/components/schemas/ReminderRequest"
            }  
          }
        }
      } 
    */

		try {
			const reminder = await this.service.update(data)

			if (!reminder) response.status(HttpStatusEnum.NOT_FOUND).send()
			/*  
        #swagger.responses[404] = {
          description: "",
        }   
      */

			response.status(HttpStatusEnum.OK).json(reminder)
			/*  
        #swagger.responses[200] = {
          description: "",
          content: {
            "application/json": {
              schema:{
                $ref: "#/components/schemas/ReminderResponse"
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
      #swagger.tags = ['Reminder']
      #swagger.description = 'Deletes all reminders'
    */

		const { ids } = request.query
		const arrayIds: number[] = (ids as string)?.split(',').map((id) => +id)
		/*  
      #swagger.parameters['ids'] = {
        type: 'string',
        example: '1,4'
      } 
    */

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
      #swagger.tags = ['Reminder']
      #swagger.description = 'Deletes a reminder by its id'
    */

		const { reminder_id } = request.params
		/*  
      #swagger.parameters['reminder_id'] = {
        type: 'number',
        example: 1
      } 
    */

		await this.service.deleteById(+reminder_id)

		response.status(HttpStatusEnum.NO_CONTENT).send()
	}
}
