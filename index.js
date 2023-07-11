const url="https://restcountries.com/v3.1/lang/spanish";
let array = [];
function mostrarTodo(){
    fetch(url)
    .then(function(response){
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);

        data.forEach(function(item){
            const ob={
                "pais":item.name.common,
                "capital":item.capital[0],
                "region":item.region
            };
            array.push(ob);
        });
       
        console.table(array);
    })
    .catch(function(error){
        console.log(error);
    });
}

function addSessionStorage(){
    const datastring=JSON.stringify(array);
    sessionStorage.setItem("data",datastring);
}

function obtenerSessionStorage(){
    const datastring=sessionStorage.getItem("data");
    console.log("data-sessionStorage");
    if(datastring){
        console.table(JSON.parse(datastring));
        return JSON.parse(datastring);
    }
    else{
        return [];
    }    
}

//array=obtenerSessionStorage();
//console.table(obtenerSessionStorage());

function eliminarSessionStorage(){
    sessionStorage.removeItem("data");
}
