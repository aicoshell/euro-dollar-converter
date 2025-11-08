# FX Converter (EUR ↔ USD)

Application React (Vite) permettant de convertir des montants entre EUR et USD.

- **Taux en temps réel** (simulation, rafraîchi toutes les 3s)
- **Taux fixe** optionnel avec désactivation auto si l’écart > 2% du taux réel
- **Historique** des 5 dernières conversions
- **Sparkline** de la tendance du taux

## Démarrage rapide

- **Prérequis**: Node.js 18+

### Installer les dépendances

```bash
npm install
```

### Lancer en développement

```bash
npm run dev
```

### Lancer les tests

Tests via Vitest + Testing Library.

```bash
npm run test       # exécution unique
npm run test:watch # mode watch
```

### Build de production

```bash
npm run build
npm run preview    # prévisualiser le build localement
```

## Structure du projet

- `src/` Composants et logique applicative (TypeScript + React)
- `test/` Fichiers de tests, configuration de setup (`setup.ts`)

## Stack

- React TypeScript, Vite
- Vitest, @testing-library/react, jsdom 

