<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <div class="profil">
    <!-- Header -->
    <HeaderHome />

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

      <div class="profilEdit">
        <!-- Bouton désactivé -->
        <button v-if="!validatedFields()" class="bouton bouton--disabled">
          Modifier
        </button>

        <!-- Bouton activé -->
        <button
          v-if="validatedFields()"
          class="bouton"
          @click="modifierProfil()"
        >
          Modifier
        </button>
        <router-link to="/monprofil" class="bouton">Annuler</router-link>
      </div>
    </div>
  </div>
</template>

<!-- ////////////////////////////////////////////////// -->
<!--                       SCRIPT                       -->
<!-- ////////////////////////////////////////////////// -->

<script>
// Header
import HeaderHome from "@/components/HeaderHome.vue";

// Axios
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  name: "ProfilDetail",
  path: "/monprofil/modification",
  props: [""],
  data() {
    return {
      titre: "Modifier mon profil",
      nom: "",
      prenom: "",
      job: "",
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
      let testNom = regName.exec(this.nom);
      let testPrenom = regName.exec(this.prenom);
      let testJob = regName.exec(this.job);

      if (
        testNom &&
        testPrenom &&
        testJob &&
        this.password != ""
      ) {
        return true;
      } else {
        return false;
      }
    },

    modifierProfil: function () {
      let userInfos = {
        lastName: this.nom,
        firstName: this.prenom,
        job: this.job,
        password: this.password,
      };

      const user = this.$store.state.userId;
      instance
        .put(`auth/modify/${user}`, userInfos, { headers: { 'Authorization': "bearer " + this.$store.state.sessionToken } })
        .then((response) => {
          console.log(response);
          this.$router.push("/monprofil"); // Redirection vers la page profil
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.error; // Affichage du message d'erreur
        });
    },
  },
  components: { HeaderHome },
};
</script>

<!-- ////////////////////////////////////////////////// -->
<!--                       STYLE                        -->
<!-- ////////////////////////////////////////////////// -->

<style lang="scss">
.profilEdit {
  display: flex;
  justify-content: space-evenly;
  & a {
    margin: 0;
  }
}
</style>
