//previous page,next page ,displaying pokemons
const prevBtnE1 = document.getElementById("previous");
const nextBtnE1 = document.getElementById("next");
const pokemonCards= document.getElementById("pokemon-cards")

//pokemon type color

//first declare the fetch api to async funtion and retunrn to await function and console the api data,
const fetchApi=async url=>{
    return(await fetch(url)).json();
}
let previous,next=null;
const showData=async(url)=>{
    const data=await fetchApi (url)
    const results=data.results;
    const resultsLength=results.length;
    const list=[];
    previous=data.previous;
    next=data.next;
//for loop using and see my api data
    for(let i=0;i<resultsLength;i++){
        //list push
        list.push(fetchApi(results[i].url ))
    }
    //promise to all the displaydata
   Promise.all(list).then(data =>{
    console.log(data);
    display(data)


   })

}
//getting the data for assigning this values
   const display= async(data)=>{
    try{
       const dataLength= data.length; 
        for(let i=0;i<dataLength;i++) {
            const pokemonId =data[i].id;
            const pokemonName =data[i].name
            const pokemonImg=data[i].sprites.other['official-artwork'].front_default;
            const pokemonAbility=data[i].abilities[0].ability.name;
            const pokemonMoves=data[i].moves[0].move.name;
            const pokemonWeight=data[i].weight;
         //console.log( pokemonId,pokemonName,pokemonImg,pokemonAbility,pokemonMoves,pokemonWeight);
          
         //manipulation of html card container
         pokemonCards.innerHTML += `
         <div class="card" shadow-sm">
         <img src="${pokemonImg}" class="card-img-top p-3" alt="${pokemonName}">
         <div class="card-body">
           <div class="card-text pokemon-id d-flex justify-content-center">${pokemonId}</div>
           <h5 class="card-title  d-flex justify-content-left color-red">name:${pokemonName}</h5>
           <div class="card-text pokemon-ability d-flex justify-content-left ">Ability:${pokemonAbility}</div>
           <div class="card-text pokemon-moves d-flex justify-content-left "><h6>moves</h6>:<h6>${pokemonMoves}<h6></div>
           <div class="card-text pokemon-weight d-flex justify-content-left ">weight:${pokemonWeight}</div>
             </div>
       </div>  `




      //catching the errors
        }
    }catch(error){
        console.log("Error",error)
    }
   }
   //async function using button progress
const prevBtn=async()=>(previous !=null)? await showData(previous):  alert("lowest ID");
const nextBtn=async()=>(next !=null)? await showData(next):  alert("Highest ID")

prevBtnE1.addEventListener("click",prevBtn)
nextBtnE1.addEventListener("click",nextBtn)


showData(`https://pokeapi.co/api/v2/pokemon/`)
