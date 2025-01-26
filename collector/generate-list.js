import { bgg } from "bgg-sdk";
//import { gameList } from "./games.js"
import { writeFileSync } from "node:fs";


const getGame = async (query) => {
    const results = await bgg.search({ query, exact: true, type: ["boardgame"] }).catch(e => { console.log("failed to get " + query, e); throw e });

    if (results && results.items.length > 0) {
        return results.items[0];
    }

    const results2 = await bgg.search({ query, type: ["boardgame"] }).catch(e => { console.log("failed to get " + query, e); throw e });
    //console.log("2", results2)
    if (results2 && results2.items.length > 0) {
        // pick the most recent one
        results2.items.sort((a, b) => a.yearPublished ?? 0 - b.yearPublished ?? 0)
        return results2.items[0]
    }

    return undefined;
}

const mappedGames = {
    "2491 Planetship": { "id": "266102", "name": "2491 Planetship", "yearPublished": "2020" },
    "7 Wonders Duel": { "id": "173346", "name": "7 Wonders Duel", "yearPublished": "2015" },
    "7 Wonders": { "id": "68448", "name": "7 Wonders", "yearPublished": "2010" },
    "A cabana abandonada": { "id": "203420", "name": "Exit: The Game – The Abandoned Cabin", "yearPublished": "2016" },
    "A Ilha proibida": { "id": "65244", "name": "A Ilha Proibida", "yearPublished": "2010" },
    "A nossa casa": { "id": "194880", "name": "A Nossa Casa", "yearPublished": "2016" },
    "Abalone": { "id": "526", "name": "Abalone", "yearPublished": "1987" },
    "Akropolis": { "id": "357563", "name": "Akropolis", "yearPublished": "2022" },
    "Aqualin": { "id": "295948", "name": "Aqualin", "yearPublished": "2020" },
    "Arraial": { "id": "246150", "name": "Arraial", "yearPublished": "2018" },
    "Baby blues": { "id": "155157", "name": "Baby Blues", "yearPublished": "2015" },
    "Battle Cry": { "id": "551", "name": "Battle Cry", "yearPublished": "1999" },
    "Boomerang": { "id": "3647", "name": "Boomerang", "yearPublished": "1976" },
    "Boss monster": { "id": "174973", "name": "Boss Monster 2: The Next Level", "yearPublished": "2015" },
    "Bot factory": { "id": "328124", "name": "Bot Factory", "yearPublished": "2023" },
    "Cactus": { "id": "268255", "name": "Cactus", "yearPublished": "2019" },
    "Call to adventure": { "id": "238992", "name": "Call to Adventure", "yearPublished": "2019" },
    "Camel Up": { "id": "153938", "name": "Camel Up", "yearPublished": "2014" },
    "Captain Flip": { "id": "393325", "name": "Captain Flip", "yearPublished": "2024" },
    "Caravelas": { "id": "72131", "name": "Caravelas", "yearPublished": "2010" },
    "Carcassonne": { "id": "822", "name": "Carcassonne", "yearPublished": "2000" },
    "Caretos": { "id": "290367", "name": "Caretos", "yearPublished": "2020" },
    "Carrossel": { "id": "252712", "name": "Carrossel", "yearPublished": "2019" },
    "Cartographers": { "id": "263918", "name": "Cartographers", "yearPublished": "2019" },
    "Castle Party": { "id": "323614", "name": "Castle Party", "yearPublished": "2021" },
    "Cat Lady": { "id": "228504", "name": "Cat Lady", "yearPublished": "2017" },
    "Catan": { "id": "13", "name": "CATAN", "yearPublished": "1995" },
    "Celtae": { "id": "374200", "name": "Celtae", "yearPublished": "2023" },
    "Civilization": { "id": "71", "name": "Civilization", "yearPublished": "1980" },
    "Clube detective": { "id": "256788", "name": "Clube Detective", "yearPublished": "2018" },
    "Cluedo": { "id": "1294", "name": "Cluedo", "yearPublished": "1949" },
    "Combo Cone Paradise": { "id": "342704", "name": "Combo Cone Paradise", "yearPublished": "2021" },
    "Coup": { "id": "1653", "name": "Coup", "yearPublished": "1991" },
    "D. Afonso Henriques": { "id": "168900", "name": "D. Afonso Henriques", "yearPublished": "2014" },
    "Diplomacy": { "id": "483", "name": "Diplomacy", "yearPublished": "1959" },
    "Dirty Money": { "id": "42596", "name": "Dirty Money", "yearPublished": "1993" },
    "Disciple Detective": { "id": "297735", "name": "Disciple Detective", "yearPublished": "2020" },
    "Dixit": { "id": "39856", "name": "Dixit", "yearPublished": "2008" },
    "Era uma vez": { "id": "220780", "name": "Era Uma Vez", "yearPublished": "2018" },
    "Evergreen": { "id": "304", "name": "Evergreen", "yearPublished": "1999" },
    "Evo": { "id": "1159", "name": "Evo", "yearPublished": "2001" },
    "Evolution": { "id": "1080", "name": "Evolution", "yearPublished": "1986" },
    "F1": { "id": "38885", "name": "F1", "yearPublished": "2005" },
    "Faraway": { "id": "168949", "name": "Faraway", "yearPublished": "2016" },
    "Fiesta de los muertos": { "id": "285253", "name": "Fiesta de los Muertos", "yearPublished": "2019" },
    "FlussFieber": { "id": "38548", "name": "Flussfieber", "yearPublished": "2008" },
    "Formula D": { "id": "37904", "name": "Formula D", "yearPublished": "2008" },
    "Gardens": { "id": "153422", "name": "Gardens", "yearPublished": "2014" },
    "Garum": { "id": "282918", "name": "Garum", "yearPublished": "2019" },
    "Gods of Rome": { "id": "364689", "name": "Gods of Rome", "yearPublished": "2023" },
    "History of the World": { "id": "224", "name": "History of the World", "yearPublished": "1991" },
    "Hook!": { "id": "147685", "name": "Hook!", "yearPublished": "2014" },
    "I Love Portugal": { "id": "190828", "name": "I Love Portugal", "yearPublished": "2016" },
    "Illusion": { "id": "244995", "name": "Illusion", "yearPublished": "2018" },
    "Istanbul": { "id": "148949", "name": "Istanbul", "yearPublished": "2014" },
    "Kamisado": { "id": "38545", "name": "Kamisado", "yearPublished": "2008" },
    "Kingdomino": { "id": "204583", "name": "Kingdomino", "yearPublished": "2016" },
    "Klash": { "id": "202253", "name": "Klash", "yearPublished": "2016" },
    "Kokopelli": { "id": "322195", "name": "Kokopelli", "yearPublished": "2021" },
    "La cucaracha": { "id": "137909", "name": "La Cucaracha", "yearPublished": "2013" },
    "Lata": { "id": "374201", "name": "Lata", "yearPublished": "2023" },
    "Lost Cities": { "id": "50", "name": "Lost Cities", "yearPublished": "1999" },
    "Love Letter": { "id": "129622", "name": "Love Letter", "yearPublished": "2012" },
    "Lunaris 45": { "id": "380915", "name": "Lunaris 45", "yearPublished": "2023" },
    "MicroMacro: Crime City": { "id": "318977", "name": "MicroMacro: Crime City", "yearPublished": "2020" },
    "Mindtrap II": { "id": "5425", "name": "MindTrap II", "yearPublished": "1997" },
    "Mistakos": { "id": "2922", "name": "Mistakos", "yearPublished": "1999" },
    "Modern Art": { "id": "118", "name": "Modern Art", "yearPublished": "1992" },
    "Monopoly": { "id": "1406", "name": "Monopoly", "yearPublished": "1935" },
    "Monster Lands": { "id": "209001", "name": "Monster Lands", "yearPublished": "2018" },
    "Mysthea": { "id": "242653", "name": "Mysthea", "yearPublished": "2019" },
    "New york 1901": { "id": "174660", "name": "New York 1901", "yearPublished": "2015" },
    "Nidavellir": { "id": "293014", "name": "Nidavellir", "yearPublished": "2020" },
    "Nuts!": { "id": "7608", "name": "Nuts!", "yearPublished": "1998" },
    "On Tour": { "id": "5785", "name": "On Tour", "yearPublished": "1987" },
    "One key": { "id": "263155", "name": "One Key", "yearPublished": "2019" },
    "OverBoss": { "id": "310192", "name": "Overboss: A Boss Monster Adventure", "yearPublished": "2021" },
    "Papua": { "id": "571", "name": "Papua", "yearPublished": "1992" },
    "Passa o Desenho": { "id": "46213", "name": "Passa o Desenho", "yearPublished": "2009" },
    "Pega Bicho": { "id": "220778", "name": "Pega Bicho", "yearPublished": "2017" },
    "Pessoa": { "id": "309728", "name": "Pessoa", "yearPublished": "2022" },
    "Porto": { "id": "254619", "name": "Porto", "yearPublished": "2019" },
    "Quicksand": { "id": "2518", "name": "Quicksand", "yearPublished": "1989" },
    "Quoridor": { "id": "624", "name": "Quoridor", "yearPublished": "1997" },
    "Ragami": { "id": "114863", "name": "Ragami", "yearPublished": "2012" },
    "Red 7": { "id": "161417", "name": "Red 7", "yearPublished": "2014" },
    "Reis de Portugal": { "id": "164091", "name": "Reis de Portugal", "yearPublished": "2014" },
    "Rey de 12": { "id": "302917", "name": "Rey de 12", "yearPublished": "2020" },
    "Rhino Hero": { "id": "91514", "name": "Rhino Hero", "yearPublished": "2011" },
    "Rossio": { "id": "276633", "name": "Rossio", "yearPublished": "2020" },
    "Saboteur": { "id": "9220", "name": "Saboteur", "yearPublished": "2004" },
    "Sagrada": { "id": "107448", "name": "Sagrada", "yearPublished": "2007" },
    "Salem 1692": { "id": "175549", "name": "Salem 1692", "yearPublished": "2015" },
    "Salto": { "id": "18683", "name": "Salto", "yearPublished": "1899" },
    "Scattergories": { "id": "2381", "name": "Scattergories", "yearPublished": "1988" },
    "Scotland Yard": { "id": "438", "name": "Scotland Yard", "yearPublished": "1983" },
    "Selva": { "id": "31487", "name": "Selva", "yearPublished": "2005" },
    "Sequence": { "id": "2375", "name": "Sequence", "yearPublished": "1982" },
    "So Clover!": { "id": "329839", "name": "So Clover!", "yearPublished": "2021" },
    "Space Base": { "id": "242302", "name": "Space Base", "yearPublished": "2018" },
    "Spaghetti": { "id": "206802", "name": "Spaghetti", "yearPublished": "2016" },
    "Splendor": { "id": "148228", "name": "Splendor", "yearPublished": "2014" },
    "Star Wars X-wing": { "id": "252328", "name": "Star Wars X-Wing", "yearPublished": "2018" },
    "Terra Mare": { "id": "336929", "name": "Terra Mare", "yearPublished": "2021" },
    "Terra": { "id": "8671", "name": "Terra", "yearPublished": "2003" },
    "Terraforming Mars": { "id": "167791", "name": "Terraforming Mars", "yearPublished": "2016" },
    "That's not a Hat": { "id": "375651", "name": "That's Not a Hat", "yearPublished": "2023" },
    "The Resistance": { "id": "41114", "name": "The Resistance", "yearPublished": "2009" },
    "The Vale of Eternity": { "id": "385529", "name": "The Vale of Eternity", "yearPublished": "2023" },
    "Three Sisters": { "id": "291845", "name": "Three Sisters", "yearPublished": "2022" },
    "Ticket to ride": { "id": "9209", "name": "Ticket to Ride", "yearPublished": "2004" },
    "Timeline": { "id": "683", "name": "Timeline", "yearPublished": "1985" },
    "Top ten": { "id": "300905", "name": "Top Ten", "yearPublished": "2020" },
    "Unearth": { "id": "29971", "name": "Unearth", "yearPublished": "2006" },
    "Vidrado": { "id": "299159", "name": "Vidrado", "yearPublished": "2020" },
    "Village": { "id": "104006", "name": "Village", "yearPublished": "2011" },
    "Vintage": { "id": "87120", "name": "Vintage", "yearPublished": "2011" },
    "Viral": { "id": "194690", "name": "Viral", "yearPublished": "2017" },
    "War! Age of Imperialism": { "id": "2718", "name": "War! Age of Imperialism", "yearPublished": "2001" },
    "Wavelength": { "id": "2745", "name": "WaveLength", "yearPublished": "2001" },
    "Why First?": { "id": "131165", "name": "Why First?", "yearPublished": "2012" },
    "Wildlife": { "id": "3236", "name": "WildLife", "yearPublished": "2002" },
    "Wisdom of Solomon": { "id": "244452", "name": "Wisdom of Solomon", "yearPublished": "2018" },
    "Aventuras Fantasticas": { "id": "278004", "name": "Aventuras Fantásticas", "yearPublished": "2019" },
    "Blue Lion": { "id": "104555", "name": "The Blue Lion", "yearPublished": "2011" },
    "Castelo S. Jorge": { "id": "172938", "name": "O Castelo de S. Jorge", "yearPublished": "2010" },
    "Douro": { "id": "256380", "name": "Douro 1872", "yearPublished": "2018" },
    "Drunter  Druber": { "id": "167675", "name": "Drunter und drüber" },
    "Eight minute empire": { "id": "131366", "name": "Eight-Minute Empire", "yearPublished": "2012" },
    "El puerto fluvial": { "id": "129051", "name": "Le Havre: El Puerto Fluvial", "yearPublished": "2012" },
    "Evora": { "id": "339753", "name": "Évora", "yearPublished": "2022" },
    "Floresta Misteriosa": { "id": "204592", "name": "A Floresta Misteriosa", "yearPublished": "2016" },
    "HExplore it": { "id": "336896", "name": "HEXplore It: Hero Chest", "yearPublished": "2020" },
    "Japanese Islands": { "id": "287558", "name": "Imperial Settlers: Empires of the North – Japanese Islands", "yearPublished": "2019" },
    "Magellan Elcano": { "id": "329529", "name": "Magellan: Elcano", "yearPublished": "2021" },
    "Mille Fiori ": { "id": "346501", "name": "Mille Fiori", "yearPublished": "2021" },
    "O Misterio do marques do pombal": { "id": "62518", "name": "O mistério do Marquês de Pombal", "yearPublished": "2009" },
    "O Palacio do Marques": { "id": "242630", "name": "O Palácio do Marquês", "yearPublished": "2018" },
    "O Rei de Tóquio": { "id": "70323", "name": "O Rei de Tóquio", "yearPublished": "2011" },
    "OK Boomer": { "id": "325748", "name": "OK Boomer Trivia Game", "yearPublished": "2020" },
    "Pick a Pig": { "id": "123885", "name": "Pick-a-Dog", "yearPublished": "2012" },
    "Planet Unknown ": { "id": "258779", "name": "Planet Unknown", "yearPublished": "2022" },
    "Quacksalber": { "id": "244521", "name": "Die Quacksalber von Quedlinburg", "yearPublished": "2018" },
    "Quinto Imperio": { "id": "139842", "name": "Quinto Império", "yearPublished": "2013" },
    "Ratoeira": { "id": "184159", "name": "Elefun & Friends: Ratoeira", "yearPublished": "2013" },
    "Estoril 1942": { "id": "288378", "name": "Estoril 1942: Super Box", "yearPublished": "2019" },
    "That's a question": { "id": "226322", "name": "That's a Question!", "yearPublished": "2017" },
    "The Builders Antiquity": { "id": "161226", "name": "The Builders: Antiquity", "yearPublished": "2015" },
    "Trails of Tucana": { "id": "283864", "name": "Trails of Tucana", "yearPublished": "2019" },
}

