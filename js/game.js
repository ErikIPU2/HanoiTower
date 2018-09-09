var tam
var t1 = [];
var t2 = [];
var t3 = [];

var movContG = 0;

var mov = 0;

var conterV;

var s = 0, m = 0;

//indica qual torre vai estar selecionada
var selection = -1;

var inteliGam = false;

function startGame() {
    // pega o tamanho da torre
    tam = $("#towerLeng").val();

    // verifica se o valor digitado é 0
    if (!tam || tam == 0) {
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
        $("#inputTela").hide("slow");
        $(".page-footer").hide("slow");
        $("#gameTela").show("slow");
        $("#backBtn").show("slow");
        selection = -1;
        conterV = setInterval(conter, 1000);
        RENDER([t1, t2, t3]);

        M.toast({ html: `Para resolver essa torre você irá precisar do minimo de ${Math.pow(2, tam) - 1} movimentos` })
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
        $("#movConter").html(`Movimentos: ${mov}`);
    }
}

//faz a seleção das torres e indica quais vão mover
function selec(elem, number) {
    if (selection == -1) {
        $(elem).addClass("green darken-1");
        selection = number;
    }
    else if (selection == number) {
        $(elem).removeClass("green darken-1");
        selection = -1;
        movContG = 0;

    }
    else {
        let towers = [t1, t2, t3];

        let Tselec = towers[selection];
        let Tout = towers[number];


        if ((Tselec[0] < Tout[0] || !Tout[0]) && Tselec[0]) {
            mover(selection, number);
            if (!inteliGam) {
                selection = -1;
                $(`#subT1`).removeClass("green darken-1")
                $(`#subT2`).removeClass("green darken-1")
                $(`#subT3`).removeClass("green darken-1")
            }
            else {
                movContG++;
            }
        }
        else {
            M.toast({ html: "Não podes colocar uma peça maior em cima de uma menor" })
        }

        if (inteliGam) {

            let tIndex = towers[selection].length - 1;

            if (tIndex == -1 || movContG == 2) {
                $(`#subT${selection + 1}`).removeClass("green darken-1")
                selection = -1;
                movContG = 0;
            }

        }

        RENDER([t1, t2, t3])
    }
}

//move as unidades da torre
function mover(tOut, tIn) {

    mov++;

    let towers = [t1, t2, t3];

    let prop = towers[tOut].shift();
    towers[tIn].reverse().push(prop);
    towers[tIn].reverse()


}

function checkComplete() {
    if (t3[0] == 1 && t3.length == tam) {
        M.toast({
            html: `Parabains, você ganhou!<br>
        Em ${mov} movimentos em ${m} minutos e ${s} segundos`
        })
        t1 = [];
        t2 = [];
        t3 = [];
        mov = 0;
        s = 0;
        m = 0;
        $("#inputTela").show("slow");
        $(".page-footer").show("slow");
        $("#gameTela").hide("slow");
        $("#backBtn").hide("slow");
        clearInterval(conterV);
    }

}

function endGame() {
    t1 = [];
    t2 = [];
    t3 = [];
    mov = 0;
    s = 0;
    m = 0;
    clearInterval(conterV);
    $("#inputTela").show("slow");
    $(".page-footer").show("slow");
    $("#gameTela").hide("slow");
    $("#backBtn").hide("slow");
    M.Toast.dismissAll();
}

function conter() {
    s++;
    if (s == 60) {
        m++;
        s = 0
    }

    $("#tempConter").html(`Tempo: ${m}:${s}`)
    console.log("a");


}

//eventos de click
$("#subT1").click(function () {
    if (!t1.length && selection == -1) {
        M.toast({ html: "Voce não pode selecionar uma torre vazia" })
    }
    else {
        selec(this, 0);
        checkComplete();

    }
})

$("#subT2").click(function () {
    if (!t2.length && selection == -1) {
        M.toast({ html: "Voce não pode selecionar uma torre vazia" })
    }
    else {
        selec(this, 1);
        checkComplete();

    }
})

$("#subT3").click(function () {
    if (!t3.length && selection == -1) {
        M.toast({ html: "Voce não pode selecionar uma torre vazia" })
    }
    else {
        selec(this, 2);
        checkComplete();
    }
})


$("#inputTela").keypress(function (key) {
    if (key.keyCode == 13) startGame();
});



$("#gameTela").contextmenu(function () {
    selection = -1;
    $(`#subT1`).removeClass("green darken-1")
    $(`#subT2`).removeClass("green darken-1")
    $(`#subT3`).removeClass("green darken-1")
})

$("#backBtn").click(function () {
    M.toast({ html: "<span>Tem certeza que deseja abandonar o seu jogo?</span><button onClick='endGame();' class='btn-flat toast-action'>Sim</button><button onClick='M.Toast.dismissAll();' class='btn-flat toast-action'>Não</button>" })
})

$("#intelGamS").click(function () {
    inteliGam = !inteliGam;
})