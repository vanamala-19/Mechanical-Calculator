let choice;
// ...................................Ic Engines...................
let N;
let n;
let L = 0;
let D = 0;
const pi = 3.141592654;
let p;
let cv;
let F;
let v = 0;
let vs;
let pmb;
let IP;
let BP;
let T = 0;
let FP;
let Me;
let Ve;
let r;
let M;
let ma = 0;
let mf;
let BSFC;
let ISFC;
let BTe;
let ITe;
let K;
let A;
let BWD = 0;

// for Reciprocating Compressor
let p1, p2, p3;
const R = 0.287 // units KJ/Kg K
let Win, Mpow;
// root blower compressor
let Wact;
// Vane Type Compressor
let W1,W2,Wvane,IP1,IP2,Vanee;
//  Centrifugal Compressor
let T1,T2;
const CP = 1.00;
const CV = 0.716;


// function to assign choice values
function Ic() {
    choice = 'IC';
    // console.log(choice)\
    window.location.href = "#Calculation";
    document.getElementById("ICEngine").style.display = "block";
    document.getElementById("CE-Engine").style.display = "none";
    document.getElementById("RECE").style.display = "none";
    document.getElementById("ROCE").style.display = "none";
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "none";
}

function TE() {
    choice = 'TE';
    // console.log(choice)
}
function CE() {
    choice = 'CE';
    // console.log(choice)
    window.location.href = "#Calculation";
    document.getElementById("CE-Engine").style.display = "block";
    document.getElementById("ICEngine").style.display = "none";

}
function RE() {
    choice = 'RE';
    // console.log(choice)
}


// this for types of compressors
function ct() {
    let ct = document.getElementById("ct").value
    if (ct == 'res') {
        rescom();
    } else if (ct == 'rot') {
        rotcom();
    }
}

function rescom() {
    document.getElementById("RECE").style.display = "block";
    document.getElementById("ROCE").style.display = "none";
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "none";
}
function rotcom() {
    document.getElementById("RECE").style.display = "none";
    document.getElementById("ROCE").style.display = "block";
}

// this for types of  rotary compressors
function rct() {
    let rct = document.getElementById("rct").value
    if (rct == 'rbc') {
        rootblowercom();
    } else if (rct == 'vtc') {
        vanetypecom();
    } else if (rct == 'cenc') {
        centrifugalcom();
    } else if (rct == 'axialc') {
        centrifugalcom();
        // axialcom(); // This is because both are looking same
    }
}


// This is for different types of rotary engine
function rootblowercom() {
    document.getElementById("RBCE").style.display = "block";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "none";
}
function vanetypecom() {
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "block";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "none";
}

function centrifugalcom() {
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "block";
    document.getElementById("ACE").style.display = "none";
}
function axialcom() {
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "block";
}



