<template>
    
    <div class="tableList" >

        <b-spinner 
            style="width: 3rem; height: 3rem;" 
            type="grow"
            variant="success"
            v-if="spinnerLoadingSociosTable"
        ></b-spinner>

        <div v-if="!spinnerLoadingSociosTable">
            
            <b-alert
                id="b-alert-SocioList"
                :show="dismissAlertCountDownSuccessSocioList"
                dismissible
                :variant="bAlertVariantSocioList"
                @dismissed="dismissAlertCountDownSuccessSocioList=0"
                @dismiss-count-down="countDownChangedAlertSocioList"
            >
                <p>{{ bAlertMessageShowSocioList }}</p>

            </b-alert>
            
            <vue-good-table
                :columns="columns"
                :rows="rows"
                :search-options="{
                    enabled: true,
                    placeholder : 'Pesquisar na lista'
                }"
                :sort-options="{
                    enable : true, 
                    initialSortBy : {field : 'nome', type : 'asc'}
                }" 

                :pagination-options="{
                        enabled: true
                        , perPage: 5
                        , perPageDropdown: [5, 10, 15]
                        , nextLabel: 'prox.'
                        , prevLabel: 'ant.'
                        , rowsPerPageLabel: 'Por pag'
                        , ofLabel: 'de'
                        , allLabel: 'Todos'
                    }"   
                    compactMode
                >


                <div slot="table-actions">
                    <!-- <b-button pill variant="success" size="sm" @click.prevent="GoToNovoSocio()">
                            <b-icon icon="plus-circle-fill" ></b-icon> 
                    </b-button>  -->


                     <b-button pill variant="success" size="sm" @click.prevent="modalSocioOpen_cickVueTable()">
                            <b-icon icon="plus-circle-fill" ></b-icon> 
                    </b-button> 
                    
                    <!-- 
                        Side Menu para Download ficheiro 

                        This link will use the component >>> SideBarDownloadSocio.vue
                    -->
                    <!-- <b-button pill variant="info" v-b-toggle.sidebarDownloadList>
                            <b-icon icon="download" ></b-icon> 
                    </b-button>  -->
                </div>

                
                <template slot="table-row" slot-scope="props">                   
                    
                    <span v-if="props.column.field == 'beforeEditSocio'">
  
                        <!-- <b-button @click.prevent="editSocio()" variant="primary" class="btn">
                            <b-icon icon="pencil"></b-icon>  
                        </b-button> -->
                        <b-button  @click.prevent="editSocio(   props.row.key,
                                                                props.row.socioN, 
                                                                props.row.nome, 
                                                                props.row.morada, 
                                                                props.row.nif,
                                                                props.row.contacto,
                                                                props.row.email,
                                                                props.row.aniversario,
                                                                props.row.pack,
                                                                props.row.cotas,
                                                                props.row.criadoa,
                                                                )" 
                                    size="sm" variant="primary" class="btn">
                            <b-icon icon="pencil"></b-icon>  
                        </b-button> 


                        <!-- <router-link :to="{name : 'saveSocioCota' , params : { id : props.row.key}}" size="sm" class="btn btn-warning">
                            <b-icon size="sm" icon="cash"></b-icon>                            
                        </router-link>  -->

                        <!-- <b-button  size="sm" @click="$router.push({name : 'saveSocioCota' , params : { id : props.row.key}})" variant="warning">                     
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" 
                                                                    height="18" 
                                                                    fill="currentColor" 
                                                                    class="bi bi-currency-euro" 
                                                                    viewBox="0 0 18 18">
                                <path d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z"/>
                            </svg> 
                        </b-button> -->

                        <b-button  size="sm" @click.prevent="GoToCotas( props.row.key, 
                                                                        props.row.socioN, 
                                                                        props.row.nome, 
                                                                        props.row.pack,
                                                                        props.row.cotas,
                                                                        props.row.criadoa                                                                        
                                                                        )"
                                    variant="warning">                     
                            <svg    xmlns="http://www.w3.org/2000/svg" 
                                    width="18" 
                                    height="18" 
                                    fill="currentColor" 
                                    class="bi bi-currency-euro" 
                                    viewBox="0 0 18 18">
                                <path d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z"/>
                            </svg> 
                        </b-button>


                    </span>

                    <span v-if="props.column.field == 'contacto'">
                        <a :href="`tel:${props.row.contacto}`">{{props.row.contacto}}</a>
                    </span>
                    <span v-else>
                        {{props.formattedRow[props.column.field]}}
                    </span>


                    <span v-if="props.column.field == 'moreinfo'">
                        <div class="p-2">
                            <b-button :id="`socioMoreInfo-${props.row.key}`" size="sm" variant="info" ref="button">
                                <b-icon icon="three-dots-vertical"></b-icon>                                
                            </b-button>
                            <b-popover 
                                ref="popover" 
                                :target="`socioMoreInfo-${props.row.key}`"
                                title="..."
                                triggers="hover"
                            >
                                <div>
                                    <strong>Sócio N.</strong>: {{props.row.socioN}}<br>
                                    <strong>Email</strong>: {{props.row.email}}<br>
                                    <strong>Morada</strong>: {{props.row.morada}}<br>
                                    <strong>NIF</strong>: {{props.row.nif}}<br>
                                </div>
                                
                                <div>
                                    <b-button  @click.prevent="deleteSocio(props.row.key)" class="btn btn-large btn-block btn-danger">
                                        <b-icon icon="trash" aria-hidden="true"></b-icon>     
                                    </b-button>                                     
                                </div>

                            </b-popover>
                        </div>
                    </span>

                </template>

            </vue-good-table>       
            

            <!-- MODAL FOR CREATE OR UPDATE SOCIO -->
            <b-modal 
                id="modal-Socio" 
                :title="bModalTitle_Socio" 
                button-size="sm"
                hide-footer
                hide-header-close
            >
            
                 <b-alert
                    id="b-alert-SocioModal"
                    :show="dismissAlertCountDownSuccessSocioList_modal"
                    dismissible
                    :variant="bAlertVariantSocioList_modal"
                    @dismissed="dismissAlertCountDownSuccessSocioList_modal=0"
                    @dismiss-count-down="countDownChangedAlertSocioList_modal"
                >
                    <p>{{ bAlertMessageShowSocioList_modal }}</p>

                 </b-alert>

              
                 

                <form @submit.prevent="onSocioModelFormSubmit" >
                    
                    <div class="form-group">
                        

                        <b-input-group size="sm"  prepend="Numero Sócio (possivel) ">
                            <b-spinner size="sm" v-if="loadingSpinnerSocioNumber" ></b-spinner>
                            <b-form-input
                                type="number" 
                                v-model="socioModal.socioN" 
                                id="socioNumero" 
                                name="socioNumero" 
                                class="form-control" 
                                v-if="!loadingSpinnerSocioNumber"
                                :state="socioNValidationModal"
                                min="1"
                                disabled
                            >
                             </b-form-input>

                            <b-input-group-append v-if="!socioNValidationModal">
                                 
                                <b-button @click.prevent="automaticallySocioNumberModal()" class="btn btn-large btn-block btn-danger">
                                        <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>     
                                    </b-button>  
                            </b-input-group-append>
                            
                        
                               

                            <b-form-invalid-feedback :state="socioNValidationModal">
                                <span v-if="!loadingSpinnerSocioNumber">Numero de Socio já esta em uso.</span> 
                            </b-form-invalid-feedback>


                        </b-input-group>

                    </div>      
                    
                    <div class="form-group">                        
                        <b-input-group size="sm"  prepend="Nome">
                            <b-form-input 
                                v-model="socioModal.nome" 
                                placeholder="Nome" 
                                type="text"
                                required
                                :state="nameValidatioSocioModal"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="nameValidatioSocioModal">
                                Nome Obrigatorio
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div> 

                    <div class="form-group">
                        <b-input-group size="sm"  prepend="Morada">
                            <b-form-input 
                                v-model="socioModal.morada" 
                                type="text"
                                placeholder="Morada" 
                                required
                                :state="moradaValidationSocioModal"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="moradaValidationSocioModal">
                                Morada Obrigatorio
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div>


                    <div class="form-group">
                        <b-input-group size="sm"  prepend="Contacto">
                            <b-form-input 
                                v-model="socioModal.contacto" 
                                type="number"
                                placeholder="Contacto" 
                                required
                                :state="contactoValidationSocioModal"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="contactoValidationSocioModal">
                                <span v-if="undefined !==socioModal.contacto && socioModal.length>9">Tamanho do contacto errado</span>
                                <span v-else>Contacto Obrigatorio</span>                                        
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div>

                    <div class="form-group">
                        <b-input-group size="sm"   prepend="Anivers.">
                            <b-form-input
                                id="example-input"
                                v-model="socioModal.aniversario"
                                type="text"
                                placeholder="Aniversário"
                                autocomplete="off"
                                title="Formato - AAAA-MM-DD"
                                size="sm"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker
                                v-model="socioModal.aniversario"
                                button-only
                                right
                                aria-controls="example-input"
                                size="sm"
                                ></b-form-datepicker>
                                
                            </b-input-group-append>
                        </b-input-group>
                    </div>


                    <div class="form-group">
                        <b-input-group size="sm"  prepend="Email">
                            <b-form-input 
                                v-model="socioModal.email" 
                                type="email"
                                placeholder="email" 
                            ></b-form-input>
                        </b-input-group>
                    </div>


                    <div class="form-group">
                        <b-input-group size="sm"  prepend="NIF">
                            <b-form-input 
                                v-model="socioModal.nif" 
                                type="number"
                                placeholder="NIF"                                     
                                :state="nifValidationSocioModal"
                            ></b-form-input> 
                            <b-form-invalid-feedback :state="nifValidationSocioModal">
                                <span v-if="undefined!==socioModal.nif && socioModal.nif.length!=9">NIF errado. </span> 
                                <span v-else>Obrigatorio</span>
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div>  


                    <div class="form-group">
                        <b-input-group size="sm"  prepend="Pack ">
                            <b-form-select 
                                v-model="socioModal.pack" 
                                :options="packList_Socio"
                                value-field="value"
                                text-field="text"
                                id="socioPack"  
                                placeholder="Escolher Pack"
                                name="socioPack" 
                                required
                                :state="packValidationSocioModal"
                                >
                            </b-form-select>     
                                <!-- :state="packValidation" -->
                        </b-input-group>                           
                    </div>

                      <div class="form-group">    
                                    
                        <b-form-checkbox 
                            v-if="socioKey_edit.length==0"
                            v-model="statusInsertNextSocio" 
                            name="check-button" 
                            switch
                            >
                            Inserir de seguida outro Sócio.
                        </b-form-checkbox>

                    </div>



                        <b-button 
                            :variant="bModalButtonVariant_Socio" 
                            class="mt-1" 
                            block 
                            type="submit"
                        >    
                            <span v-if="socioModal_action=='update'">Atualizar</span>
                            <span v-else>Novo</span>
                        </b-button>
                        
                        
                        <b-button class="mt-1" block @click="modalSocioClose">Fechar</b-button>
                       


                </form>


            
            </b-modal>            

            <!-- //END MODAL FOR CREATE OR UPDATE -->

            
            
            <!-- MODAL FOR COTAS -->
            <b-modal 
                id="modal-Cotas" 
                :title="ModalCotas_title" 
                button-size="sm"
                hide-footer
                hide-header-close
            >

                <form @submit.prevent="onRegistaEditaCotaFormSubmit" >
                    
                    <div class="form-group">
                        <b-input-group size="sm"  prepend="Numero Sócio">
                            <b-form-input
                                type="number" 
                                v-model="socioByID.socioN" 
                                id="socioNumero" 
                                name="socioNumero" 
                                class="form-control" 
                                disabled
                            >
                            </b-form-input>   
                         </b-input-group>   
                    </div>  

                    <div class="form-group">
                        <b-input-group size="sm"  prepend="Pacote">
                            <b-form-input
                                type="text" 
                                v-model="socioByID.packNomePreco" 
                                id="socioNumero" 
                                name="socioNumero" 
                                class="form-control" 
                                disabled
                            >
                            </b-form-input>   
                        </b-input-group>   
                    </div>   
                    
                    <div class="form-group">
                        
                        
                        
                        <b-alert show variant="warning" v-if="checkTagsJaPagasMasRemovidas.length > 0">
                            <span> 
                                Cota(s) já paga(s) mas removida(s) <br>
                                <li v-for="(item, index) in checkTagsJaPagasMasRemovidas" v-bind:key="index">{{item}}</li>
                            </span>
                        </b-alert> 

                        <span v-if="valoraPagar > 0">
                        
                            <div class="form-group">
                                <b-row class="my-1">
                                    <!-- <b-col sm="5">
                                    <label for="input-default">Valor a pagar:</label>
                                    </b-col> -->
                                    <b-col sm="6">
                                        <fieldset disabled>
                                            <b-input-group size="sm" prepend="Valor a pagar" append="€" >
                                                <b-form-input v-model="valoraPagar" :state="true" style="bold">
                                                </b-form-input>
                                            </b-input-group>
                                           
                                        </fieldset>                            
                                    </b-col>
                                </b-row>
                            </div>

                        </span>


                            <b-form-group 
                                :label="checkLableCotasJaPagas" 
                                label-for="tags-with-dropdown"
                                style="text-align:center"
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
                
                    <div class="form-group">                                   
                        
                        <b-button 
                            variant="warning" 
                            class="mt-1" 
                            block 
                            type="submit"
                        >    
                            <span v-if="checkTagsJaPagasMasRemovidas.length == 0">Adicionar Cota(s)</span>
                            <span v-if="checkTagsJaPagasMasRemovidas.length > 0" style="color : red">Atualizar Cota(s)</span>
                        </b-button>
                        
                        
                        <b-button class="mt-1" block @click="modalSocioCotasClose">Fechar</b-button>
                       

                    </div> 
            




                </form>


            </b-modal>
            <!-- //END MODAL FOR COTAS -->




        </div>


        <!-- SIDE BAR -->
        <!-- <down-list-socio >

        </down-list-socio> -->

    </div>

