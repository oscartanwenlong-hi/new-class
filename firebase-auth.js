import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// 🔥 你的 Firebase 配置信息（如果已经初始化，就不用重复添加）
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

// 监听登录按钮
document.getElementById("login-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // 登录成功
            console.log("登录成功！✅", userCredential.user);

            // **🔥 这里是关键：跳转到 dashboard.html**
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("登录失败 ❌", error.message);
        });
});
