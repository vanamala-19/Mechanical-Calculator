let choice;
// ...................................Ic Engines...................
const pi = Math.PI;
let N;
let n;
let L= 0;
D = 0;
let p;
let cv;
let F;
let v;
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
let ma;
let mf;
let BSFC;
let ISFC;
let BTe;
let ITe;
let K
let A;
let BWD = 0;
// for Reciprocating Compressor
let p1, p2, p3,IP1,IP2;
const R = 0.287 // units KJ/Kg K
let Win, Mpow;
// root blower compressor
let Wact;
// Vane Type Compressor
let W1, W2, Wvane,Vanee;
//  Centrifugal Compressor
let T1, T2;
const CP = 1.005;
const CV = 0.716;
//  for Rocket engine
let S, Va, Fpr = 0, take;
// Gas Turbine
let T2x,T4x,T3,T4,Kelvin=273.15;


// function to assign choice values
function Ic() {
    choice = 'IC';
    // console.log(choice)
    window.location.href = "#Calculation";
    document.getElementById("ICEngine").style.display = "block";
    document.getElementById("TEngine").style.display = "none";
    document.getElementById("STE").style.display = "none";
    document.getElementById("GTE").style.display = "none";
    document.getElementById("REngine").style.display = "none";
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
    window.location.href = "#Calculation";
    document.getElementById("TEngine").style.display = "block";
    document.getElementById("CE-Engine").style.display = "none";
    document.getElementById("ICEngine").style.display = "none";
    document.getElementById("REngine").style.display = "none";
    document.getElementById("STE").style.display = "none";
    document.getElementById("GTE").style.display = "none";
    document.getElementById("RECE").style.display = "none";
    document.getElementById("ROCE").style.display = "none";
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "none";
}
function CE() {
    choice = 'CE';
    // console.log(choice)
    window.location.href = "#Calculation";
    document.getElementById("CE-Engine").style.display = "block";
    document.getElementById("ICEngine").style.display = "none";
    document.getElementById("REngine").style.display = "none";
    document.getElementById("TEngine").style.display = "none";
    document.getElementById("STE").style.display = "none";
    document.getElementById("GTE").style.display = "none";
    document.getElementById("RECE").style.display = "none";
    document.getElementById("ROCE").style.display = "none";
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "none";

}
function RE() {
    choice = 'RE';
    // console.log(choice)
    window.location.href = "#Calculation";
    document.getElementById("REngine").style.display = "block";
    document.getElementById("CE-Engine").style.display = "none";
    document.getElementById("ICEngine").style.display = "none";
    document.getElementById("TEngine").style.display = "none";
    document.getElementById("STE").style.display = "none";
    document.getElementById("GTE").style.display = "none";
    document.getElementById("RECE").style.display = "none";
    document.getElementById("ROCE").style.display = "none";
    document.getElementById("RBCE").style.display = "none";
    document.getElementById("VTCE").style.display = "none";
    document.getElementById("CFCE").style.display = "none";
    document.getElementById("ACE").style.display = "none";
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
    D = parseFloat(document.getElementById('IC-D').value);
    // console.log(D)
    let dunit = parseInt(document.getElementById('ic-dunit').value);
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
    // console.log(D)
    L = parseFloat(document.getElementById('IC-L').value);
    let lunit = parseInt(document.getElementById('ic-Lunit').value);
    if (lunit == 1) {
        L = L / 100;
    } else if (lunit == 2) {
        L = L / 1000;
    } else if (lunit == 3) {
        L = L;
    }
    N = parseFloat(document.getElementById('IC-N').value);
    K = parseFloat(document.getElementById('IC-K').value);
    let stroke = parseInt(document.getElementById('ic-Strokes').value);
    if (stroke == 2) {
        n = N;
    } else if (stroke == 4) {
        n = N / 2;
    }
    p = parseFloat(document.getElementById('IC-P').value);
    let punit = parseInt(document.getElementById('ic-punit').value);
    if (punit == 1) {
        p = p * 100;
    } else if (punit == 2) {
        p = p;
    } else if (punit == 3) {
        p = p / 1000;
    }
    cv = parseFloat(document.getElementById("IC-CV").value);
    r = parseFloat(document.getElementById("ic-a/f").value);
    M = parseFloat(document.getElementById("IC-M").value);
    let munit = parseInt(document.getElementById('ic-munit').value);
    if (munit == 1) {
        ma = M;
        mf = ma / r;
    } else if (munit == 2) {
        mf = M;
        ma = mf * r;
    }
    F = parseFloat(document.getElementById("IC-F").value);
    BWD = document.getElementById('IC-BWD').value;
    T = document.getElementById('IC-T').value;
    let bwdunit = parseInt(document.getElementById('ic-bwdunit').value);
    if (bwdunit == 1) {
        BWD = BWD / 100;
    } else if (bwdunit == 2) {
        BWD = BWD / 1000;
    } else if (bwdunit == 3) {
        BWD = BWD;
    }
    // console.log(BWD)
    v = parseFloat(document.getElementById("IC-Va").value);
    vs = parseFloat(document.getElementById("IC-Vs").value);
    A = pi * (D * D) / 4;
    IP = ((p * L * A * n * K) / 60).toFixed(3);
    if(T == ""){
        // console.log("called1")
        if (BWD == "") {
        // console.log("called2")
        T = (F * (D / 2));
    } else {
            // console.log("called3")
            T = (F * (BWD / 2));
        }
    }

    BP = ((2 * pi * N * T) / 60000).toFixed(3);
    FP = (IP - BP).toFixed(3);
    BSFC = (mf*3600 / BP).toFixed(4);
    // console.log(BSFC)
    ISFC = (mf*3600/ IP).toFixed(4);
    // console.log(ISFC)
    BTe = (BP / (mf * cv)).toFixed(2);
    ITe = (IP / (mf * cv)).toFixed(2);
    Me = (BP / IP).toFixed(2);
    Ve = (v / vs).toFixed(2);
    document.getElementById('IC-IP').innerHTML = IP + " KW";
    document.getElementById('IC-BP').innerHTML = BP + " KW";
    document.getElementById('IC-FP').innerHTML = FP + " KW";
    document.getElementById('IC-BSFC').innerHTML = BSFC + " Kg/KWh";
    document.getElementById('IC-ISFC').innerHTML = ISFC + " Kg/KWh";
    document.getElementById('IC-Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById('IC-Ve').innerHTML = Ve + " / " + Ve * 100 + " %";
    document.getElementById('IC-ITe').innerHTML = ITe + " / " + ITe * 100 + " %";
    document.getElementById('IC-BTe').innerHTML = BTe + " / " + BTe * 100 + " %";
    document.getElementById("ICResults").style.display = "block";
    document.getElementById("RESCResults").style.display = "none";
    document.getElementById("RBCResults").style.display = "none";
    document.getElementById("VTCResults").style.display = "none";
    document.getElementById("CFCResults").style.display = "none";
    document.getElementById("REResults").style.display = "none";
    document.getElementById("GTResults").style.display = "none";
    window.location.href = "#Results";
}

// this is for two stage compressor
function stage() {
    let stage = document.getElementById("res-tyos").value
    if (stage == 2) {
        document.getElementById("res-msp").style.display = "block";
        document.getElementById("res-msp1").style.display = "block";
        document.getElementById("res-msp2").style.display = "block";
        document.getElementById("res-mspu").style.display = "block";
        document.getElementById("res-mspu1").style.display = "block";
        document.getElementById("res-mspu2").style.display = "block";
    } else if (stage == 1) {
        document.getElementById("res-msp").style.display = "none";
        document.getElementById("res-msp1").style.display = "none";
        document.getElementById("res-msp2").style.display = "none";
        document.getElementById("res-mspu").style.display = "none";
        document.getElementById("res-mspu1").style.display = "none";
        document.getElementById("res-mspu2").style.display = "none";

    }
}

// This Function Calculates The Compresor Parameters
function RESCcalculate() {
    // console.log("Compressor Claculation is On Working Process")
    // this is for Reciprocating compressor
    n = parseFloat(document.getElementById("res-tyop").value);
    K = parseFloat(document.getElementById("res-tyoc").value);
    N = parseFloat(document.getElementById('res-N').value);
    D = parseFloat(document.getElementById('res-D').value);
    let dunit = parseFloat(document.getElementById('res-dunit').value);
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
    L = parseFloat(document.getElementById('res-L').value);
    let lunit = parseFloat(document.getElementById('res-Lunit').value);
    if (lunit == 1) {
        L = L / 100;
    } else if (lunit == 2) {
        L = L / 1000;
    } else if (lunit == 3) {
        L = L;
    }
    p1 = parseFloat(document.getElementById('res-P1').value);
    let p1unit = parseFloat(document.getElementById('res-p1unit').value);
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = parseFloat(document.getElementById('res-P2').value);
    let p2unit = parseFloat(document.getElementById('res-p2unit').value);
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    p3 = parseFloat(document.getElementById('res-P3').value);
    let p3unit = parseFloat(document.getElementById('res-p3unit').value);
    if (p3unit == 1) {
        p3 = p3 * 100;
    } else if (p3unit == 2) {
        p3 = p3;
    } else if (p3unit == 3) {
        p3 = p3 / 1000;
    }
    if(isNaN(p3)){
        console.log("is it working")
        p3 = parseFloat(p2);
    }
    p4 = parseFloat(document.getElementById('res-P4').value);
    let p4unit = parseFloat(document.getElementById('res-p4unit').value);
    if (p4unit == 1) {
        p4 = p4 * 100;
    } else if (p4unit == 2) {
        p4 = p4;
    } else if (p3unit == 3) {
        p4 = p4 / 1000;
    }
    v = parseFloat(document.getElementById("res-V").value);
    if (isNaN(v)) {
            v = pi / 4 * D * D * L*(N/60)*K;
    } 
    T1 = parseFloat(document.getElementById("res-T1").value);
    let T1unit =  parseFloat(document.getElementById("res-T1unit").value);
    if(T1unit == 1){
        T1= (T1+Kelvin);
    }else if(T1unit == 2){
        T1 = T1 + 0.00;
    }else if(T1unit == 3){
        T1 = ((T1-32)*(5/9)+Kelvin);
    }
    T3 = parseFloat(document.getElementById("res-T3").value);
    let T3unit =  parseFloat(document.getElementById("res-T3unit").value);
    if(T3unit == 1){
        T3 = (T3+Kelvin);
    }else if(T3unit == 2){
        T3 = T3 + 0.00;
    }else if(T3unit == 3){
        T3 = ((T3-32)*(5/9)+Kelvin);
    }
    ma = parseFloat(document.getElementById("res-Ma").value);
    let maunit = parseFloat(document.getElementById("res-maunit").value);
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    

    // console.log(v)
// console.log(ma);
if(isNaN(ma)){
    // console.log("called-1");
        ma = ((p1*v)/(R*T1)).toFixed(2);
}
console.log("p3 is" + p3 )


// console.log(ma);
mf = 1.4;
T2 = T1*Math.pow((p2/p1),((mf-1)/mf))
if (n == 0){
        console.log("n is" + n )
        Win = p1 * v * (Math.log(p2 / p1));
    } else{
        console.log("n is" + n )
        Win = (n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n) - 1)).toFixed(3);
    }
    T4 = T3*Math.pow((p4/p3),(n-1)/n)
    if(isNaN(p3) && isNaN(p4) && isNaN(T3)){
        IP = (Win * N * K / 60).toFixed(3);
        console.log("called single one")
    }else{
        if(isNaN(ma)){
        console.log("called non ma one")
            IP1 = (Win * N * K / 60).toFixed(3);
        }else{
        console.log("called with  ma one")
            IP1 = parseFloat(((mf/(mf-1))*ma*R*(T2-T1)).toFixed(3));
        }
            IP2 = parseFloat((n / (n - 1 )*ma*R*(T4-T3)).toFixed(3)) ;
            IP = IP1+IP2;
        console.log(n / (n - 1))
        console.log(ma)
        console.log(R)
        console.log(T4)
        console.log(T3)
        console.log(T2)
        console.log(T1)
        console.log(T2-T1)
        console.log(IP1)
        console.log(IP2)
        console.log(IP)
    }
    BP = // We need to find
        FP = (IP - BP).toFixed(3);
    Me = (IP / BP).toFixed(2);
    Mpow = (BP / Me).toFixed(3);
    document.getElementById('res-IP').innerHTML = IP + " KW";
    document.getElementById('res-BP').innerHTML = BP + " KW";
    document.getElementById('res-FP').innerHTML = FP + " KW";
    document.getElementById('res-Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById('res-Mpow').innerHTML = Mpow + " KW";
    document.getElementById("RESCResults").style.display = "block";
    document.getElementById("ICResults").style.display = "none";
    document.getElementById("RBCResults").style.display = "none";
    document.getElementById("VTCResults").style.display = "none";
    document.getElementById("CFCResults").style.display = "none";
    document.getElementById("REResults").style.display = "none";
    document.getElementById("GTResults").style.display = "none";
    window.location.href = "#Results";
}

