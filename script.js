const imageForm = document.getElementById("imageForm");
const imageUrlInput = document.getElementById("imageUrl");
const imageFileInput = document.getElementById("imageFile");
const gallery = document.getElementById("gallery");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

// Load images from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedImages = JSON.parse(localStorage.getItem("images")) || [];
  savedImages.forEach((src) => addImageToGallery(src, false));
});

imageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = imageUrlInput.value.trim();
  const file = imageFileInput.files[0];

  if (url) {
    addImageToGallery(url, true);
    imageUrlInput.value = ""; // Clear input
  } else if (file) {
    const reader = new FileReader();
    reader.onload = (event) => addImageToGallery(event.target.result, true);
    reader.readAsDataURL(file); // Read file as a data URL
    imageFileInput.value = ""; // Reset file input
  } else {
    alert("Please enter a URL or select a file.");
  }
});

function addImageToGallery(src, saveToStorage) {
  const imgContainer = document.createElement("div");
  imgContainer.className = "relative group";

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Gallery Image";
  img.className = "w-full h-full object-cover rounded-lg shadow cursor-pointer";

  // Show modal on click
  img.addEventListener("click", () => {
    modalImage.src = src;
    imageModal.classList.remove("hidden");
  });

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className =
    "absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition";
  removeBtn.onclick = () => {
    imgContainer.remove();
    removeImageFromStorage(src);
  };

  imgContainer.appendChild(img);
  imgContainer.appendChild(removeBtn);
  gallery.appendChild(imgContainer);

  // Save to localStorage
  if (saveToStorage) saveImageToStorage(src);
}

function saveImageToStorage(src) {
  const savedImages = JSON.parse(localStorage.getItem("images")) || [];
  savedImages.push(src);
  localStorage.setItem("images", JSON.stringify(savedImages));
}

function removeImageFromStorage(src) {
  const savedImages = JSON.parse(localStorage.getItem("images")) || [];
  const updatedImages = savedImages.filter((image) => image !== src);
  localStorage.setItem("images", JSON.stringify(updatedImages));
}

// Close modal
closeModal.addEventListener("click", () => {
  imageModal.classList.add("hidden");
});

  