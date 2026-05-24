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
  .results-header { background: #1a2e1a; padding: 14px 20px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; color: #6fcf6f; border-bottom: 1px solid #2d4a2d; display: flex; align-items: center; gap: 8px; }
  .results-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; }
  .result-row { display: flex; justify-content: space-between; align-items: baseline; padding: 8px 0; border-bottom: 1px solid #1a2e1a; }
  .result-row:last-child { border-bottom: none; }
  .result-label { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #888; letter-spacing: 1px; }
  .result-value { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 600; color: #6fcf6f; }
  .result-value.warn { color: #f5a623; }
  .result-value.danger { color: #e05050; }
  .alert { background: #2a1a0a; border: 1px solid #f5a623; border-radius: 3px; padding: 12px 16px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #f5a623; letter-spacing: 0.5px; }
  .divider { border: none; border-top: 1px solid #2a2a2a; margin: 4px 0; }
  .result-group-title { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 2px; color: #f5a623; margin-top: 6px; }
  .drawing-box { background: #0a0a0a; border: 1px solid #2a2a2a; border-radius: 4px; overflow: hidden; }
  .drawing-header { background: #181818; padding: 12px 20px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: #aaa; border-bottom: 1px solid #2a2a2a; }
  .drawing-svg { width: 100%; display: block; }
  .legend-box { background: #151515; border: 1px solid #2a2a2a; border-radius: 4px; padding: 16px 20px; display: flex; flex-wrap: wrap; gap: 12px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #999; }
  .legend-swatch { width: 28px; height: 6px; border-radius: 2px; }
`;

const TUBE_PROFILES = {
  "30x30x2": { desc: "30×30 e=2mm", pesoM: 1.78, areaMm2: 227 },
  "40x40x2": { desc: "40×40 e=2mm", pesoM: 2.42, areaMm2: 308 },
  "40x40x3": { desc: "40×40 e=3mm", pesoM: 3.50, areaMm2: 446 },
  "50x50x2": { desc: "50×50 e=2mm", pesoM: 3.07, areaMm2: 391 },
  "50x50x3": { desc: "50×50 e=3mm", pesoM: 4.47, areaMm2: 569 },
  "60x60x3": { desc: "60×60 e=3mm", pesoM: 5.45, areaMm2: 694 },
  "80x40x3": { desc: "80×40 e=3mm", pesoM: 5.45, areaMm2: 694 },
  "100x50x3": { desc: "100×50 e=3mm", pesoM: 6.71, areaMm2: 854 },
  "100x50x4": { desc: "100×50 e=4mm", pesoM: 8.78, areaMm2: 1118 },
};

function calcWindLoad(altura, largura, velocidadeVento = 40) {
  const q = 0.613 * (velocidadeVento / 3.6) ** 2;
  const Cp = 1.3; const Ce = 1.0;
  const area = altura * largura;
  const forca = q * Cp * Ce * area;
  return { q: q.toFixed(0), forcaN: forca.toFixed(0), forceKgf: (forca / 9.81).toFixed(1) };
}

function checkDeflection(vao_m, pesoTotalKg, profile) {
  const E = 200000;
  const h = parseInt(profile.split("x")[1]) || 40;
  const b = parseInt(profile.split("x")[0]) || 40;
  const I = (b * h ** 3) / 12;
  const L = vao_m * 1000;
  const w = (pesoTotalKg * 9.81) / L;
  const delta = (5 * w * L ** 4) / (384 * E * I);
  const limite = L / 250;
  return { delta: delta.toFixed(1), limite: limite.toFixed(1), ok: delta <= limite };
}

// ─── COTA helper ────────────────────────────────────────────────────────────
function Cota({ x1, y1, x2, y2, label, offset = 18, orient = "h" }) {
  const co = "#f5a623"; const ts = 9;
  if (orient === "h") {
    const y = y1 + offset;
    return (
      <g>
        <line x1={x1} y1={y1} x2={x1} y2={y} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x2} y1={y1} x2={x2} y2={y} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={co} strokeWidth="1" markerStart="url(#arr)" markerEnd="url(#arr)" />
        <text x={(x1 + x2) / 2} y={y + ts + 2} textAnchor="middle" fill={co} fontSize={ts} fontFamily="monospace">{label}</text>
      </g>
    );
  } else {
    const x = x1 - offset;
    return (
      <g>
        <line x1={x1} y1={y1} x2={x} y2={y1} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x1} y1={y2} x2={x} y2={y2} stroke={co} strokeWidth="0.8" strokeDasharray="2,2" />
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={co} strokeWidth="1" markerStart="url(#arr)" markerEnd="url(#arr)" />
        <text x={x - 3} y={(y1 + y2) / 2 + 4} textAnchor="end" fill={co} fontSize={ts} fontFamily="monospace">{label}</text>
      </g>
    );
  }
}

function Defs() {
  return (
    <defs>
      <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#f5a623" />
      </marker>
    </defs>
  );
}

// ─── DESENHO PORTÃO ──────────────────────────────────────────────────────────
function DesenhoPortao({ largura, altura, folhas, nBarrasH, incluiDiagonal, perfilEstrutura, perfilPreenchimento }) {
  const W = 560; const H = 320;
  const pad = 60; const cotaH = 30; const cotaV = 36;
  const dw = W - pad - cotaV - 10;
  const dh = H - pad - cotaH - 10;
  const ox = cotaV + 10; const oy = 10;
  const fw = dw / folhas;

  const barras = [];
  const espacamento = dh / (nBarrasH + 1);
  for (let i = 1; i <= nBarrasH; i++) {
    barras.push(oy + i * espacamento);
  }

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — PORTÃO</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={H} fill="#0a0a0a" />

        {/* Solo */}
        <line x1={ox} y1={oy + dh + 4} x2={ox + dw} y2={oy + dh + 4} stroke="#555" strokeWidth="3" />
        {[...Array(10)].map((_, i) => (
          <line key={i} x1={ox + i * (dw / 10)} y1={oy + dh + 4} x2={ox + i * (dw / 10) - 8} y2={oy + dh + 14} stroke="#444" strokeWidth="1" />
        ))}

        {/* Folhas */}
        {[...Array(folhas)].map((_, fi) => {
          const fx = ox + fi * fw;
          return (
            <g key={fi}>
              {/* Moldura */}
              <rect x={fx + 1} y={oy} width={fw - 2} height={dh} fill="none" stroke="#4a9eff" strokeWidth="3" />
              {/* Travessa do meio */}
              <line x1={fx + 1} y1={oy + dh / 2} x2={fx + fw - 1} y2={oy + dh / 2} stroke="#4a9eff" strokeWidth="2.5" />
              {/* Barras preenchimento */}
              {barras.map((by, bi) => (
                <line key={bi} x1={fx + 4} y1={by} x2={fx + fw - 4} y2={by} stroke="#6fcf6f" strokeWidth="1.5" />
              ))}
              {/* Diagonal */}
              {incluiDiagonal && (
                <line x1={fx + 3} y1={oy + 3} x2={fx + fw - 3} y2={oy + dh - 3} stroke="#e0a020" strokeWidth="1.5" strokeDasharray="4,3" />
              )}
              {/* Label folha */}
              <text x={fx + fw / 2} y={oy + dh / 2 - 6} textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">FOLHA {fi + 1}</text>
            </g>
          );
        })}

        {/* Cotas */}
        <Cota x1={ox} y1={oy + dh} x2={ox + dw} y2={oy + dh} label={`${largura.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox} y2={oy + dh} label={`${altura.toFixed(2)} m`} offset={cotaV} orient="v" />
        {folhas > 1 && (
          <Cota x1={ox} y1={oy + dh} x2={ox + dw / folhas} y2={oy + dh} label={`${(largura / folhas).toFixed(2)} m`} offset={cotaH + 22} orient="h" />
        )}
      </svg>

      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{ background: "#4a9eff" }} />{TUBE_PROFILES[perfilEstrutura]?.desc} — Estrutura</div>
        <div className="legend-item"><div className="legend-swatch" style={{ background: "#6fcf6f" }} />{TUBE_PROFILES[perfilPreenchimento]?.desc} — Preenchimento</div>
        {incluiDiagonal && <div className="legend-item"><div className="legend-swatch" style={{ background: "#e0a020", height: 3 }} />Diagonal — Contraventamento</div>}
      </div>
    </div>
  );
}

// ─── DESENHO PARAPEITO ───────────────────────────────────────────────────────
function DesenhoParapeito({ comprimento, altura, nPostes, nElementos, tipo, perfilEstrutura, perfilPreenchi }) {
  const W = 560; const H = 280;
  const pad = 60; const cotaH = 30; const cotaV = 40;
  const dw = W - pad - cotaV - 10;
  const dh = H - pad - cotaH - 20;
  const ox = cotaV + 10; const oy = 20;

  const postesX = [];
  for (let i = 0; i < nPostes; i++) {
    postesX.push(ox + (i / (nPostes - 1)) * dw);
  }

  const elementosY = [];
  if (tipo === "horizontal") {
    for (let i = 1; i <= nElementos; i++) {
      elementosY.push(oy + (i / (nElementos + 1)) * dh);
    }
  }
  const elementosX = [];
  if (tipo === "vertical") {
    for (let i = 1; i <= Math.min(nElementos, 30); i++) {
      elementosX.push(ox + (i / (nElementos + 1)) * dw);
    }
  }

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — PARAPEITO</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={H} fill="#0a0a0a" />

        {/* Solo */}
        <line x1={ox - 10} y1={oy + dh + 4} x2={ox + dw + 10} y2={oy + dh + 4} stroke="#555" strokeWidth="3" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1={ox - 10 + i * ((dw + 20) / 12)} y1={oy + dh + 4} x2={ox - 18 + i * ((dw + 20) / 12)} y2={oy + dh + 14} stroke="#444" strokeWidth="1" />
        ))}

        {/* Travessa superior e inferior */}
        <line x1={ox} y1={oy} x2={ox + dw} y2={oy} stroke="#4a9eff" strokeWidth="3" />
        <line x1={ox} y1={oy + dh} x2={ox + dw} y2={oy + dh} stroke="#4a9eff" strokeWidth="3" />

        {/* Postes */}
        {postesX.map((px, i) => (
          <rect key={i} x={px - 3} y={oy} width={6} height={dh} fill="#4a9eff" opacity="0.9" />
        ))}

        {/* Preenchimento horizontal */}
        {elementosY.map((ey, i) => (
          <line key={i} x1={ox} y1={ey} x2={ox + dw} y2={ey} stroke="#6fcf6f" strokeWidth="1.5" />
        ))}

        {/* Preenchimento vertical */}
        {elementosX.map((ex, i) => (
          <line key={i} x1={ex} y1={oy} x2={ex} y2={oy + dh} stroke="#6fcf6f" strokeWidth="1.5" />
        ))}

        {/* Cotas */}
        <Cota x1={ox} y1={oy + dh} x2={ox + dw} y2={oy + dh} label={`${comprimento.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox} y2={oy + dh} label={`${altura.toFixed(2)} m`} offset={cotaV} orient="v" />
        {nPostes > 1 && (
          <Cota x1={postesX[0]} y1={oy + dh} x2={postesX[1]} y2={oy + dh} label={`${(comprimento / (nPostes - 1)).toFixed(2)} m`} offset={cotaH + 22} orient="h" />
        )}
      </svg>

      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{ background: "#4a9eff" }} />{TUBE_PROFILES[perfilEstrutura]?.desc} — Postes e travessas</div>
        <div className="legend-item"><div className="legend-swatch" style={{ background: "#6fcf6f" }} />{TUBE_PROFILES[perfilPreenchi]?.desc} — Preenchimento {tipo}</div>
        <div className="legend-item" style={{ color: "#666" }}>Postes: {nPostes} un | Elementos: {nElementos} un</div>
      </div>
    </div>
  );
}

// ─── DESENHO GRADE ───────────────────────────────────────────────────────────
function DesenhoGrade({ largura, altura, nV, nH, perfilMoldura, perfilBarra }) {
  const W = 400; const H = 340;
  const pad = 60; const cotaH = 30; const cotaV = 40;
  const dw = W - pad - cotaV - 10;
  const dh = H - pad - cotaH - 20;
  const ox = cotaV + 10; const oy = 20;

  const barrasV = [];
  for (let i = 1; i <= Math.min(nV, 25); i++) {
    barrasV.push(ox + (i / (nV + 1)) * dw);
  }
  const barrasH = [];
  for (let i = 1; i <= Math.min(nH, 20); i++) {
    barrasH.push(oy + (i / (nH + 1)) * dh);
  }

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — GRADE</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={H} fill="#0a0a0a" />

        {/* Preenchimento vertical */}
        {barrasV.map((bx, i) => (
          <line key={i} x1={bx} y1={oy + 3} x2={bx} y2={oy + dh - 3} stroke="#6fcf6f" strokeWidth="2" />
        ))}
        {/* Preenchimento horizontal */}
        {barrasH.map((by, i) => (
          <line key={i} x1={ox + 3} y1={by} x2={ox + dw - 3} y2={by} stroke="#6fcf6f" strokeWidth="1.5" strokeDasharray="none" opacity="0.7" />
        ))}

        {/* Moldura */}
        <rect x={ox} y={oy} width={dw} height={dh} fill="none" stroke="#4a9eff" strokeWidth="4" />

        {/* Cotas */}
        <Cota x1={ox} y1={oy + dh} x2={ox + dw} y2={oy + dh} label={`${largura.toFixed(2)} m`} offset={cotaH} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox} y2={oy + dh} label={`${altura.toFixed(2)} m`} offset={cotaV} orient="v" />
        {nV > 0 && barrasV.length > 1 && (
          <Cota x1={barrasV[0]} y1={oy + dh} x2={barrasV[1]} y2={oy + dh} label={`esp`} offset={cotaH + 22} orient="h" />
        )}
      </svg>

      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{ background: "#4a9eff" }} />{TUBE_PROFILES[perfilMoldura]?.desc} — Moldura</div>
        <div className="legend-item"><div className="legend-swatch" style={{ background: "#6fcf6f" }} />{TUBE_PROFILES[perfilBarra]?.desc} — Barras internas</div>
        <div className="legend-item" style={{ color: "#666" }}>Verticais: {nV} un {nH > 0 ? `| Horizontais: ${nH} un` : ""}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTÃO
// ══════════════════════════════════════════════════════════════════════════════
function PortaoCalc() {
  const [form, setForm] = useState({
    largura: "", altura: "", folhas: "2",
    perfilEstrutura: "50x50x3", perfilPreenchimento: "30x30x2",
    espacamentoH: "15", vento: "40", incluiDiagonal: true,
  });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function calcular() {
    const L = parseFloat(form.largura); const H = parseFloat(form.altura);
    const folhas = parseInt(form.folhas);
    if (!L || !H || L <= 0 || H <= 0) return;
    const Lfolha = L / folhas;
    const diagComp = form.incluiDiagonal ? Math.sqrt(Lfolha ** 2 + H ** 2) : 0;
    const mHorizontais = 3 * Lfolha * folhas;
    const mVerticais = 2 * H * folhas;
    const espH = parseFloat(form.espacamentoH) / 100;
    const nBarrasH = Math.floor(H / espH) - 1;
    const mBarrasH = nBarrasH > 0 ? nBarrasH * Lfolha * folhas : 0;
    const mDiag = diagComp * folhas;
    const mEstrutura = mHorizontais + mVerticais + mDiag;
    const pEst = TUBE_PROFILES[form.perfilEstrutura]?.pesoM || 0;
    const pPre = TUBE_PROFILES[form.perfilPreenchimento]?.pesoM || 0;
    const pesoEst = mEstrutura * pEst;
    const pesoPre = mBarrasH * pPre;
    const pesoTotal = pesoEst + pesoPre;
    const wind = calcWindLoad(H, L, parseFloat(form.vento));
    const defl = checkDeflection(Lfolha, pesoTotal / folhas, form.perfilEstrutura);
    setResult({ mEstrutura: mEstrutura.toFixed(2), mPreenchimento: mBarrasH.toFixed(2), nBarrasH, mDiag: mDiag.toFixed(2), pesoEst: pesoEst.toFixed(1), pesoPre: pesoPre.toFixed(1), pesoTotal: pesoTotal.toFixed(1), wind, defl, Lfolha: Lfolha.toFixed(2), folhas, L, H });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Largura total <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.largura} onChange={e => set("largura", e.target.value)} placeholder="Ex: 4.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.altura} onChange={e => set("altura", e.target.value)} placeholder="Ex: 2.00" /></div>
            <div className="field"><label>Nº de folhas</label><select value={form.folhas} onChange={e => set("folhas", e.target.value)}><option value="1">1 folha</option><option value="2">2 folhas</option><option value="4">4 folhas</option></select></div>
            <div className="field"><label>Velocidade do vento <span className="unit">(m/s)</span></label><input type="number" min="20" max="80" step="5" value={form.vento} onChange={e => set("vento", e.target.value)} /></div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <div className="field"><label>Perfil estrutural (moldura)</label><select value={form.perfilEstrutura} onChange={e => set("perfilEstrutura", e.target.value)}>{Object.entries(TUBE_PROFILES).map(([k, v]) => (<option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>))}</select></div>
            <div className="field"><label>Perfil de preenchimento</label><select value={form.perfilPreenchimento} onChange={e => set("perfilPreenchimento", e.target.value)}>{Object.entries(TUBE_PROFILES).map(([k, v]) => (<option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>))}</select></div>
            <div className="field"><label>Espaçamento preenchimento <span className="unit">(cm)</span></label><input type="number" min="5" max="100" step="1" value={form.espacamentoH} onChange={e => set("espacamentoH", e.target.value)} /></div>
            <div className="field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <input type="checkbox" id="diag" checked={form.incluiDiagonal} onChange={e => set("incluiDiagonal", e.target.checked)} style={{ width: "auto" }} />
              <label htmlFor="diag" style={{ textTransform: "none", fontSize: 13, cursor: "pointer" }}>Incluir diagonal (contraventamento)</label>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PORTÃO</button>
        <button className="btn-reset" onClick={() => { setForm(f => ({ ...f, largura: "", altura: "" })); setResult(null); }}>LIMPAR</button>
      </div>

      {result && (<>
        <DesenhoPortao largura={result.L} altura={result.H} folhas={result.folhas} nBarrasH={result.nBarrasH} incluiDiagonal={form.incluiDiagonal} perfilEstrutura={form.perfilEstrutura} perfilPreenchimento={form.perfilPreenchimento} />
        <div className="results">
          <div className="results-header">✔ Resultado</div>
          <div className="results-body">
            <div className="result-group-title">MATERIAL</div>
            <div className="result-row"><span className="result-label">Largura por folha</span><span className="result-value">{result.Lfolha} m</span></div>
            <div className="result-row"><span className="result-label">Comprimento estrutural</span><span className="result-value">{result.mEstrutura} m</span></div>
            <div className="result-row"><span className="result-label">Preenchimento ({result.nBarrasH} barras/folha)</span><span className="result-value">{result.mPreenchimento} m</span></div>
            {parseFloat(result.mDiag) > 0 && <div className="result-row"><span className="result-label">Diagonal</span><span className="result-value">{result.mDiag} m</span></div>}
            <hr className="divider" />
            <div className="result-row"><span className="result-label">Peso estrutural</span><span className="result-value">{result.pesoEst} kg</span></div>
            <div className="result-row"><span className="result-label">Peso preenchimento</span><span className="result-value">{result.pesoPre} kg</span></div>
            <div className="result-row"><span className="result-label">Peso total estimado</span><span className="result-value" style={{ fontSize: 18 }}>{result.pesoTotal} kg</span></div>
            <div className="result-group-title" style={{ marginTop: 12 }}>VENTO — NBR 6123</div>
            <div className="result-row"><span className="result-label">Pressão dinâmica</span><span className="result-value">{result.wind.q} Pa</span></div>
            <div className="result-row"><span className="result-label">Força total no portão</span><span className="result-value">{result.wind.forceKgf} kgf ({result.wind.forcaN} N)</span></div>
            <div className="result-group-title" style={{ marginTop: 12 }}>RIGIDEZ</div>
            <div className="result-row"><span className="result-label">Flecha estimada</span><span className={`result-value ${result.defl.ok ? "" : "danger"}`}>{result.defl.delta} mm</span></div>
            <div className="result-row"><span className="result-label">Limite L/250</span><span className="result-value">{result.defl.limite} mm</span></div>
            {!result.defl.ok && <div className="alert">⚠ Flecha excede o limite. Considere perfil maior ou montante intermediário.</div>}
          </div>
        </div>
      </>)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PARAPEITO
// ══════════════════════════════════════════════════════════════════════════════
function ParapeitoCalc() {
  const [form, setForm] = useState({ comprimento: "", altura: "", perfilEstrutura: "50x50x3", perfilPreenchi: "30x30x2", espacamento: "12", tipo: "horizontal", vento: "40", postesEspacamento: "200" });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function calcular() {
    const L = parseFloat(form.comprimento); const H = parseFloat(form.altura);
    if (!L || !H || L <= 0 || H <= 0) return;
    const espPoste = parseFloat(form.postesEspacamento) / 100;
    const nPostes = Math.ceil(L / espPoste) + 1;
    const mPostes = nPostes * H;
    const mEstrutura = mPostes + L + L;
    const espPreenchi = parseFloat(form.espacamento) / 100;
    let mPreenchi = 0; let nElementos = 0;
    if (form.tipo === "horizontal") { nElementos = Math.floor(H / espPreenchi) - 1; mPreenchi = nElementos > 0 ? nElementos * L : 0; }
    else { const nVert = Math.floor(L / espPreenchi) - 1; nElementos = nVert; mPreenchi = nVert > 0 ? nVert * H : 0; }
    const pEst = TUBE_PROFILES[form.perfilEstrutura]?.pesoM || 0;
    const pPre = TUBE_PROFILES[form.perfilPreenchi]?.pesoM || 0;
    const pesoEst = mEstrutura * pEst; const pesoPre = mPreenchi * pPre; const pesoTotal = pesoEst + pesoPre;
    const wind = calcWindLoad(H, L, parseFloat(form.vento));
    const cargaHoriz = Math.max(0.8, parseFloat(form.vento) * 0.02);
    const momentoPoste = (cargaHoriz * H * H) / 2;
    setResult({ nPostes, mPostes: mPostes.toFixed(2), mEstrutura: mEstrutura.toFixed(2), mPreenchi: mPreenchi.toFixed(2), nElementos, pesoEst: pesoEst.toFixed(1), pesoPre: pesoPre.toFixed(1), pesoTotal: pesoTotal.toFixed(1), wind, cargaHoriz: cargaHoriz.toFixed(2), momentoPoste: momentoPoste.toFixed(2), L, H });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Comprimento <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.comprimento} onChange={e => set("comprimento", e.target.value)} placeholder="Ex: 10.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.8" step="0.05" value={form.altura} onChange={e => set("altura", e.target.value)} placeholder="Ex: 1.10" /></div>
            <div className="field"><label>Espaçamento entre postes <span className="unit">(cm)</span></label><input type="number" min="50" max="300" step="10" value={form.postesEspacamento} onChange={e => set("postesEspacamento", e.target.value)} /></div>
            <div className="field"><label>Velocidade do vento <span className="unit">(m/s)</span></label><input type="number" min="20" max="80" step="5" value={form.vento} onChange={e => set("vento", e.target.value)} /></div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis e Preenchimento</div>
          <div className="section-body">
            <div className="field"><label>Perfil dos postes / travessas</label><select value={form.perfilEstrutura} onChange={e => set("perfilEstrutura", e.target.value)}>{Object.entries(TUBE_PROFILES).map(([k, v]) => (<option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>))}</select></div>
            <div className="field"><label>Perfil de preenchimento</label><select value={form.perfilPreenchi} onChange={e => set("perfilPreenchi", e.target.value)}>{Object.entries(TUBE_PROFILES).map(([k, v]) => (<option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>))}</select></div>
            <div className="field"><label>Tipo de preenchimento</label><select value={form.tipo} onChange={e => set("tipo", e.target.value)}><option value="horizontal">Barras horizontais</option><option value="vertical">Barras verticais</option></select></div>
            <div className="field"><label>Espaçamento preenchimento <span className="unit">(cm)</span></label><input type="number" min="5" max="50" step="1" value={form.espacamento} onChange={e => set("espacamento", e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PARAPEITO</button>
        <button className="btn-reset" onClick={() => { setForm(f => ({ ...f, comprimento: "", altura: "" })); setResult(null); }}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoParapeito comprimento={result.L} altura={result.H} nPostes={result.nPostes} nElementos={result.nElementos} tipo={form.tipo} perfilEstrutura={form.perfilEstrutura} perfilPreenchi={form.perfilPreenchi} />
        <div className="results">
          <div className="results-header">✔ Resultado</div>
          <div className="results-body">
            <div className="result-group-title">MATERIAL</div>
            <div className="result-row"><span className="result-label">Postes ({result.nPostes} un)</span><span className="result-value">{result.mPostes} m</span></div>
            <div className="result-row"><span className="result-label">Estrutura total</span><span className="result-value">{result.mEstrutura} m</span></div>
            <div className="result-row"><span className="result-label">Preenchimento ({result.nElementos} elementos)</span><span className="result-value">{result.mPreenchi} m</span></div>
            <hr className="divider" />
            <div className="result-row"><span className="result-label">Peso estrutural</span><span className="result-value">{result.pesoEst} kg</span></div>
            <div className="result-row"><span className="result-label">Peso preenchimento</span><span className="result-value">{result.pesoPre} kg</span></div>
            <div className="result-row"><span className="result-label">Peso total</span><span className="result-value" style={{ fontSize: 18 }}>{result.pesoTotal} kg</span></div>
            <div className="result-group-title" style={{ marginTop: 12 }}>CARGAS — NBR 6118 / NBR 6123</div>
            <div className="result-row"><span className="result-label">Pressão de vento</span><span className="result-value">{result.wind.q} Pa</span></div>
            <div className="result-row"><span className="result-label">Força de vento total</span><span className="result-value">{result.wind.forceKgf} kgf</span></div>
            <div className="result-row"><span className="result-label">Carga horiz. mínima NBR</span><span className="result-value">{result.cargaHoriz} kN/m</span></div>
            <div className="result-row"><span className="result-label">Momento no pé do poste</span><span className={`result-value ${parseFloat(result.momentoPoste) > 1.5 ? "warn" : ""}`}>{result.momentoPoste} kNm</span></div>
            {parseFloat(form.altura) < 1.05 && <div className="alert">⚠ Altura abaixo de 1,05m. NBR 9050 exige mínimo de 1,05m em locais públicos.</div>}
          </div>
        </div>
      </>)}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GRADE
// ══════════════════════════════════════════════════════════════════════════════
function GradeCalc() {
  const [form, setForm] = useState({ largura: "", altura: "", perfilMoldura: "40x40x3", perfilBarra: "30x30x2", espacamentoV: "10", espacamentoH: "0", temMontanteH: false });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function calcular() {
    const L = parseFloat(form.largura); const H = parseFloat(form.altura);
    if (!L || !H || L <= 0 || H <= 0) return;
    const mMoldura = 2 * (L + H);
    const espV = parseFloat(form.espacamentoV) / 100;
    const nV = Math.max(0, Math.floor(L / espV) - 1);
    const mBarrasV = nV * H;
    let nH = 0, mBarrasH = 0;
    if (form.temMontanteH && form.espacamentoH) { const espH = parseFloat(form.espacamentoH) / 100; nH = Math.max(0, Math.floor(H / espH) - 1); mBarrasH = nH * L; }
    const pMoldura = TUBE_PROFILES[form.perfilMoldura]?.pesoM || 0;
    const pBarra = TUBE_PROFILES[form.perfilBarra]?.pesoM || 0;
    const pesoMoldura = mMoldura * pMoldura; const pesoBarras = (mBarrasV + mBarrasH) * pBarra; const pesoTotal = pesoMoldura + pesoBarras;
    const aberturaOk = espV <= 0.11;
    setResult({ mMoldura: mMoldura.toFixed(2), nV, mBarrasV: mBarrasV.toFixed(2), nH, mBarrasH: mBarrasH.toFixed(2), mTotal: (mMoldura + mBarrasV + mBarrasH).toFixed(2), pesoMoldura: pesoMoldura.toFixed(1), pesoBarras: pesoBarras.toFixed(1), pesoTotal: pesoTotal.toFixed(1), aberturaOk, espV: (espV * 100).toFixed(0), L, H });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Largura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.largura} onChange={e => set("largura", e.target.value)} placeholder="Ex: 1.20" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.altura} onChange={e => set("altura", e.target.value)} placeholder="Ex: 2.10" /></div>
            <div className="field"><label>Espaçamento barras verticais <span className="unit">(cm)</span></label><input type="number" min="3" max="30" step="0.5" value={form.espacamentoV} onChange={e => set("espacamentoV", e.target.value)} /></div>
            <div className="field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <input type="checkbox" id="mh" checked={form.temMontanteH} onChange={e => set("temMontanteH", e.target.checked)} style={{ width: "auto" }} />
              <label htmlFor="mh" style={{ textTransform: "none", fontSize: 13, cursor: "pointer" }}>Adicionar travessas horizontais</label>
            </div>
            {form.temMontanteH && <div className="field"><label>Espaçamento travessas <span className="unit">(cm)</span></label><input type="number" min="10" max="100" step="5" value={form.espacamentoH} onChange={e => set("espacamentoH", e.target.value)} /></div>}
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <div className="field"><label>Perfil da moldura</label><select value={form.perfilMoldura} onChange={e => set("perfilMoldura", e.target.value)}>{Object.entries(TUBE_PROFILES).map(([k, v]) => (<option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>))}</select></div>
            <div className="field"><label>Perfil das barras internas</label><select value={form.perfilBarra} onChange={e => set("perfilBarra", e.target.value)}>{Object.entries(TUBE_PROFILES).map(([k, v]) => (<option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>))}</select></div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-calc" onClick={calcular}>CALCULAR GRADE</button>
        <button className="btn-reset" onClick={() => { setForm(f => ({ ...f, largura: "", altura: "" })); setResult(null); }}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoGrade largura={result.L} altura={result.H} nV={result.nV} nH={result.nH} perfilMoldura={form.perfilMoldura} perfilBarra={form.perfilBarra} />
        <div className="results">
          <div className="results-header">✔ Resultado</div>
          <div className="results-body">
            <div className="result-group-title">MATERIAL</div>
            <div className="result-row"><span className="result-label">Moldura perimetral</span><span className="result-value">{result.mMoldura} m</span></div>
            <div className="result-row"><span className="result-label">Barras verticais ({result.nV} un)</span><span className="result-value">{result.mBarrasV} m</span></div>
            {result.nH > 0 && <div className="result-row"><span className="result-label">Travessas horizontais ({result.nH} un)</span><span className="result-value">{result.mBarrasH} m</span></div>}
            <div className="result-row"><span className="result-label">Total de material</span><span className="result-value">{result.mTotal} m</span></div>
            <hr className="divider" />
            <div className="result-row"><span className="result-label">Peso da moldura</span><span className="result-value">{result.pesoMoldura} kg</span></div>
            <div className="result-row"><span className="result-label">Peso das barras</span><span className="result-value">{result.pesoBarras} kg</span></div>
            <div className="result-row"><span className="result-label">Peso total</span><span className="result-value" style={{ fontSize: 18 }}>{result.pesoTotal} kg</span></div>
            <div className="result-group-title" style={{ marginTop: 12 }}>SEGURANÇA</div>
            <div className="result-row"><span className="result-label">Abertura livre entre barras</span><span className={`result-value ${result.aberturaOk ? "" : "danger"}`}>{result.espV} cm {result.aberturaOk ? "✔" : "✘"}</span></div>
            {!result.aberturaOk && <div className="alert">⚠ Abertura maior que 11cm. NBR 9050 recomenda máx. 11cm para impedir passagem de cabeça.</div>}
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
  { id: "portao", label: "🚪 Portão", comp: PortaoCalc },
  { id: "parapeito", label: "🏗 Parapeito", comp: ParapeitoCalc },
  { id: "grade", label: "⊞ Grade", comp: GradeCalc },
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
            <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="content"><Active /></div>
      </div>
    </>
  );
}