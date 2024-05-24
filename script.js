document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productDashboard = document.getElementById("productDashboard");
  const addButton = document.getElementById("addbtn");

  addButton.classList.add("hidden");

  let products = [];
  let cart = [];
  let idCounter = 0;

  productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    if (!image.match(/\.(jpg|png|gif)$/)) {
      alert("Image URL must end with .jpg, .png, or .gif");
      return;
    }
    const newProduct = {
      id: idCounter++,
      name: productName,
      price: parseFloat(price),
      image: image,
      check: false,
    };
    products.push(newProduct);
    renderProducts();
    productForm.reset();

    addButton.classList.remove("hidden");
  });

  function renderProducts() {
    productDashboard.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add(
        "product",
        "border",
        "border-gray-300",
        "rounded-md",
        "max-w-xs",
        "my-2",
        "mx-auto"
      );
      productDiv.innerHTML = `
                <div class="flex items-center border rounded-lg p-4 bg-white">
                    <input type="checkbox" class="w-4 h-4 text-2xl accent-rose-600 px-2 py-2" data-id="${product.id}" >
                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white flex items-center ml-4"> 
                        <img src="${product.image}" alt="${product.name}" class="w-16 h-16">
                    </div>
                    <div class="ml-4"> 
                        <span class="text-gray-700 font-semibold text-lg">${product.name}</span> 
                        <br>
                        <span class="text-gray-700 font-semibold text-lg">${product.price}$</span> 
                    </div>
                </div>
            `;
      productDashboard.appendChild(productDiv);
    });
  }
  
});
