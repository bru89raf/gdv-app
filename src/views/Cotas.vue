<template>

    <!-- 
        !!! This Page are note used !!! 
            This logic was moved to  __> cotasList.vue
    -->

    <b-container>
        <b-row>
            <div class="col-sm-4 offset-sm-4">
                <b-card title="Nova Cota" > 
                    
                    <form @submit.prevent="onCotasFormSubmit"> 
                        <div class="form-group">
                            <label for="socioNome">Cota</label>
                            <b-form-input 
                                v-model="cota.ano" 
                                placeholder="Ano" 
                                type="number"
                                required
                                :state="anoValidation"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="anoValidation">
                                Ano Cota Obrigatorio
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>

                            </b-form-valid-feedback>
                        </div>
                    </form>

                </b-card>
            </div>
        </b-row>
    </b-container>
     
</template>

<script>
    
    import {firebasedatabase } from '../firebaseDb'

    export default {
        
        data() {
                        
            return {
                cota: {
                    ano : ''
                }
            }
        },

        methods : {
            onCotasFormSubmit (event) {
                event.preventDefault();
                firebasedatabase
                    .collection('/cotas')
                    .add( this.cota, 4 )
                    .then(() => {
                        alert('Cota adicionada com sucesso!');
                        this.cota.ano = ''
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
        
        , computed : {
                
                anoValidation(){
                    //verificar se a cota ainda nao exist.
                    return this.cota.ano.length == 4
                }

        }

     }
</script>

<style lang="scss" scoped>

</style>