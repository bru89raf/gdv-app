<template>
    
    <!-- 
        
        Not in use for now
        Maybe we will used this on the future updates.

     -->
    
    
    <div>
        <b-sidebar 
            ref="refSidebarReport"  
            id="sidebarReport" 
            title="Reportar" 
            shadow
            backdrop-variant="dark"
            backdrop
            >
            <!-- <div class="px-3 py-2">
                <p>                
                   Reportar correção ou melhoria
                </p>

                <div class="d-flex justify-content-center mb-3">
 
                <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>

                </div>

            </div> -->
            <div class="px-3 py-2">   
                <form @submit.prevent="sendEmail" >
                    
                     <div class="form-group">

                            <b-input-group size="sm"  prepend="Tipo">
                                <b-form-select 
                                    v-model="report.issueOrImprovment" 
                                    :options="optionsIssueImprovment"
                                    value-field="value"
                                    text-field="text"
                                    id="janelaReport"  
                                    name="janelaReport" 
                                    placeholder="Escolher opção"
                                    required
                                    
                                    >
                                </b-form-select>     
                                    <!-- :state="packValidation" -->
                            </b-input-group>                           
                    </div>


                    <div class="form-group">
                            <b-input-group size="sm"  prepend="Janela ">
                                <b-form-select 
                                    v-model="report.janelaReport" 
                                    :options="optionsToReport"
                                    value-field="value"
                                    text-field="text"
                                    id="janelaReport"  
                                    name="janelaReport" 
                                    placeholder="Escolher opção"
                                    required
                                    
                                    >
                                </b-form-select>     
                                    <!-- :state="packValidation" -->
                            </b-input-group>                           
                    </div>

                    <div class="form-group">
                        <b-input-group size="sm"  prepend="Descrição ">
                            <b-form-textarea
                                id="packModalDescription"
                                size="sm"
                                placeholder="Descrição"
                                v-model="report.description"
                                rows="2"
                                required
                            ></b-form-textarea>
                        </b-input-group>
                            
                    </div>

                    <div class="form-group">
                     <b-button 
                            variant="danger" 
                            class="mt-1" 
                            block 
                            type="submit"
                            title="Enviar Email"
                        >    
                            
                             <b-icon icon="envelope"></b-icon>  
                        </b-button>
                        
                    </div>


                </form>
            </div>    

        </b-sidebar>
    </div>
</template>

<script>
   import emailjs from 'emailjs-com';

    export default {
        name : "sibeBarReportIssueOrImprove"  



        , data(){
             
            return {
                
                vEmail : this.$emailjscom
                , vEmailS : this.$emailS
                , vEmailT : this.$emailT


                , report : {
                    janelaReport : null
                    ,issueOrImprovment : null
                    , description : ''
                    
                }       
                
                , optionsToReport : [
                    {value : null, text: 'Escolher opção', disabled : true},
                    {
                        label : 'Sócios',
                        options : [
                            {value : 'SocioList', text: 'Lista de Sócios'},
                            {value : 'SocioNew', text: 'Novo Sócio'},
                            {value : 'SocioUpdate', text: 'Atualizar Sócio'},
                        ]
                    },
                    {
                        label : 'Pagar Cotas',
                        options : [
                            {value : 'SocioCotas', text: 'Pagar Cota'}
                        ]
                    },
                    {
                        label : 'Packs', 
                        options : [
                            {value : 'PackList', text: 'List Packs'},
                            {value : 'PackNovo', text: ' Novo Pack'},
                            {value : 'PackUpdate', text: 'Atualiza Pack'},
                        ]
                    }, 
                    {
                        label : 'Cotas (anos)',
                        options : [
                            {value : 'CotaList', text: 'Lista de Cotas (anos)'},
                            {value : 'CotaNova', text: 'Nova Cotas (ano)'},
                        ]
                    }




                    
                ]
                
                , optionsIssueImprovment : [
                    {value : null, text: 'Escolher opção', disabled : true},
                    {value : 'Improvment', text: 'Melhoria'},
                    {value : 'Issue', text: 'Corrigir'},
                ]
               


            }

        }

        , created() {
       
        }


        , methods : {
            
            reportFormSubmit() {

                console.log(this.report)

            }


            , sendEmail() {
                // console.log(this.report.janelaReport)
                // console.log(this.report.issueOrImprovment)
                // console.log(this.report.description)
                // console.log(JSON.stringify(e))
                
                let templateParam = {
                    typeofissue : this.report.issueOrImprovment,
                    janelaReport : this.report.janelaReport,
                    message : this.report.description
                }


               

                try {
                    emailjs.send(
                        this.vEmailS, 
                        this.vEmailT, 
                        templateParam ,
                        this.vEmail, 
                    
                    )
                    .then(() => {
                        alert('Email enviado com sucesso para o administrador.');
                        this.cleanReportFormAndClose();
                    })

                

                } catch(error) {
                    console.log({error})
                }

            } 


            , cleanReportFormAndClose(){
                
                this.sibeBar_close();

                this.report.issueOrImprovment = null
                this.report.janelaReport = null
                this.report.description = ''
                
            }


            , sibeBar_close(){
                this.$refs.refSidebarReport.hide();
            }

            , sibeBar_open(){
                this.$refs.refSidebarReport.open();
            }

            , sibeBar_toggle(){
                this.$refs.refSidebarReport.toggle();
            }

        }


  

    }




</script>

<style lang="scss" scoped>

</style>