
// Функции нажатия на клавиши
var a = document.getElementById('run');
a.onclick = function () {
    run()
}
var b = document.getElementById('reset');
b.onclick = function () {
    reset()
}
var log = []
var c = document.getElementById('log');
c.onclick = function () {
    downloadFile()
}


// Построение шахматной доски
var chessWrap = document.querySelector('.ch-wrap');
var i = 0, count = 0;
while (count < 8 * 8) {
    var item = document.createElement('div');
    chessWrap.appendChild(item);

    item.classList.add('ch-item');
    item.classList.add(`x${count % 8 + 1}y${9 - Math.floor(count / 8 + 1)}`)

    if (i && i % 2)
        item.classList.add(`ch-black`)

    i += ((i + 2) % 9) ? 1 : 2;
    count++;
}

// Функция сброса шахматной доски
function reset() {
    document.querySelector('.ch-wrap').innerHTML = '';
    var i = 0, count = 0;
    while (count < 8 * 8) {
        var item = document.createElement('div');
        chessWrap.appendChild(item);

        item.classList.add('ch-item');
        item.classList.add(`x${count % 8 + 1}y${9 - Math.floor(count / 8 + 1)}`)

        if (i && i % 2)
            item.classList.add(`ch-black`)

        i += ((i + 2) % 9) ? 1 : 2;
        count++;
    }
}

// Функция запуска
function run() {

    let numberArray = document.getElementById("numbers").value.split(" ");
    let figura = document.getElementById("figura").value.toLowerCase();
    if (
        numberArray.length != 4 ||
        isNaN(numberArray[0]) ||
        isNaN(numberArray[1]) ||
        isNaN(numberArray[2]) ||
        isNaN(numberArray[3])
    ) {
        var c = document.getElementById('rez')
        c.innerHTML = 'Вы ввели некорректные данные';
    }

    else {

        var c = document.getElementById('rez')
        c.innerHTML = '';

        document.querySelector(`.x${Number(numberArray[0])}y${Number(numberArray[1])}`).innerHTML = `<p class="blue">(${Number(numberArray[0])};${Number(numberArray[1])})</p>`;
        document.querySelector(`.x${Number(numberArray[2])}y${Number(numberArray[3])}`).innerHTML = `<p class="red">(${Number(numberArray[2])};${Number(numberArray[3])})</p>`;

        var af = az(numberArray);
        var bf = bz(numberArray, figura);
        var cf = cz(numberArray, figura, bz(numberArray, figura), az(numberArray));

        // Вывод результатов
        var chessWrap = document.querySelector('.rez');
        var item = document.createElement('div');
        chessWrap.appendChild(item);
        item.classList.add('.rezz');
        document.querySelector(`.rez`).innerHTML = `<p>Совпадают ли цвета полей - ${af} </br>Угрожает ли фигура полю (m,n) - ${bf} </br> ${cf}</p>`;
        log.push([`<p>Совпадают ли цвета полей - ${af} </br>Угрожает ли фигура полю (m,n) - ${bf} </br> ${cf}</p>`])

    }
}

// Функция решения задачи a
function az(numberArray) {

    // Проверка цвета 1-го поля
    let a = [];
    a[0] = Number(numberArray[0]);
    a[1] = Number(numberArray[1]);
    let aDark = true;

    if (a[0] == a[1]) aDark = true;
    else if ((a[0] % 2 != 0) && (a[1] % 2 != 0)) aDark = true;
    else if ((a[0] % 2 == 0) && (a[1] % 2 == 0)) aDark = true;
    else aDark = false;


    //Проверка цвета 2-го поля
    let b = [];
    b[0] = Number(numberArray[2]);
    b[1] = Number(numberArray[3]);
    let bDark = true;

    if (b[0] == b[1]) bDark = true;
    else if ((b[0] % 2 != 0) && (b[1] % 2 != 0)) bDark = true;
    else if ((b[0] % 2 == 0) && (b[1] % 2 == 0)) bDark = true;
    else bDark = false;

    //Вывод результата
    if (aDark == bDark) return true
    return false

}

