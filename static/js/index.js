let choice, ch;
// ...................................Ic Engines...................
const pi = Math.PI;
let N;
let n;
let L;
let D;
let P;
let cv;
let F;
let v;
let vs;
let pmb;
let IP;
let BP;
let T;
let FP;
let Me;
let Ve;
let r;
let M;
let ma;
let mf = parseInt(0);
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
let stg;
let ra;
let value;
// for Reciprocating Compressor
let p1, p2, p3, IP1, IP2;
const R = 0.287 // units KJ/Kg K
let Win, Mpow;
// root blower compressor
let Wact;
// Vane Type Compressor
let W1, W2, Wvane, Vanee;
//  Centrifugal Compressor
let T1, T2;
const CP = 1.005;
const CV = 0.716;
//  for Rocket engine
let S, Va, Fpr = 0, take, taker, taked;
// Gas Turbine
let T2x, T4x, T3, T4, Kelvin = 273.15;

// Arrays for convertors
var property = new Array();
var unit = new Array();
var factor = new Array();

function select() {
    value = parseInt(document.getElementById('con-p').value);
    unit[0] = ["sq.cm", "sq.m", "sq.km", "sq.inches"];
    factor[0] = [1, 0.0001, 0.0000000001, 0.15];

    unit[1] = ["Joule", "Kilo Watt hour", "kP m", "K cal", "BTU"];
    factor[1] = [1, 0.2778, 0.1019, 0.0002388, 0.0009478];

    unit[2] = ["N", "Kp", "P", "Oz", "Ibf'"];
    factor[2] = [1, 0.1019, 101.972, 3.59694, 0.2248];

    unit[3] = ["mm", "cm", "m", "inch", "foot", "km", "mile"];
    factor[3] = [1, 0.1, 0.001, 0.03937, 0.003280, 0.000001, 0.0000006213];

    unit[4] = ["gram", "Kg", "Lb", "Ton"];
    factor[4] = [1, 0.001, 0.002204, 0.000001102];

    unit[5] = ["Kilo Watt", "PS", "Horse power", "Kp m/s", "K cal/s"];
    factor[5] = [1, 1.35962, 1.34102, 101972, 0.2388];

    unit[6] = ["bar", "Pa", "atm", "PSI", "Kg/cm^2"];
    factor[6] = [1, 100000, 0.9869, 14.504, 1.0197];

    unit[7] = ["cm/s", "m/s", "Km/hr", "mile/hr"];
    factor[7] = [1, 0.01, 0.036, 0.02237];

    unit[8] = ["celsius", "Kelvin", "Farenheit"];
    factor[8] = [1, 273.15, 1.8 + 32];

    unit[9] = ["N cm", "N m", "N mm", "dyn m", "Kgf m", "gf m"];
    factor[9] = [1, 0.01, 10, 1000, 0.001019716, 1.019716213];

    unit[10] = ["mili liter", "liter", "cubic meter", "cubic inch", "cubic feet"];
    factor[10] = [1, 0.001, 0.000001, 0.061023744094732, 0.000035314666721489];

    let unitBody = document.getElementById("con-unit");
    let stru = `<div class="col-md-3" >
    <select onchange="convert()" id="con-u" class="form-select  text-center" aria-label="Default select example">
      <option selected>Select The Units</option>`;
    for (i = 0; i < unit[value].length; i++) {
        stru += ` 
        <option value="${i}">${unit[value][i]}</option>
        `;
    }
    stru += `    </select>
  </div>`;
    unitBody.innerHTML = stru;

}


