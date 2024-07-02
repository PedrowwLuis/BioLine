import { auth } from './firebase.js'
import { signInWithEmailAndPassword , signOut , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js"

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.querySelector('.form-login')
    const emailInput = document.querySelector('.email-admin')
    const senhaInput = document.querySelector('.senha-admin')
    const linksair = document.querySelector ('.link-sair')
    const formpost = document.querySelector ('.form-post')
    const titulologin = document.querySelector('.titulo-login')
    const mensagens = document.querySelector('.mensagens')

    //Mensgens
    const LogadoSucesso = () =>{
        mensagens.innerHTML ='Usuário logado com sucesso'
    }
    
    const VerifiqueConexao = ( )=>{
        mensagens.innerHTML ='Verifique sua conexão ou email e senha'
    }

    const LogoutSucesso = () =>{
        mensagens.innerHTML = 'Logout realizado com sucesso'
    }

    const ErroInesperado = () => {
        mensagens.innerHTML = 'Um erro inesperado aconteceu'
    }

    
    //Evento de login
    if (formLogin){
        formLogin.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = emailInput.value
        const senha = senhaInput.value

            signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user
                LogadoSucesso()
                emailInput.value = ''
                senhaInput.value = ''
            })
            .catch(()=>{
                VerifiqueConexao()
            })
        
        })  
    }
    //Evento logout
   if(linksair) {
    linksair.addEventListener('click',() => {
        signOut(auth).then(()=>{
            LogoutSucesso()
        })
        .catch(()=> {
            ErroInesperado()
        })
    })
}
//Mudança de estado
        onAuthStateChanged(auth,(user) => { 
            if(user){
                const uid = user.uid
                if(linksair) linksair.classList.remove('hide')
                if(formLogin) formLogin.classList.add('hide')
                if(formpost) formpost.classList.remove('hide')
                if(titulologin) titulologin.innerHTML = 'ACESSO AO ADMINISTRADOR LIBERADO'

            }else{
               if(linksair) linksair.classList.add('hide')
               if(formLogin) formLogin.classList.remove('hide')
               if(formpost) formpost.classList.add('hide')
               if(titulologin) titulologin.innerHTML = 'FAÇA O LOGIN COMO ADMINISTRADOR PARA LIBERAR O ACESSO' 

            }
        })
    })