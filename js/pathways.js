const paths = [

]

const hints = [
    "Try the command 'ls', use the help to find out what it does!"
]

const directoryMap = {
    "~/": {
        "..": ["~/"],
        "rootkit": {
            "..": ["~/"],
            "fSociety.sh": "",
            "README.md": ""
        },
        "users": {
            "..": ["~/"],
            "admin": {
                "..": ["~/","users"],
                "home": {
                    "..": ["~/","users","admin"],
                    "passwords.txt": ""
                }
            },
            "kali": {
                "..": ["~/"],
                "home": {
                    "..": ["~/","kali"],
                    "downloads": {
                        "..": ["~/","kali","home"],
                    },
                    "documents": {
                        "..": ["~/","kali","home"],
                    },
                    "music": {
                        "..": ["~/","kali","home"],
                    },
                    "photos": {
                        "..": ["~/","kali","home"],
                    },
                    "passwords.txt": ""
                }
            }
        }
    }
}

const commands = {
    "help, ?": "Use: \"help\"; Opens this dialogue.",
    "hint": "Use: \"hint\"; Displays a hint in the story dialogue box at the top.",
    "ls": "Use: \"ls\"; Lists files in current directory.",
    "cd": "Use: \"cd [targetDirectory]\"; Changes Directory.",
    "open": "Use \"open [file]\"; Opens a file for you."
}

const files = ["fSociety.sh", "README.md", "passwords.txt"]

const endings = [
    {
        "title": "Useless",
        "description": "You took way too long and now the system has crashed!<br>You quit before you get fired and now you live alone on a private island with 20 cats."
    },
    {
        "title": "You Got Scared",
        "description": "The pressure got to you and so you ran away, now you live in an undisclosed loaction with a tinfoil hat on at all times."
    },
    {
        "title": "Poser",
        "description": "Stealing someones code is one thing, but pretending its yours is stupid, the original group hack you and now all you own is a small rock you've named dave."
    },
    {
        "title": "Snitches Get Stitches",
        "description": "The tech company and your employer love you but the world hates you, shame isn't it?"
    },
    {
        "title": "Sherlock Wannabe",
        "description": "You tried to investigate and got scared, even a cat could find out more information than you"
    },
    {
        "title": "Vigilante",
        "description": "The rootkit wiped all credit histories and debts across the whole world and now you are renowned as a hero ammoung the common folk, although the powerful are hunting you down."
    }
]