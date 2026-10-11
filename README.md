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

Le build est statique : copier `dist/` dans le dossier servi par nginx (`/var/www/gda/build` sur le VPS). Chaque page a sa copie d'`index.html` (`photos/index.html`, `videos/index.html`, produites par `vite.config.ts`) : le serveur n'a pas besoin de renvoyer les adresses inconnues vers l'index. Une nouvelle page du routeur s'ajoute aussi à la liste `pages` de `vite.config.ts`.

## CI

À chaque pull request et push sur `master` : lint, types et build (`.github/workflows/build.yml`). Le check « Build » doit passer pour fusionner dans `master`.
