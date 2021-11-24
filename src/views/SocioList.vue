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

                        <router-link :to="{name : 'SocioEdit' , params : { id : props.row.key}}" class="btn btn-primary">
                            <b-icon icon="pencil"></b-icon>
                        </router-link>

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
                // socios : []

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



        }//METHODS
        
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