<template>
    
        <b-container>
            
            <b-row>
                <!-- <div class="col-sm-10 offset-sm-2"> -->
                    

                    <b-alert
                        id="b-alert-novoSocioSucesso"
                        :show="dismissAlertCountDownSuccessSocio"
                        dismissible
                        variant="success"
                        @dismissed="dismissAlertCountDownSuccessSocio=0"
                        @dismiss-count-down="countDownChangedAlert"
                    >
                        <p>{{ bAlertMessageShow }}</p>

                    </b-alert>

                    <b-card title="Novo Sócio" >
                        
                        <!-- <b-button pill variant="outline-primary" @click="importJSONDirectlyOnFirebase()" >
                             <b-icon icon="emoji-expressionless-fill" aria-hidden="true"></b-icon>     
                         </b-button> 
                         -->

                        <b-alert show dismissible variant="warning">
                            O numero de sócio será calculado automaticamente tendo em atenção o ultimo numero existente(de forma crescente). <br/>O mesmo pode ser alterado manualamente.
                        </b-alert>

                        <form @submit.prevent="submitNewSocio"> 
                                
                          <div class="form-group">

                                <b-input-group prepend="Numero Sócio (possivel) ">
                                    <b-spinner v-if="loadingSpinnerSocioNumber" ></b-spinner>
                                    <b-form-input
                                        type="number" 
                                        v-model="socio.socioN" 
                                        id="socioNumero" 
                                        name="socioNumero" 
                                        class="form-control" 
                                        v-if="!loadingSpinnerSocioNumber"
                                        :state="socioNValidation"
                                        min="1"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="socioNValidation">
                                       <span v-if="!loadingSpinnerSocioNumber">Numero de Socio já esta em uso.</span> 
                                    </b-form-invalid-feedback>


                                </b-input-group>

                            </div>

                            <div class="form-group">
                                <b-form-input 
                                    v-model="socio.nome" 
                                    placeholder="Nome" 
                                    type="text"
                                    required
                                    :state="nameValidation"
                                ></b-form-input>
                                <b-form-invalid-feedback :state="nameValidation">
                                    Nome Obrigatorio
                                </b-form-invalid-feedback>
                                <b-form-valid-feedback>
                                </b-form-valid-feedback>                               
                                
                            </div>

                            <div class="form-group">
                                    <b-form-input 
                                        v-model="socio.morada" 
                                        type="text"
                                        placeholder="Morada" 
                                        required
                                        :state="validateMorada"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validateMorada">
                                        Morada Obrigatorio
                                    </b-form-invalid-feedback>
                                    <b-form-valid-feedback>
                                    </b-form-valid-feedback>
                            </div>

                                <div class="form-group">
                                    <b-form-input 
                                        v-model="socio.contacto" 
                                        type="number"
                                        placeholder="Contacto" 
                                        required
                                        :state="contactoValidation"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="contactoValidation">
                                        <span v-if="socio.contacto.length>9">Tamanho do contacto errado</span>
                                        <span v-else>Contacto Obrigatorio</span>                                        
                                    </b-form-invalid-feedback>
                                    <b-form-valid-feedback>
                                    </b-form-valid-feedback>
                                 
                                </div>

                                <div class="form-group">
                                    <b-input-group class="mb-3">
                                        <b-form-input
                                            id="example-input"
                                            v-model="socio.aniversario"
                                            type="text"
                                            placeholder="Aniversário"
                                            autocomplete="off"
                                            title="Formato - AAAA-MM-DD"
                                        ></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker
                                            v-model="socio.aniversario"
                                            button-only
                                            right
                                            aria-controls="example-input"
                                            ></b-form-datepicker>
                                            
                                        </b-input-group-append>
                                    </b-input-group>

                                </div>


                                <div class="form-group">
                                    <b-form-input 
                                        v-model="socio.email" 
                                        type="email"
                                        placeholder="email" 
                                    ></b-form-input>
                                </div>

                                        <!-- :state="nifValidation" -->
                                <div class="form-group">
                                    <b-form-input 
                                        v-model="socio.nif" 
                                        type="number"
                                        placeholder="NIF"                                        
                                    ></b-form-input> 
                                    <b-form-invalid-feedback :state="nifValidation">
                                        <span v-if="socio.nif.length!=9">NIF errado. </span> 
                                        <span v-else>Obrigatorio</span>
                                    </b-form-invalid-feedback>
                                    <b-form-valid-feedback>
                                    </b-form-valid-feedback>
                                </div>



                                
                                <div class="form-group">
                                    <b-form-select 
                                        v-model="socio.pack" 
                                        :options="packList"
                                        value-field="value"
                                        text-field="text"
                                        id="socioPack"  
                                        placeholder="Escolher Pack"
                                        name="socioPack" 
                                        required
                                        >
                                    </b-form-select>
                                    
                                </div>

                                <div class="form-group">    
                                    
                                    <b-form-checkbox v-model="statusInsertNextSocio" name="check-button" switch>
                                        Inserir de seguida outro Sócio.
                                    </b-form-checkbox>

                                </div>

                                <div class="form-group">                                    
                                    <b-button pill variant="success" type="submit">
                                        <!-- Atualizar Pack -->
                                        <b-icon icon="plus" ></b-icon>
                                    </b-button>

                                    <b-button pill variant="outline-primary" @click="backtoSocioList()" icon="arrow-up">
                                        <b-icon icon="arrow-left" aria-hidden="true"></b-icon>     
                                    </b-button> 


                                </div>

                            </form>

                    
                        </b-card>

                <!-- </div> -->

            </b-row>

        </b-container>
    
