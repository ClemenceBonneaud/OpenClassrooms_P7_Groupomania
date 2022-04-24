<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <!-- Header -->
  <HeaderHome />

  <h1>Forum Articles</h1>

  <!-- Section -->
  <section class="menu">
    <!-- Aside - Articles mis en avant -->
    <aside>
      <div class="bloc bloc--aside" id="forwards">
        <h2>Articles mis en avant</h2>

        <div
          class="bloc bloc--in"
          id="bloc-share"
          v-for="share in sharedArticles"
          v-bind:key="share.auteur"
        >
          <!-- Informations personne qui partage -->
          <h3 id="titre-share">
            <a
              id="lienProfil"
              title="Voir le profil"
              @click="goToProfil(share.auteurId)"
              >{{ share.auteur }}</a
            >
          </h3>

          <p>{{ share.comment }}</p>

          <div class="bloc bloc--in bloc--inside">
            <!-- Informations article partagé -->
            <h3>
              <a
                id="lienProfil"
                title="Voir le profil"
                @click="goToProfil(share.article.auteurId)"
                >{{ share.article.auteur }}</a
              >
            </h3>

            <h4>{{ share.article.titre }}</h4>
            <p>{{ share.article.contenu }}</p>

            <div id="timeStamp">
              <p>Publié le {{ share.article.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Fil d'actualité -->
    <article>
      <div
        class="bloc--home"
        v-for="article in articles"
        v-bind:key="article.titre"
      >
        <!-- Nom de la personne -->
        <h3>
          <a
            id="lienProfil"
            title="Voir le profil"
            @click="goToProfil(article.auteurId)"
            >{{ article.auteur }}</a
          >
        </h3>

        <!-- Titre -->
        <h4>{{ article.titre }}</h4>

        <!-- Article -->
        <p>{{ article.contenu }}</p>

        <div id="timeStamp">
          <!-- Date -->
          <p>Publié le {{ article.date }}</p>
          <!-- Partage -->
          <div>
            <a
              class="bouton"
              v-if="monArticle(article)"
              @click="partagerArticle(article)"
              >Partager</a
            >
            <p id="shares">{{ article.partages }} Partage(s)</p>
          </div>
        </div>
      </div>
    </article>
  </section>
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
  name: "HomeView",
  path: "/",
  props: [""],
  data() {
    return {
      articles: [],
      profil: {
        prenom: "",
      },
      shares: [],
    };
  },
  mounted() {
    // Remplissage des data des publications classiques avec les infos API
    instance
      .get(`article/`, {
        headers: { Authorization: "bearer " + this.$store.state.sessionToken },
      })
      .then((response) => {
        let i = 0;
        for (i = 0; i < response.data.length; i += 1) {
          let article = response.data[i];
          let rowDate = article.createdAt;
          let date = rowDate.substr(0, 10);
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
      })
      .catch((error) => {
        console.log(error);
      });

    // Remplissage des data des publications partagées avec les infos API
    instance
      .get(`share/`, {
        headers: {
          Authorization: "bearer " + this.$store.state.sessionToken,
        },
      }) // Récupération des articles partagés 
      .then((response) => {
        let i = 0;
        for (i = 0; i < response.data.length; i += 1) {
          let share = response.data[i];
          let rowDate = share.createdAt;
          let date = rowDate.substr(0, 10);

          instance
            .get(`auth/infos/${response.data[i].article.UserId}`, {
              headers: {
                Authorization: "bearer " + this.$store.state.sessionToken,
              },
            }) // Récupération des informations de l'utilisateur ayant publié l'article d'origine
            .then((reply) => {
              let auteurArticle = reply.data.userFound.firstName;
              this.shares.push({
                auteurId: share.userId,
                auteur: share.user.firstName,
                comment: share.comment,
                article: {
                  auteurId: share.article.UserId,
                  auteur: auteurArticle,
                  titre: share.article.title,
                  contenu: share.article.text,
                  date: date,
                },
              }); // Mis à disposition des infos
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    goToProfil: function (userId) {
      if (userId == this.$store.state.userId) {
        this.$router.push(`/monprofil`);
      } else {
        this.$router.push(`/profil/${userId}`);
      }
    },
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
    monArticle: function (article) {
      // Comparaison id utilisateur et id de l'auteur de l'article
      if (article.auteurId == this.$store.state.userId) {
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
    sharedArticles() {
      return this.shares.slice(0,4); // Permet d'afficher les 5 derniers articles publiés (modifiable avec slice)
    }
  },
  components: { HeaderHome },
};
</script>

<!-- ////////////////////////////////////////////////// -->
<!--                       STYLE                        -->
<!-- ////////////////////////////////////////////////// -->

<style lang="scss">
a {
  color: black;
  text-decoration: none;
}

#timeStamp {
  display: flex;
  justify-content: space-between;
}

.bouton {
  margin: 0;
}

#shares {
  font-size: 12px;
  text-align: center;
}
</style>
