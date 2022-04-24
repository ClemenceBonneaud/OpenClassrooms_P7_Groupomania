<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <!-- Header -->
  <HeaderHome />

  <h1>{{ titre }}{{ profil.prenom }}</h1>

  <!-- Bloc profil -->
  <div class="bloc">
    <div class="profilInfo">
      <p>{{ profil.nom }}</p>
      <p>{{ profil.prenom }}</p>
      <p>{{ profil.job }}</p>
    </div>
  </div>

  <h2>{{ sousTitre }}</h2>

  <!-- Bloc publications -->

  <div v-if="!publication" class="bloc">
    <h3>
      <!-- message en cas d'absence de publication -->
      Cette personne n'a publié aucun article
    </h3>
  </div>

  <div class="bloc" v-for="article in articles" v-bind:key="article.titre">
    <h4>{{ article.titre }}</h4>
    <p>{{ article.contenu }}</p>

    <div id="timeStamp">
      <p>Publié le {{ article.date }}</p>
      <div>
        <a class="bouton" @click="partagerArticle(article)">Partager</a>
        <p id="shares">{{ article.partages }} Partage(s)</p>
      </div>
    </div>

    <a
      v-if="$store.state.adminProfil"
      class="bouton"
      @click="supprimerArticle(article.id)"
      >Supprimer</a
    >
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
  name: "ProfilOther",
  path: "/profil/:id",
  props: [""],
  data() {
    return {
      articles: [],
      titre: "Profil de ",
      sousTitre: "Publications",
      publication: false,
      profil: {
        prenom: "",
        nom: "",
        job: "",
      },
    };
  },
  mounted() {
    // Remplissage des data avec les infos API

    // Récupération de l'id
    let url = window.location;
    let urlString = url.toString();
    let urlId = urlString.substring(urlString.lastIndexOf("/") + 1);

    // Récupération des informations de profil
    instance
      .get(`auth/infos/${urlId}`, {
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
      .get(`article/${urlId}`, {
        headers: { Authorization: "bearer " + this.$store.state.sessionToken },
      })
      .then((response) => {
        let i = 0;
        for (i = 0; i < response.data.length; i += 1) {
          let article = response.data[i];
          let rowDate = article.createdAt;
          let date = rowDate.substr(0, 10); // Sélectionne uniquement la date, possibilité de mettre l'heure
          this.articles.push({
            id: article.id,
            titre: article.title,
            contenu: article.text,
            auteur: article.User.firstName,
            auteurId: article.UserId,
            date: date,
            partages: article.shares,
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
    partagerArticle: function (article) {
      let comment = prompt("Partager cet article", "Votre commentaire :");

      // Vérification de la validation
      if (comment == null) {
        console.log("annulé");
      } else {
        const user = this.$store.state.userId;

        // Récupération des données du profil
        instance
          .get(`auth/infos/${user}`, {
            headers: {
              Authorization: "bearer " + this.$store.state.sessionToken,
            },
          })
          .then((response) => {
            this.profil.prenom = response.data.userFound.firstName;

            // Envoi des données au back
            let articleId = article.id;

            let sharedInfos = {
              userId: user,
              comment: comment,
            };

            instance
              .post(`article/${articleId}/share`, sharedInfos, {
                headers: {
                  Authorization: "bearer " + this.$store.state.sessionToken,
                },
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
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
        "Êtes-vous certain de vouloir supprimer cet article ?"
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
            this.$router.push("/"); // Redirection vers page d'accueil
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
