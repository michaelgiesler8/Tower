<template>
  <form @submit.prevent="handleSumbit" class="event-form">
    <input v-model="eventData.name" required placeholder="Event Name">
    <input v-model="eventData.location" required placeholder="Location">
    <select v-mode="eventData.type" required>
      <option value="concert">Concert🎶</option>
      <option value="convention">Convention🏟️</option>
      <option value="sport">Sport🏈</option>
      <option value="digital">Digital💻</option>
    </select>
    <input type="number" v-model="eventData.capacity" required min="0">
    <input type="datetime-local" v-model="eventData.startDate" required>
    <textarea v-model="eventData.description" required></textarea>
    <input v-model="eventData.coverImg" required placeholder="Image URL">
    <button type="submit">Create Event</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import Pop from '../utils/Pop'
import { towerEventsService } from '@/services/TowerEventsService';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const eventData = ref({
      name: '',
      description: '',
      location: '',
      type: 'concert',
      capacity: 0,
      startDate: '',
      coverImg: '',
    })

    async function handleSubmit() {
      try {
        const event = await towerEventsService.createEvent(eventData.value)
        router.push({ name: 'Event', params: { id: event.id }})
        Pop.success('Event created!')
      } catch (error) {
        Pop.error(error)
      }
    }
    
    return {
      eventData,
      handleSubmit
    }
  }
}
</script>

<style scoped lang="scss">
.event-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;

  input, select, textarea {
    padding: 0.5rem;
    border-radius: 4px; 
    border: 1px solid #ccc;
  }

  button {
    padding: 0.5rem;
    background: var(--bs-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>