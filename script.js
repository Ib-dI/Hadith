console.log('connecté')

const hadeethBox = document.querySelector('.box-ha')
const btnFly = document.querySelector('.fly')
const bgFly = document.querySelector('.fus')
const btnPrev = document.querySelector('.prev')
const btnNext = document.querySelector('.next')

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

let nbId = []
let first = Math.floor(Math.random() * 52)


async function getId(i){
    try{
        let numOfIdPage = Math.floor(Math.random() * 5) + 1
        console.log(numOfIdPage)
        const reponseJSON = await fetch(`https://hadeethenc.com/api/v1/hadeeths/list/?language=fr&category_id=${numOfIdPage}&page=1&per_page=300`, requestOptions)
        
        const reponseJS = await reponseJSON.json()
        console.log(reponseJS.data)
        reponseJS.data.forEach(element => {
            nbId.push(element.id)
        });

        console.log(nbId.length)
        function limite(){
            return nbId.length
        }
        
        const rJSON = await fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=fr&id=${nbId[i]}`, requestOptions)
        const rJS = await rJSON.json()

        console.log(rJS.explanation)
        // console.log(rJS.title)
        // console.log(rJS.hadeeth)
        // console.log(rJS.attribution)
        hadeethBox.innerHTML = `
                                <p class= "ha-title">${rJS.title}</p>
                                <p class="hadeeth">${rJS.hadeeth}</p>
                                <p class= "attribution">${rJS.attribution}</p>
                                

        `
    // const btnPlus = document.querySelector('.plus')
     
    // btnPlus.addEventListener('click',()=>{
    //     const ex = document.createElement('div')
    //     ex.innerHTML = `
    //                     <p class= "explanation">${rJS.explanation}</p>
    //     `
    //     document.querySelector('.container').appendChild(ex)
        
    // })

    
    }
    catch(error){
        console.log(error)
    }
}
window.addEventListener('load',getId(first))


btnFly.addEventListener('click', ()=>{

    hadeethBox.classList.add("box-appear")
    btnNext.classList.add("box-appear")
    btnPrev.classList.add("box-appear")
    
    btnFly.remove()
    bgFly.remove()
    

})


btnNext.addEventListener('click', ()=>{
    
    first === 51 ? first = 1 : first++
    // console.log(first)
    getId(first)
})

btnPrev.addEventListener('click',()=>{
    first === 1 ? first = 51 : first--
    // console.log(first)
    getId(first)

})




