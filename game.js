var text;
var moneyText;
var stockText;
var aSockText;
var soldText;

var socks= 0;// sets the ammount of socks made in total to 0 when you start
var aClips = 0;// sets amout of auto clickers to 0 when you start
var money = 0; // sets money to 0 when you start
var inventory = 0;// sets amount of product to 0 when you start
var chance = 3;

var price = 1.00; // selling price
var demand = 0.65;// chance of sale
var keysPressed = []

var end = false;



window.addEventListener('load', startGame);


function startGame(){

        text =  document.getElementById('aSockText');
        moneyText = document.getElementById ('money')
        stockText = document.getElementById ('stock')
        aSockText = document.getElementById ('aclip')
        soldText= document.getElementById ('soldText')


        window.setInterval(function(){ update(); }, 1000/10);
}

addEventListener("keydown", function (e){
    keysPressed[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysPressed[e.keyCode];
}, false);
/** 
 * Making the clips function
*/
function makeClip(){
    if(end){
        return;
    }
    inventory+=1;
    socks+=1;
}
/** 
 * Once money is at £10 you can buy the auto clicker
*/

function autoClip(){
    if(end){
        return;
    }
    if(money>10){
        money-=10
        aClips+=0.5;
    }
}
/** 
 * process of selling each sock
*/
function sell(){
    if(end){
        return;
    }
    if(demand>Math.random()){
        var num = Math.floor(Math.random()* 10)+1;

        if(num>chance){return;}
    
        if(inventory>=1){
            inventory-=1;
            money+=price;
        }
    }
}


//update and redraw
/** 
 * checks for an update
 * 
 * cheats and keys pressed should be put here
*/
function update(){
    if(end){
        return;
    }

    if(socks >4e19){
        console.log("No more space for socks in this universe")
        end = true;
        document.getElementById("end").style.display = "block"
    }

    if(end){
        return;
    }

    if (84 in keysPressed && 89 in keysPressed) {

        money+=1000;
        console.log("You have found a cheat, dont abuse this!")
    }


    socks+=aClips;
    inventory+=aClips;

    text.innerHTML = "Amount of socks made: " + Math.floor(socks); 
    soldText.innerHTML = "Amount of socks sold: " + (Math.floor(socks)-Math.floor(inventory)); 
    moneyText.innerHTML = "Total Funds: £" + (money.toFixed(2));
    stockText.innerHTML = "Amount of socks in stock: " + Math.floor(inventory)
    aSockText.innerHTML = 'Amount of Socky Sock creation mashens: ' + Math.floor(aClips*2);

    var x = document.getElementById("auto").style;
        if(money<10){
            x.display = "";
        }else{
            x.display = 'block';
        }

        sell();
}
 /**
 * This function allows for the user to increase the price of each pair of socks sold
 * 
 * Can be left and not clicked and the price will be £!.00 per sale and demand will be 65%
 */
function increaseprice (){
  
    if (demand >0){
    
    demand -=0.01
    price = 1 - demand;
    }
    else{
        price+=0.05;
        if (price>0){price = 0
        demand = 0.0;}
    }
    //Capping the demand becuase you can't go past 0% demand

    //console.log("PRICE:" + price.toFixed(2)) //not needed when code is working
    //console.log ("DEMAND: " + demand.toFixed(2)); //not needed when code is working
    
    document.getElementById("demand").innerHTML = "Demand of product: " + (demand*100).toFixed(2) + "%";
    document.getElementById("Price").innerHTML = "Price per product sold: " + (price*1).toFixed(2) + "p";
} 
    /**
 * This function allows for the user to decrease price of each pair of socks sold
 * 
 * Can be left and not clicked and the price will be £!.00 per sale and demand will be 65%
 */
  
function decreaseprice (){
    if(demand <0.99){
    
    demand +=0.01;
    price = 1 - demand;

   }
    else {
       if(demand>0){
        price-=0.05;   
       }
       
       if (price<0.01){price =0.01} //bugs without this line (gives money away)
       demand = 1.0; 
   
   }    //Capping the demand becuase you cant have 110% chance of selling
   
    //console.log("PRICE:" + price.toFixed(2)); //not needed when code is working
    //console.log ("DEMAND: " + demand.toFixed(2)); //not needed when code is working


    
  

   document.getElementById("demand").innerHTML = "Demand of product: " + (demand*100).toFixed(2) + "%";
   document.getElementById("Price").innerHTML = "Price per product sold: " + (price*100).toFixed(2) + "p";
}
