<template>
    <b-container>
        <b-row>
            <div class="col-sm-10 offset-sm-2">
            
                <b-card title="Cotas" >        
                    
                    <form @submit.prevent="onRegistaEditaCotaFormSubmit" >
                        
                        <div class="form-group">
                            <b-row class="my-1">                                        
                                <b-col sm="2">
                                    <label for="input-default">Número Sócio</label>
                                </b-col>
                                <b-col sm="10">
                                    <fieldset disabled>
                                        <b-form-input id="socioNumero" type="text" v-model="socioByID.socioN"></b-form-input>
                                    </fieldset>                            
                                </b-col>
                            </b-row>
                        </div>

                        <div class="form-group">
                            <b-row class="my-1">
                                <b-col sm="2">
                                <label for="input-default">Nome</label>
                                </b-col>
                                <b-col sm="10">
                                    <fieldset disabled>
                                        <b-form-input id="socioNome" type="text" v-model="socioByID.nome"></b-form-input>
                                    </fieldset>                            
                                </b-col>                           
                            </b-row>
                        </div>

                        <div class="form-group">
                            <b-row class="my-1">
                                <b-col sm="2">
                                <label for="input-default">Pack</label>
                                </b-col>
                                <b-col sm="10">
                                    <fieldset disabled>
                                        <b-form-input id="packNamePreco" name="socioPack" type="text" v-model="packByID.packNamePreco"></b-form-input>
                                    </fieldset>                            
                                </b-col>
                            </b-row>
                        </div>

                        <b-alert show variant="warning" v-if="checkTagsJaPagasMasRemovidas.length > 0">
                            <span> 
                                Cota(s) já paga(s) mas removida(s) <br>
                                <li v-for="(item, index) in checkTagsJaPagasMasRemovidas" v-bind:key="index">{{item}}</li>
                            </span>
                        </b-alert>

                        <div class="form-group">
                            
                            <b-form-group 
                                :label="checkLableCotasJaPagas" 
                                label-for="tags-with-dropdown"
                            >
                                
                                <b-form-tags id="tags-with-dropdown" v-model="value" no-outer-focus class="mb-2">
                                    <template v-slot="{ tags, disabled, addTag, removeTag }">
                                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                            <b-form-tag
                                                @remove="removeTag(tag)"
                                                :title="tag"
                                                :disabled="disabled"
                                                :variant="valueVarient"
                                            >
                                                {{ tag }}
                                                
                                            </b-form-tag>
                                        </li>
                                    </ul>

                                    <b-dropdown size="sm" variant="outline-success" block menu-class="w-100">
                                        <template #button-content>
                                        <b-icon icon="calendar-check"></b-icon> Cotas em dívida({{availableOptions.length}}).
                                        </template>
                                        
                                        <b-dropdown-form @submit.stop.prevent="() => {}">
                                            <b-form-group
                                                label="Pesquisar"
                                                label-for="tag-search-input"
                                                label-cols-md="auto"
                                                class="mb-0"
                                                label-size="sm"
                                                :description="searchDesc"
                                                :disabled="disabled"
                                                variant="success"
                                            >
                                                <b-form-input
                                                    v-model="search"
                                                    id="tag-search-input"
                                                    type="search"
                                                    size="sm"
                                                    autocomplete="off"
                                                >
                                                </b-form-input>
                                            </b-form-group>
                                        </b-dropdown-form>
                                        
                                        <b-dropdown-divider></b-dropdown-divider>
                                        
                                        <b-dropdown-item-button
                                            v-for="option in availableOptions"
                                            :key="option"
                                            @click="onOptionClick({ option, addTag })"
                                        >
                                            {{ option }}
                                        </b-dropdown-item-button>
                                        <b-dropdown-text v-if="availableOptions.length === 0 && search.length === 0">
                                        Não existem cotas de momento.
                                        </b-dropdown-text>
                                    </b-dropdown>
                                    </template>
                                </b-form-tags>
                        </b-form-group>


                        </div>

                        <span v-if="valoraPagar > 0">
                        
                            <div class="form-group">
                                <b-row class="my-1">
                                    <b-col sm="5">
                                    <label for="input-default">Valor a pagar:</label>
                                    </b-col>
                                    <b-col sm="5">
                                        <fieldset disabled>
                                            <b-input-group prepend="€" >
                                                <b-form-input v-model="valoraPagar" :state="true">
                                                </b-form-input>
                                            </b-input-group>
                                        </fieldset>                            
                                    </b-col>
                                </b-row>
                            </div>

                        </span>

                        <div class="form-group">                                   
                                
                            <b-button pill variant="success" type="submit">
                                <b-icon icon="plus" ></b-icon>
                            </b-button>
                            
                            <b-button pill variant="outline-primary" @click="backToSocioList()" icon="arrow-up">
                                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>     
                            </b-button>                             
                        </div> 

                    </form>

                </b-card>

            </div>
        </b-row>
    </b-container>
