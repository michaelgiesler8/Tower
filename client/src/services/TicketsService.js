import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async getEventTickets(eventId) {
    const res = await api.get(`api/tickets/${eventId}`)
    AppState.tickets = res.data.map(ticket => new Ticket(ticket))
  }

  async createTicket(eventId) {
    const res = await api.post('api/tickets', { eventId })
    AppState.tickets.push(new Ticket(res.data))
    return res.data
  }

  async removeTicket(ticketId) {
    await api.delete(`api/tickets/${ticketId}`)
    AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
  }
}

export const ticketsService = new TicketsService()