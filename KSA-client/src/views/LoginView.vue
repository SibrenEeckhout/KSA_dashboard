<template>
    <div class="notLoggedIn" id="loginPage">
        <a id="back" href="/">Home</a>

        <h2>Aanmelden</h2>
        <form @submit.prevent="login">
            <div id="group"><label for="email">Email</label><a href="/register">Nog geen account?</a></div>
            <input id="email" type="email" placeholder="Email" v-model="formData.email">
            <label for="password">Wachtwoord</label>
            <input id="password" type="password" placeholder="Wachtwoord" v-model="formData.password">
            <input class="smoothButton primaryButton" id="login" type="submit" value="Aanmelden">
        </form>
        <p class="error">{{errorMessage}}</p>
    </div>
</template>
  
<script>
import ApiService from "../components/Services/ApiService";
import LocalStorageService from "../components/Services/LocalStorageService";
  export default {
    name: "Login",
    data(){
    return {
      "apiService": new ApiService(),
      "localStorageService": new LocalStorageService(),
      formData: {
        email: "",
        password: ""
      },
      errorMessage : ""
    }
    },
    methods : {
        removeError(){
            this.errorMessage = "";
        },
        login(){
            this.apiService.post("login",this.formData,null).then((response) => {
                if(response.status == 200){
                    const bearerToken = response.data.authorisation.token;
                    const user = response.data.data;
                    this.localStorageService.setToken(bearerToken);
                    this.localStorageService.setUser(user);
                    this.$router.push('/announcements') // TODO: redirect to dashboard
                }else if(response.status == 400){
                   this.errorMessage = "Email of wachtwoord is onjuist."
                }
                else{
                    this.errorMessage = "Er is iets misgegaan, probeer het opnieuw."
                }
            })
        }
    }
}
</script>
  
<style scoped>
    #back{
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        display: inline-block;
        font-size: 1.2rem;
    }
    #group{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    form{
        width: 40%;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }
    a{
        color: gray;
        font-size: 1rem;
    }
    input:not([type="submit"]){
        margin-bottom: 3rem;
        margin-top: 0.2rem;
        height: 3rem;
        border: solid gray 0.1rem;
        border-radius: 0.5rem;
        font-family: 'Outfit', sans-serif;
    }
    #loginPage{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 2rem;
    }
</style>