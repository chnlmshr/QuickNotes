shownotes()

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",(e)=>{
    let addTxt = document.getElementById("addTxt");
    let addName = document.getElementById("addName");
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push({text: addTxt.value, name: addName.value});
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value = "";
    addName.value = "";

    shownotes();
});

function shownotes() {
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        if(!notesObj[index].marked){
        html += `
        <div class="NoteCard my-2 mx-5 card" style="width: 17rem;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${element.name} </h5>
          <p class="card-text"> ${element.text}</p>
          <div class="mt-auto" >
          <button id = "${index}" onclick = "deleteNote(this.id)" class="mr-2 btn btn-primary">Delete Note</button>
          <button id = "${index}" onclick = "markNote(this.id)" class="ml-5 btn btn-light"><i class="far fa-star"></i></button>
          </div>
        </div>
        </div>
        `
        }
        else{
            html += `
        <div class="NoteCard my-2 mx-5 card" style="width: 17rem;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${element.name} </h5>
          <p class="card-text"> ${element.text}</p>
          <div class="mt-auto" >
          <button id = "${index}" onclick = "deleteNote(this.id)" class="mr-2 btn btn-primary">Delete Note</button>
          <button id = "${index}" onclick = "markNote(this.id)" class="ml-5 btn btn-light"><i class="fas fa-star" style="color: #ffd700"></i></button>
          </div>
        </div>
        </div>
        `
        }
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = "";
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}

function markNote(index) {
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    if(!notesObj[index].marked)
    notesObj[index].marked = true;
    else notesObj[index].marked = false;
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let NoteCards = document.getElementsByClassName("NoteCard");
    Array.from(NoteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardName = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)||cardName.includes(inputVal)){
            element.style.display = "flex";
        }
        else{
            element.style.display = "none";
        }
    })
})

let filter = document.getElementById("filter");
filter.addEventListener("click",function(){
    let NoteBody = document.getElementsByClassName("NoteCard");
    Array.from(NoteBody).forEach(function(element){
        if(element.lastElementChild.lastElementChild.lastElementChild.lastElementChild.classList.contains("fas")){
            element.style.display = "flex";
        }
        else{
            if(!element.style.display || element.style.display === "flex")
            element.style.display = "none";
            else element.style.display = "flex"
        }
    })
})
