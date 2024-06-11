import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.querySelector('.email-admin');
    const senhaInput = document.querySelector('.senha-admin');
    const FormLogin = document.querySelector('.form-login');
    const linkSair = document.querySelector('.link-sair');
    const linkAdmin = document.querySelector('.link-admin');
    const FormPost = document.querySelector('.form-login')
    const TituloLogin = document.querySelector('.titulo-login')

    if (FormLogin) {
        FormLogin.addEventListener('submit', (e) => {
            e.preventDefault()
            const email = emailInput.value
            const password = senhaInput.value
            signInWithEmailAndPassword(auth, email, password)
                .then((usercredential) => {

                    const user = usercredential.user
                    emailInput.value = ''
                    emailInput.value = ''
                    alert('deu certo')
                    console.log(user)

                })
                .catch((error) => alert(error.message))
        })
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            linkAdmin.classList.add('hide')
            linkSair.classList.remove('hide')
            FormLogin.classList.add('hide')
            FormPost.classList.remove('hide')
            TituloLogin.innerHTML = "ACESSO AO ADMINISTRADOR LIBERADO"
        } else {

            linkAdmin.classList.remove('hide')
            linkSair.classList.add('hide')
            FormLogin.classList.remove('hide')
            FormPost.classList.add('hide')
            TituloLogin.innerHTML = "FAÇA LOGIN COMO ADMINISTRADOR"

        }
    })


})
