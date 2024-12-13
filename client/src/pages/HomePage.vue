<script setup>

</script>

<template>
  <div class="home-page">
    <section class="event-filters">
      <button
        v-for="type in eventTypes"
        :key="type"
        @click="filterEvents(type)"
        class="filter-btn"
      >
        {{ type }}
      </button>
    </section>

    <section class="events-grid">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </section>
  </div>
</template>

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
