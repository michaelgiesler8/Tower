import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId })
      .populate('creator', 'name picture')
    return comments
  }

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest('Comment not found')
    }
    if (comment.creatorId.toString() !== userId) {
      throw new Forbidden('Not your comment to delete')
    }
    await dbContext.Comments.findByIdAndDelete()
    return 'Comment deleted'
  }
}

export const commentsService = new CommentsService()


