let products = [];
let idCounter = 0;
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('productForm');
  const productDashboard = document.getElementById('productDashboard');
  const addButton = document.getElementById('addbtn');

  addButton.classList.add('hidden');

  productForm.addEventListener('submit', event => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;

    if (!isValidImageUrl(image)) {
      alert('Please enter a valid image URL.');
      return;
    }

    const newProduct = {
      id: idCounter++,
      name: productName,
      price: parseFloat(price),
      image: image,
      checkStatus: false,
    };
    products.push(newProduct);
    renderProducts();
    productForm.reset();

    addButton.classList.remove('hidden');
  });

  function isValidImageUrl(image) {
    try {
      const input = new URL(image);
      return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
    } catch {
      return false;
    }
  }

  function renderProducts() {
    productDashboard.innerHTML = '';
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add(
        'product',
        'border',
        'border-gray-300',
        'rounded-md',
        'max-w-xs',
        'my-2',
        'mx-auto'
      );
      productDiv.innerHTML = `
      <div class="flex items-center border rounded-lg p-4 bg-white">
        <input type="checkbox" class="w-4 h-4 text-2xl accent-rose-600 px-2 py-2" data-id="${
          product.id
        }" ${product.checkStatus ? 'checked' : ''} onchange="toggleSelector(event)">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white flex items-center ml-4"> 
          <img src="${product.image}" alt="${product.name}" class="w-16 h-16">
        </div>
        <div class="ml-4"> 
          <span class="text-gray-700 font-semibold text-lg">${
            product.name
          }</span> 
          <br>
          <span class="text-gray-700 font-semibold text-lg">${
            product.price
          }$</span> 
        </div>
      </div>
    `;
      productDashboard.appendChild(productDiv);
    });
  }

  productDashboard.addEventListener('change', event => {
    if (event.target.type === 'checkbox') {
      toggleSelector(event);
    }
  });

  addButton.innerHTML = `<button id="ToCart" class="mx-2 my-2 h-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-l font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Add to cart</button>`;

  document.getElementById('ToCart').addEventListener('click', () => {
    cart = products.filter(product => product.checkStatus);
    displayCart(cart);

    
    products.forEach(product => product.checkStatus = false);
    renderProducts();
  });
});

function toggleSelector(event) {
  const checkbox = event.target;
  const checkboxId = parseInt(checkbox.getAttribute('data-id'));
  const product = products.find(product => product.id === checkboxId);
  product.checkStatus = checkbox.checked;
}

function displayCart(cart) {
  const displayDiv = document.getElementById('displayCart');
  displayDiv.innerHTML = '';

  cart.forEach(product => {
    const div = document.createElement('div');

    div.classList.add(
      'product',
      'border',
      'border-gray-300',
      'rounded-md',
      'max-w-xs',
      'my-2',
      'mx-auto'
    );

    div.innerHTML = `
        <div class="flex items-center border rounded-lg p-4 bg-white">
          <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white flex items-center ml-4"> 
            <img src="${product.image}" alt="${product.name}" class="w-16 h-16">
          </div>
          <div class="ml-4"> 
            <span class="text-gray-700 font-semibold text-lg">${product.name}</span> 
            <br>
            <span class="text-gray-700 font-semibold text-lg">${product.price}$</span> 
            <button
              type="button"
              id="${product.id}"
              onclick="removeProductFromCart(${product.id})"
              class=" flex items-center justify-center  border border-transparent rounded-md shadow-sm text-xs px-1 py-1 text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >Remove</button>
          </div>
        </div>
      `;
    displayDiv.appendChild(div);
  });

  const btnDiv = document.getElementById('btnCal');
  if (cart.length > 0) {
    btnDiv.innerHTML = `<button id="cfp" onclick="calculateFinalPrice()" class="mx-2 my-2 h-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-l font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Calculate Final Price</button>`;
  } else {
    btnDiv.innerHTML = '';
  }

  const totalDiv = document.getElementById('totalSection');
  totalDiv.innerHTML = `<h2 id="total" class="text-xl mt-3 hidden">You have to pay:</h2>`;
}

function removeProductFromCart(productId) {
  cart = cart.filter(product => product.id !== productId);
  displayCart(cart);
}

function calculateFinalPrice() {
  let total = cart.reduce((sum, product) => sum + product.price, 0);
  const totalPrice = document.getElementById('total');
  totalPrice.textContent = `You have to pay: ${total.toFixed(2)} $`;
  totalPrice.classList.remove('hidden');
}
