<template>
<div class="search-container">
  <h1 class="page-title">{{ pageTitle }}</h1>
  <form class="search-form">
    <input type="text" placeholder="Zoeken..." id="searchInput" name="searchInput" v-model="searchTerm" @input="emitSearch"/>
    <select class="filter" v-model="selectedOption" @change="emitFilter">
      <option selected value="">Kies een groep</option>
      <option v-for="option in filterOptions" :key="option.name" :value="option.name">{{ option.name }}</option>
    </select>
  </form>
</div>
</template>

<script>
import ApiService from "../Services/ApiService";
export default {
  name: "search",
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    filterType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      "apiService": new ApiService(),
      searchTerm: "",
      selectedOption: "",
      filterOptions: [],
    };
  },
  async mounted() {
    await this.loadFilterOptions();
  },
  methods: {
    emitSearch() {
      this.$emit("search", this.searchTerm);
    },
    emitFilter() {
      this.$emit("filter", this.selectedOption);
    },
    async loadFilterOptions(){
      this.apiService.get(this.filterType).then((response) => {
        this.filterOptions = response;
      }).catch((error) => {
        console.error(error);
      });
    },
  }
}
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
}

.search-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

input[type="text"] {
  font-size: 1rem;
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #ccc;
  width: 20rem;
}

.filter {
  margin-left: 1rem;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #ccc;
}

</style>