// This is for Rootblower
function RBCcalculate() {
    p1 = document.getElementById('rb-P1').value;
    let p1unit = document.getElementById('rb-p1unit').value;
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = document.getElementById('rb-P2').value;
    let p2unit = document.getElementById('rb-p2unit').value;
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    v = document.getElementById("rb-V").value;
    T = document.getElementById("rb-T").value;
    let Tunit =  document.getElementById("rb-Tunit").value;
    if(Tunit == 1){
        T = (T+Kelvin);
    }else if(Tunit == 2){
        T = T + 0.00;
    }else if(Tunit == 3){
        T = ((T-32)*(5/9)+Kelvin);
    }
    ma = document.getElementById("rb-Ma").value;
    let maunit = document.getElementById("rb-maunit").value;
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    if (v == 0) {
        if (ma != 0 && T != 0) {
            v = (ma * R * T) / p1
        }
    }
    n = 1.4;
    Wact = (v * (p2 - p1)).toFixed(3);
    IP = (n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n) - 1)).toFixed(3);
    let Roote = (IP / Wact).toFixed(2);
    BP = // We need to find
        FP = (IP - BP).toFixed(3);
    Me = (IP / BP).toFixed(2);

    document.getElementById('rb-Wact').innerHTML = Wact + " KW";
    document.getElementById('rb-IP').innerHTML = IP + " KW";
    document.getElementById('rb-BP').innerHTML = BP + " KW";
    document.getElementById('rb-FP').innerHTML = FP + " KW";
    document.getElementById('rb-Roote').innerHTML = Roote + " / " + Roote * 100 + " %";
    document.getElementById('rb-Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById("RBCResults").style.display = "block";
    document.getElementById("ICResults").style.display = "none";
    document.getElementById("RESCResults").style.display = "none";
    document.getElementById("VTCResults").style.display = "none";
    document.getElementById("CFCResults").style.display = "none";
    document.getElementById("REResults").style.display = "none";
    document.getElementById("GTResults").style.display = "none";
    window.location.href = "#Results";
}

