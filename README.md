# MIRA COLLECTIVE - Landing Page

Landing page pour le recrutement des 100 membres fondateurs du syndicat de freelances d'élite MIRA Collective.

## 🎯 Objectif

Convertir 15% des visiteurs en inscriptions au programme fondateurs.

## 📋 Sections

1. **Hero** - Proposition de valeur principale + urgence (53/100 places)
2. **Le Problème** - Pain points du freelancing actuel (commissions, délais, risques)
3. **La Solution** - 10 avantages différenciateurs de MIRA
4. **Programme Fondateurs** - Avantages exclusifs + urgence + social proof
5. **Comment ça marche** - 3 étapes simples pour rejoindre
6. **Témoignages** - Social proof + métriques clés
7. **FAQ** - Réponse aux objections principales
8. **CTA Final** - Conversion ultime avec compteur
9. **Formulaire** - Inscription en 2 minutes

## 🎨 Design System

### Couleurs

- **Background**: `#F8F9FA` (crème), `#FFFFFF` (blanc)
- **Primary**: `#0A1E5E` (bleu nuit) → `#4A69FF` (bleu électrique)
- **Accent**: `#B87333` (or cuivré)
- **Text**: `#2D3436` (anthracite), `#636E72` (gris)

### Typographie

- **Font**: Inter (Google Fonts)
- **H1**: 64px / 40px (mobile)
- **H2**: 48px / 28px (mobile)
- **Body**: 16px

### Spacing

- **Desktop**: 96px entre sections
- **Mobile**: 64px entre sections

## ⚡ Fonctionnalités

### Animations

- ✨ Étoiles scintillantes sur fond Hero et CTA final
- 🔄 Avatars défilants en boucle infinie
- 📊 Barres de progression animées
- 🎯 Compteurs de places avec animation
- 🌊 Float animation sur les cercles de collaboration
- 💫 Pulse sur CTA principal
- 📜 Fade-in au scroll sur les cartes

### Interactions

- **FAQ Accordion**: Ouverture/fermeture des questions
- **Scroll to Form**: CTAs scrollent vers formulaire
- **Form Validation**: Validation côté client
- **Success State**: Message de succès + confetti
- **Cookie Consent**: Bannière GDPR

### Tracking

- Événements trackés (prêts pour GA):
  - ✅ Page view
  - ✅ Clics CTA (par position)
  - ✅ Scroll depth (25%, 50%, 75%, 100%)
  - ✅ Ouverture FAQ (par question)
  - ✅ Champs formulaire complétés
  - ✅ Soumission formulaire
  - ✅ Temps passé sur page
  - ✅ Performance (page load time)

## 📱 Responsive

- **Desktop**: Layout complet
- **Tablet** (< 968px): Grilles adaptées, navigation simplifiée
- **Mobile** (< 640px): Stack vertical, typo réduite

## 🚀 Mise en ligne

### Checklist avant production

- [ ] Remplacer les placeholder SVG logo par le vrai logo MIRA
- [ ] Ajouter vraies photos des fondateurs (Sarah, Thomas, Julie)
- [ ] Connecter formulaire à backend/CRM
- [ ] Configurer emails de confirmation automatiques
- [ ] Installer Google Analytics (remplacer `console.log` par `gtag`)
- [ ] Configurer Hotjar pour heatmaps
- [ ] Tester sur tous navigateurs (Chrome, Firefox, Safari, Edge)
- [ ] Tester responsive sur vrais devices
- [ ] Optimiser images (WebP, lazy loading)
- [ ] Ajouter meta tags Open Graph pour réseaux sociaux
- [ ] Configurer SSL/HTTPS
- [ ] Tester vitesse (objectif < 2s)
- [ ] SEO: sitemap.xml, robots.txt

### Déploiement rapide

#### Option 1: Netlify (Recommandé)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Déployer
netlify deploy --prod
```

#### Option 2: Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

#### Option 3: GitHub Pages

1. Push sur GitHub
2. Settings → Pages → Source: main branch
3. URL: `https://username.github.io/repository`

## 🔧 Configuration Backend

### Formulaire

Le formulaire collecte actuellement les données en `localStorage`. Pour production:

```javascript
// Dans script.js, fonction handleFormSubmit()
// Remplacer:
localStorage.setItem('founderApplication', JSON.stringify(data));

// Par:
fetch('https://votre-api.com/api/founders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    showFormSuccess();
    // Envoyer email de confirmation
})
.catch(error => console.error('Error:', error));
```

### Email automatique

Utiliser un service comme:

- **SendGrid**: Pour emails transactionnels
- **Mailgun**: Alternative
- **AWS SES**: Si infrastructure AWS

### Base de données

Stocker les candidatures dans:

- **Airtable**: Solution no-code rapide
- **Supabase**: PostgreSQL + Auth
- **Firebase**: Realtime + facile
- **PostgreSQL**: Solution classique

### Compteur en temps réel

Pour synchroniser le compteur entre visiteurs:

```javascript
// Utiliser Firebase Realtime Database
const db = firebase.database();
const placesRef = db.ref('placesRemaining');

placesRef.on('value', (snapshot) => {
    updatePlacesRemaining(snapshot.val());
});
```

## 📊 A/B Tests à lancer

1. **Hero H1**:
   - A: "Brillez, ensemble."
   - B: "Gardez 100% de vos revenus"

2. **CTA couleur**:
   - A: Or (#B87333)
   - B: Bleu électrique (#4A69FF)

3. **Compteur urgence**:
   - A: "53/100 places restantes"
   - B: "5 inscrits aujourd'hui"

## 🔒 RGPD / Conformité

- ✅ Bannière cookies implémentée
- ✅ Consentement stocké en localStorage
- ⚠️ Ajouter page "Politique de confidentialité"
- ⚠️ Ajouter page "Mentions légales"
- ⚠️ Ajouter page "CGU"

## 🎯 Optimisations futures

### Performance

- [ ] Lazy loading images
- [ ] Minification CSS/JS (avec build tool)
- [ ] CDN pour assets statiques
- [ ] Service Worker pour cache
- [ ] Preload fonts critiques

### Conversion

- [ ] Exit-intent popup
- [ ] Chat en direct (Crisp, Intercom)
- [ ] Remarketing pixel (Facebook, LinkedIn)
- [ ] Testimonials vidéo
- [ ] Live counter (vrais signups)

### SEO

- [ ] Schema markup (Organization, FAQPage)
- [ ] Alt text sur images
- [ ] H1/H2 hierarchy
- [ ] Internal linking
- [ ] Blog pour content marketing

## 📞 Contact & Support

Pour toute question sur cette landing page:

- **Email**: dev@miracollective.com
- **Discord**: [Lien Discord]
- **GitHub Issues**: Pour bugs/suggestions

## 📄 Licence

© 2025 MIRA Collective SAS - Tous droits réservés

---

**Made with ❤️ in France**

Brillez, ensemble. ✨
