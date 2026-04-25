import Link from "next/link";

export default function HomePage() {
  return (
    <main className="pagina-home">
      <div className="card-home">
        <h1 className="titulo-home">Barbearia Reis23</h1>

        <p className="subtitulo-home">
          Sistema demo de agendamento para portfólio
        </p>

        <div className="botoes-home">
          <Link href="/login" className="botao-home">
            Login Cliente
          </Link>

          <Link href="/cadastro" className="botao-home botao-home-secundario">
            Criar conta
          </Link>

          <Link href="/login-barbeiro" className="botao-home">
            Login Barbeiro
          </Link>
        </div>

        <p style={{ marginTop: "20px", color: "#aaa", fontSize: "14px" }}>
          Este site é uma demonstração de portfólio.
        </p>
      </div>
    </main>
  );
}