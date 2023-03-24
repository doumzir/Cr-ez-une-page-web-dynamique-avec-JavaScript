input = document.getElementById("email")
errorMail = document.getElementById("errorMail")
pageEdit = 0;

let form = {
    email: document.querySelector("#-email"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#connectionBtn"),

};
form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "http://localhost:5678/api/users/login";

    fetch(login, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            // code here //
            if (data.message == "user not found" || data.error) {
                errorMail.style.display = "block";
            } else {
                speautorized = data.token
                errorMail.style.display = "none";
                sessionStorage.setItem('token', speautorized)
                sessionStorage.setItem('showEdit', 1)
                window.open(
                    "../index.html",
                );

            }
        })
        .catch((err) => {
            alert(`une erreur est survenu veuillez réessayer plus tard ${err}`);
        });
});