</template>

<script>

    import { firebasedatabase } from '../firebaseDb'
    // import { required , numeric ,minLength , helpers} from 'vuelidate/lib/validators'
    //import { required , numeric ,minLength } from 'vuelidate/lib/validators'
    // import { BFormSelect } from 'bootstrap-vue'



    export default {
                
        data(){
            return{
                
                submitted : false,

                formIsValid : {
                    vsocion : true
                    , vname : false
                    , vmorada : false
                    , vcontacto : false
                    , vemail : true
                    , vnif : true
                    , vpack : false
                },

                statusInsertNextSocio : false,

                //no Pack  ->  esta a null por causa de a opção by default do select
                socio : {
                    socioN : 0
                    , nome: ''
                    , morada : ''
                    , aniversario : ''
                    , nif : ''
                    , contacto : ''
                    , email : ''
                    , criadoa : ''
                    , cotas : []
                    , pack : null
                    
                },

                cotasList : [],
                packList : [],
                packListSelected : null,
                
                
                sociosNumber : 0
                , nextSocioN : 0

                // vartiaveis para o alert
                , bAlertMessageShow : ''
                , dismissAlertSocioSecs : 2
                , dismissAlertCountDownSuccessSocio : 0


                , loadingSpinnerSocioNumber : true

                , listSocioN : []

            }
        },
        
        computed :{

            socioNValidation(){
                // return this.listSocioN.includes(this.socio.socioN)
                return this.checkSocioNValidation();
            }

            , nameValidation(){
                // return this.socio.nome.length==0?null:this.socio.nome.length > 3 ;
                return this.checkNameValidation();
            }
            
            , validateMorada(){
                // return this.socio.morada.length==0?null:this.socio.morada.length > 4     
                return this.checkMoradaValidation();
            }
            
            , contactoValidation(){
                // return this.socio.contacto.length==0?null:this.socio.contacto.length == 9     
                return this.checkContactoValidation()
            }

            , nifValidation(){
                // return this.socio.nif.length==0?null:this.socio.nif.length==9&&this.validateNIF(this.socio.nif)
                return this.checkNifValidation();
            }

            // , packValidation(){
            //     // return this.socio.pack.length != null
            //     return this.checkPackValidation();
            // }



        },


    
        methods : {
            
            checkSocioNValidation(){
            // let checkCode =  this.listSocioN.indexOf(this.socio.socioN) 
            // let checkCode =  this.listSocioN.includes(this.socio.socioN) 

            let convertArray =  this.listSocioN.join();
            let checkCode = !convertArray.includes(this.socio.socioN)

            this.formIsValid.vsocion = checkCode;

            // console.log(this.listSocioN);
            // console.log(this.socio.socioN);
            // console.log('CHECK CODE ' + checkCode);

            return checkCode

            }

            , checkNameValidation(){
                var vName =  this.socio.nome.length==0?null:this.socio.nome.length > 3 ;
                if(vName!=null) this.formIsValid.vname = vName;
                return vName;
            }    
            
            , checkMoradaValidation(){
                let vMorada = this.socio.morada.length==0?null:this.socio.morada.length > 4    
                if(vMorada!=null) this.formIsValid.vmorada = vMorada;
                return vMorada;
            }

            , checkContactoValidation(){
                let vContact = this.socio.contacto.length==0?null:this.socio.contacto.length == 9     
                if(vContact!=null) this.formIsValid.vcontacto = vContact;
                return vContact;
            }



            , checkNifValidation(){
                let vNIF = this.socio.nif.length==0?null:this.socio.nif.length==9&&this.validateNIF(this.socio.nif)
                if(vNIF!=null) {this.formIsValid.vnif = vNIF} else {this.formIsValid.vnif = true}
                return vNIF;
            }

            // , checkPackValidation(){
            //     let vPack = this.socio.pack.length > 0?true:false; 
            //     this.formIsValid.vpack = vPack;
            //     return vPack;
            // }






            , backtoSocioList(){
                this.$router.push('/SocioList')
            }
            
            , async submitNewSocio(event){
                
                
                var d = new Date();
                var mm = d.getMonth() + 1;
                var dd = d.getDate();
                var yy = d.getFullYear()
                var mm2 = mm>9?mm:'0'+mm;
                var dateF = yy + '-' + mm2 + '-' + dd;                
                this.socio.criadoa = dateF;
              


                event.preventDefault();
                this.submitted = true;
                
                let validForm =    this.formIsValid.vsocion
                                && this.formIsValid.vname 
                                && this.formIsValid.vmorada 
                                && this.formIsValid.vcontacto 
                                && this.formIsValid.vnif;

                
                if(validForm) this.saveSocioOnFirebase();
                
            }

            , saveSocioOnFirebase(){
                              
                this.socio.socioN = this.nextSocioN;

                firebasedatabase
                    .collection('/Socio')
                    .add(this.socio)
                    .then(() =>{
                        this.socio.socioN = '';
                        this.socio.nome = '';
                        this.socio.morada = '';
                        this.socio.contacto = '';
                        this.socio.email = '';
                        this.socio.nif = '';
                        this.socio.pack = null;
                        this.socio.criadoa = '';

                        this.submitted = false ;

                        if (!this.statusInsertNextSocio){
                            alert('Socio adicionado com Sucesso!');
                            this.backtoSocioList();
                        }
                        
                        // GET NEXT SOCIO NUMBER
                        this.loadingSpinnerSocioNumber = true;
                        this.getLastSocioNumber2();
                        this.testNumberSocio();


                        // este warning/messagem so aparece quando inserimos mais do que um.
                        this.bAlertMessageShow = 'Socio adicionado com sucesso!'
                        this.showAlertOnSocios()

                    })
                    .catch((error) =>{
                        console.log(error);
                    })
            }

           
                



            , getLastSocioNumber2 () {
                // console.log('INSIDE GET NEXT SOCIO NUMBER  - NEW METHOD');
                                    
                    // try {
                        let testNext = 0;
                        firebasedatabase
                          .collection('/Socio')
                          .onSnapshot((snapshot) => {
                            snapshot.forEach((doc) => {
                                
                                this.listSocioN.push(doc.data().socioN);

                                if (doc.data().socioN > testNext){
                                        testNext = doc.data().socioN
                                }
                            })            
                            
                            this.nextSocioN =  testNext+1;
                        })               

            }    


            ,showAlertOnSocios(){
                this.dismissAlertCountDownSuccessSocio = this.dismissAlertSocioSecs
            }

            , countDownChangedAlert(dismissCountDownSuccess){
                this.dismissAlertCountDownSuccessSocio = dismissCountDownSuccess
            }


            
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

            

            
            , testNumberSocio(){
                setTimeout(() => { 
                                    this.socio.socioN =  this.nextSocioN 
                                    this.loadingSpinnerSocioNumber = false
                                    
                                    // console.log('LIST COMPLETA: ' + JSON.stringify(this.listSocioN) );

                                }, 5000)
            }   





            , importJSONDirectlyOnFirebase(){

              /*
                This Function has used to make the first IMPORT directly on Firebase.

                Basically, we can convert all the data to JSON and import directly.
                

                This is not the best way, but for my propose it was fast and functional.
              */


                // let jsonObj = [
                //           {
                //             "socioN": 1,
                //             "nome": "Name test 1",
                //             "morada": "",
                //             "aniversario": "",
                //             "contacto": "",
                //             "email": "",
                //             "pack": "8gEAqxGyA4iQlHYyUOoL",
                //             "cotas": ['2018','2019','2020'],
                //             "criadoa": "2018-12-12"
                //           },
                //           {
                //             "socioN": 2,
                //             "nome": "Name test 2",
                //             "morada": "",
                //             "aniversario": "",
                //             "contacto": "254125484",
                //             "email": "",
                //             "pack": "8gEAqxGyA4iQlHYyUOoL",
                //             "cotas": ['2018','2019','2020'],
                //             "criadoa": "2018-12-12"
                //           }
                //       ] 
                
                
                // jsonObj.forEach((doc) => {

                //     this.socio.socioN = doc.socioN;
                //     this.socio.nome = doc.nome;
                //     this.socio.morada = doc.morada;
                //     this.socio.aniversario = doc.aniversario;
                //     this.socio.contacto = doc.contacto;
                //     this.socio.email = doc.email;
                //     this.socio.pack = doc.pack;
                //     this.socio.criadoa = doc.criadoa;
                //     this.socio.cotas = doc.cotas;

                //      firebasedatabase
                //     .collection('/Socio')
                //     .add(this.socio)
                //     .then(() =>{
                        
                //         this.socio.socioN = '';
                //         this.socio.nome = '';
                //         this.socio.morada = '';
                //         this.socio.aniversario = '';
                //         this.socio.contacto = '';
                //         this.socio.email = '';                        
                //         this.socio.pack = '';
                //         this.socio.criadoa = '';
                //         this.socio.cotas = '';

                    
                //     })
                //     .catch((error) =>{
                //         console.log(error);
                //     })

                    
                // })


            }









        } //METHODS
        
        
        
        
        , created (){ 

            // console.log('CREATED : LOAD DROP')
      
            
            firebasedatabase
                .collection('/packs')
                .onSnapshot((snapshot) => {
                    this.packList = [];
                    this.packList.push({
                        value : null
                        , text : "Escolher pack"
                        , disabled: true 
                    })

                    snapshot.forEach((doc) => {
                        this.packList.push({
                            value : doc.id,
                            text : doc.data().nome + ' (' + doc.data().preco + ' €)',
                            
                        })
                    })            


                    // console.log('PACK LIST: ')
                    // console.log(this.packList)

                })



                // get ultimo numero usado num socio.
                this.getLastSocioNumber2();
                

                this.testNumberSocio();

        

        } // CREATED





    }
</script>

<style lang="scss" scoped>

</style>