</template>

<script>
    import { firebasedatabase } from '../firebaseDb'
    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table';
    
    
    
    export default {
        name : "Socio-List" ,

        data() {
            
            return{
                
                bAlertVariantSocioList : ''
                , bAlertMessageShowSocioList : ''
                , dismissAlertSocioSecs : 3
                , dismissAlertCountDownSuccessSocioList : 0
                

               , columns: [
                    {
                        label : '',
                        field : 'beforeEditSocio',
                        sortable : false ,   
                        width : '3%'
                    },
                    {
                        label: 'Sócio',
                        field: 'nome',
                    },
                    {   
                        label : 'Contacto',
                        field : 'contacto',
                        sortable : false
                        
                    },
                    {   
                        label : '',
                        field : 'moreinfo',
                        sortable : false,
                        width : '2%'
                    },

                ]                 
                , rows : []
                , spinnerLoadingSociosTable  : true



                // MODAL
                    // -- new, update, cota
                , socioModal_action : 'new'


                , modalSocioID : 'modal-Socio'
                , socioKey_edit : ''
                , socioModal : {
                    aniversario : ''
                    , contacto : ''
                    , criadoa : ''
                    , email : ''
                    , morada : ''
                    , nif : ''
                    , nome  : ''
                    , pack : null
                    , socioN : '' 

                }

                , formIsValid : {
                    vsocion : false
                    , vname : false
                    , vmorada : false
                    , vcontacto : false
                    , vemail : true
                    , vnif : true
                    , vpack : false
                }
                
                
                , packList_Socio : []
                , loadingSpinnerSocioNumber : true

                , listOfSocioN : []
                , originalSocioN : ''
                , statusInsertNextSocio : false

                , bAlertVariantSocioList_modal : ''
                , dismissAlertCountDownSuccessSocioList_modal : 0
                , bAlertMessageShowSocioList_modal : ''
                , dismissAlertSocioSecs_modal : 3
                
                // ---/modal

                
                // ---modal cotas
                , socioByID : []              

                , cotasAbertas : []
                , cotasAbertasObjecto : []
                , tagsCotasAbertas : []
                
                , cotasJaPagas : []
                , tagsCotasJaPagas : []

                , value : []  //alterar o nome para valueCotasOagas
                , valueVarient : '' //COLOR of Labels
                , search : '' //input to search for cotas


                , options: []
                // ---/modal cotas

            }
        }//DATA
        
        , computed : {
            
            bModalTitle_Socio(){
                return this.socioKey_edit.length!=0?'Editar Socio':'Novo Socio';
            }

            , bModalButtonVariant_Socio() {
                return this.socioModal_action==='new'?'success':'primary'
            }

            , socioNValidationModal(){
                return this.checkSocioNSocioModalValidation();
            }

            , nameValidatioSocioModal(){
                return this.checkNameSocioModalValidation();
            }

            , moradaValidationSocioModal(){
                return this.checkMoradaSocioModalValidation();
            }

            , contactoValidationSocioModal(){
                return this.checkContactoSocioModalValidation();
            }

            , nifValidationSocioModal() {
                return this.checkNIFSocioModalValidation();
            }

            , packValidationSocioModal(){
                return this.checkPackSocioModalValidation();
            }

            
            // :: COTAS MODAL
            
            , criteria(){
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

            , checkLableCotasJaPagas(){
                return this.cotasJaPagas.length == 0 &&  this.value.length == 0?'Nenhuma cota paga ate o momento!' : 'Cotas pagas'
            }
            
            , checkTagsJaPagasMasRemovidas(){
                let checkMissing = (a1, a2) => a2.filter( d => !a1.includes(d))
                let missing = checkMissing( this.value, this.cotasJaPagas)
                return missing;
            }

            // :: END COTAS MODAL


            , ModalCotas_title() {
                return this.socioModal_action=='cotas'?this.socioByID.nome:''
            }

            , valoraPagar(){
                let lenghtCotasJaPagas = this.cotasJaPagas.length;
                let lenghtNewCotas = this.value.length ;
                let totalPrice = (lenghtNewCotas - lenghtCotasJaPagas) * this.socioByID.packPreco;
                return totalPrice.toFixed(2);


            }
        

        }//COMPUTED


        , methods : {

            // :::: NAVIGATION
            GoToNovoSocio(){
                this.$router.push('/socio')
            }


            // :::: CREATE , UPDATES AND DELETES

            , editSocio(vKey, vSocion, vNome, vMorada, vNIF, vContacto, vEmail, vAniv, vPack, vCotas, vCriadoa){
                
                this.socioModal_action = 'update'
                this.socioKey_edit = vKey;
                this.originalSocioN = vSocion;
                this.loadingSpinnerSocioNumber = false;

                this.socioModal.socioN = vSocion
                this.socioModal.nome = vNome
                this.socioModal.morada = vMorada
                this.socioModal.nif = vNIF
                this.socioModal.contacto = vContacto
                this.socioModal.email = vEmail
                this.socioModal.aniversario = vAniv
                this.socioModal.pack = vPack
                
                // data not enable on page, but we need to save it
                this.socioModal.criadoa = vCriadoa
                this.socioModal.cotas = vCotas


                this.$bvModal.show('modal-Socio')


            }

            , deleteSocio(socioKey){          
                
                if( window.confirm("APAGAR Sócio?") ){

                    if( window.confirm("Quer prosseguir com a remoção?\n(Está operação não será possivel de reverter)") ) {

                        firebasedatabase
                            .collection('/Socio')
                            .doc(socioKey)
                            .delete()
                            .then(() => {
                                this.bAlertVariantSocioList = 'danger'
                                this.bAlertMessageShowSocioList = 'Sócio removido com sucesso!'
                                this.showBAlertSocioList();

                                // this.updateListOfNumbersAfterDelete();                              
                                
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }

                }
            }

            , firebase_insertSocio() {
                
                var d = new Date();
                var mm = d.getMonth() + 1;
                var dd = d.getDate();
                var yy = d.getFullYear()
                var mm2 = mm>9?mm:'0'+mm;
                var dateF = yy + '-' + mm2 + '-' + dd;                
                
                this.socioModal.criadoa = dateF;


                this.socioModal.cotas = []
             
                let vSname = this.socioModal.nome

                firebasedatabase
                    .collection('/Socio')
                    .add(this.socioModal)
                    .then(() =>{
                        
                        if (!this.statusInsertNextSocio){
                            
                            this.statusInsertNextSocio = false;
                            this.modalSocioClose();
                            
                            this.bAlertVariantSocioList = 'success'
                            this.bAlertMessageShowSocioList = 'Socio(' + vSname + ') adicionado com sucesso!'
                            this.showBAlertSocioList();
                            
                        }else{
                            
                            this.bAlertVariantSocioList_modal = 'success'
                            this.bAlertMessageShowSocioList_modal = 'Socio(' + vSname + ') adicionado com sucesso!'                         
                            this.showBAlertSocioList_modal();

                        }
                        
                         this.clean_SocioModal();

                    })
                    .catch((error) =>{
                        console.log(error);
                    })
            }

            , firebase_updateSocio() {
               
                if(window.confirm("Deseja mesmo atualizar os dados do Sócio?")){                 
                   
                   firebasedatabase
                        .collection('/Socio')
                        // .doc(this.$route.params.id)
                        .doc(this.socioKey_edit)
                        .update(this.socioModal)
                        .then(() => {
                                                        
                            this.modalSocioClose();
                            this.clean_SocioModal();

                            this.bAlertVariantSocioList = 'primary'
                            this.bAlertMessageShowSocioList = 'Socio ATUALIZADO com sucesso!'
                            this.showBAlertSocioList();
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
                
            }

            , onSocioModelFormSubmit(event){
                event.preventDefault();
                

                let valid_form = this.formIsValid.vsocion
                                && this.formIsValid.vname
                                && this.formIsValid.vmorada 
                                && this.formIsValid.vcontacto 
                                && this.formIsValid.vnif;

                if (valid_form){

                    if (this.socioModal_action === 'new'){
                       this.firebase_insertSocio(); 
                    }
                    
                    if (this.socioModal_action === 'update'){
                        this.firebase_updateSocio();
                    }
                }



            }            

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
                            this.modalSocioCotasClose()

                        }

                    }  else {
                     
                        this.updateSocioRecord(this.value)
                        this.modalSocioCotasClose()
                    }


                    // show alert with the cotas message
                    this.bAlertVariantSocioList = 'warning'
                    this.bAlertMessageShowSocioList = missing.length==0?"Cota(s) actualizadas no socio " + this.socioByID.nome:'Cota(s) removida no socio ' + this.socioByID.nome
                    this.showBAlertSocioList();

                }




            }

            , updateSocioRecord(socioCotas){
                 firebasedatabase
                    .collection('/Socio')
                    .doc(this.socioByID.key)
                    .update({
                        cotas : socioCotas
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
            }




            // :::: GETs and TRANSFORMATIONS
            , getListOfSocios(){
                firebasedatabase
                    .collection('/Socio')
                    .onSnapshot((snapshot) =>{
                        this.rows = [] ;
                        this.listOfSocioN = []
                        
                        snapshot.forEach((doc) =>{
                            
                            this.rows.push({
                                key : doc.id,
                                socioN : doc.data().socioN,
                                nome : doc.data().nome,
                                morada : doc.data().morada,
                                nif : doc.data().nif,
                                contacto : doc.data().contacto,
                                email : doc.data().email,
                                criadoa : doc.data().criadoa , 
                                aniversario : doc.data().aniversario , 
                                pack : doc.data().pack, 

                                cotas : doc.data().cotas
                                
                            })

                            //OBJECT ONLY FOR THE SOCIO NUMBER
                            this.listOfSocioN.push( doc.data().socioN )
                        })

                         this.spinnerLoadingSociosTable = false;
                    });  
            }   
            
            , getAllPacks(){
                 firebasedatabase
                    .collection('/packs')
                    .onSnapshot((snapshot) => {
                       this.packList_Socio = [];
                       this.packList_Socio.push({
                            value : null
                            , text : "Escolher pack"
                            , disabled: true 
                        })
                       snapshot.forEach((doc) => {
                           this.packList_Socio.push({
                                value   : doc.id,
                                text    : doc.data().nome + ' (' + doc.data().preco + ' €)',    
                                preco   : doc.data().preco                            
                           })
                       })            

                    })
            }

            , getAllCotas(){
                firebasedatabase
                    .collection('/cotas')
                    .onSnapshot((snapShot) => {
                        this.cotasAbertasObjecto = [];
                        snapShot.forEach((doc) => { 
                            
                            this.cotasAbertasObjecto = doc.data();    
                            
                        })
                    })
            }



            // :::: MODAL'S
            , modalSocioOpen_cickVueTable(){
                 this.cleanFull_SocioModal();
                 
                this.show_Modal('modal-Socio');
                // this.$bvModal.show('modal-Socio');
            }

            , modalSocioClose() {
                window.scrollTo(0, 0);
                // this.$bvModal.hide('modal-Socio');
                this.close_Modal('modal-Socio')
                this.clean_SocioModal();
            }

            , show_Modal(modalID){
                this.$bvModal.show(modalID);
            }

            , close_Modal(modalID){
                this.$bvModal.hide(modalID);
            }

            // :::: ALERT's
            , showBAlertSocioList_modal(){
                this.dismissAlertCountDownSuccessSocioList_modal = this.dismissAlertSocioSecs
            }
            
            , countDownChangedAlertSocioList(dismissCountDownSuccess){
                this.dismissAlertCountDownSuccessSocioList = dismissCountDownSuccess
            }

            , countDownChangedAlertSocioList_modal(dismissCountDownSuccess){
                this.dismissAlertCountDownSuccessSocioList_modal = dismissCountDownSuccess
            }

            , showBAlertSocioList(){
                this.dismissAlertCountDownSuccessSocioList = this.dismissAlertSocioSecs
            }



            // :::: CLEAN
            , clean_SocioModal(){
                this.socioModal_action = 'new'
                this.dismissAlertSocioSecs = 3
                this.socioKey_edit = ''
                this.loadingSpinnerSocioNumber = true
                        
                this.socioModal.aniversario = ''
                this.socioModal.contacto = ''
                this.socioModal.criadoa = ''
                this.socioModal.email = ''
                this.socioModal.morada =''
                this.socioModal.nif = ''
                this.socioModal.nome  = ''
                this.socioModal.pack = null
                this.socioModal.socioN = ''
                // this.statusInsertNextSocio = false;


                this.automaticallySocioNumberModal();
            }

            , cleanFull_SocioModal(){
                this.socioModal_action = 'new'
                this.dismissAlertSocioSecs = 3
                this.socioKey_edit = ''
                this.loadingSpinnerSocioNumber = true
                        
                this.socioModal.aniversario = ''
                this.socioModal.contacto = ''
                this.socioModal.criadoa = ''
                this.socioModal.email = ''
                this.socioModal.morada =''
                this.socioModal.nif = ''
                this.socioModal.nome  = ''
                this.socioModal.pack = null
                this.socioModal.socioN = ''
                this.statusInsertNextSocio = false;


                this.automaticallySocioNumberModal();
            }

            // :::: VALIDATION's
            ,  validateNIF(value) {
                const nif = typeof value === 'string' ? value : value.toString();
                const validationSets = {
                    one: ['1', '2', '3', '5', '6', '8'],
                    two: ['45', '70', '71', '72', '74', '75', '77', '79', '90', '91', '98', '99']
                    };
                if (nif.length !== 9) return false;
                if (!validationSets.one.includes(nif.substr(0, 1)) && !validationSets.two.includes(nif.substr(0, 2))) return false;
                const total = nif[0] * 9 + nif[1] * 8 + nif[2] * 7 + nif[3] * 6 + nif[4] * 5 + nif[5] * 4 + nif[6] * 3 + nif[7] * 2;
                const modulo11 = (Number(total) % 11);
                const checkDigit = modulo11 < 2 ? 0 : 11 - modulo11;
                return checkDigit === Number(nif[8]);
            }

            , checkSocioNSocioModalValidation(){
                let socioNConvert = this.listOfSocioN.join();
                let checkSocioN ;

                if( this.originalSocioN != this.socioModal.socioN ){
                   checkSocioN = !socioNConvert.includes(this.socioModal.socioN);
                }else{
                    checkSocioN = true
                }

                this.formIsValid.vsocion = checkSocioN;
                return checkSocioN;

            }

            , checkNameSocioModalValidation(){
                var vName = null;
                if (undefined !== this.socioModal.nome) {
                    vName =  this.socioModal.nome.length==0?null:this.socioModal.nome.length > 3 ;
                    if(vName!=null) this.formIsValid.vname = vName;
                }
                return vName;
            }            

            , checkMoradaSocioModalValidation(){
                let vMorada = null;
                if(undefined !== this.socioModal.morada && this.socioModal.morada !== ""){
                    vMorada = this.socioModal.length==0?null:this.socioModal.morada.length > 4    
                    if(vMorada!=null) this.formIsValid.vmorada = vMorada;
                }
                return vMorada;

            }

            , checkContactoSocioModalValidation() {
                let vContact  = null;
                if (undefined !== this.socioModal.contacto){
                    vContact = this.socioModal.contacto.toString().length==0?null:this.socioModal.contacto.toString().length === 9     
                    if(vContact!=null) this.formIsValid.vcontacto = vContact;
                }
                return vContact;
            }

            , checkNIFSocioModalValidation(){
                let vNIF = null;
                if(undefined !== this.socioModal.nif){
                    vNIF = this.socioModal.nif.length==0?null:this.socioModal.nif.length==9&&this.validateNIF(this.socioModal.nif)
                    if(vNIF!=null) {this.formIsValid.vnif = vNIF} else {this.formIsValid.vnif = true}
                }
                return vNIF;
            }

            , checkPackSocioModalValidation(){
                let vPack = null;
                 if(undefined === this.socioModal.pack || null === this.socioModal.pack){
                     vPack =  false
                     this.formIsValid.vpack = false;
                 }else {
                     vPack =  true
                     this.formIsValid.vpack = true
                 }
                 return vPack
            }
            
            , automaticallySocioNumberModal(){
                this.loadingSpinnerSocioNumber = true
                setTimeout(() => { 
                    
                    // ON THE UPDATE WE DONT NEED TO CALCULATE THE NEXT NUMBER
                    if(this.socioModal_action === 'new'){
                        let maxNumberOnList = Math.max.apply(Math, this.listOfSocioN);                                                
                        this.socioModal.socioN =  maxNumberOnList+1;
                    }
                    
                    this.loadingSpinnerSocioNumber = false

                }, 1500)
            }   

            , updateListOfNumbersAfterDelete(){
                //
                firebasedatabase
                        .collection('/Socio')
                        .onSnapshot((snapshot) =>{
                            this.listOfSocioN = []
                            
                            snapshot.forEach((doc) =>{                      
                                
                                //OBJECT ONLY FOR THE SOCIO NUMBER
                                this.listOfSocioN.push( doc.data().socioN )
                            })

                        }); 

                this.automaticallySocioNumberModal();


            }

            , modalSocioCotasClose(){
                this.close_Modal('modal-Cotas')
            }

            , GoToCotas(sKey, sN, sNome, sPack, sCotas, sCriadoa){
                

                this.socioModal_action = 'cotas';
                
                let socioCriadoA_year = (new Date(sCriadoa).getFullYear());
                this.socioByID.criadoaYear = socioCriadoA_year;


                this.socioByID.key = sKey;
                this.socioByID.socioN = sN;
                this.socioByID.nome = sNome;
                this.socioByID.packKey = sPack;
                this.socioByID.cotas = sCotas;


                //set default values
                this.value = sCotas;
                this.valueVarient = 'success';

                
                
                // verify if package exist ( this is  a mandatory field, because without package we are not able to add cotas)                
                let packByKey = this.packList_Socio.filter(item => `${item.value}`.includes(sPack.toString()))
                
                if (packByKey.length != 0 && sCriadoa.length != 0){
                    //Correct years
                    this.cotasAbertas = [];
                    this.options = [];

                    this.cotasAbertasObjecto.forEach((doc) =>{

                        if(doc.data().ano >= socioCriadoA_year){
                            this.options.push(
                                doc.data().ano
                            )
                        }
                    }) ;
                    
                    this.options.sort();

                    this.cotasJaPagas = sCotas;
                    this.tagsCotasAbertas = this.cotasAbertas.filter(yea => !this.cotasJaPagas.includes(yea))
                    
                    
                    // console.log(JSON.stringify(this.options))


                    



                    this.socioByID.packNomePreco = packByKey[0].text
                    this.socioByID.packPreco = packByKey[0].preco
    
    
    
                    // console.log(JSON.stringify(sCotas))
    
                    // this.$bvModal.show('modal-XXX');
                    this.show_Modal('modal-Cotas');
                
                
                }else{
                    
                    this.dismissAlertSocioSecs = 5
                    this.bAlertVariantSocioList = 'danger'

                    if (packByKey.length == 0){
                        this.bAlertMessageShowSocioList = 'Sócio não tem nenhum pacote associado. Verifique os campos do mesmo.'
                    }else{
                        this.bAlertMessageShowSocioList = 'Consulte o administrador do site. Anote o numero de sócio ou nome do sócio.'
                        console.log('VALIDATION:: Problem with \'criadoa\' field. Maybe the field is empty (sN : ' + this.socioByID.socioN +').')
                    }

                    this.showBAlertSocioList();
                    
                }
                
            }


            , getCotas(){
                firebasedatabase
                    .collection('/cotas')
                    .onSnapshot((snapShot) => {
                        this.cotasAbertasObjecto = [];                        
                        this.cotasAbertasObjecto = snapShot;

                    })
            }


            , onOptionClick({ option, addTag }) {
                addTag(option)
                this.search = ''
            }
           

            
        }//METHODS

        
        
        , components : {
            VueGoodTable
            
        }//COMPONENTS
        


        , created() {
                
                // get all os partenrs
                this.getListOfSocios();

                // GET ALL PACKS
                this.getAllPacks();
                
                // Get ALL YEARS
                this.getCotas();
               
               
           
        }//CREATED





    }
</script>

<style lang="scss" scoped>

</style>