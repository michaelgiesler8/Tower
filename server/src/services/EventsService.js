import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getEvents() {
    const events = await dbContext.Events.find()
      .populate('creator')
    return events
  }

  async getEventById(id) {
    const event = await dbContext.Events.findById(id)
      .populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid Event Id')
    }
    return event
  }

  async createEvent(eventData) {
    const events = await dbContext.Events.create(eventData)
    await events.populate('creator')
    return events
  }
}

export const eventsService = new EventsService