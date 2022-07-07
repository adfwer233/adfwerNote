let tm = 0;
let flow = 0;

function format_int(value) {
    return (Array(2).join(0)+value).slice(-2);
}

function format_time(sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 3600 % 60;
    h = format_int(h)    
    m = format_int(m)
    s = format_int(s)    
    return `${h}:${m}:${s}`
}

function myclock() {
    tm++;
    document.getElementById('clock').textContent = format_time(tm)
    setTimeout("myclock()", 1000);
}

function init_clock() {
    tm = Math.random() * 10000 + 1;
    tm = Math.floor(tm);
    myclock();
}

function init_flow() {
    flow = (Math.random() * 100) + 1;
    flow = flow.toFixed(2);
    document.getElementById('usage_value').style.width = `${280 * flow / 150}px`
    document.getElementById('usage_flux').textContent = flow.toString() + 'G'
}

function init() {
    init_clock();
    setTimeout('init_flow()', 200)
}