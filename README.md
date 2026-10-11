# guillaumedamiens.com

Site personnel : projets, photos et vidéos. React 19, TypeScript, Vite, React Router ; aucune autre dépendance à l'exécution, et aucun appel au backend (la partie transports vit dans l'app, sur `app.guillaumedamiens.com`).

## Développer

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint      # ESLint
npm run format    # Prettier
npm run build     # vérification des types puis build dans dist/
npm run preview   # sert dist/
```

Node 22 ou plus.

## Contenu

Tout le texte, les liens, les photos et les vidéos sont dans `src/content.ts`.

- **Photos** : deux versions WebP par photo dans `src/photos/` (`-800` pour la grille, `-2048` en plein écran), sans métadonnées. Pour en ajouter une, produire ces deux tailles (côté long 800 et 2048 px), puis l'ajouter à `photos` avec ses dimensions, une légende et une description (`alt`) de ce qu'on y voit.
- **Vidéos** : YouTube ou Vimeo, par identifiant. Rien n'est chargé depuis ces sites avant que le visiteur lance la vidéo (YouTube sans cookies, Vimeo en `dnt`).

## Déployer

Poser un tag sur un commit de `master` :

```bash
git tag v1.2.0 && git push origin v1.2.0
```

`.github/workflows/deploy.yml` builde le site, publie l'archive dans la release GitHub du tag, puis le VPS la télécharge (utilisateur `deploy`, empreinte SHA-256 vérifiée), la décompresse dans `/var/www/guillaumedamiens-site/releases/<version>/` et bascule le lien `current` servi par nginx. Les 5 dernières versions restent : pour revenir en arrière, repointer `current` sur une version précédente. Secrets GitHub du dépôt (les mêmes que `website-back` et `website-app`) : `DEPLOY_HOST`, `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`, dans un environnement `production`.

Chaque page a sa copie d'`index.html` (`photos/index.html`, `videos/index.html`, produites par `vite.config.ts`) : nginx sert les fichiers tels quels (`try_files $uri $uri/index.html $uri/ =404`, sans redirection vers `/photos/`), sans renvoyer les adresses inconnues vers l'index. Une nouvelle page du routeur s'ajoute aussi à la liste `pages` de `vite.config.ts`.

## CI

À chaque pull request et push sur `master` : lint, types et build (`.github/workflows/build.yml`). Le check « Build » doit passer pour fusionner dans `master`.
