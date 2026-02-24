const games = [
  {
    id: 1,
    results: [
      { player: "Sophus", faction: "The Federation of Sol", points: null, winner: false },
      { player: "Peter", faction: "The Universities of Jol-Nar", points: null, winner: false },
      { player: "Magnus", faction: "The Xxcha Kingdom", points: null, winner: false },
      { player: "Frederik", faction: "The Emirates of Hacan", points: null, winner: false },
      { player: "Andreas", faction: "The Barony of Letnev", points: null, winner: false },
    ]
  },
  {
    id: 2,
    results: [
      { player: "Sophus", faction: "The Federation of Sol", points: 10, winner: true },
      { player: "Peter", faction: "The Universities of Jol-Nar", points: null, winner: false },
      { player: "Magnus", faction: "The Xxcha Kingdom", points: null, winner: false },
      { player: "Frederik", faction: "The Clan of Saar", points: null, winner: false },
      { player: "Andreas", faction: "The Barony of Letnev", points: null, winner: false }
    ]
  },
  {
    id: 3,
    results: [
      { player: "Sophus", faction: "The L1z1x Mindnet", points: 9, winner: false },
      { player: "Magnus", faction: "The Ghosts of Creuss", points: 9, winner: false },
      { player: "Frederik", faction: "The Yssaril tribes", points: 8, winner: false },
      { player: "Andreas", faction: "The Naalu Collective", points: 10, winner: true }
    ]
  },
   {
    id: 4,
    results: [
      { player: "Sophus", faction: "The Nekro Virus", points: 7, winner: false },
      { player: "Magnus", faction: "The Emirates of Hacan", points: 6, winner: false },
      { player: "Frederik", faction: "The Mentak Coalition", points: 8, winner: false },
      { player: "Andreas", faction: "The Barony of Letnev", points: 8, winner: false },
      { player: "Peter", faction: "The Yin Brotherhood", points: 10, winner: true }
    ]
  },
  {
    id: 5,
    results: [
      { player: "Sophus", faction: "The Nekro Virus", points: 10, winner: true },
      { player: "Magnus", faction: "The Nomad", points: 7, winner: false },
      { player: "Kewin", faction: "The Sardakk N'orr", points: 9, winner: false },
      { player: "Andreas", faction: "The Clan of Saar", points: 9, winner: false }
    ]
  },
  {
    id: 6,
    results: [
      { player: "Sophus", faction: "The Naaz-Rokha Alliance", points: 8, winner: false },
      { player: "Magnus", faction: "The Yssaril Coalition", points: 7, winner: false },
      { player: "Frederik", faction: "The Argent Flight", points: 7, winner: false },
      { player: "Andreas", faction: "The Clan of Saar", points: 10, winner: true },
      { player: "Peter", faction: "The Universities of Jol-Nar", points: 7, winner: false },
      { player: "Kewin", faction: "The Vuil'raith Cabal", points: 3, winner: false }
    ]
  },
  {
    id: 7,
    results: [
      { player: "Sophus", faction: "The Nekro Virus", points: 7, winner: false },
      { player: "Magnus", faction: "The L1z1x Mindnet", points: 3, winner: false },
      { player: "Frederik", faction: "The Xxcha Kingdom", points: 5, winner: false },
      { player: "Andreas", faction: "The Argent Flight", points: 6, winner: false },
      { player: "Jonathan", faction: "The Emirates of Hacan", points: 8, winner: false },
      { player: "Kewin", faction: "The Barony of Letnev", points: 10, winner: true }
    ]
  },
  {
    id: 8,
    results: [
      { player: "Sophus", faction: "The Mahact Gene-Sorceres", points: 7, winner: false },
      { player: "Julius", faction: "Sardakk N'orr", points: 7, winner: false },
      { player: "Jonas", faction: "The Emirates of Hacan", points: 7, winner: false },
      { player: "Andreas", faction: "The Federation of Sol", points: 9, winner: false },
      { player: "Jonathan", faction: "The Clan of Saar", points: 6, winner: false },
      { player: "David", faction: "The Winnu", points: 10, winner: true }
    ]
  },
  {
    id: 9,
    results: [
      { player: "Sophus", faction: "The Vuil'raith Cabal", points: 8, winner: false },
      { player: "David", faction: "The Embers of Muaat", points: 6, winner: false },
      { player: "Halfdan", faction: "Last Bastion", points: 8, winner: false },
      { player: "Andreas", faction: "The Deepwrought Scholarate", points: 8, winner: false },
      { player: "Magnus", faction: "The Ral Nel Consortium", points: 10, winner: true }
    ]
  },
];

// Beregn Player stats og sorter efter bedste gennemsnit
const playerStats = {};

games.forEach(game => {
  game.results.forEach(r => {
    if (!playerStats[r.player]) {
      playerStats[r.player] = {
        wins: 0,
        factionsWon: new Set(),
        totalPoints: 0,
        gamesWithPoints: 0
      };
    }

    if (r.points !== null && r.points !== undefined) {
      playerStats[r.player].totalPoints += r.points;
      playerStats[r.player].gamesWithPoints++;
    }

    if (r.winner) {
      playerStats[r.player].wins++;
      playerStats[r.player].factionsWon.add(r.faction);
    }
  });
});

// Lav HTML-tabel for spillere sorteret efter avgPoints
let playerHtml = "<h2>Player Stats</h2>";
playerHtml += "<table><tr><th>Player</th><th>Wins</th><th>Factions Won With</th><th>Avg Points</th></tr>";

// Konverter playerStats til array
const playerArray = Object.entries(playerStats).map(([player, stats]) => {
  const avg = stats.gamesWithPoints > 0 ? (stats.totalPoints / stats.gamesWithPoints) : 0;
  return { player, wins: stats.wins, factionsWon: [...stats.factionsWon], avgPoints: avg, gamesWithPoints: stats.gamesWithPoints };
});

// Sortér descending efter avgPoints
playerArray.sort((a, b) => b.avgPoints - a.avgPoints);

playerArray.forEach(p => {
  const avgDisplay = p.gamesWithPoints > 0 ? p.avgPoints.toFixed(2) : "N/A";
  playerHtml += `<tr>
    <td>${p.player}</td>
    <td>${p.wins}</td>
    <td>${p.factionsWon.join(", ")}</td>
    <td>${avgDisplay}</td>
  </tr>`;
});

playerHtml += "</table>";
document.getElementById("playerStats").innerHTML = playerHtml;