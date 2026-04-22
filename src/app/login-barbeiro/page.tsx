"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginBarbeiroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !senha) {
      alert("Preencha email e senha.");
      return;
    }

    if (email === "admin@barbearia.com" && senha === "123456") {
      localStorage.setItem("tipoUsuario", "admin");
      alert("Login do barbeiro realizado com sucesso!");
      router.push("/barbeiro");
    } else {
      alert("Email ou senha do barbeiro inválidos.");
    }
  }

  return (
    <main className="pagina">
      <div className="card-formulario">
        <h1 className="titulo-formulario">Login Barbeiro</h1>

        <p className="subtitulo-formulario">
          Acesso exclusivo do barbeiro
        </p>

        <form onSubmit={handleLogin} className="formulario">
          <div className="campo">
            <label className="label">E-mail</label>
            <input
              type="email"
              placeholder="Digite o e-mail do barbeiro"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input"
            />
          </div>

          <div className="campo">
            <label className="label">Senha</label>
            <input
              type="password"
              placeholder="Digite a senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="input"
            />
          </div>

          <button type="submit" className="botao-formulario">
            Entrar como barbeiro
          </button>
        </form>
      </div>
    </main>
  );
}