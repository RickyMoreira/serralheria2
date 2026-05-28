import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700&family=JetBrains+Mono:wght@400;500;700&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0e0f11;
    --bg2:       #151619;
    --bg3:       #1c1e23;
    --bg4:       #23262d;
    --border:    #2a2d35;
    --border2:   #353942;
    --text:      #e2e4ea;
    --text2:     #9ea3b0;
    --text3:     #5a5f6e;
    --accent:    #f0a500;
    --accent2:   #ffbe3d;
    --green:     #4ade80;
    --green2:    #86efac;
    --blue:      #60a5fa;
    --red:       #f87171;
    --cyan:      #22d3ee;
    --purple:    #a78bfa;
    --radius:    6px;
    --shadow:    0 4px 24px rgba(0,0,0,0.4);
  }

  body { background: var(--bg); font-family: 'Barlow', sans-serif; }

  .app { min-height: 100vh; background: var(--bg); color: var(--text); }

  /* ── HEADER ── */
  .header {
    background: var(--bg2);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    display: flex;
    align-items: stretch;
    gap: 0;
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(12px);
  }
  .header-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 0;
    border-right: 1px solid var(--border);
    padding-right: 24px;
    margin-right: 24px;
  }
  .header-icon {
    width: 38px; height: 38px;
    background: var(--accent);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }
  .header-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 700;
    letter-spacing: 1px;
    color: var(--text);
    line-height: 1.1;
  }
  .header-sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: var(--text3);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* ── TABS ── */
  .tabs {
    display: flex;
    align-items: stretch;
    gap: 2px;
    flex: 1;
  }
  .tab {
    padding: 0 22px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--text3);
    border-bottom: 2px solid transparent;
    transition: all 0.18s;
    display: flex; align-items: center; gap: 8px;
  }
  .tab:hover { color: var(--text2); background: var(--bg3); }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); background: var(--bg3); }
  .tab-icon { font-size: 16px; }

  /* ── LAYOUT ── */
  .content { padding: 28px 32px; max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  @media (max-width: 768px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .header { padding: 0 16px; flex-wrap: wrap; }
    .content { padding: 16px; }
    .tab { padding: 0 14px; font-size: 12px; }
  }

  /* ── CARDS ── */
  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .card-header {
    padding: 12px 18px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text2);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px;
  }
  .card-header-accent { color: var(--accent); }
  .card-body { padding: 18px; display: flex; flex-direction: column; gap: 14px; }

  /* ── FIELDS ── */
  .field { display: flex; flex-direction: column; gap: 5px; }

  label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--text3);
  }

  input, select {
    background: var(--bg);
    border: 1px solid var(--border2);
    border-radius: 5px;
    color: var(--text);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    padding: 9px 12px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
    appearance: none;
  }
  input:focus, select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(240,165,0,0.12);
  }
  input:hover, select:hover { border-color: var(--border2); }
  select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a5f6e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }
  select option { background: var(--bg3); }

  .unit { font-size: 9px; color: var(--text3); margin-left: 3px; font-family: 'JetBrains Mono', monospace; }

  .checkbox-row { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .checkbox-row input[type=checkbox] { width: auto; cursor: pointer; accent-color: var(--accent); width: 16px; height: 16px; }
  .checkbox-row label { text-transform: none; font-size: 12px; color: var(--text2); cursor: pointer; letter-spacing: 0; font-family: 'Barlow', sans-serif; font-weight: 500; }

  /* ── BUTTONS ── */
  .btn-calc {
    background: var(--accent);
    color: #111;
    border: none;
    border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 17px; font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 13px 28px;
    cursor: pointer;
    flex: 1;
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
    box-shadow: 0 2px 12px rgba(240,165,0,0.25);
  }
  .btn-calc:hover { background: var(--accent2); box-shadow: 0 4px 20px rgba(240,165,0,0.35); }
  .btn-calc:active { transform: scale(0.98); }

  .btn-reset {
    background: transparent;
    color: var(--text3);
    border: 1px solid var(--border2);
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    padding: 13px 20px;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .btn-reset:hover { color: var(--text); border-color: var(--text3); }

  .btn-add {
    background: rgba(240,165,0,0.1);
    color: var(--accent);
    border: 1px solid rgba(240,165,0,0.3);
    border-radius: 5px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 1px;
    padding: 6px 16px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .btn-add:hover { background: rgba(240,165,0,0.2); }

  .btn-remove {
    background: transparent;
    color: var(--red);
    border: 1px solid rgba(248,113,113,0.3);
    border-radius: 5px;
    font-size: 13px;
    padding: 6px 10px;
    cursor: pointer;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .btn-remove:hover { background: rgba(248,113,113,0.1); }

  /* ── RESULTS ── */
  .results-card {
    background: linear-gradient(135deg, #0a1a0a 0%, #0d1a0d 100%);
    border: 1px solid #1e3a1e;
    border-radius: var(--radius);
    overflow: hidden;
  }
  .results-header {
    padding: 14px 20px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--green);
    border-bottom: 1px solid #1e3a1e;
    display: flex; align-items: center; gap: 8px;
  }
  .results-body { padding: 16px 20px; display: flex; flex-direction: column; gap: 2px; }
  .result-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .result-row:last-child { border-bottom: none; }
  .result-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text3); }
  .result-value { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; color: var(--green); }
  .result-value.big { font-size: 22px; color: var(--green2); }
  .result-value.warn { color: var(--accent); }
  .result-value.danger { color: var(--red); }

  /* ── SUMMARY BADGES ── */
  .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
  .summary-badge {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .summary-badge-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; }
  .summary-badge-value { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 700; color: var(--text); line-height: 1; }
  .summary-badge-unit { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text3); }
  .summary-badge.highlight { background: rgba(240,165,0,0.08); border-color: rgba(240,165,0,0.3); }
  .summary-badge.highlight .summary-badge-value { color: var(--accent); }

  /* ── ALERT ── */
  .alert {
    background: rgba(240,165,0,0.08);
    border: 1px solid rgba(240,165,0,0.3);
    border-radius: 5px;
    padding: 10px 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--accent);
    display: flex; align-items: center; gap: 8px;
  }
  .alert.danger { background: rgba(248,113,113,0.08); border-color: rgba(248,113,113,0.3); color: var(--red); }

  /* ── DRAWING ── */
  .drawing-box {
    background: #fafaf8;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  .drawing-header {
    background: #f0f0eb;
    padding: 10px 18px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: #444;
    border-bottom: 1px solid #ddd;
    display: flex; align-items: center; gap: 8px;
  }
  .drawing-svg { width: 100%; display: block; }
  .legend-box {
    background: #f5f5f0;
    border-top: 1px solid #e0e0d8;
    padding: 12px 18px;
    display: flex; flex-wrap: wrap; gap: 16px;
  }
  .legend-item { display: flex; align-items: center; gap: 7px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #666; }
  .legend-swatch { width: 24px; height: 4px; border-radius: 2px; }

  /* ── CUT LIST TABLE ── */
  .corte-table { width: 100%; border-collapse: collapse; font-family: 'JetBrains Mono', monospace; font-size: 11px; }
  .corte-table th {
    background: var(--bg3);
    color: var(--text3);
    padding: 9px 14px;
    text-align: left;
    letter-spacing: 1px; font-size: 10px;
    border-bottom: 1px solid var(--border2);
    font-weight: 500;
    text-transform: uppercase;
  }
  .corte-table td { padding: 8px 14px; border-bottom: 1px solid var(--border); color: var(--text2); vertical-align: middle; }
  .corte-table tr:last-child td { border-bottom: none; }
  .corte-table tbody tr:hover td { background: var(--bg3); }
  .total-row td { font-weight: 700; color: var(--accent) !important; border-top: 1px solid var(--border2) !important; background: var(--bg3) !important; }

  /* ── REGION BUILDER ── */
  .region-block {
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .region-header {
    padding: 10px 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    display: flex; align-items: center; justify-content: space-between;
  }
  .region-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }

  .travessa-row {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 16px;
    background: rgba(34, 211, 238, 0.05);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .travessa-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--cyan);
    min-width: 130px;
  }

  /* ── PERFIL SELECTOR ── */
  .perfil-dims { display: flex; gap: 6px; }
  .perfil-dims select { font-size: 12px; padding: 8px 28px 8px 10px; }
  .perfil-info {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--accent);
    margin-top: 4px;
    display: flex; align-items: center; gap: 6px;
  }
  .perfil-info strong { font-size: 12px; }

  /* ── TIPO SELECTOR ── */
  .tipo-select { font-size: 12px; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fadeIn 0.25s ease-out; }
