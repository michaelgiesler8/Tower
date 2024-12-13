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
  </div>
</template>