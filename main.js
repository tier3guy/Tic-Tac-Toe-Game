const box1 = document.getElementById("00");
const box2 = document.getElementById("01");
const box3 = document.getElementById("02");
const box4 = document.getElementById("10");
const box5 = document.getElementById("11");
const box6 = document.getElementById("12");
const box7 = document.getElementById("20");
const box8 = document.getElementById("21");
const box9 = document.getElementById("22");

var counter = 0;

var board = new Array(3);
for(var i=0 ; i<board.length ; i++){
    board[i] = new Array(3);
}
var st = 100;
for(var i=0;i<3;i++){
    for(var j=0; j<3;j++){
        board[i][j] = st;
        st++;
    }
}

document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', event => {
        var flag = true;
        var idgotClick = item.id;
        var j = idgotClick%10;
        var i = Math.trunc(idgotClick/10);
        
            if(counter%2 == 0){
                if(item.innerHTML != ""){
                    document.getElementById("alert-para").innerHTML = "You can't Change the Previous value !"
                    document.getElementById("ok").innerHTML = "Okay !"
                    document.getElementById("custom-alert").style.visibility = "visible";
                    document.getElementById("ok").addEventListener("click",() => {
                    document.getElementById("custom-alert").style.visibility = "hidden";
                    });
                }
                else{
                    item.innerHTML = "X";
                    board[i][j] = 1;
                    if(checkWin(i,j)){
                        flag = false;
                        document.getElementById("alert-para").innerHTML = "Congrats ! X Won"
                        document.getElementById("ok").innerHTML = "Start Again !"
                        document.getElementById("custom-alert").style.visibility = "visible";
                        document.getElementById("ok").addEventListener("click",reloadFunc);
                    }
                    else{
                        if(checkWinDiagonally(i,j,idgotClick)){
                            flag = false;
                            document.getElementById("alert-para").innerHTML = "Congrats ! X Won"
                            document.getElementById("ok").innerHTML = "Start Again !"
                            document.getElementById("custom-alert").style.visibility = "visible";
                            document.getElementById("ok").addEventListener("click",reloadFunc);
                        }
                    }
                    counter++;
                }
            }
            else{
                if(item.innerHTML != ""){
                    document.getElementById("alert-para").innerHTML = "You can't Change the Previous value !"
                    document.getElementById("ok").innerHTML = "Okay !"
                    document.getElementById("custom-alert").style.visibility = "visible";
                    document.getElementById("ok").addEventListener("click",() => {
                    document.getElementById("custom-alert").style.visibility = "hidden";
                    });
                }
                else{
                    item.innerHTML = "O";
                    board[i][j] = 2;
                    if(checkWin(i,j)){
                        flag = false;
                        document.getElementById("alert-para").innerHTML = "Congrats ! O Won"
                        document.getElementById("ok").innerHTML = "Start Again !"
                        document.getElementById("custom-alert").style.visibility = "visible";
                        document.getElementById("ok").addEventListener("click",reloadFunc);
                    }
                    else{
                        if(checkWinDiagonally(i,j,idgotClick)){
                            flag = false;
                            document.getElementById("alert-para").innerHTML = "Congrats ! O Won"
                            document.getElementById("ok").innerHTML = "Start Again !"
                        document.getElementById("custom-alert").style.visibility = "visible";
                        document.getElementById("ok").addEventListener("click",reloadFunc);
                        }
                    }
                    counter++;
                }
            }

            if(counter == 9 && (flag == true)){
                document.getElementById("custom-alert").style.visibility = "visible";
            }
    })
  })

checkWin = (i , j) => {
    var tocheck = board[i][j];

    var againCheck = false;
    for(var k=0;k<3;k++){
        if(board[i][k] != tocheck){
            againCheck = true;
        }
    }
    if(againCheck){
        var temp = true;
        for(var k=0;k<3;k++){
            if(board[k][j] != tocheck){
                temp = false;
                return false;
            }
        }
        return true;
    }
    else{
        return true;
    }
}

checkWinDiagonally = (i , j , idgotClick) => {

    if(idgotClick == 00 || idgotClick == 11 || idgotClick == 22 || idgotClick == 02 || idgotClick == 20){
        var tocheck = board[i][j];
        if(idgotClick == 00 || idgotClick == 22){
            var ith = 0;
            var jth = 0;
            for(var k=0;k<3;k++){
                if(board[ith][jth] != tocheck){
                    return false;
                }
                ith++; 
                jth++;
            }
            return true;

        }
        else if(idgotClick == 11){
            var ith = 2;
            var jth = 0;
            var temp = false;
            for(var k=0;k<3;k++){
                if(board[ith][jth] != tocheck){
                    temp = true;
                }
                ith--; 
                jth++;
            }
            if(temp){
                ith = 0;
                jth = 0;
                for(var k=0;k<3;k++){
                    if(board[ith][jth] != tocheck){
                        return false;
                    }
                    ith++; 
                    jth++;
                }
                return true;
            }
        }
        else{
            var ith = 2;
            var jth = 0;
            for(var k=0;k<3;k++){
                if(board[ith][jth] != tocheck){
                    return false;
                }
                ith--; 
                jth++;
            }
            return true;
        }
    }

    return false;
    
}

reloadFunc = () => {
    window.location.reload();
}