</template>

<script>
    import {firebasedatabase} from '../firebaseDb'
    
    export default {
        
        data() {

            return {
                
                socioByID : []
                , packByID : []

                , cotasJaPagas : []
                , tagsCotasJaPagas : []
                , cotaJaPagasDisable : true
                , limitTagsJaPagas : 0
                
                , cotasAbertas : []
                , cotasAbertasObjecto : []
                , tagsCotasAbertas : []

                , missingCotasOnUpdate : [] 

                , options: []
                , search : ''

                , value : []
                , valueVarient : ''

            } 

        } //DATA

        , created() {
            this.getSocioByID(this.$route.params.id);
        } //CREATED

        , methods : {

            backToSocioList(){
                if (window.confirm("Deseja mesmo Sair?\nAs alterações efetuadas serão descartadas. ")){
                    this.$router.push('/SocioList')
                }

            }

            , getSocioByID(socioID){
                let dbRefDoc =  firebasedatabase
                    .collection('/Socio')
                    .doc(socioID);
              
                dbRefDoc.get()
                    .then((doc) =>{ 
                    
                        this.socioByID = doc.data();

                        let socioCriadoA_year = (new Date(this.socioByID.criadoa).getFullYear());
                        this.socioByID.criadoaYear = socioCriadoA_year;

                        this.getPackByID(this.socioByID.pack)

                        // cotas ja pagas ( na ficha do Socio)
                        this.cotasJaPagas =  this.socioByID.cotas;
                        this.tagsCotasJaPagas = this.cotasJaPagas;
                    
                        this.valueVarient = 'success';
                        this.value = this.cotasJaPagas;
                        
                        this.valueVarient = 'info';
                        
                        this.getCotas();


                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }

            , getPackByID(packID){
                let dbRefDocPack =  firebasedatabase
                .collection('/packs')
                .doc(packID);

                dbRefDocPack.get()
                .then((doc) =>{ 
                    
                    this.packByID = doc.data();
                    this.packByID.packNamePreco = doc.data().nome + '(' + doc.data().preco + ' €)'
                    this.packByID.packPreco = doc.data().preco

                })
                .catch((error) => {
                        console.log(error)
                    })
        
            }

            , getCotas(){
                firebasedatabase
                    .collection('/cotas')
                    .onSnapshot((snapShot) => {
                        this.cotasAbertas = [];
                        snapShot.forEach((doc) => { 
                            
                            this.cotasAbertasObjecto = doc.data();                           

                            //Mostrar apenas os anos seguinte a data de criação do user
                            if (doc.data().ano >=  this.socioByID.criadoaYear){
                                this.options.push (
                                    doc.data().ano
                                )
                            }
                            
                            this.options.sort();

                            // TAGS ABERTAS (POSSIVEIS ANOS QUE PODEMOS REGISTAR)
                            this.tagsCotasAbertas = this.cotasAbertas.filter(yea => !this.cotasJaPagas.includes(yea) );
                            
                        })
                    })
            }


            // , validatorYearCota(tag){
            //         return tag === tag.toLowerCase() && tag.length == 4 && this.cotasAbertas.includes(tag);
            // }


            // , updateCotasPorPagar(){
            //     let emFalta = [];
            //     emFalta = this.cotasAbertas.filter(yea => !this.tagsCotasAbertas.includes(yea))

            //     return emFalta;
            // }

            // , updateCotasJaPagas(){
            //     let cotasJaPgasEliminadas = [];
            //     cotasJaPgasEliminadas =  this.cotasJaPagas.filter(yea => !this.tagsCotasJaPagas.includes(yea))
                
            //     return cotasJaPgasEliminadas;                
            // }


            // , getValorPagarCotas(){
            //     let tagsSeleccionadas = this.tagsAbertas.length()
            //     return tagsSeleccionadas + '€'
            // }
            
            , onRegistaEditaCotaFormSubmit(){
                
                if (window.confirm("Quer mesmo adicioncar as cotas como Pagas?\n " + this.value)){
                    
                    let checker = (arr, target) => target.every(v => arr.includes(v));
                    let checkOldRegistration = checker(this.value, this.cotasJaPagas)
                    
                    let checkMissing = (a1, a2) => a2.filter( d => !a1.includes(d))                
                    
                    let missing = checkMissing( this.value, this.cotasJaPagas)
                    this.missingCotasOnUpdate = missing;

                    if(!checkOldRegistration){
                        
                        if (window.confirm("Cotas anteriormente pagas não se encontram na atualização.\nAs cotas em falta são: " + missing + "\nDeseja continuar?")){
                                                        
                            this.updateSocioRecord(this.value)
                            this.backToSocioList();

                        }

                    }  else {
                     
                        this.updateSocioRecord(this.value)
                        this.backToSocioList();
                    }

                }


            }

            , updateSocioRecord(socioCotas){
                 firebasedatabase
                    .collection('/Socio')
                    .doc(this.$route.params.id)
                    .update({
                        cotas : socioCotas
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
            }


            , onOptionClick({ option, addTag }) {
                addTag(option)
                this.search = ''
            }


        } //METHODS

        , computed : {

            criteria(){
                return this.search.trim().toLowerCase()
            }

            , availableOptions() {
                const criteria = this.criteria
                const options = this.options.filter(opt => this.value.indexOf(opt) === -1)
                if (criteria) {
                    return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
                }
                return options
            }

            , searchDesc() {
                if (this.criteria && this.availableOptions.length === 0) {
                return 'Não foi encontrada nenhuma cota.'
                }
                return ''
            }

            , state() {
                let status = this.dirty ? this.tagsAbertas.length >= 1 && this.cotasAbertas.includes(this.tags): null
                return status
            }

            , checkTagsJaPagas(){
                let cotasApagadas = this.cotasJaPagas.filter(yea => !this.tagsCotasJaPagas.includes(yea))
                return cotasApagadas
            }

            , valoraPagar(){
                let lenghtCotasJaPagas = this.cotasJaPagas.length;
                let lenghtNewCotas = this.value.length ;
                let totalPrice = (lenghtNewCotas - lenghtCotasJaPagas) * this.packByID.packPreco;
                return totalPrice.toFixed(2);


            }

            , checkTagsJaPagasMasRemovidas(){
                let checkMissing = (a1, a2) => a2.filter( d => !a1.includes(d))
                let missing = checkMissing( this.value, this.cotasJaPagas)
                return missing;
            }

            , checkLableCotasJaPagas(){
                return this.cotasJaPagas.length == 0 &&  this.value.length == 0?'Nenhuma cota paga ate o momento!' : 'Cotas pagas'
            }

        } //COMPUTED

    }
</script>

<style lang="scss" scoped>

</style>