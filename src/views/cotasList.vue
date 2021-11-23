<template>
    
    <div>

        <b-spinner 
                style="width: 3rem; height: 3rem;" 
                type="grow"
                variant="success"
                v-if="spinnerLoadingCotasTable"
        ></b-spinner>


        <div v-if="!spinnerLoadingCotasTable">
           <div>
                <b-modal 
                    id="modalNovaCota"
                    v-model="modalShow"
                    title="Abrir nova Cota"
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleOk"
                >
                    <form ref="form" @submit.stop.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="novaCota">Cota</label>
                            <b-form-input 
                                id="novaCota"
                                v-model="novaCota.ano" 
                                placeholder="Ano" 
                                type="number"
                                required
                                :min="minCotaAberta"
                                :max="maxCotaAberta"
                                :state="anoValidation"
                                
                            ></b-form-input>

                            <!-- <span v-if="checkInputAnoMessage == false">Ano já se encontra aberto </span> -->

                        </div>
                    </form>
                
                
                </b-modal>            
            </div>



            
            <div class="col-sm-5 offset-sm-3">               

                    <b-alert
                        id="b-alert-Cotas"
                        :show="dismissCountDown_cotas"
                        dismissible
                        :variant="bAlertVariant"
                        @dismissed="dismissCountDown_cotas=0"
                        @dismiss-count-down="countDownChanged_cotas"
                    >
                        <p>{{bAlertMessageCotas}}</p>

                    </b-alert>


          
                <vue-good-table
                    :columns="columns"
                    :rows="cotas"
                    :search-options="{
                        enabled: true,
                        placeholder : 'Pesquisar na lista'
                    }"
                    :sort-options="{
                        enable : true, 
                        initialSortBy : {field : 'ano', type : 'desc'}
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
                    <b-button pill variant="success" @click="modalShow = !modalShow" >
                            <b-icon icon="plus-circle-fill" ></b-icon> 
                        </b-button> 

                </div>


                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'after'">
                        <b-button  @click.prevent="deleteCota(props.row.key)" class="btn btn-danger">
                            <b-icon icon="trash" aria-hidden="true"></b-icon>     
                        </b-button> 
                    </span>

                </template>

                </vue-good-table>
            </div>

        </div>


        <!-- </div> -->
    </div>


</template>

<script>

    import {firebasedatabase } from '../firebaseDb'
    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table'; 

    export default {

        data() {
            return {
                
                spinnerLoadingCotasTable : true

                , cotas : []
                
                , novaCota : {
                    ano : ''
                }
                , modalShow: false

                , columns : [
                    {
                        label : 'Cota Aberta',
                        field : 'ano'
                    },
                    {
                        label : '',
                        field : 'after',
                        sortable : false
                    }
                ]

                , minCotaAberta : 2018
                , maxCotaAberta : 2200

                , dismissSecs : 2
                , dismissCountDown_cotas : 0
                , bAlertVariant : ''
                , bAlertMessageCotas : ''

            
            }

        }        
        
        
        , components : {
            VueGoodTable
        }
        
                
        , created() {
            
            firebasedatabase
                .collection('/cotas')
                .onSnapshot((snapshot) =>{
                    this.cotas = [];
                    snapshot.forEach((doc) => {
                        this.cotas.push({
                            key : doc.id,
                            ano : doc.data().ano
                        })
                    });
                    this.spinnerLoadingCotasTable = false
                })
        },
        
        
        methods : {
            
            onCotasFormSubmit () {
               
                if(!this.cotas.some(i => i.ano.includes(this.novaCota.ano))){
                   
                    firebasedatabase
                    .collection('/cotas')
                    .add( this.novaCota, 4 )
                    .then(() => {

                        this.bAlertVariant = 'success'
                        this.bAlertMessageCotas = 'Ano de Cota Adiciona com Sucesso!'

                        this.showAlertSuccess();

                        this.$nextTick(() => {
                            this.$bvModal.hide('modalNovaCota')
                        })

                    })
                    .catch((error) => {
                        console.log(error)
                    })
                   
                 }
                else{
                    console.log("Cota " + this.novaCota.ano + " já se encontra registada!")
                }
                
               
            }        
            
            
            , deleteCota(id) {
                if( window.confirm("Quer mesmo apagar o ano?")){
                    firebasedatabase
                        .collection('/cotas')
                        .doc(id)
                        .delete()
                        .then(()  => {
                            // console.log("Cota apagada com Sucesso !");
                            this.bAlertVariant = 'danger'
                            this.bAlertMessageCotas = 'Cota Removida com Sucesso!'
                            this.showAlertRemove();
                        })
                        .catch((error) => {
                            console.log(error);
                        })

                }


            }


            , checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            }

            , handleSubmit(bvModalEvt) {
                this.handleOk(bvModalEvt);

            }

            , handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.onCotasFormSubmit()
            }

            , resetModal() {
                this.novaCota.ano = ''
                
            }


            , countDownChanged_cotas(dismissCountDownRemovePack){
                this.dismissCountDown_cotas = dismissCountDownRemovePack
            }

            , showAlertSuccess(){
                this.dismissCountDown_cotas = this.dismissSecs
            }

            , showAlertRemove(){
                this.dismissCountDown_cotas = this.dismissSecs
            }

            


        }


        , computed : {
            
            anoValidation(){
                return this.novaCota.ano.length==0?null:this.novaCota.ano.length == 4 &&  !this.cotas.some(i => i.ano.includes(this.novaCota.ano)) && this.novaCota.ano >= this.minCotaAberta && this.novaCota.ano <= this.maxCotaAberta
            }


            , checkInputAnoMessage(){
                return this.novaCota.ano.length==0?null:this.novaCota.ano.length == 4 &&  !this.cotas.some(i => i.ano.includes(this.novaCota.ano)) && this.novaCota.ano >= this.minCotaAberta && this.novaCota.ano <= this.maxCotaAberta
            }

 

        }

    }
</script>

<style lang="scss" scoped>

</style>