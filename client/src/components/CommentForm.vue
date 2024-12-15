<template>
  <form @submit.prevent="handleSubmit" class="d-flex gap-2">
    <div class="flex-grow-1">
      <input
        type="text"
        class="form-control"
        placeholder="Add a comment..."
        v-model="editable.body"
        required
      >
    </div>
    <button class="btn btn-primary" type="submit">Post</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { commentsService } from '@/services/CommentsService';
import Pop from '../utils/Pop'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})

    return {
      editable,

      async handleSubmit() {
        try {
          const commentData = {
            eventId: route.params.eventId,
            body: editable.value.body
          }
          await commentsService.createComment(commentData)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>