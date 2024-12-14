import { AppState } from '../AppState'
import { api } from './AxiosService'

class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data
  }

  async getEventsById(id) {
    const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = res.data() 
  }
    

  async createEvent(eventData) {
    const res = await api.get('api/events', eventData)
    AppState.events.unshift(res.data)
    return res.data
  }
}



export const eventsService = new EventsService()