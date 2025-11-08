# Roadmap

## Fonctionnalités

- **Conversion multi‑devises** (au‑delà de EUR↔USD)
- **API de taux en temps réel** (ex. exchangerate.host) avec **fallback local**
- **Historique persistant** et **export CSV**
- **Graphiques** (sparklines) d'évolution du taux
- **Mode hors‑ligne** (Service Worker + cache)

## Qualité et DX

- **Tests**: unitaires (Vitest) et E2E (Playwright)
- **Internationalisation** FR/EN et formats locaux
- **Accessibilité**: tests axe, focus visible, raccourcis clavier
- **Composants UI** partagés + **thème** clair/sombre

## CI/CD et Ops

- **CI GitHub Actions**: lint, tests, build
- **Déploiement** automatique (GitHub Pages) sur `main`
- **Monitoring** Web Vitals et perf
