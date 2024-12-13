import { dbContext } from '../db/DbContext';

class CommentService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData);
    await comment.populate('creator');
    return comment;
  }

  async getCommentsByEvent(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture');
    return comments;
  }

  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (comment.creatorId.toString() !== userId) {
      throw new Error('Unauthorized');
    }
    await dbContext.Comments.findByIdAndDelete(commentId);
    return { message: 'Comment Successfully Deleted' };
  }
}

export const commentService = new CommentService();
