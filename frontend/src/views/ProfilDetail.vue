<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <div class="profil">
    <!-- Header -->
    <HeaderHome />

    <h1>{{ titre }}</h1>

    <!-- Bloc profil -->
    <div class="bloc">
      <div class="profilInfo">
        <p>{{ profil.nom }}</p>
        <p>{{ profil.prenom }}</p>
        <p>{{ profil.job }}</p>
      </div>
      <div class="profilEdit">
        <router-link to="/monprofil/modification" class="bouton"
          >Modifier</router-link
        >
        <a class="bouton" @click="supprimerProfil">Supprimer</a>
      </div>
    </div>

    <h2>{{ sousTitre }}</h2>

    <!-- Bloc publications -->
    <div v-if="!publication" class="bloc">
      <h3>
        <!-- message en cas d'absence de publication -->
        Vous n'avez publié aucun article
      </h3>
    </div>

    <div class="bloc" v-for="article in articles" v-bind:key="article.titre">
      <h4>{{ article.titre }}</h4>
      <p>{{ article.contenu }}</p>

      <div id="timeStamp">
        <p>Publié le {{ article.date }}</p>
        <a class="bouton" @click="supprimerArticle(article.id)">Supprimer</a>
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
  path: "/monprofil",
  props: [""],
  data() {
    return {
      titre: "Profil",
      sousTitre: "Publications",
      profil: {
        nom: "",
        prenom: "",
        job: "",
      },
      articles: [],
      publication: false,
    };
  },
  mounted() {
    // Remplissage des data avec les infos API
    const user = this.$store.state.userId;
    instance
      .get(`auth/infos/${user}`, {
        headers: { Authorization: "bearer " + this.$store.state.sessionToken },
      })
      .then((response) => {
        this.profil.nom = response.data.userFound.lastName;
        this.profil.prenom = response.data.userFound.firstName;
        this.profil.job = response.data.userFound.job;
      })
      .catch((error) => {
        console.log(error);
      });

    // Récupération des informations de publications
    instance
      .get(`article/${user}`, {
        headers: { Authorization: "bearer " + this.$store.state.sessionToken },
      })
      .then((response) => {
        let i = 0;
        for (i = 0; i < response.data.length; i += 1) {
          let article = response.data[i];
          let rowDate = article.createdAt;
          let date = rowDate.substr(0, 10);
          this.articles.push({
            titre: article.title,
            contenu: article.text,
            date: date,
            id: article.id,
          });
        }
        if (response.data.length != 0) {
          this.publication = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    supprimerProfil: function () {
      let confirmation = confirm(
        "Êtes-vous certain de vouloir supprimer votre profil ?"
      );
      if (confirmation) {
        const user = this.$store.state.userId;
        instance
          .delete(`auth/delete/${user}`, {
            headers: {
              Authorization: "bearer " + this.$store.state.sessionToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$router.push("/signup"); // Redirection vers page d'inscription
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    // Vérification de la présence de publication
    publicationCheck: function () {
      if (this.publication == true) {
        return true;
      }
      return false;
    },

    supprimerArticle: function (articleId) {
      let confirmation = confirm(
        "Êtes-vous certain de vouloir supprimer votre article ?"
      );
      if (confirmation) {
        instance
          .delete(`article/${articleId}`, {
            headers: {
              Authorization: "bearer " + this.$store.state.sessionToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$router.push("/"); // Redirection vers page d'accueil (permet de recharger la page)
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
