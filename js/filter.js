function AddClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function DeletClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function filterSelection(c) {
    let MyArticle, i;
    MyArticle = document.getElementsByClassName("article");
    if (c == "all") c = "";
    for (i = 0; i < MyArticle.length; i++) {
        DeletClass(MyArticle[i], "show");
        if (MyArticle[i].className.indexOf(c) > -1) AddClass(MyArticle[i], "show");
    }
    let liContainer = document.getElementById("filter");
    let li = liContainer.getElementsByClassName("filterLi");
    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener("click", function () {
            let current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }

}

