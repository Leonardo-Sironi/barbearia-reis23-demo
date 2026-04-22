"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginClientePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    const usuarioSalvo = localStorage.getItem("usuarioCliente");

    if (!usuarioSalvo) {
      alert("Nenhum cliente cadastrado. Crie uma conta primeiro.");
      return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    const emailDigitado = email.trim().toLowerCase();
    const senhaDigitada = senha.trim();

    if (emailDigitado === usuario.email && senhaDigitada === usuario.senha) {
      localStorage.setItem("tipoUsuario", "cliente");
      localStorage.setItem("clienteLogado", JSON.stringify(usuario));
      alert("Login realizado com sucesso!");
      router.push("/agendamento");
    } else {
      alert("E-mail ou senha incorretos.");
    }
  }

  return (
    <main className="pagina">
      <div className="card-formulario">
        <h1 className="titulo-formulario">Login</h1>

        <p className="subtitulo-formulario">
          Entre na sua conta para agendar
        </p>

        <form onSubmit={handleLogin} className="formulario">
          <div className="campo">
            <label className="label">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input"
            />
          </div>

          <div className="campo">
            <label className="label">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="input"
            />
          </div>

          <button type="submit" className="botao-formulario">
            Entrar
          </button>
        </form>

        <p className="texto-rodape">
          Não tem conta?{" "}
          <Link href="/cadastro" className="link-texto">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}