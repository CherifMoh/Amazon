

export let cart =JSON.parse(localStorage.getItem('cart')) ||[] ;


// if(JSON.parse(localStorage.getItem('updatedCart'))) {
//   cart = JSON.parse(localStorage.getItem('updatedCart'));
// }

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
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


   