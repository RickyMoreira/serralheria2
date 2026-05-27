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
        <select value={tipo} onChange={ev => onChange(ev.target.value, L, e, D)} style={sel}>
          <option value="chata">Barra chata</option>
          <option value="quadrada">Quadrada maciça</option>
          <option value="redonda">Redonda maciça</option>
        </select>
      </div>
      {tipo === "chata" && (
        <div style={{ display:"flex", gap:6 }}>
          <select value={L} onChange={ev => onChange(tipo, parseInt(ev.target.value), e, D)} style={sel}>
            {DIMS_CHATA_L.map(v => <option key={v} value={v}>{v}mm larg.</option>)}
          </select>
          <select value={e} onChange={ev => onChange(tipo, L, parseInt(ev.target.value), D)} style={sel}>
            {DIMS_CHATA_E.map(v => <option key={v} value={v}>{v}mm esp.</option>)}
          </select>
        </div>
      )}
      {tipo === "quadrada" && (
        <select value={L} onChange={ev => onChange(tipo, parseInt(ev.target.value), e, D)} style={sel}>
          {DIMS_QUAD.map(v => <option key={v} value={v}>{v}×{v}mm</option>)}
        </select>
      )}
      {tipo === "redonda" && (
        <select value={D} onChange={ev => onChange(tipo, L, e, parseInt(ev.target.value))} style={sel}>
          {DIMS_RED.map(v => <option key={v} value={v}>Ø{v}mm</option>)}
        </select>
      )}
      <div style={{ fontFamily:"monospace", fontSize:11, color:"#f5a623", marginTop:4 }}>
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
function PerfilEstSelector({ A, B, e, onChange, label }) {
  const maior = Math.max(A, B);
  const menor = Math.min(A, B);
  const peso = calcPesoM(maior, menor, e);
  return (
    <div className="field">
      <label>{label || "Perfil"}</label>
      <div style={{ display:"flex", gap:6 }}>
        <select value={A} onChange={ev => onChange(parseInt(ev.target.value), B, e)}
          style={{ flex:1, background:"#111", border:"1px solid #333", color:"#e8e0d0", fontFamily:"monospace", fontSize:13, padding:"8px 6px", borderRadius:3 }}>
          {DIMS_A.map(a => <option key={a} value={a}>{a}mm</option>)}
        </select>
        <select value={B} onChange={ev => onChange(A, parseInt(ev.target.value), e)}
          style={{ flex:1, background:"#111", border:"1px solid #333", color:"#e8e0d0", fontFamily:"monospace", fontSize:13, padding:"8px 6px", borderRadius:3 }}>
          {DIMS_B.map(b => <option key={b} value={b}>{b}mm</option>)}
        </select>
        <select value={e} onChange={ev => onChange(A, B, parseFloat(ev.target.value))}
          style={{ flex:1, background:"#111", border:"1px solid #333", color:"#e8e0d0", fontFamily:"monospace", fontSize:13, padding:"8px 6px", borderRadius:3 }}>
          {DIMS_E.filter(ep => ep < Math.min(A,B)/2).map(ep => <option key={ep} value={ep}>e={ep}mm</option>)}
        </select>
      </div>
      <div style={{ fontFamily:"monospace", fontSize:11, color:"#f5a623", marginTop:4 }}>
        {maior}×{menor} e={e}mm → <strong>{peso.toFixed(3)} kg/m</strong>
      </div>
    </div>
  );
}

