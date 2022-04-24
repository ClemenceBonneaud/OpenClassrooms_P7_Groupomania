<template>
  <router-view />
</template>

<style lang="scss">
////////////////////////////////////////////////////
///// Utils /////

// Variables

$colour-primary: rgb(236, 55, 50);
$colour-primary-light: rgb(249, 214, 214);
$colour-secondary: rgb(254, 255, 254);
$colour-tertiary: rgb(235, 236, 235);
$colour-tertiary-dark: rgb(210, 210, 210);
$colour-quaternary: rgb(0, 0, 0);
$colour-quaternary-light: rgb(30, 30, 30);

////////////////////////////////////////////////////
///// General /////

// Body

body {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}

// Typology

h1,
h2,
h3,
h4,
p,
a,
li,
form,
button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

a {
  color: black;
  text-decoration: none;
}

h1 {
  text-align: center;
  padding: 20px;
}

h2 {
  text-align: center;
  padding: 20px;
}

////////////////////////////////////////////////////
///// Layouts /////

// Header

.header {
  height: 150px;
  background-color: $colour-tertiary;
  display: flex;
  justify-content: space-between;
  & figure {
    height: 50px;
    padding-top: 30px;
  }
  & img {
    height: 100%;
  }
  & a {
    text-align: center;
    height: 100%;
    width: 100%;
    transition: all 500ms;
    border-left: 2px solid $colour-secondary;
    &:hover {
      font-weight: bolder;
      font-size: larger;
    }
  }
  & a:first-child {
    border: none;
  }
  & nav {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    line-height: 150px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    & figure {
      width: fit-content;
      height: auto;
      padding-top: 20px;
      padding-bottom: 20px;
    }
    & img {
      width: 100%;
      height: auto;
    }
  }
  // Header page de connexion / signup
  &--log {
    & nav {
      width: 40%;
    }
    & a:hover {
      background-color: $colour-primary-light;
    }
    @media screen and (max-width: 768px) {
      &figure {
        width: 100%;
        border-bottom: 2px solid $colour-secondary;
      }
      & nav {
        line-height: 60px;
        width: 100%;
        border-top: 2px solid $colour-secondary;
      }
    }
  }
  // Header pages accueil / profil / publication
  &--home {
    display: flex;
    flex-direction: column;
    height: auto;
    & figure {
      margin: 0;
      padding: 30px;
      & img {
        height: 100%;
      }
    }
    & nav {
      width: 100%;
      height: 70px;
      line-height: 70px;
    }
    & a:hover {
      background-color: $colour-quaternary-light;
      color: $colour-secondary;
    }
  }
  &--logo {
    display: flex;
    background-color: $colour-primary;
    justify-content: space-between;
    width: 100%;
    height: auto;
    & i {
      font-size: 60px;
      padding: 30px;
      color: $colour-secondary;
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      & #logout {
        font-size: 15px;
        padding: 10px 0px;
        margin-top: 0;
        width: 100%;
      }
    }
  }
}

// Articles / Aside

section {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

aside {
  float: right;
  width: 40%;
  margin-left: 5%;
  @media screen and (max-width: 768px) {
    float: unset;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 425px) {
    width: 100%;
  }
}

// Bloc

.bloc {
  background-color: $colour-tertiary;
  padding: 30px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
  margin-bottom: 50px;
  overflow: hidden;
  &--aside {
    background-color: $colour-primary-light;
    width: auto;
    @media screen and (max-width: 768px) {
      padding: 10px;
    }
    @media screen and (max-width: 425px) {
      padding: 5px;
    }
  }
  &--in {
    width: auto;
    margin-left: 0;
    margin-right: 0;
    padding: 10px;
    @media screen and (max-width: 768px) {
      padding: 10px;
    }
    @media screen and (max-width: 425px) {
      padding: 5px;
    }
  }
  &--inside {
    margin-bottom: 0;
    max-height: 200px;
    overflow: scroll;
    @media screen and (max-width: 768px) {
      padding: 10px;
    }
    @media screen and (max-width: 425px) {
      padding: 5px;
    }
  }
}

.bloc--home {
  background-color: $colour-tertiary;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 50px;
  overflow: hidden;
}

#bloc-share {
  background-color: $colour-secondary;
}

#titre-share a {
  background-color: $colour-secondary;
}

// Bouton

.bouton {
  padding: 10px;
  font-size: 15px;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  background-color: $colour-primary-light;
  display: flex;
  text-align: center;
  margin-left: 70%;
  width: fit-content;
  cursor: pointer;
  transition: all 300ms;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0px 0px 5px rgb(200, 200, 200));
    background-color: rgb(245, 150, 148);
  }
  &--disabled {
    background-color: $colour-tertiary-dark;
    cursor: default;
    &:hover {
      transform: none;
      filter: none;
      background-color: $colour-tertiary-dark;
    }
  }
  @media screen and (max-width: 768px) {
    margin-left: unset;
    align-self: center;
  }
}

// Form

form {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  & label {
    padding: 10px;
  }
  & input {
    margin-bottom: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  & textarea {
    height: 200px;
  }
}

.formMessage {
  color: $colour-primary;
  font-size: 12px;
  margin-top: -10px;
}

.errorMessage {
  color: $colour-primary;
  font-size: 15px;
}

// Liens

#lienProfil {
  width: fit-content;
  border: none;
  background-color: $colour-tertiary;
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: 2px solid $colour-tertiary;
  &:hover {
    border-bottom: 2px solid $colour-primary;
  }
}
</style>
