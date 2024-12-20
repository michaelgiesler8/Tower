import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js";

class TicketService {
  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId })
      .populate('profile', 'name picture')
    return tickets
  }

  async createTicket(ticketData) {
    const event = await dbContext.Events.findById(ticketData.eventId);
    if (event.isCanceled) {
      throw new BadRequest('Event is canceled');
    }
    const tickets = await this.getEventTickets(ticketData.eventId)
    if (tickets.length >= event.capacity) {
      throw new BadRequest('Event is sold out');
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    return ticket;
  }



  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    if (ticket.accountId.toString() !== userId) {
      throw new Error('Unauthorized');
    }
    await dbContext.Tickets.findByIdAndDelete(ticketId);
    return 'Ticket successfully deleted';
  }
}

export const ticketService = new TicketService();