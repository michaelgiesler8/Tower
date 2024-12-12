import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getEvents() {
    const events = await dbContext.Events.find()
      .populate('creator')
    return events
  }

  async createEvent(eventData) {
    const events = await dbContext.Events.create(eventData)
    await events.populate('creator')
    return events
  }
}