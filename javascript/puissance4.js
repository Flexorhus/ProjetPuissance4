let colonneCount = {
    c1: 1,
    c2: 1,
    c3: 1,
    c4: 1,
    c5: 1,
    c6: 1,
    c7: 1,
};
// Tour du joueur (impair pour Rouge, pair pour Jaune)
let turn = 1;
// Vérifie si un joueur a gagné en alignant quatre jetons verticalement
function checkVerticalWin(player) {
    for (let col = 1; col <= 7; col++) { // Parcours chaque colonne
        for (let row = 1; row <= 3; row++) { 
            if (
                // Vérifie les 4 cellules consécutives dans la colonne actuelle
                document.getElementById(`c${col}r${row}`).style.backgroundColor === player &&
                document.getElementById(`c${col}r${row + 1}`).style.backgroundColor === player &&
                document.getElementById(`c${col}r${row + 2}`).style.backgroundColor === player &&
                document.getElementById(`c${col}r${row + 3}`).style.backgroundColor === player
            ) {
                alert(`${player} gagne !`);
                location.reload();
            }
        }
    }
}

// Vérifie si un joueur a gagné en alignant quatre jetons horizontalement
function checkHorizontalWin(player) {
    for (let row = 1; row <= 6; row++) { // Parcours chaque ligne
        for (let col = 1; col <= 4; col++) { 
            if (
                // Vérifie les 4 cellules consécutives dans la ligne actuelle
                document.getElementById(`c${col}r${row}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 1}r${row}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 2}r${row}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 3}r${row}`).style.backgroundColor === player
            ) {
                alert(`${player} gagne !`);
                location.reload();
            }
        }
    }
}

// Vérifie si un joueur a gagné en alignant quatre jetons diagonalement (montante)
function checkDiagonalWinOne(player) {
    for (let col = 1; col <= 4; col++) { // Parcours chaque colonne jusqu'à la 4ème colonne
        for (let row = 1; row <= 3; row++) { 
            if (
                // Vérifie les 4 cellules consécutives en diagonale montante
                document.getElementById(`c${col}r${row}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 1}r${row + 1}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 2}r${row + 2}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 3}r${row + 3}`).style.backgroundColor === player
            ) {
                alert(`La ${player} team gagne !`);
                location.reload();
            }
        }
    }
}
// Vérifie si un joueur a gagné en alignant quatre jetons diagonalement (descente)
function checkDiagonalWinTwo(player) {
    for (let col = 1; col <= 4; col++) { // Parcours chaque colonne jusqu'à la 4ème colonne
        for (let row = 4; row <= 6; row++) {
            if (
                // Vérifie les 4 cellules consécutives en diagonale descente
                document.getElementById(`c${col}r${row}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 1}r${row - 1}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 2}r${row - 2}`).style.backgroundColor === player &&
                document.getElementById(`c${col + 3}r${row - 3}`).style.backgroundColor === player
            ) {
                alert(`La ${player} team gagne !`);
                location.reload();
            }
        }
    }
}

function checkDraw() {
    for (let col = 1; col <= 7; col++) {
        for (let row = 1; row <= 6; row++) {
            if (document.getElementById(`c${col}r${row}`).style.backgroundColor === "") {
                return false; // Il reste des cellules vides, donc pas encore d'égalité
            }
        }
    }
    alert("Match nul !");
    location.reload(); 
    return true;
}

// Écouteurs d'événements pour chaque colonne
document.querySelectorAll(".colonne").forEach((column) => {
    column.addEventListener("click", () => {
        let columnId = column.id;
        let counter = colonneCount[columnId];

        if (counter <= 6) { // Vérifie s'il reste de la place dans la colonne
            if (turn % 2 !== 0) { // Tour du joueur Rouge (impair)

                document.getElementById(`${columnId}r${counter}`).style.backgroundColor = "red";
                // Vérifie les conditions de victoire pour le joueur red
                checkVerticalWin('red');
                checkHorizontalWin('red');
                checkDiagonalWinOne('red');
                checkDiagonalWinTwo('red');

                document.getElementById("playerTurn").innerText = "Au tour des YELLOW BEE";

            } else { // Tour du joueur Jaune (pair)

                document.getElementById(`${columnId}r${counter}`).style.backgroundColor = "yellow";
                // Vérifie les conditions de victoire pour le joueur yellow
                checkVerticalWin('yellow');
                checkHorizontalWin('yellow');
                checkDiagonalWinOne('yellow');
                checkDiagonalWinTwo('yellow');

                document.getElementById("playerTurn").innerText = "Au tour des RED DEVILS";
            }
            // Incrémente le compteur de la colonne
            colonneCount[columnId]++;
            // Passe au tour suivant
            turn++;
            // Vérifie si la partie est nulle
            checkDraw();
        }
    });
});


