import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
const [password, setPassword] = useState("");
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [title, setTitle] = useState("");
const [link, setLink] = useState("");
const [type, setType] = useState("SFW");

const handleLogin = () => {
if (password === "3669") {
setIsAuthenticated(true);
} else {
alert("Incorrect password");
}
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
try {
await axios.post("/api/media", { title, link, type }, {
headers: { Authorization: password },
});
alert("Media added successfully");
setTitle("");
setLink("");
setType("SFW");
} catch (err) {
alert("Failed to add media");
}
};

if (!isAuthenticated) {
return (
<div className="bg-black text-red-600 min-h-screen flex items-center justify-center">
<div>
<label htmlFor="password" className="text-3xl font-bold">Enter The Amount</label>
<input
type="password"
className="w-full p-2 mt-4 border border-red-600 bg-black text-white"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
<button
className="w-full p-2 mt-4 bg-red-600 text-white font-bold"
onClick={handleLogin}
>
Penetrate
</button>
</div>
</div>
);
}

return (
<div className="bg-black text-red-600 min-h-screen p-4">
<h1 className="text-4xl font-bold mb-8">Pussy Panel</h1>
<form onSubmit={handleSubmit} className="space-y-4">
<input
type="text"
placeholder="Movie Title"
className="w-full p-2 border border-red-600 bg-black text-white"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<input
type="text"
placeholder="Movie Link"
className="w-full p-2 border border-red-600 bg-black text-white"
value={link}
onChange={(e) => setLink(e.target.value)}
/>
<select
value={type}
onChange={(e) => setType(e.target.value)}
className="w-full p-2 border border-red-600 bg-black text-white"
>
<option value="SFW">SFW</option>
<option value="NSFW">NSFW</option>
</select>
<button
type="submit"
className="w-full p-2 bg-red-600 text-white font-bold"
>
Add Media
</button>
</form>
</div>
);
};

export default AdminPanel;