// ─── SVG helpers// ─── SVG helpers ─────────────────────────────────────────────────────────────
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
// ─── OTIMIZAÇÃO DE CORTE (First Fit Decreasing) ──────────────────────────────
function otimizarCorte(pecas, tamanhoBarraM, kerfMm = 3) {
  const kerf = kerfMm / 1000;
  const itens = [];

  // Expandir peças — se maior que a barra, dividir em segmentos emendados
  pecas.filter(p => p.qtd > 0 && p.comp > 0).forEach(p => {
    for (let i = 0; i < p.qtd; i++) {
      let restComp = p.comp;
      let segNum = 0;
      while (restComp > 0.001) {
        const segComp = Math.min(restComp, tamanhoBarraM - kerf);
        itens.push({
          nome: p.comp > tamanhoBarraM - kerf ? `${p.nome} (seg.${segNum+1})` : p.nome,
          comp: segComp,
          cor: getPecaCor(p.nome).cor,
          emenda: segNum > 0,
        });
        restComp -= segComp;
        segNum++;
      }
    }
  });

  itens.sort((a, b) => b.comp - a.comp);

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
  const nEmendas = itens.filter(i => i.emenda).length;

  return { barras, totalBarras, totalMaterial, totalUsado, desperdicio, aproveitamento, nEmendas };
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
              { label: "Emendas", valor: resultado.nEmendas > 0 ? `${resultado.nEmendas} junta${resultado.nEmendas>1?"s":""}` : "Nenhuma", cor: resultado.nEmendas > 0 ? "#e07020" : "#6fcf6f" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#1a1a1a", border: `1px solid ${item.cor}33`, borderRadius: 4, padding: "10px 16px", flex: 1, minWidth: 120 }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#bbb", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: item.grande ? 32 : 20, color: item.cor, letterSpacing: 2 }}>{item.valor}</div>
              </div>
            ))}
          </div>

          {/* Visualização das barras */}
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#bbb", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
            {perfil} — {tamanho}m por barra
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {resultado.barras.map((barra, bi) => {
              const t = parseFloat(tamanho);
              const sobraW = barra.restante > 0.001 ? barra.restante / t : 0;
              return (
                <div key={bi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: "#ccc", minWidth: 24, textAlign: "right" }}>#{bi+1}</span>
                  <div style={{ flex: 1, position: "relative", height: 24 }}>
                    <svg width="100%" height="24" style={{ display: "block", borderRadius: 2, overflow: "hidden", border: "1px solid #2a2a2a" }}>
                      <defs>
                        <pattern id={`hatch${bi}`} width="6" height="6" patternUnits="userSpaceOnUse">
                          <line x1="0" y1="6" x2="6" y2="0" stroke="#888" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="24" fill="#1a1a1a" />
                      {/* Peças */}
                      {(() => {
                        let cx = 0;
                        return barra.pecas.map((peca, pi) => {
                          const pw = (peca.comp / t) * 100;
                          const el = (
                            <g key={pi}>
                              <rect x={`${cx}%`} y="0" width={`${pw}%`} height="24" fill={peca.cor} />
                              <line x1={`${cx+pw}%`} y1="0" x2={`${cx+pw}%`} y2="24" stroke="#0a0a0a" strokeWidth="1" />
                            </g>
                          );
                          cx += pw;
                          return el;
                        });
                      })()}
                      {/* Sobra com hachura */}
                      {sobraW > 0 && (() => {
                        const pecasW = barra.pecas.reduce((s, p) => s + (p.comp/t)*100, 0);
                        return (
                          <g>
                            <rect x={`${pecasW}%`} y="0" width={`${sobraW*100}%`} height="24" fill="#555" />
                            <rect x={`${pecasW}%`} y="0" width={`${sobraW*100}%`} height="24" fill={`url(#hatch${bi})`} />
                            <text
                              x={`${pecasW + sobraW*50}%`}
                              y="15"
                              textAnchor="middle"
                              fill="#fff"
                              fontSize="8"
                              fontFamily="monospace"
                            >{(barra.restante*100).toFixed(0)}cm</text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {Object.entries(PECA_CORES).filter(([nome]) => pecas.some(p => p.nome === nome)).map(([nome, {cor}]) => (
              <div key={nome} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 10, color: "#ccc" }}>
                <div style={{ width: 16, height: 10, background: cor, borderRadius: 1 }} />{nome}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 10, color: "#ccc" }}>
              <svg width="16" height="10" style={{borderRadius:1}}>
                <defs>
                  <pattern id="hatchLeg" width="4" height="4" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="4" x2="4" y2="0" stroke="#888" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="16" height="10" fill="#555" />
                <rect width="16" height="10" fill="url(#hatchLeg)" />
              </svg>Sobra
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
  const pecasEst = pecas.filter(p => p.tipo === "estrutura" || (p.tipo === "diagonal" && p.qtd > 0));
  const pecasPre = pecas.filter(p => p.tipo === "preenchimento");
  const temDoisPerfis = perfilEst !== perfilPre && pecasPre.length > 0;
  const descrEst = pecasEst.length > 0 ? pecasEst[0].perfil : perfilEst;
  const descrPre = pecasPre.length > 0 ? pecasPre[0].perfil : perfilPre;

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
    {temDoisPerfis ? (<>
      <PainelBarras pecas={pecasEst} perfil={descrEst} />
      <PainelBarras pecas={pecasPre} perfil={descrPre} />
    </>) : (
      <PainelBarras pecas={pecas} perfil={descrEst} />
    )}
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
                const espPx = (parseFloat(reg.esp) / (H * 100)) * dh;
                const nBars = Math.max(0, Math.floor(altR / espPx) - 1);
                return (
                  <g key={ri}>
                    {reg.ori === "horizontal"
                      ? [...Array(nBars)].map((_,bi) => {
                          const by = y1r + ((bi+1)/(nBars+1)) * altR;
                          return <line key={bi} x1={fx+6} y1={by} x2={fx+fw-6} y2={by} stroke={corPre} strokeWidth="1.5" />;
                        })
                      : [...Array(Math.min(nBars,40))].map((_,bi) => {
                          const bx = fx + ((bi+1)/(nBars+1)) * fw;
                          return <line key={bi} x1={bx} y1={y1r} x2={bx} y2={y2r} stroke={corPre} strokeWidth="1.5" />;
                        })
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

// ─── Defaults para uma região de preenchimento ────────────────────────────────
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
      // Altura da região, descontando espessura das travessas adjacentes
      const descontoTop = ri === 0 ? espEst : espEst / 2;
      const descontoBot = ri === limites.length - 2 ? espEst : espEst / 2;
      const altRegiao = (yBot - yTop) - descontoTop - descontoBot;
      if (altRegiao <= 0) return;

      const esp = parseFloat(reg.esp) / 100;
      const pPre = calcPesoM(reg.preA, reg.preB, reg.preE);
      const descPre = `Tubo ${Math.max(reg.preA,reg.preB)}×${Math.min(reg.preA,reg.preB)} e=${reg.preE}mm`;
      const largInterna = Lf - 2 * espEst;
      const nColunas = nTravV + 1;

      if (reg.ori === "horizontal") {
        const nBarras = Math.max(0, Math.floor(altRegiao / esp) - 1);
        if (nBarras > 0) {
          const compPre = nTravV > 0 ? (largInterna - nTravV*espEst) / nColunas : largInterna;
          const qtd = nBarras * folhas * nColunas;
          pecas.push({ nome:`Barra horizontal R${ri+1}`, tipo:"preenchimento", perfil:descPre, comp:compPre, qtd, compTotal:qtd*compPre, peso:qtd*compPre*pPre, obs:`Região ${ri+1}: ${(altRegiao*100).toFixed(1)}cm alt` });
        }
      } else {
        const nBarras = Math.max(0, Math.floor(largInterna / esp) - 1);
        if (nBarras > 0) {
          const compPre = altRegiao;
          const qtd = nBarras * folhas;
          pecas.push({ nome:`Barra vertical R${ri+1}`, tipo:"preenchimento", perfil:descPre, comp:compPre, qtd, compTotal:qtd*compPre, peso:qtd*compPre*pPre, obs:`Região ${ri+1}: ${(altRegiao*100).toFixed(1)}cm` });
        }
      }
    });

    const pesoTotal = pecas.reduce((s,p) => s+p.peso, 0);
    const mTotal = pecas.reduce((s,p) => s+p.compTotal, 0);

    setResult({ pecas, pesoTotal:pesoTotal.toFixed(1), mTotal:mTotal.toFixed(2), L, H, folhas, nMeio:nTravH, nTravV, travOrdenadas, regioes:form.regioes, descEst });
  }

  const altNum = parseFloat(form.altura) || 0;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Largura total <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.largura} onChange={e=>set("largura",e.target.value)} placeholder="Ex: 4.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 2.00" /></div>
            <div className="field"><label>Nº de folhas</label><select value={form.folhas} onChange={e=>set("folhas",e.target.value)}><option value="1">1 folha</option><option value="2">2 folhas</option><option value="4">4 folhas</option></select></div>
            <div className="field"><label>Travessas verticais internas</label><select value={form.nTravVert} onChange={e=>set("nTravVert",e.target.value)}>{[...Array(11)].map((_,i)=><option key={i} value={i}>{i===0?"Nenhuma":`${i} travessa${i>1?"s":""}`}</option>)}</select></div>
            <div className="field" style={{flexDirection:"row",alignItems:"center",gap:10}}>
              <input type="checkbox" id="diag" checked={form.incluiDiagonal} onChange={e=>set("incluiDiagonal",e.target.checked)} style={{width:"auto"}} />
              <label htmlFor="diag" style={{textTransform:"none",fontSize:13,cursor:"pointer"}}>Incluir diagonal</label>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfil Estrutural</div>
          <div className="section-body">
            <PerfilEstSelector A={form.estA} B={form.estB} e={form.estE} onChange={setEst} label="Perfil estrutural" />
          </div>
        </div>
      </div>

      {/* Travessas horizontais e regiões */}
      <div className="section">
        <div className="section-header" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>⬛ TRAVESSAS HORIZONTAIS E REGIÕES</span>
          <button onClick={addTravH} style={{background:"#f5a623",border:"none",borderRadius:3,padding:"4px 14px",fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:2,cursor:"pointer",color:"#111"}}>+ TRAVESSA</button>
        </div>
        <div className="section-body" style={{gap:0,padding:0}}>
          {form.regioes.map((reg, ri) => (
            <div key={reg.id}>
              {/* Região ri */}
              <div style={{padding:"14px 20px",background: ri%2===0?"#1a1a1a":"#161616",borderBottom:"1px solid #2a2a2a"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:2,color:"#6fcf6f",marginBottom:10}}>
                  REGIÃO {ri+1}
                  {altNum > 0 && (() => {
                    const limites = [0, ...form.travHoriz.map(t=>parseFloat(t.pos)||0).sort((a,b)=>a-b), altNum*100];
                    const h = limites[ri+1] - limites[ri];
                    return <span style={{color:"#888",fontWeight:"normal",marginLeft:8,fontSize:11}}>{h.toFixed(0)}cm de altura</span>;
                  })()}
                </div>
                <div className="grid-2" style={{gap:12}}>
                  <div className="field">
                    <label>Orientação</label>
                    <select value={reg.ori} onChange={e=>setRegiao(ri,"ori",e.target.value)}
                      style={{background:"#111",border:"1px solid #333",color:"#e8e0d0",fontFamily:"monospace",fontSize:13,padding:"8px",borderRadius:3,width:"100%"}}>
                      <option value="vertical">Barras verticais</option>
                      <option value="horizontal">Barras horizontais</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Espaçamento <span className="unit">(cm)</span></label>
                    <input type="number" min="3" max="100" step="1" value={reg.esp}
                      onChange={e=>setRegiao(ri,"esp",e.target.value)}
                      style={{background:"#111",border:"1px solid #333",color:"#e8e0d0",fontFamily:"monospace",fontSize:13,padding:"8px",borderRadius:3,width:"100%"}} />
                  </div>
                </div>
                <div style={{marginTop:10}}>
                  <PerfilEstSelector A={reg.preA} B={reg.preB} e={reg.preE} onChange={(A,B,e)=>setRegiaoPre(ri,A,B,e)} label="Perfil do preenchimento" />
                </div>
              </div>
              {/* Travessa entre regiões ri e ri+1 */}
              {ri < form.travHoriz.length && (
                <div style={{padding:"10px 20px",background:"#0d1e0d",borderBottom:"1px solid #2a2a2a",display:"flex",alignItems:"center",gap:12}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:12,letterSpacing:2,color:"#40d0ff",minWidth:120}}>TRAVESSA HORIZ. {ri+1}</div>
                  <div className="field" style={{flex:1,margin:0}}>
                    <label>Posição desde o topo <span className="unit">(cm)</span></label>
                    <input type="number" min="1" max={altNum*100-1} step="1" value={form.travHoriz[ri]?.pos || ""}
                      onChange={e=>setTravPos(ri,e.target.value)}
                      style={{background:"#111",border:"1px solid #40d0ff",color:"#40d0ff",fontFamily:"monospace",fontSize:13,padding:"6px 10px",borderRadius:3,width:"100%"}} />
                  </div>
                  <button onClick={()=>removeTravH(ri)}
                    style={{background:"transparent",border:"1px solid #e05050",color:"#e05050",borderRadius:3,padding:"6px 12px",cursor:"pointer",fontFamily:"monospace",fontSize:12}}>
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"flex",gap:12}}>
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
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Comprimento <span className="unit">(m)</span></label><input type="number" min="0.5" step="0.1" value={form.comprimento} onChange={e=>set("comprimento",e.target.value)} placeholder="Ex: 10.00" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.8" step="0.05" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 1.10" /></div>
            <div className="field"><label>Espaçamento entre postes <span className="unit">(cm)</span></label><input type="number" min="50" max="300" step="10" value={form.postesEsp} onChange={e=>set("postesEsp",e.target.value)} /></div>
            <div className="field"><label>Travessas horizontais internas</label><select value={form.nTravHoriz} onChange={e=>set("nTravHoriz",e.target.value)}>{[...Array(11)].map((_,i)=><option key={i} value={i}>{i===0?"Nenhuma":`${i} travessa${i>1?"s":""}`}</option>)}</select></div>
            <div className="field"><label>Travessas verticais internas</label><select value={form.nTravVert} onChange={e=>set("nTravVert",e.target.value)}>{[...Array(11)].map((_,i)=><option key={i} value={i}>{i===0?"Nenhuma":`${i} travessa${i>1?"s":""}`}</option>)}</select></div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <PerfilEstSelector A={form.estA} B={form.estB} e={form.estE} onChange={setEst} label="Perfil estrutural (postes/travessas)" />
            <PerfilEstSelector A={form.preA} B={form.preB} e={form.preE} onChange={setPre} label="Perfil de preenchimento" />
            <div className="field"><label>Orientação do preenchimento</label><select value={form.oriPreenchi} onChange={e=>{set("oriPreenchi",e.target.value);setResult(null);}}><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select></div>
            <div className="field"><label>Espaçamento preenchimento <span className="unit">(cm)</span></label><input type="number" min="3" max="50" step="1" value={form.espacamento} onChange={e=>set("espacamento",e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:12}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PARAPEITO</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,comprimento:"",altura:""}));setResult(null);}}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoParapeito L={result.L} H={result.H} nPostes={result.nPostes} nElementos={result.nEl} oriPreenchi={form.oriPreenchi} perfilEst={`${form.estA}x${form.estB}x${form.estE}`} perfilPre={`${form.preA}x${form.preB}x${form.preE}`} />
        <ListaCorte pecas={result.pecas} perfilEst={`${form.estA}x${form.estB}x${form.estE}`} perfilPre={`${form.preA}x${form.preB}x${form.preE}`} />
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
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field"><label>Largura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.largura} onChange={e=>set("largura",e.target.value)} placeholder="Ex: 1.20" /></div>
            <div className="field"><label>Altura <span className="unit">(m)</span></label><input type="number" min="0.2" step="0.05" value={form.altura} onChange={e=>set("altura",e.target.value)} placeholder="Ex: 2.10" /></div>
            <div className="field"><label>Espaçamento barras verticais <span className="unit">(cm)</span></label><input type="number" min="3" max="30" step="0.5" value={form.espacamentoV} onChange={e=>set("espacamentoV",e.target.value)} /></div>
            <div className="field"><label>Travessas horizontais internas</label><select value={form.nTravH} onChange={e=>set("nTravH",e.target.value)}>{[...Array(11)].map((_,i)=><option key={i} value={i}>{i===0?"Nenhuma":`${i} travessa${i>1?"s":""}`}</option>)}</select></div>
          </div>
        </div>
        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
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
      <div style={{display:"flex",gap:12}}>
        <button className="btn-calc" onClick={calcular}>CALCULAR GRADE</button>
        <button className="btn-reset" onClick={()=>{setForm(f=>({...f,largura:"",altura:""}));setResult(null);}}>LIMPAR</button>
      </div>
      {result && (<>
        <DesenhoGrade L={result.L} H={result.H} nV={result.nV} nH={result.nH} descMoldura={result.descMol} descBarra={result.descBar} />
        <ListaCorte pecas={result.pecas} perfilEst={`mol_${form.molTipo}`} perfilPre={`bar_${form.barTipo}`} />
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