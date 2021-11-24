<template>
    
    <!-- 
        
        Not in use for now
        Maybe we will used this on the future updates.

     -->
    
    
    <div>
        <b-sidebar id="sidebarDownloadList" title="Socio Extract" shadow>
            <div class="px-3 py-2">
                <p>                
                    De momento só esta disponivel a extração para EXCEL(.xlsx).
                </p>
                <!-- <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img> -->

                <div class="d-flex justify-content-center mb-3">
                    
                    
                                        
                    
                    
                    <b-button  @click.prevent="generateFile()" class="btn btn-danger">
                        
                        
                        <span v-if="!flagToDownloadFile" >
                            <vue-excel-xlsx
                            :data="dataExcel"
                            :columns="columns"
                            :filename="filename"    
                            :sheetname="sheetname"
                            >     
                            Download Ficheiro
                            </vue-excel-xlsx>

                        </span>
                        <span v-else>
                                  <b-spinner 
                            small
                            v-if="flagToDownloadFile"
                        >
                        A preparar ficheiro...
                        </b-spinner>
                            

                        </span>

                        
                   
                   
                   
                    </b-button> 


                    <!-- <vue-excel-xlsx
                        :data="dataExcel"
                        :columns="columns"
                        :filename="filename"    
                        :sheetname="sheetname"
                    >  
                        
                        <b-spinner 
                            small
                            v-if="flagToDownloadFile"
                        ></b-spinner>
                            
                        
                        <label v-if="!flagToDownloadFile">Download</label>
                    </vue-excel-xlsx> -->
                
                </div>





            </div>
        </b-sidebar>
    </div>
</template>

<script>
    import { firebasedatabase } from '../firebaseDb'

    export default {
        name : "down-list-socio"


        , components : {
    
        }


        , data(){
             
            return {
                
                cotasAbertas : []
                , rows : []
                , filename : "GDV_Socios"
                , sheetname : "Socios Cotas"
                , dataExcel : []
                , columns : [
                    {
                        label : "Nome",
                        field : "nome"
                    },
                    {
                        label : "NIF",
                        field : "nif"
                    },
                    {
                        label : "Contacto",
                        field : "contacto"
                    },
                    {
                        label : "Já Pagas",
                        field : "cotasPagas"
                    },
                    {
                        label : "Em divida",
                        field : "cotasPorPagar"
                    },
                ]

                , flagToDownloadFile : true    


            }

        }

        , created() {
            // obter todas as cotas (sem filtros)
             this.getAllCotas();
            // obter lista completa dos socios
            // this.getSociosToPrint();
        }


        , methods : {
            
            async getAllCotas(){
                firebasedatabase
                    .collection('/cotas')
                    .onSnapshot((snapShot) => {

                        this.cotasAbertas = [];
                        snapShot.forEach((doc) => { 
                            
                            this.cotasAbertas.push (
                                    doc.data().ano
                                )

                        })
                        // console.log("GET ALL COTAS");
                        // console.log(this.cotasAbertas);

                    })
            }        

            , async getSociosToPrint(){
                firebasedatabase
                .collection('/Socio')
                .onSnapshot((snapshot) =>{
                    // this.rows = [] ;
                    this.dataExcel = [] ;
                                        
                    snapshot.forEach((doc) =>{
                        
                        let cotasSort = doc.data().cotas ;
                        cotasSort.sort();

                        // SOCIO CREATION YEAR
                        let socioCriadoA_year = (new Date(doc.data().criadoa).getFullYear());
                        let criadoaYear = socioCriadoA_year;
                        

                        let cotasAbertarAfterSocioCreation = this.setCotasAbertasByUser(criadoaYear);

                        //check cotas por pagar:
                        let cotasporpagarFilter = this.getCotasPorPagar(cotasAbertarAfterSocioCreation, cotasSort)

                        cotasporpagarFilter.sort();
                        // console.log("Cotas Por pagar By User");
                        // console.log(cotasporpagar);

                        this.dataExcel.push({
                            // key : doc.id,
                            nome : doc.data().nome,
                            // morada : doc.data().morada,
                            nif : doc.data().nif,
                            contacto : doc.data().contacto,
                            // email : doc.data().email,
                            // criadoa : doc.data().criadoa,   
                            cotasPagas :  cotasSort.join('|'),
                            cotasPorPagar : cotasporpagarFilter.join('|')
                        })
                    })

                    // this.data = this.rows

                    setTimeout(() => { this.flagToDownloadFile = false }, 5000)
                    // console.log(this.dataExcel)
                })
            }  

            , generateFile(){
                //this.getAllCotas();
                this.getSociosToPrint();
                alert("generate file end")
            }



            , setCotasAbertasByUser(creationYear){
                let openYears  = []

                this.cotasAbertas.forEach( (doc) =>{
                    
                    if (doc >= creationYear){
                        openYears.push(doc);
                    }

                });
             

                return openYears;

            }
            

            , getCotasPorPagar(cotasAfterCreation, cotasPagas){
                // console.log("GET COTAS POR PAGAR")
                // console.log(cotasAfterCreation)
                // console.log(cotasPagas)
                let miss = cotasAfterCreation.filter (yea => !cotasPagas.includes(yea));
                return miss

            }
            
            

        }


  

    }




</script>

<style lang="scss" scoped>

</style>