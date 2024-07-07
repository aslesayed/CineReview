// Load environment variables from .env file
require("dotenv").config();


const database = require("./database/client");

const env = process.env.APP_ENV;

const imageBaseUrl =
  env === "production"
    ? `https://neomuse.creativebrain.fr/upload`
    : `http://localhost:3310/upload`;


const contents = [
    {
        type: "Movie",
        name: "Shining",
        description: "Shining by Stanley Kubrick is a horror film based on Stephen King's novel. It follows Jack Torrance, the caretaker of a remote hotel, who descends into madness under supernatural influences, endangering his family. Terrifying atmosphere and memorable performances.",
        release_date: "16/10/1980",
        rating: "8.1",
        thumbnail: `${imageBaseUrl}/shining.jpg`,
        genre: "Horror",
    },
    {
        type: "Movie",
        name: "Five Nights at Freddy's",
        description: "Five Nights at Freddy's is a horror film based on the popular video game series. It follows a security guard working the night shift at Freddy Fazbear's Pizza, where animatronic characters come to life and pose a deadly threat. Tense atmosphere and jump scares abound.",
        release_date: "27/10/2023",
        rating: "5.9",
        thumbnail: `${imageBaseUrl}/fivenightsatfreddys.jpg`,
        genre: "Horror",
    },
    {
        type: "Serie",
        name: "American Horror Story",
        description: "American Horror Story is a horror anthology TV series where each season tells a different chilling story, ranging from haunted houses to asylums, witches, and cults. Known for its dark themes, unsettling atmosphere, and recurring cast playing new roles each season.",
        release_date: "05/10/2011",
        rating: "7.0",
        thumbnail: `${imageBaseUrl}/americanhorrorstory.jpg`,
        genre: "Horror",
    },
    {
        type: "Serie",
        name: "The Last of Us",
        description: "The Last of Us is a TV series based on the video game. It follows Joel and Ellie, survivors in a post-apocalyptic world ravaged by a fungal infection. Their journey across the U.S. is filled with danger, emotional depth, and a powerful bond that develops between them.",
        release_date: "15/01/2023",
        rating: "8.2",
        thumbnail: `${imageBaseUrl}/thelastofus.jpg`,
        genre: "Horror",
    },
    {
        type: "Movie",
        name: "The Dark Knight",
        description: "The Dark Knight, directed by Christopher Nolan, is a superhero film featuring Batman as he battles the Joker, a criminal mastermind wreaking havoc on Gotham City. Known for its intense action, complex characters, and Heath Ledger's iconic performance as the Joker",
        release_date: "13/08/2008",
        rating: "8.0",
        thumbnail: `${imageBaseUrl}/thedarkknight.jpg`,
        genre: "Action",
    },
    {
        type: "Movie",
        name: "Kill Bill",
        description: "Kill Bill directed by Quentin Tarantino, is a two-part action film. It follows The Bride, a former assassin seeking revenge on her ex-colleagues who betrayed her. Known for its stylized violence, martial arts choreography, and homage to various film genres.",
        release_date: "26/11/2003",
        rating: "8.2",
        thumbnail: `${imageBaseUrl}/killbill.jpg`,
        genre: "Action",
    },
    {
        type: "Serie",
        name: "The Witcher",
        description: "The Witcher is a fantasy TV series based on the book series by Andrzej Sapkowski. It follows Geralt of Rivia, a monster hunter with supernatural abilities, as he navigates a world filled with magic, political intrigue, and dark forces. Known for its complex characters and epic storytelling.",
        release_date: "20/12/2019",
        rating: "7.6",
        thumbnail: `${imageBaseUrl}/thewitcher.jpg`,
        genre: "Action",
    },
    {
        type: "Serie",
        name: "Daredevil",
        description: "Daredevil is a TV series based on the Marvel Comics character. It follows Matt Murdock, a blind lawyer with heightened senses, who fights crime as the vigilante Daredevil in Hell's Kitchen, New York. Known for its gritty realism, intense action scenes, and deep character development.",
        release_date: "15/04/2015",
        rating: "6.3",
        thumbnail: `${imageBaseUrl}/daredevil.jpg`,
        genre: "Action",
    },
    {
        type: "Movie",
        name: "The Hangover",
        description: "The Hangover is a comedy film about four friends who travel to Las Vegas for a bachelor party. After a wild night, they wake up with no memory of the previous evening and must piece together what happened to find their missing friend. Hilarious and chaotic misadventures ensue.",
        release_date: "24/06/2009",
        rating: "6.9",
        thumbnail: `${imageBaseUrl}/thehangover.jpg`,
        genre: "Comedy",
    },
    {
        type: "Movie",
        name: "The Truman Show",
        description: "The Truman Show is a satirical drama where Truman Burbank, unknowingly, lives his entire life on a massive TV set, broadcasted 24/7. As he starts discovering the truth, Truman seeks to escape the fabricated world and find genuine reality.",
        release_date: "28/10/1998",
        rating: "7.9",
        thumbnail: `${imageBaseUrl}/thetrumanshow.jpg`,
        genre: "Comedy",
    },
    {
        type: "Serie",
        name: "Friends",
        description: "Friends is a popular sitcom following six friends—Rachel, Ross, Monica, Chandler, Joey, and Phoebe—as they navigate life, love, and work in New York City. Their humorous and heartfelt adventures highlight the importance of friendship and support.",
        release_date: "22/09/1994",
        rating: "8.6",
        thumbnail: `${imageBaseUrl}/friends.jpg`,
        genre: "Comedy",
    },
    {
        type: "Serie",
        name: "The Office",
        description: "The Office is a mockumentary-style sitcom that chronicles the daily lives of employees at Dunder Mifflin, a mundane paper company. Led by bumbling boss Michael Scott, the quirky team navigates office politics, relationships, and absurd workplace antics.",
        release_date: "24/03/2005",
        rating: "8.0",
        thumbnail: `${imageBaseUrl}/theoffice.jpg`,
        genre: "Comedy",
    },
    {
        type: "Movie",
        name: "Oppenheimer",
        description: "Oppenheimer is a biographical drama that explores the life of J. Robert Oppenheimer, the physicist who led the Manhattan Project. The film delves into his scientific achievements, ethical dilemmas, and the profound impact of creating the atomic bomb on his life and the world.",
        release_date: "19/07/2023",
        rating: "8.5",
        thumbnail: `${imageBaseUrl}/oppenheimer.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Parasite",
        description: "Parasite is a dark comedy thriller that follows the impoverished Kim family as they scheme to become employed by the wealthy Park family. Through deception and cunning, they infiltrate the household, leading to unexpected and tragic consequences as social tensions escalate.",
        release_date: "05/05/2019",
        rating: "8.5",
        thumbnail: `${imageBaseUrl}/parasite.jpg`,
        genre: "Drama",
    },
    {
        type: "Serie",
        name: "House of the Dragons",
        description: "Friends is a popular sitcom following six friends—Rachel, Ross, Monica, Chandler, Joey, and Phoebe—as they navigate life, love, and work in New York City. Their humorous and heartfelt adventures highlight the importance of friendship and support.",
        release_date: "21/08/2022",
        rating: "7.7",
        thumbnail: `${imageBaseUrl}/houseofthedragons.jpg`,
        genre: "Drama",
    },
    {
        type: "Serie",
        name: "You",
        description: "You is a psychological thriller series following Joe Goldberg, a charming yet obsessive man who becomes infatuated with women he meets. Using technology and manipulation, Joe goes to extreme lengths to insert himself into their lives, blurring the lines between love and obsession.",
        release_date: "09/09/2018",
        rating: "6.3",
        thumbnail: `${imageBaseUrl}/you.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Fight Club",
        description: "Fight Club is a psychological thriller where an insomniac office worker and a charismatic soap salesman create an underground fight club as a form of male bonding. As the club evolves, it spirals into a dark and chaotic exploration of identity and rebellion.",
        release_date: "10/11/1999",
        rating: "8.1",
        thumbnail: `${imageBaseUrl}/fightclub.jpg`,
        genre: "Thriller",
    },
    {
        type: "Movie",
        name: "Shutter Island",
        description: "Shutter Island is a psychological thriller following U.S. Marshal Teddy Daniels as he investigates the disappearance of a patient from a mental institution on a remote island. As he delves deeper, he uncovers shocking truths that challenge his sanity and reality.",
        release_date: "24/02/2010",
        rating: "7.8",
        thumbnail: `${imageBaseUrl}/shutterisland.jpg`,
        genre: "Thriller",
    },
    {
        type: "Serie",
        name: "Breaking Bad",
        description: "Breaking Bad is a crime drama series about Walter White, a high school chemistry teacher diagnosed with terminal cancer. To secure his family's future, he turns to manufacturing and selling methamphetamine, partnering with former student Jesse Pinkman. As Walter descends into the criminal underworld, his actions lead to devastating consequences.",
        release_date: "20/01/2008",
        rating: "8.5",
        thumbnail: `${imageBaseUrl}/breakingbad.jpg`,
        genre: "Thriller",
    },
    {
        type: "Serie",
        name: "Mindhunter",
        description: "Mindhunter is a crime thriller series that follows FBI agents Holden Ford and Bill Tench as they pioneer criminal profiling in the late 1970s. Working with psychologist Wendy Carr, they interview serial killers to understand their mindsets, revolutionizing investigative techniques and confronting the darkest aspects of human behavior.",
        release_date: "16/08/2019",
        rating: "7.1",
        thumbnail: `${imageBaseUrl}/mindhunter.jpg`,
        genre: "Thriller",
    },
    {
        type: "Movie",
        name: "Superbad",
        description: "Superbad is a comedy film about two high school friends trying to make the most of their last days before graduation, resulting in hilarious and chaotic situations.",
        release_date: "17/08/2007",
        rating: "7.6",
        thumbnail: `${imageBaseUrl}/superbad.jpg`,
        genre: "Comedy",
    },
    {
        type: "Movie",
        name: "Step Brothers",
        description: "Step Brothers is a comedy film that follows two middle-aged, lazy men who are forced to live together when their parents marry.",
        release_date: "25/07/2008",
        rating: "6.9",
        thumbnail: `${imageBaseUrl}/stepbrothers.jpg`,
        genre: "Comedy",
    },
    {
        type: "Serie",
        name: "Parks and Recreation",
        description: "Parks and Recreation is a comedy series that follows the absurd antics of an Indiana town's public officials as they pursue various projects to make their city a better place.",
        release_date: "09/04/2009",
        rating: "8.6",
        thumbnail: `${imageBaseUrl}/parksandrecreation.jpg`,
        genre: "Comedy",
    },
    {
        type: "Movie",
        name: "Hereditary",
        description: "Hereditary is a horror film about a family that begins to unravel terrifying secrets about their ancestry after the death of their secretive grandmother.",
        release_date: "08/06/2018",
        rating: "7.3",
        thumbnail: `${imageBaseUrl}/hereditary.jpg`,
        genre: "Horror",
    },
    {
        type: "Movie",
        name: "Get Out",
        description: "Get Out is a horror film that follows a young African-American who visits his white girlfriend's family estate, where he uncovers a disturbing secret.",
        release_date: "24/02/2017",
        rating: "7.7",
        thumbnail: `${imageBaseUrl}/getout.jpg`,
        genre: "Horror",
    },
    {
        type: "Serie",
        name: "Stranger Things",
        description: "Stranger Things is a horror series set in the 1980s that follows a group of kids who uncover secret government experiments and supernatural forces in their small town.",
        release_date: "15/07/2016",
        rating: "8.7",
        thumbnail: `${imageBaseUrl}/strangerthings.jpg`,
        genre: "Horror",
    },
    {
        type: "Serie",
        name: "The Haunting of Hill House",
        description: "The Haunting of Hill House is a horror series that alternates between two timelines, following siblings who grew up in what would become the most famous haunted house in the country.",
        release_date: "12/10/2018",
        rating: "8.6",
        thumbnail: `${imageBaseUrl}/thehauntingofhillhouse.jpg`,
        genre: "Horror",
    },
    {
        type: "Movie",
        name: "Inception",
        description: "Inception is a thriller film where a thief who enters the dreams of others to steal their secrets is given a chance to have his criminal history erased if he can plant an idea in someone's mind.",
        release_date: "16/07/2010",
        rating: "8.8",
        thumbnail: `${imageBaseUrl}/inception.jpg`,
        genre: "Thriller",
    },
    {
        type: "Movie",
        name: "Gone Girl",
        description: "Gone Girl is a thriller film about a man who becomes the prime suspect in the sudden disappearance of his wife, only to find out she had a twisted plan.",
        release_date: "03/10/2014",
        rating: "8.1",
        thumbnail: `${imageBaseUrl}/gonegirl.jpg`,
        genre: "Thriller",
    },
    {
        type: "Serie",
        name: "True Detective",
        description: "True Detective is a thriller series where detectives investigate grisly murders and dark conspiracies across various timelines.",
        release_date: "12/01/2014",
        rating: "9.0",
        thumbnail: `${imageBaseUrl}/truedetective.jpg`,
        genre: "Thriller",
    },
    {
        type: "Movie",
        name: "The Godfather",
        description: "The Godfather is a drama film that chronicles the powerful Italian-American crime family of Don Vito Corleone, focusing on the transformation of his youngest son, Michael.",
        release_date: "24/03/1972",
        rating: "9.2",
        thumbnail: `${imageBaseUrl}/thegodfather.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Forrest Gump",
        description: "Forrest Gump is a drama film about a simple man with a low IQ who unwittingly influences several historical events and becomes an inspiration to many.",
        release_date: "06/07/1994",
        rating: "8.8",
        thumbnail: `${imageBaseUrl}/forrestgump.jpg`,
        genre: "Drama",
    },
    {
        type: "Serie",
        name: "The Crown",
        description: "The Crown is a drama series that chronicles the reign of Queen Elizabeth II and the significant events and personal trials that shaped the second half of the 20th century.",
        release_date: "04/11/2016",
        rating: "8.7",
        thumbnail: `${imageBaseUrl}/thecrown.jpg`,
        genre: "Drama",
    },
    {
        type: "Serie",
        name: "Mad Men",
        description: "Mad Men is a drama series that follows the professional and personal lives of those working in an advertising agency on Madison Avenue in the 1960s.",
        release_date: "19/07/2007",
        rating: "8.6",
        thumbnail: `${imageBaseUrl}/madmen.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Mad Max: Fury Road",
        description: "Mad Max: Fury Road is an action film set in a post-apocalyptic wasteland where a woman rebels against a tyrannical ruler in search for her homeland with the aid of female prisoners, a psychotic worshiper, and a drifter named Max.",
        release_date: "15/05/2015",
        rating: "8.1",
        thumbnail: `${imageBaseUrl}/madmaxfuryroad.jpg`,
        genre: "Action",
    },
    {
        type: "Movie",
        name: "Die Hard",
        description: "Die Hard is an action film about a New York City police officer who tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
        release_date: "20/07/1988",
        rating: "8.2",
        thumbnail: `${imageBaseUrl}/diehard.jpg`,
        genre: "Action",
    },
    {
        type: "Serie",
        name: "24",
        description: "24 is an action series that follows federal agent Jack Bauer as he attempts to thwart multiple terrorist threats in the United States.",
        release_date: "06/11/2001",
        rating: "8.3",
        thumbnail: `${imageBaseUrl}/24.jpg`,
        genre: "Action",
    },
    {
        type: "Serie",
        name: "Arrow",
        description: "Arrow is an action series that follows billionaire playboy Oliver Queen, who, after being stranded on a hostile island, returns home to fight crime and corruption as a secret vigilante.",
        release_date: "10/10/2012",
        rating: "7.5",
        thumbnail: `${imageBaseUrl}/arrow.jpg`,
        genre: "Action",
    },
    {
        type: "Series",
        name: "Game of Thrones",
        description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        release_date: "17/04/2011",
        rating: "9.3",
        thumbnail: `${imageBaseUrl}/gameofthrones.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Dune",
        description: "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        release_date: "22/10/2021",
        rating: "8.2",
        thumbnail: `${imageBaseUrl}/dune.jpg`,
        genre: "Action",
    },
    {
        type: "Movie",
        name: "Iron Man",
        description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        release_date: "02/05/2008",
        rating: "7.9",
        thumbnail: `${imageBaseUrl}/ironman.jpg`,
        genre: "Action",
    },
    {
        type: "Series",
        name: "How I Met Your Mother",
        description: "A father recounts to his children - through a series of flashbacks - the journey he and his four best friends took leading up to him meeting their mother.",
        release_date: "19/09/2005",
        rating: "8.3",
        thumbnail: `${imageBaseUrl}/himym.jpg`,
        genre: "Comedy",
    },
    {
        type: "Series",
        name: "Modern Family",
        description: "Three different but related families face trials and tribulations in their own uniquely comedic ways.",
        release_date: "23/09/2009",
        rating: "8.4",
        thumbnail: `${imageBaseUrl}/modernfamily.jpg`,
        genre: "Comedy",
    },
    {
        type: "Series",
        name: "Fargo",
        description: "Various chronicles of deception, intrigue and murder in and around frozen Minnesota. Yet all of these tales mysteriously lead back one way or another to Fargo, North Dakota.",
        release_date: "15/04/2014",
        rating: "8.9",
        thumbnail: `${imageBaseUrl}/fargo.jpg`,
        genre: "Drama",
    },
    {
        type: "Series",
        name: "Better Call Saul",
        description: "The trials and tribulations of criminal lawyer Jimmy McGill in the time before he established his strip-mall law office in Albuquerque, New Mexico.",
        release_date: "08/02/2015",
        rating: "8.7",
        thumbnail: `${imageBaseUrl}/bettercallsaul.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Saw",
        description: "Two strangers awaken in a room with no recollection of how they got there, and soon discover they're pawns in a deadly game perpetrated by a notorious serial killer.",
        release_date: "29/10/2004",
        rating: "7.6",
        thumbnail: `${imageBaseUrl}/saw.jpg`,
        genre: "Horror",
    },
];

