let choice,ch;
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
let image;
let i;
let label;
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
    choice = 'ICEngine';
    window.location.href = "#Calculation";
    display();
}

function TE() {
    choice = 'TEngine';
    window.location.href = "#Calculation";
    display();
}
function CE() {
    choice = 'CE-Engine';
    window.location.href = "#Calculation";
    comdisplay();
}
function RE() {
    choice = 'REngine';
    window.location.href = "#Calculation";
    display();
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
    choice = 'RECE';
    comdisplay();
}
function rotcom() {
    choice = 'ROCE';
    comdisplay();
}

// this for types of  rotary compressors
function rct() {
    let rct = document.getElementById("rct").value
    if (rct == 'rbc') {
        rootblowercom();
    } else if (rct == 'vtc') {
        vanetypecom();
    } else if (rct == 'cenc') {
        ch = 'CFCE';
        centrifugalcom();
    } else if (rct == 'axialc') {
        ch = 'ACE';
        centrifugalcom();
        // axialcom(); // This is because both are looking same
    }
}

// This is for different types of rotary engine
function rootblowercom() {
    choice = 'RBCE';
    comdisplay();
}
function vanetypecom() {
    choice = 'VTCE';
    comdisplay();
}
function centrifugalcom() {
    choice = "CFCE";
    comdisplay();
}
function axialcom() {
    choice = 'ACE';
    comdisplay();
}

// this is the list of  section :
const list = ["REngine", "CE-Engine", "ICEngine","TEngine", "RECE", "ROCE","RBCE","VTCE","CFCE","ACE"];
// function to display and hide the calculation function:
function display(){
    document.getElementById('Calculation').style.display = "block";
    for (i = 0; i < list.length; i++) {
        if(list[i] == choice){
            document.getElementById(choice).style.display = "block";
        }else{
            document.getElementById(list[i]).style.display = "none";
        }
    }
}
function comdisplay(){
    document.getElementById("CE-Engine").style.display = "block";
    document.getElementById('Calculation').style.display = "block";
    for(i = 0;i<list.length;i++){
        if(list[i] == choice || list[i] == "CE-Engine"){
            document.getElementById(choice).style.display = "block";
        }else{
        document.getElementById(list[i]).style.display = "none";
        }
    }
}

function diameter(D,dunit){
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
    return D;
}

function length(L,lunit){
    if (lunit == 1) {
        L = L / 100;
    } else if (lunit == 2) {
        L = L / 1000;
    } else if (lunit == 3) {
        L = L;
    }
    return L;
}

function pressure(p,punit){
    punit = parseInt(document.getElementById('ic-punit').value);
    if (punit == 1) {
        p = p * 100;
    } else if (punit == 2) {
        p = p;
    } else if (punit == 3) {
        p = p / 1000;
    }
    return p;
}

