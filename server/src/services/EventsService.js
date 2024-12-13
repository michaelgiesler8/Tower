import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class EventsService {
  async getEventsById(eventId) {
    const events = await dbContext.Events.findById(eventId)
      .populate('creator')
      .populate('ticketCount')
    if (!event) {
      throw new Error('Invalid Event Id')
    }
    return events
  }

  async cancelEvent(eventId, userId) {
    const event = await this.getEventsById(eventId)
    if (event.creatorId.toString() !== userId) {
      throw new Error('Unauthorized')
    }
    event.isCanceled = true
    await event.save()
    return event
  }

  async createEvent(eventData) {
    const events = await dbContext.Events.create(eventData)
    await events.populate('creator')
    return events
  }
}



export const eventsService = new EventsService