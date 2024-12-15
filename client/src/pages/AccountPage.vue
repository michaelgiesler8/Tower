<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Welcome {{  account.name }}</h1>
        <img :src="account.picture" alt="" class="rounded" />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <h2>My Tickets</h2>
        <div class="row">
          <div v-for="event in myTickets" :key="event.id" class="col-md-4 mb-3">
            <TowerEventCard :event="event" />
            <button @click="removeTicket(event.ticketId)" class="btn btn-danger mt-2">Remove Ticket</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <h2>Events I'm Hosting</h2>
        <div class="row">
          <div v-for="event in myEvents" :key="event.id" class="col-md-4 mb-3">
            <TowerEventCard :event="event" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import Pop from '../utils/Pop'
import { towerEventsService } from '@/services/TowerEventsService.js'

export default {
  setup() {
    onMounted(() => {
      getMyTickets()
      getMyEvents()
    })

    async function getMyTickets() {
      try {
        await ticketsService.getEventTickets()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getMyEvents() {
      try {
        await towerEventsService.getEventsByCreatorId()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.myEvents),

      async removeTicket(ticketId) {
        try {
          if (await Pop.confirm('Remove this ticket?')) {
            await ticketsService.removeTicket(ticketId)
            Pop.success('Ticket removed')
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

