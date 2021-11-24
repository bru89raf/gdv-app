<template>
      
   <b-container>
            
        <b-row>
            <b-card title="Edita Sócio">

                <form @submit.prevent="submitEditSocio"> 

                    <div class="form-group">
                        <b-input-group prepend="Numero Sócio">
                            <b-form-input
                                type="number" 
                                v-model="socio.socioN" 
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
                    </div>                        
                        
                    <div class="form-group">
                        
                        <b-input-group prepend="Nome">
                            <b-form-input 
                                v-model="socio.nome" 
                                placeholder="Nome" 
                                type="text"
                                required
                                :state="nameValidationUpdate"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="nameValidationUpdate">
                                Nome Obrigatorio
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div> 
                        
                    <div class="form-group">
                        <b-input-group prepend="Morada">
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
                        </b-input-group>
                    </div>

                    <div class="form-group">
                        <b-input-group prepend="Contacto">
                            <b-form-input 
                                v-model="socio.contacto" 
                                type="number"
                                placeholder="Contacto" 
                                required
                                :state="contactoValidation"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="contactoValidation">
                                <span v-if="undefined !==socio.contacto && socio.contacto.length>9">Tamanho do contacto errado</span>
                                <span v-else>Contacto Obrigatorio</span>                                        
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div>

                    <div class="form-group">
                        <b-input-group prepend="Email">
                            <b-form-input 
                                v-model="socio.email" 
                                type="email"
                                placeholder="email" 
                            ></b-form-input>
                        </b-input-group>
                    </div>
                            
                    <div class="form-group">
                        <b-input-group prepend="NIF">
                            <b-form-input 
                                v-model="socio.nif" 
                                type="number"
                                placeholder="NIF"                                     
                                :state="nifValidation"
                            ></b-form-input> 
                            <b-form-invalid-feedback :state="nifValidation">
                                <span v-if="undefined!==socio.nif && socio.nif.length!=9">NIF errado. </span> 
                                <span v-else>Obrigatorio</span>
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                            </b-form-valid-feedback>
                        </b-input-group>
                    </div>                            

                    <div class="form-group">
                        <b-input-group prepend="Pack ">
                            <b-form-select 
                                v-model="socio.pack" 
                                :options="packList"
                                value-field="value"
                                text-field="text"
                                id="socioPack"  
                                placeholder="Escolher Pack"
                                name="socioPack" 
                                required
                                :state="packValidation"
                                >
                            </b-form-select>     
                        </b-input-group>                           
                    </div>

                    <div class="form-group">                                    
                        
                        <b-button pill variant="success" type="submit">
                            <b-icon icon="arrow-repeat" ></b-icon>
                        </b-button>


                        <b-button pill variant="outline-primary" @click="backToSocioList()" icon="arrow-up">
                            <b-icon icon="arrow-left" aria-hidden="true"></b-icon>     
                        </b-button>                             


                    </div>

                </form>
            
            </b-card>                
        </b-row>
   </b-container>
</template>

