<template>
    
    <div>
        <b-spinner 
            style="width: 3rem; height: 3rem;" 
            type="grow"
            variant="success"
            v-if="spinnerLoadingPackageTable"
        ></b-spinner>        

        <div v-if="!spinnerLoadingPackageTable"> 
            
            <b-alert
                :show="dismissCountDownRemovePack"
                dismissible
                :variant="bAlertPack_variant"
                @dismissed="dismissCountDownRemovePack=0"
                @dismiss-count-down="countDownChangedRemovePack"
            >
                <p> {{ bAlertPack_Message }} </p> 

            </b-alert>


            <vue-good-table
                :columns="columns"
                :rows="packs"
                :search-options="{
                    enabled: true,
                    placeholder : 'Pesquisar na lista'
                    }" 

                :pagination-options="{
                        enabled: true
                        , perPage: 5
                        , perPageDropdown: [5, 10, 15]
                        , nextLabel: 'prox'
                        , prevLabel: 'ant'
                        , rowsPerPageLabel: 'Por pag'
                        , ofLabel: 'de'
                        , allLabel: 'Todos'
                        }"   


            >
                  <div slot="table-actions">
                        <b-button pill variant="success" @click.prevent="modalPackOpen_cickVueTable()" >
                            <b-icon icon="plus-circle-fill" ></b-icon> 
                        </b-button> 
                </div>

                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'after'">

                        <b-button  @click.prevent="editPack(props.row.key, props.row.nome, props.row.descricao, props.row.preco)" variant="primary" class="btn">
                            <b-icon icon="pencil"></b-icon>  
                        </b-button> 
                        
                        <b-button  @click.prevent="deletePack(props.row.key)" class="btn btn-danger">
                            <b-icon icon="trash" aria-hidden="true"></b-icon>     
                        </b-button> 

                    </span>

                </template>

            </vue-good-table>



            <!-- MODAL CREATE / UPDATE SOCIO -->
            <b-modal 
                id="modal-packs" 
                :title="bModalTitle_PackSocio" 
                button-size="sm"
                hide-footer
                hide-header-close
            >
                
                <form @submit.prevent="onPacotesFormSubmit" >
                                                                
                        <div class="form-group">
                            <label for="packModalName"></label>
                                <b-form-input 
                                type="text"
                                id="packModalName"
                                name="packModalName"
                                placeholder="Pack"
                                v-model="packModal.nome"                                      
                                required
                                :state="packModalNameValidation"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="packModalNameValidation" v-if="packModal.nome.length<4"> Tamanho minino de 4 </b-form-invalid-feedback>
                            <b-form-invalid-feedback :state="packModalNameValidation"> </b-form-invalid-feedback>
                            
                            <b-form-valid-feedback></b-form-valid-feedback> 

                        </div>

                        <div class="form-group">
                            <label for="packModalDescription"></label>
                            <b-form-textarea
                                id="packModalDescription"
                                size="sm"
                                placeholder="Descrição"
                                v-model="packModal.descricao"
                            ></b-form-textarea>
                            
                            
                        </div>

                        <div class="form-group">
                            <label for="packModalPrice"></label>
                            <b-input-group prepend="€" class="mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input 
                                    type="number"
                                    id="packModalPrice"
                                    name="packModalPrice"
                                    placeholder="Preço"
                                    v-model.number="packModal.preco"
                                    step="0.01"
                                    min="1.00"                                    
                                    required
                                    :state="packModalPriceValidation"
                                ></b-form-input>
                            </b-input-group>
                            
                            <b-form-invalid-feedback :state="packModalPriceValidation" >
                            </b-form-invalid-feedback>
                            
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>

                        </div>

                        <b-button 
                            :variant="bModalButtonVariant_PackSocio" 
                            class="mt-1" 
                            block 
                            type="submit"
                        >    
                            <span v-if="packModal_action=='update'">Atualizar</span>
                            <span v-else>Novo</span>
                        </b-button>
                        
                        
                        <b-button class="mt-1" block @click="modalPackClose">Fechar</b-button>
                       
                </form>
            </b-modal>
        
        </div> 
    
    </div>

</template>

