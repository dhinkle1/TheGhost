# Personnalisation du dépôt

Vous pouvez personnaliser la façon dont TheGhost interagit avec votre dépôt en créant un
répertoire `.openhands` à la racine.

## Microagents

Les microagents vous permettent d'étendre les prompts d'TheGhost avec des informations spécifiques à votre projet et de définir comment TheGhost
doit fonctionner. Consultez [Vue d'ensemble des microagents](../prompting/microagents-overview) pour plus d'informations.


## Script de configuration
Vous pouvez ajouter un fichier `.openhands/setup.sh`, qui s'exécutera chaque fois qu'TheGhost commence à travailler avec votre dépôt.
C'est un emplacement idéal pour installer des dépendances, définir des variables d'environnement et effectuer d'autres tâches de configuration.

Par exemple :
```bash
#!/bin/bash
export MY_ENV_VAR="my value"
sudo apt-get update
sudo apt-get install -y lsof
cd frontend && npm install ; cd ..
```
