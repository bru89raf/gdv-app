<template>
    <div>
        EDITAR PACK

            <!-- <div class="row">
                <div class="col-sm-4 offset-sm-4">
                    <div>

                            <form @submit.prevent="onUpdatePackFormSubmit" >
                                        
                                <div class="form-group">
                                    <label for="packName">Pack</label>
                                    <input type="text" v-model="pack.nome" id="packName" name="packName" class="form-control" :class="{ 'is-invalid': submitted && $v.pack.nome.$error }" />
                                    <div v-if="submitted && !$v.pack.nome.required" class="invalid-feedback">Nome do Pack Obrigatorio!</div>
                                </div>

                                
                                <div class="form-group">
                                    <label for="packDescicao">Descrição</label>
                                    <input type="text" v-model="pack.descricao" id="packDescicao" name="packDescicao" class="form-control" />
                                </div>


                                <div class="form-group">
                                    <label for="packPrice">Preço</label>
                                    <input type="number" v-model="pack.preco" id="packPrice" name="packPrice"  min="0" class="form-control" :class="{ 'is-invalid': submitted && $v.pack.preco.$error }" />
                                    <div v-if="submitted && !$v.pack.preco.required" class="invalid-feedback">Preço Obrigatorio!</div>
                                </div>

                                <div class="form-group">                                    
                                    
                                    <b-button pill variant="success">
                                 
                                        <b-icon icon="plus" ></b-icon>

                                    </b-button>
                                    
                                    
                                    <b-button pill variant="outline-primary" @click="backtoPackList()" icon="arrow-up">
                                        <b-icon icon="arrow-left" aria-hidden="true"></b-icon>     
                                    </b-button> 
                                    




                                </div>
                            </form>


                    </div>
                </div>
           </div> -->


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