(function(){
	

// Variablen deklarieren	
	let imgMix, max;
    let z;
    let img1,img2;
    let pairs;
    let klicks ;
    let startZeit;

// Functionen	
	function initVaris(){
        max          = 16 ; //anzahl die squers
        imgMix       = imgMixer(loadImgSet()) ;
        z            = 0 ;
        img1         = null ;
        img2         = null ;
        pairs        = 0 ;
        klicks       = 0 ;
        startZeit    = null ;
        el("#klicks").innerHTML ="" ;
        el("#zeit").innerHTML ="" ;

    }
    function createField(){
        let img ;
        for (let i = 0 ;i < max ; i++){
                img = create("img");
                // img.src = "img_1/memory_1.gif";
                img.setAttribute("src","img_1/memory_1.gif");//صورة وحدة للكل

                img.setAttribute("data-index",i);//مشان يعرف رقم الخلية
                img.addEventListener("click",checkImg);
                el("#game").appendChild(img);
        }

    };

function loadImgSet(){
    let set   = [];
    let pool  = []; //سورسات الصور كلخا
    for(let i = 1 ; i < 26 ; i++ ){
            pool.push(`img_1/p_${i}.gif`);
        }
        
    let index ;
        for(let i = 0 ; i < max / 2 ; i ++ ){
                index = Math.floor(Math.random() * pool.length );
                img = pool[index];
                pool.splice(index,1);
                set.push(img);
                set.push(img);

        };
        
    return set;
};

function imgMixer(array){
    let copyArray = [...array];
    let mix = [];
    let n = copyArray.length;
    let index ;
        for(let i = 0 ; i < n ; i ++){
            index = Math.floor( Math.random() * copyArray.length );
            mix.push( copyArray.splice(index,1)[0] ) ;

        }

    return mix;
}

// spiel - logik
function checkImg(){
    klicks ++;
    el("#klicks").innerHTML = "klicks sind = (" + klicks + ") klicks";
    if (klicks === 1 ) {
        startZeit = new Date();
    }

    z ++;
    // ال z النئرة الاولى ولا التانية//
    if (z === 1) {
        img1 = this;
        this.removeEventListener("click",checkImg);
        let index = parseInt( this.getAttribute("data-index") );
        this.src = imgMix[index];
    }
    
    
    if (z === 2) {
        img2 = this;
        this.removeEventListener("click",checkImg);
        let index = parseInt( this.getAttribute("data-index") );
        this.src = imgMix[index];
        if (img1.src === img2.src ){
            pairs ++;
            soundPlay("sound/mp3/spawn.mp3");
            
            if (pairs === max /2){
                // Spiel Ende
                
                let stopZeit = new Date();
                let diff =Math.floor((stopZeit - startZeit ) / 1000);
                el("#zeit").innerHTML = "Ihre Zeit ist - " + diff +" - Sekunden";
                group("#game img").forEach((val,index)=>{
                    val.src = imgMix[index];
                    el("#klicks").innerHTML = " Sie haben (" + klicks + ") klicks gemacht --Game Over--";
                    el("#start").style.display = "block";
                });
                
             }else{setTimeout(function(){
                img1.src = "img_1/wow.gif";
                img2.src = "img_1/wow.gif";
                z = 0;
                 },400);}
             
            
        }else{ //img1.src !=== img2.src 
            setTimeout(function(){
                img1.src = "img_1/memory_1.gif";
                img2.src = "img_1/memory_1.gif";
                img1.addEventListener("click",checkImg);
                img2.addEventListener("click",checkImg);
                z = 0;

            },400);
        }
        
    }
};


// Zuweisen und Ausführen	
	
function newgame(){
    soundPlay("sound/mp3/ende.mp3");
    initVaris();
    group("#game img").forEach((val) => {
        val.src="img_1/memory_1.gif";
        val.addEventListener("click",checkImg);
    } );


    el("#start").style.display = "none";
}

function soundPlay(path){
    let sound = new Audio(); 
    sound.src = path;
    sound.play();
}
initVaris();
createField();
loadImgSet();
el("#start").addEventListener("click",newgame);

}());


// let names = ["Aboud","Hani","Sami","Hani"];
  
// for (let x in names){
//   console.log(" Name = " +x);
// }


// let namesobj = {
// firstname :"Aboud",
// lastname:"Tawil",
// name:"Hani",
// A:"Basel"
// };
  
// for (let key in namesobj){
//   console.log(namesobj[key]);
// }


