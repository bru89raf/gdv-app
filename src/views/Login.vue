<template>
  <div>
    <div class="row d-flex justify-content-center">
      <!-- <div class="col-sm-5 offset-sm-3"> -->
      <div class="col-md-4">
        
        <b-card title="Login" >
          <form @submit.prevent="pressLogin">
                
            <div class="form-group"> 
              <div class="login">
                  <input type="email" placeholder="Email Login" v-model="email" class="form-control"/>
              </div>
            </div>
               
            <div class="form-group" style="padding-top: 2%;">     
              <div class="password">
                <input type="password" placeholder="Password" v-model="password" class="form-control" />
              </div>
            </div>

            <div class="error" style="padding-top: 2%;color:red;" v-if="error">{{error.message}}</div>

            <div class="form-group" style="padding-top: 2%;">                                    
                <b-button pill variant="success" type="submit">
                    <!-- Atualizar Pack -->
                    <b-icon icon="person-check-fill" ></b-icon>

                </b-button>
            </div>

          </form>


        </b-card>


      </div>
    </div>
  </div>
</template>

<script>

    import { fireauth } from '../firebaseDb';

  export default {
    data() {
        return {
            email : "", 
            password : "" ,
            error : ""
        }
    },


    methods : {         

      pressLogin (){
            fireauth
                .signInWithEmailAndPassword(this.email, this.password)
                // .then(data => {
                .then( () => {
                    // console.log(data);
                    this.$router.replace({name : "SocioList"})
                })
                .catch(error => {
                    this.error = error;
                })
      } 

    }//METHODS


    }
</script>

<style lang="scss" scoped>

</style>