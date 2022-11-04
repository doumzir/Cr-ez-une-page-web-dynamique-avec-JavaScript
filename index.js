
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
        console.log("end");


    }

});
console.log("salut");
fetch('http://localhost:5678/api/works').then(dataarticle => dataarticle.json()).then(jsonListArticle => {
    for (let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);

        document.querySelector(".gallery").innerHTML += `<figure class="category${article.category.id} article" id="article${article.id}">
					<!--<img src="${article.imageUrl}" alt="${article.title}">-->
					
					<figcaption>${article.title}</figcaption>
				</figure>`
        console.log("end");

        filterSelection("all")
    }
});