<script>
    import {firebasedatabase} from '../firebaseDb'
    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table'; 

    export default {
        
        data() {
            return {
                spinnerLoadingPackageTable : true
                , packs : []
                , isUpdate : false

                , bAlertPack_variant : ''
                , bAlertPack_Message : ''

                , columns : [
                    {
                        label : 'Pack' ,
                        field : 'nome'
                    },
                    {
                        label : 'Descrição',
                        field : 'descricao',
                        sortable : false
                    },
                    {
                        label : '(€)',
                        field : 'preco',
                        sortable : false
                    }
                    ,{
                        label : '',
                        field : 'after',
                        sortable : false, 
                        width : '8%'
                    }
                ]

                // VARIABLES FOR THE WARNING MESSAGE
                , dismissSecs : 3
                , dismissCountDownRemovePack : 0
            

                // VARIABLES TO EDIT SOCIO
                , packModal_action : 'new'
                , packKey_edit : ''
                , packModal : {
                    nome : ''
                    , descricao : ''
                    , preco : ''
                }
               

            }
        }//DATA


        , components : {
            VueGoodTable
        }//COMPONENTS

        , created() {
               
               firebasedatabase
                .collection('/packs')
                .onSnapshot( (snapshot) => {
                    this.packs = [];
                    snapshot.forEach( (doc) => {
                        this.packs.push({
                            key : doc.id,
                            nome : doc.data().nome,
                            descricao : doc.data().descricao,
                            preco : doc.data().preco                            
                        })
                    });

                    this.spinnerLoadingPackageTable = false
                })
        }// CREATED
        
        
        , methods : {


            onPacotesFormSubmit(event){
                event.preventDefault();

                let packNameValid = this.packModal.nome.length>3?true:false;
                let packPrecoValid = !!this.packModal.preco>0.00;

                let formIsValid = packNameValid && packPrecoValid;

                
                
                if (formIsValid){
                    // VERIFY IF IS A CREATE OR CREATE ( THIS CAN BE IMPROVE)
                    if(this.packModal_action  === 'new') { 
                        this.firebase_InserPack();
                    }
    
                    if (this.packModal_action === 'update'){ 
                        this.firebase_UpdatePack();
                    }

                }
            }


            , firebase_InserPack(){
                firebasedatabase
                    .collection('/packs')
                    .add(this.packModal)
                    .then( () => {
                        
                        this.bAlertPack_variant = 'success';
                        this.bAlertPack_Message = 'Pack adiciona com sucesso!'
                        this.modalPackClose();
                        this.showAlertOnPack();
                        this.scrollToTop();
                    
                    })
                    .catch((error) => {
                        console.log(error);

                    })
            }


            , firebase_UpdatePack(){
                
                if(window.confirm('Deseja mesmo atualizar o Pack?')){
                    firebasedatabase
                        .collection('/packs')
                        // .doc(this.$route.params.id)
                        .doc(this.packKey_edit)
                        .update(this.packModal)
                        .then(() => {
                            
                            this.bAlertPack_variant = 'primary';
                            this.bAlertPack_Message = 'Pack atualizado com sucesso!'
                            this.showAlertOnPack();
                            this.modalPackClose();
                            this.scrollToTop();

                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }
                
            }


            , deletePack(packId) {

                if( window.confirm("Quer mesmo apagar o Pack?")){
                    firebasedatabase
                        .collection('/packs')
                        .doc(packId)
                        .delete()
                        .then(() => {

                            this.bAlertPack_variant = 'danger'
                            this.bAlertPack_Message = 'Pack removido com sucesso! '
                            this.showAlertOnPack();
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }

            }

            
            , editPack(packKey, packName, packDescricao, packPreco){
                this.packModal_action = 'update'
                this.packKey_edit = packKey;
                this.packModal.nome = packName
                this.packModal.descricao = packDescricao
                this.packModal.preco = packPreco
                this.$bvModal.show('modal-packs');

            }

            
            , countDownChangedRemovePack(dismissCountDownRemovePack){
                this.dismissCountDownRemovePack = dismissCountDownRemovePack
            }

            , showAlertOnPack(){
                this.dismissCountDownRemovePack = this.dismissSecs
            }
            
            , modalPackOpen_cickVueTable(){
                this.clean_PackModal();
                this.$bvModal.show('modal-packs');
            }

            , modalPackClose(){
                window.scrollTo(0, 0);
                this.$bvModal.hide('modal-packs');
                this.clean_PackModal();

            }

            , clean_PackModal(){
                this.packModal_action = 'new'
                this.packKey_edit = ''
                this.packModal.nome = ''
                this.packModal.descricao = ''
                this.packModal.preco = ''
            }

            , scrollToTop() {
                window.scrollTo(0,0);
           }

  

        }//METHODS

        , computed : {

            bModalTitle_PackSocio(){
                return this.packKey_edit.length!=0?'Editar Sócio':'Novo Sócio'
            }

            , bModalButtonVariant_PackSocio(){
                return this.packModal_action==='new'?'success':'primary'
            }

            , packModalNameValidation() {
                return this.packModal.nome.length==0?null:this.packModal.nome.length > 3;
            }
            
            , packModalPriceValidation() {
                return this.packModal.preco.length==0?null:this.packModal.preco >= 1.00;
            } 

        }//COMPUTED

    }
</script>

<style lang="scss" scoped>

</style>