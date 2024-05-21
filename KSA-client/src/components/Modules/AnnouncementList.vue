<template>
    <div>
      <announcement v-show="hasAnnouncementsFiltered" :canEdit="false" v-for="announcement in announcementsFiltered" :key="announcement.id" :announcement="announcement"></announcement>
    </div>
</template>

<script>
import Announcement from "./Announcement.vue";
import ApiService from "../Services/ApiService";
import LocalStorageService from "../Services/LocalStorageService";

export default {
  name: "AnnouncementsList",
  components: { Announcement },
  data(){
    return {
      "apiService": new ApiService(),
      "localStorageService": new LocalStorageService(),
      baseEndpoint: "announcements",
      announcements: [],
      announcementsFiltered: [],
      selectedOption: '',
    }
  },
  props: {
    filterValue: {
      type: String,
      default: ""
    }
  },
  computed: {
    hasAnnouncements(){
      return this.announcements.length > 0;
    },
    hasAnnouncementsFiltered(){
      return this.announcementsFiltered.length > 0;
    }
  },
  async mounted(){
    await this.loadAnnouncements();
  },
  methods: {
    async loadAnnouncements(){
      this.announcements = await this.apiService.get(this.baseEndpoint);
      this.announcementsFiltered = this.announcements;
    },
  },
}
</script>

<style scoped>

</style>
