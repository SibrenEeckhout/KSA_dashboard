<template>
    <div class="notLoggedIn" id="registerPage">
        <a id="back" href="/">Home</a>

        <h2>Registreren</h2>
        <form action="" @submit.prevent="register">
            <div class="flexRow">
                <div>
                    <label for="firstName">Voornaam</label>
                    <input type="text" name="firstName" id="firstName" placeholder="Voornaam" required v-model="formData.firstName">
                </div>
                <div>
                    <label for="lastName">Achternaam</label>
                    <input type="text" name="lastName" id="lastName" placeholder="Achternaam" required v-model="formData.lastName">
                </div>
                <div>
                    <label for="nickName">Bijnaam</label>
                    <input type="text" name="nickname" id="nickname" placeholder="Bijnaam" v-model="formData.nickName">
                </div>
            </div>
            <div class="flexRow">
                <div>
                    <label for="address">Adres</label>
                    <input type="text" name="address" id="address" placeholder="Adres" required v-model="formData.address">
                </div>
                <div>
                    <label for="phone">Telefoon</label>
                    <input type="tel" name="phone" id="phone" placeholder="Telefoon" required v-model="formData.phone">
                </div>
            </div>
            <div>
                <label for="email">Email</label>
                <input required type="email" name="email" id="email" placeholder="Email" v-model="formData.email">
            </div>
            <div class="flexRow">
                <div>
                    <label for="password">Wachtwoord</label>
                    <input required type="password" name="password" id="password" placeholder="Wachtwoord" v-model="formData.password">
                </div>
                <div>
                    <label for="passwordRepeat">Wachtwoord Herhalen</label>
                    <input required type="password" name="passwordRepeat" id="passwordRepeat" placeholder="Wachtwoord Herhalen" v-model="passwordRepeat">
                </div>
            </div>
            <input class="smoothButton primaryButton" id="register" type="submit" value="Registreren">
            <a href="/login">Heb je al een account?</a>
        </form>
        <p class="error">{{errorMessage}}</p>
    </div>
</template>
  
<script>
import ApiService from "../components/Services/ApiService";
  export default {
    name: "Register",
    data(){
    return {
      "service": new ApiService(),
      errorMessage : "",
      passwordRepeat: "",
      groupId: null,
      formData: {
            firstName: null,
            lastName: null,
            nickName: null,
            address: null,
            email: null,
            phone: null,
            rank: "leider",
            password: null
      }
    }
},
    methods : {
        register(){
            if(this.formData.password != this.passwordRepeat){
                alert("Wachtwoorden komen niet overeen")
                return
            }
            this.service.post("register",this.formData,null).then((response) => {
                if(response.status == 200){
                    this.$router.push('/login')
                }else{
                    this.errorMessage = "Er is iets misgegaan, probeer het opnieuw."
                }
            })
        }
    }
}
</script>
  
<style scoped> 

    .flexRow div{
        flex-grow: 1;
        flex-basis: 20rem;
   }
    select,  input{
       width: 100%; 
       font-size: 1.35rem;
   }
    #email{
       width: 100%;
   }
    select{
        border: gray solid 0.01rem;
        background-color: white;
        padding: 0.2rem;
        border-radius: 0.2rem;
 }
     label{
        display: block;
        color: gray;
    }

     #back{
        position: absolute;
        top: 1.5rem;
        left: 1.5rem;
        display: inline-block;
        font-size: 1.2rem;
    }
     form{
        justify-content: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 50%;
    }
     a{
        color: gray;
        text-align: center;
        font-size: 1.2rem;
    }

    #registerPage{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 2rem;
    }
</style>