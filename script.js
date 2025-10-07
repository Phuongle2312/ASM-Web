let cart = [];

// Mua ngay
const muaNgayBtn = document.getElementById("mua-ngay");
if (muaNgayBtn) {
  muaNgayBtn.addEventListener("click", function () {
    const quantity = parseInt(document.getElementById("quantity").value);
    const name = this.dataset.name;
    const price = parseInt(this.dataset.price) || 0;

    if (quantity > 0) {
      let item = cart.find((p) => p.name === name);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.push({ name, price, quantity });
      }
      updateCart();
      alert("Đã thêm vào giỏ hàng");
    }
  });
}
// Nút thêm vào giỏ hàng ở danh sách
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const name = this.dataset.name;
    const price = parseInt(this.dataset.price);

    const item = cart.find((p) => p.name === name);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCart();
  });
});

// Cập nhật giỏ hàng
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartCount || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<tr><td colspan="5">Giỏ hàng trống</td></tr>';
  } else {
    cart.forEach((item, index) => {
      const row = `
            <tr>
              <td>${item.name}</td>
              <td>${item.price.toLocaleString()} đ</td>
              <td>${item.quantity}</td>
              <td>${(item.price * item.quantity).toLocaleString()} đ</td>
              <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Xóa</button></td>
            </tr>
          `;
      cartItems.innerHTML += row;
      total += item.price * item.quantity;
    });
  }

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Chuyển ảnh chính khi bấm thumbnail
const mainImage = document.getElementById("mainImage");
const smallImgs = document.querySelectorAll(".small-img");
smallImgs.forEach((img) => {
  img.addEventListener("click", () => {
    mainImage.src = img.src;
  });
});

updateCart();

// Lắng nghe thay đổi số lượng
document.querySelectorAll(".qty").forEach((input) => {
  input.addEventListener("input", updateCart);
});

// Xóa sản phẩm
document.querySelectorAll(".remove-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.closest("tr").remove();
    updateCart();
  });
});
