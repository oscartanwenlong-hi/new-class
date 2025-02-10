import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

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

// **🔥 获取当前用户信息**
onAuthStateChanged(auth, (user) => {
    if (user) {
        // 用户已登录，显示邮箱
        document.getElementById("user-email").innerText = `欢迎，${user.email}`;
    } else {
        // 没有登录，跳回登录页
        window.location.href = "index.html";
    }
});

// **🔥 退出登录**
document.getElementById("logout-btn").addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            console.log("用户已退出");
            window.location.href = "index.html"; // 退出后返回登录页
        })
        .catch((error) => {
            console.error("退出失败 ❌", error.message);
        });
});
