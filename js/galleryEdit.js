class Article {
    constructor(jsonArticle) {
        jsonArticle && Object.assign(this, jsonArticle);
    }


}
/*class Categorie {
    constructor(jsonCategorie) {
        jsonCategorie && Object.assign(this, jsonCategorie);
    }


}*/

fetch('http://localhost:5678/api/works').then(dataarticle => dataarticle.json()).then(jsonListArticle => {
    for (let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);

        document.querySelector(".galleryEdit").innerHTML += `<figure class="category${article.category.id} article" id="article${article.id}">
                    <img crossorigin="anonymous" src="${article.imageUrl}" alt="${article.title}">
                	
                    <button>editer</button>
                </figure>`
        console.log("end");


    }
});
let token = localStorage.getItem('token');

function previewImage(){
    let image =document.getElementById('file').files;
    if (image.length>0){
         let fileReader = new FilesReader();
         fileReader.onload = function (event){
             document.getElementById('inputImgstyle').innerHTML -=`<i class="fa-regular fa-image"></i>
<p class="buttonLike">+Ajouter Photo</p>
<p>jpg, png: 4mo max</p> ` ;
             document.getElementById('inputImgstyle').innerHTML +=`<img alt="test" src="${event}">`
         }
             fileReader.readAsDataURL(file[0])
        
    }

}
document.getElementById('works').addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const userFile = document.getElementById('image').files[0];
    const userTitle = document.getElementById('title').value;
    const userCat = document.getElementById('category').value;
    const formdata = new FormData();
    formdata.append('image', userFile, 'image.jpeg');
    formdata.append('title', userTitle);
    formdata.append('category', userCat);
    console.log(formdata);
    fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            /*"Content-Type": "multipart/form-data",*/

        },
        body: formdata,

    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));


}, false)
