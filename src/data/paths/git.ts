import type { Path } from '../../types/learning'

export const gitPath: Path = {
  id: 'git',
  name: { fr: 'Git Basics', en: 'Git Basics' },
  description: {
    fr: 'Maîtrise les commandes Git essentielles',
    en: 'Master essential Git commands'
  },
  icon: '⎇',
  color: '#f97316',
  requiredPaths: ['cli'],
  lessons: [
    {
      id: 'git-init',
      title: {
        fr: 'Initialisation et configuration',
        en: 'Initialization and Configuration'
      },
      description: {
        fr: 'Créer et configurer un dépôt Git',
        en: 'Create and configure a Git repository'
      },
      questions: [
        {
          id: 'git-1',
          question: {
            fr: 'Quelle commande initialise un nouveau dépôt Git dans le dossier courant ?',
            en: 'What command initializes a new Git repository in the current folder?'
          },
          answer: 'git init',
          explanation: {
            fr: "`git init` crée un dossier .git qui contient tout l'historique. À faire une seule fois par projet",
            en: '`git init` creates a .git folder that contains all history. Do this once per project'
          }
        },
        {
          id: 'git-2',
          question: {
            fr: 'Quelle commande clone un dépôt distant ?',
            en: 'What command clones a remote repository?'
          },
          answer: 'git clone',
          explanation: {
            fr: '`git clone URL` télécharge le dépôt complet avec son historique. Exemple: `git clone https://github.com/user/repo.git`',
            en: '`git clone URL` downloads the complete repository with its history. Example: `git clone https://github.com/user/repo.git`'
          }
        },
        {
          id: 'git-3',
          question: {
            fr: "Quelle commande affiche l'état actuel du dépôt (fichiers modifiés, staged, etc.) ?",
            en: 'What command displays the current state of the repository (modified files, staged, etc.)?'
          },
          answer: 'git status',
          explanation: {
            fr: '`git status` montre les fichiers modifiés, staged, et non suivis. Commande à utiliser très souvent!',
            en: '`git status` shows modified, staged, and untracked files. Use this command very often!'
          }
        }
      ]
    },
    {
      id: 'git-basics',
      title: {
        fr: 'Workflow de base',
        en: 'Basic Workflow'
      },
      description: {
        fr: 'Add, commit, push - le cycle quotidien',
        en: 'Add, commit, push - the daily cycle'
      },
      questions: [
        {
          id: 'git-4',
          question: {
            fr: 'Quelle commande ajoute des fichiers à la zone de staging ?',
            en: 'What command adds files to the staging area?'
          },
          answer: 'git add',
          explanation: {
            fr: '`git add fichier.txt` stage un fichier. `git add .` stage tout. `git add -A` stage tout y compris les suppressions',
            en: '`git add file.txt` stages a file. `git add .` stages everything. `git add -A` stages everything including deletions'
          }
        },
        {
          id: 'git-5',
          question: {
            fr: 'Quelle commande crée un commit avec un message ?',
            en: 'What command creates a commit with a message?'
          },
          hint: {
            fr: "git commit avec l'option message",
            en: 'git commit with the message option'
          },
          answer: 'git commit -m',
          explanation: {
            fr: '`git commit -m "message"` crée un commit. Le message doit être clair et descriptif. Convention: commencer par un verbe',
            en: '`git commit -m "message"` creates a commit. The message should be clear and descriptive. Convention: start with a verb'
          }
        },
        {
          id: 'git-6',
          question: {
            fr: 'Quelle commande envoie les commits vers le dépôt distant ?',
            en: 'What command sends commits to the remote repository?'
          },
          answer: 'git push',
          explanation: {
            fr: '`git push` envoie les commits locaux vers origin. `git push -u origin main` pour la première fois sur une nouvelle branche',
            en: '`git push` sends local commits to origin. `git push -u origin main` for the first time on a new branch'
          }
        },
        {
          id: 'git-7',
          question: {
            fr: 'Quelle commande récupère les modifications du dépôt distant ?',
            en: 'What command retrieves changes from the remote repository?'
          },
          answer: 'git pull',
          explanation: {
            fr: '`git pull` = `git fetch` + `git merge`. Récupère et fusionne les modifications distantes dans ta branche locale',
            en: '`git pull` = `git fetch` + `git merge`. Retrieves and merges remote changes into your local branch'
          }
        }
      ]
    },
    {
      id: 'git-history',
      title: {
        fr: 'Historique et navigation',
        en: 'History and Navigation'
      },
      description: {
        fr: "Explorer l'historique des commits",
        en: 'Explore commit history'
      },
      questions: [
        {
          id: 'git-8',
          question: {
            fr: "Quelle commande affiche l'historique des commits ?",
            en: 'What command displays commit history?'
          },
          answer: 'git log',
          explanation: {
            fr: "`git log` affiche l'historique complet. Options utiles: `--oneline` (compact), `-n 5` (5 derniers), `--graph` (graphique)",
            en: '`git log` displays full history. Useful options: `--oneline` (compact), `-n 5` (last 5), `--graph` (graphical)'
          }
        },
        {
          id: 'git-9',
          question: {
            fr: 'Comment afficher les 7 derniers commits en format compact ? (une ligne par commit)',
            en: 'How do you display the last 7 commits in compact format? (one line per commit)'
          },
          answer: 'git log --oneline -n 7',
          explanation: {
            fr: '`--oneline` affiche hash court + message. `-n 7` limite à 7 commits. Très utile pour un aperçu rapide',
            en: '`--oneline` displays short hash + message. `-n 7` limits to 7 commits. Very useful for a quick overview'
          }
        },
        {
          id: 'git-10',
          question: {
            fr: 'Quelle commande affiche les différences entre les fichiers modifiés et le dernier commit ?',
            en: 'What command displays differences between modified files and the last commit?'
          },
          answer: 'git diff',
          explanation: {
            fr: '`git diff` montre les modifications non stagées. `git diff --staged` montre ce qui sera commité',
            en: '`git diff` shows unstaged changes. `git diff --staged` shows what will be committed'
          }
        }
      ]
    },
    {
      id: 'git-branches',
      title: {
        fr: 'Branches',
        en: 'Branches'
      },
      description: {
        fr: 'Créer et naviguer entre les branches',
        en: 'Create and navigate between branches'
      },
      questions: [
        {
          id: 'git-11',
          question: {
            fr: 'Quelle commande liste toutes les branches locales ?',
            en: 'What command lists all local branches?'
          },
          answer: 'git branch',
          explanation: {
            fr: '`git branch` liste les branches. `git branch -a` inclut les branches distantes. `*` indique la branche actuelle',
            en: '`git branch` lists branches. `git branch -a` includes remote branches. `*` indicates the current branch'
          }
        },
        {
          id: 'git-12',
          question: {
            fr: 'Quelle commande permet de changer de branche ?',
            en: 'What command switches branches?'
          },
          answer: 'git checkout',
          explanation: {
            fr: '`git checkout nom-branche` change de branche. Alternative moderne: `git switch nom-branche`',
            en: '`git checkout branch-name` switches branches. Modern alternative: `git switch branch-name`'
          }
        },
        {
          id: 'git-13',
          question: {
            fr: 'Comment créer une nouvelle branche ET basculer dessus en une commande ?',
            en: 'How do you create a new branch AND switch to it in one command?'
          },
          hint: {
            fr: 'git checkout avec une option',
            en: 'git checkout with an option'
          },
          answer: 'git checkout -b',
          explanation: {
            fr: '`git checkout -b nouvelle-branche` crée et bascule. Équivalent à `git branch x` + `git checkout x`',
            en: '`git checkout -b new-branch` creates and switches. Equivalent to `git branch x` + `git checkout x`'
          }
        },
        {
          id: 'git-14',
          question: {
            fr: 'Quelle commande supprime une branche locale ? (option force)',
            en: 'What command deletes a local branch? (force option)'
          },
          answer: 'git branch -D',
          explanation: {
            fr: "`git branch -D nom` supprime forcément. `-d` (minuscule) refuse si non mergée. `-D` supprime quoi qu'il arrive",
            en: '`git branch -D name` force deletes. `-d` (lowercase) refuses if not merged. `-D` deletes regardless'
          }
        },
        {
          id: 'git-15',
          question: {
            fr: 'Quelle commande récupère toutes les branches distantes sans les merger ?',
            en: 'What command fetches all remote branches without merging?'
          },
          answer: 'git fetch --all',
          explanation: {
            fr: '`git fetch --all` synchronise les références distantes. Utile avant de checkout une branche distante',
            en: '`git fetch --all` synchronizes remote references. Useful before checking out a remote branch'
          }
        }
      ]
    }
  ]
}
