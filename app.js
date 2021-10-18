
const btn1 = document.querySelector("#find"); 
const btn2 = document.querySelector("#clear");


//web scrape uygulaması yapılacak..
const scrape = (city) => {
    const data = null;
    const liste = []
    city = String(city);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE ) {
           
            let state = JSON.parse(this.response);
            if(!state.error){
                const ar = JSON.parse(this.responseText);

                let city = ar["location"]["name"];
                
                let weather = ar["current"]["condition"]["text"];
                liste.push(weather);
    
                let icon = ar["current"]["condition"]["icon"];
                liste.push(icon);
    
                let degree = ar["current"]["temp_c"];
                liste.push(degree);
                
                addHtml(liste);
            }          
            else{
                alert("hatalı veri girişi yapıldı..");
            }
        }
    }); 
    let url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q={}&days=3'.replace("{}",city);
    console.log(url);
    xhr.open("GET",url);
    xhr.setRequestHeader("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "c6c1caeb09msh88d40096a747a60p1cde22jsn1eaf65ff2611");  
    xhr.send(data);
}



//HTML yaratma 
let counter = 0;
const addHtml = async (liste) => {


    if(counter == 0){
    const main = document.querySelector(".container");

    const el = document.createElement("div");
    main.appendChild(el);
    el.classList.toggle("weather");
    

    const header = document.createElement("h1");
    el.appendChild(header);
    header.innerHTML = liste[0];

    const degree = document.createElement("span");
    el.appendChild(degree);
    degree.innerHTML = liste[2];
    
    
    const img = document.createElement("img");
    el.appendChild(img);
    img.src = liste[1];

    counter += 1 ;
    }
    else{
        const a = document.querySelector(".weather");
        a.remove();
        console.log(counter);
        counter -= 1;
        if(counter == 0){
            const main = document.querySelector(".container");

            const el = document.createElement("div");
            main.appendChild(el);
            el.classList.toggle("weather");

            const header = document.createElement("h1");
            el.appendChild(header);
            header.innerHTML = liste[0];
        
        
            const degree = document.createElement("label");
            el.appendChild(degree);
            degree.innerHTML = liste[2];
            
            
            const img = document.createElement("img");
            el.appendChild(img);
            img.src = liste[1];
        
            counter += 1 ;
            
            }
    }
}


btn1.addEventListener("click",(e) => {
    e.preventDefault();
    let input = document.querySelector("#input");
    var b = input.value;
    scrape(b);
    
})



btn2.addEventListener("click",(e) => {
    e.preventDefault();
    let input = document.querySelector("#input");
    input.value = "";
})