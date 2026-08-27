# 🐍 Nahual Backend (FastAPI + SQLite)

API REST + clasificador de 4 capas cognitivas + persistencia anónima +
PDF forense + observabilidad.

## Estado en producción
- **URL:** detrás del proxy en el droplet. El puerto 8000 **no está expuesto** al exterior (verificado 2026-08-27: filtrado). En local: `http://localhost:8000`.
- **Swagger:** `http://localhost:8000/docs` en local. La ruta pública no responde hoy (ver README raíz, §Despliegue).
- **Servicio systemd:** `nahual-backend.service`
- **Modelo Anthropic:** `claude-sonnet-4-5-20250929`
- **STT:** Groq Whisper-large-v3
- **DB:** SQLite con WAL mode + retry-on-lock

## 4 capas cognitivas

```
TEXT
  │
  ├── Capa 0 (Override): phase3/4 ≥ 0.80 → risk_score = 1.0
  │
  ├── Capa 1 (Heurístico): regex + 900 patrones + emojis_narco
  │   classifier/heuristic.py
  │
  ├── Capa 1.5 (Bayesiano): Naive Bayes con n-gramas (1,2,3),
  │   Laplace smoothing, JSON persistence, RLock-protected.
  │   1031 docs entrenados, vocab 6104.
  │   classifier/bayesian.py
  │
  ├── Capa 2 (LLM): claude-sonnet-4-5-20250929. Tres disparadores,
  │   cualquiera basta: (a) zona gris 0.3–0.6; (b) score==0 Y texto
  │   >30 chars; (c) score<0.3 Y vocabulario de activación
  │   classifier/llm_layer.py
  │
  └── Capa 3 (Trayectoria): EscalationDetector — riesgo entre
      mensajes de una misma sesión, override por velocidad / progresión
      de fase
      classifier/escalation.py
```

## Endpoints principales

### Públicos (sin auth)

```
POST /analyze              → clasifica texto
POST /alert                → registra alerta + clasifica + persiste
POST /transcribe           → audio → texto (Groq Whisper)
POST /ocr                  → imagen → texto (Claude Vision)
GET  /stats                → totales agregados
GET  /stats/timeseries     → buckets por hora/día
GET  /health               → flags + auth_enforced
POST /report/{id}          → descarga PDF
GET  /profile/{id}         → perfil acumulativo de sesión
POST /feedback             → confirm/deny → re-entrena bayesian
POST /contribute           → metadata anónima
GET  /contributions/stats  → dataset abierto
```

### Admin (read-only, public, PII-free)

```
GET /admin/version           → commit + branch + python
GET /admin/dataset-info      → 900 patrones + histograma + 14 emojis
GET /admin/metrics           → request counters + uptime
GET /admin/healthcheck-deep  → ping live a DB + Anthropic + Groq
GET /admin/runtime-info      → agregado de las 5 anteriores + recent alerts
GET /bayesian/stats          → 1031 docs · vocab 6104 · top features
POST /bayesian/predict       → predicción aislada (debug)
```

### Protegidos (X-API-Key header)

```
GET  /alerts                 → lista + filtros
GET  /alerts.csv             → export Excel UTF-8-BOM
GET/PATCH /alerts/{id}       → detalle / update
POST /alerts/{id}/escalate   → 088 / SIPINNA / Fiscalía
GET  /alerts/{id}/why        → reconstruye explicaciones
GET  /alerts/{id}/legal      → marco legal aplicable
GET/PUT/DELETE /sessions/{id}
GET/DELETE /risk-history/{id}
GET/POST /precision/*        → auto-tuner
```

## Setup local

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate     # Windows
source .venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
cp ../.env.example ../.env
uvicorn main:app --reload --port 8000
```

## Tests

```bash
cd backend
rm -f nahual.db
python -m pytest tests/ -q
# 163/163 verde (medido 2026-08-27)
```

Suites:
- `test_classifier.py` — 4-fase scoring, override, escalation
- `test_admin.py` — version, dataset-info, metrics, healthcheck, runtime-info
- `test_bayesian.py` — train, predict, persist, integration
- `test_webhooks.py` — firma HMAC, reintentos, qué dispara y qué no
- y `test_api`, `test_auth`, `test_legal`, `test_moderation`, `test_phase3`,
  `test_phase4`, `test_precision`, `test_sessions`, `test_timeseries`
  (13 archivos en total)

## Privacy by design

- **Nunca se persiste el texto original** — solo SHA-256 hash + resumen
  anonimizado + pattern_ids
- **Pydantic models con `extra="forbid"`** — rechazan campos desconocidos
- **`/analyze` no escribe a DB** — solo `/alert` lo hace
- **Bayesian feed**: solo el `summary` + `pattern_ids` reconstruidos via
  `build_why_from_ids()`, nunca el texto

## Ver

- [README.md raíz](../README.md) — arquitectura completa
- [docs/arquitectura.md](../docs/arquitectura.md) — diagramas Mermaid
- [CHANGELOG.md](../CHANGELOG.md) — todos los cambios v1.4
