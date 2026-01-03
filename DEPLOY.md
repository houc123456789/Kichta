# 🚀 Guide de Déploiement Vercel - MIRA Collective

Ce guide vous explique comment déployer la landing page MIRA Collective sur Vercel.

## ⚡ Méthode 1: Déploiement via Interface Web (Le plus simple)

### Étape 1: Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up"
3. Connectez-vous avec votre compte GitHub

### Étape 2: Importer le projet

1. Sur le dashboard Vercel, cliquez sur **"Add New"** → **"Project"**
2. Sélectionnez **"Import Git Repository"**
3. Autorisez Vercel à accéder à votre compte GitHub
4. Cherchez et sélectionnez le repo **"Kichta"**
5. Sélectionnez la branche **`claude/check-empty-repo-pAwWh`**

### Étape 3: Configuration

Vercel va auto-détecter que c'est un site statique.

**Paramètres recommandés:**
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: (laisser vide)
- **Output Directory**: (laisser vide)

### Étape 4: Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 30-60 secondes ⏱️
3. ✅ Votre site est en ligne !

### Étape 5: Obtenir l'URL

Vercel vous donnera une URL du type:
```
https://kichta-xxx.vercel.app
```

Vous pouvez aussi configurer un **domaine personnalisé** comme:
```
https://miracollective.com
```

---

## 💻 Méthode 2: Déploiement via CLI (Pour les développeurs)

### Installation

```bash
# Installer Vercel CLI
npm install -g vercel

# Ou avec yarn
yarn global add vercel
```

### Déploiement

```bash
# Se connecter à Vercel (première fois uniquement)
vercel login

# Déployer en mode preview
vercel

# Déployer en production
vercel --prod
```

### Exemple de sortie

```
Vercel CLI 33.0.1
🔍 Inspect: https://vercel.com/...
✅ Production: https://mira-collective.vercel.app [1s]
```

---

## 🔧 Méthode 3: Déploiement Automatique (CI/CD)

### Configuration GitHub Auto-Deploy

1. Sur Vercel dashboard → Settings → Git
2. Activez **"Auto Deploy"**
3. Choisissez la branche: `claude/check-empty-repo-pAwWh`

**Maintenant à chaque push:**
```bash
git add .
git commit -m "Update landing page"
git push
```

→ Vercel déploie automatiquement en 30s ! 🚀

---

## 🌐 Configuration Domaine Personnalisé

### Ajouter votre domaine

1. Sur Vercel dashboard → Project → Settings → Domains
2. Cliquez sur **"Add Domain"**
3. Entrez votre domaine: `miracollective.com`

### Configuration DNS

**Chez votre registrar (OVH, Namecheap, etc.):**

**Option A: Domaine racine (miracollective.com)**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Option B: Sous-domaine (www.miracollective.com)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Temps de propagation:** 24-48h maximum

---

## 📊 Configuration Analytics

### Vercel Analytics (Gratuit)

1. Dashboard → Project → Analytics
2. Activez **"Enable Analytics"**

**Vous obtiendrez:**
- Page views
- Visiteurs uniques
- Top pages
- Géolocalisation

### Ajouter Google Analytics

Dans `index.html`, ajoutez avant `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Remplacez `G-XXXXXXXXXX` par votre ID Google Analytics.

---

## ⚙️ Variables d'Environnement

Si vous avez besoin d'API keys ou secrets:

1. Dashboard → Project → Settings → Environment Variables
2. Ajoutez vos variables:
   - `GOOGLE_ANALYTICS_ID`
   - `SENDGRID_API_KEY`
   - etc.

**Dans votre code:**
```javascript
// Les variables d'env Vercel sont accessibles via process.env
const gaId = process.env.GOOGLE_ANALYTICS_ID;
```

---

## 🔒 HTTPS & Sécurité

**✅ Automatique avec Vercel:**
- Certificat SSL gratuit (Let's Encrypt)
- HTTPS activé par défaut
- HTTP → HTTPS redirect automatique
- Headers de sécurité configurés

---

## 🚀 Performance & Optimisation

### Edge Network

Vercel déploie automatiquement sur leur **Edge Network** mondial:
- 🌍 70+ régions dans le monde
- ⚡ Latence < 50ms partout
- 📦 Cache automatique

### Headers de Cache

Déjà configurés dans `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 📈 Monitoring