const users = [
    {
        firstname: "Tristan",
        lastname: "Amato",
        email: "Tristan.amato@edu.esce.fr",
        password: "Azerty123.",
        telephone: "0635593338",
        admin: "1",
    },
    {
        firstname: "Asle",
        lastname: "Sayeda",
        email: "Saimasayeda786@gmail.com",
        password: "Azerty123.",
        telephone: "0635593339",
        admin: "1",
    },
    {
        firstname: "Aysha",
        lastname: "Siddika",
        email: "Ayshasiddika@gmail.com",
        password: "Azerty123.",
        telephone: "0635593340",
        admin: "0",
    },
    {
        firstname: "Virgile",
        lastname: "Amato",
        email: "virgile.amato@gmail.com",
        password: "Azerty123.",
        telephone: "0730328451",
        admin: "0",
    },
    {
        firstname: "Sophie",
        lastname: "Amato",
        email: "Sophie.amato@gmail.com",
        password: "Azerty123.",
        telephone: "0612566284",
        admin: "0",
    },
];

    const reviews = [
        {
        review: "Amazing Movie",
        review_date: new Date (),
        user_id: "1",
        content_id: "6",
        },
        {
        review: "My favorite movie by far!",
        review_date: new Date (),
        user_id: "3",
        content_id: "6",
        },
        {
        review: "My girlfriend's favorite show :)",
        review_date: new Date (),
        user_id: "1",
        content_id: "7",
        },       
];

    const actors = [
        {
            firstname:"Jack",
            lastname:"Nicholson",
        },
        {
            firstname: "Shelley",
            lastname:"Duvall",
        },
        {
            firstname:"Danny",
            lastname:"Lloyd",
        },
        {
            firstname:"Josh",
            lastname:"Hutcherson",
        },
        {
            firstname:"Elizabeth",
            lastname:"Lail",
        },
        {
            firstname:"Matthew",
            lastname:"Lillard",
        },
        {
            firstname:"Evan",
            lastname:"Peters",
        },
        {
            firstname:"Emma",
            lastname:"Roberts",
        },
        {
            firstname:"Sarah",
            lastname:"Paulson",
        },
        {
            firstname:"Pedro",
            lastname:"Pascal",
        },
        {
            firstname:"Bella",
            lastname:"Ramsey",
        },
        {
            firstname:"Nick",
            lastname:"Offerman",
        },
        {
            firstname:"Christian",
            lastname:"Bale",
        },
        {
            firstname:"Gary",
            lastname:"Oldman",
        },
        {
            firstname:"Heath",
            lastname:"Ledger",
        },
        {
            firstname:"Uma",
            lastname:"Thurman",
        },
        {
            firstname:"Lucy",
            lastname:"Liu",
        },
        {
            firstname:"David",
            lastname:"Carradine",
        },
        {
            firstname:"Henry",
            lastname:"Cavill",
        },
        {
            firstname:"Joey",
            lastname:"Batey",
        },
        {
            firstname:"Anya",
            lastname:"Charlota",
        },
        {
            firstname:"Charlie",
            lastname:"Cox",
        },
        {
            firstname:"Deborah",
            lastname:"Ann Woll",
        },
        {
            firstname:"Elden",
            lastname:"Henson",
        },
        {
            firstname:"Bradley",
            lastname:"Cooper",
        },
        {
            firstname:"Zach",
            lastname:"Galifianakis",
        },
        {
            firstname:"Ed",
            lastname:"Helms",
        },
        {
            firstname:"Jim",
            lastname:"Carrey",
        },
        {
            firstname:"Laura",
            lastname:"Linney",
        },
        {
            firstname:"Ed",
            lastname:"Harris",
        },
        {
            firstname:"Jennifer",
            lastname:"Aniston",
        },
        {
            firstname:"Matthew",
            lastname:"Perry",
        },
        {
            firstname:"Courteney",
            lastname:"Cox",
        },
        {
            firstname:"Steve",
            lastname:"Carell",
        },
        {
            firstname:"Jenna",
            lastname:"Fischer",
        },
        {
            firstname:"Rainn",
            lastname:"Wilson",
        },
        {
            firstname:"Cilian",
            lastname:"Murphy",
        },
        {
            firstname:"Florence",
            lastname:"Pugh",
        },
        {
            firstname:"Emily",
            lastname:"Blunt",
        },
        {
            firstname:"Lee",
            lastname:"Sun Gyun",
        },
        {
            firstname:"Yeo-jeong",
            lastname:"Cho",
        },
        {
            firstname:"So-dam",
            lastname:"Park",
        },
        {
            firstname:"Milly",
            lastname:"Alcock",
        },
        {
            firstname:"Olivia",
            lastname:"Cooke",
        },
        {
            firstname:"Matt",
            lastname:"Smith",
        },
        {
            firstname:"Penn",
            lastname:"Badgley",
        },
        {
            firstname:"Victoria",
            lastname:"Pedretti",
        },
        {
            firstname:"Jenna",
            lastname:"Ortega",
        },
        {
            firstname:"Edward",
            lastname:"Norton",
        },
        {
            firstname:"Brad",    //50
            lastname:"Pitt",
        },
        {
            firstname:"Jared",
            lastname:"Leto",
        },
        {
            firstname:"Leonardo",
            lastname:"DiCaprio",
        },
        {
            firstname:"Mark",
            lastname:"Ruffalo",
        },
        {
            firstname:"Ben",
            lastname:"Kingsley",
        },
        {
            firstname:"Bryan",
            lastname:"Cranston",
        },
        {
            firstname:"Aaron",
            lastname:"Paul",
        },
        {
            firstname:"Anna",
            lastname:"Gunn",
        },
        {
            firstname:"Holt",
            lastname:"McCallany",
        },
        {
            firstname:"Jonathan",
            lastname:"Groff",
        },
        {
            firstname:"Anna",
            lastname:"Torv",
        },
        {
            firstname: "Joseph",
            lastname: "Gordon-Levitt",
        },
        {
            firstname: "Elliot",
            lastname: "Page",
        },
        {
            firstname: "Toni",
            lastname: "Collette",
        },
        {
            firstname: "Alex",
            lastname: "Wolff",
        },
        {
            firstname: "Milly",
            lastname: "Shapiro",
        },
        {
            firstname: "Daniel",
            lastname: "Kaluuya",
        },
        {
            firstname: "Allison",
            lastname: "Williams",
        },
        {
            firstname: "Bradley",
            lastname: "Whitford",
        },
        {
            firstname: "Winona",
            lastname: "Ryder",
        },
        {
            firstname: "David",
            lastname: "Harbour",
        },
        {
            firstname: "Finn",
            lastname: "Wolfhard",
        },
        {
            firstname: "Michiel",
            lastname: "Huisman",
        },
        {
            firstname: "Carla",
            lastname: "Gugino",
        },
        {
            firstname: "Henry",
            lastname: "Thomas",
        },
        {
            firstname: "Matthew",       //75
            lastname: "McConaughey",
        },
        {
            firstname: "Woody",
            lastname: "Harrelson",
        },
        {
            firstname: "Michelle",
            lastname: "Monaghan",
        },
        {
            firstname: "Al",
            lastname: "Pacino",
        },
        {
            firstname: "Marlon",
            lastname: "Brando",
        },
        {
            firstname: "James",
            lastname: "Caan",
        },
        {
            firstname: "Tom",
            lastname: "Hanks",
        },
        {
            firstname: "Robin",
            lastname: "Wright",
        },
        {
            firstname: "Gary",
            lastname: "Sinise",
        },
        {
            firstname: "Claire",
            lastname: "Foy",
        },
        {
            firstname: "Matt",
            lastname: "Smith",
        },
        {
            firstname: "Vanessa",
            lastname: "Kirby",
        },
        {
            firstname: "Jon",
            lastname: "Hamm",
        },
        {
            firstname: "Elisabeth",
            lastname: "Moss",
        },
        {
            firstname: "Vincent",
            lastname: "Kartheiser",
        },
        {
            firstname: "Tom",
            lastname: "Hardy",
        },
        {
            firstname: "Charlize",
            lastname: "Theron",
        },
        {
            firstname: "Nicholas",
            lastname: "Hoult",
        },
        {
            firstname: "Bruce",
            lastname: "Willis",
        },
        {
            firstname: "Alan",
            lastname: "Rickman",
        },
        {
            firstname: "Bonnie",
            lastname: "Bedelia",
        },
        {
            firstname: "Kiefer",
            lastname: "Sutherland",
        },
        {
            firstname: "Mary Lynn",
            lastname: "Rajskub",
        },
        {
            firstname: "Dennis",
            lastname: "Haysbert",
        },
        {
            firstname: "Stephen",
            lastname: "Amell",
        },
        {
            firstname: "Katie",     //100
            lastname: "Cassidy",
        },
        {
            firstname: "David",
            lastname: "Ramsey",
        },
        {
            firstname: "Jonah",
            lastname: "Hill",
        },
        {
            firstname: "Michael",
            lastname: "Cera",
        },
        {
            firstname: "Emma",
            lastname: "Stone",
        },
        {
            firstname: "Will",
            lastname: "Ferrel",
        },
        {
            firstname: "Mary",
            lastname: "Steenburgen",
        },
        {
            firstname: "Richard",
            lastname: "Jenkins",
        },
        {
            firstname: "Amy",
            lastname: "Poehler",
        },
        {
            firstname: "Rashida",
            lastname: "Jones",
        },
        {
            firstname: "Aubrey",
            lastname: "Plaza",
        },
        {
            firstname: "Rosamund",
            lastname: "Pike",
        },
        {
            firstname: "Ben",
            lastname: "Affleck",
        },
        {
            firstname: "Emily",
            lastname: "Ratajkowski",
        },
        {
            firstname:"Peter",
            lastname:"Dinklage"
        },
        {
            firstname:"Kit",
            lastname:"Harington",
        },
        {
            firstname:"Emilia",
            lastname:"Clarke",
        },
        {
            firstname:"Timothée",
            lastname:"Chalamet"
        },
        {
            firstname:"Zendaya",
            lastname:"Coleman",
        },
        {
            firstname:"Rebecca",
            lastname:"Ferguson",
        },
        {
            firstname:"Robert",
            lastname:"Downey Jr"
        },
        {
            firstname:"Gwyneth",
            lastname:"Paltrow",
        },
        {
            firstname:"Jeff",
            lastname:"Bridges",
        },
        {
            firstname: "Josh",
            lastname: "Radnor",
        },
        {
            firstname: "Jason",
            lastname: "Segel",
        },
        {
            firstname: "Cobie",
            lastname: "Smulders",
        },
        {
            firstname: "Ed",
            lastname: "O'Neill",
        },
        {
            firstname: "Sofía",
            lastname: "Vergara",
        },
        {
            firstname: "Ty",
            lastname: "Burrell",
        },
        {
            firstname: "Billy",
            lastname: "Bob Thornton",
        },
        {
            firstname: "Martin",
            lastname: "Freeman",
        },
        {
            firstname: "Allison",
            lastname: "Tolman",
        },
        {
            firstname: "Bob",
            lastname: "Odenkirk",
        },
        {
            firstname: "Jonathan",
            lastname: "Banks",
        },
        {
            firstname: "Rhea",
            lastname: "Seehorn",
        },
        {
            firstname: "Tobin",
            lastname: "Bell",
        },
        {
            firstname: "Cary",
            lastname: "Elwes",
        },
        {
            firstname: "Leigh",
            lastname: "Whannell",
        },

];

    const contents_actors = [
        {
        content_id:"1",
        actor_id:"1",
        },
        {
        content_id:"1",
        actor_id:"2",
        },
        {
        content_id:"1",
        actor_id:"3",
        },
        {
        content_id: "2",
        actor_id: "4",
        },
        {
        content_id:"2",
        actor_id:"5",
        },
        {
        content_id:"2",
        actor_id:"6",
        },
        {
        content_id:"3",
        actor_id:"7",
        },
        {
        content_id:"3",
        actor_id:"8",
        },
        {
        content_id:"3",
        actor_id:"9",
        },
        {
        content_id:"4",
        actor_id:"10",
        },
        {
        content_id:"4",
        actor_id:"11",
        },
        {
        content_id:"4",
        actor_id:"12",
        },
        {
        content_id:"5",
        actor_id:"13",
        },
        {
        content_id:"5",
        actor_id:"14",
        },
        {
        content_id:"5",
        actor_id:"15",
        },
        {
        content_id:"6",
        actor_id:"16",
        },
        {
        content_id:"6",
        actor_id:"17",
        },
        {
        content_id:"6",
        actor_id:"18",
        },
        {
        content_id:"7",
        actor_id:"19",
        },
        {
        content_id:"7",
        actor_id:"20",
        },
        {
        content_id:"7",
        actor_id:"21",
        },
        {
        content_id:"8",
        actor_id:"22",
        },
        {
        content_id:"8",
        actor_id:"23",
        },
        {
        content_id:"8",
        actor_id:"24",
        },
        {
        content_id:"9",
        actor_id:"25",
        },
        {
        content_id:"9",
        actor_id:"26",
        },
        {
        content_id:"9",
        actor_id:"27",
        },
        {
        content_id:"10",
        actor_id:"28",
        },
        {
        content_id:"10",
        actor_id:"29",
        },
        {
        content_id:"10",
        actor_id:"30",
        },
        {
        content_id:"11",
        actor_id:"31",
        },
        {
        content_id:"11",
        actor_id:"32",
        },
        {
        content_id:"11",
        actor_id:"33",
        },
        {
        content_id:"12",
        actor_id:"34",
        },
        {
        content_id:"12",
        actor_id:"35",
        },
        {
        content_id:"12",
        actor_id:"36",
        },
        {
        content_id:"13",
        actor_id:"37",
        },
        {
        content_id:"13",
        actor_id:"38",
        },
        {
        content_id:"13",
        actor_id:"39",
        },
        {
        content_id:"14",
        actor_id:"40",
        },
        {
        content_id:"14",
        actor_id:"41",
        },
        {
        content_id:"14",
        actor_id:"42",
        },
        {
        content_id:"15",
        actor_id:"43",
        },
        {
        content_id:"15",
        actor_id:"44",
        },
        {
        content_id:"15",
        actor_id:"45",
        },
        {
        content_id:"16",
        actor_id:"46",
        },
        {
        content_id:"16",
        actor_id:"47",
        },
        {
        content_id:"16",
        actor_id:"48",
        },
        {
        content_id:"17",
        actor_id:"49",
        },
        {
        content_id:"17",
        actor_id:"50",
        },
        {
        content_id:"17",
        actor_id:"51",
        },
        {
        content_id:"18",
        actor_id:"52",
        },
        {
        content_id:"18",
        actor_id:"53",
        },
        {
        content_id:"18",
        actor_id:"54",
        },
        {
        content_id:"19",
        actor_id:"55",
        },
        {
        content_id:"19",
        actor_id:"56",
        },
        {
        content_id:"19",
        actor_id:"57",
        },
        {
        content_id:"20",
        actor_id:"58",
        },
        {
        content_id:"20",
        actor_id:"59",
        },
        {
        content_id:"20",
        actor_id:"60",
        },
        {
        content_id:"21",
        actor_id:"102",
        },
        {
        content_id:"21",
        actor_id:"103",
        },
        {
        content_id:"21",
        actor_id:"104",
        },
        {
        content_id:"22",
        actor_id:"105",
        },
        {
        content_id:"22",
        actor_id:"106",
        },
        {
        content_id:"22",
        actor_id:"107",
        },
        {
        content_id:"23",
        actor_id:"108",
        },
        {
        content_id:"23",
        actor_id:"109",
        },
        {
        content_id:"23",
        actor_id:"110",
        },
        {
        content_id:"24",
        actor_id:"63",
        },
        {
        content_id:"24",
        actor_id:"64",
        },
        {
        content_id:"24",
        actor_id:"65",
        },
        {
        content_id:"25",
        actor_id:"66",
        },
        {
        content_id:"25",
        actor_id:"67",
        },
        {
        content_id:"25",
        actor_id:"68",
        },
        {
        content_id:"26",
        actor_id:"69",
        },
        {
        content_id:"26",
        actor_id:"70",
        },
        {
        content_id:"26",
        actor_id:"71",
        },
        {
        content_id:"27",
        actor_id:"72",
        },
        {
        content_id:"27",
        actor_id:"73",
        },
        {
        content_id:"27",
        actor_id:"74",
        },
        {
        content_id:"28",
        actor_id:"61",
        },
        {
        content_id:"28",
        actor_id:"62",
        },
        {
        content_id:"28",
        actor_id:"52",
        },
        {
        content_id:"29",
        actor_id:"111",
        },
        {
        content_id:"29",
        actor_id:"112",
        },
        {
        content_id:"29",
        actor_id:"113",
        },
        {
        content_id:"30",
        actor_id:"75",
        },
        {
        content_id:"30",
        actor_id:"76",
        },
        {
        content_id:"30",
        actor_id:"77",
        },
        {
        content_id:"31",
        actor_id:"78",
        },
        {
        content_id:"31",
        actor_id:"79",
        },
        {
        content_id:"31",
        actor_id:"80",
        },
        {
        content_id:"32",
        actor_id:"81",
        },
        {
        content_id:"32",
        actor_id:"82",
        },
        {
        content_id:"32",
        actor_id:"83",
        },
        {
        content_id:"33",
        actor_id:"84",
        },
        {
        content_id:"33",
        actor_id:"85",
        },
        {
        content_id:"33",
        actor_id:"86",
        },
        {
        content_id:"34",
        actor_id:"87",
        },
        {
        content_id:"34",
        actor_id:"88",
        },
        {
        content_id:"34",
        actor_id:"89",
        },
        {
        content_id:"35",
        actor_id:"90",
        },
        {
        content_id:"35",
        actor_id:"91",
        },
        {
        content_id:"35",
        actor_id:"92",
        },
        {
        content_id:"36",
        actor_id:"93",
        },
        {
        content_id:"36",
        actor_id:"94",
        },
        {
        content_id:"36",
        actor_id:"95",
        },
        {
        content_id:"37",
        actor_id:"96",
        },
        {
        content_id:"37",
        actor_id:"97",
        },
        {
        content_id:"37",
        actor_id:"98",
        },
        {
        content_id:"38",
        actor_id:"99",
        },
        {
        content_id:"38",
        actor_id:"100",
        },
        {
        content_id:"38",
        actor_id:"101",
        },
        {
        content_id:"39",
        actor_id:"114",
        },
        {
        content_id:"39",
        actor_id:"115",
        },
        {
        content_id:"39",
        actor_id:"116",
        },
        {
        content_id:"40",
        actor_id:"117",
        },
        {
        content_id:"40",
        actor_id:"118",
        },
        {
        content_id:"40",
        actor_id:"119",
        },
        {
        content_id:"41",
        actor_id:"120",
        },
        {
        content_id:"41",
        actor_id:"121",
        },
        {
        content_id:"41",
        actor_id:"122",
        },
        {
        content_id:"42",
        actor_id:"123",
        },
        {
        content_id:"42",
        actor_id:"124",
        },
        {
        content_id:"42",
        actor_id:"125",
        },
        {
        content_id:"43",
        actor_id:"126",
        },
        {
        content_id:"43",
        actor_id:"127",
        },
        {
        content_id:"43",
        actor_id:"128",
        },
        {
        content_id:"44",
        actor_id:"129",
        },
        {
        content_id:"44",
        actor_id:"130",
        },
        {
        content_id:"44",
        actor_id:"131",
        },
        {
        content_id:"45",
        actor_id:"132",
        },
        {
        content_id:"45",
        actor_id:"133",
        },
        {
        content_id:"45",
        actor_id:"134",
        },
        {
        content_id:"46",
        actor_id:"135",
        },
        {
        content_id:"46",
        actor_id:"136",
        },
        {
        content_id:"46",
        actor_id:"137",
        },
];



