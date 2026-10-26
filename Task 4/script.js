// Elemen UI
const toast = document.querySelector("#toast");
const demoDialog = document.querySelector("#demo-dialog");
const showDemoButton = document.querySelector("#show-demo");
const closeDemoButton = document.querySelector("#close-demo");
const orderForm = document.querySelector("#order-form");

let toastTimeout;

// Fungsi Menampilkan Notifikasi Toast
function showNotification(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("is-visible");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4500);
}

// Menangani Form Pembelian / Kontak
if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const selectedPackage = document.querySelector("#package").value;

    showNotification(`Terima kasih, ${name}! Pesanan paket ${selectedPackage} berhasil dikirim.`);
    orderForm.reset();
  });
}

// Menangani Modal Pratinjau Demo
if (showDemoButton && demoDialog && closeDemoButton) {
  showDemoButton.addEventListener("click", () => {
    demoDialog.showModal();
  });

  closeDemoButton.addEventListener("click", () => {
    demoDialog.close();
  });

  // Tutup modal jika area luar diklik
  demoDialog.addEventListener("click", (event) => {
    const bounds = demoDialog.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (isOutside) {
      demoDialog.close();
    }
  });
}

// FAQ Accordion (Hanya 1 terbuka di saat bersamaan)
const faqItems = document.querySelectorAll(".faq-list details");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});