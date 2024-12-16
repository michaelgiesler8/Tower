<template>
  <div class="container-fluid">
    <div v-if="event" class="row">
      <div class="col-12 col-md-4 p-0">
        <img :src="event.coverImg" :alt="event.name" class="event-img">
      </div>
      <div class="col-12 col-md-8 p-5">
        <div class="d-flex justify-content-between">
          <h1>{{ event.name }}</h1>
          <div>
            <button v-if="event.creatorId == account.id" class="btn btn-danger" @click="cancelEvent">
              Cancel Event
            </button>
          </div>
        </div>
        <p>{{ event.description }}</p>
        <p>{{ event.location }}</p>
        <p>{{ event.startDate }}</p>
        <p>Capacity: {{ event.capacity }}</p>
        <div v-if="account.id">
          <button v-if="!hasTicket" class="btn btn-success" @click="createTicket">
            Get Ticket
          </button>
          <button v-else class="btn btn-warning" @click="returnTicket">
            Return Ticket
          </button>
        </div>
      </div>
    </div>

    <section class="row mt-4">
      <div class="col-12">
        <h3>Comments</h3>
        <CommentForm v-if="account.id" />
        <div class="comments mt-3">
          <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
        </div>
        <div v-if="!comments.length" class="text-center text-muted">
          No comments yet. Be the first to comment!
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import { ticketsService } from '../services/TicketsService'
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop'
import Comment from '../components/Comment.vue'
import CommentForm from '../components/CommentForm.vue'

export default {
  components: { Comment, CommentForm },
  setup() {
    const route = useRoute()

    async function getEvent() {
      try {
        await eventsService.getEventsById(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(async () => {
      await getEvent()
      try {
        await commentsService.getEventComments(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    })

    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      hasTicket: computed(() => {
        if (!AppState.account.id) return false
        return AppState.tickets.find(t => t.accountId == AppState.account.id)
      }),

      async createTicket() {
        try {
          await ticketsService.createTicket(route.params.eventId)
        } catch (error) {
          Pop.error(error)
        }
      },

      async returnTicket() {
        try {
          const ticket = AppState.tickets.find(t => t.accountId == AppState.account.id)
          if (!ticket) return
          await ticketsService.removeTicket(ticket.id)
        } catch (error) {
          Pop.error(error)
        }
      },

      async cancelEvent() {
        try {
          if (await Pop.confirm()) {
            await eventsService.cancelEvent(route.params.eventId)
          }
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