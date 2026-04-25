export default function Home() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>barbearia-reis23 (DEMO)</h1>
      <p>Escolha como deseja entrar</p>

      <div style={{ marginTop: "20px" }}>
        <a href="/login">Login</a><br />
        <a href="/cadastro">Criar conta</a><br />
        <a href="/login-barbeiro">Login Barbeiro</a>
      </div>
    </main>
  );
}