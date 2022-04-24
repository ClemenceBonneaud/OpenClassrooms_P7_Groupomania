<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <div class="publication">
    <HeaderHome />

    <h1>{{ titre }}</h1>

    <!-- Formulaire -->
    <div class="bloc">
      <form>
        <label>Titre</label>
        <input v-model="title" type="text" @change="checkTitle()" />
        <!-- Message qui apparaît si le champ est mal rempli -->
        <p class="formMessage" v-if="titleDisplayed">
          Veuillez écrire un titre
        </p>

        <textarea
          placeholder="Votre article"
          v-model="content"
          @keyup="checkContent()"
        ></textarea>
        <p class="formMessage" id="articleMessage" v-if="contentDisplayed">
          Veuillez écrire un article de moins de 255 caractères
        </p>
      </form>

      <!-- Message d'erreur en cas d'erreur côté serveur -->
      <p v-if="errorMessage" class="errorMessage">
        Oups ! Il semble que {{ errorMessage }}
      </p>

      <!-- Bouton désactivé -->
      <button v-if="!validatedFields()" class="bouton bouton--disabled">
        Publier
      </button>

      <!-- Bouton activé -->
      <button v-if="validatedFields()" class="bouton" @click="publishArticle()">
        Publier
      </button>
    </div>
  </div>
</template>

<!-- ////////////////////////////////////////////////// -->
<!--                       SCRIPT                       -->
<!-- ////////////////////////////////////////////////// -->

<script>
import HeaderHome from "@/components/HeaderHome.vue";

// Axios
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default {
  name: "PublicationView",
  path: "/publication",
  props: [""],
  data() {
    return {
      titre: "Publier un article",
      title: "",
      content: "",
      titleDisplayed: false,
      contentDisplayed: false,
      errorMessage: null,
    };
  },
  methods: {
    // Vérification présence titre
    checkTitle: function () {
      if (this.title != "") {
        this.titleDisplayed = false;
      } else {
        this.titleDisplayed = true;
      }
    },

    // Vérification présence article
    checkContent: function () {
      if (this.content != "" && this.content.length < 255) {
        this.contentDisplayed = false;
      } else {
        this.contentDisplayed = true;
      }
    },

    // Vérification de tous les champs et gestion activation/désactivation du bouton "publier"
    validatedFields: function () {
      if (this.title != "" && this.content != "" && this.content.length < 255) {
        return true;
      } else {
        return false;
      }
    },

    publishArticle: function () {
      let articleInfos = {
        title: this.title,
        content: this.content,
      };

      instance
        .post("article/", articleInfos, { headers: { 'Authorization': "bearer " + this.$store.state.sessionToken } })
        .then((response) => {
          console.log(response)
          this.$router.push("/"); // Redirection vers accueil
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

<style>
#articleMessage {
  margin-top: 10px;
}

textarea {
  margin-bottom: 10px;
}
</style>
