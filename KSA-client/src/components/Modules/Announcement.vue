<template>
  <article @mouseover="showActions = true" @mouseleave="showActions = false">
    <ul>
      <li>{{announcement.translations[language].title}}</li>
      <li>{{announcement.translations[language].message}}</li>
      <li>{{announcement.date}}</li>
      <li>{{announcement.targetGroup}}</li>
    </ul>

    <div v-if="canEdit" class="actions" v-show="showActions">
      <button @click="$emit('update', announcement)"></button>
      <button @click="$emit('delete', announcement)"></button>

    </div>
    <div v-if="editing">
    </div>
  </article>
</template>

<script>
import LocalStorageService from '../Services/LocalStorageService'
export default {
  name: "Announcement",
  props: {
    announcement: {
      type: Object,
      required: true
    },
    language: {
      type: String,
      required: true},
  },
  computed: {
    canEdit() {
      return this.localStorageService.getToken() !== null;
    },
  },
  data() {
    return {
      "localStorageService": new LocalStorageService(),
      showActions: false,
    }
  }
}
</script>

<style scoped>

article ul {
  color: gray;
  display: flex;
  justify-content: flex-start;
  list-style: none;
  border-bottom: gray solid 0.1rem;
  padding-bottom: 1rem;
  padding-left: 0;
}

article ul li {
  flex-grow: 1;
  flex-basis: 25%;
}

.actions {
  display: none;
  position: absolute;
  bottom : 1rem;
  right: 0;
}

article:hover .actions {
  display: block;
}

.actions button{
  width: 1.5rem;
  height: 1.5rem;
  background-size: 100% 100%;
  border: none;
  background-repeat: no-repeat;
  background-color: transparent;
  cursor: pointer;
}
.actions button:first-of-type{
  margin-right: 1rem;
  background-image: url("../icons/edit-button.svg");
}

.actions button:last-of-type{
  background-image: url("../icons/delete-button.svg");
}

</style>