<script>

    import {firebasedatabase} from '../firebaseDb';
    import { required , numeric ,minLength } from 'vuelidate/lib/validators'


    export default {
        data (){
            return {
                 socio : {}

                 , submitted : false

                 , packList : []

                 , listOfSocioN : []
                 , originalSocioN : ''

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

        }
        
        , validations : {
                socio : {
                    // nome : { required, isNameValid: helpers.regex('isNameValid',/^[a-zA-Z_ ]*$/i)},
                    nome : { required },
                    morada : { required},
                    contacto : {required, numeric},
                    nif : {required, numeric, minLength: minLength(9) },
                }

        }


        , methods : {
            

            backToSocioList(){
                
                if (window.confirm("Deseja mesmo Sair?\nAs alterações efetuadas serão descartadas. ")){
                    this.$router.push('/SocioList')
                }
                

            }

            , submitEditSocio() {
      
                
                let updateValidForm = this.formIsValid.vsocion
                                    &&this.formIsValid.vname 
                                    && this.formIsValid.vmorada 
                                    && this.formIsValid.vcontacto 
                                    && this.formIsValid.vnif;

                                  

                if (updateValidForm) {
                    if(window.confirm("Deseja mesmo atualizar os dados do Sócio?")){
                        firebasedatabase
                            .collection('/Socio')
                            .doc(this.$route.params.id)
                            .update(this.socio)
                            .then(() => {
                                alert('Sócio atualizado com Sucesso!')
                                this.submitted = false;
                                this.$router.push('/SocioList');
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                }
            }


            , getAllSocioNumbers(){
                firebasedatabase
                    .collection('/Socio')
                    .onSnapshot((snapshot) => {
                        snapshot.forEach((doc) => {
                                                        
                            this.listOfSocioN.push(doc.data().socioN)
                        })            
                        
                    })

                    // console.log(this.listOfSocioN);
            }




            // FORM VALIDAÇÕES
            , checkSocioNUpdateValidation(){

               let socioNConvert = this.listOfSocioN.join();
               let checkSocioN ;

               if( this.originalSocioN != this.socio.socioN ){
                   checkSocioN = !socioNConvert.includes(this.socio.socioN);
                   this.formIsValid.socion = false
               }else{
                   checkSocioN = true
                   this.formIsValid.vsocion = true
               }

                // console.log('checkSocioN: ' +  checkSocioN + ' ||| '+ this.formIsValid.vsocion);
               return checkSocioN;

            }
            , checkNameUpdateValidation(){
                
                
                if (undefined !== this.socio.nome) {

                    var vName ;
                    if(this.socio.nome.length>=4) {
                        vName = true;
                        this.formIsValid.vname = true;
                    }else{
                        vName = false;
                        this.formIsValid.vname = false;
                    }
                    return vName;
                }
            }  
            , checkMoradaUpdateValidation(){
                if (undefined !== this.socio.morada){
                    let vMorada = undefined !== this.socio.morada&&this.socio.morada.length==0?null:this.socio.morada.length > 4    
                    if(vMorada!=null) this.formIsValid.vmorada = vMorada;
                    return vMorada;
                }
            }
            , checkContactoUpdateValidation(){
                // TEMOS DE CONVERTER
                if (undefined !== this.socio.contacto){
                    let vContact = this.socio.contacto.toString().length==0?null:this.socio.contacto.toString().length === 9     
                    // let vContact = this.socio.contacto.length==0?null:this.socio.contacto.length === 9     
                    if(vContact!=null) this.formIsValid.vcontacto = vContact;
                    return vContact;
                }
            }
            , checkNifUpdateValidation(){
                if(undefined !== this.socio.nif){
                    let vNIF = this.socio.nif.length==0?null:this.socio.nif.length==9&&this.validateNIF(this.socio.nif)
                    if(vNIF!=null) {this.formIsValid.vnif = vNIF} else {this.formIsValid.vnif = true}
                    return vNIF;
                }
            }
            , checkPackUpdateValidation() {
                if(undefined === this.socio.pack || null === this.socio.pack){
                    return false;
                }else{
                    return true;
                }
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


        }

        
        
        , created() {

            
            let dbRef =  firebasedatabase
                .collection('/Socio')
                .doc(this.$route.params.id);

            dbRef.get()
                .then((doc) => {
                    // alert('get element by ID')
                    this.socio = doc.data();
                    this.originalSocioN = doc.data().socioN
                    this.socio.pack = this.socio.pack.length===0?null:this.socio.pack;
                })
                .catch((error) => {
                    console.log(error)
                })
            
            //   }, 5000);


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
                                // code : doc.id,
                                // label : doc.data().nome + ' (' + doc.data().preco + ' €)',
                                
                           })
                       })            

                        // console.log('PACK LIST: ' +  JSON.stringify(this.packList))
                        // console.log(this.socio.pack)
                    })

            
            // obter todos os SOCIOS N, para verificar no EDIT
            this.getAllSocioNumbers();



        }



        , computed : {
            
            socioNUpdateValidation(){
                return this.checkSocioNUpdateValidation();
            }

            , nameValidationUpdate(){
                return this.checkNameUpdateValidation();
            }

            , validateMorada(){
                return this.checkMoradaUpdateValidation();
            }

            , contactoValidation(){
                return this.checkContactoUpdateValidation()
            }
            , nifValidation(){
                return this.checkNifUpdateValidation();
            }
            , packValidation(){
                return this.checkPackUpdateValidation();
            }

        }



    }
</script>

<style lang="scss" scoped>

</style>