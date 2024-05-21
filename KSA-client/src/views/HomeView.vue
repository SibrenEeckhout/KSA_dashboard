<template>
    <div class="notLoggedIn" id="home" @click="localStorageService.removeToken">
        <a id="demo" @click="" href="/announcements">Demo</a>
        <h2>KSA Izegem - Administratie</h2>
        <div id="actions">
        <input class="smoothButton primaryButton" @click="login" id="login" type="button" value="Aanmelden">
        <input class="smoothButton secondaryButton" @click="register" id="register" type="button" value="Registreren">
    </div>
    </div>

</template>
  
<script>
import LocalStorageService from '../components/Services/LocalStorageService';
  export default {
    name: "Home",
    methods : {
        login(){
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/register')
        },
    },
    data(){
        return{
            "localStorageService": new LocalStorageService(),
        }
    }
}
</script>
  
<style>
    #demo{
        position: absolute;
        top: 0;
        right: 1rem;
        margin: 1rem;
        font-size: 1.5rem;
        color: white;
        text-decoration: none;
    }
    h2{
        font-size: 5rem;
        text-align: center;
    }
    #home{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 2rem;
    }
    #actions{
        display: flex;
        flex-direction: row;
        gap: 3rem;
    }

</style>