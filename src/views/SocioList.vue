<template>
    
     <div>

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
                >


                <div slot="table-actions">
                    <b-button pill variant="success" @click.prevent="GoToNovoSocio()">
                            <b-icon icon="plus-circle-fill" ></b-icon> 
                    </b-button> 


                     <b-button pill variant="success" @click.prevent="modalSocioOpen_cickVueTable()">
                            <b-icon icon="plus-circle" ></b-icon> 
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

                        <!-- <router-link :to="{name : 'SocioEdit' , params : { id : props.row.key}}" class="btn btn-primary">
                            <b-icon icon="pencil"></b-icon>
                        </router-link> -->
                        
                        <b-button @click.prevent="editSocio()" variant="primary" class="btn">
                            <b-icon icon="pencil"></b-icon>  
                        </b-button>


                        <router-link :to="{name : 'saveSocioCota' , params : { id : props.row.key}}" class="btn btn-warning">
                            <b-icon icon="cash"></b-icon>                            
                        </router-link> 

                    </span>

                    <span v-if="props.column.field == 'contacto'">
                        <a :href="`tel:${props.row.contacto}`">{{props.row.contacto}}</a>
                    </span>
                    <span v-else>
                        {{props.formattedRow[props.column.field]}}
                    </span>


                    <span v-if="props.column.field == 'moreinfo'">
                        <div class="p-2">
                            <b-button :id="`socioMoreInfo-${props.row.key}`" variant="primary" ref="button">
                                <b-icon icon="three-dots-vertical"></b-icon>
                                
                            </b-button>
                            <b-popover 
                                ref="popover" 
                                :target="`socioMoreInfo-${props.row.key}`"
                                title="..."
                                triggers="hover"
                            >
                                <div>
                                    <strong>Socio N.</strong>: {{props.row.socioN}}<br>
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
            
                <form @submit.prevent="onSocioModelFormSubmit" >
                    
                    <!-- <div class="form-group">
                        <b-input-group size="sm"  prepend="Numero Sócio">
                            <b-form-input
                                type="number" 
                                v-model="socioModal.socioN" 
                                id="socioNumero" 
                                name="socioNumero" 
                                class="form-control"                                         
                                :state="socioNUpdateValidation"
                                min="1"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="socioNUpdateValidation">
                                Numero de Socio já esta em uso.
                            </b-form-invalid-feedback>
                        </b-input-group>
                    </div>       -->
                    
                    <div class="form-group">                        
                        <b-input-group size="sm"  prepend="Nome">
                            <b-form-input 
                                v-model="socioModal.nome" 
                                placeholder="Nome" 
                                type="text"
                                required
                                :state="nameValidatioModal"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="nameValidatioModal">
                                Nome Obrigatorio
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div> 

                </form>
            
            </b-modal>


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
                , socioModal_action : 'new'
                , socioKey_edit : ''
                , socioModal : {
                    aniversario : ''
                    , contacto : ''
                    , cotas : ''
                    , criadoa : ''
                    , email : ''
                    , morada : ''
                    , nif : ''
                    , nome  : ''
                    , pack : ''
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
                },

            }
        }//DATA
        
        
        , methods : {

            GoToNovoSocio(){
                this.$router.push('/socio')
            }

            , deleteSocio(socioKey){          

                if( window.confirm("APAGAR Sócio?") ){

                    if( window.confirm("Quer prosseguir com a remoção?\n(Está operação não será possivel de reverter)") ) {

                        firebasedatabase
                            .collection('/Socio')
                            .doc(socioKey)
                            .delete()
                            .then(() => {
                                this.bAlertVariantSocioList = 'success'
                                this.bAlertMessageShowSocioList = 'Sócio removido com sucesso!'
                                this.showBAlertSocioList();
                                
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }

                }
            }

            , countDownChangedAlertSocioList(dismissCountDownSuccess){
                this.dismissAlertCountDownSuccessSocioList = dismissCountDownSuccess
            }

            , showBAlertSocioList(){
                this.dismissAlertCountDownSuccessSocioList = this.dismissAlertSocioSecs
            }

            

            , modalSocioOpen_cickVueTable(){
                 this.clean_SocioModal();
                this.$bvModal.show('modal-Socio');
            }


            , clean_SocioModal(){
                this.socioModal_action = 'new'
                this.socioKey_edit = ''
                               
                this.socioModal.aniversario = ''
                this.socioModal.contacto = ''
                this.socioModal.cotas = ''
                this.socioModal.criadoa = ''
                this.socioModal.email = ''
                this.socioModal.morada =''
                this.socioModal.nif = ''
                this.socioModal.nome  = ''
                this.socioModal.pack = ''
                this.socioModal.socioN = ''
            }


            , checkNameModalValidation(){
                if (undefined !== this.socioModal.nome) {

                    var vName ;
                    if(this.socioModal.nome.length>=4) {
                        vName = true;
                        this.formIsValid.vname = true;
                    }else{
                        vName = false;
                        this.formIsValid.vname = false;
                    }
                    return vName;
                }
            }



        }//METHODS

        , computed : {
            
            bModalTitle_Socio(){
                return this.socioKey_edit.length!=0?'Editar Socio':'Novo Socio';
            }


            , nameValidatioModal(){
                return this.checkNameModalValidation();
            }


        }
        
        , components : {
            VueGoodTable
        }//COMPONENTS
        
        , created() {
                          
            firebasedatabase
                .collection('/Socio')
                .onSnapshot((snapshot) =>{
                    this.rows = [] ;
                    snapshot.forEach((doc) =>{
                        
                        this.rows.push({
                            key : doc.id,
                            socioN : doc.data().socioN,
                            nome : doc.data().nome,
                            morada : doc.data().morada,
                            nif : doc.data().nif,
                            contacto : doc.data().contacto,
                            email : doc.data().email,
                            criadoa : doc.data().criadoa
                            
                            
                        })
                    })

                    this.spinnerLoadingSociosTable = false;

                });           
           
        }//CREATED





    }
</script>

<style lang="scss" scoped>

</style>