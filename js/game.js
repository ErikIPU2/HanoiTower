var tam
var t1 = [];
var t2 = [];
var t3 = [];


//indica qual torre vai estar selecionada
var selection = -1;

function startGame() {
    // pega o tamanho da torre
    tam = $("#towerLeng").val();

    // verifica se o valor digitado é 0
    if (!tam) {
        M.toast({ html: "Digite o tamanho da torre!" })
    }

    else {
        // Gera os valores da torre
        var auxTG = 0;

        for (var i = 0; i < tam; i++) {
            if (i < 1) {
                auxTG = 1;
                t1.push(auxTG);
            }
            else {
                auxTG += 2;
                t1.push(auxTG);
            }
            // t2.push(0);
            // t3.push(0);
        }
        // 
        $("#inputTela").hide();
        $("#gameTela").show();
        selection = -1;
        RENDER([t1, t2, t3]);
    }
}

//renderiza a matriz de torres
function RENDER(towers) {
    for (var index = 0; index < 3; index++) {

        var prop = [];

        let dif = tam - towers[index].length
        
        for (var i = 0; i < towers[index].length; i++) {

            var preGrap = "";

            for (var j = 0; j < towers[index][i]; j++) {
                preGrap += "&lhblk;";
            }

            prop.push(preGrap + "<br>");

        }

        var rendered = "";

        for (var i = 0; i < prop.length; i++) {
            rendered += prop[i];
        }

        for (var i = 0; i < dif; i++) {
            rendered = "<br>" + rendered;
        }
        

        $("#Tower" + (index + 1)).html(rendered);

    }
}

//faz a seleção das torres e indica quais vão mover
function selec(elem, number) {
    if (selection == -1) {
        $(elem).addClass("green darken-1");
        selection = number;
    }
    else if (selection == number) {
        M.toast({html: `<strong>Torre ${number+1} descelecionada</strong>`})

        $(elem).removeClass("green darken-1");
        selection = -1;
    }
    else {
        mover(selection, number);
        RENDER([t1, t2, t3])
    }
}

//move as unidades da torre
function mover(tOut, tIn) {

    let towers = [t1, t2, t3];

    let prop = towers[tOut].shift();
    towers[tIn].reverse().push(prop);
    towers[tIn].reverse()    
    
    
}
 

//eventos de click
$("#subT1").click(function() {
    selec(this, 0);
})

$("#subT2").click(function() {
    selec(this, 1);
})

$("#subT3").click(function() {
    selec(this, 2);
})