const seed = async () => {
    try {
      // Declare an array to store the query promises
      // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
      const queries = [];
  
      /* ************************************************************************* */
  
      // Generating Seed Data
  
      // Optional: Truncate tables (remove existing data)
      await database.query("DELETE from contents");
      await database.query("DELETE from users");
      await database.query("DELETE from reviews");
      await database.query("DELETE from actors");
      await database.query("DELETE from contents_actors");
    
      // Insert fake data into the 'item' table
  
      for (const content of contents) {
        const { type, name, description, release_date, rating, thumbnail, genre } = content;
        queries.push(
          await database.query(
            "insert into contents(type, name, description, release_date, rating, thumbnail, genre) VALUES (?,?,?,?,?,?,?)",
            [
              content.type,
              content.name,
              content.description,
              content.release_date,
              content.rating,
              content.thumbnail,
              content.genre
            ]
          )
        );
      }
      for (const user of users) {
        queries.push(
          database.query(
            "insert into users(firstname, lastname, email, password, telephone, admin) VALUES (?,?,?,?,?,?)",
            [
              user.firstname,
              user.lastname,
              user.email,
              user.password,
              user.telephone,
              user.admin,
            ]
          )
        );
      }
  
      for (const review of reviews) {
        queries.push(
          await database.query("INSERT INTO reviews(review, review_date, user_id, content_id) VALUES (?,?,?,?)", 
            [
            review.review,
            review.review_date,
            review.user_id,
            review.content_id,
            ]
          )
        );
      }
      for (const actor of actors) {
        queries.push(
          await database.query(
            "INSERT INTO actors(firstname, lastname) VALUES (?,?)",
            [actor.firstname, actor.lastname]
          )
        );
      }

      for (const content_actor of contents_actors) {
        queries.push(
          await database.query(
            "INSERT INTO contents_actors(content_id, actor_id) VALUES (?,?)",
            [content_actor.content_id, content_actor.actor_id]
          )
        );
      }
  
      /* ************************************************************************* */
  
      // Wait for all the insertion queries to complete
      // await Promise.all(queries);
  
      // Close the database connection
      database.end();
  
      console.info(`${database.databaseName} filled from ${__filename} 🌱`);
    } catch (err) {
      console.error("Error filling the database:", err);
    }
  };
  
  // Run the seed function
  seed();
  

