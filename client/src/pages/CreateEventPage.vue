<template>
  <div class="container">
    <h1>Create New Event</h1>
    <EventForm />
  </div>
</template>

<script>
import EventForm from '../components/EventForm.vue'

export default {
  components: { EventForm }
}
</script>

<style scoped lang="scss">
.container {
  padding: 2rem;

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>