import { Auth0Provider } from '@bcwdev/auth0provider';
import BaseController from '../utils/BaseController';
import { eventsService } from '../services/EventsService'

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    console.log('Events Controller Successfully Registered!')
    this.router
      .get('', this.getEvents)
      .get('/:id', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }

  async getEvents(req, res, next) {
    try {
      const events = await eventsService.getEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const event = await eventsService.editEvent(req.params.id, req.body, req.userInfo.id)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.cancelEvent(req.params.id, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
}
