<template>
    <div>
        Registo de Cota
    
    
            <div class="row">
                <div class="col-sm-4 offset-sm-4">
                    <div>

                                       
                       
                        <form @submit.prevent="onRegisterUpdateCotakFormSubmit" >
                            
                            <div class="form-group">
                                <fieldset disabled>
                                    <label for="socioNome">Nome</label>
                                    <input type="text" v-model="socio.nome" id="socioNome" name="socioNome" class="form-control" />
                                </fieldset>
                            </div>   

                            
                            <div class="form-group">
                                <label for="tags-basic">Cotas já pagas</label>
                                <b-form-tags 
                                input-id="tags-basic" 
                                v-model="cotasJaPagas"
                                :disabled="cotaJaPagasDisable"
                                placeholder=""
                                >
                                </b-form-tags>
                                <b-form-checkbox switch size="lg" v-model="cotaJaPagasDisable">
                                    <span v-if="cotaJaPagasDisable">Desbloquear</span>
                                    <span v-else>Bloquear</span>

                                </b-form-checkbox>
                                <!-- <p class="mt-2">já pagas: {{ cotasJaPagas }}</p> -->
                            </div>             

                            <div class="form-group">
                                {{this.cotasAbertas}}
                                <p></p>
                                <label for="tags-state-event">Cotas em falta cotas </label>
                               
                               
                                <b-form-group label="Tags validation example" label-for="tags-validation" :state="state">
                                <b-form-tags
                                    input-id="tags-validation"
                                    v-model="tagsAbertas"
                                    :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
                                    :tag-validator="validatorYearCota"
                                    :state="state"
                                    separator=" "
                                    placeholder="Ano Cota..."
                                ></b-form-tags>

                                <template #invalid-feedback>
                                    Deve inserir pelo menos 1 cota.
                                </template>

                                <template #description>
                                    <div id="tags-validation-help">
                                     Só pode inserir Cotas que estejam disponiveis.
                                      <span>{{ updateCotasPorPagar() }} </span>

                                    
                                    </div>
                                </template>
                                
                                </b-form-group>

                            </div>










                            <div class="form-group">                                    
                                    
                                    <b-button pill variant="success" type="submit">
                                        <!-- Atualizar Pack -->
                                        <b-icon icon="plus" ></b-icon>

                                    </b-button>
                                    
                                    <b-button pill variant="outline-primary" @click="backToSocioList()" icon="arrow-up">
                                        <b-icon icon="arrow-left" aria-hidden="true"></b-icon>     
                                    </b-button>                             




                            </div>


                        </form>





                    </div>
                </div>
           </div>
    
    
    
    </div>




</template>

<script>
    import { firebasedatabase } from '../firebaseDb' 
     import 'vue-good-table/dist/vue-good-table.css'
    // import { VueGoodTable } from 'vue-good-table';

 
    export default {
        
        
        
        
        data() {
            return {
                socio : []
                
                , cotasJaPagas : []
                , cotaJaPagasDisable : true

                , cotasAbertas : []
                , cotasAbertasObject : []
                , tagsAbertas : []
                , dirty : false


                , novaCota : {
                    ano : ''
                }
           
                , columnsCotas : [
                    {
                        label : 'Before',
                        field : 'before',
                        sortable: false, 
                        width : '15%'

                    },
                    {
                        label : 'Ano',
                        field : 'ano' ,
                        width : '35%'
                        
                    }
                ]


            }
        }

        , created() {
            
            alert('Socio ID: ' + this.$route.params.id)

           let dbRefDoc =  firebasedatabase
                .collection('/Socio')
                .doc(this.$route.params.id);


            dbRefDoc.get()
                    .then((doc) =>{
                        this.socio = doc.data();
                        // this.cotasJaPagas = doc.data().cotas;
                        var criadoa_year = (new Date(this.socio.criadoa).getFullYear())
                        this.socio.criadoaYear = criadoa_year;

                        this.cotasJaPagas = doc.data().cotas;
                        
                        alert('Read Cotas : ' + JSON.stringify(this.cotasJaPagas) )

                        alert('Socio \n' + JSON.stringify(this.socio) )

                        console.log(this.socio)
                        

                        
                        alert('Criado a : ' + criadoa_year)

                    })
                    .catch((error) => {
                        console.log(error)
                    })

            //GET COTAS ABERTAS
            firebasedatabase
                .collection('/cotas')
                .onSnapshot((snapShot) => {
                    this.cotasAbertas = [];
                    snapShot.forEach((doc) => {
                        // this.cotasAbertas.push({
                        //     ano : doc.data().ano
                        // })
                                           
                        
                        this.cotasAbertasObject.push({
                            
                            ano : doc.data().ano
                        });
                    

                            
                        if(doc.data().ano >= this.socio.criadoaYear){
                            this.cotasAbertas.push(
                                doc.data().ano
                            );
                        }

                        

                    });

                    //remover as existentes
                    this.cotasAbertas = this.cotasAbertas.filter(number => !this.cotasJaPagas.includes(number) )
                   
                    this.tagsAbertas = this.cotasAbertas;
                });
                
               



        }

        , computed: {

            state() {
                // Overall component validation state
                                
                let status = this.dirty ? this.tagsAbertas.length >= 1 && this.cotasAbertas.includes(this.tags): null
                return status


            }
        }

        

        , methods : {
            
            backToSocioList(){
                this.$router.push('/SocioList')
            }
            , onRegisterUpdateCotakFormSubmit () {
                    alert('click submit registo cota\n' + JSON.stringify(this.cotasJaPagas) )

                    


                    this.cotasJaPagas.push(...this.tagsAbertas);


                    alert('Cotas pagas : ' + this.cotasJaPagas)

                        

                        // firebasedatabase
                        //     .collection('/Socio')
                        //     .doc(this.$route.params.id)
                        //     .update({
                        //         cotas : this.cotasJaPagas
                        //     })
                        //     .then(() => {
                        //         this.novaCota.ano = ''
                        //         console.log('Nova Cota ADICIONADA com sucesso!')
                        //     })
                        //     .catch((error) => {
                        //         console.log(error)
                        //     })
            }


            , deleteCota(key){

                alert('Delete click: ' + key)
                
                if( window.confirm("Quer mesmo remover a cota paga?") ){
                    this.cotasJaPagas.splice(key, 1);
                    //console.log(JSON.stringify(this.cotasJaPagas))
                    // console.log(this.cotasJaPagas)

                    firebasedatabase
                        .collection('/Socio')
                        .doc(this.$route.params.id)
                        .update({
                            cotas : this.cotasJaPagas
                            })
                    .then(() => {
                        console.log('Cota ELIMINADA com sucesso!')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }


                //vamos ter de gravar na Base de Dados
                




                // this.cotasJaPagas.remo

                // let result  = _.without(this.cotasJaPagas, key)
            }


            , validatorYearCota(tag){
                
                //return this.cotasAbertas.includes(tag) 
                return tag === tag.toLowerCase() && tag.length == 4 && this.cotasAbertas.includes(tag);
            }


            , updateCotasPorPagar (){
                
                let emFalta = [];

                emFalta = this.cotasAbertas.filter(number => !this.tagsAbertas.includes(number) )
                return emFalta;
                
            }

        }

    }
</script>

<style lang="scss" scoped>

</style>