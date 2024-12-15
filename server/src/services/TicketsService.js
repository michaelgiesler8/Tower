import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js";

class TicketService {

  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId })
      .populate('profile', 'name picture')
    return tickets
  }

  async createTicket(ticketData) {
    const event = await towerEventsService.getById(ticketData.eventId);
    if (event.isCanceled) {
      throw new Error('Event is canceled');
    }
    if (await this.isEventFull(ticketData.eventId)) {
      throw new Error('Event is sold out');
    }
    const ticket = await dbContext.Tickets.create(ticketData);
    return ticket;
  }

  async isEventFull(eventId) {
    const event = await eventsService.getEventsById(eventId);
    const ticketCount = await dbContext.Tickets.countDocuments({ eventId });
    return ticketCount >= event.capacity;
  }

  async getTicketsByEvent(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('accountId', 'name picture');
    return tickets;
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