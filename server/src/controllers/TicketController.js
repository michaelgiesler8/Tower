import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { ticketService } from "../services/TicketsService";

export class TicketController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.deleteTicket)
  }

  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketService.createTicket(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const userId = req.userInfo.id
      const ticketId = req.params.id
      const message = await ticketService.deleteTicket(ticketId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}