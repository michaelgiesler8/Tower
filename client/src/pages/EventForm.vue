<template>
  <div class="container">
    <form @submit.prevent="createEvent">
      <div class="form-group">
        <label>Event Name</label>
        <input v-model="eventData.name" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="eventData.description" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label>Location</label>
        <input v-model="eventData.description" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Capacity</label>
        <input v-model="eventData.location" type="number" class= "form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Create Event</button>
    </form>
  </div>
</template>