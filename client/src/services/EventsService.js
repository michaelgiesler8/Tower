import { AppState } from '../AppState'
import { api } from './AxiosService'
import Pop from "../utils/Pop"

class EventsService {
  async getEvents() {
    AppState.loading = true
    try {
      const res = await api.get('api/events')
      AppState.events = res.data.map(e => new Event(e))
    } catch (error) {
      Pop.error(error)
    }
    finally {
      AppState.loading = false
    }
  }

  async getEventsById(id) {
    const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = res.data() 
  }
    
  async getEventsByCreatorId() {
    const res = await api.get('api/events/creator')
    AppState.myEvents = res.data.map(e => new Event(e))
  }

  async createEvent(eventData) {
    const res = await api.get('api/events', eventData)
    AppState.events.unshift(res.data)
    return res.data
  }

  async editEvent(eventId, eventData) {
    const res = await api.put(`api/events/${eventId}`, eventData)
    AppState.activeEvent = res.data
    const eventIndex = AppState.events.findIndex(e => e.id === eventId)
    if (eventIndex !== -1) {
      AppState.events.splice(eventIndex, 1, res.data)
    }
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    AppState.activeEvent = res.data
    const eventIndex = AppState.events.findIndex(e => e.id === eventId)
    if (eventIndex !== -1) {
      AppState.events.splice(eventIndex, 1, res.data)
    }
  }
}



export const eventsService = new EventsService()