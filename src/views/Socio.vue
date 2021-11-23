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
                                            @context="onContext"
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
                // formIsValid : {
                //     vsocion : true
                //     , vname : false
                //     , vmorada : false
                //     , vcontacto : false
                //     , vemail : true
                //     , vnif : true
                //     , vpack : false
                // },
                
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
                
                
                // var d = new Date();
                // var mm = d.getMonth() + 1;
                // var dd = d.getDate();
                // var yy = d.getFullYear()
                // var mm2 = mm>9?mm:'0'+mm;
                // var dateF = yy + '-' + mm2 + '-' + dd;                
                // this.socio.criadoa = dateF;
                this.socio.criadoa = '2012-12-12'


                event.preventDefault();
                this.submitted = true;
                
                // this.$v.$touch();
                // if (this.$v.$invalid) {
                //     return;
                // }

                
                // const result = await this.getNextSocioNumber();
                
                // console.log('RESULT: ' + result);
                // console.log('RESULT2: ' + this.nextSocioN);
                
                let validForm =    this.formIsValid.vsocion
                                && this.formIsValid.vname 
                                && this.formIsValid.vmorada 
                                && this.formIsValid.vcontacto 
                                && this.formIsValid.vnif;

                // console.log('PACK > ' + this.socio.pack.length + '| ' + this.socio.pack) ;
                // console.log( this.formIsValid );
                // console.log("ValidForm:" + validForm);
                if(validForm) this.saveSocioOnFirebase();
                
                // let test = this.socioNumberNextNumber();
               
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
                    // } catch (error) {
                    //     console.log(error);

                    // }
                  
                    // this.socio.socioN = this.nextSocioN;
                    // console.log('try try : ' + this.socio.socioN);
                

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

            

            , keyupTest(e) {
                console.log(e);
                alert('keyup')
            }


            , testNumberSocio(){
                setTimeout(() => { 
                                    this.socio.socioN =  this.nextSocioN 
                                    this.loadingSpinnerSocioNumber = false
                                    
                                    // console.log('LIST COMPLETA: ' + JSON.stringify(this.listSocioN) );

                                }, 5000)
            }   





            , importJSONDirectlyOnFirebase(){

                let jsonObj = [
 {
   "socioN": 1,
   "nome": "Albino Teixeira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 2,
   "nome": "António José Abrantes Catarino",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 3,
   "nome": "António Manuel Gil Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 4,
   "nome": "José Leandro Lopes dos Santos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 5,
   "nome": "Francisco Antunes Marques",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 6,
   "nome": "João Oliveira David",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 7,
   "nome": "Manuel Carlos Almeida Catorze",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 8,
   "nome": "José António Martins Jorge",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 9,
   "nome": "Mário Salvado Justiça",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 10,
   "nome": "Joaquim Carlos Almeida Santos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 11,
   "nome": "Alberto Jesus Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 12,
   "nome": "José Alberto Mateus Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 13,
   "nome": "João António Roque Batista",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 14,
   "nome": "Agostinho Martins Tavares Russo",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 15,
   "nome": "Francisco José Justiça Fernandes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 16,
   "nome": "Manuel António Magalhães Soares",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 17,
   "nome": "Luís Gabriel Reis Leandro",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 18,
   "nome": "Carlos Manuel Alves Quintas",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 19,
   "nome": "Mário António Brito Neves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 20,
   "nome": "António Manuel R. Gomes Silvestre",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 21,
   "nome": "Alberto Vaz Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 22,
   "nome": "Luís António Almeida Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 23,
   "nome": "Francisco Almeida Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 24,
   "nome": "Ana Cláudia Gil Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 25,
   "nome": "José Paulo Salvado Santos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 26,
   "nome": "José Joaquim Garcia Horta",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 27,
   "nome": "José Ramalho dos Santos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 28,
   "nome": "António Leandro Arraiano",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 29,
   "nome": "António Venceslau Lopes Almeida",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 30,
   "nome": "José Maria Ramos Almeida Freire",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 31,
   "nome": "José Alberto Vaz Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 32,
   "nome": "José Tavares Fernandes Beatas",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 33,
   "nome": "Pedro Manuel Vaz Abrantes",
   "morada": "Valverde",
   "aniversario": "1967-08-16",
   "contacto": "938703471",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 34,
   "nome": "Carlos Almeida Catorze",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 35,
   "nome": "Hugo Filipe Amoreira Gil Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 36,
   "nome": "Domingos Carlos Almeida Catorze",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "964045234",
   "email": "domingoscatorze@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 37,
   "nome": "António Manique Clemente Batista",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 38,
   "nome": "Luís António Trindade Abrantes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 39,
   "nome": "Rui São Pedro",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 40,
   "nome": "Fernando Nunes Brito",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 41,
   "nome": "António Lopes Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 42,
   "nome": "António José Vaz Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 43,
   "nome": "António José Brito Peres",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 44,
   "nome": "André Manuel Vaz Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 45,
   "nome": "Manuel Salgueiro Batista",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 46,
   "nome": "Francisco Oliveira Gonçalves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 47,
   "nome": "Luís José Rondão Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 48,
   "nome": "José Abrantes Roque Nogueira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 49,
   "nome": "António José Mateus Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 50,
   "nome": "Pedro Ferreira Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 51,
   "nome": "José João Salvado Vaz",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 52,
   "nome": "José Augusto Lourenço Nunes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 53,
   "nome": "Luís António Rodrigues Tavares",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 54,
   "nome": "Domingos José Lopes Salvado",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 55,
   "nome": "José António Reis Ponciano",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 56,
   "nome": "Carlos Alberto Bento Correia",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 57,
   "nome": "Joaquim Manuel Mendes Serra",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 58,
   "nome": "António Lourenço A. Rondão",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 59,
   "nome": "Francisco Santos Cunha",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 60,
   "nome": "Francisco Fortunato Rolo",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 61,
   "nome": "José Alberto Santos Almeida",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 62,
   "nome": "Mário Jesus Tomé Fernandes",
   "morada": "Valverde",
   "aniversario": "1973-10-16",
   "contacto": "966121663",
   "email": "filomena.brites@iol.pt",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 63,
   "nome": "José Manuel Sereno Fernandes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 64,
   "nome": "António José Reis Santos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 65,
   "nome": "Joaquim Manuel Abrantes Salvado",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 66,
   "nome": "Arménio José Lourenço Nunes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 67,
   "nome": "João Carlos Raposo Lopes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 68,
   "nome": "José Carlos Almeida Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 69,
   "nome": "Sérgio José Mateus Magalhães",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 70,
   "nome": "Virgílio Santos Jesus",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 71,
   "nome": "João Marques Abrantes Nogueira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 72,
   "nome": "José António Oliveira Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 73,
   "nome": "João António Alves Ascensão",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 74,
   "nome": "Catarina Couto Almeida",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 75,
   "nome": "Manuel Rosa Martins Afonso",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 76,
   "nome": "José Alfredo Pinto Gouveia",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 77,
   "nome": "Carlos Alberto Neves Antunes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 78,
   "nome": "Fernando Miguel Nunes Salvado",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 79,
   "nome": "José Salvado Geraldes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 80,
   "nome": "José Luís Tavares de Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 81,
   "nome": "Maria Luz Brito Vaz",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 82,
   "nome": "Albino José Gaspar",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 83,
   "nome": "Luís António Brito Batista",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 84,
   "nome": "João Filipe Brito Batista",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 85,
   "nome": "Jorge Miguel Lourenço Nunes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 86,
   "nome": "José Manuel Abrantes Carvalho",
   "morada": "Urbanização Sequeira lote9, 6230-804",
   "aniversario": "1972-03-08",
   "contacto": "965358429",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 87,
   "nome": "Mário Brito Tavares",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 88,
   "nome": "José Leal S. João Gaspar",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 89,
   "nome": "Joaquim Alberto Ramos Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 90,
   "nome": "Mário Jorge Carrolo Passarinho",
   "morada": "Largo de Santo António nº 21",
   "aniversario": "1974-12-08",
   "contacto": "938442450",
   "email": "mbird007@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 91,
   "nome": "Sérgio Filipe Santos Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 92,
   "nome": "Nuno Miguel Marques Martins",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 93,
   "nome": "Rui Pedro Garcia Rolo",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 94,
   "nome": "Rui Alberto Pinto São Pedro",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 95,
   "nome": "Pedro Miguel Brito Horta",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 96,
   "nome": "Pedro Jorge Marques Martins",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 97,
   "nome": "Paulo Jorge Lourenço Salvado",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 98,
   "nome": "Filipe David Santos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 99,
   "nome": "José António Trindade Abrantes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 100,
   "nome": "Joaquim Gretas",
   "morada": "Rua da Corredora nº14, 6230-801",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 101,
   "nome": "Rui Pedro Roque Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 102,
   "nome": "Hugo Manuel Almeida Oliveira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 103,
   "nome": "Rui Pedro Abrantes Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 104,
   "nome": "Leonel José Oliveira Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 105,
   "nome": "Joaquim António Gonçalves Guedes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 106,
   "nome": "Gonçalo Manuel Martins Salvado",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 107,
   "nome": "José Maria Abrantes Salvado",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 108,
   "nome": "Luís Miguel Marques Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 109,
   "nome": "Paulo Jorge Abrantes Clemente",
   "morada": "Rua Zéca Afonso lote E 1ºD ",
   "aniversario": "1973-07-16",
   "contacto": "968555270",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 110,
   "nome": "Pedro Miguel Abrantes Costa",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 111,
   "nome": "João António Martins Dias",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 112,
   "nome": "Miguel Ângelo Nascimento Brito",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 113,
   "nome": "Clara Maria Silva Ascensão",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 114,
   "nome": "António José Neves Sousa",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 115,
   "nome": "Joaquim António Brito Lopes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 116,
   "nome": "José Miguel Carrola Malaca",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 117,
   "nome": "Adrião Gaspar Duarte",
   "morada": "Rua Joaquim Batista D. B.6230-804",
   "aniversario": "1963-02-16",
   "contacto": "964267754",
   "email": "adriaogaspaeduarte@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 118,
   "nome": "Hugo Rafael Neves Rodrigues",
   "morada": "Estrada Nacional nº343 nº12,6230-801",
   "aniversario": "",
   "contacto": "925763166",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 119,
   "nome": "David José Ramalho Almeida",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 120,
   "nome": "José Almeida Ferreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 121,
   "nome": "Bruno Eduardo Moura Gouveia",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 122,
   "nome": "José António Santos Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 123,
   "nome": "Pedro Miguel Couto Silva",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 124,
   "nome": "Pedro Miguel Martins Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 125,
   "nome": "Jorge Manuel Brito Moura",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 126,
   "nome": "Ângelo Adelino Arraiano Sousa",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 127,
   "nome": "José Rocha Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 128,
   "nome": "Edgar Filipe Dias Santos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 129,
   "nome": "Adriano Amoreira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 130,
   "nome": "António Lourenço Brito",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 131,
   "nome": "Diogo Santos Correia",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 132,
   "nome": "António Manuel Salvado Justiça",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 133,
   "nome": "António José Oliveira",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 134,
   "nome": "João José Soares Barreiros",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 135,
   "nome": "António Catorze Tavares",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 136,
   "nome": "Luís António Caldeira Martins",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 137,
   "nome": "Joaquim António Nascimento Lopes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 138,
   "nome": "Manuel Clemente Batista",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 139,
   "nome": "João Amaro Quintela",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 140,
   "nome": "André Filipe Abrantes Duarte",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 141,
   "nome": "José Carlos Freira Duarte",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 142,
   "nome": "Alberto Ascensão Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 143,
   "nome": "Domingos José Ascensão Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 144,
   "nome": "António Gonçalves Rodrigues",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 145,
   "nome": "Ana Cristina Santos Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 146,
   "nome": "João Nunes Santos Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 147,
   "nome": "Rogério Gonçalves Caria",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 148,
   "nome": "Ana Catarina Brito Vaz",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 149,
   "nome": "António Ramalho Marques",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 150,
   "nome": "Rui Pedro Marques Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 151,
   "nome": "Sílvio Roque Fernandes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 152,
   "nome": "Ricardo Filipe Melo Rondão",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 153,
   "nome": "Domingos Clemente Fernandes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 154,
   "nome": "Jerónimo Rondão Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 155,
   "nome": "António Manuel Gomes Fernandes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 156,
   "nome": "João Carlos Lopes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 157,
   "nome": "Pedro Miguel Oliveira Couto",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 158,
   "nome": "Sérgio Ricardo Oliveira Couto",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 159,
   "nome": "Sérgio Ricardo Trindade Fortunato",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 160,
   "nome": "Luis Pedro Batista Abrantes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 161,
   "nome": "António Alfredo (Cacau)",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 162,
   "nome": "Victor Manuel Ferreira Almeida",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 163,
   "nome": "José António Tavares",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 164,
   "nome": "Edgar Manuel Salvado Simões",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 165,
   "nome": "Daniel José Neves Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 166,
   "nome": "Luciana Isabel Alves Roque",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 167,
   "nome": "Carolina Teixeira David",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 168,
   "nome": "Jorge Miguel Salvado Craveiro",
   "morada": "Loteamento Boavista, Lote 35, VALVERDE",
   "aniversario": "1994-10-29",
   "contacto": "961140284",
   "email": "jorgecraveiro11@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 169,
   "nome": "Carlos Alberto Gonçalves Ramos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 170,
   "nome": "Catarina Alexandra de Melo Rondão",
   "morada": "Estrada Municipal nº25, 6230-801 Carvalhal",
   "aniversario": "1983-08-12",
   "contacto": "966628885",
   "email": "cr.sport11@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 171,
   "nome": "José Rodrigues Soares",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 172,
   "nome": "Ricardo Rafael Horta Campos",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 173,
   "nome": "João Pedro dos Santos Clemente",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 174,
   "nome": "Sandra Catarina Neves Batista",
   "morada": "",
   "aniversario": "",
   "contacto": "967984771",
   "email": "ss_batista@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 175,
   "nome": "Joana Paula Tavares Salvado",
   "morada": "",
   "aniversario": "",
   "contacto": "964303108",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 176,
   "nome": "Cesar Paulo Fernandes Tavares",
   "morada": "",
   "aniversario": "",
   "contacto": "969766781",
   "email": "cesar-tavares@iol.pt",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 177,
   "nome": "Pedro Filipe Pereira Roxo Rebordão",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 178,
   "nome": "Sara Catarina Lourenço Soares",
   "morada": "",
   "aniversario": "",
   "contacto": "966640897",
   "email": "scls_19@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 179,
   "nome": "Daniel Filipe Rondão Alves",
   "morada": "",
   "aniversario": "",
   "contacto": "966725544",
   "email": "vp_danyel_5@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 180,
   "nome": "Sandra Cristina R. Caria",
   "morada": "",
   "aniversario": "1982-03-12",
   "contacto": "968167151",
   "email": "sandracaria@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 181,
   "nome": "Luis Carlos Brito Marques",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 182,
   "nome": "Arménio Magalhães Soares",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "dM3BuKrZDospSpRFelzI",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 183,
   "nome": "José Abrantes da Silva",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "dM3BuKrZDospSpRFelzI",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 184,
   "nome": "Ana Inês Roxo Espirito Santo",
   "morada": "Rua do Oteiro nº 16, 6230-804 valverde",
   "aniversario": "1976-01-15",
   "contacto": "969067712",
   "email": "micas29@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 185,
   "nome": "João Espiríto Santo Carrola",
   "morada": "Rua do Oteiro nº 16, 6230-804 valverde",
   "aniversario": "1999-05-20",
   "contacto": "961027672",
   "email": "j_carrola@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 186,
   "nome": "Maria Anunciação Almeida Fernandes Figueira",
   "morada": "Sitio da Grade Ouro nº52,6230-801",
   "aniversario": "1964-08-01",
   "contacto": "965756620",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 187,
   "nome": "Juliana Isabel Fernandes Amoreira",
   "morada": "Rua S. Sebastião nº11, 6230-801",
   "aniversario": "1995-07-07",
   "contacto": "961221030",
   "email": "juliana71995@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 188,
   "nome": "Isabel Maria Salvado Fernandes Amoreira",
   "morada": "Rua S. Sebastião nº11, 6230-801",
   "aniversario": "1962-06-25",
   "contacto": "963586960",
   "email": "juliana71995@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 189,
   "nome": "Paula Cristina Tavares Peres",
   "morada": "Rua da Corredora nº14, 6230-801",
   "aniversario": "1969-01-16",
   "contacto": "968456339",
   "email": "paula-peres@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 190,
   "nome": "Inês Peres Clemente",
   "morada": "Rua da Corredora nº14, 6230-801",
   "aniversario": "",
   "contacto": "963110863",
   "email": "ines.p.clemente@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 191,
   "nome": "Silvia Margarida Rodrigues",
   "morada": "Estrada Nacional 343 porta nº12, 6230-801",
   "aniversario": "1980-12-16",
   "contacto": "969179826",
   "email": "silviafurtado1@hotamail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 192,
   "nome": "Alexandre Miguel Furtado Rodrigues",
   "morada": "Estrada Nacional nº343 nº12,6230-801",
   "aniversario": "2004-08-08",
   "contacto": "969179826",
   "email": "silviafurtado@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 193,
   "nome": "Santiago Furtado Rodrigues",
   "morada": "Estrada Nacional nº343 nº12,6230-801",
   "aniversario": "2011-01-16",
   "contacto": "969179826",
   "email": "silviafurtado@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 194,
   "nome": "Sandra Salgueiro Nunes",
   "morada": "Urbanização Sequeira lote 9, 6230-804",
   "aniversario": "",
   "contacto": "964333851",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 195,
   "nome": "Mauricío Nunes",
   "morada": "Urbanização Sequeira lote 9, 6230-804",
   "aniversario": "1996-09-16",
   "contacto": "966713872",
   "email": "mauricio.nunes@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 196,
   "nome": "Maria Assunção B.M.Abrantes",
   "morada": "Estrada Nacional nº343 nº34,6230-801",
   "aniversario": "1967-11-16",
   "contacto": "938783674",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 197,
   "nome": "Joel Pedro Marques Abrantes",
   "morada": "Estrada Nacional nº343 nº34,6230-801",
   "aniversario": "1992-04-16",
   "contacto": "937212191",
   "email": "joel-pe-ma-abrantes@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 198,
   "nome": "Henrique Abrantes",
   "morada": "Estrada Nacional nº343 nº34,6230-801",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 199,
   "nome": "Francisco Manuel Marques Abrantes",
   "morada": "Estrada Nacional nº343 nº34,6230-801",
   "aniversario": "2000-11-16",
   "contacto": "934722181",
   "email": "francisco.9090@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 200,
   "nome": "Inês Roque Batista",
   "morada": "",
   "aniversario": "1979-04-10",
   "contacto": "964407328",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 201,
   "nome": "Guilherme José Nunes",
   "morada": "",
   "aniversario": "2004-10-16",
   "contacto": "966483504",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 202,
   "nome": "Filomena Maria Moreira Brites",
   "morada": "Rua Caminho da Corredoura nº20, 6230-804",
   "aniversario": "1974-05-16",
   "contacto": "965115659",
   "email": "filomena.brites@iol.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 203,
   "nome": "Afonso Brites Fernandes",
   "morada": "Rua Caminho da Corredoura nº20, 6230-804",
   "aniversario": "2003-04-16",
   "contacto": "925180815",
   "email": "abf20032011@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 204,
   "nome": "Edite Brites Fernandes",
   "morada": "Rua Caminho da Corredoura nº20, 6230-804",
   "aniversario": "1998-09-06",
   "contacto": "967559061",
   "email": "editebfernandes@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 205,
   "nome": "Anabela Carmo Frias Monteiro da Silva",
   "morada": "Urbanização Sequeira lote27, 6230-804",
   "aniversario": "1969-04-16",
   "contacto": "966455849",
   "email": "anabelacfmsilva@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 206,
   "nome": "João Filipe Godinho Monteiro",
   "morada": "Estrada Municipal nº25 B, 6230-801 Carvalhal",
   "aniversario": "1956-09-16",
   "contacto": "968578825",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 207,
   "nome": "Serafim António Santos Nave",
   "morada": "Rua da Procissão nº16 Carvalhal, 6230-801",
   "aniversario": "1971-08-01",
   "contacto": "967538324",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 208,
   "nome": "Maria Teresa Neves Oliveira",
   "morada": "Rua da Procissão nº16 Carvalhal, 6230-801",
   "aniversario": "1968-01-16",
   "contacto": "966799368",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 209,
   "nome": "Gonçalo Oliveira Nave",
   "morada": "Rua da Procissão nº16 Carvalhal, 6230-801",
   "aniversario": "1997-03-16",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 210,
   "nome": "Pedro Miguel Ribeiro Gomes",
   "morada": "Edificio Beira Bloco - 2º esq Cruz Alcaria 6230-024 Alcaria",
   "aniversario": "1974-11-16",
   "contacto": "962388697",
   "email": "pedroribeirogomes@sapo.pt",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 211,
   "nome": "David Miguel Pereira Gomes",
   "morada": "Edificio Beira Bloco - 2º esq Cruz Alcaria 6230-024 Alcaria",
   "aniversario": "2003-06-01",
   "contacto": "962388697",
   "email": "davidgomes2003@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 212,
   "nome": "David Nunes Rondão",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 213,
   "nome": "Duarte Pedro Pires da Cruz Rosa",
   "morada": "",
   "aniversario": "",
   "contacto": "961696008",
   "email": "duartecruz.80@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 214,
   "nome": "Joaquim António Fortunato",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 215,
   "nome": "Maria Lurdes Neves de Sousa",
   "morada": "Larrgo da lage nº4 Valverde",
   "aniversario": "1965-01-02",
   "contacto": "965552015",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 216,
   "nome": "Catarina Rodrigues Santos",
   "morada": "Travessa do Norte nº11, 6230-801",
   "aniversario": "1996-09-16",
   "contacto": "968621800",
   "email": "kataxita@live.com.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 217,
   "nome": "Andreia Sofia Rodrigues Santos",
   "morada": "Travessa do Norte nº11, 6230-801",
   "aniversario": "1989-06-16",
   "contacto": "927589193",
   "email": "andreiasantos-4@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 218,
   "nome": "Otilia Maria Neves Sousa Duarte",
   "morada": "Rua Joaquim Batista 1º B.6230-804",
   "aniversario": "2013-11-16",
   "contacto": "967968268",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 219,
   "nome": "Telmo Filipe Sousa Duarte",
   "morada": "Rua Joaquim Batista 1º B.6230-804",
   "aniversario": "1996-11-02",
   "contacto": "966714157",
   "email": "telmoslb_1996@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 220,
   "nome": "Maria Lurdes Ramos Melo Rondão",
   "morada": "Estrada Municipal nº 25 Carvalhal",
   "aniversario": "1960-08-16",
   "contacto": "963245929",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 221,
   "nome": "Carlos Alberto L. Rondão",
   "morada": "Estrada Municipal nº 25 Carvalhal",
   "aniversario": "1960-04-16",
   "contacto": "963245929",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 222,
   "nome": "Josefina m. C. bomba Marques",
   "morada": "",
   "aniversario": "1957-01-07",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 223,
   "nome": "Marcelo Oliveira Bernardo",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 224,
   "nome": "João Filipe C. Tavares",
   "morada": "Rua da  Fonte",
   "aniversario": "1987-05-05",
   "contacto": "962705002",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 225,
   "nome": "Gonçalo José N. Batista",
   "morada": "",
   "aniversario": "1987-12-16",
   "contacto": "965681994",
   "email": "ultrasoviet@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 226,
   "nome": "Fernando Manuel L. Garcia",
   "morada": "Rua S. Sebastião nº8, 6230-801",
   "aniversario": "1968-01-16",
   "contacto": "966823486",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 227,
   "nome": "M.Manuela Santos A. Garcia",
   "morada": "Rua S. Sebastião nº8, 6230-801",
   "aniversario": "1972-04-16",
   "contacto": "963923405",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 228,
   "nome": "Diogo Amoreira Garcia",
   "morada": "Rua S. Sebastião nº8, 6230-801",
   "aniversario": "1996-01-16",
   "contacto": "967157888",
   "email": "diog-1996@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 229,
   "nome": "Ana Cristina Roque Monteiro",
   "morada": "Estrada Municipal nº25 B, 6230-801 Carvalhal",
   "aniversario": "1983-02-01",
   "contacto": "963777147",
   "email": "anacrm22@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 230,
   "nome": "Kati Taborda Barros",
   "morada": "",
   "aniversario": "1978-08-16",
   "contacto": "96868451",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 231,
   "nome": "Elisabete Barata Santos",
   "morada": "Rua Cruz das Almas nº8",
   "aniversario": "1981-09-01",
   "contacto": "964924393",
   "email": "betysantos1981@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 232,
   "nome": "Daniela Santos Clemente",
   "morada": "Rua Cruz das Almas nº8",
   "aniversario": "2011-02-16",
   "contacto": "964924393",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 233,
   "nome": "Duarte Santos Clemente",
   "morada": "Rua Cruz das Almas nº8",
   "aniversario": "2011-02-16",
   "contacto": "964924393",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 234,
   "nome": "João Filipe Vaz Leandro",
   "morada": "Rua Manuel Nunes nº6",
   "aniversario": "1982-05-16",
   "contacto": "9686675810",
   "email": "joao.leandro@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 235,
   "nome": "José Lourenço S. Almeida",
   "morada": "Rua Gonçalves",
   "aniversario": "1950-05-09",
   "contacto": "963770803",
   "email": "josesalvadoalmeida@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 236,
   "nome": "Tiago Daniel Nascimento Serra",
   "morada": "Estrada Municipal",
   "aniversario": "1984-08-16",
   "contacto": "968359560",
   "email": "tiagoserra84@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 237,
   "nome": "Joel Filipe Salvado Afonso",
   "morada": "Rua Alqueive Malta nº11",
   "aniversario": "1990-02-16",
   "contacto": "968524244",
   "email": "joel.motard-1990@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 238,
   "nome": "Sónia Cristina Salvado Afonso",
   "morada": "Rua Alqueive Malta nº11",
   "aniversario": "1983-05-16",
   "contacto": "967187716",
   "email": "scsafonso83@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 239,
   "nome": "Fernanda Afonso",
   "morada": "Rua Alqueive Malta nº11",
   "aniversario": "1958-10-16",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 240,
   "nome": "Sandra Cristina S. Nunes",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 241,
   "nome": "Isabel M. Trindade Marques",
   "morada": "",
   "aniversario": "1968-08-16",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 242,
   "nome": "Carolina Marques Barreiros",
   "morada": "",
   "aniversario": "1996-07-16",
   "contacto": "968566174",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 243,
   "nome": "Alexandre Fonseca Nogueira",
   "morada": "Estrada Municipal nº117 Qt do Abade",
   "aniversario": "1964-06-12",
   "contacto": "962779577",
   "email": "anogueira.seguros@sapo.pt",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 244,
   "nome": "José A. Costa Rodrigues",
   "morada": "rua D. Celestino Monteiro lote 148 R/esq fnd",
   "aniversario": "1987-10-05",
   "contacto": "963286876",
   "email": "j.acrodrigues@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 245,
   "nome": "Rodrigo Maria Couto Nobre",
   "morada": "Loteamento sequeira lote 15",
   "aniversario": "2011-10-16",
   "contacto": "961354218",
   "email": "nobre.j3lp@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 246,
   "nome": "Ana Rita Abrantes Oliveira",
   "morada": "Rua 25 de Abril",
   "aniversario": "1984-03-16",
   "contacto": "965037073",
   "email": "anaritaao@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 247,
   "nome": "António José Simão da Silva",
   "morada": "Donas",
   "aniversario": "1963-08-06",
   "contacto": "969382231",
   "email": "toze_simao@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 248,
   "nome": "Daniel Alexandre G. M. Marques",
   "morada": "Valverde",
   "aniversario": "2011-11-16",
   "contacto": "275752784",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 249,
   "nome": "David M. Brás Matias",
   "morada": "Estrada do carvalho, Donas",
   "aniversario": "1985-03-16",
   "contacto": "963903461",
   "email": "matiasfundao@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 250,
   "nome": "Luís Ramos",
   "morada": "",
   "aniversario": "",
   "contacto": "969635590",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 251,
   "nome": "M. Lurdes L. Ramalho almeida",
   "morada": "Rua do norte ",
   "aniversario": "1966-12-09",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 252,
   "nome": "Daniela Filipa S. Furtado",
   "morada": "Largo N. Canceiçao",
   "aniversario": "1986-07-03",
   "contacto": "917605193",
   "email": "dany12.furtado@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 253,
   "nome": "M. Manuela S. Nunes Rondão",
   "morada": "Estrada municipal nº193",
   "aniversario": "1964-06-09",
   "contacto": "962068960",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 254,
   "nome": "António Martins Robalo",
   "morada": "Fatela",
   "aniversario": "1974-02-16",
   "contacto": "964656176",
   "email": "mcarmorobalo@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 255,
   "nome": "José Adelino David",
   "morada": "",
   "aniversario": "1961-07-16",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 256,
   "nome": "Cláudio M. N. Rodrigues",
   "morada": "Carvalhal",
   "aniversario": "1980-08-16",
   "contacto": "925436149",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 257,
   "nome": "Joaquim Lourenço Rondão",
   "morada": "Estrada municipal nº193",
   "aniversario": "1965-12-16",
   "contacto": "964736587",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 258,
   "nome": "Ana Carolina Lopes Neves",
   "morada": "Rua nº1 Estrd. Munic",
   "aniversario": "2010-01-16",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 259,
   "nome": "Ana Paula Tavares Lopes Neves",
   "morada": "Rua nº1 Estrd. Munic",
   "aniversario": "1972-05-16",
   "contacto": "966351148",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 260,
   "nome": "Guilherme Ricardo",
   "morada": "fatela",
   "aniversario": "2004-08-16",
   "contacto": "962558297",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 261,
   "nome": "Valter J. S. O. F. Fonseca",
   "morada": "Rua do Terreiro",
   "aniversario": "1980-07-16",
   "contacto": "967279571",
   "email": "titoc80@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 262,
   "nome": "Gustavo antunes Batista",
   "morada": "Fatela",
   "aniversario": "2005-10-16",
   "contacto": "965503593",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 263,
   "nome": "Daniel Ramos",
   "morada": "Valverde",
   "aniversario": "1989-05-16",
   "contacto": "968530937",
   "email": "daniel.ramos.dr96@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 264,
   "nome": "Diogo Matos Moreira",
   "morada": "Fundão",
   "aniversario": "2006-07-16",
   "contacto": "965353051",
   "email": "salvadomatos@sapo.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 265,
   "nome": "Francisco Nunes Matos",
   "morada": "Fundão",
   "aniversario": "2005-01-16",
   "contacto": "962954323",
   "email": "dulce-gabriel@gail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 266,
   "nome": "Leonor Santos Gomes",
   "morada": "Valverde",
   "aniversario": "2006-01-04",
   "contacto": "967307271",
   "email": "patricia-isabel@live.com.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 267,
   "nome": "Rodrigo Duarte",
   "morada": "Fundão",
   "aniversario": "2006-03-16",
   "contacto": "962447907",
   "email": "pduarte@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 268,
   "nome": "Francisca Marcelino Rolo",
   "morada": "Valverde",
   "aniversario": "2004-10-16",
   "contacto": "964589473",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 269,
   "nome": "João Miguel Teodósio",
   "morada": "Fundão",
   "aniversario": "2005-03-16",
   "contacto": "966643427",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 270,
   "nome": "Guilherme Martins",
   "morada": "Fundão",
   "aniversario": "2006-06-16",
   "contacto": "967401515",
   "email": "vsuzi09@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 271,
   "nome": "Dinis Carvalhinho Lindeza",
   "morada": "Fundão",
   "aniversario": "2005-10-05",
   "contacto": "969678833",
   "email": "fsilvares@iol.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 272,
   "nome": "Afonso Henriques Primo",
   "morada": "Fundão",
   "aniversario": "2003-01-16",
   "contacto": "967003032",
   "email": "psp.electricidade@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 273,
   "nome": "Rodrigo F. Cruz",
   "morada": "Fundão",
   "aniversario": "2005-08-04",
   "contacto": "966771060",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 274,
   "nome": "Simão Pereira",
   "morada": "Fundão",
   "aniversario": "2005-09-16",
   "contacto": "965273402",
   "email": "vitor.p.encarnacao@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 275,
   "nome": "Inês Romoaldo Novo",
   "morada": "Fundão",
   "aniversario": "2006-07-07",
   "contacto": "963366353",
   "email": "david_olivia@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 276,
   "nome": "Beatriz Romoaldo Martins",
   "morada": "Fundão",
   "aniversario": "2003-04-08",
   "contacto": "963366353",
   "email": "david_olivia@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 277,
   "nome": "Graça Nobre V. P. Marques",
   "morada": "Fundão",
   "aniversario": "2005-08-03",
   "contacto": "961443604",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 278,
   "nome": "Joana Margarida Farinha",
   "morada": "Alpedrinha",
   "aniversario": "2004-02-16",
   "contacto": "966715692",
   "email": "joananpetras@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 279,
   "nome": "Sara Lima Campos",
   "morada": "Valverde",
   "aniversario": "2006-11-16",
   "contacto": "275752801",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 280,
   "nome": "Maria Inês Figueira",
   "morada": "Valverde",
   "aniversario": "2006-09-16",
   "contacto": "927349962",
   "email": "ritagood@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 281,
   "nome": "Rodrigo A. Pereira",
   "morada": "Fundão",
   "aniversario": "2006-07-07",
   "contacto": "926418557",
   "email": "ateresagp@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 282,
   "nome": "José Maria Maceiras Santos",
   "morada": "Fundão",
   "aniversario": "1970-04-16",
   "contacto": "962004671",
   "email": "j.naria29@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 283,
   "nome": "João daniel Tavares David",
   "morada": "Valverde",
   "aniversario": "1995-08-16",
   "contacto": "927743089",
   "email": "j.nt.david@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 284,
   "nome": "André Filipe B. tavares",
   "morada": "Valverde",
   "aniversario": "1989-09-02",
   "contacto": "96426145",
   "email": "andretavares.16@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 285,
   "nome": "Inês sofia S. Rebordão",
   "morada": "Valverde",
   "aniversario": "2012-02-16",
   "contacto": "963140509",
   "email": "pedro.rebordao@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 286,
   "nome": "Francisco Rolo",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 287,
   "nome": "António José Tavares Brito",
   "morada": "Carvalhal",
   "aniversario": "1953-01-16",
   "contacto": "275773117",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 288,
   "nome": "João Alberto Vaz Abrantes",
   "morada": "Valverde",
   "aniversario": "1943-10-16",
   "contacto": "963686501",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 289,
   "nome": "Eduardo António R. Almeida",
   "morada": "Valverde",
   "aniversario": "1957-03-05",
   "contacto": "912030837",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 290,
   "nome": "Afonso silva Freire",
   "morada": "",
   "aniversario": "",
   "contacto": "912030837",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 291,
   "nome": "Adelino José Lopes Almeida ",
   "morada": "Carvalhal",
   "aniversario": "1965-07-07",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 292,
   "nome": "Severina Martins Robalo",
   "morada": "Fatela",
   "aniversario": "1982-06-16",
   "contacto": "965764455",
   "email": "severina_robalo@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 293,
   "nome": "Rui Pedro salvado Simões",
   "morada": "Carvalhal",
   "aniversario": "1993-10-16",
   "contacto": "926675928",
   "email": "rpss@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 294,
   "nome": "Diogo freire Martins",
   "morada": "",
   "aniversario": "2010-11-16",
   "contacto": "275753579",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 295,
   "nome": "sérgio Filipe Esteves vieira",
   "morada": "Lisboa/Alcaide",
   "aniversario": "1980-10-16",
   "contacto": "965442695",
   "email": "sergio_f_vieira@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 296,
   "nome": "Márcio P. Gonçalves",
   "morada": "Fundão",
   "aniversario": "1983-04-16",
   "contacto": "962603779",
   "email": "marciog83@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 297,
   "nome": "Nuno david O. Pranto",
   "morada": "Carvalhal",
   "aniversario": "1979-09-16",
   "contacto": "967432616",
   "email": "ndo.pranto@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 298,
   "nome": "Olivia Fiens E. Gil",
   "morada": "Valverde",
   "aniversario": "1956-11-16",
   "contacto": "925095537",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 299,
   "nome": "Nuno M. N. Salvado",
   "morada": "Valverde",
   "aniversario": "1979-01-16",
   "contacto": "965228779",
   "email": "nuno-salvado@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 300,
   "nome": "Paulo Jorge De Oliveira Ferreira",
   "morada": "Fundão",
   "aniversario": "1982-01-16",
   "contacto": "965891442",
   "email": "paulomoferreira@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 301,
   "nome": "Sara A.S.F. Salvado",
   "morada": "Donas",
   "aniversario": "1988-10-05",
   "contacto": "926432177",
   "email": "sf100388@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 302,
   "nome": "Luis Filipe B. Salvado",
   "morada": "Donas",
   "aniversario": "1985-02-16",
   "contacto": "926837267",
   "email": "luisfilipesalvado@hotmsil.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 303,
   "nome": "Joaquim José Torres",
   "morada": "Catrão",
   "aniversario": "1983-02-04",
   "contacto": "925295205",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 304,
   "nome": "Marta Andreia Pranto",
   "morada": "Carvalhal",
   "aniversario": "1981-05-16",
   "contacto": "963344419",
   "email": "martaandreiasantos@hotmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 305,
   "nome": "Helder Filipe Duarte",
   "morada": "Fundão",
   "aniversario": "1986-03-16",
   "contacto": "968711873",
   "email": "helder_duarte@sapo.pt",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 306,
   "nome": "João Paulo A. Salvado",
   "morada": "Carvalhal",
   "aniversario": "1988-02-08",
   "contacto": "968673470",
   "email": "viros.amd@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 307,
   "nome": "Bárbara Alexandra da Silva",
   "morada": "Fundão",
   "aniversario": "1984-10-02",
   "contacto": "961126198",
   "email": "babitasilva84@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 308,
   "nome": "João Oliveira Roque",
   "morada": "Valverde",
   "aniversario": "1994-12-16",
   "contacto": "964113291",
   "email": "joao-roque-24@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 309,
   "nome": "Mauro Freitas Rodrigo",
   "morada": "Fundão",
   "aniversario": "1982-10-10",
   "contacto": "926705544",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 310,
   "nome": "Francisco Martins Rolo",
   "morada": "Valverde",
   "aniversario": "2004-10-16",
   "contacto": "962874311",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 311,
   "nome": "José Pedro D. Roque",
   "morada": "Valverde",
   "aniversario": "2008-12-11",
   "contacto": "968563247",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 312,
   "nome": "Mª Constança D. Roque",
   "morada": "Valverde",
   "aniversario": "2010-11-05",
   "contacto": "968563247",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 313,
   "nome": "Gilberto José G. Machado",
   "morada": "Peroviseu",
   "aniversario": "1983-04-16",
   "contacto": "963234140",
   "email": "giloxe1@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 314,
   "nome": "Ricardo A. Castro Cunha",
   "morada": "Ald. Joanes",
   "aniversario": "1983-07-01",
   "contacto": "925485821",
   "email": "cunha@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 315,
   "nome": "Nuno Miguel Sampaio",
   "morada": "Peroviseu",
   "aniversario": "1984-05-16",
   "contacto": "962097458",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 316,
   "nome": "Rui Miguel Beato Galvão",
   "morada": "Fundão",
   "aniversario": "1977-03-16",
   "contacto": "96445997",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 317,
   "nome": "Mª Conceição Saraiva G. Martins",
   "morada": "Covilhã",
   "aniversario": "1974-03-12",
   "contacto": "964093065",
   "email": "sgm1974@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 318,
   "nome": "Érica Sofia Borrego Fortunato",
   "morada": "Valverde",
   "aniversario": "2003-04-16",
   "contacto": "965338943",
   "email": "lilianaifortunato@outlook.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 319,
   "nome": "Margarida M. Rolo",
   "morada": "Valverde",
   "aniversario": "2009-03-26",
   "contacto": "968671406",
   "email": "isarolo@aeiou.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 320,
   "nome": "João Filipe Salvado Brito",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 321,
   "nome": "M. Céu Varandas Trindade",
   "morada": "Valverde",
   "aniversario": "1946-11-12",
   "contacto": "275773835",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 322,
   "nome": "M. Alice Cunha Ferreira",
   "morada": "Valverde",
   "aniversario": "1952-03-15",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 323,
   "nome": "Manuel António de Jesus",
   "morada": "Fundão",
   "aniversario": "1973-04-19",
   "contacto": "968579926",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 324,
   "nome": "Paulo Jorge Dias Borges",
   "morada": "undão",
   "aniversario": "1977-03-05",
   "contacto": "965022910",
   "email": "pjdborges@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 325,
   "nome": "Patrícia R. Nunes Rebordão",
   "morada": "Velverde",
   "aniversario": "1999-01-25",
   "contacto": "926309346",
   "email": "patriciaraquel9@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 326,
   "nome": "Tiago Lopes Caria",
   "morada": "Fatela",
   "aniversario": "2003-11-22",
   "contacto": "96893041",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 327,
   "nome": "José Manuel Caria",
   "morada": "Fundão",
   "aniversario": "1972-06-12",
   "contacto": "934379117",
   "email": "zacaria72@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 328,
   "nome": "João Pedro dos Santos Clemente",
   "morada": "Fundão",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 329,
   "nome": "Fernando José Duarte",
   "morada": "",
   "aniversario": "1957-07-22",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 330,
   "nome": "Arsénio Ramalho",
   "morada": "Valverde",
   "aniversario": "1987-06-27",
   "contacto": "969686742",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 331,
   "nome": "David Filipe",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 332,
   "nome": "Miguel de Lima Campos",
   "morada": "Valverde",
   "aniversario": "2011-07-26",
   "contacto": "275752801",
   "email": "minimercadovalverde@gmail.com",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 333,
   "nome": "Pedro Ricardo Santos Costa",
   "morada": "Valverde",
   "aniversario": "1984-03-29",
   "contacto": "967565966",
   "email": "pcpenetra13@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 334,
   "nome": "Batsy Brás Maurício",
   "morada": "Iseda",
   "aniversario": "1992-02-20",
   "contacto": "968244756",
   "email": "betsymauricio@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 335,
   "nome": "Sofia Raquel Martins Frei",
   "morada": "Brasil",
   "aniversario": "2015-05-11",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 336,
   "nome": "Isabel Maria Machado Roque Batista",
   "morada": "Carvalhal",
   "aniversario": "1971-02-04",
   "contacto": "962567941",
   "email": "ibatista71@hotmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 337,
   "nome": "Liliana Isabel F. B. Fortunato",
   "morada": "Carvalhal",
   "aniversario": "1981-01-02",
   "contacto": "965338943",
   "email": "lilianaifortunato@outlook.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 338,
   "nome": "Ivo Clemente",
   "morada": "Fundão",
   "aniversario": "",
   "contacto": "967159053",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 339,
   "nome": "Joao Noveira",
   "morada": "Carvalhal",
   "aniversario": "",
   "contacto": "969859887",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 340,
   "nome": "Fabio Ramalho",
   "morada": "Fatela",
   "aniversario": "1994-08-18",
   "contacto": "962667811",
   "email": "fabioramalho8@gmail.com",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 341,
   "nome": "Ana Lucia Marques",
   "morada": "Carvalhal",
   "aniversario": "1983-03-29",
   "contacto": "925876420",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 342,
   "nome": "Jose Ricardo B Sousa",
   "morada": "Valverde",
   "aniversario": "1995-07-11",
   "contacto": "926027478",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 343,
   "nome": "Bruno Brazinha Monsanto",
   "morada": "Valverde",
   "aniversario": "1978-11-11",
   "contacto": "965469629",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 344,
   "nome": "Julio Galante Dinis",
   "morada": "Fundão",
   "aniversario": "1985-09-04",
   "contacto": "965550263",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 345,
   "nome": "José Carlos Silva",
   "morada": "Fundão",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 346,
   "nome": "Mariana Pinto Chaves ",
   "morada": "",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 347,
   "nome": "Carlos Ferreira ",
   "morada": "Castelo Branco",
   "aniversario": "1970-06-26",
   "contacto": "967596462",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2019'],
   "criadoa": "2019-12-12"
 },
 {
   "socioN": 348,
   "nome": "Gisela Domingos",
   "morada": "Castelo Branco",
   "aniversario": "1972-10-31",
   "contacto": "967596462",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2019'],
   "criadoa": "2019-12-12"
 },
 {
   "socioN": 349,
   "nome": "Mafalda Alves dos Santos",
   "morada": "Cortes",
   "aniversario": "1994-04-27",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 350,
   "nome": "Paulos Fernandes",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "969395689",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 351,
   "nome": "Marina Roque",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 352,
   "nome": "Helder Martins",
   "morada": "Donas",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2019','2020'],
   "criadoa": "2019-12-12"
 },
 {
   "socioN": 353,
   "nome": "Ana Rita Silva",
   "morada": "Covilhã",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2019','2020'],
   "criadoa": "2019-12-12"
 },
 {
   "socioN": 354,
   "nome": "Antonio Manuel Tavares Rodrigues",
   "morada": "Carvalhal",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 355,
   "nome": "Rosaria Maria Pereira Tomas",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "925749641",
   "email": "rosariatomas@live.com.pt",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 356,
   "nome": "Tomas Perreira Tomas Monsanto",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "925749641",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 357,
   "nome": "Mateus Pereira Tomas Monsanto",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "925749641",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 358,
   "nome": "Monica Correia de Andrade",
   "morada": "Valverde",
   "aniversario": "1979-12-20",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 359,
   "nome": "Manuel Diogo de Andrade Tavares",
   "morada": "Valverde",
   "aniversario": "2003-10-18",
   "contacto": "965431965",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 360,
   "nome": "Guilherme de Andrade Tavares",
   "morada": "Valverde",
   "aniversario": "2005-08-31",
   "contacto": "965431965",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 361,
   "nome": "Tiago de Andrade Tavares",
   "morada": "Valverde",
   "aniversario": "2013-04-03",
   "contacto": "965431965",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2018','2019'],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 362,
   "nome": "Daniel Jose Martins Freire",
   "morada": "Valverde",
   "aniversario": "2018-11-11",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2019'],
   "criadoa": "2019-12-12"
 },
 {
   "socioN": 363,
   "nome": "Tiago Brito",
   "morada": "Alcaide",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2019'],
   "criadoa": "2019-12-12"
 },
 {
   "socioN": 364,
   "nome": "Claudia Marques",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2020'],
   "criadoa": "2020-12-12"
 },
 {
   "socioN": 365,
   "nome": "Victor Marques",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2020'],
   "criadoa": "2020-12-12"
 },
 {
   "socioN": 366,
   "nome": "Matilde Marques",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2020'],
   "criadoa": "2020-12-12"
 },
 {
   "socioN": 367,
   "nome": "Susana Cordeiro",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2020'],
   "criadoa": "2020-12-12"
 },
 {
   "socioN": 368,
   "nome": "Joana Santos",
   "morada": "Cortes",
   "aniversario": "1985-12-25",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 369,
   "nome": "Daniela Gaspar",
   "morada": "Fundão",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": [],
   "criadoa": "2018-12-12"
 },
 {
   "socioN": 370,
   "nome": "Sara Rebordão",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "IKrqXVLr1lb8r2BNzDNu",
   "cotas": ['2021'],
   "criadoa": "2021-12-12"
 },
 {
   "socioN": 371,
   "nome": "Silverio Esteves",
   "morada": "Valverde",
   "aniversario": "",
   "contacto": "",
   "email": "",
   "pack": "8gEAqxGyA4iQlHYyUOoL",
   "cotas": ['2018','2019','2020','2021'],
   "criadoa": "2018-12-12"
 }
] 
                
                
                jsonObj.forEach((doc) => {

                    this.socio.socioN = doc.socioN;
                    this.socio.nome = doc.nome;
                    this.socio.morada = doc.morada;
                    this.socio.aniversario = doc.aniversario;
                    this.socio.contacto = doc.contacto;
                    this.socio.email = doc.email;
                    this.socio.pack = doc.pack;
                    this.socio.criadoa = doc.criadoa;
                    this.socio.cotas = doc.cotas;

                     firebasedatabase
                    .collection('/Socio')
                    .add(this.socio)
                    .then(() =>{
                        
                        console.log('SOCIO ' + this.socio.nome +' Inserido!');
                        
                        this.socio.socioN = '';
                        this.socio.nome = '';
                        this.socio.morada = '';
                        this.socio.aniversario = '';
                        this.socio.contacto = '';
                        this.socio.email = '';                        
                        this.socio.pack = '';
                        this.socio.criadoa = '';
                        this.socio.cotas = '';

                    
                    })
                    .catch((error) =>{
                        console.log(error);
                    })

                    
                })


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