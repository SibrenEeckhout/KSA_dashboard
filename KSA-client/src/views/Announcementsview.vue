<template>
    <div>
      <HeaderNavigation></HeaderNavigation>
      <div id="announcements">
        <search v-if="!showForm" :page-title="titleName" @search="onSearch" @filter="onFilter" :filter-type="'groups'"></search>
        <AnnouncementList :searchTerm="searchTerm" :selected-option="selectedOption" ></AnnouncementList>
      </div>
    </div>
  </template>
  
  <script>
  import AnnouncementList from '../components/Modules/Announcements.vue'
  import Search from "../components/Modules/Search.vue";
  import HeaderNavigation from '../components/Modules/HeaderNavigation.vue';

  export default {
    name: "Announcements",
    components: {
      HeaderNavigation,
      Search,
      AnnouncementList
    },
    data() {
      return {
        searchTerm: "",
        selectedOption: "",
        titleName: "Aankondigingen"
      };
    },
    methods: {
      onSearch(searchTerm) {
        this.searchTerm = searchTerm;
      },
      onFilter(selectedOption) {
        this.selectedOption = selectedOption;
      }
    }
  }
  </script>
  
  <style>
    #announcements {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
    }
  </style>
  