
// When the user clicks submit, a POST request is sent to the login endpoint of the API.
function loginUser(eventDetails){
    axios.request({
        method:"POST",
        url:"https://reqres.in/api/login",
        //telling server were sending json data
        headers:{
            "Content_Type": "application?json"
        },
        data:{
            email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value
        }
    }).then(loginUserSuccess).catch(loginUserFailure);

}
// If the login is a success, send the user to a new HTML page called "home.html"
function loginUserSuccess(res){
    console.log(res)
    let loginToken = res.data.token;
    Cookies.set("token", loginToken);
    document.getElementById("loginStatus").innerText = "Well Done"
    setTimeout(changePage, 2000);

}

// If the login failed, inform the user the login was invalid
function loginUserFailure(err){
    console.log(err);
    location.href='/home.html'
    document.getElementById("loginStatus").innerText = "No Good! Try Again!!!"
}
function changePage(){
    window.location = "/home.html"
}

function homePage(){
    if (Cookies.get('token') === undefined){
        // If the user is not logged in it should show them a message that no one is logged in and a button that sends them back to the login page.
        // Cookies will be needed for this!
        let a =  document.createElement('a');
        a.href = 'index.html'
        a.textContent='MustLogin'
        document.body.appendChild(a);
        // let newElem = document.createElement('h1');
        // newElem.textContent = "please login";
        // document.body.appendChild(newElem);
    }else{
        axios.request({
            method:'GET',
            // The API endpoint https://reqres.in/api/unknown (Links to an external site.) sends back an array of colors. For each color sent back show the following:
            url:'https://reqres.in/api/unknown',
        }).then(printColors).catch(function(err){
            console.log(err);
        })
    }
}
function printColors(res){
    //2 data because we have colors inside a property called data and this data property is found inside another data property.
    let response = res.data.data;
    // On the home.html page, give a welcome message to the logged in user and display the following:
    let h1= document.createElement('h1');
    h1.textContent = 'Welcome'
    document.body.appendChild(h1)
    for(let i = 0; i < response.length; i++){
                                     // The color name                         // The year the color was created
        document.body.innerHTML += '<br>The Color Name Is' + response[i].name + 'And The Year Is' + response[i].year;
                                     // A box that shows the actual color
        document.body.innerHTML += '<div style="width:40px; height:40px; background:' + response[i].color + ';"></div>';
        }
        console.log(response);
}
// if statements are here to call each function in the right page
if(location.pathname === '/index.html'){
let form = document.querySelector('form');
form.addEventListener('submit',loginUser);
}
if(location.pathname === '/home.html'){
    homePage();
}
// console.log(location.pathname);
// console.log(Cookies.get('loginToken'));









