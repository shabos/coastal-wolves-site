import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", age: "", parentName: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Coastal Wolves Rugby Club</h1>
      <p>Empowering youth through rugby on the Sunshine Coast</p>
      <h2>Sign Up for Fall 2025</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Child's Full Name" onChange={handleChange} required /><br />
          <input name="age" placeholder="Child's Age" onChange={handleChange} required /><br />
          <input name="parentName" placeholder="Parent/Guardian Name" onChange={handleChange} required /><br />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required /><br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Thanks for signing up! We'll be in touch soon.</p>
      )}
    </div>
  );
}