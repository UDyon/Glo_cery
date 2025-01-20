// UserForm.js
import React, { useState } from "react";
import axios from "axios";

function UserForm({ onUserCreated }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { name, email };
        await axios.post("/api/users", newUser);
        setName("");
        setEmail("");
        onUserCreated();  // 새로운 사용자 추가 후 사용자 목록 갱신
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default UserForm;
