# 🔄 Comment mettre à jour Krik — carte mémo

> **Pourquoi cette routine ?** L'assistant prépare le code de son côté mais **ne peut pas
> pousser directement** sur ton dépôt GitHub. À chaque évolution, il t'envoie un fichier
> `.tar.gz` que tu installes toi-même. Si un jour le push direct devient possible,
> l'assistant te préviendra et cette routine changera.

## Le réflexe en 3 temps
**📥 Télécharger → 💻 Coller le bloc → 🌐 Cmd + Shift + R**

---

## Étape 0 — Télécharger (le plus important)
Clique sur le fichier `.tar.gz` envoyé dans le chat. Il arrive dans **Téléchargements**.
*(Sans ça, rien ne se met à jour.)*

## Étape 1 — Installer + pousser sur GitHub
Copie-colle ce bloc **d'un seul coup** (il trouve tout seul le dernier fichier téléchargé) :

```bash
cd ~/Downloads
ARCHIVE=$(ls -t *krik*.tar.gz | head -1)
echo ">>> Fichier utilisé : $ARCHIVE"
rm -rf krik-full && mkdir krik-full
tar -xzf "$ARCHIVE" -C krik-full
cd krik-full
git init && git add . && git commit -m "Mise a jour Krik"
git branch -M main
git remote add origin https://github.com/ratze5457/krik-.git
git push -u origin main --force
```
👉 Vérifie que `>>> Fichier utilisé :` affiche bien **le fichier que tu viens de télécharger**.

## Étape 2 — Lancer l'appli
```bash
npm install
npx expo start --web
```

## Étape 3 — Voir dans le navigateur
- **http://localhost:8081/** → espace client
- **http://localhost:8081/pro** → espace dépanneur
- **http://localhost:8081/admin** → espace admin (toi)
- Tu ne vois pas le changement ? **Cmd + Shift + R** (rechargement forcé, vide le cache).
- Pour tout arrêter : **Ctrl + C** dans le Terminal.
