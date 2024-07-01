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
        release_date: "1980-10-16",
        rating: "8.1",
        thumbnail: `${imageBaseUrl}/shining.jpg`,
        genre: "Horror",
    },
    {
        type: "Movie",
        name: "Five Nights at Freddy's",
        description: "Five Nights at Freddy's is a horror film based on the popular video game series. It follows a security guard working the night shift at Freddy Fazbear's Pizza, where animatronic characters come to life and pose a deadly threat. Tense atmosphere and jump scares abound.",
        release_date: "2023-10-27",
        rating: "5.9",
        thumbnail: `${imageBaseUrl}/fivenightsatfreddys.jpg`,
        genre: "Horror",
    },
    {
        type: "Serie",
        name: "American Horror Story",
        description: "American Horror Story is a horror anthology TV series where each season tells a different chilling story, ranging from haunted houses to asylums, witches, and cults. Known for its dark themes, unsettling atmosphere, and recurring cast playing new roles each season.",
        release_date: "2011-10-05",
        rating: "7.0",
        thumbnail: `${imageBaseUrl}/americanhorrorstory.jpg`,
        genre: "Horror",
    },
    {
        type: "Serie",
        name: "The Last of Us",
        description: "The Last of Us is a TV series based on the video game. It follows Joel and Ellie, survivors in a post-apocalyptic world ravaged by a fungal infection. Their journey across the U.S. is filled with danger, emotional depth, and a powerful bond that develops between them.",
        release_date: "2023-01-15",
        rating: "8.2",
        thumbnail: `${imageBaseUrl}/thelastofus.jpg`,
        genre: "Horror",
    },
    {
        type: "Movie",
        name: "The Dark Knight",
        description: "The Dark Knight, directed by Christopher Nolan, is a superhero film featuring Batman as he battles the Joker, a criminal mastermind wreaking havoc on Gotham City. Known for its intense action, complex characters, and Heath Ledger's iconic performance as the Joker",
        release_date: "2008-08-13",
        rating: "8.0",
        thumbnail: `${imageBaseUrl}/thedarkknight.jpg`,
        genre: "Action",
    },
    {
        type: "Movie",
        name: "Kill Bill",
        description: "Kill Bill directed by Quentin Tarantino, is a two-part action film. It follows The Bride, a former assassin seeking revenge on her ex-colleagues who betrayed her. Known for its stylized violence, martial arts choreography, and homage to various film genres.",
        release_date: "2003-11-26",
        rating: "8.2",
        thumbnail: `${imageBaseUrl}/killbill.jpg`,
        genre: "Action",
    },
    {
        type: "Serie",
        name: "The Witcher",
        description: "The Witcher is a fantasy TV series based on the book series by Andrzej Sapkowski. It follows Geralt of Rivia, a monster hunter with supernatural abilities, as he navigates a world filled with magic, political intrigue, and dark forces. Known for its complex characters and epic storytelling.",
        release_date: "2019-12-20",
        rating: "7.6",
        thumbnail: `${imageBaseUrl}/thewitcher.jpg`,
        genre: "Action",
    },
    {
        type: "Serie",
        name: "Daredevil",
        description: "Daredevil is a TV series based on the Marvel Comics character. It follows Matt Murdock, a blind lawyer with heightened senses, who fights crime as the vigilante Daredevil in Hell's Kitchen, New York. Known for its gritty realism, intense action scenes, and deep character development.",
        release_date: "2015-04-15",
        rating: "6.3",
        thumbnail: `${imageBaseUrl}/daredevil.jpg`,
        genre: "Action",
    },
    {
        type: "Movie",
        name: "The Hangover",
        description: "The Hangover is a comedy film about four friends who travel to Las Vegas for a bachelor party. After a wild night, they wake up with no memory of the previous evening and must piece together what happened to find their missing friend. Hilarious and chaotic misadventures ensue.",
        release_date: "2009-06-24",
        rating: "6.9",
        thumbnail: `${imageBaseUrl}/thehangover.jpg`,
        genre: "Comedy",
    },
    {
        type: "Movie",
        name: "The Truman Show",
        description: "The Truman Show is a satirical drama where Truman Burbank, unknowingly, lives his entire life on a massive TV set, broadcasted 24/7. As he starts discovering the truth, Truman seeks to escape the fabricated world and find genuine reality.",
        release_date: "1998-10-28",
        rating: "7.9",
        thumbnail: `${imageBaseUrl}/thetrumanshow.jpg`,
        genre: "Comedy",
    },
    {
        type: "Serie",
        name: "Friends",
        description: "Friends is a popular sitcom following six friends—Rachel, Ross, Monica, Chandler, Joey, and Phoebe—as they navigate life, love, and work in New York City. Their humorous and heartfelt adventures highlight the importance of friendship and support.",
        release_date: "1994-09-22",
        rating: "8.6",
        thumbnail: `${imageBaseUrl}/friends.jpg`,
        genre: "Comedy",
    },
    {
        type: "Serie",
        name: "The Office",
        description: "The Office is a mockumentary-style sitcom that chronicles the daily lives of employees at Dunder Mifflin, a mundane paper company. Led by bumbling boss Michael Scott, the quirky team navigates office politics, relationships, and absurd workplace antics.",
        release_date: "2005-03-24",
        rating: "8.0",
        thumbnail: `${imageBaseUrl}/theoffice.jpg`,
        genre: "Comedy",
    },
    {
        type: "Movie",
        name: "Oppenheimer",
        description: "Oppenheimer is a biographical drama that explores the life of J. Robert Oppenheimer, the physicist who led the Manhattan Project. The film delves into his scientific achievements, ethical dilemmas, and the profound impact of creating the atomic bomb on his life and the world.",
        release_date: "2023-07-19",
        rating: "8.5",
        thumbnail: `${imageBaseUrl}/oppenheimer.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Parasite",
        description: "Parasite is a dark comedy thriller that follows the impoverished Kim family as they scheme to become employed by the wealthy Park family. Through deception and cunning, they infiltrate the household, leading to unexpected and tragic consequences as social tensions escalate.",
        release_date: "2019-06-05",
        rating: "8.5",
        thumbnail: `${imageBaseUrl}/parasite.jpg`,
        genre: "Drama",
    },
    {
        type: "Serie",
        name: "House of the Dragons",
        description: "Friends is a popular sitcom following six friends—Rachel, Ross, Monica, Chandler, Joey, and Phoebe—as they navigate life, love, and work in New York City. Their humorous and heartfelt adventures highlight the importance of friendship and support.",
        release_date: "2022-08-21",
        rating: "7.7",
        thumbnail: `${imageBaseUrl}/houseofthedragons.jpg`,
        genre: "Drama",
    },
    {
        type: "Serie",
        name: "You",
        description: "You is a psychological thriller series following Joe Goldberg, a charming yet obsessive man who becomes infatuated with women he meets. Using technology and manipulation, Joe goes to extreme lengths to insert himself into their lives, blurring the lines between love and obsession.",
        release_date: "2018-09-09",
        rating: "6.3",
        thumbnail: `${imageBaseUrl}/you.jpg`,
        genre: "Drama",
    },
    {
        type: "Movie",
        name: "Fight Club",
        description: "Fight Club is a psychological thriller where an insomniac office worker and a charismatic soap salesman create an underground fight club as a form of male bonding. As the club evolves, it spirals into a dark and chaotic exploration of identity and rebellion.",
        release_date: "1999-11-10",
        rating: "8.1",
        thumbnail: `${imageBaseUrl}/fightclub.jpg`,
        genre: "Thriller",
    },
    {
        type: "Movie",
        name: "Shutter Island",
        description: "Shutter Island is a psychological thriller following U.S. Marshal Teddy Daniels as he investigates the disappearance of a patient from a mental institution on a remote island. As he delves deeper, he uncovers shocking truths that challenge his sanity and reality.",
        release_date: "2010-02-24",
        rating: "7.8",
        thumbnail: `${imageBaseUrl}/shutterisland.jpg`,
        genre: "Thriller",
    },
    {
        type: "Serie",
        name: "Breaking Bad",
        description: "Breaking Bad is a crime drama series about Walter White, a high school chemistry teacher diagnosed with terminal cancer. To secure his family's future, he turns to manufacturing and selling methamphetamine, partnering with former student Jesse Pinkman. As Walter descends into the criminal underworld, his actions lead to devastating consequences.",
        release_date: "2008-01-20",
        rating: "8.5",
        thumbnail: `${imageBaseUrl}/breakingbad.jpg`,
        genre: "Thriller",
    },
    {
        type: "Serie",
        name: "Mindhunter",
        description: "Mindhunter is a crime thriller series that follows FBI agents Holden Ford and Bill Tench as they pioneer criminal profiling in the late 1970s. Working with psychologist Wendy Carr, they interview serial killers to understand their mindsets, revolutionizing investigative techniques and confronting the darkest aspects of human behavior.",
        release_date: "2019-08-16",
        rating: "7.1",
        thumbnail: `${imageBaseUrl}/mindhunter.jpg`,
        genre: "Thriller",
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
            firstname:"Brad",
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
  

