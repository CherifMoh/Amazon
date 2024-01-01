export let cart =JSON.parse(localStorage.getItem('cart')) ||[] ;

// if(JSON.parse(localStorage.getItem('updatedCart'))) {
//   cart = JSON.parse(localStorage.getItem('updatedCart'));
// }

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}
export function addToCart(productId){
  let matchingItem = 0;
  if(cart){
    cart.forEach((cartItem)=>{
      if(cartItem.id === productId){
        matchingItem = cartItem;
      }        
    });
  }
  if(matchingItem){
    matchingItem.quantity +=1
     saveToStorage()
  }else if(cart){
    cart.push({
      id:productId,
      quantity:1,
      shippingPrice:499,
    });
    saveToStorage()
  }
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.id !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart
  saveToStorage()
}


   