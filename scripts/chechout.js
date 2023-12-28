import {products} from '../data/products.js'
import {cart,removeFromCart} from './cart.js'

cart.forEach((cartItem)=>{
    products.forEach((product)=>{
        if(product.id === cartItem.id){
          const cartHTML = `
            <div class="cart-item-container js-cart-item-container-${product.id}" data-product-id ="${product.id}">
            <div class="delivery-date js-delivery-date-${product.id}">
              ${deliveryDayts(11)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-price">
                    $${(product.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${product.id}">
                        ${cartItem.quantity}
                    </span>
                  </span>
                  <div class="update-quantity-conteaner js-update-quantity-conteaner-${product.id}">
                    <input type="number"  inputmode="numeric" value="${cartItem.quantity}" min="1" class="update-quantity-input js-update-quantity-input-${product.id}">
                    <span class="link-primary save-quantity-link" data-product-id ="${product.id}">
                      Save
                    </span>
                  </div>
                  <span class="update-quantity-link js-update-quantity-link-${product.id} link-primary" data-product-id ="${product.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${product.id}" data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input delivery-option-input-1"
                    name="delivery-option-${product.id}" data-date-id="${product.id}">
                  <div>
                    <div class="delivery-option-date js-delivery-option-date-1 ">
                      
                    </div>
                    <div class="delivery-option-price">
                      Free - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input delivery-option-input-2"
                    name="delivery-option-${product.id}" data-date-id="${product.id}">
                  <div>
                    <div class="delivery-option-date js-delivery-option-date-2 ">
                      
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input delivery-option-input-3"
                    name="delivery-option-${product.id}" data-date-id="${product.id}">
                  <div>
                    <div class="delivery-option-date js-delivery-option-date-3 ">
                      
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>`
            document.querySelector('.js-order-summary')
              .innerHTML += cartHTML;
        }      
    });
    document.querySelectorAll('.js-delete-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId = link.dataset.productId
                removeFromCart(productId);
                document.querySelector(`.js-cart-item-container-${productId}`).remove()
                updateCheckoutNumber()
            })
        }) 
    
  })  
function updateCheckoutNumber(){
document.querySelectorAll('.js-return-to-home-link-number').forEach((link)=>{
  link.innerHTML = cart.length;
});
}
updateCheckoutNumber() 

document.querySelectorAll('.update-quantity-link').forEach((update)=>{
  update.addEventListener('click',()=>{
    update.classList.add('display-none');
    document.querySelector(`.js-quantity-label-${update.dataset.productId}`)
        .classList.add('display-none')
    if(update.classList.contains('display-none')){
      document.querySelector(`.js-update-quantity-conteaner-${update.dataset.productId}`)
        .classList.add('display-inline-block')
      document.querySelector(`.js-update-quantity-conteaner-${update.dataset.productId}`)
        .classList.remove('display-none')
    }
  });
});

document.querySelectorAll('.save-quantity-link').forEach((save)=>{
  save.addEventListener('click',()=>{
    document.querySelector(`.js-update-quantity-conteaner-${save.dataset.productId}`)
      .classList.add('display-none');
    document.querySelector(`.js-quantity-label-${save.dataset.productId}`)
      .classList.remove('display-none');
    document.querySelector(`.js-update-quantity-link-${save.dataset.productId}`)
      .classList.remove('display-none');
    const value = document.querySelector(`.js-update-quantity-input-${save.dataset.productId}`).value;
    document.querySelector(`.js-quantity-label-${save.dataset.productId}`).innerHTML = value
    updateCartQuntity(save.dataset.productId , value)
  });
});

function updateCartQuntity(id , value){
  cart.forEach((cartItem) => {
    if(cartItem.id === id){
      cartItem.quantity = JSON.parse(value);
    }
  });
  localStorage.setItem('updatedCart' ,JSON.stringify(cart))
}
function deliveryDayts(upDays) {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + upDays);
  const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];
  const day = dayNames[futureDate.getDay()];
  const month = monthNames[futureDate.getMonth()];
  const date = futureDate.getDate();
  const formattedDate = `${day}, ${month} ${date}`;

  return formattedDate;
}
document.querySelectorAll('.js-delivery-option-date-1').forEach((date)=>{
  date.innerHTML = deliveryDayts(11)
})
document.querySelectorAll('.js-delivery-option-date-2').forEach((date)=>{
  date.innerHTML = deliveryDayts(5)
})
document.querySelectorAll('.js-delivery-option-date-3').forEach((date)=>{
  date.innerHTML = deliveryDayts(3)
})
function selectedDeliveryDate(input , dateNumber){
  document.querySelectorAll(`.delivery-option-input-${input}`).forEach((date)=>{
      date.addEventListener('input',()=>{
        document.querySelector(`.js-delivery-date-${date.dataset.dateId}`)
          .innerHTML =deliveryDayts(dateNumber)
      });
    
  });
}
selectedDeliveryDate('1' , 11)
selectedDeliveryDate('2' , 5)
selectedDeliveryDate('3' , 3)



