<template>
    <div>

        <h2> Novo Registo </h2>

        <div v-if="error" class="error">{{error.message}}</div>

        <form @submit.prevent="submitClick">
            <div class="email">
                <input type="email" v-model="email" placeholder="email" />
            </div>
            <div class="password">
                <input type="password" v-model="password" placeholder="password" />
            </div>
            <button type="submit">Register</button>
        </form>



    </div>
</template>

<script>
    // import * as firebase from "firebase/app";
    import firebase from 'firebase/app'

    import "firebase/auth";

    export default {
        
        data() {
            return {
                email : "",
                password : "",
                error: ""
            }
        },
        
        
        methods: {
            submitClick(){
                
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then(() =>{
                        console.log('inside')
                        this.$router.replace({name : "Socio"});
                    })
                    .catch(error => (this.error = error))


            }
        }
    }
</script>

<style lang="scss" scoped>
    .error {
    color: red;
    font-size: 18px;
    }
    input {
    width: 400px;
    padding: 30px;
    margin: 20px;
    font-size: 21px;
    }

    button {
    width: 400px;
    height: 75px;
    font-size: 100%;
    }
</style>