const notFound = [
    "13 Beco da Traição",
    "Alien - starter set",
    "Codigo secreto - Imagens",
    "Deception - Murder in Hong kong",
    "Down force - Corrida de alto risco",
    "Draft and write - Records",
    "Dragon Scales",
    "Ekipas Eclipse",
    "Letraletra",
    "Mosteiro",
    "Escape room - Prison Island",
    "Potions Explosions",
    "Shark Park",
    "Shepherd Mess",
]

const collectGameIds = async (names) => {
    const games = [];
    //split the names into chunks to avoid too many parallel requests
    for (const name of names) {
        if (mappedGames[name] || notFound.includes(name)) {
            continue;
        }
        const game = await getGame(name);
        if (game) {
            const { type, ...gameLog } = game;
            console.log(`"${name}": ${JSON.stringify(gameLog)},`)
            games.push(game);
        }
        else {
            console.log("could not get: ", name)
        }
    }
}

const gameIds = Object.values(mappedGames).map(item => item.id);
function* chunks(array, n) {
    for (let i = 0; i < array.length; i += n) yield array.slice(i, i + n);
}
const result = [...chunks(gameIds, 20)];

const allGameDetails = []
for (const chunk of result) {
    const games = await bgg.thing({ id: chunk, stats: true })
    allGameDetails.push(...games.items);
}

console.log(allGameDetails)


//writeFileSync(`../src/gameDetails.json`, JSON.stringify(allGameDetails, null, 2));