`;



// Dimensões disponíveis para seleção
const DIMS_A  = [10,12,15,20,25,30,38,40,50,60,70,76,80,90,100,120,150,200];
const DIMS_B  = [10,12,15,20,25,30,38,40,50,60,70,76,80,90,100,120,150,200];
const DIMS_E  = [1,1.5,2,2.5,3,3.5,4,5,6];

// Dimensões para barras maciças
const DIMS_CHATA_L = [12,19,25,30,32,38,40,50,60,75,100]; // largura mm
const DIMS_CHATA_E = [2,3,4,5,6,8,10,12];                 // espessura mm
const DIMS_QUAD    = [5,6,8,10,12,16,20,25,32,40,50];     // lado mm
const DIMS_RED     = [5,6,8,10,12,16,20,25,32,38,50];     // diâmetro mm

// Peso kg/m para tubo: 7,85 × 2 × (A+B-2e) × e × 0,001
function calcPesoM(A, B, e) {
  return 7.85 * 2 * (A + B - 2 * e) * e * 0.001;
}
// Peso kg/m para barra chata: 7,85 × L × e × 0,001
function calcPesoChata(L, e) {
  return 7.85 * L * e * 0.001;
}
// Peso kg/m para barra quadrada maciça: 7,85 × L² × 0,001
function calcPesoQuad(L) {
  return 7.85 * L * L * 0.001;
}
// Peso kg/m para barra redonda maciça: 7,85 × π/4 × D² × 0,001
function calcPesoRed(D) {
  return 7.85 * Math.PI / 4 * D * D * 0.001;
}

// Constrói chave do perfil

// Seletor para BARRAS MACIÇAS (chata, quadrada, redonda)
function BarraMacicoSelector({ tipo, L, e, D, onChange, label }) {
  // tipo: "chata" | "quadrada" | "redonda"
  let peso = 0; let desc = "";
  if (tipo === "chata")    { peso = calcPesoChata(L, e); desc = `Chata ${L}×${e}mm`; }
  if (tipo === "quadrada") { peso = calcPesoQuad(L);     desc = `Quadrada ${L}×${L}mm`; }
  if (tipo === "redonda")  { peso = calcPesoRed(D);      desc = `Redonda Ø${D}mm`; }

  const sel = { flex:1, background:"#111", border:"1px solid #333", color:"#e8e0d0", fontFamily:"monospace", fontSize:13, padding:"8px 6px", borderRadius:3 };

  return (
    <div className="field">
      <label>{label || "Barra maciça"}</label>
      <div style={{ display:"flex", gap:6, marginBottom:6 }}>
        <select value={tipo} onChange={ev => { ev.stopPropagation(); onChange(ev.target.value, L, e, D); }} style={sel}>
          <option value="chata">Barra chata</option>
          <option value="quadrada">Quadrada maciça</option>
          <option value="redonda">Redonda maciça</option>
        </select>
      </div>
      {tipo === "chata" && (
        <div className="perfil-dims">
          <select value={L} onChange={ev => { ev.stopPropagation(); onChange(tipo, parseInt(ev.target.value), e, D); }} style={sel}>
            {DIMS_CHATA_L.map(v => <option key={v} value={v}>{v}mm larg.</option>)}
          </select>
          <select value={e} onChange={ev => { ev.stopPropagation(); onChange(tipo, L, parseInt(ev.target.value), D); }} style={sel}>
            {DIMS_CHATA_E.map(v => <option key={v} value={v}>{v}mm esp.</option>)}
          </select>
        </div>
      )}
      {tipo === "quadrada" && (
        <select value={L} onChange={ev => { ev.stopPropagation(); onChange(tipo, parseInt(ev.target.value), e, D); }} style={sel}>
          {DIMS_QUAD.map(v => <option key={v} value={v}>{v}×{v}mm</option>)}
        </select>
      )}
      {tipo === "redonda" && (
        <select value={D} onChange={ev => { ev.stopPropagation(); onChange(tipo, L, e, parseInt(ev.target.value)); }} style={sel}>
          {DIMS_RED.map(v => <option key={v} value={v}>Ø{v}mm</option>)}
        </select>
      )}
      <div className="perfil-info">
        {desc} → <strong>{peso.toFixed(3)} kg/m</strong>
      </div>
    </div>
  );
}

// Retorna peso e desc de uma barra maciça
function barraInfo(tipo, L, e, D) {
  if (tipo === "chata")    return { peso: calcPesoChata(L, e), desc: `Barra chata ${L}×${e}mm`, espMm: e };
  if (tipo === "quadrada") return { peso: calcPesoQuad(L),     desc: `Quadrada ${L}×${L}mm`,    espMm: L };
  if (tipo === "redonda")  return { peso: calcPesoRed(D),      desc: `Redonda Ø${D}mm`,          espMm: D };
  return { peso: 0, desc: "", espMm: 0 };
}

// Componente seletor de perfil tubular (3 dropdowns)
function PerfilEstSelector({ A, B, e: espessura, onChange, label }) {
  const maior = Math.max(A, B);
  const menor = Math.min(A, B);
  const peso = calcPesoM(maior, menor, espessura);
  return (
    <div className="field">
      <label>{label || "Perfil"}</label>
      <div className="perfil-dims">
        <select value={A} onChange={ev => { ev.stopPropagation(); onChange(parseInt(ev.target.value), B, espessura); }}
          style={{ flex:1, background:"#111", border:"1px solid #333", color:"#e8e0d0", fontFamily:"monospace", fontSize:13, padding:"8px 6px", borderRadius:3 }}>
          {DIMS_A.map(a => <option key={a} value={a}>{a}mm</option>)}
        </select>
        <select value={B} onChange={ev => { ev.stopPropagation(); onChange(A, parseInt(ev.target.value), espessura); }}
          style={{ flex:1, background:"#111", border:"1px solid #333", color:"#e8e0d0", fontFamily:"monospace", fontSize:13, padding:"8px 6px", borderRadius:3 }}>
          {DIMS_B.map(b => <option key={b} value={b}>{b}mm</option>)}
        </select>
        <select value={espessura} onChange={ev => { ev.stopPropagation(); onChange(A, B, parseFloat(ev.target.value)); }}
          style={{ flex:1, background:"#111", border:"1px solid #333", color:"#e8e0d0", fontFamily:"monospace", fontSize:13, padding:"8px 6px", borderRadius:3 }}>
          {DIMS_E.filter(ep => ep < Math.min(A,B)/2).map(ep => <option key={ep} value={ep}>e={ep}mm</option>)}
        </select>
      </div>
      <div className="perfil-info"><span>{maior}×{menor} e={espessura}mm</span> → <strong>{peso.toFixed(3)} kg/m</strong>
      </div>
    </div>
  );
}

// ─── SVG helpers// ─── SVG helpers ─────────────────────────────────────────────────────────────
function Defs() {
  return (
    <defs>
      <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#e07020" />
      </marker>
    </defs>
  );
}

function Cota({ x1, y1, x2, y2, label, offset = 18, orient = "h" }) {
  const co = "#e07020"; const ts = 9;
  if (orient === "h") {
    const y = y1 + offset;
    const mx = (x1+x2)/2;
    return (
      <g>
        {/* Short tick marks instead of long dashes */}
        <line x1={x1} y1={y1} x2={x1} y2={y1+8} stroke={co} strokeWidth="1" />
        <line x1={x2} y1={y1} x2={x2} y2={y1+8} stroke={co} strokeWidth="1" />
        <line x1={x1} y1={y} x2={x2} y2={y} stroke={co} strokeWidth="1" markerStart="url(#arr)" markerEnd="url(#arr)" />
        <rect x={mx-20} y={y+1} width={40} height={ts+4} fill="#f5f5f0" opacity="0.92" rx="2" />
        <text x={mx} y={y+ts+2} textAnchor="middle" fill={co} fontSize={ts} fontFamily="monospace" fontWeight="bold">{label}</text>
      </g>
    );
  } else {
    const rx = x2 + offset;
    const my = (y1+y2)/2;
    const lw = label.length * 5.5 + 8;
    return (
      <g>
        {/* Short tick marks */}
        <line x1={x2} y1={y1} x2={x2+8} y2={y1} stroke={co} strokeWidth="1" />
        <line x1={x2} y1={y2} x2={x2+8} y2={y2} stroke={co} strokeWidth="1" />
        <line x1={rx} y1={y1} x2={rx} y2={y2} stroke={co} strokeWidth="1" markerStart="url(#arr)" markerEnd="url(#arr)" />
        <rect x={rx+3} y={my-7} width={lw} height={ts+5} fill="#f5f5f0" opacity="0.92" rx="2" />
        <text x={rx+5} y={my+4} textAnchor="start" fill={co} fontSize={ts} fontFamily="monospace" fontWeight="bold">{label}</text>
      </g>
    );
  }
}

// ─── LISTA DE CORTE ──────────────────────────────────────────────────────────
const PECA_CORES = {
  "Travessa superior":  { bg: "#0d1a2e", cor: "#4a9eff" },
  "Travessa inferior":  { bg: "#111", cor: "#111111" },
  "Montante vertical":  { bg: "#1a0d2e", cor: "#b47aff" },
  "Travessa horizontal":{ bg: "#0d1e2e", cor: "#40d0ff" },
  "Travessa vertical":  { bg: "#1a0a2e", cor: "#d070ff" },
  "Barra horizontal":   { bg: "#0a160a", cor: "#6fcf6f" },
  "Barra vertical":     { bg: "#0d1a0d", cor: "#a0e0a0" },
  "Diagonal":           { bg: "#1e1408", cor: "#e0a020" },
  "Poste vertical":     { bg: "#1a0d2e", cor: "#b47aff" },
  "Moldura lateral":    { bg: "#0d1a2e", cor: "#4a9eff" },
  "Moldura superior":   { bg: "#0d1a2e", cor: "#74b8ff" },
  "Moldura inferior":   { bg: "#0d1e2e", cor: "#40d0ff" },
};

function getPecaCor(nome) {
  return PECA_CORES[nome] || { bg: "#111", cor: "#aaa" };
}
function ListaCorte({ pecas }) {
  const sorted = [...pecas].sort((a, b) => b.comp - a.comp);
  const totalPeso = pecas.reduce((s, p) => s + p.peso, 0);
  const totalMetros = pecas.reduce((s, p) => s + p.compTotal, 0);

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
              const isBlack = cor === "#111111";
              return (
                <tr key={i} style={{ background: bg }}>
                  <td style={{ color: "#fff" }}>{i + 1}</td>
                  <td><span style={{ background: isBlack ? "#1a1a1a" : bg, border: `1px solid ${isBlack ? "#aaa" : cor}`, color: isBlack ? "#fff" : cor, padding: "2px 8px", borderRadius: 2, fontSize: 11, fontWeight: 700, fontFamily: "monospace" }}>{p.nome}</span></td>
                  <td style={{ color: "#ddd" }}>{p.perfil}</td>
                  <td style={{ color: isBlack ? "#fff" : cor, fontWeight: 700, fontSize: 15 }}>{(p.comp * 100).toFixed(1)} cm</td>
                  <td style={{ color: "#e8e0d0" }}>{p.qtd}</td>
                  <td style={{ color: "#ccc" }}>{p.compTotal.toFixed(2)}</td>
                  <td style={{ color: "#ccc" }}>{p.peso.toFixed(2)}</td>
                  <td style={{ color: "#bbb", fontSize: 10 }}>{p.obs || "—"}</td>
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
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTÃO
// ══════════════════════════════════════════════════════════════════════════════
function DesenhoPortao({ L, H, folhas, nTravV, travPosRatio, regioes, incluiDiagonal, perfilEst }) {
  // Proporção real: L metros de largura, H metros de altura
  const maxW = 660; const maxDrawH = 400;
  const padL = 14; const padR = 90; const padT = 14; const padB = 52;
  const availW = maxW - padL - padR;
  const availH = maxDrawH - padT - padB;

  // Escala mantendo proporção
  const scaleX = availW / L;
  const scaleY = availH / H;
  const scale  = Math.min(scaleX, scaleY);

  const dw = L * scale;
  const dh = H * scale;
  const W  = dw + padL + padR;
  const SH = dh + padT + padB;
  const ox = padL; const oy = padT;
  const fw = dw / folhas;

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
          const corTravH    = PECA_CORES["Travessa horizontal"].cor;
          const corTravV    = PECA_CORES["Travessa vertical"].cor;
          const corDiag     = PECA_CORES["Diagonal"].cor;
          const travRatios  = travPosRatio || [];
          return (
            <g key={fi}>
              {/* Travessa superior e inferior */}
              <line x1={fx+1} y1={oy} x2={fx+fw-1} y2={oy} stroke={corTravSup} strokeWidth="4" />
              <line x1={fx+1} y1={oy+dh} x2={fx+fw-1} y2={oy+dh} stroke={corTravInf} strokeWidth="4" />
              {/* Montantes laterais */}
              <line x1={fx+2} y1={oy+4} x2={fx+2} y2={oy+dh-4} stroke={corMontante} strokeWidth="4" />
              <line x1={fx+fw-2} y1={oy+4} x2={fx+fw-2} y2={oy+dh-4} stroke={corMontante} strokeWidth="4" />
              {/* Travessas horizontais nas posições configuradas */}
              {travRatios.map((ratio, mi) => {
                const my = oy + ratio * dh;
                return <line key={mi} x1={fx+6} y1={my} x2={fx+fw-6} y2={my} stroke={corTravH} strokeWidth="3" />;
              })}
              {/* Travessas verticais internas */}
              {[...Array(nTravV||0)].map((_,vi) => {
                const vx = fx + ((vi+1)/((nTravV||0)+1)) * fw;
                return <line key={vi} x1={vx} y1={oy+4} x2={vx} y2={oy+dh-4} stroke={corTravV} strokeWidth="3" />;
              })}
              {/* Preenchimento por região */}
              {(regioes||[]).map((reg, ri) => {
                const ratios = [0, ...travRatios, 1];
                const y1r = oy + ratios[ri] * dh + 4;
                const y2r = oy + ratios[ri+1] * dh - 4;
                const altR = y2r - y1r;
                if (altR <= 0) return null;
                const corPre = reg.ori === "horizontal"
                  ? PECA_CORES["Barra horizontal"].cor
                  : PECA_CORES["Barra vertical"].cor;

                // Espaçamento em pixels proporcional ao desenho
                const espMetros = parseFloat(reg.esp) / 100;
                const espPxH = (espMetros / H) * dh; // px por espaço horizontal (altura)
                const espPxV = (espMetros / (L/folhas)) * fw; // px por espaço vertical (largura)

                return (
                  <g key={ri}>
                    {reg.ori === "horizontal"
                      ? (() => {
                          const nBars = Math.max(0, Math.ceil(altR / espPxH) - 1);
                          return [...Array(Math.min(nBars,60))].map((_,bi) => {
                            const by = y1r + ((bi+1)/(nBars+1)) * altR;
                            return <line key={bi} x1={fx+6} y1={by} x2={fx+fw-6} y2={by} stroke={corPre} strokeWidth="1.5" />;
                          });
                        })()
                      : (() => {
                          const nBars = Math.max(0, Math.ceil((fw-4) / espPxV) - 1);
                          return [...Array(Math.min(nBars,60))].map((_,bi) => {
                            const bx = fx + ((bi+1)/(nBars+1)) * fw;
                            return <line key={bi} x1={bx} y1={y1r} x2={bx} y2={y2r} stroke={corPre} strokeWidth="1.5" />;
                          });
                        })()
                    }
                  </g>
                );
              })}
              {incluiDiagonal && <line x1={fx+6} y1={oy+4} x2={fx+fw-6} y2={oy+dh-4} stroke={corDiag} strokeWidth="1.5" strokeDasharray="4,3" />}
              <text x={fx+fw/2} y={oy+dh/2} textAnchor="middle" fill="#999" fontSize="9" fontFamily="monospace">FOLHA {fi+1}</text>
            </g>
          );
        })}

        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={20} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox+dw} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={20} orient="v" />
        {folhas > 1 && <Cota x1={ox} y1={oy+dh} x2={ox+fw} y2={oy+dh} label={`${(L/folhas).toFixed(2)} m`} offset={38} orient="h" />}
      </svg>
      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Travessa superior"].cor}} />Travessa sup/inf</div>
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Montante vertical"].cor}} />Montante vertical</div>
        {(travPosRatio||[]).length > 0 && <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Travessa horizontal"].cor}} />Travessa horizontal</div>}
        {(nTravV||0) > 0 && <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Travessa vertical"].cor}} />Travessa vertical</div>}
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Barra vertical"].cor}} />Preenchimento vertical</div>
        <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Barra horizontal"].cor}} />Preenchimento horizontal</div>
        {incluiDiagonal && <div className="legend-item"><div className="legend-swatch" style={{background: PECA_CORES["Diagonal"].cor, height:3}} />Diagonal</div>}
      </div>
    </div>
  );
}

// Componente isolado para o input de espaçamento da região - usa uncontrolled input
function RegiaoEspInput({ value, onChange }) {
  return (
    <input type="number" min="3" max="100" step="1"
      defaultValue={value}
      key={value}
      onBlur={ev => onChange(ev.target.value)}
      onKeyDown={ev => { if (ev.key === 'Enter') onChange(ev.target.value); }}
      style={{background:"#111",border:"1px solid #333",color:"#e8e0d0",fontFamily:"monospace",fontSize:13,padding:"8px",borderRadius:3,width:"100%"}} />
  );
}

// Componente isolado para o input de posição da travessa - usa uncontrolled input
function TravessaPosInput({ value, max, onChange }) {
  return (
    <input
      type="number"
      min="1"
      max={max}
      step="1"
      defaultValue={value}
      key={value}
      onBlur={ev => onChange(ev.target.value)}
      onKeyDown={ev => { if (ev.key === 'Enter') onChange(ev.target.value); }}
      style={{background:"#111",border:"1px solid #40d0ff",color:"#40d0ff",fontFamily:"monospace",fontSize:13,padding:"6px 10px",borderRadius:3,width:"100%"}}
    />
  );
}
function regiaoDefault(id) {
  return { id, ori:"vertical", esp:"10", preA:30, preB:30, preE:2 };
}

function PortaoCalc() {
  const [form, setForm] = useState({
    largura:"", altura:"", folhas:"2",
    estA:50, estB:50, estE:3,
    incluiDiagonal:true,
    nTravVert:"0",
    // Travessas horizontais: array de posições em cm
    travHoriz:[],   // ex: [{id:0, pos:"80"}]
    // Regiões: uma por espaço entre travessas (nTravH+1)
    regioes:[regiaoDefault(0)], // começa com 1 região (sem travessas)
  });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const setEst = (A,B,e) => setForm(f => ({...f, estA:A, estB:B, estE:e}));

  // Adicionar travessa horizontal
  function addTravH() {
    setForm(f => {
      const newId = Date.now();
      const nTrav = f.travHoriz.length;
      // Posição padrão: divide igualmente
      const altAtual = parseFloat(f.altura) || 200;
      const pos = Math.round(altAtual / (nTrav + 2) * (nTrav + 1));
      return {
        ...f,
        travHoriz: [...f.travHoriz, { id: newId, pos: String(pos) }],
        regioes: [...f.regioes, regiaoDefault(newId)],
      };
    });
    setResult(null);
  }

  function removeTravH(idx) {
    setForm(f => ({
      ...f,
      travHoriz: f.travHoriz.filter((_,i) => i !== idx),
      regioes: f.regioes.filter((_,i) => i !== idx + 1), // remove a região acima da travessa removida
    }));
    setResult(null);
  }

  function setTravPos(idx, val) {
    setForm(f => ({
      ...f,
      travHoriz: f.travHoriz.map((t,i) => i === idx ? {...t, pos: val} : t),
    }));
  }

  function setRegiao(idx, key, val) {
    setForm(f => ({
      ...f,
      regioes: f.regioes.map((r,i) => i === idx ? {...r, [key]: val} : r),
    }));
    setResult(null);
  }

  function setRegiaoPre(idx, A, B, e) {
    setForm(f => ({
      ...f,
      regioes: f.regioes.map((r,i) => i === idx ? {...r, preA:A, preB:B, preE:e} : r),
    }));
  }

  function calcular() {
    const L = parseFloat(form.largura);
    const H = parseFloat(form.altura);
    const folhas = parseInt(form.folhas);
    if (!L||!H||L<=0||H<=0) return;

    const Lf = L / folhas;
    const espEst = Math.max(form.estA, form.estB) / 1000;
    const pEst   = calcPesoM(form.estA, form.estB, form.estE);
    const descEst = `Tubo ${Math.max(form.estA,form.estB)}×${Math.min(form.estA,form.estB)} e=${form.estE}mm`;
    const nTravV = parseInt(form.nTravVert) || 0;

    // Ordenar travessas por posição
    const travOrdenadas = [...form.travHoriz]
      .map(t => ({ ...t, posCm: parseFloat(t.pos) || 0 }))
      .filter(t => t.posCm > 0 && t.posCm < H * 100)
      .sort((a, b) => a.posCm - b.posCm);

    const nTravH = travOrdenadas.length;

    // Comprimentos estruturais
    const compTravSupInf = Lf;
    const compMontante   = H - 2 * espEst;
    const compTravHoriz  = Lf - 2 * espEst;
    const compTravVert   = H - 2 * espEst;
    const diagComp       = form.incluiDiagonal ? Math.sqrt(Lf**2 + H**2) : 0;

    const pecas = [];

    // Estrutura
    pecas.push({ nome:"Travessa superior",  tipo:"estrutura", perfil:descEst, comp:compTravSupInf, qtd:folhas,      compTotal:folhas*compTravSupInf,       peso:folhas*compTravSupInf*pEst,       obs:`${(compTravSupInf*100).toFixed(1)}cm — por fora` });
    pecas.push({ nome:"Travessa inferior",  tipo:"estrutura", perfil:descEst, comp:compTravSupInf, qtd:folhas,      compTotal:folhas*compTravSupInf,       peso:folhas*compTravSupInf*pEst,       obs:`${(compTravSupInf*100).toFixed(1)}cm — por fora` });
    pecas.push({ nome:"Montante vertical",  tipo:"estrutura", perfil:descEst, comp:compMontante,   qtd:2*folhas,    compTotal:2*folhas*compMontante,       peso:2*folhas*compMontante*pEst,       obs:`H − 2×${(espEst*100).toFixed(1)}cm = ${(compMontante*100).toFixed(1)}cm` });
    if (nTravH > 0) pecas.push({ nome:"Travessa horizontal", tipo:"estrutura", perfil:descEst, comp:compTravHoriz, qtd:nTravH*folhas, compTotal:nTravH*folhas*compTravHoriz, peso:nTravH*folhas*compTravHoriz*pEst, obs:`Lf − 2×${(espEst*100).toFixed(1)}cm = ${(compTravHoriz*100).toFixed(1)}cm` });
    if (nTravV > 0) pecas.push({ nome:"Travessa vertical",   tipo:"estrutura", perfil:descEst, comp:compTravVert,  qtd:nTravV*folhas, compTotal:nTravV*folhas*compTravVert,  peso:nTravV*folhas*compTravVert*pEst,  obs:`H − 2×${(espEst*100).toFixed(1)}cm = ${(compTravVert*100).toFixed(1)}cm` });
    if (form.incluiDiagonal && diagComp > 0) pecas.push({ nome:"Diagonal", tipo:"diagonal", perfil:descEst, comp:diagComp, qtd:folhas, compTotal:folhas*diagComp, peso:folhas*diagComp*pEst });

    // Preenchimento por região
    const limites = [0, ...travOrdenadas.map(t => t.posCm / 100), H]; // em metros

    form.regioes.forEach((reg, ri) => {
      if (ri >= limites.length - 1) return;
      const yTop = limites[ri];
      const yBot = limites[ri + 1];
      const altBruta = yBot - yTop; // altura bruta da região em metros

      // Descontos:
      // topo da região 1: espessura da travessa superior (por fora, mas montante interno começa depois)
      // topo das outras regiões: metade da travessa horizontal (ela está centrada na posição)
      // base da última região: 0 (travessa inferior é por fora, barras vão até o montante)
      // base das outras regiões: metade da travessa horizontal
      const descontoTop = ri === 0 ? espEst : espEst / 2;
      const descontoBot = ri === limites.length - 2 ? 0 : espEst / 2;
      const altRegiao = altBruta - descontoTop - descontoBot;
      if (altRegiao <= 0) return;

      const esp = parseFloat(reg.esp) / 100;
      const pPre = calcPesoM(reg.preA, reg.preB, reg.preE);
      const descPre = `Tubo ${Math.max(reg.preA,reg.preB)}×${Math.min(reg.preA,reg.preB)} e=${reg.preE}mm`;
      const largInterna = Lf - 2 * espEst;
      const nColunas = nTravV + 1;

      if (reg.ori === "horizontal") {
        // Número de barras horizontais: quantas cabem dentro da região com o espaçamento dado
        const nBarras = Math.max(0, Math.ceil(altBruta / esp) - 1);
        if (nBarras > 0) {
          const compPre = nTravV > 0 ? (largInterna - nTravV*espEst) / nColunas : largInterna;
          const qtd = nBarras * folhas * nColunas;
          pecas.push({ nome:`Barra horizontal R${ri+1}`, tipo:"preenchimento", perfil:descPre, comp:compPre, qtd, compTotal:qtd*compPre, peso:qtd*compPre*pPre, obs:`R${ri+1}: ${nBarras} barras` });
        }
      } else {
        // Número de barras verticais: quantas cabem na LARGURA da folha
        const nBarras = Math.max(0, Math.ceil(largInterna / esp) - 1);
        if (nBarras > 0) {
          const qtd = nBarras * folhas;
          pecas.push({ nome:`Barra vertical R${ri+1}`, tipo:"preenchimento", perfil:descPre, comp:altRegiao, qtd, compTotal:qtd*altRegiao, peso:qtd*altRegiao*pPre, obs:`R${ri+1}: ${nBarras} barras × ${(altRegiao*100).toFixed(1)}cm` });
        }
      }
    });

    const pesoTotal = pecas.reduce((s,p) => s+p.peso, 0);
    const mTotal = pecas.reduce((s,p) => s+p.compTotal, 0);

    setResult({ pecas, pesoTotal:pesoTotal.toFixed(1), mTotal:mTotal.toFixed(2), L, H, folhas, nMeio:nTravH, nTravV, travOrdenadas, regioes:form.regioes, descEst });
  }

  const altNum = parseFloat(form.altura) || 0;

  return (
    <div className="content" style={{padding:0}}>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">⚙ Dimensões</div>
          <div className="card-body">
            <div className="field"><label>Largura total <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.largura} onChange={e=>set("largura",e.target.value)} placeholder="Ex: 4.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 2.00" /></div>
            <div className="field"><label>Nº de folhas</label><select value={form.folhas} onChange={e=>set("folhas",e.target.value)}><option value="1">1 folha</option><option value="2">2 folhas</option><option value="4">4 folhas</option></select></div>
            <div className="checkbox-row">
              <input type="checkbox" id="diag" checked={form.incluiDiagonal} onChange={e=>set("incluiDiagonal",e.target.checked)} style={{width:"auto"}} />
              <label htmlFor="diag">Incluir diagonal</label>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">🔩 Perfil Estrutural</div>
          <div className="card-body">
            <PerfilEstSelector A={form.estA} B={form.estB} e={form.estE} onChange={setEst} label="Perfil estrutural" />
          </div>
        </div>
      </div>

      {/* ── PARTE INTERNA ── */}
      <div className="card">
        <div className="card-header">
          <span>PARTE INTERNA</span>
          <button onClick={addTravH} className="btn-add">+ Travessa horizontal</button>
        </div>
        <div style={{padding:"20px 18px",display:"flex",gap:16}}>

          {/* Linha do tempo — só mostra quando há travessas */}
          {form.travHoriz.length > 0 && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:20,flexShrink:0,paddingTop:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:"var(--accent)",marginBottom:0}} />
              {form.regioes.map((_, ri) => {
                const hasTrav = ri < form.travHoriz.length;
                return (
                  <div key={ri} style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1,width:"100%"}}>
                    <div style={{width:2,flex:1,background:"var(--border2)",minHeight:60}} />
                    {hasTrav
                      ? <div style={{width:14,height:14,borderRadius:"50%",background:"var(--cyan)",border:"2px solid var(--bg)",flexShrink:0,marginBlock:2}} />
                      : <div style={{width:10,height:10,borderRadius:"50%",background:"var(--text3)",marginTop:2}} />
                    }
                  </div>
                );
              })}
            </div>
          )}

          {/* Regiões */}
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:0}}>
            {form.travHoriz.length > 0 && (
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"var(--accent)",letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>
                Topo{altNum > 0 ? ` — 0 cm` : ""}
              </div>
            )}

            {form.regioes.map((reg, ri) => {
              const limites = [0, ...form.travHoriz.map(t=>parseFloat(t.pos)||0).sort((a,b)=>a-b), altNum*100];
              const altRegiao = altNum > 0 ? (limites[ri+1] - limites[ri]).toFixed(0) : null;
              const hasTrav = ri < form.travHoriz.length;
              const temSubdivisao = form.travHoriz.length > 0;
              const travAcima = ri > 0 ? form.travHoriz[ri-1] : null; // travessa que está acima desta subdivisão
              return (
                <div key={reg.id}>
                  {/* Travessa NO TOPO desta subdivisão (exceto a primeira) */}
                  {temSubdivisao && ri > 0 && travAcima && (
                    <div style={{
                      display:"flex",alignItems:"center",gap:10,
                      padding:"7px 14px",
                      background:"rgba(34,211,238,0.06)",
                      border:"1px solid rgba(34,211,238,0.2)",
                      borderRadius:"6px 6px 0 0",
                      marginBottom:0,
                    }}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"var(--cyan)",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",whiteSpace:"nowrap",minWidth:80}}>
                        Travessa {ri}
                      </span>
                      <div style={{display:"flex",alignItems:"center",gap:6,flex:1}}>
                        <TravessaPosInput
                          value={travAcima.pos || ""}
                          max={altNum*100-1}
                          onChange={val => setTravPos(ri-1, val)}
                        />
                        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"var(--text3)",whiteSpace:"nowrap"}}>cm do topo</span>
                      </div>
                      <button onClick={()=>removeTravH(ri-1)} className="btn-remove" title="Remover">✕</button>
                    </div>
                  )}

                  {/* Bloco da subdivisão */}
                  <div style={{
                    background:"var(--bg3)",
                    border:"1px solid var(--border)",
                    borderTopLeftRadius: (temSubdivisao && ri > 0) ? 0 : 6,
                    borderTopRightRadius: (temSubdivisao && ri > 0) ? 0 : 6,
                    borderBottomLeftRadius: 6,
                    borderBottomRightRadius: 6,
                    overflow:"hidden",
                    marginBottom: hasTrav ? 8 : 0,
                  }}>
                    {/* Cabeçalho — só mostra quando há subdivisões */}
                    {temSubdivisao && (
                      <div style={{
                        display:"flex",alignItems:"center",justifyContent:"space-between",
                        padding:"7px 14px",
                        borderBottom:"1px solid var(--border)",
                        background:"rgba(74,222,128,0.04)",
                      }}>
                        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,fontWeight:700,color:"var(--green)",letterSpacing:1.5,textTransform:"uppercase"}}>
                          Subdivisão {ri+1}
                        </span>
                        {altRegiao && (
                          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"var(--text3)"}}>
                            {altRegiao} cm
                          </span>
                        )}
                      </div>
                    )}
                    {/* Campos */}
                    <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}}>
                      <div className="grid-2" style={{gap:10}}>
                        <div className="field">
                          <label>Orientação</label>
                          <select value={reg.ori} onChange={ev=>setRegiao(ri,"ori",ev.target.value)}>
                            <option value="vertical">↕ Vertical</option>
                            <option value="horizontal">↔ Horizontal</option>
                          </select>
                        </div>
                        <div className="field">
                          <label>Espaçamento <span className="unit">(cm)</span></label>
                          <RegiaoEspInput value={reg.esp} onChange={val=>setRegiao(ri,"esp",val)} />
                        </div>
                      </div>
                      <PerfilEstSelector A={reg.preA} B={reg.preB} e={reg.preE} onChange={(A,B,esp)=>setRegiaoPre(ri,A,B,esp)} label="Perfil" />
                    </div>
                  </div>
                </div>
              );
            })}

            {form.travHoriz.length > 0 && (
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"var(--text3)",letterSpacing:1,marginTop:2,textTransform:"uppercase"}}>
                Base{altNum > 0 ? ` — ${(altNum*100).toFixed(0)} cm` : ""}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:10}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PORTÃO</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,largura:"",altura:"",travHoriz:[],regioes:[regiaoDefault(0)]}));setResult(null);}}>LIMPAR</button>
      </div>

      {result && (<>
        <DesenhoPortao L={result.L} H={result.H} folhas={result.folhas}
          nBarrasH={0} nBarrasV={0}
          nMeio={result.nMeio} nTravV={result.nTravV}
          travPosRatio={result.travOrdenadas.map(t => t.posCm / (result.H*100))}
          regioes={result.regioes}
          oriPreenchi="vertical"
          incluiDiagonal={form.incluiDiagonal}
          perfilEst={`${form.estA}x${form.estB}x${form.estE}`}
          perfilPre={`${form.estA}x${form.estB}x${form.estE}`} />
        <ListaCorte pecas={result.pecas} perfilEst={`${form.estA}x${form.estB}x${form.estE}`} perfilPre={`${form.estA}x${form.estB}x${form.estE}`} />
        <div className="results-card">
          <div className="results-header">✔ Resumo</div>
          <div className="results-body">
            <div className="result-row"><span className="result-label">Total de material</span><span className="result-value">{result.mTotal} m</span></div>
            <div className="result-row"><span className="result-label">Peso total estimado</span><span className="result-value big">{result.pesoTotal} kg</span></div>
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
  const maxW = 660; const maxDrawH = 340;
  const padL = 14; const padR = 90; const padT = 14; const padB = 52;
  const availW = maxW - padL - padR;
  const availH = maxDrawH - padT - padB;
  const scale  = Math.min(availW / L, availH / H);
  const dw = L * scale; const dh = H * scale;
  const W  = dw + padL + padR; const SH = dh + padT + padB;
  const ox = padL; const oy = padT;

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
        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={20} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox+dw} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={20} orient="v" />
        {nPostes>1 && <Cota x1={postesX[0]} y1={oy+dh} x2={postesX[1]} y2={oy+dh} label={`${(L/(nPostes-1)).toFixed(2)} m`} offset={38} orient="h" />}
      </svg>
      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{background:"#4a9eff"}} />Postes e travessas</div>
        <div className="legend-item"><div className="legend-swatch" style={{background:"#6fcf6f"}} />Preenchimento {oriPreenchi}</div>
      </div>
    </div>
  );
}

function ParapeitoCalc() {
  const [form, setForm] = useState({
    comprimento:"", altura:"",
    estA:50, estB:50, estE:3,
    preA:30, preB:30, preE:2,
    oriPreenchi:"horizontal", espacamento:"12",
    postesEsp:"200",
    nTravHoriz:"0", nTravVert:"0",
  });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const setEst = (A,B,e) => setForm(f=>({...f, estA:A, estB:B, estE:e}));
  const setPre = (A,B,e) => setForm(f=>({...f, preA:A, preB:B, preE:e}));

  function calcular() {
    const L = parseFloat(form.comprimento); const H = parseFloat(form.altura);
    if (!L||!H||L<=0||H<=0) return;
    const espPoste = parseFloat(form.postesEsp)/100;
    const nPostes  = Math.ceil(L/espPoste)+1;
    const esp      = parseFloat(form.espacamento)/100;
    const espEst   = Math.max(form.estA, form.estB)/1000;
    const pEst     = calcPesoM(form.estA, form.estB, form.estE);
    const descEst  = `Tubo ${Math.max(form.estA,form.estB)}×${Math.min(form.estA,form.estB)} e=${form.estE}mm`;
    const pPre     = calcPesoM(form.preA, form.preB, form.preE);
    const descPre  = `Tubo ${Math.max(form.preA,form.preB)}×${Math.min(form.preA,form.preB)} e=${form.preE}mm`;
    const nTravH   = parseInt(form.nTravHoriz)||0;
    const nTravV   = parseInt(form.nTravVert)||0;

    const vao         = L/(nPostes-1||1);
    const compPoste   = H;
    const compTravessa = L;
    // Preenchimento horizontal: interrompido pelos postes + travessas verticais internas
    const largVao     = vao - 2*espEst;
    const nColVao     = nTravV+1;
    const compPreH    = nTravV>0 ? (largVao - nTravV*espEst)/nColVao : largVao;
    // Preenchimento vertical: interrompido pelas travessas horizontais internas
    const altInterna  = H - 2*espEst;
    const nSegH       = nTravH+1;
    const compPreV    = nTravH>0 ? (altInterna - nTravH*espEst)/nSegH : altInterna;

    let nEl=0;
    if (form.oriPreenchi==="horizontal") nEl=Math.max(0,Math.floor(H/esp)-1);
    else nEl=Math.max(0,Math.floor(vao/esp)-1);

    const pecas=[];
    pecas.push({nome:"Poste vertical",    tipo:"estrutura",    perfil:descEst, comp:compPoste,    qtd:nPostes,   compTotal:nPostes*compPoste,    peso:nPostes*compPoste*pEst,       obs:`${(compPoste*100).toFixed(1)}cm — altura total`});
    pecas.push({nome:"Travessa superior", tipo:"estrutura",    perfil:descEst, comp:compTravessa, qtd:1,         compTotal:compTravessa,          peso:compTravessa*pEst,            obs:`${(compTravessa*100).toFixed(1)}cm — comprimento total`});
    pecas.push({nome:"Travessa inferior", tipo:"estrutura",    perfil:descEst, comp:compTravessa, qtd:1,         compTotal:compTravessa,          peso:compTravessa*pEst,            obs:`${(compTravessa*100).toFixed(1)}cm — comprimento total`});
    if(nTravH>0) pecas.push({nome:"Travessa horizontal",tipo:"estrutura",perfil:descEst,comp:compTravessa,qtd:nTravH,compTotal:nTravH*compTravessa,peso:nTravH*compTravessa*pEst,obs:`${(compTravessa*100).toFixed(1)}cm — comprimento total`});
    if(nTravV>0) {
      const compTravV = H - 2*espEst;
      pecas.push({nome:"Travessa vertical",tipo:"estrutura",perfil:descEst,comp:compTravV,qtd:nTravV*(nPostes-1),compTotal:nTravV*(nPostes-1)*compTravV,peso:nTravV*(nPostes-1)*compTravV*pEst,obs:`H − 2×${(espEst*100).toFixed(1)}cm = ${(compTravV*100).toFixed(1)}cm`});
    }
    if(nEl>0) {
      if(form.oriPreenchi==="horizontal") {
        const qtd = nEl*(nPostes-1)*nColVao;
        pecas.push({nome:"Barra horizontal",tipo:"preenchimento",perfil:descPre,comp:compPreH,qtd,compTotal:qtd*compPreH,peso:qtd*compPreH*pPre,obs:`vão − postes${nTravV>0?` − travessas`:""} = ${(compPreH*100).toFixed(1)}cm`});
      } else {
        const qtd = nEl*(nPostes-1)*nSegH;
        pecas.push({nome:"Barra vertical",tipo:"preenchimento",perfil:descPre,comp:compPreV,qtd,compTotal:qtd*compPreV,peso:qtd*compPreV*pPre,obs:`altInt${nTravH>0?` − travessas`:""} = ${(compPreV*100).toFixed(1)}cm`});
      }
    }

    const pesoTotal=pecas.reduce((s,p)=>s+p.peso,0);
    const mTotal=pecas.reduce((s,p)=>s+p.compTotal,0);
    setResult({pecas,pesoTotal:pesoTotal.toFixed(1),mTotal:mTotal.toFixed(2),L,H,nPostes,nEl,nTravH,nTravV,descEst,descPre});
  }

  return (
    <div className="content" style={{padding:0}}>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">⚙ Dimensões</div>
          <div className="card-body">
            <div className="field"><label>Comprimento <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.comprimento} onChange={e=>set("comprimento",e.target.value)} placeholder="Ex: 10.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.8" step="0.05" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 1.10" /></div>
            <div className="field"><label>Espaçamento entre postes <span className="unit">(cm)</span></label><input type="number" min="50" max="300" step="10" value={form.postesEsp} onChange={e=>set("postesEsp",e.target.value)} /></div>
            <div className="field"><label>Travessas horizontais internas</label><select value={form.nTravHoriz} onChange={e=>set("nTravHoriz",e.target.value)}>{[...Array(11)].map((_,i)=><option key={i} value={i}>{i===0?"Nenhuma":`${i} travessa${i>1?"s":""}`}</option>)}</select></div>
            <div className="field"><label>Travessas verticais internas</label><select value={form.nTravVert} onChange={e=>set("nTravVert",e.target.value)}>{[...Array(11)].map((_,i)=><option key={i} value={i}>{i===0?"Nenhuma":`${i} travessa${i>1?"s":""}`}</option>)}</select></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">🔩 Perfis</div>
          <div className="card-body">
            <PerfilEstSelector A={form.estA} B={form.estB} e={form.estE} onChange={setEst} label="Perfil estrutural (postes/travessas)" />
            <PerfilEstSelector A={form.preA} B={form.preB} e={form.preE} onChange={setPre} label="Perfil de preenchimento" />
            <div className="field"><label>Orientação do preenchimento</label><select value={form.oriPreenchi} onChange={e=>{set("oriPreenchi",e.target.value);setResult(null);}}><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select></div>
            <div className="field"><label>Espaçamento preenchimento <span className="unit">(cm)</span></label><input type="number" min="3" max="50" step="1" value={form.espacamento} onChange={e=>set("espacamento",e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PARAPEITO</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,comprimento:"",altura:""}));setResult(null);}}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoParapeito L={result.L} H={result.H} nPostes={result.nPostes} nElementos={result.nEl} oriPreenchi={form.oriPreenchi} perfilEst={`${form.estA}x${form.estB}x${form.estE}`} perfilPre={`${form.preA}x${form.preB}x${form.preE}`} />
        <ListaCorte pecas={result.pecas} perfilEst={`${form.estA}x${form.estB}x${form.estE}`} perfilPre={`${form.preA}x${form.preB}x${form.preE}`} />
        <div className="results-card">
          <div className="results-header">✔ Resumo</div>
          <div className="results-body">
            <div className="result-row"><span className="result-label">Total de material</span><span className="result-value">{result.mTotal} m</span></div>
            <div className="result-row"><span className="result-label">Peso total estimado</span><span className="result-value big">{result.pesoTotal} kg</span></div>
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
function DesenhoGrade({ L, H, nV, nH, descMoldura, descBarra }) {
  const maxW = 500; const maxDrawH = 420;
  const padL = 14; const padR = 90; const padT = 14; const padB = 52;
  const availW = maxW - padL - padR;
  const availH = maxDrawH - padT - padB;
  const scale  = Math.min(availW / L, availH / H);
  const dw = L * scale; const dh = H * scale;
  const W  = dw + padL + padR; const SH = dh + padT + padB;
  const ox = padL; const oy = padT;

  const barrasV=[]; for(let i=1;i<=Math.min(nV,30);i++) barrasV.push(ox+(i/(nV+1))*dw);
  const barrasH=[]; for(let i=1;i<=Math.min(nH,25);i++) barrasH.push(oy+(i/(nH+1))*dh);

  const corLateral = PECA_CORES["Moldura lateral"].cor;
  const corTopBot  = PECA_CORES["Moldura superior"].cor;
  const corBarraV  = PECA_CORES["Barra vertical"].cor;
  const corTravH   = PECA_CORES["Travessa horizontal"].cor;

  return (
    <div className="drawing-box">
      <div className="drawing-header">📐 VISTA FRONTAL — GRADE</div>
      <svg viewBox={`0 0 ${W} ${SH}`} className="drawing-svg">
        <Defs />
        <rect width={W} height={SH} fill="#f5f5f0" />
        {barrasV.map((bx,i)=><line key={i} x1={bx} y1={oy+4} x2={bx} y2={oy+dh-4} stroke={corBarraV} strokeWidth="2" />)}
        {barrasH.map((by,i)=><line key={i} x1={ox+4} y1={by} x2={ox+dw-4} y2={by} stroke={corTravH} strokeWidth="1.5" />)}
        <line x1={ox} y1={oy} x2={ox} y2={oy+dh} stroke={corLateral} strokeWidth="5" />
        <line x1={ox+dw} y1={oy} x2={ox+dw} y2={oy+dh} stroke={corLateral} strokeWidth="5" />
        <line x1={ox} y1={oy} x2={ox+dw} y2={oy} stroke={corTopBot} strokeWidth="5" />
        <line x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} stroke={corTopBot} strokeWidth="5" />
        <Cota x1={ox} y1={oy+dh} x2={ox+dw} y2={oy+dh} label={`${L.toFixed(2)} m`} offset={20} orient="h" />
        <Cota x1={ox} y1={oy} x2={ox+dw} y2={oy+dh} label={`${H.toFixed(2)} m`} offset={20} orient="v" />
      </svg>
      <div className="legend-box">
        <div className="legend-item"><div className="legend-swatch" style={{background:corLateral}} />Lateral — {descMoldura}</div>
        <div className="legend-item"><div className="legend-swatch" style={{background:corTopBot}} />Sup/Inf — {descMoldura}</div>
        {nV>0 && <div className="legend-item"><div className="legend-swatch" style={{background:corBarraV}} />Barra vertical — {descBarra}</div>}
        {nH>0 && <div className="legend-item"><div className="legend-swatch" style={{background:corTravH}} />Travessa horizontal — {descBarra}</div>}
      </div>
    </div>
  );
}

function GradeCalc() {
  const [form, setForm] = useState({
    largura:"", altura:"",
    molTipo:"tubo", molA:40, molB:40, molE:3, molL:40, molEsp:3, molD:20,
    barTipo:"chata", barL:25, barE:3, barD:12,
    espacamentoV:"10", nTravH:"0",
  });
  const [result, setResult] = useState(null);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const setMolTubo = (A,B,e) => setForm(f=>({...f, molA:A, molB:B, molE:e}));
  const setMolMac  = (tipo,L,e,D) => setForm(f=>({...f, molTipo:tipo, molL:L, molEsp:e, molD:D}));
  const setBar     = (tipo,L,e,D) => setForm(f=>({...f, barTipo:tipo, barL:L, barE:e, barD:D}));

  function getMolInfo() {
    if (form.molTipo === "tubo") {
      const maior = Math.max(form.molA, form.molB);
      const menor = Math.min(form.molA, form.molB);
      return {
        peso: calcPesoM(maior, menor, form.molE),
        desc: `Tubo ${maior}×${menor} e=${form.molE}mm`,
        espMm: maior,
      };
    }
    return barraInfo(form.molTipo, form.molL, form.molEsp, form.molD);
  }

  function calcular() {
    const L=parseFloat(form.largura); const H=parseFloat(form.altura);
    if (!L||!H||L<=0||H<=0) return;
    const espV=parseFloat(form.espacamentoV)/100;
    const nV=Math.max(0,Math.floor(L/espV)-1);
    const nH=parseInt(form.nTravH)||0;

    const molInfo = getMolInfo();
    const espMol  = molInfo.espMm / 1000;
    const pMol    = molInfo.peso;
    const descMol = molInfo.desc;

    const { peso: pBar, desc: descBar } = barraInfo(form.barTipo, form.barL, form.barE, form.barD);

    const compLateral   = H;
    const compTopBot    = L - 2*espMol;
    const compBarraV    = H - 2*espMol;
    const compTraversaH = L - 2*espMol;
    const aberturaOk    = espV<=0.11;

    const pecas=[];
    pecas.push({nome:"Moldura lateral",    tipo:"estrutura",    perfil:descMol, comp:compLateral,   qtd:2,  compTotal:2*compLateral,     peso:2*compLateral*pMol,     obs:`${(compLateral*100).toFixed(1)}cm — altura total`});
    pecas.push({nome:"Moldura superior",   tipo:"estrutura",    perfil:descMol, comp:compTopBot,    qtd:1,  compTotal:compTopBot,         peso:compTopBot*pMol,         obs:`L − 2×${(espMol*100).toFixed(1)}cm = ${(compTopBot*100).toFixed(1)}cm`});
    pecas.push({nome:"Moldura inferior",   tipo:"estrutura",    perfil:descMol, comp:compTopBot,    qtd:1,  compTotal:compTopBot,         peso:compTopBot*pMol,         obs:`L − 2×${(espMol*100).toFixed(1)}cm = ${(compTopBot*100).toFixed(1)}cm`});
    if(nV>0) pecas.push({nome:"Barra vertical",      tipo:"preenchimento", perfil:descBar, comp:compBarraV,    qtd:nV, compTotal:nV*compBarraV,     peso:nV*compBarraV*pBar,     obs:`H − 2×${(espMol*100).toFixed(1)}cm = ${(compBarraV*100).toFixed(1)}cm`});
    if(nH>0) pecas.push({nome:"Travessa horizontal", tipo:"preenchimento", perfil:descBar, comp:compTraversaH, qtd:nH, compTotal:nH*compTraversaH,  peso:nH*compTraversaH*pBar,  obs:`L − 2×${(espMol*100).toFixed(1)}cm = ${(compTraversaH*100).toFixed(1)}cm`});

    const pesoTotal=pecas.reduce((s,p)=>s+p.peso,0);
    const mTotal=pecas.reduce((s,p)=>s+p.compTotal,0);
    setResult({pecas,pesoTotal:pesoTotal.toFixed(1),mTotal:mTotal.toFixed(2),L,H,nV,nH,aberturaOk,espVcm:(espV*100).toFixed(1),descMol,descBar});
  }

  const molInfo = getMolInfo();

  return (
    <div className="content" style={{padding:0}}>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">⚙ Dimensões</div>
          <div className="card-body">
            <div className="field"><label>Largura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.largura} onChange={e=>set("largura",e.target.value)} placeholder="Ex: 1.20" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 2.10" /></div>
            <div className="field"><label>Espaçamento barras verticais <span className="unit">(cm)</span></label><input type="number" min="3" max="30" step="0.5" value={form.espacamentoV} onChange={e=>set("espacamentoV",e.target.value)} /></div>
            <div className="field"><label>Travessas horizontais internas</label><select value={form.nTravH} onChange={e=>set("nTravH",e.target.value)}>{[...Array(11)].map((_,i)=><option key={i} value={i}>{i===0?"Nenhuma":`${i} travessa${i>1?"s":""}`}</option>)}</select></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">🔩 Perfis</div>
          <div className="card-body">
            {/* Moldura — tubo ou maciça */}
            <div className="field">
              <label>Tipo da moldura</label>
              <select value={form.molTipo} onChange={e=>set("molTipo",e.target.value)}
                style={{background:"#111",border:"1px solid #333",color:"#e8e0d0",fontFamily:"monospace",fontSize:13,padding:"8px 6px",borderRadius:3,width:"100%"}}>
                <option value="tubo">Tubo</option>
                <option value="chata">Barra chata</option>
                <option value="quadrada">Quadrada maciça</option>
                <option value="redonda">Redonda maciça</option>
              </select>
            </div>
            {form.molTipo === "tubo"
              ? <PerfilEstSelector A={form.molA} B={form.molB} e={form.molE} onChange={setMolTubo} label="Dimensões da moldura" />
              : <BarraMacicoSelector tipo={form.molTipo} L={form.molL} e={form.molEsp} D={form.molD} onChange={setMolMac} label="Dimensões da moldura" />
            }
            <div style={{fontFamily:"monospace",fontSize:11,color:"#f5a623",marginTop:-8}}>
              {molInfo.desc} → {molInfo.peso.toFixed(3)} kg/m
            </div>
            <BarraMacicoSelector tipo={form.barTipo} L={form.barL} e={form.barE} D={form.barD} onChange={setBar} label="Barra de preenchimento" />
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR GRADE</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,largura:"",altura:""}));setResult(null);}}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoGrade L={result.L} H={result.H} nV={result.nV} nH={result.nH} descMoldura={result.descMol} descBarra={result.descBar} />
        <ListaCorte pecas={result.pecas} perfilEst={`mol_${form.molTipo}`} perfilPre={`bar_${form.barTipo}`} />
        <div className="results-card">
          <div className="results-header">✔ Resumo</div>
          <div className="results-body">
            <div className="result-row"><span className="result-label">Total de material</span><span className="result-value">{result.mTotal} m</span></div>
            <div className="result-row"><span className="result-label">Peso total estimado</span><span className="result-value big">{result.pesoTotal} kg</span></div>
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
  { id:"portao",   label:"Portão",   icon:"🚪" },
  { id:"parapeito",label:"Parapeito",icon:"🏗" },
  { id:"grade",    label:"Grade",    icon:"⊞"  },
];

const COMPS = { portao: PortaoCalc, parapeito: ParapeitoCalc, grade: GradeCalc };

export default function App() {
  const [tab, setTab] = useState("portao");
  const Active = COMPS[tab];
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="header-brand">
            <div className="header-icon">⚙</div>
            <div>
              <div className="header-title">SerCalc Pro</div>
              <div className="header-sub">Serralheria · Cálculo Estrutural</div>
            </div>
          </div>
          <nav className="tabs">
            {TABS.map(t => (
              <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
                <span className="tab-icon">{t.icon}</span>{t.label}
              </button>
            ))}
          </nav>
        </header>
        <main className="content">
          <Active />
        </main>
      </div>
    </>
  );
}