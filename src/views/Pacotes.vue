<template>
    <div>
        <!-- PACOTES  -->
        <label for="bcontainer-pack"><b>Novo Pack</b></label>
      
          <b-container id="bcontainer-pack">
            <b-row style="width:100%">

                <div class="col-sm-4 offset-sm-4">

                    <form @submit.prevent="onPacotesFormSubmit" >
                                                                
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
                            <b-form-invalid-feedback :state="packNameValidation" v-if="pack.nome.length<4"> Tamanho minino de 4 </b-form-invalid-feedback>
                            <b-form-invalid-feedback :state="packNameValidation"> </b-form-invalid-feedback>
                            
                            <b-form-valid-feedback></b-form-valid-feedback> 

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
                                    v-model.number="pack.preco"
                                    step="0.01"
                                    min="1.00"
                                    
                                    required
                                    :state="packPriceValidation"
                                ></b-form-input>
                            </b-input-group>
                            
                            <b-form-invalid-feedback :state="packPriceValidation" >
                            </b-form-invalid-feedback>
                            
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>

                        </div>


                        <div class="form-group">                                    
                            <b-button 
                                    pill 
                                    variant="success" 
                                    type="submit"
                                    :disabled="formSubmitted"
                            >
                                <b-icon icon="plus" ></b-icon>
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
    import {firebasedatabase} from '../firebaseDb'


    export default {
    
        data() {
            return {
                pack: {
                    nome : ''
                    , descricao : ''
                    , preco : ''
                    
                }
                
                , submitted: false
                , btnEnableSubmittForme : false

            }
        }//DATA
        
        , methods: {

            backtoPackList (){
                this.$router.push('/pacotesList')

            }
            , onPacotesFormSubmit(event){

                event.preventDefault();
                
                this.submitted = true;


                //Menos manual de verificar form:
                let packNameValid = this.pack.nome.length>3?true:false;
                let packPrecoValid = !!this.pack.preco>0.00;

                let formIsValid = packNameValid && packPrecoValid;

                if(formIsValid){
                    firebasedatabase
                        .collection('/packs')
                        .add(this.pack)
                        .then( () => {
                            // Limpar o objecto
                            this.pack.nome = '';
                            this.pack.descricao = '';
                            this.pack.preco = '';
                            this.submitted = false;
    
                            alert('Pack adicionado com sucesso')
                            this.$router.push('pacotesList')
                        
                        })
                        .catch((error) => {
                            console.log(error);
    
                        })

                }else{
                    console.log('Pack Form: Error on input')
                }


            } , 
            
            handleSubmit() {
                this.submitted = true;
                
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

            }

        }//METHODS


        , computed :{

                packNameValidation() {
                    return this.pack.nome.length==0?null:this.pack.nome.length > 3;
                },

                packPriceValidation() {
                    return this.pack.preco.length==0?null:this.pack.preco >= 1.00;
                }, 


                formSubmitted(){
                    let checkName = this.pack.nome.length <=3?true:false;
                    let checkPreco = this.pack.preco<1.00?true:false;
                
                    return checkName === false && checkPreco === false ? false:true
                }              

        }//COMPUTED

    }
</script>

<style lang="scss" scoped>

</style>