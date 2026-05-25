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
  .drawing-box { background: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 4px; overflow: hidden; }
  .drawing-header { background: #181818; padding: 12px 20px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: #aaa; border-bottom: 1px solid #2a2a2a; }
  .drawing-svg { width: 100%; display: block; }
  .legend-box { background: #151515; border-top: 1px solid #2a2a2a; padding: 14px 20px; display: flex; flex-wrap: wrap; gap: 14px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #999; }
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
  "40x20x2":   { desc: "Tubo 40×20 e=2mm",   pesoM: 1.78, tipo: "retangular" },
  "50x30x2":   { desc: "Tubo 50×30 e=2mm",   pesoM: 2.42, tipo: "retangular" },
  "60x40x2":   { desc: "Tubo 60×40 e=2mm",   pesoM: 3.07, tipo: "retangular" },
  "60x40x3":   { desc: "Tubo 60×40 e=3mm",   pesoM: 4.47, tipo: "retangular" },
  "80x40x2":   { desc: "Tubo 80×40 e=2mm",   pesoM: 3.60, tipo: "retangular" },
  "80x40x3":   { desc: "Tubo 80×40 e=3mm",   pesoM: 5.45, tipo: "retangular" },
  "100x50x2":  { desc: "Tubo 100×50 e=2mm",  pesoM: 4.52, tipo: "retangular" },
  "100x50x3":  { desc: "Tubo 100×50 e=3mm",  pesoM: 6.71, tipo: "retangular" },
  "100x50x4":  { desc: "Tubo 100×50 e=4mm",  pesoM: 8.78, tipo: "retangular" },
  "120x60x3":  { desc: "Tubo 120×60 e=3mm",  pesoM: 8.13, tipo: "retangular" },
  // Barras chatas
  "bc_19x3":   { desc: "Barra chata 3/4\" (19×3)",  pesoM: 0.45, tipo: "barra" },
  "bc_25x3":   { desc: "Barra chata 25×3mm",         pesoM: 0.59, tipo: "barra" },
  "bc_25x5":   { desc: "Barra chata 25×5mm",         pesoM: 0.98, tipo: "barra" },
  "bc_38x5":   { desc: "Barra chata 38×5mm",         pesoM: 1.49, tipo: "barra" },
  "bc_50x5":   { desc: "Barra chata 50×5mm",         pesoM: 1.96, tipo: "barra" },
};

function perfisEstrutura() { return Object.entries(PERFIS).filter(([,v]) => v.tipo !== "barra"); }
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

function Cota({ x1, y1, x2, y2, label, offset = 18, orient = "h" }) {
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
    const x = x1 - offset;
    return (
      <g>
        <line x1={x1} y1={y1} x2={x} y2={y1} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x1} y1={y2} x2={x} y2={y2} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={co} strokeWidth="1" markerStart="url(#arr)" markerEnd="url(#arr)" />
        <text x={x-3} y={(y1+y2)/2+4} textAnchor="end" fill={co} fontSize={ts} fontFamily="monospace">{label}</text>
      </g>
    );
  }
}

