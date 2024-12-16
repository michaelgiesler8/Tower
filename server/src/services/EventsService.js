import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async getEvents() {
    const events = await dbContext.Events.find()
      .populate('creator', 'name picture')
      .populate('ticketCount')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId)
      .populate('creator', 'name picture')
      .populate('ticketCount')
    if (!event) throw new BadRequest('Invalid Event Id')
    return event
  }

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }

  async editEvent(eventId, eventData, userId) {
    const event = await this.getEventById(eventId)
    if (event.creatorId.toString() !== userId) {
      throw new Forbidden('Not your event to edit')
    }
    if (event.isCanceled) {
      throw new BadRequest('Cannot edit canceled event')
    }

    const updatedEvent = await dbContext.Events.findByIdAndUpdate(
      eventId,
      eventData,
      { new: true, runValidators: true }
    ).populate('creator', 'name picture')
    return updatedEvent
  }

  async cancelEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    if (event.creatorId.toString() !== userId) {
      throw new Forbidden('Not your event to cancel')
    }
    event.isCanceled = true
    await event.save()
    return event
  }
}

export const eventsService = new EventsService()
