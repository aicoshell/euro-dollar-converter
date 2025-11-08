# À faire

- **Validation de saisie**: séparateur décimal et précision max
- **Tests unitaires** supplémentaires: dérive du taux, auto‑désactivation du taux fixe (>2%), continuité lors du switch EUR/USD
- **Extraction de la logique** en hooks réutilisables (`useDriftingRate`, `useConverter`)
- **Accessibilité**: descriptions ARIA pour le switch et les sorties de conversion
- **États de chargement** (skeleton) avant disponibilité du taux
- **Persistance de l’historique** via `localStorage`
- **Effacer l’historique** avec confirmation
- **Messages d’erreur** plus précis pour taux fixe invalide (inline, par champ)
- **UX clavier**: Entrée pour convertir; gestion du focus après switch
- **Responsive**: polissage pour très petits écrans (<360px)
- **Internationalisation** (FR/EN) des libellés et formats de nombre

# Raccourcis (actuels)

- Pas de librairie de state management dédiée (state local React)
- TypeScript en place, mais certaines validations peuvent être renforcées
- Suite de tests démarrée (Vitest + Testing Library); couverture à étendre
- Pas de persistance de l’historique pour l’instant
- Style minimal en CSS custom; pas de design system