// ─── LISTA DE CORTE ──────────────────────────────────────────────────────────
function ListaCorte({ pecas }) {
  const totalPeso = pecas.reduce((s, p) => s + p.peso, 0);
  const totalMetros = pecas.reduce((s, p) => s + p.compTotal, 0);
  return (
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
            {pecas.map((p, i) => (
              <tr key={i}>
                <td style={{ color: "#555" }}>{i + 1}</td>
                <td><span className={`corte-tag ${p.tipo === "estrutura" ? "corte-est" : p.tipo === "diagonal" ? "corte-diag" : "corte-pre"}`}>{p.nome}</span></td>
                <td style={{ color: "#aaa" }}>{p.perfil}</td>
                <td style={{ color: "#e8e0d0", fontWeight: 600 }}>{(p.comp * 100).toFixed(0)} cm</td>
                <td style={{ color: "#e8e0d0" }}>{p.qtd}</td>
                <td>{p.compTotal.toFixed(2)}</td>
                <td>{p.peso.toFixed(2)}</td>
                <td style={{ color: "#666", fontSize: 10 }}>{p.obs || "—"}</td>
              </tr>
            ))}
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
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTÃO
// ══════════════════════════════════════════════════════════════════════════════
function DesenhoPortao({ L, H, folhas, nBarrasH, nBarrasV, oriPreenchi, incluiDiagonal, perfilEst, perfilPre }) {
  const W = 580; const SH = 320;
  const cotaV = 42; const cotaH = 32; const pad = 14;
  const dw = W - cotaV - pad; const dh = SH - cotaH - pad - 10;
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
        <rect width={W} height={SH} fill="#0a0a0a" />
        <line x1={ox} y1={oy+dh+4} x2={ox+dw} y2={oy+dh+4} stroke="#555" strokeWidth="3" />
        {[...Array(12)].map((_,i) => <line key={i} x1={ox+i*(dw/12)} y1={oy+dh+4} x2={ox+i*(dw/12)-8} y2={oy+dh+14} stroke="#444" strokeWidth="1" />)}

        {[...Array(folhas)].map((_,fi) => {
          const fx = ox + fi * fw;
          return (
            <g key={fi}>
              <rect x={fx+1} y={oy} width={fw-2} height={dh} fill="none" stroke="#4a9eff" strokeWidth="3" />
              <line x1={fx+1} y1={oy+dh/2} x2={fx+fw-1} y2={oy+dh/2} stroke="#4a9eff" strokeWidth="2.5" />
              {oriPreenchi === "horizontal" && barrasH.map((by,bi) => (
                <line key={bi} x1={fx+4} y1={by} x2={fx+fw-4} y2={by} stroke="#6fcf6f" strokeWidth="1.5" />
              ))}
              {oriPreenchi === "vertical" && barrasV.map((bx,bi) => (
                <line key={bi} x1={fx+bx} y1={oy+3} x2={fx+bx} y2={oy+dh-3} stroke="#6fcf6f" strokeWidth="1.5" />
              ))}
              {incluiDiagonal && <line x1={fx+3} y1={oy+3} x2={fx+fw-3} y2={oy+dh-3} stroke="#e0a020" strokeWidth="1.5" strokeDasharray="4,3" />}
              <text x={fx+fw/2} y={oy+dh/2-8} textAnchor="middle" fill="#444" fontSize="9" fontFamily="monospace">FOLHA {fi+1}</text>
            </g>
          );
        })}

        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={cotaV} orient="v" />
        {folhas > 1 && <Cota x1={ox} y1={oy+dh} x2={ox+fw} y2={oy+dh} label={`${(L/folhas).toFixed(2)} m`} offset={cotaH+22} orient="h" />}
      </svg>
      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{background:"#4a9eff"}} />{PERFIS[perfilEst]?.desc} — Estrutura</div>
        <div className="legend-item"><div className="legend-swatch" style={{background:"#6fcf6f"}} />{PERFIS[perfilPre]?.desc} — Preenchimento</div>
        {incluiDiagonal && <div className="legend-item"><div className="legend-swatch" style={{background:"#e0a020",height:3}} />Diagonal</div>}
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

    // MONTAGEM: travessas passam de lado a lado (comprimento = Lf)
    //           montantes ficam por dentro das travessas (H − sup − inf)
    //           travessa do meio tbm por dentro (H − sup − inf, já descontado)
    //           preenchimento horizontal por dentro dos montantes (Lf − 2×montante)
    //           preenchimento vertical por dentro de todas as travessas (H − 3×travessa)
    const nTravessas = 3; // sup + inf + meio

    // MONTAGEM PORTÃO (confirmado):
    // Travessa sup e inf (2 por folha) → comprimento total da folha (Lf), por fora
    // Montantes verticais (2 por folha) → H − 2×esp (por dentro de sup e inf)
    // Travessa do meio (1 por folha) → Lf − 2×esp (por dentro dos montantes)
    // Preenchimento horizontal → Lf − 2×esp (por dentro dos montantes)
    // Preenchimento vertical → H − 3×esp (por dentro das 3 travessas)
    const compTravSupInf = Lf;              // sup e inf: largura total da folha
    const compMontante   = H - 2 * espEst; // montantes: por dentro de sup e inf
    const compTravMeio   = Lf - 2 * espEst; // meio: por dentro dos 2 montantes
    const compPreH       = Lf - 2 * espEst; // horizontal: por dentro dos montantes
    const compPreV       = H - nTravessas * espEst; // vertical: H − 3 travessas

    let nPreenchi = 0;
    if (form.oriPreenchi === "horizontal") nPreenchi = Math.max(0, Math.floor(H/esp) - 1);
    else nPreenchi = Math.max(0, Math.floor(Lf/esp) - 1);

    const diagComp = form.incluiDiagonal ? Math.sqrt(Lf**2 + H**2) : 0;

    const pecas = [];
    const pEst = PERFIS[form.perfilEst]?.pesoM||0;
    const pPre = PERFIS[form.perfilPre]?.pesoM||0;

    // Travessa sup e inf: 2 por folha, comprimento total da folha
    pecas.push({ nome:"Travessa superior", tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compTravSupInf, qtd: folhas,   compTotal: folhas*compTravSupInf,   peso: folhas*compTravSupInf*pEst,   obs:`${(compTravSupInf*100).toFixed(0)}cm — por fora` });
    pecas.push({ nome:"Travessa inferior", tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compTravSupInf, qtd: folhas,   compTotal: folhas*compTravSupInf,   peso: folhas*compTravSupInf*pEst,   obs:`${(compTravSupInf*100).toFixed(0)}cm — por fora` });
    // Montantes: 2 por folha, por dentro de sup e inf
    pecas.push({ nome:"Montante vertical", tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compMontante,   qtd: 2*folhas, compTotal: 2*folhas*compMontante,   peso: 2*folhas*compMontante*pEst,   obs:`H − 2×${(espEst*100).toFixed(0)}cm = ${(compMontante*100).toFixed(0)}cm` });
    // Travessa do meio: 1 por folha, por dentro dos montantes
    pecas.push({ nome:"Travessa do meio",  tipo:"estrutura", perfil: PERFIS[form.perfilEst]?.desc, comp: compTravMeio,   qtd: folhas,   compTotal: folhas*compTravMeio,     peso: folhas*compTravMeio*pEst,     obs:`Lf − 2×${(espEst*100).toFixed(0)}cm = ${(compTravMeio*100).toFixed(0)}cm` });

    if (form.incluiDiagonal) {
      pecas.push({ nome:"Diagonal", tipo:"diagonal", perfil: PERFIS[form.perfilEst]?.desc, comp: diagComp, qtd: folhas, compTotal: folhas*diagComp, peso: folhas*diagComp*pEst });
    }

    // Preenchimento
    if (nPreenchi > 0) {
      const compPre = form.oriPreenchi === "horizontal" ? compPreH : compPreV;
      const nomePre = form.oriPreenchi === "horizontal" ? "Barra horizontal" : "Barra vertical";
      const obs = form.oriPreenchi === "horizontal"
        ? `Lf − 2×${(espEst*100).toFixed(0)}cm montantes`
        : `H − ${nTravessas}×${(espEst*100).toFixed(0)}cm travessas`;
      pecas.push({ nome: nomePre, tipo:"preenchimento", perfil: PERFIS[form.perfilPre]?.desc, comp: compPre, qtd: nPreenchi*folhas, compTotal: nPreenchi*folhas*compPre, peso: nPreenchi*folhas*compPre*pPre, obs });
    }

    const pesoTotal = pecas.reduce((s,p) => s+p.peso, 0);
    const mTotal = pecas.reduce((s,p) => s+p.compTotal, 0);

    setResult({ pecas, pesoTotal: pesoTotal.toFixed(1), mTotal: mTotal.toFixed(2), L, H, folhas, nPreenchi });
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
        <DesenhoPortao L={result.L} H={result.H} folhas={result.folhas} nBarrasH={form.oriPreenchi==="horizontal"?result.nPreenchi:0} nBarrasV={form.oriPreenchi==="vertical"?result.nPreenchi:0} oriPreenchi={form.oriPreenchi} incluiDiagonal={form.incluiDiagonal} perfilEst={form.perfilEst} perfilPre={form.perfilPre} />
        <ListaCorte pecas={result.pecas} />
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
  const W = 580; const SH = 280;
  const cotaV = 42; const cotaH = 32; const pad = 14;
  const dw = W - cotaV - pad; const dh = SH - cotaH - pad - 20;
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
        <rect width={W} height={SH} fill="#0a0a0a" />
        <line x1={ox-10} y1={oy+dh+4} x2={ox+dw+10} y2={oy+dh+4} stroke="#555" strokeWidth="3" />
        {[...Array(12)].map((_,i)=><line key={i} x1={ox-10+i*((dw+20)/12)} y1={oy+dh+4} x2={ox-18+i*((dw+20)/12)} y2={oy+dh+14} stroke="#444" strokeWidth="1" />)}
        <line x1={ox} y1={oy} x2={ox+dw} y2={oy} stroke="#4a9eff" strokeWidth="3" />
        <line x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} stroke="#4a9eff" strokeWidth="3" />
        {postesX.map((px,i)=><rect key={i} x={px-3} y={oy} width={6} height={dh} fill="#4a9eff" opacity="0.9" />)}
        {elsY.map((ey,i)=><line key={i} x1={ox} y1={ey} x2={ox+dw} y2={ey} stroke="#6fcf6f" strokeWidth="1.5" />)}
        {elsX.map((ex,i)=><line key={i} x1={ex} y1={oy} x2={ex} y2={oy+dh} stroke="#6fcf6f" strokeWidth="1.5" />)}
        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={cotaV} orient="v" />
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
        <ListaCorte pecas={result.pecas} />
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
  const W = 400; const SH = 340;
  const cotaV = 42; const cotaH = 32; const pad = 14;
  const dw = W - cotaV - pad; const dh = SH - cotaH - pad - 20;
  const ox = cotaV; const oy = 20;

  const barrasV = []; for(let i=1;i<=Math.min(nV,30);i++) barrasV.push(ox+(i/(nV+1))*dw);
  const barrasH = []; for(let i=1;i<=Math.min(nH,25);i++) barrasH.push(oy+(i/(nH+1))*dh);

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — GRADE</div>
      <svg viewBox={`0 0 ${W} ${SH}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={SH} fill="#0a0a0a" />
        {barrasV.map((bx,i)=><line key={i} x1={bx} y1={oy+3} x2={bx} y2={oy+dh-3} stroke="#6fcf6f" strokeWidth="2" />)}
        {barrasH.map((by,i)=><line key={i} x1={ox+3} y1={by} x2={ox+dw-3} y2={by} stroke="#6fcf6f" strokeWidth="1.5" opacity="0.7" />)}
        <rect x={ox} y={oy} width={dw} height={dh} fill="none" stroke="#4a9eff" strokeWidth="4" />
        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={cotaV} orient="v" />
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
        <ListaCorte pecas={result.pecas} />
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