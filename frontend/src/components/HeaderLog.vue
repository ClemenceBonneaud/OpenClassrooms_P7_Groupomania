<!-- ////////////////////////////////////////////////// -->
<!--                      TEMPLATE                      -->
<!-- ////////////////////////////////////////////////// -->

<template>
  <header class="header header--log">
    <div>
      <figure>
        <img
          src="../assets/icon-left-font-monochrome-black.svg"
          alt="Logo Groupomania"
        />
      </figure>
    </div>
    <nav>
      <router-link to="/signup">S'inscrire</router-link>
      <router-link to="/login">Se connecter</router-link>
    </nav>
  </header>
</template>

<!-- ////////////////////////////////////////////////// -->
<!--                       SCRIPT                       -->
<!-- ////////////////////////////////////////////////// -->

<script>
export default {
  name: "HeaderLog",
  props: [""],
};
</script>

