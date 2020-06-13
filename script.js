const bloks = document.querySelectorAll(".game div");
// с помощью квадратного корня нахожу строку
const row = Math.sqrt(bloks.length);
// распологаем игрока, для этого находим его позицию из всего количества блоков находим последнюю строку и делим ее пополам 
let playerIndex = Math.round(bloks.length - row / 2);
console.log(playerIndex);
let step = 1;

// отрисовываем врагов
const indexEnemies = [
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 74, 75
];

for (let i of indexEnemies) {
  bloks[i].classList.add('enemy');
}
// двигаем врагов
const moveEnemies = () => {
  // получаю самый левый элемент из массива indexEnemies, что бы посмотреть уперлись ли в левый край
  // например 23 / 20 (остаток от деления 3 и это не ранвно 0, что значит что в левый край не уперлись)
  const leftBlockEnemies = indexEnemies[0] % row === 0;
  // получаю самый правый элемент из массива indexEnemies что бы посмотреть уперлись ли в правый край
  // н-р 79 % 20 = 3(ocm 19) === 20 - 1 = 19
  // 19===19 значит уперлись в правый край
  const rightBlockEnemies = indexEnemies[indexEnemies.length - 1] % row === row - 1;

  if ((leftBlockEnemies && step === -1) || (rightBlockEnemies && step === 1)) {
    step = row;
  } else if (step === row) {
    step = leftBlockEnemies ? 1 : -1;
  }

  indexEnemies.forEach(index => {
    bloks[index].classList.remove('enemy');
  });

  for (let i = 0; i < indexEnemies.length; i++){
    indexEnemies[i] += step;
  }

  indexEnemies.forEach(index => {
    bloks[index].classList.add('enemy');
  });

//  проверка есть ли у игрока класс enemy, если да ьл значит враги столкнулись с кораблем
  if(bloks[playerIndex].classList.contains('enemy')){
    alert('GAME OVER!!!!');
    retutn;
  }

  // проверка столкнулись ли враги с первой строкой
  for (let i = 0; i <= indexEnemies.length; i++){
    if (indexEnemies[i] > bloks.length - row){
      alert('GAME OVER!!!!');
      retutn;
    }
  }
  setTimeout(moveEnemies, 100);
};

moveEnemies();
// отрисовываю игрока 
bloks[playerIndex].classList.add('player');

// двигаем игрока

const movePlayer = event => {
  bloks[playerIndex].classList.remove('player');

  if (event.code === 'ArrowLeft' && playerIndex > bloks.length - row) {
    playerIndex--;
  }
  if (event.code === 'ArrowRight' && playerIndex < bloks.length - 1) {
    playerIndex++;
  }
  bloks[playerIndex].classList.add('player');

};

document.addEventListener('keydown', movePlayer);