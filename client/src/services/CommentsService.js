import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"

class CommentsService {
  async getEventComments(eventId) {
    AppState.loading = true
    try {
      const res = await api.get(`api/events/${eventId}/comments`)
      AppState.comments = res.data
    } catch (error) {
      Pop.error(error)
    }
    finally {
      AppState.loading = false
    }
  }
  async createComment(commentData) {
    AppState.loading = true
    try {
      const res = await api.post('api/comments', commentData)
      AppState.comments.push(res.data)
      return res.data
    } catch (error) {
      Pop.error(error)
    }
    finally {
      AppState.loading = false
    }
  }

  async deleteComment(commentId) {
    AppState.loading = true 
    try {
      await api.delete(`api/comments/${commentId}`)
      AppState.comments = AppState.comments.filter(c => c.id !== commentId)
    } catch (error) {
      Pop.error(error)
    }
    finally {
      AppState.loading = false
    }
  }
}

export const commentsService = new CommentsService()