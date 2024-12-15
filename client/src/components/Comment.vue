<template>
  <div class= "comment bg-light p-3 mb-2 rounded">
    <div class="d-flex justify-content-between align-items-start">
      <div class="d-flex align-items-center gap-2">
        <img :src="comment.creator.picture" :alt="comment.creator.name" class="rounded-circle" height="40">
        <p class="mb-0 fw-bold">{{  comment.creator.name  }}</p>
      </div>
      <button v-if="comment.creator.id == account.id" @click="deleteComment" class=" btn btn-danger btn-sm">
        <i class="mdi mdi-delete"></i>
      </button>
    </div>
    <p class="mb-0 mt-2">{{  comment.body  }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '@/services/CommentsService';
import Pop from '../utils/Pop'

export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),

      async deleteComment() {
        try {
          if (await Pop.confirm('Delete this comment?')) {
            await commentsService.deleteComment(props.comment.id)
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>