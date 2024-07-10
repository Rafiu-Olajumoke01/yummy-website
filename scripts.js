$(document).ready(function () {

    let backendurl = "http://localhost:8000"
    $.ajax({
        type: "get",
        url: "http://localhost:8000/foods/",
        crossDomain: true,
        dataType: "json",
        success: function (response) {
            $.map(response, function (food, index) {
                let eachFood = ` <div class="col-lg-4 menu-item">

                <a href="${backendurl + food.image}" class="glightbox"><img src="${backendurl + food.image}"
                    class="menu-img img-fluid" alt=""></a>
                <h4>${food.name}</h4>
                <p>${food.description}</p>

                <p class="price">
                 ${food.price}
                </p>
                <button onclick="addToCart(${food.id})" class="btn btn-outline-danger">Add to cart </button>
              </div>`

                $("#allfoods").append(eachFood)
            });
        },

        error: function (error) {
            console.log(error);
        }
    });

});
// fetch carts
let userid = localStorage.getItem("userid")

$.ajax({
    type: "get",
    url: `http://localhost:8000/fetchcart/${userid}`,
    dataType: "json",
    success: function (response) {

       


        // total item in cart
        let total = 0;
        $.map(response, function (food, index) {
            total += food.total
        });
        $("#total").text(total)
    },

    error: function (error) {
        console.log(error);
    }
});


// signup
$('#signupform').submit(function(e){
    e.preventDefault();
   
    let form = new FormData(e.currentTarget)

    $.ajax({
        type: "post",
        url: "http://localhost:8000/signup/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
            alert('signup successful');
            window.location.href = "/login.html"
        },
        error: function(error){
            $.map(error.responseJSON, function (value, key) {
                alert(key + ":  " + value)
            });
        }
    });


});


$('#loginform').submit(function(e){
    e.preventDefault();
   
    let form = new FormData(e.currentTarget)

    $.ajax({
        type: "post",
        url: "http://localhost:8000/login/",
        data: form,
        dataType: "json",
        processData: false,
        cache: false,
        contentType: false,
        success: function (response) {
           localStorage.setItem("userid", response)
           localStorage.setItem("login", true)
            window.location.href = "/index.html"
        },
        error: function(error){
            // $.map(error.responseJSON, function (value, key) {
            //     alert(key + ":  " + value)
            // });
            alert(error.responseJSON)
        }
    });


});

function addToCart(id){

    let userid = localStorage.getItem("userid")


    if(userid == null){
        window.location.href = "/login.html"
    }
    else{
        $.ajax({
            type: "get",
            url: `http://localhost:8000/addtocart/${userid}/${id}`,
            dataType: "json",
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                alert("added successfully")
                window.location.reload()
            },
            error: function(error){
                alert(error.responseJSON)
            }
        });
    }
    // alert(id)
    // alert(userid)
}

