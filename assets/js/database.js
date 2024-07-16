import { database, storage } from "./firebase.js";
import { set, ref as databaseRef, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js"
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js"

document.addEventListener('DOMContentLoaded', () => {
    //Declarando as variaveis
    const formPost = document.querySelector('.form-post')
    const tituloPost = document.querySelector('.titulo-post')
    const imagempost = document.querySelector('.imagem-post')
    const mensagempost = document.querySelector('.mensagem-post')
    const datapublicacaoPost = document.querySelector('.data-publicacao-post')
    const autorpost = document.querySelector('.autor-post')
    const sendPost = document.querySelector('.send-post')
    const divConteudos = document.querySelector ('.conteudos')
    
    const postsRef = databaseRef(database, 'posts')


if(sendPost && tituloPost && mensagempost && datapublicacaoPost && autorpost && imagempost){
    //Grava informações
    const enviarpost = (postId, titulo, mensagem, data, autor, imagemUrl) => {
        return set(databaseRef(database, `posts/${postId}`), {
            titulo,
            mensagem,
            data,
            autor,
            imagemUrl
        })
    }

    //Envia os dados gravados
    sendPost.addEventListener('click', () => {
        const postId = new Date().getTime().toString()
        const titulo = tituloPost.value
        const mensagem = mensagempost.value
        const data = datapublicacaoPost.value
        const autor = autorpost.value
        const imagem = imagempost.files[0]

        if(imagem){
            const imagemRef = storageRef(storage, `post/${postId}/${imagem.name}`)
            uploadBytes(imagemRef, imagem)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            enviarpost(postId, titulo, mensagem, data, autor, url)
                                .then(() => {
                                 tituloPost.value='',
                                 mensagempost.value='',
                                 datapublicacaoPost.value='',
                                 autorpost.value='',
                                 imagempost.value=''
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        })
                })
            }
        })
    }
    const listarPosts = (conteudos)=>{
        onValue (postsRef,(snapshot)=>{
           const posts = snapshot.val()
           divConteudos.innerHTML= ''
           if(posts){
            const postsIds = Object.keys(posts)
            postsIds.forEach((postId)=>{
                const post = posts[postId]
                const postElement = document.createElement('div')
                postElement.innerHTML =`
                <h2 class="mt-5 fw-bold text-center text-success">${post.titulo}</h2>
                <div class="decoration-bar"></div>

                `
                divConteudos.appendChild(postElement)
            })
        }else{
            divConteudos.innerHTML='<p class="mt-5 fw-bold text-center text-success"> Nenhum post encontrado </p>'
           } 
        })
    }
    listarPosts()
})