<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <header class="header header--home">
    <div class="header--logo">
      <figure>
        <img
          src="../assets/icon-left-font-monochrome-white.svg"
          alt="Logo Groupomania"
        />
      </figure>
      <a id="logout" @click="logout()">Se déconnecter</a>
    </div>
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/monprofil">Profil</router-link>
      <router-link to="/publication">Publier</router-link>
    </nav>
  </header>
</template>

<!-- ////////////////////////////////////////////////// -->
<!--                       SCRIPT                       -->
<!-- ////////////////////////////////////////////////// -->

<script>
export default {
  name: "HeaderHome",
  props: [""],
  methods: {
    logout: function () {
      this.$store.state.sessionToken = null; // Suppression du token
      this.$router.push(`/login`);
    },
  },
};
</script>

<!-- ////////////////////////////////////////////////// -->
<!--                       STYLE                        -->
<!-- ////////////////////////////////////////////////// -->

<style lang="scss">
#logout {
  border: none;
  width: 30%;
  color: white;
  margin-top: 40px;
  font-size: 20px;
  &:hover {
    transform: scale(1.1);
    background-color: rgb(235, 55, 50);
  }
}

a:active {
  background-color: black;
  color: white;
}
</style>
