<template>
    <div>
            <b-modal 
                id="modal-XXX" 
                :title="socioNome" 
                button-size="sm"
                hide-footer
                hide-header-close
            >
                
                <!-- Este modal nao ira precisar de nenhum alert -->
                <!-- <form @submit.prevent="onRegistaEditaCotaFormSubmit" >
                
                    <div class="form-group">

                        <b-input-group size="sm"  prepend="Numero Sócio">
                            <b-form-input
                                type="number" 
                                v-model="socioByID.socioN" 
                                id="cotaSocioN" 
                                name="cotaSocioN" 
                                class="form-control" 
                                disabled
                            >
                            </b-form-input>
                        </b-input-group>

                    </div>        

                    <div class="form-group">

                        <b-input-group size="sm"  prepend="Pack">
                            <b-form-input
                                type="text" 
                                v-model="packByID.packNamePreco" 
                                id="cotaPack" 
                                name="cotaPack" 
                                class="form-control" 
                                disabled
                            >
                            </b-form-input>
                        </b-input-group>

                    </div>    


                    <b-alert show variant="warning" v-if="checkTagsJaPagasMasRemovidas.length > 0">
                        <span> 
                            Cota(s) já paga(s) mas removida(s) <br>
                            <li v-for="(item, index) in checkTagsJaPagasMasRemovidas" v-bind:key="index">{{item}}</li>
                        </span>
                    </b-alert>

                    <div class="form-group">
                        
                        <b-form-group 
                            :label="checkLableCotasJaPagas" 
                            label-for="tags-with-dropdown"
                        >
                            
                            <b-form-tags id="tags-with-dropdown" v-model="value" no-outer-focus class="mb-2">
                                <template v-slot="{ tags, disabled, addTag, removeTag }">
                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                        <b-form-tag
                                            @remove="removeTag(tag)"
                                            :title="tag"
                                            :disabled="disabled"
                                            :variant="valueVarient"
                                        >
                                            {{ tag }}
                                            
                                        </b-form-tag>
                                    </li>
                                </ul>

                                <b-dropdown size="sm" variant="outline-success" block menu-class="w-100">
                                    <template #button-content>
                                    <b-icon icon="calendar-check"></b-icon> Cotas em dívida({{availableOptions.length}}).
                                    </template>
                                    
                                    <b-dropdown-form @submit.stop.prevent="() => {}">
                                        <b-form-group
                                            label="Pesquisar"
                                            label-for="tag-search-input"
                                            label-cols-md="auto"
                                            class="mb-0"
                                            label-size="sm"
                                            :description="searchDesc"
                                            :disabled="disabled"
                                            variant="success"
                                        >
                                            <b-form-input
                                                v-model="search"
                                                id="tag-search-input"
                                                type="search"
                                                size="sm"
                                                autocomplete="off"
                                            >
                                            </b-form-input>
                                        </b-form-group>
                                    </b-dropdown-form>
                                    
                                    <b-dropdown-divider></b-dropdown-divider>
                                    
                                    <b-dropdown-item-button
                                        v-for="option in availableOptions"
                                        :key="option"
                                        @click="onOptionClick({ option, addTag })"
                                    >
                                        {{ option }}
                                    </b-dropdown-item-button>
                                    <b-dropdown-text v-if="availableOptions.length === 0 && search.length === 0">
                                    Não existem cotas de momento.
                                    </b-dropdown-text>
                                </b-dropdown>
                                </template>
                            </b-form-tags>
                    </b-form-group>


                    </div>

                    <span v-if="valoraPagar > 0">
                    
                        <div class="form-group">
                            <b-row class="my-1">
                                <b-col sm="5">
                                <label for="input-default">Valor a pagar:</label>
                                </b-col>
                                <b-col sm="5">
                                    <fieldset disabled>
                                        <b-input-group prepend="€" >
                                            <b-form-input v-model="valoraPagar" :state="true">
                                            </b-form-input>
                                        </b-input-group>
                                    </fieldset>                            
                                </b-col>
                            </b-row>
                        </div>

                    </span>



                
                </form> -->

            </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'PagarCotas',
        props : {
            socioKey :  String,
            socioNome : String, 
            socioCotas : Array,
            // function : this.xptoTest       
            }
        
        , computed : {
        
        }

        , created() {
            
            this.xptoTest();

        }


        , methods : {
            xptoTest (){
                console.log(':::: SOCIO KEY : '  + this.socioKey)
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>