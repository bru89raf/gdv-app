<template>
    <div>
        
         <div>
          <b-navbar toggleable="sm" type="dark" variant="success">

             <b-navbar-brand href="/">
                <img src="../assets/logo_white_30.png" class="d-inline-block align-top" alt="Kitten">
                GDV
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                    <router-link to="/SocioList" class="nav-item nav-link">Socio</router-link>
                    <router-link to="/pacotesList" class="nav-link">Packs</router-link>
                    <router-link to="/cotasList" class="nav-link">Cotas</router-link>                
                    <router-link to="/SocioListPrint" class="nav-item nav-link">Socio Print</router-link>
                    <!-- <router-link to=v-b-toggle.sidebarDownloadList  class="nav-item nav-link">Socio Print</router-link> -->
                    
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <!-- <b-nav-form>
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                  <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->

                <b-nav-item-dropdown right v-if="loggedIn">
                  <!-- Using 'button-content' slot -->

                  <template #button-content v-if="loggedIn">
                    <em v-if="loggedIn">Logout</em>
                    
                  </template>
                  <b-dropdown-item v-if="loggedIn" href="#" @click="signOut()">Logout</b-dropdown-item>

                </b-nav-item-dropdown>

              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>



        <!-- Login feito 
        <span v-if="loggedIn">Sim</span>
        <span v-else>Não</span>
        <div>
            <button @click="signOut"> Logout</button>
        </div> -->
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import "firebase/auth";


    export default {
        name : "top-header",
       
       mounted(){

            this.setupFirebase();
        },


        methods : {
            
            setupFirebase(){
                firebase
                    .auth()
                    .onAuthStateChanged( user => {
                        if(user){
                            console.log("Login == OK")
                            this.loggedIn = true;
                        }else{
                            console.log("Login == NOK")
                            this.loggedIn = false;

                        }



                    });

            },
            
            signOut () {
                firebase
                    .auth()
                    .signOut()
                    .then( () => {
                        this.$router.replace({name : "Login"})
                        this.loggedIn = false;
                    })
            }
        },


        data() {
            
            return{
                loggedIn : false
            };
        }
    }
</script>

<style lang="scss" scoped>

</style>