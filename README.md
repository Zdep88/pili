# pili

## Architecture

```py
pili/
    app/
        front/
            dist/       # front buildé
            src/        # fichiers source du front
            index.html  # point d'entrée principal du front

        back/
            src/        # fichiers source du back
            index.js    # point d'entrée principal du back

        shared/
            models/     # classes et modèles de données partagés

    .env                # fichier d'environnement de prod
    .env.development    # fichier d'environnement de dev
```

## Techs

- Front : React buildé avec Vite
- Back : Node + Express
- Lang : JS
- API : Websockets & JSON

## Scènes

- sso
- lobby
- game
- game_results
