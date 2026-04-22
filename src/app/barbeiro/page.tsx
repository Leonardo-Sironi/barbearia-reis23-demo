"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const horariosFixos = [
  "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30"
];

export default function PainelBarbeiro() {
  const [agenda, setAgenda] = useState<any>({});
  const [mesAtual, setMesAtual] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [bloqueios, setBloqueios] = useState<{ [key: string]: string[] }>({});
  const [diasBloqueados, setDiasBloqueados] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");

    if (tipo !== "admin") {
      router.push("/login-barbeiro");
      return;
    }

    const dadosAgenda = localStorage.getItem("agenda");
    if (dadosAgenda) {
      setAgenda(JSON.parse(dadosAgenda));
    }

    const dadosBloqueios = localStorage.getItem("bloqueiosHorarios");
    if (dadosBloqueios) {
      setBloqueios(JSON.parse(dadosBloqueios));
    }

    const dadosDiasBloqueados = localStorage.getItem("diasBloqueados");
    if (dadosDiasBloqueados) {
      setDiasBloqueados(JSON.parse(dadosDiasBloqueados));
    }

    const hoje = new Date();
    if (hoje.getFullYear() === 2026) {
      setMesAtual(hoje.getMonth());
    } else {
      setMesAtual(0);
    }
  }, [router]);

  function diasNoMes(mes: number) {
    return new Date(2026, mes + 1, 0).getDate();
  }

  function primeiroDiaSemana(mes: number) {
    return new Date(2026, mes, 1).getDay();
  }

  function salvarBloqueios(novosBloqueios: { [key: string]: string[] }) {
    setBloqueios(novosBloqueios);
    localStorage.setItem("bloqueiosHorarios", JSON.stringify(novosBloqueios));
  }

  function salvarDiasBloqueados(novosDias: string[]) {
    setDiasBloqueados(novosDias);
    localStorage.setItem("diasBloqueados", JSON.stringify(novosDias));
  }

  function cancelar(data: string, horario: string) {
    const novaAgenda = { ...agenda };

    novaAgenda[data] = novaAgenda[data].filter(
      (item: any) => item.horario !== horario
    );

    if (novaAgenda[data].length === 0) {
      delete novaAgenda[data];
    }

    setAgenda(novaAgenda);
    localStorage.setItem("agenda", JSON.stringify(novaAgenda));
  }

  function bloquearDia(data: string) {
    if (diasBloqueados.includes(data)) {
      alert("Esse dia já está bloqueado.");
      return;
    }

    const novosDias = [...diasBloqueados, data];
    salvarDiasBloqueados(novosDias);
    alert("Dia bloqueado com sucesso!");
  }

  function desbloquearDia(data: string) {
    const novosDias = diasBloqueados.filter((dia) => dia !== data);
    salvarDiasBloqueados(novosDias);
    alert("Dia desbloqueado com sucesso!");
  }

  function bloquearHorario(data: string, horario: string) {
    const horariosDoDia = bloqueios[data] || [];

    if (horariosDoDia.includes(horario)) {
      alert("Esse horário já está bloqueado.");
      return;
    }

    const novosBloqueios = {
      ...bloqueios,
      [data]: [...horariosDoDia, horario]
    };

    salvarBloqueios(novosBloqueios);
    alert(`Horário ${horario} bloqueado.`);
  }

  function desbloquearHorario(data: string, horario: string) {
    const horariosDoDia = bloqueios[data] || [];
    const novosHorarios = horariosDoDia.filter((h) => h !== horario);

    const novosBloqueios = { ...bloqueios };

    if (novosHorarios.length === 0) {
      delete novosBloqueios[data];
    } else {
      novosBloqueios[data] = novosHorarios;
    }

    salvarBloqueios(novosBloqueios);
    alert(`Horário ${horario} desbloqueado.`);
  }

  const totalDias = diasNoMes(mesAtual);
  const inicioSemana = primeiroDiaSemana(mesAtual);

  const agendamentosDoDia = dataSelecionada ? agenda[dataSelecionada] || [] : [];
  const horariosBloqueadosDoDia = dataSelecionada ? bloqueios[dataSelecionada] || [] : [];
  const diaInteiroBloqueado = dataSelecionada ? diasBloqueados.includes(dataSelecionada) : false;

  const totalDia = agendamentosDoDia.reduce(
    (total: number, item: any) => total + item.valor,
    0
  );

  const dadosMes = useMemo(() => {
    const mesString = String(mesAtual + 1).padStart(2, "0");
    const prefixo = `2026-${mesString}-`;

    const datasDoMes = Object.keys(agenda).filter((data) => data.startsWith(prefixo));
    const totalAgendamentosMes = datasDoMes.reduce(
      (total, data) => total + (agenda[data]?.length || 0),
      0
    );

    const faturamentoMes = datasDoMes.reduce((total, data) => {
      const somaDia = (agenda[data] || []).reduce(
        (subtotal: number, item: any) => subtotal + item.valor,
        0
      );
      return total + somaDia;
    }, 0);

    return {
      totalAgendamentosMes,
      faturamentoMes
    };
  }, [agenda, mesAtual]);

  return (
    <main className="pagina">
      <div className="card-formulario">
        <button
          onClick={() => {
            localStorage.removeItem("tipoUsuario");
            window.location.href = "/login-barbeiro";
          }}
          className="botao-sair"
        >
          Sair
        </button>

        <h1 className="titulo-formulario">Painel do Barbeiro</h1>

        <div className="resumo-mensal-grid">
          <div className="resumo-card">
            <span className="resumo-label">Agendamentos do mês</span>
            <strong className="resumo-valor">{dadosMes.totalAgendamentosMes}</strong>
          </div>

          <div className="resumo-card">
            <span className="resumo-label">Faturamento do mês</span>
            <strong className="resumo-valor">R$ {dadosMes.faturamentoMes}</strong>
          </div>

          <div className="resumo-card">
            <span className="resumo-label">Total do dia</span>
            <strong className="resumo-valor">R$ {totalDia}</strong>
          </div>
        </div>

        <div className="campo">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <button type="button" className="botao-navegacao-mes" onClick={() => setMesAtual((m) => (m > 0 ? m - 1 : 11))}>
              ◀
            </button>
            <strong>{meses[mesAtual]} 2026</strong>
            <button type="button" className="botao-navegacao-mes" onClick={() => setMesAtual((m) => (m < 11 ? m + 1 : 0))}>
              ▶
            </button>
          </div>

          <div className="dias-semana-grid">
            <span className="domingo-texto">D</span>
            <span>S</span>
            <span>T</span>
            <span>Q</span>
            <span>Q</span>
            <span>S</span>
            <span>S</span>
          </div>

          <div className="calendario-grid">
            {Array.from({ length: inicioSemana }).map((_, i) => (
              <div key={i}></div>
            ))}

            {Array.from({ length: totalDias }).map((_, i) => {
              const dia = i + 1;
              const data = `2026-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

              const selecionado = dataSelecionada === data;
              const temAgendamento = agenda[data];
              const domingo = new Date(2026, mesAtual, dia).getDay() === 0;
              const diaBloqueado = diasBloqueados.includes(data);

              return (
                <button
                  key={data}
                  type="button"
                  onClick={() => setDataSelecionada(data)}
                  className="botao-formulario"
                  style={{
                    backgroundColor: selecionado
                      ? "#4caf50"
                      : diaBloqueado
                      ? "#111"
                      : domingo
                      ? "#ff6b6b"
                      : temAgendamento
                      ? "#d6b25e"
                      : "#cccccc",
                    color: selecionado || diaBloqueado ? "#fff" : "#111",
                    padding: "10px",
                    border: temAgendamento ? "2px solid #8a6a22" : "none",
                  }}
                >
                  {dia}
                </button>
              );
            })}
          </div>
        </div>

        {dataSelecionada && (
          <>
            <h2 style={{ marginTop: "15px", marginBottom: "10px" }}>
              Agenda do dia: {dataSelecionada}
            </h2>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
              {!diaInteiroBloqueado ? (
                <button
                  onClick={() => bloquearDia(dataSelecionada)}
                  className="botao-formulario"
                  style={{ backgroundColor: "#111", color: "#fff" }}
                >
                  Bloquear dia inteiro
                </button>
              ) : (
                <button
                  onClick={() => desbloquearDia(dataSelecionada)}
                  className="botao-formulario"
                  style={{ backgroundColor: "#4caf50", color: "#fff" }}
                >
                  Desbloquear dia inteiro
                </button>
              )}
            </div>

            <h3 style={{ marginBottom: "10px" }}>Bloquear ou desbloquear horários</h3>

            <div className="botoes-grid" style={{ marginBottom: "20px" }}>
              {horariosFixos.map((horario) => {
                const bloqueado = horariosBloqueadosDoDia.includes(horario);

                return (
                  <button
                    key={horario}
                    type="button"
                    onClick={() =>
                      bloqueado
                        ? desbloquearHorario(dataSelecionada, horario)
                        : bloquearHorario(dataSelecionada, horario)
                    }
                    className="botao-formulario"
                    style={{
                      backgroundColor: bloqueado ? "#4caf50" : "#cccccc",
                      color: bloqueado ? "#fff" : "#111"
                    }}
                  >
                    {bloqueado ? `${horario} desbloquear` : `${horario} bloquear`}
                  </button>
                );
              })}
            </div>

            {agendamentosDoDia.length === 0 && (
              <p>Nenhum agendamento</p>
            )}

            {agendamentosDoDia.map((item: any, index: number) => (
              <div
                key={`${item.horario}-${index}`}
                className="agendamento-card"
              >
                <strong>{item.horario}</strong>
                <p><strong>Serviços:</strong> {item.servicos}</p>
                <p><strong>Valor:</strong> R$ {item.valor}</p>
                <p><strong>Cliente:</strong> {item.clienteNome}</p>
                <p><strong>Email:</strong> {item.clienteEmail}</p>
                <p><strong>WhatsApp:</strong> {item.clienteWhatsapp}</p>

                <button
                  onClick={() => cancelar(dataSelecionada, item.horario)}
                  className="botao-cancelar"
                >
                  Cancelar
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}