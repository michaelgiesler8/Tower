<template>
  <div class="event-details">
    <div class="event-header">
      <img :src="event.coverImg" :alt="event.name">
      <div class="event-info">
        <h1>{{ event.name }}</h1>
        <span :class="{'canceled': event.isCanceled}">
          {{ event.isCanceled ? 'CANCELED' : event.ticketCount >= event.capacity ? 'SOLD OUT' : 'AVAILABLE' }}
        </span>
      </div>
    </div>
    <button
      @click="purchaseTicket"
      :disabled="event.isCanceled || event.ticketCount >= event.capacity"
    >
      Get Ticket
    </button>

    <div class="comments-section">
      <form @submit.prevent="postComment" class="comment-form">
        <textarea v-model="newComment" required></textarea>
        <button type="submit">Post Comment</button>
      </form>

      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <img :src="comment.creator.picture" class="creator-img">
          <div class="comment-content">
            <h4>{{ comment.creator.name }}</h4>
            <p>{{  comment.body }}</p>
          </div>
          <button
            v-if="comment.creatorId === userId"
            @click="deleteComment(comment.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { towerEventsService } from '@/services/TowerEventsService';
import { ticketsService } from '@/services/TicketsService';
import Pop from '../utils/Pop'
import { commentsService } from '@/services/CommentsService';

export default {
  setup() {
    const route = useRoute()
    const newComment = ref('')

    async function getEventById() {
      try {
        await towerEventsService.getEventsById(route.params.eventId)
        await ticketsService.getEventTickets(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      getEventById()
    })

    return {
      newComment,
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      userId: computed(() => AppState.account.id),

      async purchaseTicket() {
        try {
          await ticketsService.createTicket(route.params.eventId)
          Pop.success('Got your ticket!')
        } catch (error) {
          Pop.error(error)
        }
      },

      async postComment() {
        try {
          const commentData = {
            eventId: route.params.eventId,
            body: newComment.value
          }
          await commentsService.createComment(commentData)
          newComment.value = ''
          Pop.success('Comment posted!')
        } catch (error) {
        Pop.error(error)
        
        }
      },

      async deleteComment(commentId) {
        try {
          if (!await Pop.confirm('Delete this comment?')) return
          await commentsService.deleteComment(commentId)
          Pop.success('Comment deleted!')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.event-details {
  padding: 20px;
}

.event-header {
  display: flex;
  margin-bottom: 20px;
}

.event-header img {
  max-width: 300px;
  object-fit: cover;
}

.event-info {
  margin-left: 20px;
}

.canceled {
  color: red;
}

.comments-section {
  margin-top: 30px;
}

.comment-form {
  margin-bottom: 20px;
}

.comment {
  display: flex;
  align-items: start;
  margin-bottom: 15px;
}

.creator-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-content {
  flex-grow: 1;
}
</style>