// This Function Calculates The IC Engine Parameters
function ICcalculate() {
    // console.log("IC Engine Claculation is On Working Process");
    D = document.getElementById('D').value;
    let dunit = document.getElementById('dunit').value;
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
    L = document.getElementById('L').value;
    let lunit = document.getElementById('Lunit').value;
    if (lunit == 1) {
        L = L / 100;
    } else if (lunit == 2) {
        L = L / 1000;
    } else if (lunit == 3) {
        L = L;
    }
    N = document.getElementById('N').value;
    K = document.getElementById('K').value;
    let stroke = document.getElementById('Strokes').value;
    if (stroke == 2) {
        n = N;
    } else if (stroke == 4) {
        n = N / 2;
    }
    p = document.getElementById('P').value;
    let punit = document.getElementById('punit').value;
    if (punit == 1) {
        p = p * 100;
    } else if (punit == 2) {
        p = p;
    } else if (punit == 3) {
        p = p / 1000;
    }
    cv = document.getElementById("CV").value;
    r = document.getElementById("a/f").value;
    M = document.getElementById("M").value;
    let munit = document.getElementById('munit').value;
    if (munit == 1) {
        ma = M;
        mf = ma / r;
    } else if (munit == 2) {
        mf = M;
        ma = mf * r;
    }
    F = document.getElementById("F").value;
    BWD = document.getElementById('BWD').value;
    let bwdunit = document.getElementById('bwdunit').value;
    if (bwdunit == 1) {
        BWD = BWD / 100;
    } else if (bwdunit == 2) {
        BWD = BWD / 1000;
    } else if (bwdunit == 3) {
        BWD = BWD;
    }
    // console.log(BWD)
    v = document.getElementById("Va").value;
    vs = document.getElementById("Vs").value;
    A = pi * (D * D) / 4;
    IP = ((p * L * A * n * K) / 60).toFixed(3);
    if (BWD == 0) {
        T = F * (D / 2);
    } else {
        T = F * (BWD / 2);
    }
    BP = ((2 * pi * N * T) / 60000).toFixed(3);
    FP = (IP - BP).toFixed(3);
    BSFC = (mf / BP).toFixed(3);
    ISFC = (mf / IP).toFixed(3);
    BTe = (BP / (mf * cv)).toFixed(2);
    ITe = (IP / (mf * cv)).toFixed(2);
    Me = (BP / IP).toFixed(2);
    Ve = (v / vs).toFixed(2);
    document.getElementById('IP').innerHTML = IP + " KW";
    document.getElementById('BP').innerHTML = BP + " KW";
    document.getElementById('FP').innerHTML = FP + " KW";
    document.getElementById('BSFC').innerHTML = BSFC + " Kg/KWh";
    document.getElementById('ISFC').innerHTML = ISFC + " Kg/KWh";
    document.getElementById('Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById('Ve').innerHTML = Ve + " / " + Ve * 100 + " %";
    document.getElementById('ITe').innerHTML = ITe + " / " + ITe * 100 + " %";
    document.getElementById('BTe').innerHTML = BTe + " / " + BTe * 100 + " %";
    document.getElementById("ICResults").style.display = "block";
    window.location.href = "#Results";
}

// This Function Calculates The Turbine Parameters
function Tcalculate() {
    // console.log("Turbine Claculation is On Working Process")
}

// this is for two stage compressor
function stage() {
    let stage = document.getElementById("tyos").value
    if (stage == 2) {
        document.getElementById("msp").style.display = "block";
        document.getElementById("mspu").style.display = "block";
    } else if (stage == 1) {
        document.getElementById("msp").style.display = "none";
        document.getElementById("mspu").style.display = "none";

    }
}

// This Function Calculates The Compresor Parameters
function RESCcalculate() {
    // console.log("Compressor Claculation is On Working Process")
    // this is for Reciprocating compressor
    n = document.getElementById("tyop").value;
    K = document.getElementById("tyoc").value;
    N = document.getElementById('N').value;
    D = document.getElementById('D').value;
    let dunit = document.getElementById('dunit').value;
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
    L = document.getElementById('L').value;
    let lunit = document.getElementById('Lunit').value;
    if (lunit == 1) {
        L = L / 100;
    } else if (lunit == 2) {
        L = L / 1000;
    } else if (lunit == 3) {
        L = L;
    }
    p1 = document.getElementById('P1').value;
    let p1unit = document.getElementById('p1unit').value;
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = document.getElementById('P2').value;
    let p2unit = document.getElementById('p2unit').value;
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    p3 = document.getElementById('P3').value;
    let p3unit = document.getElementById('p3unit').value;
    if (p3unit == 1) {
        p3 = p1 * 100;
    } else if (p3unit == 2) {
        p3 = p3;
    } else if (p3unit == 3) {
        p3 = p3 / 1000;
    }
    v = document.getElementById("V").value;
    T = document.getElementById("T").value;
    ma = document.getElementById("Ma").value;
    let maunit = document.getElementById("maunit").value;
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    if (v == 0) {
        if (D != 0 && L != 0) {
            v = pi / 4 * D * D * L;
        } else if (ma != 0 && T != 0) {
            v = (ma * R * T) / p1
        }
    }
    if (n = 0) {
        Win = p1 * v * (Math.log(p2 / p1));
    } else {
        Win = (n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n)-1)).toFixed(3);
    }
    IP = (Win * N * K / 60).toFixed(3);
    BP = // We need to find
    FP = (IP - BP).toFixed(3);
    Me = (IP / BP).toFixed(2);
    Mpow = (BP / Me).toFixed(3);
    document.getElementById('IP').innerHTML = IP + " KW";
    document.getElementById('BP').innerHTML = BP + " KW";
    document.getElementById('FP').innerHTML = FP + " KW";
    document.getElementById('Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById('Mpow').innerHTML = Mpow + " KW";
    document.getElementById("RESCResults").style.display = "block";
    window.location.href = "#Results";
}

