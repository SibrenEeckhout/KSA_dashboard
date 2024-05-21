<template>
  <section id="announcementsSection">
    <ul id="languages">
      <li @click="changeLanguage" class="currentSelected"><data value="nl">Nederlands</data></li>
      <li @click="changeLanguage"><data value="fr">Frans</data></li>
      <li @click="changeLanguage"><data value="en">Engels</data></li>
    </ul>
    <button class="smoothButton primaryButton" id="addAnnouncement"  v-if="localStorageService.getToken() != null" @click="showForm = true">Toevoegen</button>

    <announcement-form v-if="showForm" @cancel="showForm = false" @post="addAnnouncement" :groupNames="groupNames" ></announcement-form>
    <div id="announcementsList">
      <announcement-form  @cancel="showUpdateForm = false" v-if="showUpdateForm" @post="handleUpdateAnnouncement" :key="announcementId" :announcement="announcement" :groupNames="groupNames"></announcement-form>
      <ul id="titleRow">
        <li>Title</li>
        <li>Message</li>
        <li>Date</li>
        <li>Target group</li>
      </ul>
      <announcement class="announcementItem" @update="update(announcement)" @delete="remove($event)" v-show="hasAnnouncementsFiltered" v-for="announcement in announcementsFiltered" :key="announcement.id" :announcement="announcement" :language="this.currentLanguage"></announcement>
    </div>
  </section>
</template>

<script>
import Announcement from "./Announcement.vue";
import AnnouncementForm from "./AnnouncementForm.vue";
import ApiService from "../Services/ApiService";
import LocalStorageService from "../Services/LocalStorageService";

export default {
  name: "Announcements",
  components: {  AnnouncementForm, Announcement },
  data(){
    return {
      "apiService": new ApiService(),
      "localStorageService": new LocalStorageService(),
      baseEndpoint: "announcements",
      announcements: [],
      announcementsFiltered: [],
      groupNames: [],
      showForm: false,
      showUpdateForm: false,
      announcement: null,
      currentLanguage: "nl"
    }
  },
  props: {
    searchTerm: {
      type: String,
      default: ""
    },
    selectedOption: {
      type: String,
      default: ""
    }
  },
  watch:{
    searchTerm: function(){
      this.filterAnnouncements(this.searchTerm, this.selectedOption, this.currentLanguage);
    },
    selectedOption: function(){
      this.filterAnnouncements(this.searchTerm, this.selectedOption,  this.currentLanguage);
    },
    currentLanguage: function(){
      this.filterAnnouncements(this.searchTerm, this.selectedOption,  this.currentLanguage);
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
    await this.loadGroupNames();
  },
  methods: {
    async loadGroupNames(){
      this.apiService.get("groups").then((response) => {
        this.groupNames = response;
      }).catch((error) => {
        console.error(error);
      });
    },
    changeLanguage(event) {
      document.querySelector('.currentSelected').classList.remove('currentSelected');
      this.currentLanguage = event.target.getAttribute('value');
      event.target.classList.add('currentSelected');
    },
    async loadAnnouncements(){
      this.announcements = await this.apiService.get(this.baseEndpoint);
      this.announcementsFiltered = await this.apiService.get(this.baseEndpoint);
    },
    filterAnnouncements(searchTerm="", selectedOption="", currentLanguage="nl") {
      this.announcementsFiltered = this.announcements.filter((announcement) => {
        const group = announcement.targetGroup.toLowerCase();
        const translation = announcement.translations.hasOwnProperty(currentLanguage) ? announcement.translations[currentLanguage] : null;
        return (group.includes(selectedOption.toLowerCase()) || selectedOption === "") &&  (translation !== null) && (translation.title.toLowerCase().includes(searchTerm.toLowerCase()) || translation.message.toLowerCase().includes(searchTerm.toLowerCase()));
      });
    },

    async addAnnouncement(formData) {
      try {
        this.apiService.post(this.baseEndpoint, formData, this.localStorageService.getToken()).then((response) => {
          this.updateTranslations(response.data.id, formData.translations, "add");
        }).then(() => {
          this.showForm = false;
          this.updateList();
        });
      } catch (error) {
        console.error(error);
      }
    },

    async update(announcement){
      this.announcement = announcement;
      this.showUpdateForm = true;
      await this.updateList();
    },


    async remove(announcement){
      await this.apiService.delete(`${this.baseEndpoint}/${announcement.id}`, this.localStorageService.getToken());
      await this.updateList();
    },

    async handleUpdateAnnouncement({id, data}) {
      try {
        this.apiService.update(`${this.baseEndpoint}/${id}`, data, this.localStorageService.getToken()).then((response) => {
          this.updateTranslations(id, data.translations, "update");
        }).then(() => {
          this.showUpdateForm = false;
          this.updateList();
        })
      } catch (error) {
        console.error(error);
      }
    },

    async updateTranslations(announcementId, translations, type) {
      for (const [language, translation] of Object.entries(translations)) {
        if (!translation.title) {
          translation.title = "";
        }
        if (!translation.message) {
          translation.message = "";
        }
        if (translation.title !== "" && translation.message !== "") {
          const translationData = {
            language: language,
            announcementId: announcementId,
            title: translation.title,
            message: translation.message
          };
          if (type === "update") {
            this.apiService.update(`${this.baseEndpoint}/${announcementId}/translation`, translationData, this.localStorageService.getToken());
          } else {
            this.apiService.post(`${this.baseEndpoint}/translation`, translationData, this.localStorageService.getToken());
          }
        }
      }
    },

    async updateList(){
      this.loadAnnouncements();
      this.filterAnnouncements(this.searchTerm, this.selectedOption,  this.currentLanguage)
    }

  },
}
</script>

<style>
  #languages{
    display: flex;
    gap: 1rem;
    color: gray;
    cursor: pointer;
    padding: 1rem;
  }
  #addAnnouncement{
    margin-left: 100%;
  }
  #languages .currentSelected{
    color: black;
    text-decoration: underline;
  }
 #announcementsSection {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 80%;
 }

 #announcementsList{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
 }

  #announcementsList ul {
    display: flex;
    justify-content: flex-start;
    font-size: 1.2rem;
    padding-left: 0;
  }

  #titleRow li {
    flex-grow: 1;
    flex-basis: 25%;
    border-bottom: black solid 0.1rem;
    padding-bottom: 0.5rem;
  }

 #announcementsSection button {
   scale: 0.7;
 }


</style>