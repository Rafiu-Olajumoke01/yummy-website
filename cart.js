$(document).ready(function () {
    // fetch carts
    let userid = localStorage.getItem("userid")

    $.ajax({
        type: "get",
        url: `http://localhost:8000/fetchcart/${userid}`,
        dataType: "json",
        success: function (response) {
         // display total amount

         let total = 0;
         let quantity = 0

            $.map(response, function (each, index) {

                total += each.quantity * each.food.price
                quantity += each.quantity

                localStorage.setItem("amount", total)

                $("#totalprice").text(total)
                $("#totalitem").text(quantity)
            
                // display cart data

                let backendurl = "http://localhost:8000/"


               let cart = `
                
                <div class="row mb-3 d-flex">
                <div class="col-md-3">
                    <img src="${backendurl + each.food.image}" class="img-fluid" alt="Item 1">
                    <h5>${each.food.name}</h5>
                    <p>${each.food.description}</p>
                </div>
                <div class="col-md-3">
                    <div class="quantity">
                        <button class="btn btn-danger btn-sm">-</button>
                        <input type="number" class="form-control" value=${each.quantity}>
                        <button class="btn btn-danger btn-sm">+</button>
                    </div>
                </div>
                <div class="col-md-3">
                    <p class="mb-0">${each.food.price}</p>
                </div>

                <div class="col-md-3">
                    <p class="mb-0">${each.quantity * each.food.price}</p>
                </div>
            </div>
            <hr>`
            $("#carts").append(cart);
            });
        },

        error: function (error) {
            console.log(error);
        }
    });
});


// setting up paystack
$("#checkout").click(function(){
    payWithPaystack();  // call the function to initiate payment
})

function payWithPaystack() {
    
  
    let handler = PaystackPop.setup({
      key: 'pk_test_ea8b567b7e0998cb136d5de8ad9514ef87156873', // Replace with your public key
      email: "a@b.com",
      amount: localStorage.getItem("amount") * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
      }
    });
  
    handler.openIframe();
  }
  