import type { Path } from '../../types/learning'

export const cliPath: Path = {
  id: 'cli',
  name: { fr: 'CLI / Bash', en: 'CLI / Bash' },
  description: {
    fr: 'Maîtrise les bases du terminal Linux/Unix',
    en: 'Master the basics of the Linux/Unix terminal'
  },
  icon: '>_',
  color: '#22c55e',
  lessons: [
    {
      id: 'cli-navigation',
      title: {
        fr: 'Navigation dans le système',
        en: 'System Navigation'
      },
      description: {
        fr: "Apprends à te déplacer dans l'arborescence de fichiers",
        en: 'Learn to navigate the file tree'
      },
      questions: [
        {
          id: 'cli-1',
          question: {
            fr: 'Quelle commande affiche le répertoire courant (où tu te trouves) ?',
            en: 'What command displays the current directory (where you are)?'
          },
          hint: { fr: 'Print Working Directory', en: 'Print Working Directory' },
          answer: 'pwd',
          explanation: {
            fr: '`pwd` (Print Working Directory) affiche le chemin complet du répertoire actuel. Exemple: /home/user/projects',
            en: '`pwd` (Print Working Directory) displays the full path of the current directory. Example: /home/user/projects'
          }
        },
        {
          id: 'cli-2',
          question: {
            fr: 'Quelle commande permet de lister les fichiers et dossiers ?',
            en: 'What command lists files and folders?'
          },
          hint: { fr: 'List', en: 'List' },
          answer: 'ls',
          explanation: {
            fr: '`ls` liste le contenu du répertoire courant. Options utiles: `ls -l` (détails), `ls -a` (fichiers cachés), `ls -la` (les deux)',
            en: '`ls` lists the contents of the current directory. Useful options: `ls -l` (details), `ls -a` (hidden files), `ls -la` (both)'
          }
        },
        {
          id: 'cli-3',
          question: {
            fr: 'Quelle commande permet de changer de répertoire ?',
            en: 'What command changes the directory?'
          },
          hint: { fr: 'Change Directory', en: 'Change Directory' },
          answer: 'cd',
          explanation: {
            fr: '`cd` (Change Directory) permet de naviguer. `cd ..` remonte d\'un niveau, `cd ~` va au home, `cd /` va à la racine',
            en: '`cd` (Change Directory) lets you navigate. `cd ..` goes up one level, `cd ~` goes to home, `cd /` goes to root'
          }
        },
        {
          id: 'cli-4',
          question: {
            fr: "Comment remonter d'un niveau dans l'arborescence ? (cd + quoi)",
            en: 'How do you go up one level in the directory tree? (cd + what)'
          },
          answer: 'cd ..',
          explanation: {
            fr: '`..` représente le répertoire parent. `cd ..` remonte d\'un niveau. `.` représente le répertoire courant',
            en: '`..` represents the parent directory. `cd ..` goes up one level. `.` represents the current directory'
          }
        },
        {
          id: 'cli-5',
          question: {
            fr: 'Comment aller directement dans ton répertoire home ?',
            en: 'How do you go directly to your home directory?'
          },
          hint: { fr: 'cd + un caractère spécial', en: 'cd + a special character' },
          answer: 'cd ~',
          explanation: {
            fr: '`~` (tilde) est un raccourci vers ton répertoire home (/home/ton_user). `cd ~` ou simplement `cd` sans argument y mène',
            en: '`~` (tilde) is a shortcut to your home directory (/home/your_user). `cd ~` or just `cd` without arguments goes there'
          }
        }
      ]
    },
    {
      id: 'cli-files',
      title: {
        fr: 'Manipulation de fichiers',
        en: 'File Manipulation'
      },
      description: {
        fr: 'Créer, copier, déplacer et supprimer des fichiers',
        en: 'Create, copy, move and delete files'
      },
      questions: [
        {
          id: 'cli-6',
          question: {
            fr: 'Quelle commande crée un nouveau dossier ?',
            en: 'What command creates a new folder?'
          },
          hint: { fr: 'Make Directory', en: 'Make Directory' },
          answer: 'mkdir',
          explanation: {
            fr: '`mkdir nom_dossier` crée un dossier. `mkdir -p chemin/vers/dossier` crée les dossiers parents si nécessaire',
            en: '`mkdir folder_name` creates a folder. `mkdir -p path/to/folder` creates parent folders if needed'
          }
        },
        {
          id: 'cli-7',
          question: {
            fr: 'Quelle commande crée un fichier vide ou met à jour sa date de modification ?',
            en: 'What command creates an empty file or updates its modification date?'
          },
          answer: 'touch',
          explanation: {
            fr: "`touch fichier.txt` crée le fichier s'il n'existe pas, ou met à jour sa date de modification s'il existe",
            en: '`touch file.txt` creates the file if it doesn\'t exist, or updates its modification date if it exists'
          }
        },
        {
          id: 'cli-8',
          question: {
            fr: 'Quelle commande copie un fichier ?',
            en: 'What command copies a file?'
          },
          hint: { fr: 'Copy', en: 'Copy' },
          answer: 'cp',
          explanation: {
            fr: '`cp source destination` copie un fichier. `cp -r` pour copier un dossier récursivement',
            en: '`cp source destination` copies a file. `cp -r` to copy a folder recursively'
          }
        },
        {
          id: 'cli-9',
          question: {
            fr: 'Quelle commande déplace ou renomme un fichier ?',
            en: 'What command moves or renames a file?'
          },
          hint: { fr: 'Move', en: 'Move' },
          answer: 'mv',
          explanation: {
            fr: '`mv source destination` déplace ou renomme. `mv ancien.txt nouveau.txt` renomme, `mv fichier.txt /autre/dossier/` déplace',
            en: '`mv source destination` moves or renames. `mv old.txt new.txt` renames, `mv file.txt /other/folder/` moves'
          }
        },
        {
          id: 'cli-10',
          question: {
            fr: 'Quelle commande supprime un fichier ? (attention: pas de corbeille)',
            en: 'What command deletes a file? (warning: no trash)'
          },
          hint: { fr: 'Remove', en: 'Remove' },
          answer: 'rm',
          explanation: {
            fr: '`rm fichier` supprime définitivement. `rm -r dossier` supprime un dossier. `rm -rf` force sans confirmation (dangereux!)',
            en: '`rm file` permanently deletes. `rm -r folder` deletes a folder. `rm -rf` forces without confirmation (dangerous!)'
          }
        }
      ]
    },
    {
      id: 'cli-io',
      title: {
        fr: 'Entrée/Sortie standard',
        en: 'Standard Input/Output'
      },
      description: {
        fr: 'Comprendre stdin, stdout, stderr et les redirections',
        en: 'Understand stdin, stdout, stderr and redirections'
      },
      questions: [
        {
          id: 'cli-11',
          question: {
            fr: 'Quelle commande affiche du texte dans le terminal ?',
            en: 'What command displays text in the terminal?'
          },
          answer: 'echo',
          explanation: {
            fr: '`echo "Hello"` affiche Hello. Utilisé pour afficher des variables: `echo $HOME` ou créer des fichiers: `echo "texte" > fichier.txt`',
            en: '`echo "Hello"` displays Hello. Used to display variables: `echo $HOME` or create files: `echo "text" > file.txt`'
          }
        },
        {
          id: 'cli-12',
          question: {
            fr: "Quelle commande affiche le contenu d'un fichier ?",
            en: 'What command displays the contents of a file?'
          },
          hint: { fr: 'Concatenate', en: 'Concatenate' },
          answer: 'cat',
          explanation: {
            fr: '`cat fichier.txt` affiche le contenu. Peut aussi concaténer: `cat f1.txt f2.txt > combined.txt`',
            en: '`cat file.txt` displays the contents. Can also concatenate: `cat f1.txt f2.txt > combined.txt`'
          }
        },
        {
          id: 'cli-13',
          question: {
            fr: 'Quel symbole redirige la sortie vers un fichier (écrase le contenu) ?',
            en: 'What symbol redirects output to a file (overwrites content)?'
          },
          answer: '>',
          explanation: {
            fr: '`commande > fichier.txt` écrit la sortie dans le fichier (écrase). Exemple: `ls > liste.txt`',
            en: '`command > file.txt` writes output to the file (overwrites). Example: `ls > list.txt`'
          }
        },
        {
          id: 'cli-14',
          question: {
            fr: "Quel symbole ajoute la sortie à la fin d'un fichier (sans écraser) ?",
            en: 'What symbol appends output to the end of a file (without overwriting)?'
          },
          answer: '>>',
          explanation: {
            fr: '`commande >> fichier.txt` ajoute à la fin du fichier. Exemple: `echo "nouvelle ligne" >> log.txt`',
            en: '`command >> file.txt` appends to the end of the file. Example: `echo "new line" >> log.txt`'
          }
        },
        {
          id: 'cli-15',
          question: {
            fr: 'Quel symbole permet de chaîner des commandes (pipe) ?',
            en: 'What symbol chains commands together (pipe)?'
          },
          answer: '|',
          explanation: {
            fr: '`cmd1 | cmd2` envoie la sortie de cmd1 vers l\'entrée de cmd2. Exemple: `ls | grep ".txt"` filtre les fichiers .txt',
            en: '`cmd1 | cmd2` sends output of cmd1 to input of cmd2. Example: `ls | grep ".txt"` filters .txt files'
          }
        }
      ]
    }
  ],
  tp: {
    id: 'cli-tp',
    title: {
      fr: 'TP: Organiser un projet',
      en: 'Lab: Organize a project'
    },
    description: {
      fr: 'Utilise les commandes apprises pour créer et organiser une structure de projet.',
      en: 'Use the commands you learned to create and organize a project structure.'
    },
    tasks: [
      {
        id: 'tp-1',
        instruction: {
          fr: 'Affiche le répertoire courant avec `pwd`',
          en: 'Display the current directory with `pwd`'
        },
        expectedCommands: ['pwd']
      },
      {
        id: 'tp-2',
        instruction: {
          fr: 'Crée un dossier `projet` avec `mkdir`',
          en: 'Create a folder `projet` with `mkdir`'
        },
        expectedCommands: ['mkdir projet']
      },
      {
        id: 'tp-3',
        instruction: {
          fr: 'Entre dans le dossier `projet` avec `cd`',
          en: 'Enter the `projet` folder with `cd`'
        },
        expectedCommands: ['cd projet']
      },
      {
        id: 'tp-4',
        instruction: {
          fr: 'Crée un fichier `readme.txt` avec `touch`',
          en: 'Create a file `readme.txt` with `touch`'
        },
        expectedCommands: ['touch readme.txt']
      },
      {
        id: 'tp-5',
        instruction: {
          fr: 'Liste les fichiers pour vérifier avec `ls`',
          en: 'List the files to verify with `ls`'
        },
        expectedCommands: ['ls']
      }
    ]
  }
}
