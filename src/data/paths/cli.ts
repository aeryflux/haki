import type { Path } from '../../types/learning'

export const cliPath: Path = {
  id: 'cli',
  name: 'CLI / Bash',
  description: 'Maîtrise les bases du terminal Linux/Unix',
  icon: '>_',
  color: '#22c55e',
  lessons: [
    {
      id: 'cli-navigation',
      title: 'Navigation dans le système',
      description: 'Apprends à te déplacer dans l\'arborescence de fichiers',
      questions: [
        {
          id: 'cli-1',
          question: 'Quelle commande affiche le répertoire courant (où tu te trouves) ?',
          hint: 'Print Working Directory',
          answer: 'pwd',
          explanation: '`pwd` (Print Working Directory) affiche le chemin complet du répertoire actuel. Exemple: /home/user/projects'
        },
        {
          id: 'cli-2',
          question: 'Quelle commande permet de lister les fichiers et dossiers ?',
          hint: 'List',
          answer: 'ls',
          explanation: '`ls` liste le contenu du répertoire courant. Options utiles: `ls -l` (détails), `ls -a` (fichiers cachés), `ls -la` (les deux)'
        },
        {
          id: 'cli-3',
          question: 'Quelle commande permet de changer de répertoire ?',
          hint: 'Change Directory',
          answer: 'cd',
          explanation: '`cd` (Change Directory) permet de naviguer. `cd ..` remonte d\'un niveau, `cd ~` va au home, `cd /` va à la racine'
        },
        {
          id: 'cli-4',
          question: 'Comment remonter d\'un niveau dans l\'arborescence ? (cd + quoi)',
          answer: 'cd ..',
          explanation: '`..` représente le répertoire parent. `cd ..` remonte d\'un niveau. `.` représente le répertoire courant'
        },
        {
          id: 'cli-5',
          question: 'Comment aller directement dans ton répertoire home ?',
          hint: 'cd + un caractère spécial',
          answer: 'cd ~',
          explanation: '`~` (tilde) est un raccourci vers ton répertoire home (/home/ton_user). `cd ~` ou simplement `cd` sans argument y mène'
        }
      ]
    },
    {
      id: 'cli-files',
      title: 'Manipulation de fichiers',
      description: 'Créer, copier, déplacer et supprimer des fichiers',
      questions: [
        {
          id: 'cli-6',
          question: 'Quelle commande crée un nouveau dossier ?',
          hint: 'Make Directory',
          answer: 'mkdir',
          explanation: '`mkdir nom_dossier` crée un dossier. `mkdir -p chemin/vers/dossier` crée les dossiers parents si nécessaire'
        },
        {
          id: 'cli-7',
          question: 'Quelle commande crée un fichier vide ou met à jour sa date de modification ?',
          answer: 'touch',
          explanation: '`touch fichier.txt` crée le fichier s\'il n\'existe pas, ou met à jour sa date de modification s\'il existe'
        },
        {
          id: 'cli-8',
          question: 'Quelle commande copie un fichier ?',
          hint: 'Copy',
          answer: 'cp',
          explanation: '`cp source destination` copie un fichier. `cp -r` pour copier un dossier récursivement'
        },
        {
          id: 'cli-9',
          question: 'Quelle commande déplace ou renomme un fichier ?',
          hint: 'Move',
          answer: 'mv',
          explanation: '`mv source destination` déplace ou renomme. `mv ancien.txt nouveau.txt` renomme, `mv fichier.txt /autre/dossier/` déplace'
        },
        {
          id: 'cli-10',
          question: 'Quelle commande supprime un fichier ? (attention: pas de corbeille)',
          hint: 'Remove',
          answer: 'rm',
          explanation: '`rm fichier` supprime définitivement. `rm -r dossier` supprime un dossier. `rm -rf` force sans confirmation (dangereux!)'
        }
      ]
    },
    {
      id: 'cli-io',
      title: 'Entrée/Sortie standard',
      description: 'Comprendre stdin, stdout, stderr et les redirections',
      questions: [
        {
          id: 'cli-11',
          question: 'Quelle commande affiche du texte dans le terminal ?',
          answer: 'echo',
          explanation: '`echo "Hello"` affiche Hello. Utilisé pour afficher des variables: `echo $HOME` ou créer des fichiers: `echo "texte" > fichier.txt`'
        },
        {
          id: 'cli-12',
          question: 'Quelle commande affiche le contenu d\'un fichier ?',
          hint: 'Concatenate',
          answer: 'cat',
          explanation: '`cat fichier.txt` affiche le contenu. Peut aussi concaténer: `cat f1.txt f2.txt > combined.txt`'
        },
        {
          id: 'cli-13',
          question: 'Quel symbole redirige la sortie vers un fichier (écrase le contenu) ?',
          answer: '>',
          explanation: '`commande > fichier.txt` écrit la sortie dans le fichier (écrase). Exemple: `ls > liste.txt`'
        },
        {
          id: 'cli-14',
          question: 'Quel symbole ajoute la sortie à la fin d\'un fichier (sans écraser) ?',
          answer: '>>',
          explanation: '`commande >> fichier.txt` ajoute à la fin du fichier. Exemple: `echo "nouvelle ligne" >> log.txt`'
        },
        {
          id: 'cli-15',
          question: 'Quel symbole permet de chaîner des commandes (pipe) ?',
          answer: '|',
          explanation: '`cmd1 | cmd2` envoie la sortie de cmd1 vers l\'entrée de cmd2. Exemple: `ls | grep ".txt"` filtre les fichiers .txt'
        }
      ]
    }
  ]
}
