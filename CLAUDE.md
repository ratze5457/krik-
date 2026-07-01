@AGENTS.md

## Préférences de collaboration — projet Krik

L'utilisateur (propriétaire du projet) se décrit comme **« vibe codeur »** : explique
toujours **simplement et étape par étape**, sans jargon inutile.

### Tenir l'utilisateur informé des changements
- Au **début de chaque session** (et quand c'est pertinent), si tu remarques une
  **mise à jour ou un changement** — de l'environnement, des outils, de la façon de
  pousser le code, de lancer l'app, ou de Claude Code — **explique-le en clair** :
  *ce que c'est*, et *ce qui change par rapport à avant*.
- Reste honnête : signale ce que tu **observes réellement** dans la session. Tu n'as
  pas forcément la liste officielle des mises à jour produit ; ne l'invente pas.

### Routine de mise à jour (rappel à mettre en tête de CHAQUE livraison de fichier)
L'environnement d'exécution **ne peut pas pousser** sur le dépôt GitHub de l'utilisateur.
Chaque évolution est donc livrée sous forme d'archive `.tar.gz` que l'utilisateur
installe lui-même. Rappelle systématiquement, avant les commandes :

> 📥 **Télécharge d'abord le fichier `.tar.gz`**, puis colle le bloc de commandes,
> puis **Cmd + Shift + R** dans le navigateur pour voir le changement.

Le détail complet de la routine est dans **COMMENT-METTRE-A-JOUR.md**.
