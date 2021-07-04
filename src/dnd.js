/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

addListeners(homeworkContainer);
homeworkContainer.style.width = '100%';
homeworkContainer.style.height = '100vh';
homeworkContainer.style.position = 'relative';

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let box = document.createElement('div');
    let size = getRandomSize();
    let position = getRandomCoords(size);

    box.classList.add('draggable-div');
    box.style.position = 'absolute';
    box.style.borderRadius = '5px';
    box.style.width = size.width + 'px';
    box.style.height = size.height + 'px';
    box.style.backgroundColor = getRandomColor();
    box.style.left = position.left + 'px';
    box.style.top = position.top + 'px';

    return box;

    function getRandomSize() {
        let width = Math.floor(Math.random() * 100 + 50);
        let height = Math.floor(Math.random() * 100 + 50);
        
        return {
            width: width,
            height: height
        };
    }

    function getRandomColor() {
        let color = '#';
        let colorLength = 6;
        let colorLetters = '0123456789ABCDEF';
        
        for (let i = 0; i < colorLength; i++) {
            color+=colorLetters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    function getRandomCoords(size) {
        let container = getComputedStyle(homeworkContainer);
        let left = Math.floor(Math.random() * (parseInt(container.width) - size.width));
        let top = Math.floor(Math.random() * (parseInt(container.height) - size.height));

        return {
            left: left,
            top: top
        }
    }
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', e => {
        let target = e.target;
        
        if (target.classList.contains('draggable-div')) {
            let targetSize = e.target.getBoundingClientRect();
            let shiftX = e.clientX - targetSize.left;
            let shiftY = e.clientY - targetSize.top;
            
            document.onmousemove = (e) => {
                target.style.left = e.clientX - shiftX + 'px';
                target.style.top = e.clientY - shiftY + 'px';
            };
            
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }     
        }
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    // addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
