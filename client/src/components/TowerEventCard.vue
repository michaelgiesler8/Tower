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