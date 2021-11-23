<template>
    <!-- 
        !!! This Page are note used !!! 
            This logic was moved to  __> Pacotes.vue
            We have this page here  just to backup.
    -->
    <div>
        EDITAR PACK

        <b-container>
            <b-row>
                <div class="col-sm-4 offset-sm-4">
                           <form @submit.prevent="onUpdatePackFormSubmit" >
                                
                                <div class="form-group">
                                    <label for="packName"></label>
                                    <b-form-input 
                                        type="text"
                                        id="packName"
                                        name="packName"
                                        placeholder="Pack"
                                        v-model="pack.nome"
                                        required
                                        :state="packNameValidation"
                                      
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="packNameValidation">
                                    </b-form-invalid-feedback>
                                    <b-form-valid-feedback>
                                    </b-form-valid-feedback>
                                </div>


                                <div class="form-group">
                                    <label for="packDescription"></label>
                                    <b-form-input 
                                        type="text"
                                        id="packDescription"
                                        name="packDescription"
                                        placeholder="Descrição"
                                        v-model="pack.descricao"
                                    ></b-form-input>
                                    
                                </div>

                                <div class="form-group">
                                    <label for="packPrice"></label>
                                    <b-input-group prepend="€" class="mb-2 mr-sm-2 mb-sm-0">
                                        <b-form-input 
                                            type="number"
                                            id="packPrice"
                                            name="packPrice"
                                            placeholder="Preço"
                                            v-model="pack.preco"
                                            min="1"
                                            required
                                            :state="packPriceValidation"
                                        ></b-form-input>
                                    </b-input-group>
                                    
                                    <b-form-invalid-feedback :state="packPriceValidation">
                                    </b-form-invalid-feedback>
                                    <b-form-valid-feedback>
                                    </b-form-valid-feedback>
                                </div>


                                <div class="form-group">                                    
                                    <b-button pill variant="success" type="submit">
                                        <!-- Atualizar Pack -->
                                        <b-icon icon="arrow-repeat" ></b-icon>

                                    </b-button>

                                    <b-button pill variant="outline-primary" @click="backtoPackList()" icon="arrow-up">
                                        <b-icon icon="arrow-left" aria-hidden="true"></b-icon>     
                                    </b-button> 



                                </div>


                            </form>



                </div>
            </b-row>
        </b-container>





    </div>
</template>

<script>
    import { firebasedatabase } from '../firebaseDb'
    // import { required  } from 'vuelidate/lib/validators'
    
    export default {
        data(){
            return {
                // pack: {
                // },
                pack: [],

                submitted : false
            }
        },
        
        // validations: { 
        //     pack : {
        //         nome : {required },
        //         preco : {
        //             required, 
        //             }   
        //     }
        // },


        created(){
            
        
                let dbRef = firebasedatabase
                                .collection('/packs')
                                .doc(this.$route.params.id);
                dbRef.get()
                    .then((doc) => {
                        this.pack = doc.data();
                        // alert(JSON.stringify(this.pack))
                        // console.log(this.pack)

                    })
                    .catch((error) => {
                        console.log(error);
                    })
        

            
            
        },



        methods : {
            
            backtoPackList (){
                this.$router.push('/pacotesList')

            },
            
            onUpdatePackFormSubmit(event) {
                
                if (window.confirm("Quer mesmo atulizar o Pack?")){
                    
                    event.preventDefault();
                    this.submitted = true ;
                    //  this.$v.$touch();
                    // if (this.$v.$invalid) {
                    //     return;
                    // }
    
    
                    firebasedatabase
                        .collection('/packs')
                        .doc(this.$route.params.id)
                        .update(this.pack)
                        .then(() => {
                            alert('Pack atulizado com Sucesso!');
                            this.submitted = false ;
                            this.$router.push('/pacotesList');
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }


            }





            

        }


        , computed : {

            
            packNameValidation() {
                return this.pack.nome != '' ;
                //return true;
            },

            packPriceValidation() {
                return this.pack.preco >= 1;
                    // return false;
            }
        
        }


    }
</script>

<style lang="scss" scoped>

</style>