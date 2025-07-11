import express, { Request, Response } from 'express'

import ReminderController from '../controllers/reminder-controller'

const routes = express.Router()
const controller = new ReminderController()

routes.post('/', (req: Request, res: Response) => {
	controller.create(req, res)
})

routes.get('/', (req: Request, res: Response) => {
	controller.findAll(req, res)
})

routes.get('/:reminder_id', (req: Request, res: Response) => {
	controller.findById(req, res)
})

routes.put('/:reminder_id', (req: Request, res: Response) => {
	controller.update(req, res)
})

routes.delete('/', (req: Request, res: Response) => {
	controller.deleteAll(req, res)
})

routes.delete('/:reminder_id', (req: Request, res: Response) => {
	controller.deleteById(req, res)
})

export default routes