function convert() {
    let unitvalue = parseInt(document.getElementById('con-u').value);
    let Result = parseFloat(document.getElementById('con-v').value);
  if(isNaN(Result)){
    inputempty();
  }else{
    let ResultBody = document.getElementById("con-unit");
    let conResult =[];
    let strR = `<table class="table">
    <thead>
    <tr>
    <th scope="col">Sno</th>
    <th scope="col">Value</th>
    <th scope="col">Unit</th>
    </tr>
    </thead>
    <tbody>`;
    if(value == 8){
        if(unitvalue == 1){
            Result = Result-273.15;
        }
        if(unitvalue == 2){
            Result = (Result-32)/1.8
        }
        conResult = [Result,Result+273.15,(Result*1.8)+32];
        for (i = 0; i < unit[value].length; i++) {
            strR += ` 
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${(conResult[i])}</td>
                <td>${unit[value][i]}</td>
              </tr>
                `;
        }
    }else{
        Result = Result / factor[value][unitvalue];
        for (i = 0; i < unit[value].length; i++) {
            strR += ` 
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${(Result * factor[value][i])}</td>
                <td>${unit[value][i]}</td>
              </tr>
                `;
        }
    }
    strR += `    </tbody>
    </table>`;
    ResultBody.innerHTML = strR;
  }
}


// function to assign choice values
function Ic() {
    choice = 'ICEngine';
    window.location.href = "#Calculation";
    display();
}

