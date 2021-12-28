
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
var vDismissAlert = 3
var vDismissAlert_long = 6


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
    
    , dismissAlert: vDismissAlert
    , dismissAlert_long : vDismissAlert_long

    , search_cota_not_found: 'Não foi encontrada nenhuma cota.'
    , check_lable_cotas_ok: 'Cotas pagas'
    , check_lable_cotas_nok : 'Nenhuma cota paga até ao momento!'

    , update_msg_confirm : 'Deseja mesmo atualizar os dados do Sócio {{x_x}}?'
    , delete_msg_confirm : 'Deseja apagar o sócio {{x_x}}?'
    , delete_msg_double_confirm: 'Quer prosseguir com a remoção?\n(Está operação não será possivel de reverter)\nSócio a remover : {{x_x}}'
    
    , add_msg: 'Sócio ({{x_x}}) adicionado com sucesso!'
    , update_msg: 'Sócio ({{x_x}}) actulizado com sucesso!'
    , delete_msg: 'Sócio {{x_x}} removido com sucesso!'

    , btn_socio_new : 'Novo Sócio'
    , btn_socio_edit: 'Editar Sócio'


    // COTAS MODAL
    , replace_cotas_str : vReplaceStr
    , cotas_update_msg_confirm: 'Quer mesmo realizar a atualização?\n{{x_x}}'
    

    , cotas_old_missing_on_update_confirm: 'Cotas anteriormente pagas não se encontram na atualização.\nAs cotas em falta são: {{x_x}}\nDeseja continuar?'
    
    , cotas_update_msg: 'Cota(s) actualizada(s) no socio {{x_x}}'
    , cotas_delete_msg: 'Cota(s) removida(s) no socio {{x_x}}'

    , cotas_socio_no_pack_error: 'Sócio {{x_x}} não tem nenhum pacote associado.\nVerifique os campos do mesmo.'
    , cotas_socio_admin_error : 'Consulte o administrador do site.\n Anote o numero de sócio ou nome do sócio.\nPode utilizar a função de "reporte" que se encontra na pagina principal.'


}


const vReport_configs = {

    option_issue_or_improve: [
        {value : null, text: 'Escolher opção', disabled : true},
        {value : 'Improvment', text: 'Melhoria'},
        {value : 'Issue', text: 'Corrigir'},
        {value : 'Other', text: 'Outra'},
    ]


    , option_windows : [
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
        },
        {
            label : 'Email',
            options : [
                {value : 'EmailCotas', text : 'Email Cotas Layout'}
            ]
        },
        {
            label: 'Administrador',
            options: [
                {value : 'To_Admin' , text : 'Comunicar problema'}
            ]
        }
    ]

    
    , report_send_email_msg_confirm : 'Deseja mesmo enviar o email?'
    , report_msg_alert: 'Email enviado com sucesso. Irá ser tratado com a maior brevidade possivel.'

}





export const tableConfig    = vueTable_config;
export const report_config = vReport_configs;

export const cotas_config   = vCotas_configs;
export const pack_config    = vPacks_configs;
export const socio_config   = vSocio_configs;