//  This is for Vane Type Compressor
function VTCcalculate() {
    N = document.getElementById("vt-N").value;
    p1 = document.getElementById('vt-P1').value;
    let p1unit = document.getElementById('vt-p1unit').value;
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = document.getElementById('vt-P2').value;
    let p2unit = document.getElementById('vt-p2unit').value;
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    p3 = document.getElementById('vt-P3').value;
    let p3unit = document.getElementById('vt-p3unit').value;
    if (p3unit == 1) {
        p3 = p1 * 100;
    } else if (p3unit == 2) {
        p3 = p3;
    } else if (p3unit == 3) {
        p3 = p3 / 1000;
    }
    v = document.getElementById("vt-V").value;
    T = document.getElementById("vt-T").value;
    let Tunit =  document.getElementById("vt-Tunit").value;
    if(Tunit == 1){
        T = (T+Kelvin);
    }else if(Tunit == 2){
        T = T + 0.00;
    }else if(Tunit == 3){
        T = ((T-32)*(5/9)+Kelvin);
    }
    ma = document.getElementById("vt-Ma").value;
    let maunit = document.getElementById("vt-maunit").value;
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    if (v == 0) {
        if (ma != 0 && T != 0) {
            v = (ma * R * T) / p1
        }
    }
    n = 1.4;
    W1 = (n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n) - 1)).toFixed(3);
    let v2 = v * Math.pow((p1 / p2), (1 / n))
    W2 = (v2 * (p3 - p2)).toFixed(3);
    Wvane = (N * (W1 + W2)).toFixed(3);
    IP = (W1 + W2);
    Vanee = ((W2) / IP).toFixed(3);
    BP = // We need to find
        FP = (IP - BP).toFixed(3);
    Me = (IP / BP).toFixed(2);
    document.getElementById('vt-Wvane').innerHTML = Wvane + " KW";
    document.getElementById('vt-IP').innerHTML = IP + " KW";
    document.getElementById('vt-BP').innerHTML = BP + " KW";
    document.getElementById('vt-FP').innerHTML = FP + " KW";
    document.getElementById('vt-Vanee').innerHTML = Vanee + " / " + Vanee * 100 + " %";
    document.getElementById('vt-Me').innerHTML = Me + " / " + Me * 100 + " %";
    document.getElementById("VTCResults").style.display = "block";
    document.getElementById("ICResults").style.display = "none";
    document.getElementById("RESCResults").style.display = "none";
    document.getElementById("RBCResults").style.display = "none";
    document.getElementById("CFCResults").style.display = "none";
    document.getElementById("REResults").style.display = "none";
    document.getElementById("GTResults").style.display = "none";
    window.location.href = "#Results";
}
//  This for centifugal compressor
function CFCcalculate() {
    ma = document.getElementById("cf-Ma").value;
    let maunit = document.getElementById("cf-maunit").value;
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    p1 = document.getElementById('cf-P1').value;
    let p1unit = document.getElementById('cf-p1unit').value;
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = document.getElementById('cf-P2').value;
    let p2unit = document.getElementById('cf-p2unit').value;
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    n = 1.4;
    T1 = document.getElementById("cf-T1").value;
    let T1unit =  document.getElementById("cf-T1unit").value;
    if(T1unit == 1){
        T1= (T1+Kelvin);
    }else if(T1unit == 2){
        T1 = T1 + 0.00;
    }else if(T1unit == 3){
        T1 = ((T1-32)*(5/9)+Kelvin);
    }
    T2 = document.getElementById("cf-T2").value;
    let T2unit =  document.getElementById("cf-T2unit").value;
    if(T2unit == 1){
        T2= (T2+Kelvin);
    }else if(T2unit == 2){
        T2 = T2 + 0.00;
    }else if(T2unit == 3){
        T2 = ((T2-32)*(5/9)+Kelvin);
    }
    T2x = (T1 * Math.pow((p2 / p1), (n - 1) / n)).toFixed(1);
    let isene = ((T2x - T1) / (T2 - T1)).toFixed(2);
    let Pin = (ma * CP * (T2 - T1)).toFixed(3);
    Win = (CP * (T2 - T1)).toFixed(3);
    let Ds = (ma * (CP * Math.log(T2 / T1) - R * Math.log(p2 / p1))).toFixed(3); // change in entropy
    document.getElementById('cf-win').innerHTML = Win + " KW";
    document.getElementById('cf-pin').innerHTML = Pin + " KW";
    document.getElementById('cf-isene').innerHTML = isene + " / " + isene * 100 + " %";
    document.getElementById('cf-ds').innerHTML = Ds + " KW";
    document.getElementById("CFCResults").style.display = "block";
    document.getElementById("REResults").style.display = "none";
    document.getElementById("ICResults").style.display = "none";
    document.getElementById("RESCResults").style.display = "none";
    document.getElementById("RBCResults").style.display = "none";
    document.getElementById("VTCResults").style.display = "none";
    document.getElementById("GTResults").style.display = "none";
    window.location.href = "#Results";
}