// This is for Rootblower
function RBCcalculate(){
    p1 = document.getElementById('P1').value;
    let p1unit = document.getElementById('p1unit').value;
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = document.getElementById('P2').value;
    let p2unit = document.getElementById('p2unit').value;
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    v = document.getElementById("V").value;
    T = document.getElementById("T").value;
    ma = document.getElementById("Ma").value;
    let maunit = document.getElementById("maunit").value;
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    if(v == 0){
        if (ma != 0 && T != 0) {
            v = (ma * R * T) / p1
        }
    }
    n = 1.4;
    Wact = (v*(p2-p1)).toFixed(3);
    IP =(n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n)-1)).toFixed(3);
    let Roote = (IP/Wact).toFixed(2);
    BP = // We need to find
    FP = (IP - BP).toFixed(3);
    Me = (IP / BP).toFixed(2);

    document.getElementById('Wact').innerHTML = Wact + " KW";
    document.getElementById('IP').innerHTML = IP + " KW";
    document.getElementById('BP').innerHTML = BP + " KW";
    document.getElementById('FP').innerHTML = FP + " KW";
    document.getElementById('Roote').innerHTML = Roote + " / " + Roote * 100 + " %";
    document.getElementById('Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById("RBCResults").style.display = "block";
    window.location.href = "#Results";
}

//  This is for Vane Type Compressor
function VTCcalculate(){
    N = document.getElementById("N").value;
    p1 = document.getElementById('P1').value;
    let p1unit = document.getElementById('p1unit').value;
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = document.getElementById('P2').value;
    let p2unit = document.getElementById('p2unit').value;
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    p3 = document.getElementById('P3').value;
    let p3unit = document.getElementById('p3unit').value;
    if (p3unit == 1) {
        p3 = p1 * 100;
    } else if (p3unit == 2) {
        p3 = p3;
    } else if (p3unit == 3) {
        p3 = p3 / 1000;
    }
    v = document.getElementById("V").value;
    T = document.getElementById("T").value;
    ma = document.getElementById("Ma").value;
    let maunit = document.getElementById("maunit").value;
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    if(v == 0){
        if (ma != 0 && T != 0) {
            v = (ma * R * T) / p1
        }
    }
    n = 1.4;
    W1 = (n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n)-1)).toFixed(3);
    let v2 = v*Math.pow((p1/p2),(1/n))
    W2 = (v2*(p3-p2)).toFixed(3);
    Wvane = (N*(W1 + W2)).toFixed(3);
    IP = (W1+W2);
    Vanee = ((W2)/IP).toFixed(3);
    BP = // We need to find
    FP = (IP - BP).toFixed(3);
    Me = (IP / BP).toFixed(2);
    document.getElementById('Wvane').innerHTML = Wvane + " KW";
    document.getElementById('IP').innerHTML = IP + " KW";
    document.getElementById('BP').innerHTML = BP + " KW";
    document.getElementById('FP').innerHTML = FP + " KW";
    document.getElementById('Vanee').innerHTML = Vanee + " / " + Vanee * 100 + " %";
    document.getElementById('Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById("VTCResults").style.display = "block";
    window.location.href = "#Results";
}
//  This for centifugal compressor
function CFCcalculate(){
    ma = document.getElementById("Ma").value;
    let maunit = document.getElementById("maunit").value;
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    p1 = document.getElementById('P1').value;
    let p1unit = document.getElementById('p1unit').value;
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = document.getElementById('P2').value;
    let p2unit = document.getElementById('p2unit').value;
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    n=1.4;
    T1= document.getElementById("T1").value;
    T2 = document.getElementById("T2").value;
    let T2x = (T1*Math.pow((p2/p1),(n-1)/n)).toFixed(1);
    let isene = ((T2x-T1)/(T2-T1)).toFixed(2);
    let Pin = (ma*CP*(T2-T1)).toFixed(3);
    Win = (CP*(T2-T1)).toFixed(3);
    let Ds = (ma*(CP*Math.log(T2/T1)-R*Math.log(p2/p1))).toFixed(3); // change in entropy
    document.getElementById('win').innerHTML = Win + " KW";
    document.getElementById('pin').innerHTML = Pin + " KW";
    document.getElementById('isene').innerHTML = isene + " / " + isene * 100 + " %";
    document.getElementById('ds').innerHTML = Ds + " KW";
    document.getElementById("CFCResults").style.display = "block";
    window.location.href = "#Results";
}

// This Function Calculates The Rocket Engine Parameters
function Rcalculate() {
    // console.log("Rocket Engine Claculation is On Working Process")
}
