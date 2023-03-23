var token = sessionStorage.getItem('token');
var pageEdit = sessionStorage.getItem('showEdit');
/*let testtry = document.getElementById('Edit');*/
let numberDynamic;
let idDynamic



if (pageEdit == 1) {
    editShow = document.getElementById('Edit');
    DeletClass(editShow, "buttonEdit");
}

class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    }


}
class Categorie {
    constructor(jsonCategorie) {
        jsonCategorie && Object.assign(this, jsonCategorie);
    }


}


fetch('http://localhost:5678/api/categories').then(categoriedata => categoriedata.json()).then(jsonListCategorie => {
    for (let jsonCategorie of jsonListCategorie) {
        let categorie = new Categorie(jsonCategorie);
        document.querySelector(".filter").innerHTML += `<li class="filterLi" onclick="filterSelection('category${categorie.id}')" id="categorie${categorie.id}">${categorie.name}</li>`



    }

});

fetch('http://localhost:5678/api/works').then(dataarticle => dataarticle.json()).then(jsonListArticle => {
    for (let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);

        document.querySelector(".gallery").innerHTML += `<figure class="category${article.category.id} article article${article.id}" id="article${article.id}">
					<img crossorigin="anonymous" src="${article.imageUrl}" alt="${article.title}">
					
					<figcaption>${article.title}</figcaption>
				</figure>`

        document.querySelector(".galleryEdit").innerHTML += `<figure class="category${article.category.id} article article${article.id}" id="article${article.id}">
        <img onclick="deletcomponant(${article.id})" id="trash${article.id}" class = "trash" src="assets/icons/trash.svg"</img>
					<img crossorigin="anonymous" src="${article.imageUrl}" alt="${article.title}">
                    
					
					<figcaption>Edit</figcaption>
				</figure>`



    }
    const ids = [...document.querySelectorAll(".trash")].map(el => el.id);
    console.log(ids); // ["first", "second"]
    numberDynamic = document.getElementsByTagName("figure");
    let DynamicString =(numberDynamic[Object.keys(numberDynamic).pop()]).id;
    idDynamic= parseInt(DynamicString.replace('article',''));


    filterSelection("all")
});
/*if (pageEdit == 1) {
    showEdit = document.getElementById("Edit");
    DeletClass(showEdit, "buttonEdit");
}*/
