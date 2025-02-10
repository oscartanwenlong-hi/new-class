import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJlO3qAn54oGa1T8Jwhj8O20ZUZeLE4wI",
    authDomain: "my-learning-platform-e2f91.firebaseapp.com",
    projectId: "my-learning-platform-e2f91",
    storageBucket: "my-learning-platform-e2f91.firebasestorage.app",
    messagingSenderId: "963544469209",
    appId: "1:963544469209:web:145e652a6f9fc234a7b8c8",
    measurementId: "G-51RWYK9K4Q"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// 把函数绑定到 window，确保 HTML 里可以调用
window.login = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            messageElement.style.color = "green";
            messageElement.innerText = "✅ 登录成功！";
        })
        .catch((error) => {
            messageElement.style.color = "red";
            messageElement.innerText = "❌ 登录失败：" + error.message;
        });
};

window.register = function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            messageElement.style.color = "green";
            messageElement.innerText = "✅ 注册成功！请登录。";
        })
        .catch((error) => {
            messageElement.style.color = "red";
            messageElement.innerText = "❌ 注册失败：" + error.message;
        });
};
