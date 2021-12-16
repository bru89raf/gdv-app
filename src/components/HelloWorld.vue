<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Aplicação para gerir as cotas dos sócios.<br>
    </p>

    <h3>Menu rápido</h3>
    
    <ul>
      <li><a href="/socioList" rel="noopener">Sócios</a></li>
      <li><a href="/pacotesList" rel="noopener">Packs</a></li>
      <li><a href="/cotasList" rel="noopener">Cotas (anos abertos)</a></li>
    </ul>

      <h3>Redes Sociais</h3>
    <ul>
      <li><a href="https://www.facebook.com/GrupoDesportivoDeValverde" target="_blank" rel="noopener"> <b-icon icon="facebook" font-scale="2"></b-icon> </a></li>
      
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
