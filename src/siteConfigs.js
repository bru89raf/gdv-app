


const vueTable_config = {
        perPage : 5
        , perPageDropdown : [5, 10, 15]
        , nextLabel: 'prox.'
        , prevLabel: 'ant.'
        , rowsPerPageLabel: 'Por pag'
        , ofLabel: 'de'
        , allLabel: 'Todos'
        , placeholder : 'Pesquisar na lista'
        

    }

var vReplaceStr = '{{x_x}}'

const vCotas_configs = {
    minCotaAberta : 2018
    , maxCotaAberta : 2200 
    , replace_str : vReplaceStr
    , delete_msg_confirm: 'Quer mesmo remover o ano de cota ({{x_x}})?'
    , delete_msg_double_confirm :  'Acção não revertivel\nSe houverem sócio com esta cota, a mesma irá desaparecer ou dar erro no socio.\nAno cota a ser removido: {{x_x}}'
    , add_msg: 'Ano de cota ({{x_x}}) adicionado com sucesso!'
    , delete_msg : 'Ano de cota ({{x_x}}) removido com sucesso!'
}


const vPacks_configs = {
    replace_str : vReplaceStr
    , add_msg: 'Pack {{x_x}} adicionado com sucesso!'
    , update_msg: 'Pack ({{x_x}}) atualizado com sucesso!'
    , delete_msg: 'Pack ({{x_x}}) removido com sucesso!'
    
    , update_msg_confirm : 'Deseja mesmo atualizar o pack ({{x_x}})'
    , delete_msg_confirm: 'Deseja mesmo apagar o pack?'
    , delete_msg_double_confirm: 'Acção não revertivel.\nSe existerem sócios a utilizarem este pack, os mesmo irão ficar com erro (terá de os atualizar manualmente).\nPack a ser removido : {{x_x}}'
    
    , btn_pack_new : 'Novo Pacote'
    , btn_pack_edit: 'Editar Pacote'
    
    , packModalNome_min_length: 3
    , packModalPreco_min : 1.00


}


const vSocio_configs= {
    replace_str: vReplaceStr
    

    , search_cota_not_found: 'Não foi encontrada nenhuma cota.'
    

    , update_msg_confirm : 'Deseja mesmo atualizar os dados do Sócio {{x_x}}?'
    , delete_msg_confirm : 'Deseja apagar o sócio {{x_x}}?'
    , delete_msg_double_confirm: 'Quer prosseguir com a remoção?\n(Está operação não será possivel de reverter)\nSócio a remover : {{x_x}}'
    

    , add_msg: 'Sócio ({{x_x}}) adicionado com sucesso!'
    , update_msg: 'Sócio ({{x_x}}) actulizado com sucesso!'
    , delete_msg: 'Sócio {{x_x}} removido com sucesso!'



    , check_lable_cotas_ok: 'Cotas pagas'
    , check_lable_cotas_nok : 'Nenhuma cota paga até ao momento!'

    , btn_socio_new : 'Novo Sócio'
    , btn_socio_edit: 'Editar Sócio'


    // COTAS MODAL
    


}


export const tableConfig    = vueTable_config;
export const cotas_config   = vCotas_configs;
export const pack_config    = vPacks_configs;
export const socio_config   = vSocio_configs;