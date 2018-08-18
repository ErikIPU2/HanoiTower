var t1 = [];
var t2 = [];
var t3 = [];

function startGame() {
    // pega o tamanho da torre
    var tam = $("#towerLeng").val();
    
    // verifica se o valor digitado é 0
    if (!tam) {
        M.toast({html: "Digite o tamanho da torre!"})
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
            t2.push(0);
            t3.push(0);
        }
        // 
        $("#inputTela").hide();
        $("#gameTela").show();
        RENDER([t1, t2, t3]);
    }
}

function RENDER(towers) {
    for (var index = 0; index < 3; index++) {

        var prop = [];

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

        $("#Tower"+(index+1)).html(rendered);

        
    }
}
