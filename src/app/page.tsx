import Link from "next/link";

export default function Home() {
  return (
    <main className="pagina">
      <div className="card-formulario">
        <h1 className="titulo-formulario">barbearia.reis23</h1>
        <p className="subtitulo-formulario">
          Escolha como deseja entrar no sistema
        </p>

        <div className="formulario">
          <Link href="/login" className="botao-formulario" style={{ textAlign: "center" }}>
            Login
          </Link>

          <Link href="/cadastro" className="botao-formulario" style={{ textAlign: "center" }}>
            Criar conta
          </Link>

          <Link href="/login-barbeiro" className="botao-formulario" style={{ textAlign: "center" }}>
            Login Barbeiro
          </Link>
        </div>
      </div>
    </main>
  );
}