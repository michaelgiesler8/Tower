import { api } from './AxiosService'
import { AppState } from '../AppState'

class CommentsService {
  async getEventComments(eventId) {
    const res = await api.get(`api/comments/${eventId}`)
    AppState.comments = res.data
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    AppState.comments.push(res.data)
  }

  async deleteComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(c => c.id !== commentId)
  }
}

export const commentsService = new CommentsService()