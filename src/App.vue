<template>
  <div id="app">

    <!-- ADD COMPONENT TOP HEADER ON THE LAYOUT-->
    <top-header></top-header>
       
    <div id="nav"></div>
    
    <router-view/>

    <sibeBarReportIssueOrImprove></sibeBarReportIssueOrImprove>
  
  </div>
</template>


<script>
  import Header from "./components/Top-Header.vue";
  import Report from "./components/ReportIssue.vue"
  
  export default {
    components: {
        'top-header' : Header , 
        'sibeBarReportIssueOrImprove' : Report
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


.tableList {
  width: 96%;
  padding-left: 2%;
}





</style>