function CON() {
    choice = 'convertor';
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
function JE() {
    choice = 'JETEngine';
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
const list = ["REngine", "convertor", "JETEngine", "CE-Engine", "ICEngine", "TEngine", "RECE", "ROCE", "RBCE", "VTCE", "CFCE", "ACE"];
// function to display and hide the calculation function:
function display() {
    document.getElementById('Results').style.display = "none";
    document.getElementById('Calculation').style.display = "block";
    for (i = 0; i < list.length; i++) {
        if (list[i] == choice) {
            document.getElementById(choice).style.display = "block";
        } else {
            document.getElementById(list[i]).style.display = "none";
        }
    }
}
function comdisplay() {
    document.getElementById('Results').style.display = "none";
    document.getElementById("CE-Engine").style.display = "block";
    document.getElementById('Calculation').style.display = "block";
    for (i = 0; i < list.length; i++) {
        if (list[i] == choice || list[i] == "CE-Engine") {
            document.getElementById(choice).style.display = "block";
        } else {
            document.getElementById(list[i]).style.display = "none";
        }
    }
}
function diameter(D, dunit) {
    if (dunit == 1) {
        D = D / 100;
    } else if (dunit == 2) {
        D = D / 1000;
    } else if (dunit == 3) {
        D = D;
    }
    return D;
}
function length(L, lunit) {
    if (lunit == 1) {
        L = L / 100;
    } else if (lunit == 2) {
        L = L / 1000;
    } else if (lunit == 3) {
        L = L;
    }
    return L;
}
function pressure(P, punit) {
    if (punit == 1) {
        P = P * 100;
    } else if (punit == 2) {
        P = P;
    } else if (punit == 3) {
        P = P / 1000;
    }
    return P;
}
function tempurature(T, tunit) {
    if (tunit == 1) {
        T = (parseInt(T) + Kelvin);
    } else if (tunit == 2) {
        T = T + 0.00;
    } else if (tunit == 3) {
        T = (T - 32) * (5 / 9) + Kelvin;
    }
    return T;
}
function mass(M, munit) {
    if (munit == 1) {
        M = M;
    } else if (munit == 2) {
        M = M / 60;
    }
    return M;
}
function hmass(M, munit) {
    if (munit == 1) {
        M = M * 3600;
    } else if (munit == 2) {
        M = M;
    }
    return M;
}
// table
function table(table1, table2, table3) {
    let tableBody = document.getElementById("tableBody");
    let str = "";
    for (i = 0; i < table1.length; i++) {
        str += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${table1[i]}</td>
        <td>${table2[i]}</td> 
        <td>${table3[i]}</td> 
        </tr>`;
    }
    tableBody.innerHTML = str;
}
// This Function Calculates The IC Engine Parameters
function ICcalculate() {
    D = parseFloat(document.getElementById('IC-D').value);
    let dunit = parseInt(document.getElementById('ic-dunit').value);
    D = diameter(D, dunit);
    L = parseFloat(document.getElementById('IC-L').value);
    let lunit = parseInt(document.getElementById('ic-Lunit').value);
    L = length(L, lunit);
    N = parseFloat(document.getElementById('IC-N').value);
    K = parseFloat(document.getElementById('IC-K').value);
    let stroke = parseInt(document.getElementById('ic-Strokes').value);
    if (stroke == 2) {
        n = N;
    } else if (stroke == 4) {
        n = N / 2;
    }
    P = parseFloat(document.getElementById('IC-P').value);
    let punit = parseInt(document.getElementById('ic-punit').value);
    P = pressure(P, punit);
    cv = parseFloat(document.getElementById("IC-CV").value);
    r = parseFloat(document.getElementById("ic-a/f").value);
    M = parseFloat(document.getElementById("IC-M").value);
    let munit = parseInt(document.getElementById('ic-munit').value);
    let maunit = parseFloat(document.getElementById("ic-maunit").value);
    ma = hmass(ma, maunit);
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
    IP = ((P * L * A * n * K) / 60).toFixed(3);
    if (T == "") {
        if (BWD == "") {
            T = (F * (D / 2));
        } else {
            T = (F * (BWD / 2));
        }
    }
    BP = ((2 * pi * N * T) / 60000).toFixed(3);
    FP = (IP - BP).toFixed(3);
    BSFC = (mf / BP).toFixed(3);
    ISFC = (mf / IP).toFixed(3);
    BTe = ((BP / (mf / 3600 * cv)) * 100).toFixed(2);
    ITe = ((IP / (mf / 3600 * cv)) * 100).toFixed(2);
    Me = ((BP / IP) * 100).toFixed(2);
    if (isNaN(v) || isNaN(vs)) {
        ra = A * L * n * K;
        Ve = ((ma / 3600) / (A * L * ra * (n / 60)) * 100).toFixed(2);
    } else {
        Ve = ((v / vs) * 100).toFixed(2);
    }
    document.getElementById('Results').style.display = "block";
    let table1 = ['Indicated Power', 'Brake Power', 'Frictional Power', 'Specific Fuel Consumption', 'Indicated Specific Fuel Consumption', 'Mechanical Efficiency', 'Volumetric Efficiency', 'Indicated Thermal Efficiency', 'Brake Thermal Efficiency'];
    let table2 = [IP, BP, FP, BSFC, ISFC, Me, Ve, ITe, BTe];
    let table3 = ['KW', 'KW', 'KW', 'Kg/KWh', 'Kg/KWh', '%', '%', '%', '%']
    table(table1, table2, table3);
    let result1 = ['Mechanical Efficiency', 'Volumetric Efficiency', 'Indicated Thermal Efficiency', 'Brake Thermal Efficiency'];
    let result2 = [Me, Ve, ITe, BTe];
    label = 'Efficiencies';
    graph(result1, result2, label);
    if (stroke == 2) {
        image = '2stroke.gif';
    } else {
        image = '4stroke.gif';
    }
    img(image);
    window.location.href = "#Results";
}
// this is for two stage compressor
const reslist = ["res-msp", "res-msp1", "res-msp2", "res-mspu", "res-mspu1", "res-mspu2"]
function stage() {
    stg = document.getElementById("res-tyos").value
    if (stg == 2) {
        for (i = 0; i < reslist.length; i++) {
            document.getElementById(reslist[i]).style.display = "block";
        }
    } else if (stg == 1) {
        for (i = 0; i < reslist.length; i++) {
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
    D = diameter(D, dunit);
    L = parseFloat(document.getElementById('res-L').value);
    let lunit = parseFloat(document.getElementById('res-Lunit').value);
    L = length(L, lunit);
    p1 = parseFloat(document.getElementById('res-P1').value);
    let p1unit = parseFloat(document.getElementById('res-p1unit').value);
    p1 = pressure(p1, p1unit);
    p2 = parseFloat(document.getElementById('res-P2').value);
    let p2unit = parseFloat(document.getElementById('res-p2unit').value);
    p2 = pressure(p2, p2unit);
    p3 = parseFloat(document.getElementById('res-P3').value);
    let p3unit = parseFloat(document.getElementById('res-p3unit').value);
    p3 = pressure(p3, p3unit);
    if (isNaN(p3)) {
        p3 = parseFloat(p2);
    }
    p4 = parseFloat(document.getElementById('res-P4').value);
    let p4unit = parseFloat(document.getElementById('res-p4unit').value);
    p4 = pressure(p4, p4unit);
    v = parseFloat(document.getElementById("res-V").value);
    if (isNaN(v)) {
        v = pi / 4 * D * D * L * (N / 60) * K;
    }
    T1 = parseFloat(document.getElementById("res-T1").value);
    let T1unit = parseFloat(document.getElementById("res-T1unit").value);
    T1 = tempurature(T1, T1unit);
    T3 = parseFloat(document.getElementById("res-T3").value);
    let T3unit = parseFloat(document.getElementById("res-T3unit").value);
    T3 = tempurature(T3, T3unit);
    ma = parseFloat(document.getElementById("res-Ma").value);
    let maunit = parseFloat(document.getElementById("res-maunit").value);
    ma = mass(ma, maunit);
    if (isNaN(ma)) {
        ma = ((p1 * v) / (R * T1)).toFixed(2);
    }
    mf = 1.4;
    T2 = T1 * Math.pow((p2 / p1), ((mf - 1) / mf))
    if (n == 0) {
        Win = p1 * v * (Math.log(p2 / p1));
    } else {
        Win = (n / (n - 1) * (p1 * v) * (Math.pow((p2 / p1), (n - 1) / n) - 1)).toFixed(3);
    }
    T4 = T3 * Math.pow((p4 / p3), (n - 1) / n)
    if (stg == 1) {
        IP = (Win * N * K / 60).toFixed(3);
    } else {
        if (isNaN(ma)) {
            IP1 = (Win * N * K / 60).toFixed(3);
        } else {
            IP1 = parseFloat(((mf / (mf - 1)) * ma * R * (T2 - T1)).toFixed(3));
        }
        IP2 = parseFloat((n / (n - 1) * ma * R * (T4 - T3)).toFixed(3));
        IP = IP1 + IP2;
    }
    BP = // We need to find
        FP = (IP - BP).toFixed(3);
    Me = (IP / BP);
    Mpow = (BP / Me).toFixed(3);
    Me = (Me * 100).toFixed(2);
    result1 = ['Motor Power', 'Indicated Power', 'Brake Power', 'Frictional Power']
    result2 = [Mpow, IP, BP, FP];
    label = 'Power';
    graph(result1, result2, label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Indicated Power', 'Brake Power', 'Frictional Power', 'Mechanical Efficiency', 'Motor Power'];
    table2 = [IP, BP, FP, Me, Mpow];
    let table3 = ['KW', 'KW', 'KW', '%', 'KW']
    table(table1, table2, table3);
    image = 'rescom.jpg';
    img(image);
    window.location.href = "#Results";
}
// This is for Rootblower
function RBCcalculate() {
    p1 = document.getElementById('rb-P1').value;
    let p1unit = document.getElementById('rb-p1unit').value;
    p1 = pressure(p1, p1unit);
    p2 = document.getElementById('rb-P2').value;
    let p2unit = document.getElementById('rb-p2unit').value;
    p2 = pressure(p2, p2unit);
    v = document.getElementById("rb-V").value;
    T = document.getElementById("rb-T").value;
    let Tunit = document.getElementById("rb-Tunit").value;
    T = tempurature(T, Tunit);
    ma = document.getElementById("rb-Ma").value;
    let maunit = document.getElementById("rb-maunit").value;
    ma = mass(ma, maunit);
    if (isNaN(v)) {
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
    Me = ((IP / BP) * 100).toFixed(2);
    result1 = ['Actual Work done', 'Indicated Power', 'Brake Power', 'Frictional Power']
    result2 = [Wact, IP, BP, FP];
    label = 'Power';
    graph(result1, result2, label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Actual Work done', 'Indicated Power', 'Brake Power', 'Frictional Power', 'Root Blower Efficiency', 'Mechanical Efficiency'];
    table2 = [Wact, IP, BP, FP, Roote, Me];
    let table3 = ['KW', 'KW', 'KW', 'KW', '%', '%']
    table(table1, table2, table3);
    image = 'rbcom.jpg';
    img(image);
    window.location.href = "#Results";
}
//  This is for Vane Type Compressor
function VTCcalculate() {
    N = document.getElementById("vt-N").value;
    p1 = document.getElementById('vt-P1').value;
    let p1unit = document.getElementById('vt-p1unit').value;
    p1 = pressure(p1, p1unit);
    p2 = document.getElementById('vt-P2').value;
    let p2unit = document.getElementById('vt-p2unit').value;
    p2 = pressure(p2, p2unit);
    p3 = document.getElementById('vt-P3').value;
    let p3unit = document.getElementById('vt-p3unit').value;
    p3 = pressure(p3, p3unit);
    v = document.getElementById("vt-V").value;
    T = document.getElementById("vt-T").value;
    let Tunit = document.getElementById("vt-Tunit").value;
    T = tempurature(T, Tunit);
    ma = document.getElementById("vt-Ma").value;
    let maunit = document.getElementById("vt-maunit").value;
    ma = mass(ma, maunit);
    if (isNaN(v)) {
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
    Me = ((IP / BP) * 100).toFixed(2);
    result1 = ['Work done by Vane', 'Indicated Power', 'Brake Power', 'Frictional Power']
    result2 = [Wvane, IP, BP, FP];
    label = 'Power';
    graph(result1, result2, label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Work Done by Vane Compressor', 'Indicated Power', 'Brake Power', 'Frictional Power', 'Vane Type Compressor Efficiency', 'Mechanical Efficiency'];
    table2 = [Wvane, IP, BP, FP, Vanee, Me];
    let table3 = ['KW', 'KW', 'KW', 'KW', '%']
    table(table1, table2, table3);
    image = 'vtcom.jpg';
    img(image);
    window.location.href = "#Results";
}
//  This for centifugal compressor
function CFCcalculate() {
    ma = document.getElementById("cf-Ma").value;
    let maunit = document.getElementById("cf-maunit").value;
    ma = mass(ma, maunit);
    p1 = document.getElementById('cf-P1').value;
    let p1unit = document.getElementById('cf-p1unit').value;
    p1 = pressure(p1, p1unit);
    p2 = document.getElementById('cf-P2').value;
    let p2unit = document.getElementById('cf-p2unit').value;
    p2 = pressure(p2, p2unit);
    n = 1.4;
    T1 = document.getElementById("cf-T1").value;
    let T1unit = document.getElementById("cf-T1unit").value;
    T1 = tempurature(T1, T1unit);
    T2 = document.getElementById("cf-T2").value;
    let T2unit = document.getElementById("cf-T2unit").value;
    T2 = tempurature(T2, T2unit);
    T2x = (T1 * Math.pow((p2 / p1), (n - 1) / n)).toFixed(1);
    let isene = (((T2x - T1) / (T2 - T1)) * 100).toFixed(2);
    let Pin = (ma * CP * (T2 - T1)).toFixed(3);
    Win = (CP * (T2 - T1)).toFixed(3);
    let Ds = (ma * (CP * Math.log(T2 / T1) - R * Math.log(p2 / p1))).toFixed(3); // change in entropy
    result1 = ['Work Input', 'Power Required', 'Change In Entropy']
    result2 = [Win, Pin, Ds];
    label = 'Power';
    graph(result1, result2, label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Work Input', 'Power Required', 'Isentropic Efficiency', 'Change In Entropy'];
    table2 = [Win, Pin, isene, Ds];
    let table3 = ['KW', 'KW', '%', 'KW']
    table(table1, table2, table3);
    if (ch == 'CFCE') {
        image = 'cfcom.jpg';
    } else {
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
function jva() {
    taker = parseInt(document.getElementById("j-vr").value);
    if (taker == 1) {
        document.getElementById("jva").style.display = "none";
    } else if (taker == 2) {
        document.getElementById("jva").style.display = "block";
    }
}
function mava() {
    taked = parseInt(document.getElementById("j-mava").value);
    if (taked == 1) {
        document.getElementById("mava").style.display = "block";
    } else if (taked == 2) {
        document.getElementById("mava").style.display = "none";
    }
}
// This Function Calculates The Rocket Engine Parameters
function REcalculate() {
    p1 = parseFloat(document.getElementById('r-pe').value);
    let p1unit = parseInt(document.getElementById('r-p1unit').value);
    p1 = pressure(p1, p1unit);
    p2 = parseFloat(document.getElementById('r-pa').value);
    let p2unit = parseInt(document.getElementById('r-p2unit').value);
    p2 = pressure(p2, p2unit);
    ma = parseFloat(document.getElementById("r-ma").value);
    let maunit = parseInt(document.getElementById("r-maunit").value);
    ma = mass(ma, maunit);
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
        Va = S * Vjet;
    } else if (take == 2) {
        Va = parseFloat(document.getElementById("r-va").value);
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
    D = diameter(D, dunit);
    let Ae = pi / 4 * D * D;
    let Fmom = ma * Vjet;
    Fpr = Ae * (p1 - p2);
    // F = Fmom;
    if (p1 = !"NaN" && p2 != "NaN") {
        F = (Fmom + Fpr) / 1000;
    } else {
        F = (Fmom) / 1000;
    }
    let Sthrust = ((F * 1000) / (ma)).toFixed(2);
    let Isp = ((F * 1000) / (ma * 9.81)).toFixed(2);
    let Pthrust = (F * Va).toFixed(2);
    let Ploss = 0.5 * ma * (Vjet - Va) * (Vjet - Va);
    PPropulsion = Pthrust + Ploss;
    let Prope = ((2 * S / (1 + (S * S))) * 100).toFixed(2);
    let Te = (PPropulsion / (ma * CV) * 100).toFixed(2);
    let SPC = 1 / Isp;
    let Overalle = ((Prope * Te) / 100).toFixed(2);
    result1 = ['Propulsive Efficiency', 'Thermal Efficiency', 'Overall Efficiency'];
    result2 = [Prope, Te, Overalle];
    label = 'Efficiencies';
    graph(result1, result2, label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Thrust Produced', 'Specific Thrust', 'Specific Impulse', 'Specific Propullent Consumption', 'Thrust Power', 'Power Loss', 'Propulsive Power', 'Propulsive Efficiency', 'Thermal Efficiency', 'Overall Efficiency'];
    table2 = [F, Sthrust, Isp, SPC, Pthrust, Ploss, PPropulsion, Prope, Te, Overalle];
    let table3 = ['KN', 'N/Kg', 'sec', ' /sec', 'KW', 'KW', 'KW', '%', '%', '%']
    table(table1, table2, table3);
    image = 'rocket.jpg';
    img(image);
    window.location.href = "#Results";
}
// This Function Calculates The Rocket Engine Parameters
function JETcalculate() {
    let Vjet = parseFloat(document.getElementById("j-Vjet").value);
    let vunit = parseInt(document.getElementById("j-vunit").value);
    if (vunit == 1) {
        Vjet = Vjet;
    } else if (vunit == 2) {
        Vjet = Vjet * (5 / 18);
    } else if (vunit == 3) {
        Vjet = Vjet / 2.237;
    }
    if (taker == 1) {
        S = parseFloat(document.getElementById("j-va").value);
        Va = S * Vjet;
    } else if (taker == 2) {
        Va = parseFloat(document.getElementById("j-va").value);
        let vaunit = parseInt(document.getElementById("j-vaunit").value);
        if (vaunit == 1) {
            Va = Va;
        } else if (vaunit == 2) {
            Va = Va * (5 / 18);
        } else if (vaunit == 3) {
            Va = Va / 2.237;
        }
        S = Va / Vjet;
    }
    D = parseFloat(document.getElementById('j-D').value);
    let dunit = parseInt(document.getElementById('j-dunit').value);
    D = diameter(D, dunit);
    Ae = pi / 4 * (D * D);
    ma = parseFloat(document.getElementById("j-ma").value);
    let maunit = parseInt(document.getElementById("j-maunit").value);
    if (taked == 1) {
        ma = mass(ma, maunit);
    } else {
        ma = ma * Va * Ae;
    }
    mf = parseFloat(document.getElementById("j-mf").value);
    let mfunit = parseInt(document.getElementById("j-mfunit").value);
    mf = mass(mf, mfunit);
    cv = parseFloat(document.getElementById("j-CV").value);
    F = ((ma + mf) * (Vjet - Va) / 1000).toFixed(2);
    let Sthrust = ((F * 1000) / (ma + mf)).toFixed(2);
    let Isp = ((F * 1000) / ((ma + mf) * 9.81)).toFixed(2);
    let Pthrust = (F * Va).toFixed(2);
    PPropulsion = ((ma * (((Vjet * Vjet) - (Va * Va)) / 2)) / 1000).toFixed(2);
    let Prope = ((Pthrust / PPropulsion) * 100).toFixed(2);
    let Te = (PPropulsion / (mf * cv) * 100).toFixed(2);
    let Overalle = ((Prope * Te) / 100).toFixed(2);
    result1 = ['Propulsive Efficiency', 'Thermal Efficiency', 'Overall Efficiency'];
    result2 = [Prope, Te, Overalle];
    label = 'Efficiencies';
    graph(result1, result2, label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Thrust Produced', 'Specific Thrust', 'Specific Impulse', 'Thrust Power', 'Propulsive Power', 'Propulsive Efficiency', 'Thermal Efficiency', 'Overall Efficiency'];
    table2 = [F, Sthrust, Isp, Pthrust, PPropulsion, Prope, Te, Overalle];
    let table3 = ['KN', 'N/Kg', 'sec', 'KW', 'KW', '%', '%', '%']
    table(table1, table2, table3);
    image = 'jet.gif';
    img(image);
    window.location.href = "#Results";
}
// This Function Calculates The Gas Turbine Parameters
function GTcalculate() {
    p = parseFloat(document.getElementById('gt-P').value);
    let p1unit = parseInt(document.getElementById('gt-punit').value);
    p1 = pressure(p1, p1unit);
    v = parseFloat(document.getElementById('gt-V').value);
    T1 = parseFloat(document.getElementById("gt-T1").value);
    let T1unit = parseInt(document.getElementById("gt-T1unit").value);
    T1 = tempurature(T1, T1unit);
    T2 = parseFloat(document.getElementById("gt-T2").value);
    let T2unit = parseInt(document.getElementById("gt-T2unit").value);
    T2 = tempurature(T2, T2unit);
    T3 = parseFloat(document.getElementById("gt-T3").value);
    let T3unit = parseInt(document.getElementById("gt-T3unit").value);
    T3 = tempurature(T3, T3unit);
    T4 = parseFloat(document.getElementById("gt-T4").value);
    let T4unit = parseInt(document.getElementById("gt-T4unit").value);
    T4 = tempurature(T4, T4unit);
    r = parseFloat(document.getElementById("gt-Rp").value);
    n = 1.4;
    let WT, WC;
    if (isNaN(T2)) {
        WC = (CP * (T2x - T1)).toFixed(3);
    } else {
        WC = (CP * (T2 - T1)).toFixed(3);
    }
    if (isNaN(T4)) {
        WT = (CP * (T3 - T4x)).toFixed(3);
    } else {
        WT = (CP * (T3 - T4)).toFixed(3);
    }
    let Wnet = (WT - WC).toFixed(3);
    let qin = CP * (T3 - T2);
    let qout = CP * (T4 - T1);
    let THe = ((Wnet / qin) * 100).toFixed(2);
    T2x = T1 * Math.pow(r, (n - 1) / n);
    T4x = T3 / (Math.pow(r, (n - 1) / n));
    let Te = (((T3 - T4) / (T3 - T4x)) * 100).toFixed(2);
    let Ce = (((T2x - T1) / (T2 - T1)) * 100).toFixed(2);
    let bwr = ((WC / WT) * 100).toFixed(2);
    ma = (p * v) / R * T1;
    pow = ma * Wnet;
    result1 = ['Thermal Efficiency', 'Turbuine Efficency', 'Compressor Effecicency', 'Back Work Ratio'];
    result2 = [THe, Te, Ce, bwr];
    label = 'Efficiencies';
    graph(result1, result2, label);
    document.getElementById('Results').style.display = "block";
    table1 = ['Work Done by Turbine', 'Work Done by Compressor', 'Total Net Work', 'Thermal Efficiency', 'Turbine Efficiency', 'Compressor Efficiency', 'Back Work Ratio', 'Power Output'];
    table2 = [WT, WC, Wnet, THe, Te, Ce, bwr, pow];
    let table3 = ['KW', 'KW', 'KW', '%', '%', '%', '%', 'KW']
    table(table1, table2, table3);
    image = 'turbine.jpg';
    img(image);
    window.location.href = "#Results";
}

// image display
function img(image) {
    let img = document.getElementById("img");
    let strg = "";
    for (i = 0; i < 1; i++) {
        strg += `<img  width="450px" height="450px" src="/static/img/${image}" alt="">`;
    }
    img.innerHTML = strg;
}
//  graphs
var index = 0;//this is to say that graph is used for first time:
function graph(result1, result2, label) {
    if (index > 0) {
        myChart.destroy();
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: result1,
            datasets: [{
                label: label,
                data: result2,
                backgroundColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: 'rgb(255, 99, 132)'
                    }
                },
                title: {
                    display: true,
                    text: label,
                },
                tooltip: {
                    usePointStyle: true,
                    backgroundColor: 'black',

                },
                animation: {
                    onmouseenter: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 300 + context.datasetIndex * 100;
                        }
                        return delay;
                    },
                }
            }
        }
    });
    index = 1;//this is to say that graph is already used for first time:
}

//  for equation solve matrix

function solve2(a, u) {
    for (i = 1, k = 0; i >= 0; i--, k++)
        for (j = 2; j >= 0; j--)
            a[i][j] = a[i][j] - a[k][j] * (a[i][0] / a[k][k]);
    u[1] = a[0][2] / a[0][0];
    u[2] = a[1][2] / a[1][1];
}

function solve3(a, u) {
    for (i = 1; i < 3; i++)
        for (j = 3; j >= 0; j--)
            a[i][j] = a[i][j] - a[0][j] * (a[i][0] / a[0][0]);
    for (i = 0; i < 3; i += 2)
        for (j = 3; j >= 0; j--)
            a[i][j] = a[i][j] - a[1][j] * (a[i][1] / a[1][1]);
    for (i = 0; i < 2; i++)
        for (j = 3; j >= 0; j--)
            a[i][j] = a[i][j] - a[2][j] * (a[i][2] / a[2][2]);
    for (i = 1; i <= 3; i++)
        u[i] = a[i - 1][3] / a[i - 1][i - 1];
}
