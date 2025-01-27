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
    "13 Beco da Traição": "1899",
    "2491 Planetship": "266102",
    "7 Wonders Duel": "173346",
    "7 Wonders": "68448",
    "A cabana abandonada": "203420",
    "A Ilha proibida": "65244",
    "A nossa casa": "194880",
    "Abalone": "526",
    "Akropolis": "357563",
    "Aqualin": "295948",
    "Arraial": "246150",
    "Aventuras Fantasticas": "278004",
    "Baby blues": "155157",
    "Battle Cry": "551",
    "Blue Lion": "104555",
    "Boomerang": "254213",
    "Boss monster": "174973",
    "Bot factory": "328124",
    "Cactus": "268255",
    "Call to adventure": "238992",
    "Camel Up": "153938",
    "Captain Flip": "393325",
    "Caravelas": "72131",
    "Carcassonne": "822",
    "Caretos": "290367",
    "Carrossel": "252712",
    "Cartographers": "263918",
    "Castelo S. Jorge": "172938",
    "Castle Party": "323614",
    "Cat Lady": "228504",
    "Catan": "13",
    "Celtae": "374200",
    "Civilization": "30333",
    "Clube detective": "256788",
    "Cluedo": "1294",
    "Codigo secreto - Imagens": "198773",
    "Combo Cone Paradise": "342704",
    "Coup": "1653",
    "D. Afonso Henriques": "168900",
    "Deception - Murder in Hong kong": "156129",
    "Diplomacy": "483",
    "Dirty Money": "42596",
    "Disciple Detective": "297735",
    "Dixit": "39856",
    "Douro": "256380",
    "Downforce": "215311",
    "Draft and write - Records": "350185",
    "Dragonscales": "283748",
    "Drunter  Druber": "19",
    "Eight minute empire": "131366",
    "El puerto fluvial": "129051",
    "Era uma vez": "220780",
    "Estoril 1942": "288378",
    "Evergreen": "363307",
    "Evo": "1159",
    "Evolution": "155703",
    "Evora": "339753",
    "F1": "38885",
    "Faraway": "168949",
    "Fiesta de los muertos": "285253",
    "Floresta Misteriosa": "204592",
    "FlussFieber": "38548",
    "Formula D": "37904",
    "Gardens": "153422",
    "Garum": "282918",
    "Gods of Rome": "364689",
    "HExplore it": "336896",
    "History of the World": "235591",
    "Hook!": "147685",
    "I Love Portugal": "190828",
    "Illusion": "244995",
    "Istanbul": "148949",
    "Japanese Islands": "287558",
    "Kamisado": "38545",
    "Kingdomino": "204583",
    "Klash": "202253",
    "Kokopelli": "322195",
    "La cucaracha": "137909",
    "Lata": "374201",
    "Letra Letra": "295757",
    "Lost Cities": "42487",
    "Love Letter": "129622",
    "Lunaris 45": "380915",
    "Magellan Elcano": "329529",
    "MicroMacro: Crime City": "318977",
    "Mille Fiori ": "346501",
    "Mindtrap II": "5425",
    "Mistakos": "292908",
    "Modern Art": "40381",
    "Moesteiro": "364042",
    "Monopoly": "1406",
    "Monster Lands": "209001",
    "Mysthea": "242653",
    "New york 1901": "174660",
    "Nidavellir": "293014",
    "Nuts!": "96188",
    "O Misterio do marques do pombal": "62518",
    "O Palacio do Marques": "242630",
    "O Rei de Tóquio": "70323",
    "OK Boomer": "325748",
    "On Tour": "251412",
    "One key": "263155",
    "OverBoss": "310192",
    "Papua": "255034",
    "Passa o Desenho": "46213",
    "Pega Bicho": "220778",
    "Pessoa": "309728",
    "Pick a Pig": "123885",
    "Planet Unknown ": "258779",
    "Porto": "254619",
    "Potions Explosion": "180974",
    "Quacksalber": "244521",
    "Quicksand": "396655",
    "Quinto Imperio": "139842",
    "Quoridor": "624",
    "Ragami": "114863",
    "Ratoeira": "184159",
    "Red 7": "161417",
    "Reis de Portugal": "164091",
    "Rey de 12": "302917",
    "Rhino Hero": "91514",
    "Rossio": "276633",
    "Saboteur": "9220",
    "Sagrada": "107448",
    "Salem 1692": "175549",
    "Scattergories": "2381",
    "Scotland Yard": "438",
    "Selva": "31487",
    "Sequence": "2375",
    "Shark Park": "14511",
    "Shepherd Mess": "3057744",
    "So Clover!": "329839",
    "Space Base": "242302",
    "Spaghetti": "206802",
    "Splendor": "148228",
    "Star Wars X-wing": "252328",
    "Terra Mare": "336929",
    "Terra": "8671",
    "Terraforming Mars": "167791",
    "That's a question": "226322",
    "That's not a Hat": "375651",
    "The Builders Antiquity": "161226",
    "The Resistance": "41114",
    "The Vale of Eternity": "385529",
    "Three Sisters": "291845",
    "Ticket to ride": "9209",
    "Timeline": "128664",
    "Top ten": "300905",
    "Trails of Tucana": "283864",
    "Unearth": "217085",
    "Vidrado": "299159",
    "Village": "104006",
    "Vintage": "87120",
    "Viral": "194690",
    "War! Age of Imperialism": "2718",
    "Wavelength": "2745",
    "Why First?": "131165",
    "Wildlife": "3236",
    "Wisdom of Solomon": "244452",
}

const notFound = [
    "Alien - starter set",
    "Ekipas Eclipse",
    "Escape room - Prison Island",
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

const gameIds = Object.values(mappedGames);
function* chunks(array, n) {
    for (let i = 0; i < array.length; i += n) yield array.slice(i, i + n);
}
const result = [...chunks(gameIds, 20)];

const allGameDetails = []
for (const chunk of result) {
    const games = await bgg.thing({ id: chunk, stats: true })
    allGameDetails.push(...games.items);
}

writeFileSync(`./src/gameDetails.json`, JSON.stringify(allGameDetails, null, 2));