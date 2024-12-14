<template>
  <div class="container">
    <section class="row">
      <div class col-12 mb-3>
        <div class="d-flex gap-2">
          <button
            v-for="type in eventTypes"
            :key="type"
            class="btn"
            :class="type === selectedType ? 'btn-primary' : 'btn-outline-primary'"
            @click="selectedType = type"
          >
            {{ type }}
          </button>
        </div>
      </div>
    </section>

    <section class="events-grid">
      <div v-for="event in events" :key="event.id" class="col-md-4 mb-3">
        <EventCard :event="event" />
      </div> 
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import EventCard from '../components/EventCard.vue'
import { eventsService } from '../services/EventsService'


export default {
  name: 'HomePage',
  components { EventCard },
  setup() {
    const selectedType = ref('all')
    const eventTypes = ['all', 'concert', 'convention', 'sport', 'digital']

    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(getEvents)

    return {
      selectedType,
      eventTypes,
      events: computed(() => AppState.events)
    }
  }
}
</script>


<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
