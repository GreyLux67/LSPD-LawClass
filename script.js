// All lesson pages in order
const pages = [
    "dashboard",
    "constitution",
    "search",
    "traffic",
    "miranda",
    "caseLaw",
    "scenarios"
];

let currentPage = 0;

// Display a page
function showPage(id){

    // Hide every page
    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    // Show selected page
    document.getElementById(id).classList.add("active");

    // Highlight navigation button
    document.querySelectorAll(".nav").forEach(btn=>{
        btn.classList.remove("active");
    });

    document.querySelectorAll(".nav")[pages.indexOf(id)].classList.add("active");

    currentPage = pages.indexOf(id);

    updateProgress();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

// Next Lesson
function nextPage(){

    if(currentPage < pages.length-1){

        currentPage++;

        showPage(pages[currentPage]);

    }

}

// Previous Lesson
function previousPage(){

    if(currentPage > 0){

        currentPage--;

        showPage(pages[currentPage]);

    }

}

// Progress Bar
function updateProgress(){

    const percent = ((currentPage)/(pages.length-1))*100;

    document.getElementById("progressBar").style.width = percent + "%";

}

// Keyboard Controls
document.addEventListener("keydown",function(e){

    if(e.key==="ArrowRight" || e.code==="Space"){

        nextPage();

    }

    if(e.key==="ArrowLeft"){

        previousPage();

    }

});

// Initialize
showPage("dashboard");
