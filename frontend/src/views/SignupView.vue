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
        <label>Nom</label>
        <input v-model="nom" type="text" />
        <p class="formMessage" v-if="!nomRegexValid()">
          <!-- Message qui apparaît si le champ est mal rempli -->
          Veuillez saisir un nom valide
        </p>

        <label>Prenom</label>
        <input v-model="prenom" type="text" />
        <p class="formMessage" v-if="!prenomRegexValid()">
          Veuillez saisir un prénom valide
        </p>

        <label>Poste au sein de l'entreprise</label>
        <input v-model="job" type="text" />
        <p class="formMessage" v-if="!jobRegexValid()">
          Veuillez saisir un poste valide
        </p>

        <label>Email</label>
        <input v-model="email" type="email" @keyup="analyseEmail()" />
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
        Oups ! Il semblerait que {{ errorMessage }}
      </p>

      <!-- Bouton désactivé -->
      <button v-if="!validatedFields()" class="bouton bouton--disabled">
        Se connecter
      </button>

      <!-- Bouton activé -->
      <button v-if="validatedFields()" class="bouton" @click="createAccount()">
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
  name: "SignupView",
  path: "/auth/signup",
  props: [""],
  data() {
    return {
      titre: "S'inscrire",
      nom: "",
      prenom: "",
      job: "",
      email: "",
      password: "",
      emailDisplayed: false,
      passwordDisplayed: false,
      errorMessage: null,
    };
  },
  methods: {
    // Vérifications RegEx
    nomRegexValid: function () {
      let regName = new RegExp(
        "^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"
      );
      let testNom = regName.exec(this.nom);
      return testNom;
    },

    prenomRegexValid: function () {
      let regName = new RegExp(
        "^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"
      );
      let testPrenom = regName.exec(this.prenom);
      return testPrenom;
    },

    jobRegexValid: function () {
      let regName = new RegExp(
        "^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"
      );
      let testJob = regName.exec(this.job);
      return testJob;
    },

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
      let regName = new RegExp(
        "^[a-zA-Z-'.ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ]*$"
      );
      let regEmail = new RegExp("[a-z0-9]+@[a-z]+[.]+[a-z]{2,3}");

      let testNom = regName.exec(this.nom);
      let testPrenom = regName.exec(this.prenom);
      let testJob = regName.exec(this.job);
      let testEmail = regEmail.exec(this.email);

      if (
        testNom &&
        testPrenom &&
        testJob &&
        testEmail &&
        this.password != ""
      ) {
        return true;
      } else {
        return false;
      }
    },

    // Envoi API - création nouvel utilisateur
    createAccount: function () {
      let userInfos = {
        lastName: this.nom,
        firstName: this.prenom,
        job: this.job,
        email: this.email,
        password: this.password,
      };

      instance
        .post("auth/signup", userInfos)
        .then((response) => {
          this.$store.commit("myToken", response.data.token); // Récupération du token dans le state
          this.$store.commit("myId", response.data.userId); // Récupération du userId dans le state
          this.$router.push("/"); // Redirection vers accueil
          if (response.data.isAdmin == true) {
            this.$store.commit("myAdmin", true); // Récupération du statut administrateur dans le state
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
