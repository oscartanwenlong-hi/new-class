// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// Firebase 配置
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

// 登录函数
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // 跳转到仪表盘
        })
        .catch((error) => {
            alert(error.message);
        });
}

// 注册函数
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registration successful! You can now login.");
        })
        .catch((error) => {
            alert(error.message);
        });
}

// 退出登录函数
function logout() {
    signOut(auth)
        .then(() => {
            alert("Logged out!");
            window.location.href = "index.html"; // 退出后返回登录页
        })
        .catch((error) => {
            alert(error.message);
        });
}
