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

function showPage(id){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".nav").forEach(btn=>{
        btn.classList.remove("active");
    });

    document.querySelectorAll(".nav")[pages.indexOf(id)].classList.add("active");

    currentPage = pages.indexOf(id);

    document.getElementById("progressBar").style.width =
        ((currentPage)/(pages.length-1))*100 + "%";
}

// Show first page
showPage("dashboard");

// Automatically advance every 5 seconds
setInterval(function(){

    currentPage++;

    if(currentPage >= pages.length){
        currentPage = 0;
    }

    showPage(pages[currentPage]);

}, 5000);
