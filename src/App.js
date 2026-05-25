import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0f0f0f; }
  .app { min-height: 100vh; background: #111; color: #e8e0d0; font-family: 'IBM Plex Sans', sans-serif; }
  .header { background: #1a1a1a; border-bottom: 3px solid #f5a623; padding: 20px 32px; display: flex; align-items: center; gap: 16px; }
  .header-icon { font-size: 36px; line-height: 1; }
  .header-title { font-family: 'Bebas Neue', sans-serif; font-size: 38px; letter-spacing: 3px; color: #f5a623; line-height: 1; }
  .header-sub { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #888; letter-spacing: 2px; margin-top: 4px; text-transform: uppercase; }
  .tabs { display: flex; background: #1a1a1a; border-bottom: 2px solid #2a2a2a; padding: 0 32px; gap: 4px; }
  .tab { padding: 14px 28px; font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; border: none; background: transparent; color: #666; border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
  .tab:hover { color: #ccc; }
  .tab.active { color: #f5a623; border-bottom-color: #f5a623; }
  .content { padding: 32px; max-width: 1000px; margin: 0 auto; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 680px) {
    .grid-2 { grid-template-columns: 1fr; }
    .tabs { padding: 0 16px; }
    .tab { padding: 12px 16px; font-size: 11px; }
    .content { padding: 20px 16px; }
  }
  .section { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 4px; overflow: hidden; }
  .section-header { background: #222; padding: 14px 20px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; color: #f5a623; border-bottom: 1px solid #2a2a2a; }
  .section-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #888; }
  input, select { background: #111; border: 1px solid #333; border-radius: 3px; color: #e8e0d0; font-family: 'IBM Plex Mono', monospace; font-size: 14px; padding: 10px 12px; outline: none; transition: border-color 0.2s; width: 100%; }
  input:focus, select:focus { border-color: #f5a623; }
  select option { background: #1a1a1a; }
  .unit { font-size: 10px; color: #555; margin-left: 4px; }
  .btn-calc { background: #f5a623; color: #111; border: none; border-radius: 3px; font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 3px; padding: 14px 32px; cursor: pointer; width: 100%; margin-top: 8px; transition: background 0.2s, transform 0.1s; }
  .btn-calc:hover { background: #ffc04a; }
  .btn-calc:active { transform: scale(0.98); }
  .btn-reset { background: transparent; color: #666; border: 1px solid #333; border-radius: 3px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; padding: 10px 20px; cursor: pointer; width: 100%; transition: all 0.2s; }
  .btn-reset:hover { color: #ccc; border-color: #666; }
  .results { background: #0d1a0d; border: 1px solid #2d4a2d; border-radius: 4px; overflow: hidden; }
  .results-header { background: #1a2e1a; padding: 14px 20px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; color: #6fcf6f; border-bottom: 1px solid #2d4a2d; }
  .results-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .result-row { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid #1a2e1a; }
  .result-row:last-child { border-bottom: none; }
  .result-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #888; letter-spacing: 1px; }
  .result-value { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 600; color: #6fcf6f; }
  .result-value.warn { color: #f5a623; }
  .result-value.danger { color: #e05050; }
  .alert { background: #2a1a0a; border: 1px solid #f5a623; border-radius: 3px; padding: 12px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #f5a623; }
  .divider { border: none; border-top: 1px solid #2a2a2a; margin: 4px 0; }
  .result-group-title { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 2px; color: #f5a623; margin-top: 6px; }
  .drawing-box { background: #f5f5f0; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
  .drawing-header { background: #e8e8e0; padding: 12px 20px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: #333; border-bottom: 1px solid #ddd; }
  .drawing-svg { width: 100%; display: block; background: #f5f5f0; }
  .legend-box { background: #eeeee8; border-top: 1px solid #ddd; padding: 14px 20px; display: flex; flex-wrap: wrap; gap: 14px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #555; }
  .legend-swatch { width: 28px; height: 5px; border-radius: 2px; }
  .corte-table { width: 100%; border-collapse: collapse; font-family: 'IBM Plex Mono', monospace; font-size: 12px; }
  .corte-table th { background: #222; color: #f5a623; padding: 8px 12px; text-align: left; letter-spacing: 1px; font-size: 11px; border-bottom: 2px solid #333; }
  .corte-table td { padding: 7px 12px; border-bottom: 1px solid #1e1e1e; color: #ccc; }
  .corte-table tr:last-child td { border-bottom: none; }
  .corte-table tr:hover td { background: #1a1a1a; }
  .corte-tag { display: inline-block; padding: 2px 7px; border-radius: 2px; font-size: 10px; font-weight: 600; }
  .corte-est { background: #1a2a4a; color: #4a9eff; }
  .corte-pre { background: #1a2e1a; color: #6fcf6f; }
  .corte-diag { background: #2a220a; color: #e0a020; }
  .total-row { background: #1a1a0a; font-weight: 600; }
  .total-row td { color: #f5a623 !important; border-top: 2px solid #333 !important; }
`;

// ─── PERFIS ──────────────────────────────────────────────────────────────────
const PERFIS = {
  // Quadrados
  "30x30x2":   { desc: "Tubo 30×30 e=2mm",   pesoM: 1.78, tipo: "quadrado" },
  "40x40x2":   { desc: "Tubo 40×40 e=2mm",   pesoM: 2.42, tipo: "quadrado" },
  "40x40x3":   { desc: "Tubo 40×40 e=3mm",   pesoM: 3.50, tipo: "quadrado" },
  "50x50x2":   { desc: "Tubo 50×50 e=2mm",   pesoM: 3.07, tipo: "quadrado" },
  "50x50x3":   { desc: "Tubo 50×50 e=3mm",   pesoM: 4.47, tipo: "quadrado" },
  "60x60x3":   { desc: "Tubo 60×60 e=3mm",   pesoM: 5.45, tipo: "quadrado" },
  "76x76x3":   { desc: "Tubo 76×76 e=3mm",   pesoM: 6.87, tipo: "quadrado" },
  // Retangulares
  "20x30x2":   { desc: "Tubo 20×30 e=2mm",   pesoM: 1.42, tipo: "retangular" },
  "30x40x2":   { desc: "Tubo 30×40 e=2mm",   pesoM: 1.78, tipo: "retangular" },
  "40x20x2":   { desc: "Tubo 40×20 e=2mm",   pesoM: 1.78, tipo: "retangular" },
  "40x50x2":   { desc: "Tubo 40×50 e=2mm",   pesoM: 2.42, tipo: "retangular" },
  "50x30x2":   { desc: "Tubo 50×30 e=2mm",   pesoM: 2.42, tipo: "retangular" },
  "50x60x2":   { desc: "Tubo 50×60 e=2mm",   pesoM: 3.07, tipo: "retangular" },
  "60x40x2":   { desc: "Tubo 60×40 e=2mm",   pesoM: 3.07, tipo: "retangular" },
  "60x40x3":   { desc: "Tubo 60×40 e=3mm",   pesoM: 4.47, tipo: "retangular" },
  "80x40x2":   { desc: "Tubo 80×40 e=2mm",   pesoM: 3.60, tipo: "retangular" },
  "80x40x3":   { desc: "Tubo 80×40 e=3mm",   pesoM: 5.45, tipo: "retangular" },
  "100x50x2":  { desc: "Tubo 100×50 e=2mm",  pesoM: 4.52, tipo: "retangular" },
  "100x50x3":  { desc: "Tubo 100×50 e=3mm",  pesoM: 6.71, tipo: "retangular" },
  "100x50x4":  { desc: "Tubo 100×50 e=4mm",  pesoM: 8.78, tipo: "retangular" },
  "120x60x3":  { desc: "Tubo 120×60 e=3mm",  pesoM: 8.13, tipo: "retangular" },
};

function perfisEstrutura() { return Object.entries(PERFIS); }
function perfisPreenchimento() { return Object.entries(PERFIS); }

// Extrai a dimensão maior do perfil em metros (ex: "50x50x3" → 0.050, "100x50x3" → 0.100, "bc_25x3" → 0.025)
function getEsp(key) {
  if (!key) return 0;
  const parts = key.replace("bc_","").split("x");
  const vals = parts.map(p => parseFloat(p)).filter(n => !isNaN(n));
  if (vals.length === 0) return 0;
  return Math.max(...vals) / 1000; // mm → m
}



// ─── SVG helpers ─────────────────────────────────────────────────────────────
function Defs() {
  return (
    <defs>
      <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#f5a623" />
      </marker>
    </defs>
  );
}

function Cota({ x1, y1, x2, y2, label, offset = 18, orient = "h", rightSide = false }) {
  const co = "#f5a623"; const ts = 9;
  if (orient === "h") {
    const y = y1 + offset;
    return (
      <g>
        <line x1={x1} y1={y1} x2={x1} y2={y} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x2} y1={y1} x2={x2} y2={y} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={co} strokeWidth="1" markerStart="url(#arr)" markerEnd="url(#arr)" />
        <text x={(x1+x2)/2} y={y+ts+2} textAnchor="middle" fill={co} fontSize={ts} fontFamily="monospace">{label}</text>
      </g>
    );
  } else {
    // vertical cota — always drawn to the RIGHT of x2 (right edge of structure)
    const rx = x2 + offset;
    return (
      <g>
        <line x1={x2} y1={y1} x2={rx} y2={y1} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x2} y1={y2} x2={rx} y2={y2} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={rx} y1={y1} x2={rx} y2={y2} stroke={co} strokeWidth="1" markerStart="url(#arr)" markerEnd="url(#arr)" />
        <text x={rx+4} y={(y1+y2)/2+4} textAnchor="start" fill={co} fontSize={ts} fontFamily="monospace">{label}</text>
      </g>
    );
  }
}

// ─── LISTA DE CORTE ──────────────────────────────────────────────────────────
const PECA_CORES = {
  "Travessa superior": { bg: "#0d1a2e", cor: "#4a9eff" },
  "Travessa inferior": { bg: "#0d1a2e", cor: "#74b8ff" },
  "Montante vertical": { bg: "#1a0d2e", cor: "#b47aff" },
  "Travessa do meio":  { bg: "#0d1e2e", cor: "#40d0ff" },
  "Barra horizontal":  { bg: "#0a160a", cor: "#6fcf6f" },
  "Barra vertical":    { bg: "#0d1a0d", cor: "#a0e0a0" },
  "Diagonal":          { bg: "#1e1408", cor: "#e0a020" },
  "Poste vertical":    { bg: "#1a0d2e", cor: "#b47aff" },
  "Travessa horizontal":{ bg: "#0a160a", cor: "#6fcf6f" },
  "Moldura lateral":   { bg: "#0d1a2e", cor: "#4a9eff" },
  "Moldura superior":  { bg: "#0d1a2e", cor: "#74b8ff" },
  "Moldura inferior":  { bg: "#0d1e2e", cor: "#40d0ff" },
  "Travessa vertical": { bg: "#0d1a0d", cor: "#a0e0a0" },
};

function getPecaCor(nome) {
  return PECA_CORES[nome] || { bg: "#111", cor: "#aaa" };
}
// ─── OTIMIZAÇÃO DE CORTE (First Fit Decreasing) ──────────────────────────────
function otimizarCorte(pecas, tamanhoBarraM, kerfMm = 3) {
  const kerf = kerfMm / 1000; // espessura do corte em metros
  // Expandir cada peça em unidades individuais
  const itens = [];
  pecas.forEach(p => {
    for (let i = 0; i < p.qtd; i++) {
      itens.push({ nome: p.nome, comp: p.comp, cor: getPecaCor(p.nome).cor });
    }
  });
  // Ordenar do maior para o menor
  itens.sort((a, b) => b.comp - a.comp);

  // First Fit Decreasing: encaixa cada peça na primeira barra onde cabe
  const barras = [];
  itens.forEach(item => {
    let encaixou = false;
    for (let b of barras) {
      if (b.restante >= item.comp + kerf) {
        b.pecas.push(item);
        b.restante -= (item.comp + kerf);
        encaixou = true;
        break;
      }
    }
    if (!encaixou) {
      barras.push({ pecas: [item], restante: tamanhoBarraM - item.comp - kerf });
    }
  });

  const totalBarras = barras.length;
  const totalMaterial = totalBarras * tamanhoBarraM;
  const totalUsado = itens.reduce((s, i) => s + i.comp, 0);
  const desperdicio = totalMaterial - totalUsado;
  const aproveitamento = (totalUsado / totalMaterial * 100);

  return { barras, totalBarras, totalMaterial, totalUsado, desperdicio, aproveitamento };
}

function PainelBarras({ pecas, perfil }) {
  const [tamanho, setTamanho] = useState("6");
  const [resultado, setResultado] = useState(null);

  function calcular() {
    const t = parseFloat(tamanho);
    if (!t || t <= 0) return;
    setResultado(otimizarCorte(pecas, t));
  }

  return (
    <div className="drawing-box">
      <div className="drawing-header">📦 BARRAS COMERCIAIS — {perfil}{resultado ? ` — ${tamanho}m` : ""}</div>
      <div style={{ padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap", background: "#111" }}>
        <div className="field" style={{ flex: 1, minWidth: 180 }}>
          <label>Tamanho da barra comercial <span className="unit">(m)</span></label>
          <select value={tamanho} onChange={e => setTamanho(e.target.value)} style={{ background: "#111", border: "1px solid #333", color: "#e8e0d0", fontFamily: "monospace", fontSize: 14, padding: "10px 12px", borderRadius: 3 }}>
            <option value="6">6 metros (padrão)</option>
            <option value="6.4">6,40 metros</option>
            <option value="7.5">7,5 metros</option>
            <option value="12">12 metros</option>
          </select>
        </div>
        <button className="btn-calc" style={{ width: "auto", padding: "10px 28px", fontSize: 18, marginTop: 0 }} onClick={calcular}>CALCULAR</button>
      </div>

      {resultado && (
        <div style={{ padding: "0 20px 20px" }}>
          {/* Resumo */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "16px 0" }}>
            {[
              { label: "Barras necessárias", valor: resultado.totalBarras, cor: "#f5a623", grande: true },
              { label: "Material total", valor: `${resultado.totalMaterial.toFixed(1)} m`, cor: "#4a9eff" },
              { label: "Material usado", valor: `${resultado.totalUsado.toFixed(2)} m`, cor: "#6fcf6f" },
              { label: "Desperdício", valor: `${resultado.desperdicio.toFixed(2)} m`, cor: "#e05050" },
              { label: "Aproveitamento", valor: `${resultado.aproveitamento.toFixed(1)}%`, cor: resultado.aproveitamento > 85 ? "#6fcf6f" : "#f5a623" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#1a1a1a", border: `1px solid ${item.cor}33`, borderRadius: 4, padding: "10px 16px", flex: 1, minWidth: 120 }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: item.grande ? 32 : 20, color: item.cor, letterSpacing: 2 }}>{item.valor}</div>
              </div>
            ))}
          </div>

          {/* Visualização das barras */}
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
            {perfil} — {tamanho}m por barra
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {resultado.barras.map((barra, bi) => {
              const t = parseFloat(tamanho);
              return (
                <div key={bi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: "#555", minWidth: 24, textAlign: "right" }}>#{bi+1}</span>
                  <div style={{ flex: 1, height: 22, background: "#1a1a1a", borderRadius: 2, overflow: "hidden", display: "flex", border: "1px solid #2a2a2a" }}>
                    {barra.pecas.map((peca, pi) => (
                      <div key={pi} title={`${peca.nome}: ${(peca.comp*100).toFixed(1)}cm`}
                        style={{ width: `${(peca.comp/t)*100}%`, background: peca.cor, borderRight: "1px solid #0a0a0a", height: "100%", minWidth: 1 }} />
                    ))}
                    {/* Sobra */}
                    {barra.restante > 0.001 && (
                      <div style={{ width: `${(barra.restante/t)*100}%`, background: "#2a2a2a", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "monospace", fontSize: 9, color: "#555" }}>{(barra.restante*100).toFixed(0)}cm</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {Object.entries(PECA_CORES).filter(([nome]) => pecas.some(p => p.nome === nome)).map(([nome, {cor}]) => (
              <div key={nome} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 10, color: "#888" }}>
                <div style={{ width: 16, height: 10, background: cor, borderRadius: 1 }} />{nome}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 10, color: "#555" }}>
              <div style={{ width: 16, height: 10, background: "#2a2a2a", borderRadius: 1 }} />Sobra
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ListaCorte({ pecas, perfilEst, perfilPre }) {
  const sorted = [...pecas].sort((a, b) => b.comp - a.comp);
  const totalPeso = pecas.reduce((s, p) => s + p.peso, 0);
  const totalMetros = pecas.reduce((s, p) => s + p.compTotal, 0);

  // Separar peças por perfil para calcular barras independentemente
  const pecasEst = pecas.filter(p => p.tipo === "estrutura" || p.tipo === "diagonal");
  const pecasPre = pecas.filter(p => p.tipo === "preenchimento");
  const temDoisPerfis = perfilEst !== perfilPre && pecasPre.length > 0;
  return (
    <>
    <div className="drawing-box">
      <div className="drawing-header">✂ LISTA DE CORTE</div>
      <div style={{ overflowX: "auto" }}>
        <table className="corte-table">
          <thead>
            <tr>
              <th>#</th>
              <th>PEÇA</th>
              <th>PERFIL</th>
              <th>COMP. UNIT.</th>
              <th>QTD</th>
              <th>TOTAL (m)</th>
              <th>PESO (kg)</th>
              <th>DESCONTO</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const { bg, cor } = getPecaCor(p.nome);
              return (
                <tr key={i} style={{ background: bg }}>
                  <td style={{ color: "#555" }}>{i + 1}</td>
                  <td><span style={{ background: bg, border: `1px solid ${cor}`, color: cor, padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}>{p.nome}</span></td>
                  <td style={{ color: "#888" }}>{p.perfil}</td>
                  <td style={{ color: cor, fontWeight: 700, fontSize: 15 }}>{(p.comp * 100).toFixed(1)} cm</td>
                  <td style={{ color: "#e8e0d0" }}>{p.qtd}</td>
                  <td style={{ color: "#ccc" }}>{p.compTotal.toFixed(2)}</td>
                  <td style={{ color: "#ccc" }}>{p.peso.toFixed(2)}</td>
                  <td style={{ color: "#555", fontSize: 10 }}>{p.obs || "—"}</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td colSpan={4} style={{ textAlign: "right", paddingRight: 12 }}>TOTAL</td>
              <td>—</td>
              <td>{totalMetros.toFixed(2)} m</td>
              <td>{totalPeso.toFixed(2)} kg</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {temDoisPerfis ? (<>
      <PainelBarras pecas={pecasEst} perfil={PERFIS[perfilEst]?.desc || perfilEst} />
      <PainelBarras pecas={pecasPre} perfil={PERFIS[perfilPre]?.desc || perfilPre} />
    </>) : (
      <PainelBarras pecas={pecas} perfil={PERFIS[perfilEst]?.desc || perfilEst} />
    )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTÃO
// ══════════════════════════════════════════════════════════════════════════════
function DesenhoPortao({ L, H, folhas, nBarrasH, nBarrasV, nMeio, oriPreenchi, incluiDiagonal, perfilEst, perfilPre }) {
  const W = 680; const SH = 320;
  const cotaV = 50; const cotaH = 36; const pad = 14; const padR = 70;
  const dw = W - cotaV - pad - padR; const dh = SH - cotaH - pad - 10;
  const ox = cotaV; const oy = 10;
  const fw = dw / folhas;

  const barrasH = []; const espacH = dh / (nBarrasH + 1);
  for (let i = 1; i <= nBarrasH; i++) barrasH.push(oy + i * espacH);

  const barrasV = []; const espacV = fw / (nBarrasV + 1);
  for (let i = 1; i <= nBarrasV; i++) barrasV.push(i * espacV);

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — PORTÃO</div>
      <svg viewBox={`0 0 ${W} ${SH}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={SH} fill="#f5f5f0" />
        

        {[...Array(folhas)].map((_,fi) => {
          const fx = ox + fi * fw;
          const corTravSup  = PECA_CORES["Travessa superior"].cor;
          const corTravInf  = PECA_CORES["Travessa inferior"].cor;
          const corMontante = PECA_CORES["Montante vertical"].cor;
          const corTravMeio = PECA_CORES["Travessa do meio"].cor;
          const corPreV     = PECA_CORES["Barra vertical"].cor;
          const corPreH     = PECA_CORES["Barra horizontal"].cor;
          const corDiag     = PECA_CORES["Diagonal"].cor;
          return (
            <g key={fi}>
              {/* Travessa superior */}
              <line x1={fx+1} y1={oy} x2={fx+fw-1} y2={oy} stroke={corTravSup} strokeWidth="4" />
              {/* Travessa inferior */}
              <line x1={fx+1} y1={oy+dh} x2={fx+fw-1} y2={oy+dh} stroke={corTravInf} strokeWidth="4" />
              {/* Montantes verticais (esquerdo e direito) */}
              <line x1={fx+2} y1={oy+4} x2={fx+2} y2={oy+dh-4} stroke={corMontante} strokeWidth="4" />
              <line x1={fx+fw-2} y1={oy+4} x2={fx+fw-2} y2={oy+dh-4} stroke={corMontante} strokeWidth="4" />
              {/* Travessas do meio (0, 1, 2 ou 3) */}
              {[...Array(nMeio||0)].map((_,mi) => {
                const my = oy + ((mi+1)/(( nMeio||0)+1)) * dh;
                return <line key={mi} x1={fx+6} y1={my} x2={fx+fw-6} y2={my} stroke={corTravMeio} strokeWidth="3" />;
              })}
              {/* Preenchimento horizontal */}
              {oriPreenchi === "horizontal" && barrasH.map((by,bi) => (
                <line key={bi} x1={fx+6} y1={by} x2={fx+fw-6} y2={by} stroke={corPreH} strokeWidth="1.5" />
              ))}
              {/* Preenchimento vertical - segmentos interrompidos pelas travessas do meio */}
              {oriPreenchi === "vertical" && barrasV.map((bx,bi) => {
                const nSeg = (nMeio||0) + 1;
                return [...Array(nSeg)].map((_,si) => {
                  const y1seg = oy + (si / nSeg) * dh + 4;
                  const y2seg = oy + ((si+1) / nSeg) * dh - 4;
                  return <line key={`${bi}-${si}`} x1={fx+bx} y1={y1seg} x2={fx+bx} y2={y2seg} stroke={corPreV} strokeWidth="1.5" />;
                });
              })}
              {incluiDiagonal && <line x1={fx+6} y1={oy+4} x2={fx+fw-6} y2={oy+dh-4} stroke={corDiag} strokeWidth="1.5" strokeDasharray="4,3" />}
              <text x={fx+fw/2} y={oy+dh/2-10} textAnchor="middle" fill="#999" fontSize="9" fontFamily="monospace">FOLHA {fi+1}</text>
            </g>
          );
        })}

        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox+dw} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={cotaV} orient="v" />
        {folhas > 1 && <Cota x1={ox} y1={oy+dh} x2={ox+fw} y2={oy+dh} label={`${(L/folhas).toFixed(2)} m`} offset={cotaH+22} orient="h" />}
      </svg>
      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Travessa superior"].cor}} />Travessa sup/inf</div>
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Montante vertical"].cor}} />Montante vertical</div>
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Travessa do meio"].cor}} />Travessa do meio</div>
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Barra vertical"].cor}} />{PERFIS[perfilPre]?.desc} — Preenchimento</div>
        {incluiDiagonal && <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Diagonal"].cor, height:3}} />Diagonal</div>}
      </div>
    </div>
  );
}

function PortaoCalc() {
  const [form, setForm] = useState({
    largura:"", altura:"", folhas:"2",
    perfilEst:"50x50x3", perfilPre:"30x30x2",
    oriPreenchi:"horizontal", espacamento:"15",
    incluiDiagonal:true,
    nTravessasMeio:"1",
  });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  function calcular() {
    const L = parseFloat(form.largura); const H = parseFloat(form.altura);
    const folhas = parseInt(form.folhas);
    if (!L||!H||L<=0||H<=0) return;
    const Lf = L / folhas;
    const esp = parseFloat(form.espacamento) / 100;

    // Espessura do perfil estrutural em metros (ex: 50×50 → 0.05m)
    const espEst = getEsp(form.perfilEst);
    const nMeio = parseInt(form.nTravessasMeio) || 0;

    const compTravSupInf = Lf;
    const compMontante   = H - 2 * espEst;
    const compTravMeio   = Lf - 2 * espEst;
    const compPreH       = Lf - 2 * espEst;
    const altInterna     = H - 2 * espEst;
    // Cada segmento vertical = (altInterna − nMeio×espEst) / (nMeio+1)
    const compPreV       = nMeio > 0
      ? (altInterna - nMeio * espEst) / (nMeio + 1)
      : altInterna;
    const nSegmentos     = nMeio + 1; // segmentos por barra vertical

    let nPreenchi = 0;
    if (form.oriPreenchi === "horizontal") nPreenchi = Math.max(0, Math.floor(H/esp) - 1);
    else nPreenchi = Math.max(0, Math.floor(Lf/esp) - 1);

    const diagComp = form.incluiDiagonal ? Math.sqrt(Lf**2 + H**2) : 0;

    const pecas = [];
    const pEst = PERFIS[form.perfilEst]?.pesoM||0;
    const pPre = PERFIS[form.perfilPre]?.pesoM||0;

    pecas.push({ nome:"Travessa superior", tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compTravSupInf, qtd: folhas,        compTotal: folhas*compTravSupInf,        peso: folhas*compTravSupInf*pEst,        obs:`${(compTravSupInf*100).toFixed(1)}cm — por fora` });
    pecas.push({ nome:"Travessa inferior", tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compTravSupInf, qtd: folhas,        compTotal: folhas*compTravSupInf,        peso: folhas*compTravSupInf*pEst,        obs:`${(compTravSupInf*100).toFixed(1)}cm — por fora` });
    pecas.push({ nome:"Montante vertical", tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compMontante,   qtd: 2*folhas,      compTotal: 2*folhas*compMontante,        peso: 2*folhas*compMontante*pEst,        obs:`H − 2×${(espEst*100).toFixed(1)}cm = ${(compMontante*100).toFixed(1)}cm` });
    if (nMeio > 0) {
      pecas.push({ nome:"Travessa do meio", tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compTravMeio, qtd: nMeio*folhas, compTotal: nMeio*folhas*compTravMeio, peso: nMeio*folhas*compTravMeio*pEst, obs:`Lf − 2×${(espEst*100).toFixed(1)}cm = ${(compTravMeio*100).toFixed(1)}cm` });
    }

    if (form.incluiDiagonal) {
      pecas.push({ nome:"Diagonal", tipo:"diagonal", perfil: PERFIS[form.perfilEst]?.desc, comp: diagComp, qtd: folhas, compTotal: folhas*diagComp, peso: folhas*diagComp*pEst });
    }

    // Preenchimento
    if (nPreenchi > 0) {
      if (form.oriPreenchi === "horizontal") {
        pecas.push({ nome:"Barra horizontal", tipo:"preenchimento", perfil: PERFIS[form.perfilPre]?.desc, comp: compPreH, qtd: nPreenchi*folhas, compTotal: nPreenchi*folhas*compPreH, peso: nPreenchi*folhas*compPreH*pPre, obs:`Lf − 2×${(espEst*100).toFixed(1)}cm montantes` });
      } else {
        const qtdSegmentos = nPreenchi * folhas * nSegmentos;
        const obsV = nMeio > 0
          ? `(altInt − ${nMeio}×${(espEst*100).toFixed(1)}cm) ÷ ${nSegmentos} = ${(compPreV*100).toFixed(1)}cm`
          : `altInterna = ${(compPreV*100).toFixed(1)}cm`;
        pecas.push({ nome:"Barra vertical", tipo:"preenchimento", perfil: PERFIS[form.perfilPre]?.desc, comp: compPreV, qtd: qtdSegmentos, compTotal: qtdSegmentos*compPreV, peso: qtdSegmentos*compPreV*pPre, obs: obsV });
      }
    }

    const pesoTotal = pecas.reduce((s,p) => s+p.peso, 0);
    const mTotal = pecas.reduce((s,p) => s+p.compTotal, 0);

    setResult({ pecas, pesoTotal: pesoTotal.toFixed(1), mTotal: mTotal.toFixed(2), L, H, folhas, nPreenchi, nMeio });
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Largura total <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.largura} onChange={e=>set("largura",e.target.value)} placeholder="Ex: 4.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 2.00" /></div>
            <div className="field"><label>Nº de folhas</label><select value={form.folhas} onChange={e=>set("folhas",e.target.value)}><option value="1">1 folha</option><option value="2">2 folhas</option><option value="4">4 folhas</option></select></div>
            <div className="field"><label>Travessas do meio por folha</label><select value={form.nTravessasMeio} onChange={e=>set("nTravessasMeio",e.target.value)}><option value="0">Sem travessa do meio</option><option value="1">1 travessa</option><option value="2">2 travessas</option><option value="3">3 travessas</option></select></div>
            <div className="field" style={{flexDirection:"row",alignItems:"center",gap:10}}>
              <input type="checkbox" id="diag" checked={form.incluiDiagonal} onChange={e=>set("incluiDiagonal",e.target.checked)} style={{width:"auto"}} />
              <label htmlFor="diag" style={{textTransform:"none",fontSize:13,cursor:"pointer"}}>Incluir diagonal (contraventamento)</label>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <div className="field"><label>Perfil estrutural</label><select value={form.perfilEst} onChange={e=>set("perfilEst",e.target.value)}>{perfisEstrutura().map(([k,v])=><option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>)}</select></div>
            <div className="field"><label>Perfil de preenchimento</label><select value={form.perfilPre} onChange={e=>set("perfilPre",e.target.value)}>{perfisPreenchimento().map(([k,v])=><option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>)}</select></div>
            <div className="field"><label>Orientação do preenchimento</label><select value={form.oriPreenchi} onChange={e=>set("oriPreenchi",e.target.value)}><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select></div>
            <div className="field"><label>Espaçamento preenchimento <span className="unit">(cm)</span></label><input type="number" min="3" max="100" step="1" value={form.espacamento} onChange={e=>set("espacamento",e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:12}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PORTÃO</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,largura:"",altura:""}));setResult(null);}}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoPortao L={result.L} H={result.H} folhas={result.folhas} nBarrasH={form.oriPreenchi==="horizontal"?result.nPreenchi:0} nBarrasV={form.oriPreenchi==="vertical"?result.nPreenchi:0} nMeio={result.nMeio} oriPreenchi={form.oriPreenchi} incluiDiagonal={form.incluiDiagonal} perfilEst={form.perfilEst} perfilPre={form.perfilPre} />
        <ListaCorte pecas={result.pecas} perfilEst={form.perfilEst} perfilPre={form.perfilPre} />
        <div className="results">
          <div className="results-header">✔ Resumo</div>
          <div className="results-body">
            <div className="result-row"><span className="result-label">Total de material</span><span className="result-value">{result.mTotal} m</span></div>
            <div className="result-row"><span className="result-label">Peso total estimado</span><span className="result-value" style={{fontSize:18}}>{result.pesoTotal} kg</span></div>
          </div>
        </div>
      </>)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PARAPEITO
// ══════════════════════════════════════════════════════════════════════════════
function DesenhoParapeito({ L, H, nPostes, nElementos, oriPreenchi, perfilEst, perfilPre }) {
  const W = 680; const SH = 280;
  const cotaV = 50; const cotaH = 36; const pad = 14; const padR = 70;
  const dw = W - cotaV - pad - padR; const dh = SH - cotaH - pad - 20;
  const ox = cotaV; const oy = 20;

  const postesX = [];
  for (let i=0;i<nPostes;i++) postesX.push(ox + (i/(nPostes-1||1))*dw);

  const elsY = []; const elsX = [];
  if (oriPreenchi === "horizontal") { for(let i=1;i<=nElementos;i++) elsY.push(oy+(i/(nElementos+1))*dh); }
  else { for(let i=1;i<=Math.min(nElementos,40);i++) elsX.push(ox+(i/(nElementos+1))*dw); }

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — PARAPEITO</div>
      <svg viewBox={`0 0 ${W} ${SH}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={SH} fill="#f5f5f0" />
        
        <line x1={ox} y1={oy} x2={ox+dw} y2={oy} stroke="#4a9eff" strokeWidth="3" />
        <line x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} stroke="#4a9eff" strokeWidth="3" />
        {postesX.map((px,i)=><rect key={i} x={px-3} y={oy} width={6} height={dh} fill="#4a9eff" opacity="0.9" />)}
        {elsY.map((ey,i)=><line key={i} x1={ox} y1={ey} x2={ox+dw} y2={ey} stroke="#6fcf6f" strokeWidth="1.5" />)}
        {elsX.map((ex,i)=><line key={i} x1={ex} y1={oy} x2={ex} y2={oy+dh} stroke="#6fcf6f" strokeWidth="1.5" />)}
        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox+dw} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={cotaV} orient="v" />
        {nPostes>1 && <Cota x1={postesX[0]} y1={oy+dh} x2={postesX[1]} y2={oy+dh} label={`${(L/(nPostes-1)).toFixed(2)} m`} offset={cotaH+22} orient="h" />}
      </svg>
      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{background:"#4a9eff"}} />{PERFIS[perfilEst]?.desc} — Postes e travessas</div>
        <div className="legend-item"><div className="legend-swatch" style={{background:"#6fcf6f"}} />{PERFIS[perfilPre]?.desc} — Preenchimento {oriPreenchi}</div>
      </div>
    </div>
  );
}

function ParapeitoCalc() {
  const [form, setForm] = useState({ comprimento:"", altura:"", perfilEst:"50x50x3", perfilPre:"30x30x2", oriPreenchi:"horizontal", espacamento:"12", postesEsp:"200" });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  function calcular() {
    const L = parseFloat(form.comprimento); const H = parseFloat(form.altura);
    if (!L||!H||L<=0||H<=0) return;
    const espPoste = parseFloat(form.postesEsp)/100;
    const nPostes = Math.ceil(L/espPoste)+1;
    const esp = parseFloat(form.espacamento)/100;
    const espEst = getEsp(form.perfilEst); // espessura do perfil estrutural em metros

    let nEl = 0;
    if (form.oriPreenchi==="horizontal") nEl = Math.max(0,Math.floor(H/esp)-1);
    else nEl = Math.max(0,Math.floor(L/esp)-1);

    // MONTAGEM PARAPEITO:
    // Postes: altura total (passam por fora, travessas encaixam entre eles)
    // Travessas sup/inf: comprimento total L (passam de posta a poste por fora)
    // Preenchimento horizontal: por dentro dos postes (vão − 2× poste)
    // Preenchimento vertical: por dentro das travessas (H − 2× travessa)
    const vao = L / (nPostes - 1 || 1); // distância entre postes
    const compPoste   = H;                      // poste: altura total
    const compTravessa = L;                     // travessa: comprimento total
    const compPreH    = vao - 2 * espEst;       // horizontal: vão − 2 postes
    const compPreV    = H - 2 * espEst;         // vertical: H − sup − inf

    const pEst = PERFIS[form.perfilEst]?.pesoM||0;
    const pPre = PERFIS[form.perfilPre]?.pesoM||0;

    const pecas = [];
    pecas.push({ nome:"Poste vertical",   tipo:"estrutura",    perfil:PERFIS[form.perfilEst]?.desc, comp:compPoste,    qtd:nPostes, compTotal:nPostes*compPoste,    peso:nPostes*compPoste*pEst,    obs:"altura total" });
    pecas.push({ nome:"Travessa superior", tipo:"estrutura",   perfil:PERFIS[form.perfilEst]?.desc, comp:compTravessa, qtd:1,       compTotal:compTravessa,           peso:compTravessa*pEst,         obs:"comprimento total" });
    pecas.push({ nome:"Travessa inferior", tipo:"estrutura",   perfil:PERFIS[form.perfilEst]?.desc, comp:compTravessa, qtd:1,       compTotal:compTravessa,           peso:compTravessa*pEst,         obs:"comprimento total" });
    if (nEl>0) {
      const compEl = form.oriPreenchi==="horizontal" ? compPreH : compPreV;
      const obs = form.oriPreenchi==="horizontal"
        ? `vão − 2×${(espEst*100).toFixed(0)}cm postes`
        : `H − 2×${(espEst*100).toFixed(0)}cm travessas`;
      pecas.push({ nome: form.oriPreenchi==="horizontal"?"Barra horizontal":"Barra vertical", tipo:"preenchimento", perfil:PERFIS[form.perfilPre]?.desc, comp:compEl, qtd:nEl, compTotal:nEl*compEl, peso:nEl*compEl*pPre, obs });
    }

    const pesoTotal = pecas.reduce((s,p)=>s+p.peso,0);
    const mTotal = pecas.reduce((s,p)=>s+p.compTotal,0);
    setResult({ pecas, pesoTotal:pesoTotal.toFixed(1), mTotal:mTotal.toFixed(2), L, H, nPostes, nEl });
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Comprimento <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.comprimento} onChange={e=>set("comprimento",e.target.value)} placeholder="Ex: 10.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.8" step="0.05" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 1.10" /></div>
            <div className="field"><label>Espaçamento entre postes <span className="unit">(cm)</span></label><input type="number" min="50" max="300" step="10" value={form.postesEsp} onChange={e=>set("postesEsp",e.target.value)} /></div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <div className="field"><label>Perfil dos postes / travessas</label><select value={form.perfilEst} onChange={e=>set("perfilEst",e.target.value)}>{perfisEstrutura().map(([k,v])=><option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>)}</select></div>
            <div className="field"><label>Perfil de preenchimento</label><select value={form.perfilPre} onChange={e=>set("perfilPre",e.target.value)}>{perfisPreenchimento().map(([k,v])=><option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>)}</select></div>
            <div className="field"><label>Orientação do preenchimento</label><select value={form.oriPreenchi} onChange={e=>set("oriPreenchi",e.target.value)}><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select></div>
            <div className="field"><label>Espaçamento preenchimento <span className="unit">(cm)</span></label><input type="number" min="3" max="50" step="1" value={form.espacamento} onChange={e=>set("espacamento",e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:12}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PARAPEITO</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,comprimento:"",altura:""}));setResult(null);}}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoParapeito L={result.L} H={result.H} nPostes={result.nPostes} nElementos={result.nEl} oriPreenchi={form.oriPreenchi} perfilEst={form.perfilEst} perfilPre={form.perfilPre} />
        <ListaCorte pecas={result.pecas} perfilEst={form.perfilEst} perfilPre={form.perfilPre} />
        <div className="results">
          <div className="results-header">✔ Resumo</div>
          <div className="results-body">
            <div className="result-row"><span className="result-label">Total de material</span><span className="result-value">{result.mTotal} m</span></div>
            <div className="result-row"><span className="result-label">Peso total estimado</span><span className="result-value" style={{fontSize:18}}>{result.pesoTotal} kg</span></div>
            {parseFloat(form.altura)<1.05 && <div className="alert">⚠ Altura abaixo de 1,05m. NBR 9050 exige mínimo de 1,05m em locais públicos.</div>}
          </div>
        </div>
      </>)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GRADE
// ══════════════════════════════════════════════════════════════════════════════
function DesenhoGrade({ L, H, nV, nH, perfilMoldura, perfilBarra }) {
  const W = 480; const SH = 340;
  const cotaV = 50; const cotaH = 36; const pad = 14; const padR = 70;
  const dw = W - cotaV - pad - padR; const dh = SH - cotaH - pad - 20;
  const ox = cotaV; const oy = 20;

  const barrasV = []; for(let i=1;i<=Math.min(nV,30);i++) barrasV.push(ox+(i/(nV+1))*dw);
  const barrasH = []; for(let i=1;i<=Math.min(nH,25);i++) barrasH.push(oy+(i/(nH+1))*dh);

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — GRADE</div>
      <svg viewBox={`0 0 ${W} ${SH}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={SH} fill="#f5f5f0" />
        {barrasV.map((bx,i)=><line key={i} x1={bx} y1={oy+3} x2={bx} y2={oy+dh-3} stroke="#6fcf6f" strokeWidth="2" />)}
        {barrasH.map((by,i)=><line key={i} x1={ox+3} y1={by} x2={ox+dw-3} y2={by} stroke="#6fcf6f" strokeWidth="1.5" opacity="0.7" />)}
        <rect x={ox} y={oy} width={dw} height={dh} fill="none" stroke="#4a9eff" strokeWidth="4" />
        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox+dw} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={cotaV} orient="v" />
      </svg>
      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{background:"#4a9eff"}} />{PERFIS[perfilMoldura]?.desc} — Moldura</div>
        <div className="legend-item"><div className="legend-swatch" style={{background:"#6fcf6f"}} />{PERFIS[perfilBarra]?.desc} — Barras internas</div>
      </div>
    </div>
  );
}

function GradeCalc() {
  const [form, setForm] = useState({ largura:"", altura:"", perfilMoldura:"40x40x3", perfilBarra:"30x30x2", oriPreenchi:"vertical", espacamentoV:"10", espacamentoH:"0", temMontanteH:false });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  function calcular() {
    const L = parseFloat(form.largura); const H = parseFloat(form.altura);
    if (!L||!H||L<=0||H<=0) return;
    const espV = parseFloat(form.espacamentoV)/100;
    const nV = Math.max(0,Math.floor(L/espV)-1);
    let nH=0;
    if (form.temMontanteH&&form.espacamentoH) { const espH=parseFloat(form.espacamentoH)/100; nH=Math.max(0,Math.floor(H/espH)-1); }

    const espMoldura = getEsp(form.perfilMoldura);
    // MONTAGEM GRADE:
    // Laterais: altura total (passam por fora, sup/inf encaixam entre elas)
    // Sup/inf: L − 2× lateral (por dentro das laterais)
    // Barras verticais: H − 2× moldura sup/inf
    // Travessas horizontais internas: L − 2× lateral
    const compLateral   = H;                        // lateral: altura total
    const compTopBot    = L - 2 * espMoldura;       // sup/inf: por dentro das laterais
    const compBarraV    = H - 2 * espMoldura;       // vertical: por dentro de sup e inf
    const compTraversaH = L - 2 * espMoldura;       // travessa interna: por dentro das laterais

    const pMol = PERFIS[form.perfilMoldura]?.pesoM||0;
    const pBar = PERFIS[form.perfilBarra]?.pesoM||0;

    const pecas = [];
    pecas.push({ nome:"Moldura lateral",   tipo:"estrutura",    perfil:PERFIS[form.perfilMoldura]?.desc, comp:compLateral,   qtd:2,  compTotal:2*compLateral,       peso:2*compLateral*pMol,       obs:"altura total" });
    pecas.push({ nome:"Moldura superior",  tipo:"estrutura",    perfil:PERFIS[form.perfilMoldura]?.desc, comp:compTopBot,    qtd:1,  compTotal:compTopBot,           peso:compTopBot*pMol,           obs:`L − 2×${(espMoldura*100).toFixed(0)}cm laterais` });
    pecas.push({ nome:"Moldura inferior",  tipo:"estrutura",    perfil:PERFIS[form.perfilMoldura]?.desc, comp:compTopBot,    qtd:1,  compTotal:compTopBot,           peso:compTopBot*pMol,           obs:`L − 2×${(espMoldura*100).toFixed(0)}cm laterais` });
    if (nV>0) pecas.push({ nome:"Barra vertical",     tipo:"preenchimento", perfil:PERFIS[form.perfilBarra]?.desc,   comp:compBarraV,    qtd:nV, compTotal:nV*compBarraV,       peso:nV*compBarraV*pBar,       obs:`H − 2×${(espMoldura*100).toFixed(0)}cm moldura` });
    if (nH>0) pecas.push({ nome:"Travessa horizontal", tipo:"preenchimento", perfil:PERFIS[form.perfilBarra]?.desc,  comp:compTraversaH, qtd:nH, compTotal:nH*compTraversaH,    peso:nH*compTraversaH*pBar,    obs:`L − 2×${(espMoldura*100).toFixed(0)}cm laterais` });

    const aberturaOk = espV<=0.11;
    const pesoTotal = pecas.reduce((s,p)=>s+p.peso,0);
    const mTotal = pecas.reduce((s,p)=>s+p.compTotal,0);
    setResult({ pecas, pesoTotal:pesoTotal.toFixed(1), mTotal:mTotal.toFixed(2), L, H, nV, nH, aberturaOk, espVcm:(espV*100).toFixed(0) });
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Largura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.largura} onChange={e=>set("largura",e.target.value)} placeholder="Ex: 1.20" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 2.10" /></div>
            <div className="field"><label>Espaçamento barras verticais <span className="unit">(cm)</span></label><input type="number" min="3" max="30" step="0.5" value={form.espacamentoV} onChange={e=>set("espacamentoV",e.target.value)} /></div>
            <div className="field" style={{flexDirection:"row",alignItems:"center",gap:10}}>
              <input type="checkbox" id="mh" checked={form.temMontanteH} onChange={e=>set("temMontanteH",e.target.checked)} style={{width:"auto"}} />
              <label htmlFor="mh" style={{textTransform:"none",fontSize:13,cursor:"pointer"}}>Adicionar travessas horizontais</label>
            </div>
            {form.temMontanteH && <div className="field"><label>Espaçamento travessas <span className="unit">(cm)</span></label><input type="number" min="10" max="100" step="5" value={form.espacamentoH} onChange={e=>set("espacamentoH",e.target.value)} /></div>}
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <div className="field"><label>Perfil da moldura</label><select value={form.perfilMoldura} onChange={e=>set("perfilMoldura",e.target.value)}>{perfisEstrutura().map(([k,v])=><option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>)}</select></div>
            <div className="field"><label>Perfil das barras internas</label><select value={form.perfilBarra} onChange={e=>set("perfilBarra",e.target.value)}>{perfisPreenchimento().map(([k,v])=><option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>)}</select></div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:12}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR GRADE</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,largura:"",altura:""}));setResult(null);}}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoGrade L={result.L} H={result.H} nV={result.nV} nH={result.nH} perfilMoldura={form.perfilMoldura} perfilBarra={form.perfilBarra} />
        <ListaCorte pecas={result.pecas} perfilEst={form.perfilMoldura} perfilPre={form.perfilBarra} />
        <div className="results">
          <div className="results-header">✔ Resumo</div>
          <div className="results-body">
            <div className="result-row"><span className="result-label">Total de material</span><span className="result-value">{result.mTotal} m</span></div>
            <div className="result-row"><span className="result-label">Peso total estimado</span><span className="result-value" style={{fontSize:18}}>{result.pesoTotal} kg</span></div>
            <div className="result-row"><span className="result-label">Abertura livre entre barras</span><span className={`result-value ${result.aberturaOk?"":"danger"}`}>{result.espVcm} cm {result.aberturaOk?"✔":"✘"}</span></div>
            {!result.aberturaOk && <div className="alert">⚠ Abertura maior que 11cm. NBR 9050 recomenda máx. 11cm para segurança infantil.</div>}
          </div>
        </div>
      </>)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id:"portao", label:"🚪 Portão", comp:PortaoCalc },
  { id:"parapeito", label:"🏗 Parapeito", comp:ParapeitoCalc },
  { id:"grade", label:"⊞ Grade", comp:GradeCalc },
];

export default function App() {
  const [tab, setTab] = useState("portao");
  const Active = TABS.find(t => t.id === tab).comp;
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-icon">🔧</div>
          <div>
            <div className="header-title">SerCalc Pro</div>
            <div className="header-sub">Calculadora para Serralheiros · Portões · Parapeitos · Grades</div>
          </div>
        </div>
        <div className="tabs">
          {TABS.map(t => (
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="content"><Active /></div>
      </div>
    </>
  );
}