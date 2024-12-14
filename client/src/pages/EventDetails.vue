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


