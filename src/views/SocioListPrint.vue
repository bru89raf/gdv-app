<template>
    
    <div>
<!-- 
         <b-container>
            
            <b-row>
                <div class="form-group">
                    <b-form-group
                        label="Stacked (vertical) switch style checkboxes"
                        v-slot="{ ariaDescribedby }"
                    >
                        <b-form-checkbox-group
                                v-model="selectedColumnsDownload"
                                :options="options"
                                :aria-describedby="ariaDescribedby"
                                switches
                                stacked
                            ></b-form-checkbox-group>
                    </b-form-group>
                
                
                </div>


            
            </b-row>

         </b-container> -->





        
        <div class="d-flex justify-content-center mb-3">
            Download Excel
        </div>

         
        <!-- <div id="btnPrepararDownload" v-show="!showDivDownloadButton" >
            <b-button 
                pill 
                variant="success"
                @click="preparDownload()"
            >Prepara Download</b-button>        
        </div>  -->




        <!-- <div class="d-flex justify-content-center mb-3" v-show="showDivDownloadButton"> -->
        <div v-show="showDivDownloadButton">
          
            <vue-excel-xlsx
                :data="data"
                :columns="columns"
                :filename="filename"    
                :sheetname="sheetname"
                :disabled="downlodStatusDisable"
            >  


                        
                <b-spinner 
                    small
                    v-if="flagToDownloadFile"
                ></b-spinner>
                            
                        
                <label v-if="!flagToDownloadFile">Download</label>

            </vue-excel-xlsx>

        </div>



    </div>
    


</template>

<script>
    import { firebasedatabase } from '../firebaseDb'
    // import 'vue-good-table/dist/vue-good-table.css'
    // import { VueGoodTable } from 'vue-good-table';
    // import VueHtmlToPaper from 'vue-html-to-paper'
    //import VueHtml2pdf from 'vue-html2pdf'

    export default {
        data() {
            return{
                socios : []
                , cotasAbertas : []
                               
                , rows : []
                
                , filename : "GDV_Socios"
                , sheetname : "Socios Cotas"
                , data : []
                , columns : [
                    {
                        label : "Num. Sócio",
                        field : "socioN"
                    },
                    {
                        label : "Nome",
                        field : "nome"
                    },
                    {
                        label : "Morada",
                        field : "morada"
                    },
                    {
                        label : "Aniversário",
                        field : "aniversario"
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
                    {
                        label : "Criado a",
                        field : "criadoa"
                    }
                ]

                , flagToDownloadFile : true
                , downlodStatusDisable : false

                , showDivDownloadButton : true

                , selectedColumnsDownload: ['socioN', 'nome', 'cotasPagas', 'cotasPorPagas'], // Must be an array reference!
                options: [
                        { text: 'Num. Socio', value: 'socioN' ,disabled: true},
                        { text: 'Nome', value: 'nome', disabled: true},
                        { text: 'Morada', value: 'morada'},
                        { text: 'Aniversário', value: 'aniversario' },
                        { text: 'NIF', value: 'nif' },
                        { text: 'Contacto', value: 'contacto' },
                        { text: 'Cota já Pagas', value: 'cotasPagas', disabled: true },
                        { text: 'Cota em Divida', value: 'cotasPorPagas' ,disabled: true },
                        { text: 'Data de Criação', value: 'criadoa'  }
                ]


            }
        },


        methods : {

            getAllCotas(){
                firebasedatabase
                    .collection('/cotas')
                    .onSnapshot((snapShot) => {
                        this.cotasAbertas = [];
                        
                        snapShot.forEach((doc) => { 
                            
                            this.cotasAbertas.push (
                                    doc.data().ano
                                )

                        })
                        

                    })
              

            }

            , preparDownload(){
                console.log('PREPAR DOWNLOAD : ' + this.selectedColumnsDownload);

                this.getSociosToPrint();

                this.showDivDownloadButton = true;



            }

            , getSociosToPrint(){
                firebasedatabase
                .collection('/Socio')
                .onSnapshot((snapshot) =>{
                    this.rows = [] ;
                            
                    

                    snapshot.forEach((doc) =>{
                        
                        let cotasSort = doc.data().cotas ;
                        let haveCotas = cotasSort.length>2?true:false;
                        if(haveCotas) cotasSort.sort();

                        // SOCIO CREATION YEAR
                        let socioCriadoA_year = (new Date(doc.data().criadoa).getFullYear());
                        let criadoaYear = socioCriadoA_year;
                        

                        let cotasAbertarAfterSocioCreation = this.setCotasAbertasByUser(criadoaYear);

                        //check cotas por pagar:
                        let vCotasporpagar = this.getCotasPorPagar(cotasAbertarAfterSocioCreation, cotasSort)
                        let haveCotasPorPagar = vCotasporpagar.length>0?true:false;
                        
                        // console.log('COTAS ABERTAS AFTER SOCIO CREATION : ' + JSON.stringify(cotasAbertarAfterSocioCreation) 
                        //                 + ' || ' + doc.data().socioN
                        //                 + ' || ' + vCotasporpagar
                        //                 + '(' + vCotasporpagar.length +')'
                        //                 )
                        
                        if(haveCotasPorPagar) vCotasporpagar.sort();
                        
                        // add default field on the objet
                        // this.rows.push({
                        //     socioN : doc.data().socioN,
                        //     nome : doc.data().nome, 
                        //     cotasPagas :  haveCotas?cotasSort.join('|'):'',
                        //     cotasPorPagar : haveCotasPorPagar?vCotasporpagar.join('|'):''
                        // })
                        
                        // if(this.selectedColumnsDownload.includes('morada')) this.rows.push({morada : doc.data().morada})
                        // if(this.selectedColumnsDownload.includes('aniversario')) this.rows.push({aniversario : doc.data().aniversario})
                        // if(this.selectedColumnsDownload.includes('nif')) this.rows.push({nif : doc.data().nif})
                        // if(this.selectedColumnsDownload.includes('contacto')) this.rows.push({morada : doc.data().contacto})
                        // if(this.selectedColumnsDownload.includes('criadoa')) this.rows.push({criadoa : doc.data().criadoa})



                        this.rows.push({
                            socioN : doc.data().socioN,
                            nome : doc.data().nome,
                            morada : doc.data().morada,
                            aniversario : doc.data().aniversario,
                            nif : doc.data().nif,
                            contacto : doc.data().contacto,
                            email : doc.data().email,
                            cotasPagas :  haveCotas?cotasSort.join('|'):'',
                            cotasPorPagar : haveCotasPorPagar?vCotasporpagar.join('|'):''
                           , criadoa : doc.data().criadoa,   
                        })
                    })

                    this.data = this.rows
                    this.data.sort(function(a, b) {
                         if (a.socioN > b.socioN) {
                            return 1;
                        }
                        if (a.socioN < b.socioN) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })

                    // console.log("ROWS")
                    // console.log(JSON.stringify(this.rows));
                    setTimeout(() => { this.flagToDownloadFile = false }, 5000)
                    //this.flagToDownloadFile = false
                })
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
                let miss = cotasAfterCreation.filter (yea => !cotasPagas.includes(yea));
                return miss

            }

            , test (){
                console.log('TEST TESTE');
            }
        },

        components : {

        },

        created() {
            
            this.getAllCotas();          
                        
            setTimeout( () => {
                this.getSociosToPrint();
                
            }, 2000 );
            
            
            
            


        }





    }
</script>

<style lang="scss" scoped>



</style>