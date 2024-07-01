// Dom (Document Object Model)

window.onload = function() {

// id가 stat인 엘리먼트
// const stat = document.getElementById("stat");
const stat = document.querySelector("#stat");
console.log(stat);

console.log(stat.dataset.userName);
console.log(stat.dataset.userLevel);

// dataset 변경
stat.dataset.userLevel = 'normal'
console.log(stat.dataset.userLevel);

const ul = document.querySelector("ul");
console.log(ul.childNodes.length); // TextNodes 포함(공백포함)
for (const each of ul.childNodes) {
    console.log('==='+each+'===');    
}
console.log(ul.children.length); // 5 ElementNodes
for (const each of ul.children) {
    console.log('==='+each+'===');    
}

// firstChild, lastChild, nextSibling, previousSibling
// : 모든 노드를 다 탐색
// firstElementChild, lastElementChild, nextElementSibling, previousElementSibling
// : 엘리먼트노드만 탐색

console.log(ul.firstChild.nextSibling); // 딸기 다음인 포도가 나올 것 같으나 딸기가 나옴. 즉 딸기 앞에 공백이 있다.
console.log(ul.firstElementChild); // 딸기
console.log(ul.firstElementChild.nextElementSibling); // 포도

}