// For ambient velocity and velocity ratio
function rva() {
    take = parseInt(document.getElementById("r-vr").value);
    if (take == 1) {
        document.getElementById("rva").style.display = "none";
    } else if (take == 2) {
        document.getElementById("rva").style.display = "block";
    }
}

// This Function Calculates The Rocket Engine Parameters
function REcalculate() {
    // console.log("Rocket Engine Claculation is On Working Process")
    p1 = parseFloat(document.getElementById('r-pe').value);
    let p1unit = parseInt(document.getElementById('r-p1unit').value);
    if (p1unit == 1) {
        p1 = p1 * 100;
    } else if (p1unit == 2) {
        p1 = p1;
    } else if (p1unit == 3) {
        p1 = p1 / 1000;
    }
    p2 = parseFloat(document.getElementById('r-pa').value);
    let p2unit = parseInt(document.getElementById('r-p2unit').value);
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    // console.log(p1)
    // console.log(p2)
    ma = parseFloat(document.getElementById("r-ma").value);
    let maunit = parseInt(document.getElementById("r-maunit").value);
    if (maunit == 1) {
        ma = ma;
    } else if (maunit == 2) {
        ma = ma / 60;
    }
    let Vjet = parseFloat(document.getElementById("r-Vjet").value);
    let vunit = parseInt(document.getElementById("r-vunit").value);
    if (vunit == 1) {
        Vjet = Vjet;
    } else if (vunit == 2) {
        Vjet = Vjet * (5 / 18);
    } else if (vunit == 3) {
        Vjet = Vjet / 2.237;
    }
    if (take == 1) {
        S = parseFloat(document.getElementById("r-va").value);
        document.getElementById("rva").style.display = "none";
        Va = S * Vjet;
        // console.log(S);
    } else if (take == 2) {
        Va = parseFloat(document.getElementById("r-va").value);
        document.getElementById("rva").style.display = "block";
        let vaunit = parseInt(document.getElementById("r-vaunit").value);
        if (vaunit == 1) {
            Va = Va;
        } else if (vaunit == 2) {
            Va = Va * (5 / 18);
        } else if (vaunit == 3) {
            Va = Va / 2.237;
        }
        S = Va / Vjet;
    }
    D = parseFloat(document.getElementById('r-D').value);
    let dunit = parseInt(document.getElementById('r-dunit').value);
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
    let Ae = pi / 4 * D * D;
    let Fmom = ma * Vjet;
    Fpr = Ae * (p1 - p2);
    // F = Fmom;
    if (p1 = !"NaN" && p2 != "NaN") {
        // console.log("called 1")
        F = Fmom + Fpr
    } else {
        // console.log("called 2")
        F = Fmom;
    }
    let Sthrust = F / ma;
    let Isp = (F / (ma * 9.81)).toFixed(2);
    let Pthrust = F * Va;
    let Ploss = 0.5 * ma * (Vjet - Va) * (Vjet - Va);
    PPropulsion = Pthrust + Ploss;
    let Prope = (2 * S / (1 + (S * S))).toFixed(2);
    // console.log(Prope)
    let Te = PPropulsion / (ma * CV);
    let SPC = 1 / Isp;
    let Overalle = (Prope * Te).toFixed(2);
    document.getElementById('r-TP').innerHTML = F / 1000 + " KN";
    document.getElementById('r-Sthrust').innerHTML = Sthrust + "  M/S";
    document.getElementById('r-Isp').innerHTML = Isp + "  S";
    document.getElementById('r-SPC').innerHTML = SPC + " per Sec";
    document.getElementById('r-Pthrust').innerHTML = Pthrust / 1000 + "  KW";
    document.getElementById('r-Ploss').innerHTML = Ploss / 1000 + "  KW";
    document.getElementById('r-PProp').innerHTML = PPropulsion / 1000 + "  KW";
    document.getElementById('r-Prope').innerHTML = Prope + " / " + Prope * 100 + " %";
    document.getElementById('r-Te').innerHTML = Te + " / " + Te * 100 + " %";
    document.getElementById('r-Oe').innerHTML = Overalle + " / " + Overalle * 100 + " %";
    document.getElementById("REResults").style.display = "block";
    document.getElementById("CFCResults").style.display = "none";
    document.getElementById("ICResults").style.display = "none";
    document.getElementById("RESCResults").style.display = "none";
    document.getElementById("RBCResults").style.display = "none";
    document.getElementById("VTCResults").style.display = "none";
    document.getElementById("GTResults").style.display = "none";
    window.location.href = "#Results";
}

