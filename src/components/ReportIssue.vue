<template>
      
    
    <div>
        <b-sidebar 
            ref="refSidebarReport"  
            id="sidebarReport" 
            title="Reportar" 
            shadow
            backdrop-variant="dark"
            backdrop
            >

            <div class="px-3 py-2">   
                <form @submit.prevent="sendEmail" >
                    
                     <div class="form-group">

                            <b-input-group size="sm"  prepend="Tipo">
                                <b-form-select 
                                    v-model="report.issueOrImprovment" 
                                    :options="optionsIssueImprovment"
                                    value-field="value"
                                    text-field="text"
                                    id="selectTipo"  
                                    name="selectTipo" 
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
                                    id="selectJanela"  
                                    name="selectJanela" 
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
    import { report_config } from '../siteConfigs'

    export default {
        name : "sibeBarReportIssueOrImprove"  



        , data(){
             
            return {
                
                report : {
                    janelaReport : null
                    ,issueOrImprovment : null
                    , description : ''
                    
                }    
                
                , optionsIssueImprovment : report_config.option_issue_or_improve
                , optionsToReport : report_config.option_windows
                
            }

        }


        , methods : {
            
    

            sendEmail() {
                        
                let templateParam = {
                    typeofissue : this.report.issueOrImprovment,
                    janelaReport : this.report.janelaReport,
                    message : this.report.description
                }


                if(window.confirm(report_config.report_send_email_msg_confirm)) {
                    try {
                        emailjs.send(
                            process.env.VUE_APP_EMAIL_REPORT_SERVICE, 
                            process.env.VUE_APP_EMAIL_REPORT_TEMPLATE_REPORT, 
                            templateParam ,
                            process.env.VUE_APP_EMAIL_REPORT_ID
                        
                        )
                        .then(() => {
                            // alert('Email enviado com sucesso para o administrador.');
                            alert(report_config.report_msg_alert);
                            this.cleanReportFormAndClose();
                        })                
    
                    } catch(error) {
                        console.log({error})
                    }

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