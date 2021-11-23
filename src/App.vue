<template>
  <div id="app">

    <!-- adicionar novo componente no layout -->
    <top-header></top-header>


       
<div id="nav"></div>

<!-- 
    <div id="nav">
      <router-link to="/login">Login</router-link> |
      
      <router-link to="/register">Register</router-link> |

      <router-link to="/SocioList">Lista Sócio</router-link> |
      
      <router-link to="/cotasList">Lista Cotas</router-link> |
      
      <router-link to="/pacotesList">Lista Packs</router-link> |
      
      <router-link to="/importexportdata">Import/Export</router-link> 
    </div> -->
    
    <router-view/>
  
  </div>
</template>


<script>
  import Header from "./components/Top-Header.vue";
  
  export default {
    components: {
        'top-header' : Header
    }  
  }
</script>



<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;
  padding: 1%;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}





</style>