//Функция решения задачи б
function bz(numberArray, figura) {

    let a = [];
    a[0] = Number(numberArray[0]);
    a[1] = Number(numberArray[1]);

    let b = [];
    b[0] = Number(numberArray[2]);
    b[1] = Number(numberArray[3]);

    //Проверка, угрожает ли фигура полю (m,n)
    switch (figura) {

        case 'ферзь':
            if (
                (a[0] == b[0] || a[1] == b[1]) ||
                ((a[0] - b[0]) == (a[1] - b[1]))
            ) return true
            return false
        case 'ладья':
            if (a[0] == b[0] || a[1] == b[1]) return true
            return false
        case 'слон':
            if ((Math.abs(a[0] - b[0])) == (Math.abs(a[1] - b[1]))) return true
            return false
        case 'конь':
            if (
                (a[1] + 2 == b[1] && ((a[0] + 1 == b[0]) || (a[0] - 1 == b[0]))) ||
                (a[1] - 2 == b[1] && ((a[0] + 1 == b[0]) || (a[0] - 1 == b[0]))) ||
                (a[1] - 1 == b[1] && ((a[0] + 2 == b[0]) || (a[0] - 2 == b[0]))) ||
                (a[1] + 1 == b[1] && ((a[0] + 2 == b[0]) || (a[0] - 2 == b[0])))
            ) return true
            return false

    }

}

//Функция решения задачи d
function cz(numberArray, figura, rezB, rezA) {

    if (rezB) return "Конь сможет достать до заданной клетки за 1 ход"

    let a = [];
    a[0] = Number(numberArray[0]);
    a[1] = Number(numberArray[1]);

    let b = [];
    b[0] = Number(numberArray[2]);
    b[1] = Number(numberArray[3]);

    switch (figura) {

        case 'ферзь':
            a[0] += b[0] - a[0]
            return `За два хода. Нужно встать на поле: (${a[0]},${a[1]})`
        case 'ладья':
            a[0] += b[0] - a[0]
            return `За два хода. Нужно встать на поле: (${a[0]},${a[1]})`
        case 'слон': {
            if (!rezA) return "невозможно т.к. разные цвета клеток"
            let aKlone = [...a]
            while (aKlone[0] != 8 && aKlone[1] != 1) {
                aKlone[0] += 1;
                aKlone[1] -= 1;
                if ((Math.abs(aKlone[0] - b[0])) == (Math.abs(aKlone[1] - b[1])))
                    return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            }
            let aKlone1 = [...a]
            while (aKlone1[0] != 8 && aKlone1[1] != 8) {
                aKlone1[0] += 1;
                aKlone1[1] += 1;
                if ((Math.abs(aKlone1[0] - b[0])) == (Math.abs(aKlone1[1] - b[1])))
                    return `За два хода. Нужно встать на поле: (${aKlone1[0]},${aKlone1[1]})`
            }
            let aKlone2 = [...a]
            while (aKlone2[0] != 1 && aKlone2[1] != 8) {
                aKlone2[0] -= 1;
                aKlone2[1] += 1;
                if ((Math.abs(aKlone2[0] - b[0])) == (Math.abs(aKlone2[1] - b[1])))
                    return `За два хода. Нужно встать на поле: (${aKlone2[0]},${aKlone2[1]})`
            }
            let aKlone3 = [...a]
            while (aKlone3[0] != 1 && aKlone3[1] != 1) {
                aKlone3[0] -= 1;
                aKlone3[1] -= 1;
                if ((Math.abs(aKlone3[0] - b[0])) == (Math.abs(aKlone3[1] - b[1])))
                    return `За два хода. Нужно встать на поле: (${aKlone3[0]},${aKlone3[1]})`
            }
        }
        case 'конь': {
            let aKlone = [...a]
            aKlone[0] += 2
            aKlone[1] += 1
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            aKlone[1] -= 2
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            aKlone[0] -= 1
            aKlone[1] -= 1
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            aKlone[1] += 4
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            aKlone[0] -= 2
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            aKlone[1] -= 4
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            aKlone[0] -= 1
            aKlone[1] += 1
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            aKlone[1] += 2
            if (
                ((aKlone[1] + 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 2 == b[1] && ((aKlone[0] + 1 == b[0]) || (aKlone[0] - 1 == b[0]))) ||
                    (aKlone[1] - 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0]))) ||
                    (aKlone[1] + 1 == b[1] && ((aKlone[0] + 2 == b[0]) || (aKlone[0] - 2 == b[0])))) &&
                (aKlone[0] >= 1 && aKlone[0] <= 8 & aKlone[1] >= 1 && aKlone[1] <= 8)
            ) return `За два хода. Нужно встать на поле: (${aKlone[0]},${aKlone[1]})`
            return "Конь не сможет за 2 хода достать до заданной клетки"
        }
    }

}

//Запись в log-файл
function downloadFile() {

    // То, что будет записано в файл
    let text = JSON.stringify({

        1 : log

    });
    downloadAsFile(text);

}
function downloadAsFile(data) {

    let a = document.createElement("a");
    let file = new Blob([data], { type: 'application/json' });
    a.href = URL.createObjectURL(file);

    // название файла и расширение
    a.download = 'log.txt';
    a.click();

}