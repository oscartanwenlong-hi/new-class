import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyBJlO3qAn...",
    authDomain: "my-learning-platform-e2f91.firebaseapp.com",
    projectId: "my-learning-platform-e2f91",
    storageBucket: "my-learning-platform-e2f91.appspot.com",
    messagingSenderId: "963544469209",
    appId: "1:963544469209:web:145e652a6f9fc234a7b8c8",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 获取当前教师身份
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const teacherId = user.uid;
        console.log("当前教师 UID:", teacherId);
        loadPublishedCourses(teacherId);
        loadStudents();
    } else {
        console.log("用户未登录");
    }
});

// 监听表单提交，添加课程
document.getElementById("course-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("course-title").value;
    const content = document.getElementById("course-content").value;
    const user = auth.currentUser;

    if (!user) {
        alert("请先登录！");
        return;
    }

    try {
        await addDoc(collection(db, "courses"), {
            title: title,
            content: content,
            teacherId: user.uid
        });
        alert("课程已发布！");
        loadPublishedCourses(user.uid);
    } catch (error) {
        console.error("发布课程失败:", error);
        alert("发布失败，请检查 Firebase 规则！");
    }
});

// 加载已发布课程
async function loadPublishedCourses(teacherId) {
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("teacherId", "==", teacherId));
    
    try {
        const querySnapshot = await getDocs(q);
        let courseList = "";

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            courseList += `<li>${data.title} - ${data.content}</li>`;
        });

        document.getElementById("published-courses").innerHTML = courseList;
    } catch (error) {
        console.error("获取课程失败:", error);
    }
}

// 加载学生列表
async function loadStudents() {
    const studentsRef = collection(db, "user");
    const q = query(studentsRef, where("role", "==", "学生"));

    try {
        const querySnapshot = await getDocs(q);
        let studentList = "";

        querySnapshot.forEach((docSnap) => {
            const student = docSnap.data();
            studentList += `<li>${student.name} 
                <button onclick="editStudent('${docSnap.id}', '${student.name}')">编辑</button>
            </li>`;
        });

        document.getElementById("student-list").innerHTML = studentList;
    } catch (error) {
        console.error("加载学生失败:", error);
    }
}

// 编辑学生信息
async function editStudent(studentId, currentName) {
    const newName = prompt("请输入新的学生姓名:", currentName);
    if (newName) {
        try {
            await updateDoc(doc(db, "user", studentId), { name: newName });
            alert("学生信息更新成功！");
            loadStudents();
        } catch (error) {
            console.error("更新学生失败:", error);
        }
    }
}

// 让 `editStudent` 可用
window.editStudent = editStudent;
