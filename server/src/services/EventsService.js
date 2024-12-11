class EventsService {
  async getEvents() {
    const events = await dbContext.Events.find()
      .populate('creator')
    return events
  }

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator')
    return event
  }
}