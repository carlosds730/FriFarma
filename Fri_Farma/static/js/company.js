function expand_all(expand) {
    if (expand) {
        $("#expand_all").css('display', 'None');
        $("#collapse_all").css('display', "");
        var elements = document.getElementsByClassName("member");
        for (var i = 0; i < elements.length; i++) {
            expand_collapse_one(elements[i], "block");
        }
    }
    else {
        $("#collapse_all").css('display', 'None');
        $("#expand_all").css('display', "");
        var elements = document.getElementsByClassName("member");
        for (var i = 0; i < elements.length; i++) {
            expand_collapse_one(elements[i], "None");
        }
    }
}

function expand_collapse_one(elem, use) {
    var a = elem.children;
    for (var i = 0; i < a.length; i++) {
        if (a[i].className == "member-extra-info") {
            a[i].style.display = use;
        }
    }
}

function invert_status(dddd) {
    var b = dddd.parentNode;
    var a = b.children;
    for (var i = 0; i < 2; i++) {
        if (a[i].className == "member-extra-info") {
            if (a[i].style.display == "block") {
                a[i].style.display = "none";
            }
            else {
                a[i].style.display = "block";
            }
            break;
        }
    }
}

function boards() {
    var a = document.getElementById("board_v1");
    var b = document.getElementById("board_v2");
    if (a.style.display == "none") {
        a.style.display = "block";
        b.style.display = "none";
    }
    else {
        b.style.display = "block";
        a.style.display = "none";
    }
}

function pictures() {
    var aa = document.getElementsByClassName("item");
    for (var i = 0; i < aa.length; i++) {
        aa[i].onclick = function () {
            show_image(this);
        }
    }
}

function show_image(node) {
    var big_div = document.createElement("div");
    big_div.id = "big_div";

    //This creates the shadow effect
    var background_div = document.createElement("div");
    background_div.id = "background_div";
    background_div.onclick = function () {
        var bg_dv = document.getElementById("big_div");
        document.getElementsByTagName("body")[0].removeChild(bg_dv);
    };

    //Here goes the content
    var container_div = document.createElement("div");
    container_div.id = "container_div";
    var the_img_src = node.firstChild.src;
    var the_img_caption = document.createElement("p");
    the_img_caption.innerHTML = node.lastChild.innerHTML;
    var the_img = document.createElement("img");
    the_img.src = the_img_src;
    container_div.appendChild(the_img);
    container_div.appendChild(the_img_caption);


    big_div.appendChild(background_div);
    big_div.appendChild(container_div);

    document.getElementsByTagName("body")[0].appendChild(big_div);
}



