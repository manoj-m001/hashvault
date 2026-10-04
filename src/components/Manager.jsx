import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import passwordRules from "./variables.json";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "@clerk/react";
import "./manager.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const { getToken } = useAuth();

  const [form, setForm] = useState({
    id: "",
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const getPasswords = async () => {
    try {
      const token = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }

      setPasswordArray(
        data.map((pwd) => ({
          ...pwd,
          id: pwd._id || pwd.id,
          password: pwd.password || "",
        })),
      );
    } catch (error) {
      console.error("Error fetching passwords:", error);
      toast.error(`Failed to fetch passwords: ${error.message}`);
      setPasswordArray([]);
    }
  };

  const getFavicon = (domain) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=25`;
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text, isPassword = false) => {
    if (!text) {
      toast.error("Nothing to copy!");
      return;
    }

    try {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const showPassword = () => {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";
    ref.current.src =
      passwordRef.current.type === "password"
        ? "icons/eye.png"
        : "icons/eyecross.png";
  };

  const generatePassword = () => {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    const allChars = lowerCase + upperCase + numbers + symbols;
    let generatedPassword = "";

    for (let i = 0; i < 12; i++) {
      const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
      generatedPassword += randomChar;
    }
    setForm((prevForm) => ({ ...prevForm, password: generatedPassword }));
  };

  const validate = async (url) => {
    const ok = await axios.get(url);
    if (ok.status === 200) {
      return 1;
    }
  };
  const validatePassword = (password) => {
    const errors = Object.keys(passwordRules)
      .map((rule) => {
        const isValid = eval(passwordRules[rule].validate);
        return isValid ? null : passwordRules[rule].message;
      })
      .filter(Boolean);
    setPasswordErrors(errors);

    return errors.length === 0;
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length >= 3 &&
      validatePassword(form.password)
    ) {
      try {
        const formattedSite = form.site.startsWith("http")
          ? form.site
          : `https://${form.site}`;
        const token = await getToken();

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              site: formattedSite,
              username: form.username,
              password: form.password,
            }),
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Server error: ${response.status}`,
          );
        }

        const data = await response.json().catch(() => ({}));

        if (data.success === false) {
          throw new Error(data.message || "Failed to save password");
        }

        await getPasswords();
        setForm({ id: "", site: "", username: "", password: "" });
        toast.success("Password saved successfully!");
      } catch (error) {
        console.error("Error saving password:", error);
        toast.error(
          error.message || "Failed to save password. Please try again.",
        );
      }
    } else {
      toast.error(
        "Please ensure all fields are filled correctly and password meets requirements",
      );
    }
  };
  const deletePassword = async (id) => {
    const confirmDelete = confirm(
      "Do you really want to delete this password?",
    );

    if (confirmDelete) {
      try {
        const token = await getToken();
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete password");
        }

        setPasswordArray(passwordArray.filter((item) => item._id !== id));

        toast("Password Deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error(`Error: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };
  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm({ ...passwordToEdit });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
      setIsTyping(e.target.value.length > 0);
    }
  };

  const renderPasswordTable = () => (
    <div className="vault-passwords__list">
      {passwordArray.map((item) => (
        <article className="vault-password-row" key={item.id}>
          <div className="vault-password-row__site">
            <img
              src={getFavicon(item.site)}
              className="vault-password-row__favicon"
              alt=""
            />
            <div className="vault-password-row__details">
              <a href={item.site} target="_blank" rel="noopener noreferrer">
                {item.site}
              </a>
              <p>{item.username}</p>
            </div>
          </div>
          <div
            className="vault-password-row__secret"
            aria-label="Hidden password"
          >
            <span aria-hidden="true">{"*".repeat(8)}</span>
          </div>
          <div className="vault-password-row__actions">
            <button
              className="vault-icon-button"
              type="button"
              aria-label="Copy password"
              title="Copy password"
              onClick={() => copyText(item.password, true)}
            >
              <lord-icon
                src="https://cdn.lordicon.com/iykgtsbt.json"
                trigger="hover"
              ></lord-icon>
            </button>
            <button
              className="vault-icon-button"
              type="button"
              aria-label="Edit password"
              title="Edit password"
              onClick={() => editPassword(item.id)}
            >
              <lord-icon
                src="https://cdn.lordicon.com/gwlusjdu.json"
                trigger="hover"
              ></lord-icon>
            </button>
            <button
              className="vault-icon-button"
              type="button"
              aria-label="Delete password"
              title="Delete password"
              onClick={() => deletePassword(item.id)}
            >
              <lord-icon
                src="https://cdn.lordicon.com/skkahier.json"
                trigger="hover"
              ></lord-icon>
            </button>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <>
      <ToastContainer />
      <main className="vault-manager">
        <div className="vault-manager__content">
          <header className="vault-manager__heading">
            <h1>Password Manager</h1>
            <p>Manage your credentials in one place</p>
          </header>

          <section className="vault-form" aria-label="Add a password">
            <input
              value={form.site}
              onChange={handleChange}
              placeholder="Enter website URL"
              type="text"
              name="site"
              id="site"
              aria-label="Website URL"
            />
            <div className="vault-form__credentials">
              <input
                value={form.username}
                onChange={handleChange}
                placeholder="Enter Username"
                type="text"
                name="username"
                id="username"
                aria-label="Username"
              />
              <div className="vault-password-field">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={() => setIsTyping(false)}
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  id="password"
                  aria-label="Password"
                />
                <button
                  className="vault-password-toggle"
                  type="button"
                  aria-label="Show or hide password"
                  onClick={showPassword}
                >
                  <img ref={ref} src="icons/eye.png" alt="" />
                </button>
                {isTyping && (
                  <div className="vault-password-rules">
                    <ul>
                      <li
                        style={{
                          color: form.password.length >= 8 ? "green" : "red",
                        }}
                      >
                        8-20 Characters
                      </li>
                      <li
                        style={{
                          color: /[A-Z]/.test(form.password) ? "green" : "red",
                        }}
                      >
                        At least one capital letter
                      </li>
                      <li
                        style={{
                          color: /\d/.test(form.password) ? "green" : "red",
                        }}
                      >
                        At least one number
                      </li>
                      <li
                        style={{
                          color: !/\s/.test(form.password) ? "green" : "red",
                        }}
                      >
                        No spaces
                      </li>
                      <li
                        style={{
                          color: /[!@#$%^&*(),.?\\":{}|<>]/.test(form.password)
                            ? "green"
                            : "red",
                        }}
                      >
                        Password must contain at least one special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="vault-form__actions">
              <button
                onClick={generatePassword}
                className="vault-button vault-button--quiet"
                type="button"
              >
                Generate Password
              </button>
              <button
                onClick={savePassword}
                className="vault-button vault-button--primary"
                type="button"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                ></lord-icon>
                {form.id ? "Update Password" : "Save Password"}
              </button>
            </div>
          </section>

          <section
            className="vault-passwords"
            aria-labelledby="password-list-title"
          >
            <header className="vault-passwords__header">
              <h2 id="password-list-title">Your Passwords</h2>
              <span className="vault-passwords__count">
                {passwordArray.length}
              </span>
            </header>
            {passwordArray.length === 0 ? (
              <p className="vault-passwords__empty">No passwords to show</p>
            ) : (
              renderPasswordTable()
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Manager;
