export const formFields = [
    {   
        id: Math.random().toString(36).substr(2, 9),
        name: 'url',
        label: 'URL a ser pesquisada',
        type: 'text',
        placeholder: 'Endereço com http:// ou https://',
        value:'',
        required: true
    },
    {
        id: Math.random().toString(36).substr(2, 9),
        name: 'palavra_chave',
        label: 'Palavra-chave',
        type: 'text',
        value:'',
        placeholder: 'Palavra-chave a ser encontrada nos links da página',
        required: false
    },
    {
        id: Math.random().toString(36).substr(2, 9),
        name: 'nome_pagina',
        label: 'Nome da busca',
        type: 'text',
        value:'',
        placeholder: 'Nome da busca',
        required: true
    }
 ]