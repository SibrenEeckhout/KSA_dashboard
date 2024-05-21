<template>
  <header>
    <div class="logo" @click="goToHome">
      <img src="../icons/ksalogo.png" alt="Logo" >
    </div>
    <nav>
      <ul>
        <li @click="showNotImplemented"><a href="#">Groepen</a></li>
        <li @click="showNotImplemented"><a href="#">Aankondigingen</a></li>
        <li @click="showNotImplemented"><a href="#">Leiders</a></li>
        <li @click="logout"><a href="#">Uitloggen</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import LocalStorageService from '../Services/LocalStorageService';
export default {
  name: "Header",
  data () {
    return {
      "localStorageService": new LocalStorageService(),
    }
  },
  methods: {
    goToHome(){
      this.$router.push('/')
    },
    logout(){
      this.localStorageService.removeToken();
      this.$router.push('/')
    },
    showNotImplemented(){
      alert("Deze functionaliteit is nog niet geïmplementeerd.")
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
}
.logo:hover {
  cursor: pointer;
}
.logo img {
  max-width: 13rem;
}

nav ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}

nav ul li{
  margin: 1rem
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a:hover {
  color: #666;
}
</style>