const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const input = document.querySelector(".search");
const searchBtn = document.querySelector(".btn");
const loading = document.querySelector(".loading-div");
const searchDiv = document.querySelector(".search-div");
const content = document.querySelector(".content-div");

searchDiv.addEventListener("submit", (e) =>{
    e.preventDefault();
    loading.classList.add("show");

    const fetchWiki = async (search) => {
        if(search !== ""){
            console.log(search);
            const response = await fetch(`${url}${search}`);
            const data = await response.json();
            return data.query.search
        }
        else {
            content.innerHTML = "Please Enter Valid Search Term"
        }

    }

    const display = async () => {
        let value = input.value;
        
        const data = await fetchWiki(value);
        console.log(data);

        loading.classList.remove("show");
    }

    display();
});

