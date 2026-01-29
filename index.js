const products = [
  {"id":1,"name":"Ruby Gemstone","category":"Gemstone","price":15000,"weight":2.5,"origin":"India","stock":10},
  {"id":2,"name":"Emerald Stone","category":"Gemstone","price":22000,"weight":3.2,"origin":"Brazil","stock":5},
  {"id":3,"name":"Sapphire Blue","category":"Gemstone","price":18000,"weight":2.8,"origin":"Sri Lanka","stock":7},
  {"id":4,"name":"Yellow Sapphire","category":"Gemstone","price":25000,"weight":3.5,"origin":"Thailand","stock":4},
  {"id":5,"name":"Opal Stone","category":"Gemstone","price":12000,"weight":1.9,"origin":"Australia","stock":12},
  {"id":6,"name":"Garnet Red","category":"Gemstone","price":8000,"weight":2.1,"origin":"India","stock":20},
  {"id":7,"name":"Amethyst Purple","category":"Gemstone","price":9000,"weight":2.4,"origin":"Brazil","stock":15},
  {"id":8,"name":"Topaz Blue","category":"Gemstone","price":14000,"weight":3.0,"origin":"Russia","stock":6},
  {"id":9,"name":"Peridot Green","category":"Gemstone","price":11000,"weight":2.6,"origin":"Pakistan","stock":9},
  {"id":10,"name":"Aquamarine","category":"Gemstone","price":20000,"weight":3.3,"origin":"Madagascar","stock":3},

  {"id":11,"name":"Gold Ring","category":"Jewelry","price":35000,"weight":5.0,"origin":"India","stock":2},
  {"id":12,"name":"Diamond Ring","category":"Jewelry","price":95000,"weight":4.2,"origin":"Belgium","stock":1},
  {"id":13,"name":"Silver Necklace","category":"Jewelry","price":12000,"weight":8.0,"origin":"Thailand","stock":15},
  {"id":14,"name":"Platinum Band","category":"Jewelry","price":55000,"weight":6.1,"origin":"UK","stock":3},
  {"id":15,"name":"Pearl Necklace","category":"Jewelry","price":28000,"weight":7.5,"origin":"Japan","stock":6},
  {"id":16,"name":"Gold Bracelet","category":"Jewelry","price":42000,"weight":9.0,"origin":"India","stock":4},
  {"id":17,"name":"Silver Anklet","category":"Jewelry","price":9000,"weight":6.5,"origin":"India","stock":18},
  {"id":18,"name":"Diamond Earrings","category":"Jewelry","price":60000,"weight":3.8,"origin":"Belgium","stock":2},
  {"id":19,"name":"Ruby Pendant","category":"Jewelry","price":30000,"weight":4.5,"origin":"India","stock":5},
  {"id":20,"name":"Emerald Bracelet","category":"Jewelry","price":48000,"weight":6.9,"origin":"Brazil","stock":3},

  {"id":21,"name":"Loose Diamond","category":"Loose Stone","price":110000,"weight":1.2,"origin":"South Africa","stock":2},
  {"id":22,"name":"Moissanite","category":"Loose Stone","price":25000,"weight":1.5,"origin":"USA","stock":10},
  {"id":23,"name":"Cubic Zirconia","category":"Loose Stone","price":5000,"weight":2.0,"origin":"China","stock":30},
  {"id":24,"name":"Lab Grown Diamond","category":"Loose Stone","price":45000,"weight":1.8,"origin":"USA","stock":8},
  {"id":25,"name":"Raw Ruby","category":"Loose Stone","price":17000,"weight":3.7,"origin":"Myanmar","stock":6}
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryFilter = document.getElementById("categoryFilter");
const clearBtn = document.getElementById("clearBtn");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const viewToggle = document.getElementById("viewToggle");

let isListView = false;
viewToggle.addEventListener("click", () => {
  isListView = !isListView;
  productList.classList.toggle("list-view");

  viewToggle.textContent = isListView ? "Grid View" : " List View";
});

const renderProducts = (list) => {
  productList.innerHTML = list.length
    ? list
        .map(
          p => `
          <div class="product">
            <h3>${p.name}</h3>
            <span class="category">${p.category}</span>
            <p class="price">₹${p.price}</p>
            <p>Origin: ${p.origin}</p>
            <p>Stock: ${p.stock}</p>
          </div>
        `
        )
        .join("")
    : "<p>No products found</p>";
};

const applyFilters = () => {
  let result = [...products];

  // Search
  const text = searchInput.value.toLowerCase();
  result = result.filter(p => p.name.toLowerCase().includes(text));

  // Category
  result = categoryFilter.value === "All" ? result : result.filter(p => p.category === categoryFilter.value);

    // Price filter
const minPrice = Number(minPriceInput.value);
const maxPrice = Number(maxPriceInput.value);

result = result.filter(p => {if (minPrice && p.price < minPrice) return false;
  if (maxPrice && p.price > maxPrice) return false;
  return true;
});


  // Sort
switch (sortSelect.value) {
  case "az":
    result.sort((a, b) => a.name.localeCompare(b.name));
    break;

  case "za":
    result.sort((a, b) => b.name.localeCompare(a.name));
    break;

  case "priceLow":
    result.sort((a, b) => a.price - b.price);
    break;

  case "priceHigh":
    result.sort((a, b) => b.price - a.price);
    break;
}

 
  renderProducts(result);
};

const clearFilters = () => {
  searchInput.value = "";
  categoryFilter.value = "All";
  sortSelect.value = "";
  minPriceInput.value = "";
  maxPriceInput.value = "";
  renderProducts(products);
};


// Events
searchInput.addEventListener("input", applyFilters);
sortSelect.addEventListener("change", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
clearBtn.addEventListener("click", clearFilters);
minPriceInput.addEventListener("input", applyFilters);
maxPriceInput.addEventListener("input", applyFilters);



// Initial render
renderProducts(products);
