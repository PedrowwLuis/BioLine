import { database } from "./firebase.js";
import { set, ref as databaseRef } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"
document.addEventListener('DOMContentLoaded',()=>{
 const formPost = document.querySelector('.form-post')
const tituloPost = document.querySelector('.titulo-post') 
const imagempost = document.querySelector('.imagem-post')
const mensagempost = document.querySelector('.mensagem-post')
const datapublicacaoPost = document.querySelector('.data-publicacao-post')
const autorpost = document.querySelector('.autor-post')
const sendPost = document.querySelector('.send-post')
  
const enviarpost = (postId,titulo,mensagem,data,autor)=>{
    return set(databaseRef(database, `posts/${postId}`),{
        titulo:titulo,
        mensagem:mensagem,
        data:data,
        autor:autor
    })
}


    sendPost.addEventListener('click',()=>{
        const postId = new Date().getTime().toString()
        const titulo = tituloPost.value
        const mensagem = mensagempost.value
        const data = datapublicacaoPost.value
        const autor = autorpost.value
    enviarpost(postId, titulo, mensagem, data, autor)
 })

   
})