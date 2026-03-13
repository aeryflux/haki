import type { Path } from '../../types/learning'

export const gitPath: Path = {
  id: 'git',
  name: 'Git Basics',
  description: 'Maîtrise les commandes Git essentielles',
  icon: '⎇',
  color: '#f97316',
  requiredPaths: ['cli'],
  lessons: [
    {
      id: 'git-init',
      title: 'Initialisation et configuration',
      description: 'Créer et configurer un dépôt Git',
      questions: [
        {
          id: 'git-1',
          question: 'Quelle commande initialise un nouveau dépôt Git dans le dossier courant ?',
          answer: 'git init',
          explanation: '`git init` crée un dossier .git qui contient tout l\'historique. À faire une seule fois par projet'
        },
        {
          id: 'git-2',
          question: 'Quelle commande clone un dépôt distant ?',
          answer: 'git clone',
          explanation: '`git clone URL` télécharge le dépôt complet avec son historique. Exemple: `git clone https://github.com/user/repo.git`'
        },
        {
          id: 'git-3',
          question: 'Quelle commande affiche l\'état actuel du dépôt (fichiers modifiés, staged, etc.) ?',
          answer: 'git status',
          explanation: '`git status` montre les fichiers modifiés, staged, et non suivis. Commande à utiliser très souvent!'
        }
      ]
    },
    {
      id: 'git-basics',
      title: 'Workflow de base',
      description: 'Add, commit, push - le cycle quotidien',
      questions: [
        {
          id: 'git-4',
          question: 'Quelle commande ajoute des fichiers à la zone de staging ?',
          answer: 'git add',
          explanation: '`git add fichier.txt` stage un fichier. `git add .` stage tout. `git add -A` stage tout y compris les suppressions'
        },
        {
          id: 'git-5',
          question: 'Quelle commande crée un commit avec un message ?',
          hint: 'git commit avec l\'option message',
          answer: 'git commit -m',
          explanation: '`git commit -m "message"` crée un commit. Le message doit être clair et descriptif. Convention: commencer par un verbe'
        },
        {
          id: 'git-6',
          question: 'Quelle commande envoie les commits vers le dépôt distant ?',
          answer: 'git push',
          explanation: '`git push` envoie les commits locaux vers origin. `git push -u origin main` pour la première fois sur une nouvelle branche'
        },
        {
          id: 'git-7',
          question: 'Quelle commande récupère les modifications du dépôt distant ?',
          answer: 'git pull',
          explanation: '`git pull` = `git fetch` + `git merge`. Récupère et fusionne les modifications distantes dans ta branche locale'
        }
      ]
    },
    {
      id: 'git-history',
      title: 'Historique et navigation',
      description: 'Explorer l\'historique des commits',
      questions: [
        {
          id: 'git-8',
          question: 'Quelle commande affiche l\'historique des commits ?',
          answer: 'git log',
          explanation: '`git log` affiche l\'historique complet. Options utiles: `--oneline` (compact), `-n 5` (5 derniers), `--graph` (graphique)'
        },
        {
          id: 'git-9',
          question: 'Comment afficher les 7 derniers commits en format compact ? (une ligne par commit)',
          answer: 'git log --oneline -n 7',
          explanation: '`--oneline` affiche hash court + message. `-n 7` limite à 7 commits. Très utile pour un aperçu rapide'
        },
        {
          id: 'git-10',
          question: 'Quelle commande affiche les différences entre les fichiers modifiés et le dernier commit ?',
          answer: 'git diff',
          explanation: '`git diff` montre les modifications non stagées. `git diff --staged` montre ce qui sera commité'
        }
      ]
    },
    {
      id: 'git-branches',
      title: 'Branches',
      description: 'Créer et naviguer entre les branches',
      questions: [
        {
          id: 'git-11',
          question: 'Quelle commande liste toutes les branches locales ?',
          answer: 'git branch',
          explanation: '`git branch` liste les branches. `git branch -a` inclut les branches distantes. `*` indique la branche actuelle'
        },
        {
          id: 'git-12',
          question: 'Quelle commande permet de changer de branche ?',
          answer: 'git checkout',
          explanation: '`git checkout nom-branche` change de branche. Alternative moderne: `git switch nom-branche`'
        },
        {
          id: 'git-13',
          question: 'Comment créer une nouvelle branche ET basculer dessus en une commande ?',
          hint: 'git checkout avec une option',
          answer: 'git checkout -b',
          explanation: '`git checkout -b nouvelle-branche` crée et bascule. Équivalent à `git branch x` + `git checkout x`'
        },
        {
          id: 'git-14',
          question: 'Quelle commande supprime une branche locale ? (option force)',
          answer: 'git branch -D',
          explanation: '`git branch -D nom` supprime forcément. `-d` (minuscule) refuse si non mergée. `-D` supprime quoi qu\'il arrive'
        },
        {
          id: 'git-15',
          question: 'Quelle commande récupère toutes les branches distantes sans les merger ?',
          answer: 'git fetch --all',
          explanation: '`git fetch --all` synchronise les références distantes. Utile avant de checkout une branche distante'
        }
      ]
    }
  ]
}