### Vercel Dashboard

Accédez aux métriques en temps réel:
- **Deployments**: Historique de tous les déploiements
- **Analytics**: Trafic et engagement
- **Logs**: Logs en temps réel
- **Speed Insights**: Core Web Vitals

### Alertes

Configurez des alertes:
1. Settings → Notifications
2. Activez les alertes pour:
   - Deployment failures
   - Custom domains errors
   - Build errors

---

## 🐛 Dépannage

### Erreur: "Build Failed"

**Solution:**
```bash
# Vérifier que tous les fichiers sont présents
ls -la

# index.html, styles.css, script.js doivent être là
```

### Erreur: "Domain not configured"

**Solution:**
1. Vérifiez vos DNS records
2. Attendez 24-48h pour propagation
3. Utilisez https://dnschecker.org pour vérifier

### Site ne se met pas à jour

**Solution:**
```bash
# Forcer un nouveau déploiement
vercel --force

# Ou via dashboard: Deployments → Redeploy
```

### Erreur 404 sur certaines pages

**Solution:**
C'est une SPA (Single Page Application). Vérifiez que `vercel.json` contient:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## ✅ Checklist Pré-Déploiement

Avant de déployer en production:

### Contenu
- [ ] Logo MIRA mis à jour
- [ ] Photos réelles des fondateurs
- [ ] Tous les textes vérifiés (orthographe)
- [ ] Liens sociaux corrects

### Technique
- [ ] Google Analytics ID configuré
- [ ] Formulaire connecté au backend
- [ ] Emails de confirmation fonctionnels
- [ ] RGPD: pages légales créées

### Performance
- [ ] Images optimisées (WebP si possible)
- [ ] Testé sur mobile (iPhone, Android)
- [ ] Testé sur tous navigateurs
- [ ] Score Lighthouse > 90

### SEO
- [ ] Meta description remplie
- [ ] Open Graph tags
- [ ] Sitemap.xml généré
- [ ] robots.txt configuré

---

## 🎯 Post-Déploiement

### Tester le site

1. **Performance:**
   - https://pagespeed.web.dev
   - Objectif: Score > 90

2. **Responsive:**
   - Chrome DevTools → Toggle Device Toolbar
   - Tester iPhone, iPad, Android

3. **Cross-browser:**
   - Chrome ✅
   - Firefox ✅
   - Safari ✅
   - Edge ✅

### Partager

Votre site est en ligne ! Partagez l'URL:
```
https://mira-collective.vercel.app
```

Ou avec domaine personnalisé:
```
https://miracollective.com
```

---

## 📞 Support

**Problème avec Vercel?**
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://vercel-status.com

**Problème avec la landing page?**
- Voir README.md
- Ouvrir une issue GitHub

---

## 💰 Coûts

### Plan Gratuit (Hobby)
- ✅ Domaine .vercel.app gratuit
- ✅ SSL automatique
- ✅ 100 GB bande passante/mois
- ✅ Déploiements illimités
- ✅ Suffisant pour lancer !

### Plan Pro (20$/mois)
- ✅ Domaines personnalisés illimités
- ✅ Analytics avancés
- ✅ 1 TB bande passante
- ✅ Support prioritaire

**Pour démarrer: Plan gratuit largement suffisant !**

---

## 🎉 C'est tout !

Votre landing page MIRA Collective sera en ligne en **moins de 5 minutes** avec Vercel.

**Brillez, ensemble.** ✨

---

**Dernière mise à jour:** 2025-01-03
