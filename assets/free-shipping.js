console.log("Free shipping JS loaded");

function formatMoney(cents) {
  return "₹" + (cents / 100).toFixed(0);
}

function updateFreeShippingBar() {
  const bars = document.querySelectorAll(".free-shipping-bar");
  if (!bars.length) return;

  fetch("/cart.js")
    .then((res) => res.json())
    .then((cart) => {
      console.log("Cart total:", cart.total_price);

      bars.forEach((bar) => {
        const threshold = parseInt(bar.dataset.threshold, 10);

        if (cart.total_price >= threshold && cart.total_price > 0) {
          bar.textContent = "🎉 You have unlocked FREE SHIPPING!";
        } else {
          const remaining = threshold - cart.total_price;
          bar.textContent =
            "Add " + formatMoney(remaining) + " more to get FREE SHIPPING";
        }
      });
    })
    .catch((err) => {
      console.error("Cart fetch failed", err);
    });
}

document.addEventListener("DOMContentLoaded", updateFreeShippingBar);
document.addEventListener("click", updateFreeShippingBar);
