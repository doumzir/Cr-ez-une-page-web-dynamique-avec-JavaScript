const openModalLink = document.getElementById("Edit");
const closeModalLink = document.getElementById("close-modal");
let displayModal = null;
let dynamicIdDelet;
let obj;
let  returnModal = document.getElementById('return-modal');
let modal = document.getElementById("modal");
openModalLink.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
    displayModal = 1;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
});
targetmodal = document.getElementById('modal')
window.addEventListener('click', function (event) {
    if (displayModal === null) { return false };
    if (targetmodal === event.target || closeModalLink === event.target) {
        modal.style.display = "none";
        displayModal = null;
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
    }
});
window.addEventListener('keydown', function (event) {
    if (displayModal === null) { return false };
    if (event.key === 'Escape' || event.keyCode === 27) {
        modal.style.display = 'none';
        displayModal = null;
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
    }
});
document.getElementById('BtnAddImg').addEventListener('click', function (e) {
    document.getElementById('modalGalerie').style.display = "none";
    document.getElementById('addEdit').style.display = "flex";
});
function returnMenuModal(){
    document.getElementById('modalGalerie').style.display = "flex";
    document.getElementById('addEdit').style.display = "none";

}
returnModal.addEventListener('click', function (e) {
returnMenuModal()
});
function previewImage(){
    document.getElementById('inputImgstyle').classList.add('hidden')
    document.getElementById('inputImgstyle').style.padding="0px"
    let image =document.getElementById('image').files;
    if (image.length>0){
        let fileReader = new FileReader();
        fileReader.onload = function (event){
            document.getElementById('srcImage').src = ""+ event.target.result+"";
            document.getElementById('srcImage').style.display="block";
        }
        fileReader.readAsDataURL(image[0])
    }
}
function addElementOnpage(idelement){
    let srcImage = document.getElementById('srcImage').src
    let newTitle = document.getElementById('title').value;
    let newCat = document.getElementById('categorylist').value;
    document.querySelector(".gallery").innerHTML += `<figure class="category${newCat} article article${idelement} show" id="article${idelement}">
					<img crossorigin="anonymous" src="${srcImage}" alt="${newTitle}">
					
					<figcaption>${newTitle}</figcaption>
				</figure>`
    document.querySelector(".galleryEdit").innerHTML += `<figure class="category${newCat} show article article${idelement}" id="article${idelement}" >
        <img onclick="deletcomponant(${idelement})"  id="trash${idelement}"class = "trash" src="assets/icons/trash.svg"</img>
					<img crossorigin="anonymous" src="${srcImage}" alt="${newTitle}">
                    
					
					<figcaption>Edit</figcaption>
				</figure>`
};
document.getElementById('works').addEventListener('submit', function (e) {
    e.preventDefault();
    const formdata = new FormData();
    const userFile = document.getElementById('image').files[0];
    const userTitle = document.getElementById('title').value;
    const userCat = document.getElementById('categorylist').value;
    formdata.append('image', userFile, 'image.jpeg');
    formdata.append('title', userTitle);
    formdata.append('category', userCat);
    fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            /*"Content-Type": "multipart/form-data",*/
        },
        body: formdata,

    }).then(res => res.json()).then(data => {obj= data;}).then(()=> {console.log(obj);}).then(() => {addElementOnpage(obj.id);}).then(()=>{returnMenuModal();}).catch(err => console.log("une erreur est survenue veuillez réessayer ultérieurement"));

})
function deleteDynamic(dynamicIdDelet){
    var x = document.getElementsByClassName(`article${dynamicIdDelet}`);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
}
function deletcomponant(idDelet) {
    dynamicIdDelet = idDelet;
    fetch(`http://localhost:5678/api/works/${idDelet}`, {
        method: "DELETE",
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
        }
    }).then(res => res.text()).then(data => console.log(data)).then(()=> {deleteDynamic(dynamicIdDelet)}).catch(err => alert("une erreur est survenue veuillez réessayer ultérieurement"));
}

