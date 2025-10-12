// ==========================
// CART LOGIC
// ==========================
const cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Load cart
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    const data = JSON.parse(saved);
    cart.push(...data);
  }
  renderCart();

  // Nếu có phần danh sách sản phẩm → render
  if (document.getElementById("product-list")) renderProducts();
});

// Add to cart button
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price);
    const found = cart.find((item) => item.name === name);
    if (found) {
      found.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    renderCart();
  });
});

function renderCart() {
  if (!cartItems || !cartCount || !cartTotal) return;
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<tr><td colspan="5">Giỏ hàng trống</td></tr>`;
  } else {
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      cartItems.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price.toLocaleString()} đ</td>
                    <td>
                        <input type="number" min="1" value="${item.quantity}"
                            class="form-control w-50 mx-auto text-center"
                            onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td>${subtotal.toLocaleString()} đ</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">🗑️</button>
                    </td>
                </tr>
            `;
    });
  }

  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartTotal.textContent = total.toLocaleString();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(index, qty) {
  cart[index].quantity = parseInt(qty);
  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// ==========================
// PRODUCT DETAIL LOGIC
// ==========================

// Danh sách sản phẩm
const products = [
  {
    name: "Nike Mercurial Superfly 10 Elite FG",
    price: 8200000,
    image: "../image/nike/ZM+SUPERFLY+10+ELITE+FG (2).avif",
    desc: "Giày đá bóng Nike chính hãng, thiết kế nhẹ, ôm chân và tăng tốc nhanh chóng.",
  },
  {
    name: "Adidas Predator Accuracy",
    price: 1600000,
    image:
      "../image/Adidas/Giay_DJa_Bong_Turf_Predator_Accuracy.4_trang_GY9995_22_model.avif",
    desc: "Dòng giày nổi tiếng của Adidas giúp kiểm soát bóng hoàn hảo và độ bám cao.",
  },
  {
    name: "Puma Future Ultimate",
    price: 3600000,
    image: "../image/Puma/Giày-bóng-đá-FUTURE-8-ULTIMATE-AG.avif",
    desc: "Giày Puma với công nghệ Future 8, giúp di chuyển linh hoạt và cực kỳ êm ái.",
  },
];

// Render danh sách sản phẩm cho product.html
function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;

  list.innerHTML = products
    .map(
      (p) => `
        <div class="col-md-4">
            <div class="card h-100 shadow">
                <img src="${p.image}" class="card-img-top" alt="${p.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="text-muted">${p.price.toLocaleString()} đ</p>
                    <button class="btn btn-warning view-details" data-name="${
                      p.name
                    }">Xem chi tiết</button>
                    <button class="btn btn-warning add-to-cart" data-name="${
                      p.name
                    }" data-price="${p.price}">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Gán lại sự kiện
  list.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      const found = cart.find((item) => item.name === name);
      if (found) {
        found.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }
      saveCart();
      renderCart();
    });
  });

  list.querySelectorAll(".view-details").forEach((btn) => {
    btn.addEventListener("click", () => showProductDetail(btn.dataset.name));
  });
}

// Hiển thị modal chi tiết sản phẩm
function showProductDetail(name) {
  const product = products.find((p) => p.name === name);
  if (!product) return;

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-name").textContent = product.name;
  document.getElementById("modal-desc").textContent = product.desc;
  document.getElementById("modal-price").textContent =
    product.price.toLocaleString() + " đ";

  const addBtn = document.getElementById("modal-add-cart");
  addBtn.onclick = () => {
    const found = cart.find((item) => item.name === product.name);
    if (found) found.quantity++;
    else cart.push({ name: product.name, price: product.price, quantity: 1 });
    saveCart();
    renderCart();
    modal.hide();
  };

  modal.show();
}