// table
function table(table1,table2){
    let tableBody = document.getElementById("tableBody");
    let str = "";
    for(i=0;i<table1.length;i++){
        str += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${table1[i]}</td>
        <td>${table2[i]}</td> 
        </tr>`; 
    }
    tableBody.innerHTML = str;
}



// This Function Calculates The IC Engine Parameters
function ICcalculate() {
    D = parseFloat(document.getElementById('IC-D').value);
    let dunit = parseInt(document.getElementById('ic-dunit').value);
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
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
    T = document.getElementById('IC-T').value;
    BWD = document.getElementById('IC-BWD').value;
    let bwdunit = parseInt(document.getElementById('ic-bwdunit').value);
    if (bwdunit == 1) {
        BWD = BWD / 100;
    } else if (bwdunit == 2) {
        BWD = BWD / 1000;
    } else if (bwdunit == 3) {
        BWD = BWD;
    }
    v = parseFloat(document.getElementById("IC-Va").value);
    vs = parseFloat(document.getElementById("IC-Vs").value);
    A = pi * (D * D) / 4;
    IP = ((p * L * A * n * K) / 60).toFixed(3);
    if(T == ""){
        if (BWD == "") {
        T = (F * (D / 2));
    } else {
            T = (F * (BWD / 2));
        }
    }

    BP = ((2 * pi * N * T) / 60000).toFixed(3);
    FP = (IP - BP).toFixed(3);
    BSFC = (mf*3600 / BP).toFixed(4);
    ISFC = (mf*3600/ IP).toFixed(4);
    BTe = (BP / (mf * cv)).toFixed(2);
    ITe = (IP / (mf * cv)).toFixed(2);
    Me = (BP / IP).toFixed(2);
    Ve = (v / vs).toFixed(2);

    document.getElementById('Results').style.display = "block";
    let table1 = ['Indicated Power','Brake Power','Frictional Power','Specific Fuel Consumption','Indicated Specific Fuel Consumption','Mechanical Efficiency','Volumetric Efficiency','Indicated Thermal Efficiency','Brake Thermal Efficiency'];
    let table2 =[IP,BP,FP,BSFC,ISFC,Me,Ve,ITe,BTe];
    table(table1,table2);
    let result1= ['Mechanical Efficiency', 'Volumetric Efficiency', 'Indicated Thermal Efficiency', 'Brake Thermal Efficiency'];
    let result2= [Me,Ve,ITe,BTe];
    label = 'Efficiencies';
    graph(result1,result2,label);
    if(stroke == 2){
        image = '2stroke.gif';
    }else{
        image = '4stroke.gif';
    }
    img(image);
    window.location.href = "#Results";
}

// this is for two stage compressor
const reslist = ["res-msp","res-msp1","res-msp2","res-mspu","res-mspu1","res-mspu2"]
function stage() {
    let stage = document.getElementById("res-tyos").value
    if (stage == 2) {
        for(i = 0; i < reslist.length; i++){
        document.getElementById(reslist[i]).style.display = "block";
        }
    } else if (stage == 1) {
        for(i = 0; i < reslist.length; i++){
        document.getElementById(reslist[i]).style.display = "none";
        }
    }
}

// This Function Calculates The Compresor Parameters
function RESCcalculate() {
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
    
if(isNaN(ma)){
        ma = ((p1*v)/(R*T1)).toFixed(2);
}

mf = 1.4;
T2 = T1*Math.pow((p2/p1),((mf-1)/mf))
if (n == 0){
        Win = p1 * v * (Math.log(p2 / p1));
    } else{
        Win = (n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n) - 1)).toFixed(3);
    }
    T4 = T3*Math.pow((p4/p3),(n-1)/n)
    if(isNaN(p3) && isNaN(p4) && isNaN(T3)){
        IP = (Win * N * K / 60).toFixed(3);
    }else{
        if(isNaN(ma)){
            IP1 = (Win * N * K / 60).toFixed(3);
        }else{
            IP1 = parseFloat(((mf/(mf-1))*ma*R*(T2-T1)).toFixed(3));
        }
            IP2 = parseFloat((n / (n - 1 )*ma*R*(T4-T3)).toFixed(3)) ;
            IP = IP1+IP2;
    }
    BP = // We need to find
        FP = (IP - BP).toFixed(3);
    Me = (IP / BP).toFixed(2);
    Mpow = (BP / Me).toFixed(3);
    result1= ['Motor Power','Indicated Power','Brake Power','Frictional Power']
    result2= [Mpow,IP,BP,FP];
    label = 'Power';
    graph(result1,result2,label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Indicated Power','Brake Power','Frictional Power','Mechanical Efficiency','Motor Power'];
    table2 =[IP,BP,FP,Me,Mpow];
    table(table1,table2);
    image = 'rescom.jpg';
    img(image);
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
    result1= ['Actual Work done','Indicated Power','Brake Power','Frictional Power']
    result2= [Wact,IP,BP,FP];
    label = 'Power';
    graph(result1,result2,label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Actual Work done','Indicated Power','Brake Power','Frictional Power','Root Blower Efficiency','Mechanical Efficiency'];
    table2 =[Wact,IP,BP,FP,Roote,Me];
    table(table1,table2);
    image = 'rbcom.jpg';
    img(image);
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
    result1= ['Work done by Vane','Indicated Power','Brake Power','Frictional Power']
    result2= [Wvane,IP,BP,FP];
    label = 'Power';
    graph(result1,result2,label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Work Done by Vane Compressor','Indicated Power','Brake Power','Frictional Power','Vane Type Compressor Efficiency','Mechanical Efficiency'];
    table2 =[Wvane,IP,BP,FP,Vanee,Me];
    table(table1,table2);
    image = 'vtcom.jpg';
    img(image);
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
    result1= ['Work Input','Power Required','Change In Entropy']
    result2= [Win,Pin,Ds];
    label = 'Power';
    graph(result1,result2,label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Work Input','Power Required','Isentropic Efficiency','Change In Entropy'];
    table2 =[Win,Pin,isene,Ds];
    table(table1,table2);
    console.log(choice);
    if(ch == 'CFCE'){
        image = 'cfcom.jpg';
    }else{
        image = 'afcom.jpg';
    }
    img(image);
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
        F = Fmom + Fpr
    } else {
        F = Fmom;
    }
    let Sthrust = F / ma;
    let Isp = (F / (ma * 9.81)).toFixed(2);
    let Pthrust = F * Va;
    let Ploss = 0.5 * ma * (Vjet - Va) * (Vjet - Va);
    PPropulsion = Pthrust + Ploss;
    let Prope = (2 * S / (1 + (S * S))).toFixed(2);
    let Te = PPropulsion / (ma * CV);
    let SPC = 1 / Isp;
    let Overalle = (Prope * Te).toFixed(2);
    result1= ['Propulsive Efficiency', 'Thermal Efficiency', 'Overall Efficiency'];
    result2= [Prope,Te,Overalle];
    label = 'Efficiencies';
    graph(result1,result2,label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Thrust Produced','Specific Thrust','Specific Impulse','Specific Propullent Consumption','Thrust Power','Power Loss','Propulsive Power','Propulsive Efficiency','Thermal Efficiency','Overall Efficiency'];
    table2 =[F/100,Sthrust,Isp,SPC,Pthrust,Ploss,PPropulsion,Prope,Te,Overalle];
    table(table1,table2);
    image = 'rocket.jpg';
    img(image);
    window.location.href = "#Results";
}

// This Function Calculates The Gas Turbine Parameters
function GTcalculate() {
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
    let T1unit =  parseInt(document.getElementById("gt-T1unit").value);
    if(T1unit == 1){
        T1= (parseInt(T1)+Kelvin);
    }else if(T1unit == 2){
        T1 = T1 + 0.00;
    }else if(T1unit == 3){
        T1 = (T1-32)*(5/9)+Kelvin;
    }
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
    result1= ['Thermal Efficiency','Turbuine Efficency','Compressor Effecicency', 'Back Work Ratio'];
    result2= [THe,Te,Ce,bwr];
    label = 'Efficiencies';
    graph(result1,result2,label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Work Done by Turbine','Work Done by Compressor','Total Net Work','Thermal Efficiency','Turbine Efficiency','Compressor Efficiency','Back Work Ratio','Power Output'];
    table2 =[WT,WC,Wnet,THe,Te,Ce,bwr,pow];
    table(table1,table2);
    image = 'turbine.jpg';
    img(image);
    window.location.href = "#Results";
}

// image display
function img(image){
    let img = document.getElementById("img");
    let strg = "";
    for(i=0;i<1;i++){
        strg += `<img  width="450px" height="450px" src="/static/img/${image}" alt="">`; 
    }
    img.innerHTML = strg;
}
//  graphs
var index = 0;//this is to say that graph is used for first time:
function graph(result1,result2,label){
    if(index>0){
        myChart.destroy();
    }
    if (myChart == "undefined"){
        myChart.destroy();
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:result1,
            datasets: [{
                label: label,
                data:result2,
                backgroundColor: ['red','green','blue','yellow'],
                borderColor: ['black'],
                borderWidth: 2
            }]
        },
    
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            tooltips: {
                mode: 'nearest',
                axis: 'y'
            }
        }
    });
    index =1;//this is to say that graph is already used for first time:
    }