//  This is for Types of turbines
function tyt() {
    let tyt = document.getElementById("T-tyt").value
    if (tyt == 'steam') {
        SteamTurbine();
    } else if (tyt == 'gas') {
        GasTurbine();
    }
}

// For Steam turbine
function SteamTurbine(){
    document.getElementById("STE").style.display = "block";
    document.getElementById("GTE").style.display = "none";
}

//  For Gas Turbine
function GasTurbine(){
    document.getElementById("STE").style.display = "none";
    document.getElementById("GTE").style.display = "block";
}

// This Function Calculates The Steam Turbine Parameters
function STcalculate() {
    // console.log("Turbine Claculation is On Working Process")
}

// This Function Calculates The Gas Turbine Parameters
function GTcalculate() {
    // console.log("Turbine Claculation is On Working Process")
    p = parseFloat(document.getElementById('gt-P').value);
    let p2unit = parseInt(document.getElementById('gt-punit').value);
    if (p2unit == 1) {
        p2 = p2 * 100;
    } else if (p2unit == 2) {
        p2 = p2;
    } else if (p2unit == 3) {
        p2 = p2 / 1000;
    }
    v = parseFloat(document.getElementById('gt-V').value);
    T1 =parseFloat(document.getElementById("gt-T1").value);
    // console.log(T1)
    let T1unit =  parseInt(document.getElementById("gt-T1unit").value);
    if(T1unit == 1){
        T1= (parseInt(T1)+Kelvin);
    }else if(T1unit == 2){
        T1 = T1 + 0.00;
    }else if(T1unit == 3){
        T1 = (T1-32)*(5/9)+Kelvin;
    }
    // console.log(T1)
    T2 =parseFloat(document.getElementById("gt-T2").value);
    let T2unit =  parseInt(document.getElementById("gt-T2unit").value);
    if(T2unit == 1){
        T2= (T2+Kelvin);
    }else if(T2unit == 2){
        T2 = T2 + 0.00;
    }else if(T2unit == 3){
        T2 = ((T2-32)*(5/9)+Kelvin);
    }
    T3 =parseFloat(document.getElementById("gt-T3").value);
    let T3unit =  parseInt(document.getElementById("gt-T3unit").value);
    if(T3unit == 1){
        T3= (T3+Kelvin);
    }else if(T3unit == 2){
        T3 = T3 + 0.00;
    }else if(T3unit == 3){
        T3 = ((T3-32)*(5/9)+Kelvin);
    }
    T4 =parseFloat(document.getElementById("gt-T4").value);
    let T4unit = parseInt(document.getElementById("gt-T4unit").value);
    if(T4unit == 1){
        T4= (T4+Kelvin);
    }else if(T4unit == 2){
        T4 = T4 + 0.00;
    }else if(T4unit == 3){
        T4 = ((T4-32)*(5/9)+Kelvin);
    }
    r = parseFloat(document.getElementById("gt-Rp").value);
    n = 1.4;
    let WT,WC;
    if(isNaN(T2)){
    console.log(T2+" called")
        WC= (CP*(T2x-T1)).toFixed(3);
    }else{
        WC= (CP*(T2-T1)).toFixed(3);
    }
    if(isNaN(T4)){
        WT = (CP*(T3-T4x)).toFixed(3);
    }else{
        WT = (CP*(T3-T4)).toFixed(3);
    }
    let Wnet = (WT-WC).toFixed(3);
    let qin = CP*(T3-T2);
    let qout = CP*(T4-T1);
    let THe = (Wnet/qin).toFixed(2);
    T2x = T1*Math.pow(r,(n-1)/n);
    T4x = T3/(Math.pow(r,(n-1)/n));
    let Te = ((T3-T4)/(T3-T4x)).toFixed(2);
    let Ce = ((T2x-T1)/(T2-T1)).toFixed(2);
    let bwr = (WC/WT).toFixed(2);
    ma = (p*v)/R*T1;
    pow = ma*Wnet;
    document.getElementById('gt-WT').innerHTML = WT + " KJ/Kg";
    document.getElementById('gt-pow').innerHTML = pow + " KW";
    document.getElementById('gt-WC').innerHTML = WC + " KJ/Kg";
    document.getElementById('gt-Wnet').innerHTML = Wnet + " KJ/Kg";
    document.getElementById('gt-THe').innerHTML = THe + " / " + THe * 100 + " %";
    document.getElementById('gt-Te').innerHTML = Te + " / " + Te * 100 + " %";
    document.getElementById('gt-Ce').innerHTML = Ce + " / " + Ce * 100 + " %";
    document.getElementById('gt-bwr').innerHTML = bwr + " / " + bwr * 100 + " %";
    document.getElementById("GTResults").style.display = "block";
    document.getElementById("REResults").style.display = "none";
    document.getElementById("CFCResults").style.display = "none";
    document.getElementById("ICResults").style.display = "none";
    document.getElementById("RESCResults").style.display = "none";
    document.getElementById("RBCResults").style.display = "none";
    document.getElementById("VTCResults").style.display = "none";
    window.location.href = "#Results";
}
