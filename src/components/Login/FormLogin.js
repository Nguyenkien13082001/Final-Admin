import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  // Khởi tạo state cho email và password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fake account details
  const fakeAccount = {
    email: "kien123@gmail.com",
    password: "123",
  };

  const navigate = useNavigate();
  // Hàm xử lý khi người dùng submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === fakeAccount.email && password === fakeAccount.password) {
      navigate("admin/home");
      //   alert("Đăng nhập thành công!");
      // Sau này bạn có thể thay thế bằng logic chuyển hướng hoặc gọi API ở đây
    } else {
      alert("Email hoặc mật khẩu không đúng.");
    }
    // Reset form
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mật khẩu:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Đăng nhập</button>
        </div>
      </form>
    </div>
  );
}
