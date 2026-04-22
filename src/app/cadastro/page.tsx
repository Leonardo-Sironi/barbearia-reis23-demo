"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [senha, setSenha] = useState("");

  function handleCadastro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome || !email || !whatsapp || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    const usuario = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim(),
      senha: senha.trim(),
    };

    localStorage.setItem("usuarioCliente", JSON.stringify(usuario));

    alert("Conta criada com sucesso!");
    router.push("/login");
  }

  return (
    <main className="pagina">
      <div className="card-formulario">
        <h1 className="titulo-formulario">Criar conta</h1>

        <p className="subtitulo-formulario">
          Cadastre-se para agendar seu horário
        </p>

        <form onSubmit={handleCadastro} className="formulario">
          <div className="campo">
            <label className="label">Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="input"
            />
          </div>

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
            <label className="label">WhatsApp</label>
            <input
              type="text"
              placeholder="Digite seu WhatsApp"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              className="input"
            />
          </div>

          <div className="campo">
            <label className="label">Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="input"
            />
          </div>

          <button type="submit" className="botao-formulario">
            Criar conta
          </button>
        </form>

        <p className="texto-rodape">
          Já tem conta?{" "}
          <Link href="/login" className="link-texto">
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  );
}