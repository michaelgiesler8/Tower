<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="card">
      <img :src="event.coverImg" alt="" class="img-fluid">
      <div class="status-badges">
        <span v-if="event.isCanceled" class="badge bg-danger">Cancelled</span>
        <span v-else-if="isEventFull" class="badge bg-warning">Sold Out</span>
        <span v-else class="badge bg-success">Available</span>
      </div>
      <div class="card-body">
        <h5>{{ event.name }}</h5>
        <p>{{ event.location }}</p>
        <p>{{ event.startDate }}</p>
        <p>Capacity: {{ event.ticketCount }}/{{ event.capacity }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    event: { type: Object, required: true }
  },
  setup(props) {
    return {
      isEventFull: computed(() => props.event.ticketCount >= props.event.capacity)
    }
  }
}
</script>

<style scoped>
.card {
  height: 100%;
  position: relative;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.status-badges {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>