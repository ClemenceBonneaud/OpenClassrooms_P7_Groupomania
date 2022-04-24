<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <div class="signup">
    <!-- Header -->
    <HeaderLog />

    <h1>{{ titre }}</h1>

    <!-- Formulaire -->
    <div class="bloc">
      <form>
        <label>Email</label>
        <input v-model="email" type="email" @keyup="analyseEmail()" />
        <!-- Message qui apparaît si le champ est mal rempli -->
        <p class="formMessage" v-if="emailDisplayed">
          Veuillez saisir un email valide
        </p>

        <label>Mot de passe</label>
        <input v-model="password" type="password" @change="checkPassword()" />
        <p class="formMessage" v-if="passwordDisplayed">
          Veuillez saisir un mot de passe
        </p>
      </form>

      <!-- Message d'erreur en cas d'erreur côté serveur -->
      <p v-if="errorMessage" class="errorMessage">
        Oups ! Il semble que {{ errorMessage }}
      </p>

      <!-- Bouton désactivé -->
      <button v-if="!validatedFields()" class="bouton bouton--disabled">
        Se connecter
      </button>

      <!-- Bouton activé -->
      <button v-if="validatedFields()" class="bouton" @click="loginAccount()">
        Se connecter
      </button>
    </div>
  </div>
</template>

<!-- ////////////////////////////////////////////////// -->
<!--                       SCRIPT                       -->
<!-- ////////////////////////////////////////////////// -->

<script>
// Header
import HeaderLog from "@/components/HeaderLog.vue";

// Axios
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  name: "LoginView",
  props: [""],
  data() {
    return {
      titre: "Se connecter",
      email: "",
      password: "",
      emailDisplayed: false,
      passwordDisplayed: false,
      errorMessage: null,
    };
  },
  methods: {
    // Vérification Regex + gestion affichage message d'erreur
    analyseEmail: function () {
      let regEmail = new RegExp("[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}");
      let testEmail = regEmail.exec(this.email);
      if (testEmail) {
        this.emailDisplayed = false;
      } else {
        this.emailDisplayed = true;
      }
    },

    // Vérification présence mot de passe et gestion affichage message d'erreur
    checkPassword: function () {
      if (this.password != "") {
        this.passwordDisplayed = false;
      } else {
        this.passwordDisplayed = true;
      }
    },

    // Vérification de tous les champs et gestion activation/désactivation du bouton "se connecter"
    validatedFields: function () {
      let regEmail = new RegExp("[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}");
      let testEmail = regEmail.exec(this.email);

      if (testEmail && this.password != "") {
        return true;
      } else {
        return false;
      }
    },

    // Envoi API - connection utilisateur déjà existant
    loginAccount: function () {
      let userInfos = {
        email: this.email,
        password: this.password,
      };

      instance
        .post("auth/login", userInfos)
        .then((response) => {
          this.$store.commit("myToken", response.data.token); // Récupération du token dans le state
          this.$store.commit("myId", response.data.userId); // Récupération du userId dans le state
          this.$router.push("/"); // Redirection vers accueil
          if (response.data.isAdmin == true) { // Récupération du statut administrateur dans le state
            this.$store.commit("myAdmin", true);
          } else {
            this.$store.commit("myAdmin", false);
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.error; // Affichage du message d'erreur
        });
    },
  },
  components: { HeaderLog },
};
</script>
