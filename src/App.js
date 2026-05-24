import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0f0f0f; }

  .app {
    min-height: 100vh;
    background: #111;
    color: #e8e0d0;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .header {
    background: #1a1a1a;
    border-bottom: 3px solid #f5a623;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .header-icon {
    font-size: 36px;
    line-height: 1;
  }

  .header-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    letter-spacing: 3px;
    color: #f5a623;
    line-height: 1;
  }

  .header-sub {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: #888;
    letter-spacing: 2px;
    margin-top: 4px;
    text-transform: uppercase;
  }

  .tabs {
    display: flex;
    background: #1a1a1a;
    border-bottom: 2px solid #2a2a2a;
    padding: 0 32px;
    gap: 4px;
  }

  .tab {
    padding: 14px 28px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #666;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s;
  }

  .tab:hover { color: #ccc; }
  .tab.active { color: #f5a623; border-bottom-color: #f5a623; }

  .content {
    padding: 32px;
    max-width: 960px;
    margin: 0 auto;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  @media (max-width: 680px) {
    .grid-2 { grid-template-columns: 1fr; }
    .tabs { padding: 0 16px; }
    .tab { padding: 12px 16px; font-size: 11px; }
    .content { padding: 20px 16px; }
  }

  .section {
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    border-radius: 4px;
    overflow: hidden;
  }

  .section-header {
    background: #222;
    padding: 14px 20px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 2px;
    color: #f5a623;
    border-bottom: 1px solid #2a2a2a;
  }

  .section-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #888;
  }

  input, select {
    background: #111;
    border: 1px solid #333;
    border-radius: 3px;
    color: #e8e0d0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 14px;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  input:focus, select:focus { border-color: #f5a623; }

  select option { background: #1a1a1a; }

  .unit {
    font-size: 10px;
    color: #555;
    margin-left: 4px;
  }

  .btn-calc {
    background: #f5a623;
    color: #111;
    border: none;
    border-radius: 3px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 3px;
    padding: 14px 32px;
    cursor: pointer;
    width: 100%;
    margin-top: 8px;
    transition: background 0.2s, transform 0.1s;
  }

  .btn-calc:hover { background: #ffc04a; }
  .btn-calc:active { transform: scale(0.98); }

  .btn-reset {
    background: transparent;
    color: #666;
    border: 1px solid #333;
    border-radius: 3px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
  }
  .btn-reset:hover { color: #ccc; border-color: #666; }

  .results {
    background: #0d1a0d;
    border: 1px solid #2d4a2d;
    border-radius: 4px;
    overflow: hidden;
  }

  .results-header {
    background: #1a2e1a;
    padding: 14px 20px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 2px;
    color: #6fcf6f;
    border-bottom: 1px solid #2d4a2d;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .results-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .result-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 8px 0;
    border-bottom: 1px solid #1a2e1a;
  }

  .result-row:last-child { border-bottom: none; }

  .result-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: #888;
    letter-spacing: 1px;
  }

  .result-value {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px;
    font-weight: 600;
    color: #6fcf6f;
  }

  .result-value.warn { color: #f5a623; }
  .result-value.danger { color: #e05050; }

  .alert {
    background: #2a1a0a;
    border: 1px solid #f5a623;
    border-radius: 3px;
    padding: 12px 16px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: #f5a623;
    letter-spacing: 0.5px;
  }

  .divider {
    border: none;
    border-top: 1px solid #2a2a2a;
    margin: 4px 0;
  }

  .result-group-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    letter-spacing: 2px;
    color: #f5a623;
    margin-top: 6px;
  }
`;

// ─── STEEL PROPERTIES ───────────────────────────────────────────────────────
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

const BARRA_PROFILES = {
  "barra_12": { desc: "Barra chata 3/4\" (19×3mm)", pesoM: 0.45, tipo: "barra" },
  "barra_25x3": { desc: "Barra chata 25×3mm", pesoM: 0.59, tipo: "barra" },
  "barra_25x5": { desc: "Barra chata 25×5mm", pesoM: 0.98, tipo: "barra" },
  "barra_38x5": { desc: "Barra chata 38×5mm", pesoM: 1.49, tipo: "barra" },
  "cantoneira_25x3": { desc: "Cantoneira 25×25×3mm", pesoM: 1.12, tipo: "cantoneira" },
  "cantoneira_38x3": { desc: "Cantoneira 38×38×3mm", pesoM: 1.74, tipo: "cantoneira" },
  "cantoneira_50x5": { desc: "Cantoneira 50×50×5mm", pesoM: 3.77, tipo: "cantoneira" },
};

// ─── WIND LOAD (NBR 6123 simplified) ────────────────────────────────────────
function calcWindLoad(altura, largura, velocidadeVento = 40) {
  const q = 0.613 * (velocidadeVento / 3.6) ** 2; // pressão dinâmica Pa
  const Cp = 1.3; // coef pressão para painel sólido
  const Ce = 1.0; // coef exposição simplificado
  const area = altura * largura; // m²
  const forca = q * Cp * Ce * area; // N
  return { q: q.toFixed(0), forcaN: forca.toFixed(0), forceKgf: (forca / 9.81).toFixed(1) };
}

// ─── DEFLECTION CHECK (viga bi-apoiada, carga uniforme) ──────────────────
function checkDeflection(vao_m, pesoTotalKg, profile) {
  const E = 200000; // MPa aço
  const t = 3; // mm espessura ref
  const h = parseInt(profile.split("x")[1]) || 40;
  const b = parseInt(profile.split("x")[0]) || 40;
  const I = (b * h ** 3) / 12; // mm4 simplificado tubo maciço (conservador)
  const L = vao_m * 1000; // mm
  const w = (pesoTotalKg * 9.81) / L; // N/mm carga uniforme
  const delta = (5 * w * L ** 4) / (384 * E * I); // mm
  const limite = L / 250;
  return { delta: delta.toFixed(1), limite: limite.toFixed(1), ok: delta <= limite };
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTÃO CALCULATOR
// ══════════════════════════════════════════════════════════════════════════════
function PortaoCalc() {
  const [form, setForm] = useState({
    largura: "", altura: "", folhas: "2",
    perfilEstrutura: "50x50x3", perfilPreenchimento: "30x30x2",
    espacamentoH: "15", espacamentoV: "0",
    vento: "40", incluiDiagonal: true,
  });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function calcular() {
    const L = parseFloat(form.largura);
    const H = parseFloat(form.altura);
    const folhas = parseInt(form.folhas);
    if (!L || !H || L <= 0 || H <= 0) return;

    const Lfolha = L / folhas;
    const perim = 2 * (Lfolha + H); // perímetro por folha
    const diagComp = form.incluiDiagonal ? Math.sqrt(Lfolha ** 2 + H ** 2) : 0;

    // Montantes horizontais (top, bottom, meio)
    const qtdHorizontais = 3;
    const mHorizontais = qtdHorizontais * Lfolha * folhas;

    // Montantes verticais (2 por folha = colunas laterais)
    const mVerticais = 2 * H * folhas;

    // Preenchimento horizontal (barras)
    const espH = parseFloat(form.espacamentoH) / 100;
    const nBarrasH = Math.floor(H / espH) - 1;
    const mBarrasH = nBarrasH > 0 ? nBarrasH * Lfolha * folhas : 0;

    // Diagonal
    const mDiag = diagComp * folhas;

    const mEstrutura = mHorizontais + mVerticais + mDiag;
    const mPreenchi = mBarrasH;

    const pEst = TUBE_PROFILES[form.perfilEstrutura]?.pesoM || 0;
    const pPre = TUBE_PROFILES[form.perfilPreenchimento]?.pesoM || 0;

    const pesoEst = mEstrutura * pEst;
    const pesoPre = mPreenchi * pPre;
    const pesoTotal = pesoEst + pesoPre;

    const wind = calcWindLoad(H, L, parseFloat(form.vento));
    const defl = checkDeflection(Lfolha, pesoTotal / folhas, form.perfilEstrutura);

    setResult({
      mEstrutura: mEstrutura.toFixed(2),
      mPreenchimento: mBarrasH.toFixed(2),
      nBarrasH, mDiag: mDiag.toFixed(2),
      pesoEst: pesoEst.toFixed(1), pesoPre: pesoPre.toFixed(1),
      pesoTotal: pesoTotal.toFixed(1),
      wind, defl, Lfolha: Lfolha.toFixed(2),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field">
              <label>Largura total <span className="unit">(m)</span></label>
              <input type="number" min="0.5" step="0.1" value={form.largura} onChange={e => set("largura", e.target.value)} placeholder="Ex: 4.00" />
            </div>
            <div className="field">
              <label>Altura <span className="unit">(m)</span></label>
              <input type="number" min="0.5" step="0.1" value={form.altura} onChange={e => set("altura", e.target.value)} placeholder="Ex: 2.00" />
            </div>
            <div className="field">
              <label>Nº de folhas</label>
              <select value={form.folhas} onChange={e => set("folhas", e.target.value)}>
                <option value="1">1 folha</option>
                <option value="2">2 folhas</option>
                <option value="4">4 folhas</option>
              </select>
            </div>
            <div className="field">
              <label>Velocidade do vento <span className="unit">(m/s)</span></label>
              <input type="number" min="20" max="80" step="5" value={form.vento} onChange={e => set("vento", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <div className="field">
              <label>Perfil estrutural (moldura)</label>
              <select value={form.perfilEstrutura} onChange={e => set("perfilEstrutura", e.target.value)}>
                {Object.entries(TUBE_PROFILES).map(([k, v]) => (
                  <option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Perfil de preenchimento</label>
              <select value={form.perfilPreenchimento} onChange={e => set("perfilPreenchimento", e.target.value)}>
                {Object.entries(TUBE_PROFILES).map(([k, v]) => (
                  <option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Espaçamento preenchimento horiz. <span className="unit">(cm)</span></label>
              <input type="number" min="5" max="100" step="1" value={form.espacamentoH} onChange={e => set("espacamentoH", e.target.value)} />
            </div>
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

      {result && (
        <div className="results">
          <div className="results-header">✔ Resultado</div>
          <div className="results-body">
            <div className="result-group-title">MATERIAL</div>
            <div className="result-row">
              <span className="result-label">Largura por folha</span>
              <span className="result-value">{result.Lfolha} m</span>
            </div>
            <div className="result-row">
              <span className="result-label">Comprimento estrutural (moldura)</span>
              <span className="result-value">{result.mEstrutura} m</span>
            </div>
            <div className="result-row">
              <span className="result-label">Preenchimento horizontal ({result.nBarrasH} barras/folha)</span>
              <span className="result-value">{result.mPreenchimento} m</span>
            </div>
            {parseFloat(result.mDiag) > 0 && (
              <div className="result-row">
                <span className="result-label">Diagonal (contraventamento)</span>
                <span className="result-value">{result.mDiag} m</span>
              </div>
            )}
            <hr className="divider" />
            <div className="result-row">
              <span className="result-label">Peso estrutural</span>
              <span className="result-value">{result.pesoEst} kg</span>
            </div>
            <div className="result-row">
              <span className="result-label">Peso preenchimento</span>
              <span className="result-value">{result.pesoPre} kg</span>
            </div>
            <div className="result-row">
              <span className="result-label">Peso total estimado</span>
              <span className="result-value" style={{ fontSize: 18 }}>{result.pesoTotal} kg</span>
            </div>

            <div className="result-group-title" style={{ marginTop: 12 }}>VENTO — NBR 6123</div>
            <div className="result-row">
              <span className="result-label">Pressão dinâmica</span>
              <span className="result-value">{result.wind.q} Pa</span>
            </div>
            <div className="result-row">
              <span className="result-label">Força total no portão</span>
              <span className="result-value">{result.wind.forceKgf} kgf ({result.wind.forcaN} N)</span>
            </div>

            <div className="result-group-title" style={{ marginTop: 12 }}>RIGIDEZ</div>
            <div className="result-row">
              <span className="result-label">Flecha estimada (vão por folha)</span>
              <span className={`result-value ${result.defl.ok ? "" : "danger"}`}>{result.defl.delta} mm</span>
            </div>
            <div className="result-row">
              <span className="result-label">Limite L/250</span>
              <span className="result-value">{result.defl.limite} mm</span>
            </div>
            {!result.defl.ok && (
              <div className="alert">⚠ Flecha excede o limite. Considere perfil maior ou adicione montante intermediário.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PARAPEITO CALCULATOR
// ══════════════════════════════════════════════════════════════════════════════
function ParapeitoCalc() {
  const [form, setForm] = useState({
    comprimento: "", altura: "", perfilEstrutura: "50x50x3",
    perfilPreenchi: "30x30x2", espacamento: "12", tipo: "horizontal",
    vento: "40", postesEspacamento: "200",
  });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function calcular() {
    const L = parseFloat(form.comprimento);
    const H = parseFloat(form.altura);
    if (!L || !H || L <= 0 || H <= 0) return;

    const espPoste = parseFloat(form.postesEspacamento) / 100;
    const nPostes = Math.ceil(L / espPoste) + 1;
    const mPostes = nPostes * H;
    const mSuperior = L;
    const mInferior = L;
    const mEstrutura = mPostes + mSuperior + mInferior;

    const espPreenchi = parseFloat(form.espacamento) / 100;
    let mPreenchi = 0;
    let nElementos = 0;

    if (form.tipo === "horizontal") {
      nElementos = Math.floor(H / espPreenchi) - 1;
      mPreenchi = nElementos > 0 ? nElementos * L : 0;
    } else {
      // vertical: barras de H metros, espaçadas horizontalmente
      const nVert = Math.floor(L / espPreenchi) - 1;
      nElementos = nVert;
      mPreenchi = nVert > 0 ? nVert * H : 0;
    }

    const pEst = TUBE_PROFILES[form.perfilEstrutura]?.pesoM || 0;
    const pPre = TUBE_PROFILES[form.perfilPreenchi]?.pesoM || 0;

    const pesoEst = mEstrutura * pEst;
    const pesoPre = mPreenchi * pPre;
    const pesoTotal = pesoEst + pesoPre;

    const wind = calcWindLoad(H, L, parseFloat(form.vento));

    // Carga horizontal NBR 6118 parapeito (mínimo 0.8 kN/m)
    const cargaHoriz = Math.max(0.8, parseFloat(form.vento) * 0.02);
    const momentoPoste = (cargaHoriz * H * H) / 2; // kNm

    setResult({
      nPostes, mPostes: mPostes.toFixed(2),
      mEstrutura: mEstrutura.toFixed(2), mPreenchi: mPreenchi.toFixed(2),
      nElementos, pesoEst: pesoEst.toFixed(1), pesoPre: pesoPre.toFixed(1),
      pesoTotal: pesoTotal.toFixed(1), wind,
      cargaHoriz: cargaHoriz.toFixed(2), momentoPoste: momentoPoste.toFixed(2),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field">
              <label>Comprimento <span className="unit">(m)</span></label>
              <input type="number" min="0.5" step="0.1" value={form.comprimento} onChange={e => set("comprimento", e.target.value)} placeholder="Ex: 10.00" />
            </div>
            <div className="field">
              <label>Altura <span className="unit">(m) — mín 1.05m NBR</span></label>
              <input type="number" min="0.8" step="0.05" value={form.altura} onChange={e => set("altura", e.target.value)} placeholder="Ex: 1.10" />
            </div>
            <div className="field">
              <label>Espaçamento entre postes <span className="unit">(cm)</span></label>
              <input type="number" min="50" max="300" step="10" value={form.postesEspacamento} onChange={e => set("postesEspacamento", e.target.value)} />
            </div>
            <div className="field">
              <label>Velocidade do vento <span className="unit">(m/s)</span></label>
              <input type="number" min="20" max="80" step="5" value={form.vento} onChange={e => set("vento", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">🔩 Perfis e Preenchimento</div>
          <div className="section-body">
            <div className="field">
              <label>Perfil dos postes / travessas</label>
              <select value={form.perfilEstrutura} onChange={e => set("perfilEstrutura", e.target.value)}>
                {Object.entries(TUBE_PROFILES).map(([k, v]) => (
                  <option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Perfil de preenchimento</label>
              <select value={form.perfilPreenchi} onChange={e => set("perfilPreenchi", e.target.value)}>
                {Object.entries(TUBE_PROFILES).map(([k, v]) => (
                  <option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Tipo de preenchimento</label>
              <select value={form.tipo} onChange={e => set("tipo", e.target.value)}>
                <option value="horizontal">Barras horizontais</option>
                <option value="vertical">Barras verticais</option>
              </select>
            </div>
            <div className="field">
              <label>Espaçamento preenchimento <span className="unit">(cm)</span></label>
              <input type="number" min="5" max="50" step="1" value={form.espacamento} onChange={e => set("espacamento", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-calc" onClick={calcular}>CALCULAR PARAPEITO</button>
        <button className="btn-reset" onClick={() => { setForm(f => ({ ...f, comprimento: "", altura: "" })); setResult(null); }}>LIMPAR</button>
      </div>

      {result && (
        <div className="results">
          <div className="results-header">✔ Resultado</div>
          <div className="results-body">
            <div className="result-group-title">MATERIAL</div>
            <div className="result-row">
              <span className="result-label">Postes ({result.nPostes} un × {form.altura} m)</span>
              <span className="result-value">{result.mPostes} m</span>
            </div>
            <div className="result-row">
              <span className="result-label">Estrutura total (postes + travessas)</span>
              <span className="result-value">{result.mEstrutura} m</span>
            </div>
            <div className="result-row">
              <span className="result-label">Preenchimento ({result.nElementos} elementos)</span>
              <span className="result-value">{result.mPreenchi} m</span>
            </div>
            <hr className="divider" />
            <div className="result-row">
              <span className="result-label">Peso estrutural</span>
              <span className="result-value">{result.pesoEst} kg</span>
            </div>
            <div className="result-row">
              <span className="result-label">Peso preenchimento</span>
              <span className="result-value">{result.pesoPre} kg</span>
            </div>
            <div className="result-row">
              <span className="result-label">Peso total</span>
              <span className="result-value" style={{ fontSize: 18 }}>{result.pesoTotal} kg</span>
            </div>

            <div className="result-group-title" style={{ marginTop: 12 }}>CARGAS — NBR 6118 / NBR 6123</div>
            <div className="result-row">
              <span className="result-label">Pressão de vento</span>
              <span className="result-value">{result.wind.q} Pa</span>
            </div>
            <div className="result-row">
              <span className="result-label">Força de vento total</span>
              <span className="result-value">{result.wind.forceKgf} kgf</span>
            </div>
            <div className="result-row">
              <span className="result-label">Carga horiz. no parapeito (mín. NBR)</span>
              <span className="result-value">{result.cargaHoriz} kN/m</span>
            </div>
            <div className="result-row">
              <span className="result-label">Momento no pé do poste</span>
              <span className={`result-value ${parseFloat(result.momentoPoste) > 1.5 ? "warn" : ""}`}>{result.momentoPoste} kNm</span>
            </div>
            {parseFloat(form.altura) < 1.05 && (
              <div className="alert">⚠ Altura abaixo de 1,05m. NBR 9050 exige altura mínima de 1,05m para parapeitos em locais de uso público.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GRADE CALCULATOR
// ══════════════════════════════════════════════════════════════════════════════
function GradeCalc() {
  const [form, setForm] = useState({
    largura: "", altura: "", perfilMoldura: "40x40x3",
    perfilBarra: "30x30x2", espacamentoV: "10", espacamentoH: "0",
    temMontanteH: false,
  });
  const [result, setResult] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function calcular() {
    const L = parseFloat(form.largura);
    const H = parseFloat(form.altura);
    if (!L || !H || L <= 0 || H <= 0) return;

    // Moldura
    const mMoldura = 2 * (L + H);

    // Barras verticais
    const espV = parseFloat(form.espacamentoV) / 100;
    const nV = Math.max(0, Math.floor(L / espV) - 1);
    const mBarrasV = nV * H;

    // Barras horizontais internas (opcional)
    let nH = 0, mBarrasH = 0;
    if (form.temMontanteH && form.espacamentoH) {
      const espH = parseFloat(form.espacamentoH) / 100;
      nH = Math.max(0, Math.floor(H / espH) - 1);
      mBarrasH = nH * L;
    }

    const pMoldura = TUBE_PROFILES[form.perfilMoldura]?.pesoM || 0;
    const pBarra = TUBE_PROFILES[form.perfilBarra]?.pesoM || 0;

    const pesoMoldura = mMoldura * pMoldura;
    const pesoBarras = (mBarrasV + mBarrasH) * pBarra;
    const pesoTotal = pesoMoldura + pesoBarras;

    // Abertura livre (segurança)
    const aberturaOk = espV <= 0.11; // máx 11cm (NBR 9050)

    setResult({
      mMoldura: mMoldura.toFixed(2), nV, mBarrasV: mBarrasV.toFixed(2),
      nH, mBarrasH: mBarrasH.toFixed(2),
      mTotal: (mMoldura + mBarrasV + mBarrasH).toFixed(2),
      pesoMoldura: pesoMoldura.toFixed(1), pesoBarras: pesoBarras.toFixed(1),
      pesoTotal: pesoTotal.toFixed(1), aberturaOk, espV: (espV * 100).toFixed(0),
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-2">
        <div className="section">
          <div className="section-header">⚙ Dimensões</div>
          <div className="section-body">
            <div className="field">
              <label>Largura <span className="unit">(m)</span></label>
              <input type="number" min="0.2" step="0.05" value={form.largura} onChange={e => set("largura", e.target.value)} placeholder="Ex: 1.20" />
            </div>
            <div className="field">
              <label>Altura <span className="unit">(m)</span></label>
              <input type="number" min="0.2" step="0.05" value={form.altura} onChange={e => set("altura", e.target.value)} placeholder="Ex: 2.10" />
            </div>
            <div className="field">
              <label>Espaçamento barras verticais <span className="unit">(cm)</span></label>
              <input type="number" min="3" max="30" step="0.5" value={form.espacamentoV} onChange={e => set("espacamentoV", e.target.value)} />
            </div>
            <div className="field" style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <input type="checkbox" id="mh" checked={form.temMontanteH} onChange={e => set("temMontanteH", e.target.checked)} style={{ width: "auto" }} />
              <label htmlFor="mh" style={{ textTransform: "none", fontSize: 13, cursor: "pointer" }}>Adicionar travessas horizontais</label>
            </div>
            {form.temMontanteH && (
              <div className="field">
                <label>Espaçamento travessas <span className="unit">(cm)</span></label>
                <input type="number" min="10" max="100" step="5" value={form.espacamentoH} onChange={e => set("espacamentoH", e.target.value)} />
              </div>
            )}
          </div>
        </div>

        <div className="section">
          <div className="section-header">🔩 Perfis</div>
          <div className="section-body">
            <div className="field">
              <label>Perfil da moldura</label>
              <select value={form.perfilMoldura} onChange={e => set("perfilMoldura", e.target.value)}>
                {Object.entries(TUBE_PROFILES).map(([k, v]) => (
                  <option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Perfil das barras internas</label>
              <select value={form.perfilBarra} onChange={e => set("perfilBarra", e.target.value)}>
                {Object.entries(TUBE_PROFILES).map(([k, v]) => (
                  <option key={k} value={k}>{v.desc} — {v.pesoM} kg/m</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-calc" onClick={calcular}>CALCULAR GRADE</button>
        <button className="btn-reset" onClick={() => { setForm(f => ({ ...f, largura: "", altura: "" })); setResult(null); }}>LIMPAR</button>
      </div>

      {result && (
        <div className="results">
          <div className="results-header">✔ Resultado</div>
          <div className="results-body">
            <div className="result-group-title">MATERIAL</div>
            <div className="result-row">
              <span className="result-label">Moldura perimetral</span>
              <span className="result-value">{result.mMoldura} m</span>
            </div>
            <div className="result-row">
              <span className="result-label">Barras verticais ({result.nV} un)</span>
              <span className="result-value">{result.mBarrasV} m</span>
            </div>
            {result.nH > 0 && (
              <div className="result-row">
                <span className="result-label">Travessas horizontais ({result.nH} un)</span>
                <span className="result-value">{result.mBarrasH} m</span>
              </div>
            )}
            <div className="result-row">
              <span className="result-label">Total de material</span>
              <span className="result-value">{result.mTotal} m</span>
            </div>
            <hr className="divider" />
            <div className="result-row">
              <span className="result-label">Peso da moldura</span>
              <span className="result-value">{result.pesoMoldura} kg</span>
            </div>
            <div className="result-row">
              <span className="result-label">Peso das barras</span>
              <span className="result-value">{result.pesoBarras} kg</span>
            </div>
            <div className="result-row">
              <span className="result-label">Peso total</span>
              <span className="result-value" style={{ fontSize: 18 }}>{result.pesoTotal} kg</span>
            </div>

            <div className="result-group-title" style={{ marginTop: 12 }}>SEGURANÇA</div>
            <div className="result-row">
              <span className="result-label">Abertura livre entre barras</span>
              <span className={`result-value ${result.aberturaOk ? "" : "danger"}`}>{result.espV} cm {result.aberturaOk ? "✔" : "✘"}</span>
            </div>
            {!result.aberturaOk && (
              <div className="alert">⚠ Abertura maior que 11cm. Para grades de segurança em áreas com crianças, NBR 9050 recomenda máx. 11cm para impedir passagem de cabeça.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP
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
            <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="content">
          <Active />
        </div>
      </div>
    </>
  );
}
