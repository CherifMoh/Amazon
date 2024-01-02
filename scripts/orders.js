import {products} from '../data/products.js'

export let orders = JSON.parse(localStorage.getItem('orders')) ||[] 
// localStorage.removeItem('orders')

orders.forEach(order => {
    console.log(order.id)
    const html=`
    <div class="order-container">
    
        <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
                </div>
                <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${order.total}</div>
                </div>
            </div>

            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
            </div>
        </div> 

        <div class="order-details-grid order-details-grid-${order.id}">
        </div>

    </div>`
    
    if(document.querySelector('.orders-grid')){
        document.querySelector('.orders-grid').innerHTML += html
    }

    order.cart.forEach(cartItem=>{
        products.forEach(product=>{
            console.log(order.id)
            if(cartItem.id === product.id){
                const html=`
                <div class="product-image-container">
                <img src="${product.image}">
                </div>
                
                <div class="product-details">
                <div class="product-name">
                ${product.name}
                </div>
                <div class="product-delivery-date">
                Arriving on: ${cartItem.shippingDate}
                </div>
                <div class="product-quantity">
                Quantity: ${cartItem.quantity}
                </div>
                <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                </button>
                </div>
                
                <div class="product-actions">
                <a href="tracking.html">
                <button class="track-package-button button-secondary">
                Track package
                </button>
                </a>
                </div>
                `

                if(document.querySelector(`.order-details-grid-${order.id}`)){
                    document.querySelector(`.order-details-grid-${order.id}`).innerHTML += html
                }
            }
        })
    })
    });