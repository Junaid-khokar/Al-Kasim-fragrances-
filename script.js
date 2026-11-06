const WHATSAPP_NUMBER = "919425072436";

// Replace these sample entries with your real products, ingredients, sizes and prices.
const fragranceFamilies = [
  {id:"oud",name:"Oud",tag:"DEEP & DISTINCTIVE",description:"Rich, woody scents with depth and character.",symbol:"O",tone:""},
  {id:"fresh",name:"Fresh",tag:"LIGHT & ENERGETIC",description:"Clean, bright scents for an uplifting feel.",symbol:"F",tone:"fresh"},
  {id:"floral",name:"Floral",tag:"SOFT & ELEGANT",description:"Beautiful flower-inspired fragrance profiles.",symbol:"Fl",tone:"floral"},
  {id:"oriental",name:"Oriental",tag:"WARM & OPULENT",description:"Warm amber, spice and sweet fragrance styles.",symbol:"Or",tone:"oriental"},
  {id:"woody",name:"Woody",tag:"EARTHY & REFINED",description:"Smooth woods with a grounded, lasting character.",symbol:"W",tone:"woody"},
  {id:"musk",name:"Musk",tag:"SUBTLE & TIMELESS",description:"Soft, clean and comforting scent profiles.",symbol:"M",tone:"musk"}
];

const subtypes = {
  oud:["Classic Oud","Oud & Rose","Smoky Oud"],
  fresh:["Citrus","Aquatic","Green & Aromatic"],
  floral:["Rose","Jasmine","White Floral"],
  oriental:["Amber","Spicy","Vanilla & Sweet"],
  woody:["Sandalwood","Cedarwood","Vetiver"],
  musk:["White Musk","Soft Musk","Amber Musk"]
};

// Demo placeholders only: update every field before accepting orders.
const products = [
  {id:"oud-01",family:"oud",subtype:"Classic Oud",name:"Your Oud Fragrance",notes:"Oud, woods and warm resins",material:"Add actual materials / notes",size:"[e.g. 50 ml]",price:"₹[Price]",offer:"₹[Offer price]"},
  {id:"oud-02",family:"oud",subtype:"Oud & Rose",name:"Your Oud & Rose",notes:"Oud with a floral rose character",material:"Add actual materials / notes",size:"[e.g. 30 ml]",price:"₹[Price]",offer:"₹[Offer price]"},
  {id:"fresh-01",family:"fresh",subtype:"Citrus",name:"Your Citrus Fragrance",notes:"Bright citrus and fresh accords",material:"Add actual materials / notes",size:"[e.g. 50 ml]",price:"₹[Price]",offer:"₹[Offer price]"},
  {id:"floral-01",family:"floral",subtype:"Rose",name:"Your Rose Fragrance",notes:"Soft rose and delicate floral notes",material:"Add actual materials / notes",size:"[e.g. 30 ml]",price:"₹[Price]",offer:"₹[Offer price]"},
  {id:"oriental-01",family:"oriental",subtype:"Amber",name:"Your Amber Fragrance",notes:"Warm amber and gentle spice",material:"Add actual materials / notes",size:"[e.g. 50 ml]",price:"₹[Price]",offer:"₹[Offer price]"},
  {id:"woody-01",family:"woody",subtype:"Sandalwood",name:"Your Sandalwood Fragrance",notes:"Creamy sandalwood and soft woods",material:"Add actual materials / notes",size:"[e.g. 50 ml]",price:"₹[Price]",offer:"₹[Offer price]"},
  {id:"musk-01",family:"musk",subtype:"White Musk",name:"Your White Musk",notes:"Clean, soft and powdery musk",material:"Add actual materials / notes",size:"[e.g. 30 ml]",price:"₹[Price]",offer:"₹[Offer price]"}
];

const categoryGrid = document.getElementById("categoryGrid");
const catalogPanel = document.getElementById("catalogPanel");
const subtypeList = document.getElementById("subtypeList");
const productGrid = document.getElementById("productGrid");
let selectedFamily = null;
let selectedSubtype = "All";

function renderCategories(){
  categoryGrid.innerHTML = fragranceFamilies.map(f => `
    <article class="category-card" data-family="${f.id}" tabindex="0" role="button" aria-label="Explore ${f.name} fragrances">
      <div class="category-visual ${f.tone}"><div class="category-symbol">${f.symbol}</div></div>
      <div class="category-info"><small>${f.tag}</small><h3>${f.name} Fragrances</h3><p>${f.description}</p><span class="discover">EXPLORE FAMILY <span>→</span></span></div>
    </article>`).join("");
  categoryGrid.querySelectorAll(".category-card").forEach(card => {
    const open = () => openFamily(card.dataset.family);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){e.preventDefault();open();} });
  });
}
function openFamily(id){
  selectedFamily = id; selectedSubtype = "All";
  const family = fragranceFamilies.find(f => f.id === id);
  document.getElementById("catalogKicker").textContent = family.tag;
  document.getElementById("catalogTitle").textContent = family.name + " Fragrances";
  catalogPanel.hidden = false;
  renderSubtypes(); renderProducts();
  catalogPanel.scrollIntoView({behavior:"smooth",block:"start"});
}
function renderSubtypes(){
  const options = ["All", ...(subtypes[selectedFamily] || [])];
  subtypeList.innerHTML = options.map(s => `<button class="subtype-chip ${s===selectedSubtype?"active":""}" data-subtype="${s}">${s}</button>`).join("");
  subtypeList.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
    selectedSubtype = btn.dataset.subtype; renderSubtypes(); renderProducts();
  }));
}
function renderProducts(){
  const items = products.filter(p => p.family === selectedFamily && (selectedSubtype === "All" || p.subtype === selectedSubtype));
  if(!items.length){productGrid.innerHTML = '<p class="empty-products">Products for this fragrance type will be added soon.</p>';return;}
  productGrid.innerHTML = items.map(p => `
    <article class="product-card">
      <div class="product-visual"><span>AK</span></div>
      <div class="product-info">
        <span class="product-type">${p.subtype.toUpperCase()}</span>
        <h4>${p.name}</h4>
        <p>${p.notes}<br><strong>Materials:</strong> ${p.material}<br><strong>Size:</strong> ${p.size}</p>
        <div class="price-line"><strong>${p.offer}</strong><del>${p.price}</del><em>OFFER</em></div>
        <button class="order-button" data-product="${p.id}">ORDER ON WHATSAPP ↗</button>
      </div>
    </article>`).join("");
  productGrid.querySelectorAll(".order-button").forEach(btn => btn.addEventListener("click", () => orderProduct(btn.dataset.product)));
}
function orderProduct(id){
  const p = products.find(item => item.id === id);
  if(!p) return;
  const message = `Hello Al-Kasim Fragrances, I would like to order ${p.name}.\nFragrance: ${p.subtype}\nSize: ${p.size}\nOffer price: ${p.offer}\nPlease share availability and ordering details.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
document.getElementById("backToCategories").addEventListener("click",()=>{
  catalogPanel.hidden = true;
  document.getElementById("fragrances").scrollIntoView({behavior:"smooth"});
});
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent = new Date().getFullYear();
renderCategories();
