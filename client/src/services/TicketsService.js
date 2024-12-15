import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import Pop from "../utils/Pop.js"

class TicketsService {
  async getEventTickets(eventId) {
    AppState.loading = true
    try {
      const res = await api.get(`api/tickets/${eventId}`)
      AppState.tickets = res.data
    } catch (error) {
      Pop.error(error)
    }
    finally {
      AppState.loading = false
    }
  }

  async createTicket(eventId) {
    AppState.loading = true
    try {
      const res = await api.post('api/tickets', { eventId })
      AppState.tickets.push(res.data)
      return res.data
    } catch (error) {
      Pop.error(error)
    }
    finally {
      AppState.loading = false
    }
  }


  async removeTicket(ticketId) {
    AppState.loading = true
    try {
      await api.delete(`api/tickets/${ticketId}`)
      AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
    } catch (error) {
      Pop.error(error)
    }
    finally {
      AppState.loading = false
    }
  }
}

export const ticketsService = new TicketsService()