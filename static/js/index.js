let choice;
// ...................................Ic Engines...................
let N ;
let L;
let D;
const pi = 3.141592654;
let p;
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
let mf;
let BSFC;
let ISFC;
let BTe;
let ITe;
let K;
let A;
let BWD = 0;
  
// function to assign choice values
function Ic(){
    choice = 'IC';
    // console.log(choice)\
    window.location.href = "#Calculation";
    document.getElementById("ICEngine").style.display="block";
}
function TE(){
    choice = 'TE';
    // console.log(choice)
}
function CE(){
    choice = 'CE';
    // console.log(choice)
}
function RE(){
    choice = 'RE';
    // console.log(choice)
}

// This function check The Choice and Send To Particular Function
function calculate(){
    // console.log("calculate is called")
    if(choice == 'IC'){
        ICcalculate()
    }else if(choice=='TE'){
        Tcalculate()
    }else if(choice=='CE'){
        Ccalculate()
    }else if(choice=='RE'){
        Rcalculate()
        // console.log("avatledhu ra")
    }else{
    }
}

// This Function Calculates The IC Engine Parameters
function ICcalculate(){
    // console.log("IC Engine Claculation is On Working Process");
    D = document.getElementById('D').value;
    let dunit = document.getElementById('dunit').value;
    if(dunit == 1){
        D = D/100;
    }else if(dunit == 2){
        D = D/1000;
    }else if(dunit == 3){
        D = D;
    }
    L = document.getElementById('L').value;
    let lunit  = document.getElementById('Lunit').value;
    if(lunit == 1){
        L = L/100;
    }else if(lunit == 2){
        L = L/1000;
    }else if(lunit == 3){
        L = L;
    }
    N = document.getElementById('N').value;
    K = document.getElementById('K').value;
    let stroke = document.getElementById('Strokes').value;
    let n;
    if(stroke == 2){
        n= N;
    }else if(stroke == 4){
        n = N/2;
    }
    p = document.getElementById('P').value;
    let punit = document.getElementById('punit').value;
    if(punit == 1){
        p = p*100;
    }else if(punit == 2){
        p = p;
    }else if(punit == 3){
        p = p/1000;
    }
    cv = document.getElementById("CV").value;
    r = document.getElementById("a/f").value;
    M = document.getElementById("M").value;
    let munit = document.getElementById('munit').value;
    if(munit == 1){
        ma = M;
        mf = ma/r;
    }else if(munit == 2){
        mf = M;
        ma = mf*r;
    }
    F = document.getElementById("F").value;
    BWD = document.getElementById('BWD').value;
    let bwdunit = document.getElementById('bwdunit').value;
    if(bwdunit == 1){
        BWD = BWD/100;
    }else if(bwdunit == 2){
        BWD = BWD/1000;
    }else if(bwdunit == 3){
        BWD =BWD;
    }
    // console.log(BWD)
    v = document.getElementById("Va").value;
    vs = document.getElementById("Vs").value;
    A = pi*(D*D)/4;
    IP =((p*L*A*n*K)/60).toFixed(3);
    if(BWD == 0){
        T = F*(D/2);
    }else{
        T = F*(BWD/2);
    }
    BP = ((2*pi*N*T)/60000).toFixed(3);
    FP = (IP-BP).toFixed(3);
    BSFC = (mf/BP).toFixed(3);
    ISFC = (mf/IP).toFixed(3);
    BTe = (BP/(mf*cv)).toFixed(2);
    ITe = (IP/(mf*cv)).toFixed(2);
    Me = (BP/IP).toFixed(2);
    Ve = (v/vs).toFixed(2);
    document.getElementById('IP').innerHTML = IP+" KW";
    document.getElementById('BP').innerHTML = BP+" KW";
    document.getElementById('FP').innerHTML = FP+" KW";
    document.getElementById('BSFC').innerHTML = BSFC+" Kg/KWh";
    document.getElementById('ISFC').innerHTML = ISFC+" Kg/KWh";
    document.getElementById('Me').innerHTML = Me+" / "+Me*100+" %";
    document.getElementById('Ve').innerHTML = Ve+" / "+Ve*100+" %";
    document.getElementById('ITe').innerHTML = ITe+" / "+ITe*100+" %";
    document.getElementById('BTe').innerHTML = BTe+" / "+BTe*100+" %";
    document.getElementById("ICResults").style.display="block";
    window.location.href = "#Results";
}

// This Function Calculates The Turbine Parameters
function Tcalculate(){
    console.log("Turbine Claculation is On Working Process")
}

// This Function Calculates The Compresor Parameters
function Ccalculate(){
    console.log("Compressor Claculation is On Working Process")
}

// This Function Calculates The Rocket Engine Parameters
function Rcalculate(){
    console.log("Rocket Engine Claculation is On Working Process")
}