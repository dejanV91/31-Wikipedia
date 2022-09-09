const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const input = document.querySelector(".search");
const searchBtn = document.querySelector(".btn");
const loading = document.querySelector(".loading-div");
const searchDiv = document.querySelector(".search-div");
const content = document.querySelector(".content-div");
const message = document.querySelector(".message");

searchDiv.addEventListener("submit", (e) =>{
    e.preventDefault();

    const fetchWiki = async (search) => {
        try{
            content.innerHTML= ""
            message.classList.remove("show")
            loading.classList.add("show");
            const response = await fetch(`${url}${search}`);
            const data = await response.json();
            return data.query.search
        }
        catch { 
            content.innerHTML= ""
            loading.classList.remove("show");
            message.classList.add("show")
            message.innerHTML = "Please Enter Valid Search Term"
        }

    }

    const display = async () => {
        let value = input.value;
        const data = await fetchWiki(value);
        if(data.length >= 1){
            content.innerHTML = data
                .map((item) => {
                    const {title, snippet, pageid} = item;
                    return `<a href="https://en.wikipedia.org/?curid=${pageid}">
                                <div class="single-content">
                                    <h2 class="single-title">${title}</h2>
                                    <p class="single-text">${snippet}</p>
                                </div>
                            </a>`
                })
                .join("");
            loading.classList.remove("show"); 
            message.classList.remove("show");
        }
        else {
            content.innerHTML = ""
            loading.classList.remove("show"); 
            message.innerHTML = "No Matching Results. Please Try Again."
            message.classList.add("show")
        }   
    }

    display();
});

