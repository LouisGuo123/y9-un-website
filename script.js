window.onscroll = function (e) {
    updatePercent("scrollPercent");
    fillRow();
};
window.onresize = function (e) {
    resetRowHeight();
    fillRow();
};

var active = 1;

var rowHeight = 0;
var fillUsed = new Array(30);
fillUsed.fill(0);

document.getElementById("content").style.display = "block";
resetRowHeight();
fillRow();

function resetRowHeight() {
    rowHeight = document.getElementById("row1").offsetHeight;
}

function fillRow() {
    for(var i = 0; i < 30; i++) {
        if((document.getElementById("row" + (i + 1)).getBoundingClientRect().y <= (window.innerHeight / 2)) && fillUsed[i] == 0 && active == 1) {
            grow(0, "fill" + (i + 1));
            fillUsed[i] = 1;
        }
    }
}

function swap(id1, content1, id2, content2) {
    document.getElementById(content1).style.display = "inline-block";
    document.getElementById(content2).style.display = "none";

    document.getElementById(id1).classList.add("activated");
    document.getElementById(id2).classList.remove("activated");

    document.getElementById(id1).setAttribute("onmousedown", "");
    document.getElementById(id2).setAttribute("onmousedown", "swap('"+id2+"', '"+content2+"', '"+id1+"', '"+content1+"')");

    active = (active == 1) ? 2 : 1;
}

function updatePercent(id) {
    //console.log(window.scrollY + ", "
    //    + Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + ", "
    //    + window.innerHeight + ", "
    //    + (window.scrollY + window.innerHeight));
    //console.log(window.scrollY);
    document.getElementById(id).textContent = Math.round((window.scrollY / (Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight)) * 100) + "%";
    //document.getElementById(id).textContent = window.scrollY;
}

function grow(x, id) {
    if (x > 1) return;
    var k = 8;
    var c = k/2;

    var val = ((1 / (1 + Math.exp((-k * x) + c))) - (1 / (1 + Math.exp(c)))) / ((1 / (1 + Math.exp(-k + c))) - (1 / (1 + Math.exp(c))));

    document.getElementById(id).style.width = (val * 100) + "%";

    setTimeout(function() { grow(x + 0.0025, id); }, 5);
}

function calculateTime(cost, elecost, opu, npu, time, out) {
    var c = document.getElementById(cost).value;
    var z = document.getElementById(elecost).value;
    var o = document.getElementById(opu).value;
    var n = document.getElementById(npu).value;
    var t = document.getElementById(time).value;

    if(c == "" || o == "" || n == "" || t == "") {
        document.getElementById(out).textContent = "You Must Have a Value For Each Field!";
        document.getElementById(out).style.color = "red";
        return;
    }

    if(n >= o) {
        document.getElementById(out).textContent = "Invalid Value for New Power Usage: You Can't Have the New Power Usage be Higher than or Equal to the Old Power Usage!";
        document.getElementById(out).style.color = "red";
        return;
    }

    document.getElementById(out).textContent = "It will take " + (c / ((o - n) * t * z)) + " Days to begin earning back your money.";
    document.getElementById(out).style.color = "black";
}