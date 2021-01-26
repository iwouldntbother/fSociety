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
    "ls": "Use: \"ls\"; Lists files in current directory.",
    "cd": "Use: \"cd [targetDirectory]\"; Changes Directory."
}