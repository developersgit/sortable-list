const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const richestPeople = [
    "Jeff Bezos",
    "Elon Musk",
    "Bernard Arnault",
    "Bill Gates",
    "Mark Zuckerberg",
    "Warren Buffett",
    "Larry Ellison",
    "Larry Page",
    "Sergey Brin",
    "Mukesh Ambani",
    "The Bottom Line",
];


const listItems = [];

let dragStartIndex;

createList();
function createList() {
    [...richestPeople]
    .map((el) => ({ value: el, sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement("li");
        
        listItem.setAttribute("data-index", index);

        listItem.innerHTML = `
            <span class="number"> ${index + 1} </span>
            <div class="draggable" draggable="true">
                <p class="person-name"> ${ person } </p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        
        listItems.push(listItem);

        draggableList.appendChild(listItem)
    });

    addEventListeners();
}



function dragStart() {
    // console.log('Event dragStart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}


function dragEnter() {
    // console.log('Event dragEnter');
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
    console.log('Event dragLeave');
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim();
        if (personName !== richestPeople[index]) {
            item.classList.remove('right')
            item.classList.add('wrong')
        } else {
            item.classList.remove('wrong')
            item.classList.add('right')
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll(".draggable-list li");

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('drop', dragDrop);
    })
}

checkBtn.addEventListener('click', checkOrder)