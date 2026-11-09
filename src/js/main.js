import {loading , ToggleView , SetPage} from "./ui/interface.js"
let AreaTags = document.querySelector("#search-filters-section").children[0].children[1];
let CategoryTags = document.querySelector("#categories-grid");
let ProductCategorys = document.querySelector("#product-categories")
let RecipesGrid = document.querySelector("#recipes-grid");
let RecipesCount = document.querySelector("#recipes-count");
let MealDetails = document.querySelector("#meal-details").children[0].children
let NutritionFactsContainer = document.querySelector("#nutrition-facts-container")
let LogMealBtn = document.querySelector("#log-meal-btn")
let SearchInput = document.querySelector("#search-input")
let ProductRating = document.querySelectorAll(".nutri-score-filter")
let ProductGrid = document.querySelector("#products-grid")
let ProductCount = document.querySelector("#products-count")
let ProductSearch = document.querySelector("#product-search-input")
let BarcodeSearch = document.querySelector("#barcode-input")
let body = document.querySelector("body")
let MainContent = document.querySelector("#main-content")
let FoodLogSection = document.querySelector("#foodlog-today-section").children
let PageLoader = document.querySelector(".loading")
let ProductRanks = {
  a : "green",
  b : "lime",
  c : "yellow",
  d : "orange",
  e : "red",
  unknown : "emerald",
}
let ProductReviews = {
  a : "Excellent",
  b : "Good",
  c : "Average",
  d : "Poor",
  e : "Bad",
  unknown : "unknown",
}
async function SetProductTags(){
  let  Res = await fetch("https://nutriplan-api.vercel.app/api/Products/categories?limit=9")
  Res = await Res.json()
  Res = Res.results
  let box = ""
  for(let i =0;i<Res.length;i++){
    box += `<button class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all" data-category=${Res[i].id}>
                <i class="mr-1.5" data-fa-i2svg=""><svg class="svg-inline--fa fa-cookie" data-prefix="fas" data-icon="cookie" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M247.2 17c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9l-14.6-82.8c-3.9-22.1-14.6-42.3-30.7-57.9L388.9 57.5c-16.1-15.6-36.6-25.6-58.7-28.7L247.2 17zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg></i>
                ${Res[i].name}
              </button>`
  }
  ProductCategorys.innerHTML = box
  for(let i =0;i<ProductCategorys.children.length;i++){
    ProductCategorys.children[i].addEventListener("click" , ()=>{
      GetProductByCat(ProductCategorys.children[i].getAttribute("data-category"))
    })
  }
}
async function SetAreaTags(){
    let Areas = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    Areas = await Areas.json()
    Areas = Areas.meals
    for(let i =0;i<Areas.length;i++){
        if(i <= 11){
            let button = document.createElement("button")
            button.classList.add("px-4" ,"py-2" ,"bg-gray-100" ,"text-gray-700" ,"rounded-full" ,"font-medium" ,"text-sm" ,"whitespace-nowrap" ,"hover:bg-gray-200" ,"transition-all")
            button.setAttribute("Area" , Areas[i].strArea)
            button.innerText = Areas[i].strArea
            AreaTags.appendChild(button)
        }
    }
   for(let y =0; y<AreaTags.children.length;y++){
        AreaTags.children[y].addEventListener("click" , () => {
            for(let i = 0; i <AreaTags.children.length ; i++){
                AreaTags.children[i].classList.remove("bg-emerald-600" ,"text-white" ,"hover:bg-emerald-700" )
                AreaTags.children[i].classList.add("bg-gray-100", "text-gray-700" , "hover:bg-gray-200" )
            }
            AreaTags.children[y].classList.add("bg-emerald-600" ,"text-white" ,"hover:bg-emerald-700" )
            AreaTags.children[y].classList.remove("bg-gray-100", "text-gray-700" , "hover:bg-gray-200" )
            GetMealByArea(AreaTags.children[y].hasAttribute("Area") ? AreaTags.children[y].getAttribute("Area") : "" )
        }
        )
   }
}
async function SetCategoryTags(){
    let Categorys = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    Categorys = await Categorys.json()
    Categorys = Categorys.meals
    let box = ""
    for(let i =0;i<Categorys.length;i++){
        if(i <= 11){
            let CatName = Categorys[i].strCategory
            box += `<div class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group" data-category="${CatName}">
              <div class="flex items-center gap-2.5" data-category="${CatName}">
                <div class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-drumstick-bite" data-prefix="fas" data-icon="drumstick-bite" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M160 265.2c0 8.5-3.4 16.6-9.4 22.6l-26.8 26.8c-12.3 12.3-32.5 11.4-49.4 7.2-4.6-1.1-9.5-1.8-14.5-1.8-33.1 0-60 26.9-60 60s26.9 60 60 60c6.3 0 12 5.7 12 12 0 33.1 26.9 60 60 60s60-26.9 60-60c0-5-.6-9.8-1.8-14.5-4.2-16.9-5.2-37.1 7.2-49.4l26.8-26.8c6-6 14.1-9.4 22.6-9.4l89.2 0c6.3 0 12.4-.3 18.5-1 11.9-1.2 16.4-15.5 10.8-26-8.5-15.8-13.3-33.8-13.3-53 0-61.9 50.1-112 112-112 8 0 15.7 .8 23.2 2.4 11.7 2.5 24.1-5.9 22-17.6-14.7-82.3-86.7-144.8-173.2-144.8-97.2 0-176 78.8-176 176l0 89.2z"></path></svg></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${CatName}</h3>
                </div>
              </div>
                </div>`
            }       
        }
    CategoryTags.innerHTML = box
    for(let i = 0;i<CategoryTags.children.length;i++){
      CategoryTags.children[i].addEventListener("click" , () => GetMealByCat(CategoryTags.children[i].getAttribute("data-category")))
    }

}
async function GetProductByCat(CatKeyword) {
      let  Res = await fetch(`https://nutriplan-api.vercel.app/api/products/category/${CatKeyword}?page=1&limit=24`)
        ProductGrid.setAttribute("CategorySelected" , CatKeyword)
        Res = await Res.json()
        Res = Res.results
        if(Res.length == 0){
        ProductGrid.innerHTML = `<div class="text-center">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
                        </div>
                        <p class="text-gray-500 text-lg mb-2">No products to display</p>
                        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
                    </div>`
                    ProductCount.innerHTML = `No products Found`
          return
        }
        let limit = Res.length <= 30 ? Res.length : 30
        SetProducts(Res , limit)
        ProductCount.innerHTML = `Found ${Res.length} products for "${CatKeyword}"`
}
async function GetProductByBarcode(Barcode) {
      let  Res = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${Barcode}`)
        ProductGrid.setAttribute("CategorySelected" , Barcode)
        Res = await Res.json()
        Res = Res.results
        if(Res.length == 0){
        ProductGrid.innerHTML = `<div class="text-center">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
                        </div>
                        <p class="text-gray-500 text-lg mb-2">No products to display</p>
                        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
                    </div>`
                    ProductCount.innerHTML = `No products Found`
          return
        }
        let limit = Res.length <= 30 ? Res.length : 30
        SetProducts(Res , limit)
        ProductCount.innerHTML = `Found ${Res.length} products for "${Barcode}"`
}
async function GetProductBySearch(Search) {
      let  Res = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${Search}`)
        ProductGrid.setAttribute("SearchSelected" , Search)
        Res = await Res.json()
        Res = Res.results
        if(Res.length == 0){
        ProductGrid.innerHTML = `<div class="text-center">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
                        </div>
                        <p class="text-gray-500 text-lg mb-2">No products to display</p>
                        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
                    </div>`
                    ProductCount.innerHTML = `No products Found`
          return
        }
        let limit = Res.length <= 30 ? Res.length : 30
        SetProducts(Res , limit)
        ProductCount.innerHTML = `Found ${Res.length} products for "${Search}"`
}
function SetProducts(Products , Limit = 20){
  ProductGrid.innerHTML = `<div id="products-loading" class="py-12">
                    
        <div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    
                </div>`
  let box = ""
  for(let i = 0;i<Limit;i++){
    let Product = Products[i]
    box += `<div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${Product.image}" alt="${Product.name}" loading="lazy">

                  <!-- Nutri-Score Badge -->
                  <div class="absolute top-2 left-2 bg-${ProductRanks[Product.nutritionGrade == "not-applicable" ? "unknown" : Product.nutritionGrade] }-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                    Nutri-Score ${Product.nutritionGrade == "not-applicable" ? "unknown" : Product.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA 2">
                    ${Product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                    ${Product.brand}
                  </p>
                  <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    ${Product.name}
                  </h3>

                  <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-weight-scale" data-prefix="fas" data-icon="weight-scale" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M116.6 192c-3-10.1-4.6-20.9-4.6-32 0-61.9 50.1-112 112-112S336 98.1 336 160c0 11.1-1.6 21.9-4.6 32l-71 0 24.6-44.3c6.4-11.6 2.3-26.2-9.3-32.6s-26.2-2.3-32.6 9.3l-37.6 67.7-88.8 0zM128 32L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-64 0C293.3 11.9 260 0 224 0s-69.3 11.9-96 32z"></path></svg></i>250g</span>
                    <span class="${Product.nutrients.calories == 0 ? "hidden" : ""}"><i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-fire" data-prefix="fas" data-icon="fire" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"></path></svg></i>${(Product.nutrients.calories).toFixed(1)} kcal/100g</span>
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${(Product.nutrients.protein).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${(Product.nutrients.carbs).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${(Product.nutrients.fat).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${(Product.nutrients.sugar).toFixed(1)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`
  }
  ProductGrid.innerHTML = box
  box = ""
      for(let i = 0;i<ProductGrid.children.length;i++){
      ProductGrid.children[i].addEventListener("click" , ()=>{
        let Product = Products[i]
        body.innerHTML += `<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="product-detail-modal">
            <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-start gap-6 mb-6">
                <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src="${Product.image}" alt="${Product.name}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1">
                    <p class="text-sm text-emerald-600 font-semibold mb-1">20/01/28</p>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">${Product.name}</h2>
                    <p class="text-sm text-gray-500 mb-3">300g</p>
                    <div class="flex items-center gap-3">
                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-${ProductRanks[Product.nutritionGrade]}-400">
                                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold bg-${ProductRanks[Product.nutritionGrade]}-700">
                                    ${Product.nutritionGrade}
                                </span>
                                <div>
                                    <p class="text-xs font-bold color-${ProductRanks[Product.nutritionGrade]}-700">Nutri-Score</p>
                                    <p class="text-[10px] text-gray-600">${ProductReviews[Product.nutritionGrade]}</p>
                                </div>
                            </div>
                    </div>
                </div>
                <button class="close-product-modal text-gray-400 hover:text-gray-600">
                    <i class="text-2xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" data-prefix="fas" data-icon="xmark" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"></path></svg></i>
                </button>
            </div>
            
            <!-- Nutrition Facts -->
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-pie" data-prefix="fas" data-icon="chart-pie" role="img" viewBox="0 0 576 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M512.4 240l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206 2.3 17.5-12.2 31.9-29.9 31.9zM222.6 37.2c18.1-3.8 33.8 11 33.8 29.5l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8zM477.8 288l64 0c18.5 0 33.3 15.7 29.5 33.8-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l78.2 0z"></path></svg></i>
                    Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                </h3>
                
                <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                    <p class="text-4xl font-bold text-gray-900">${Product.nutrients.calories}</p>
                    <p class="text-sm text-gray-500">Calories</p>
                </div>
                
                <div class="grid grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-emerald-500 h-2 rounded-full" style="width: 0%"></div>
                        </div>
                        <p class="text-lg font-bold text-emerald-600">${Product.nutrients.calories}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: 61%"></div>
                        </div>
                        <p class="text-lg font-bold text-blue-600">61.0g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-purple-500 h-2 rounded-full" style="width: 0.26153846153846155%"></div>
                        </div>
                        <p class="text-lg font-bold text-purple-600">0.2g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-orange-500 h-2 rounded-full" style="width: 100%"></div>
                        </div>
                        <p class="text-lg font-bold text-orange-600">60.0g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">0.2g</p>
                        <p class="text-xs text-gray-500">Saturated Fat</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">0.0g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">0.02g</p>
                        <p class="text-xs text-gray-500">Salt</p>
                    </div>
                </div>
            </div>
            
            <!-- Additional Info -->
            
            
            
            
            <!-- Actions -->
            <div class="flex gap-3">
                <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="6111184002576">
                    <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>Log This Food
                </button>
                <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                    Close
                </button>
            </div>
        </div>
    
            </div>
        </div>`
      })
    }
  
}
async function GetMealByCat(CatKeyword) {
      let ids = []
      let Meals = [] 
      if(CatKeyword == ""){
        GetMealBySearch("")
        return
      }
      loading()
      let  Res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CatKeyword}`)
        Res = await Res.json()
        Res = Res.meals
        if(Res == null){
        RecipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`
        return
    }
        for(let i = 0;i<Res.length;i++){
          ids.push(Res[i].idMeal)
        }
        let limit = ids.length <= 20 ? ids.length : 20
    for(let i = 0;i<limit;i++){
      let  Meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids[i]}`)
        Meal = await Meal.json()
        Meals.push(Meal.meals[0])
    }
        SetMealRecipes(Meals , limit)
        RecipesCount.innerText = `Showing ${RecipesGrid.children.length} recipes`
}
async function GetMealByArea(AreaKeyword) {
  let ids = []
  let Meals = []
      if(AreaKeyword == ""){
        GetMealBySearch("")
        return
      }
      loading()
      let Res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaKeyword}`)
        Res = await Res.json()
        Res = Res.meals
        if(Res == null){
        RecipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`
        RecipesCount.innerText = `Showing 0 recipes`
        return
    }
        for(let i = 0;i<Res.length;i++){
          ids.push(Res[i].idMeal)
        }
        let limit = ids.length <= 20 ? ids.length : 20
    for(let i = 0;i<limit;i++){
      let  Meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids[i]}`)
        Meal = await Meal.json()
        Meals.push(Meal.meals[0])
    }
        SetMealRecipes(Meals , limit)
        RecipesCount.innerText = `Showing ${RecipesGrid.children.length} recipes`
}
async function GetMealBySearch(SearchKeyword) {
      loading()
      let Res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchKeyword}`)
        Res = await Res.json()
        Res = Res.meals
        if(Res == null){
        RecipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`
        RecipesCount.innerText = `Showing 0 recipes`
        return
    }
         let limit = Res.length <= 25 ? Res.length : 25
        SetMealRecipes(Res , limit)
        RecipesCount.innerText = `Showing ${RecipesGrid.children.length} recipes`
}
async function GetNutrients(Ingrediants ,  Name){
  let Nutrients = await fetch("https://nutriplan-api.vercel.app/api/nutrition/analyze" , {
    method: "POST",
    body: JSON.stringify({ "recipeName": Name , "ingredients"  : Ingrediants}),
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
      "x-api-key": "rJzrgQfKb6njnnPBkDmp8qqPQdBhjLPmpHgQ8LND"
    }
  })
  Nutrients = await Nutrients.json()
  return Nutrients.data
}
async function SetMealDetails(MealId){
  LogMealBtn.toggleAttribute("disabled")
  LogMealBtn.children[1].innerText = "Calculating..."
  LogMealBtn.children[0].innerHTML = `
                        <svg class="svg-inline--fa fa-spinner fa-spin" data-prefix="fas" data-icon="spinner" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm0 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM48 208a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm368 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM75 369.1A48 48 0 1 1 142.9 437 48 48 0 1 1 75 369.1zM75 75A48 48 0 1 1 142.9 142.9 48 48 0 1 1 75 75zM437 369.1A48 48 0 1 1 369.1 437 48 48 0 1 1 437 369.1z"></path></svg>
                        `
  LogMealBtn.classList.add("bg-gray-300", "text-gray-500" ,"cursor-not-allowed")
  LogMealBtn.classList.remove("bg-blue-600" ,"text-white" ,"hover:bg-blue-700", "cursor-pointer")
  LogMealBtn.setAttribute("title" , "Waiting for nutrition data...")
  let Meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
  Meal = await Meal.json()
  Meal = Meal.meals[0]
  MealDetails[1].children[0].children[0].setAttribute("src" , Meal.strMealThumb)
  MealDetails[1].children[0].children[2].children[0].children[0].innerText = Meal.strCategory
  MealDetails[1].children[0].children[2].children[0].children[1].innerText = Meal.strCountry
  MealDetails[1].children[0].children[2].children[1].innerText = Meal.strMeal
  let box = ""
  let ingrediants = []
  for(let i =0;i<20;i++){
    if(Meal[`strIngredient${i+1}`] == null || Meal[`strIngredient${i+1}`] == "" ){
      break
    }
    box += `<div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                                        <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300">
                                        <span class="text-gray-700">
                                            <span class="font-medium text-gray-900">${Meal[`strMeasure${i+1}`]}</span> ${Meal[`strIngredient${i+1}`]}
                                        </span>
                                    </div>`
    ingrediants.push(Meal[`strMeasure${i+1}`] + " " + Meal[`strIngredient${i+1}`])
  }
  MealDetails[3].children[0].children[0].children[1].innerHTML = box
  MealDetails[3].children[0].children[0].children[0].children[1].innerHTML = MealDetails[3].children[0].children[0].children[1].children.length + " items"
  let instructions = Meal.strInstructions.split("\r\n")
  box = ""
  for(let i =0 ;i<instructions.length;i++){
    if(instructions[i] == ""){
      continue
    }
    box += `<div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      ${i+1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${instructions[i]}
                    </p>
                  </div>`
  }
  MealDetails[3].children[0].children[1].children[1].innerHTML = box
  MealDetails[3].children[0].children[2].children[1].children[0].setAttribute("src" , Meal.strYoutube)
  NutritionFactsContainer.innerHTML = `<div class="text-center py-8">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
                    <i class="animate-pulse text-emerald-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-calculator" data-prefix="fas" data-icon="calculator" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm16 168a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM88 352a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM64 424c0-13.3 10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L88 448c-13.3 0-24-10.7-24-24zm232-24c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24z"></path></svg></i>
                </div>
                <p class="text-gray-700 font-medium mb-1">Calculating Nutrition</p>
                <p class="text-sm text-gray-500">Analyzing ingredients...</p>
                <div class="mt-4 flex justify-center">
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                </div>
            </div>`
  let Nutrition = await GetNutrients(ingrediants , Meal.strMeal)
  NutritionFactsContainer.innerHTML = `
            <p class="text-sm text-gray-500 mb-4">Per serving</p>
            
            <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                <p class="text-sm text-gray-600">Calories per serving</p>
                <p class="text-4xl font-bold text-emerald-600">${Nutrition.perServing.calories}</p>
                <p class="text-xs text-gray-500 mt-1">Total: ${Nutrition.totals.calories} cal</p>
            </div>
            
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${Nutrition.perServing.protein}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: ${Nutrition.perServing.protein / 50 > 1 ? 100 : (Nutrition.perServing.protein / 50) * 100 }%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${Nutrition.perServing.carbs}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${Nutrition.perServing.carbs / 309 > 1 ? 100 : (Nutrition.perServing.carbs / 309) * 100 }%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${Nutrition.perServing.fat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${Nutrition.perServing.fat / 65 > 1 ? 100 : (Nutrition.perServing.fat / 65) * 100 }%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${Nutrition.perServing.fiber}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: ${Nutrition.perServing.fiber / 25 > 1 ? 100 : (Nutrition.perServing.fiber / 25) * 100 }%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${Nutrition.perServing.sugar}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: ${Nutrition.perServing.sugar / 50 > 1 ? 100 : (Nutrition.perServing.sugar / 50) * 100 }%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${Nutrition.perServing.saturatedFat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: ${Nutrition.perServing.sugar / 20 > 1 ? 100 : (Nutrition.perServing.sugar / 20) * 100 }%"></div>
                </div>
            </div>
            

            
            <div class="mt-6 pt-6 border-t border-gray-100">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${Nutrition.perServing.cholesterol}mg</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${Nutrition.perServing.sodium}mg</span>
                    </div>
                </div>
            </div>
        `
  LogMealBtn.toggleAttribute("disabled")
  LogMealBtn.children[1].innerText = "Log this meal"
  LogMealBtn.children[0].innerHTML = `<svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg>`
  LogMealBtn.classList.remove("bg-gray-300", "text-gray-500" ,"cursor-not-allowed")
  LogMealBtn.classList.add("bg-blue-600" ,"text-white" ,"hover:bg-blue-700", "cursor-pointer")
  LogMealBtn.removeAttribute("title")
  LogMealBtn.addEventListener("click" ,  ()=>{ ToggleLogBtnView(Meal ,Nutrition)})
}
function ToggleLogBtnView(Meal ,Nutrition){
  if(document.querySelector('#log-meal-modal') ==  null){
    MainContent.innerHTML += `<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="log-meal-modal">
            <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${Meal.strMealThumb}" alt="${Meal.strMeal}" class="w-16 h-16 rounded-xl object-cover">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                        <p class="text-gray-500 text-sm">${Meal.strMeal}</p>
                    </div>
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                    <div class="flex items-center gap-3">
                        <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-minus" data-prefix="fas" data-icon="minus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"></path></svg></i>
                        </button>
                        <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                        <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                            <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                        </button>
                    </div>
                </div>
                
                
                <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                    <div class="grid grid-cols-4 gap-2 text-center">
                        <div>
                            <p class="text-lg font-bold text-emerald-600" id="modal-calories">${Nutrition.perServing.calories}g</p>
                            <p class="text-xs text-gray-500">Calories</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-blue-600" id="modal-protein">${Nutrition.perServing.protein}g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-amber-600" id="modal-carbs">${Nutrition.perServing.carbs}g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div>
                            <p class="text-lg font-bold text-purple-600" id="modal-fat">${Nutrition.perServing.fat}g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                    </div>
                </div>
                
                
                <div class="flex gap-3">
                    <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Cancel
                    </button>
                    <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                        <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
                        Log Meal
                    </button>
                </div>
            </div>
        </div>`

  }
  let mealServings = document.querySelector("#meal-servings")
  let increaseServings = document.querySelector("#increase-servings")
  let decreaseServings = document.querySelector("#decrease-servings")
  let step = mealServings.getAttribute("step")
  // let ConfirmLogMeal = document.querySelector('#confirm-log-meal')
  let CancelLogMeal = document.querySelector('#cancel-log-meal')
  // ConfirmLogMeal.addEventListener("click" , FoodLog("Meal"))
  CancelLogMeal.addEventListener("click" , ()=>{
    MainContent.removeChild(MainContent.children.item(body.children.length-1))
  })
  decreaseServings.addEventListener("click" , ()=>{
      if(!(mealServings.value == 0.5)){
        mealServings.value = Number(mealServings.value) - Number(step)
      }
  })
  increaseServings.addEventListener("click" , ()=>{
      if(!(mealServings.value == 10)){
        mealServings.value = Number(mealServings.value) + Number(step)
      }
  })
}
function SaveFoodItems(Item , content , servings){
    if(localStorage.getItem("FoodLog") != null){
        let Items = [...JSON.parse(localStorage.getItem("FoodLog")) , {Item , content , servings} ]
        localStorage.setItem("FoodLog" , JSON.stringify(Items))
    }else{
        localStorage.setItem("FoodLog" , JSON.stringify([{Item , content , servings}]))
    }
    SetFoodItems()
}
function SetFoodItems(){
    if(localStorage.getItem("FoodLog") == null){
        FoodLogSection[2].children[1].innerHTML = `<div class="text-center py-8 text-gray-500">
                  <i class="mb-3 text-4xl text-gray-300" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
                </div>`
        return
    }
    let box = ""
    let FoodItems = JSON.parse(localStorage.getItem("FoodLog"))
    for(let i =0; i<FoodItems.length;i++){
        let {Item , content , servings} = FoodItems[i]
        box += `<div class="space-y-3 max-h-96 overflow-y-auto">
                
                    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src="${content.image}" alt="${content.name}" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">${content.name}</p>
                                <p class="text-sm text-gray-500">
                                    ${servings} serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">${Item}</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">2:24 PM</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${content.calories}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${content.protein}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${content.carbs}g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${content.fat}g F</span>
                            </div>
                            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="${FoodLogSection[2].children[1].children.length}">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                            </button>
                        </div>
                    </div>
                
            </div>`
    }
        FoodLogSection[2].children[1].innerHTML = box 
            let removeItemBtns = document.querySelectorAll(".remove-foodlog-item")
            for(let i =0;i<removeItemBtns.length;i++){
                removeItemBtns[i].addEventListener("click" , (e)=> {DeleteItem(e.target)})
            }
        FoodLogSection[2].children[0].children[0].innerText = `Logged Items (${FoodLogSection[2].children[1].children.length})`
    CalculateFood()
}
function DeleteItem(e){
    let index = e.getAttribute("data-index")
    let FoodItems = JSON.parse(localStorage.getItem("FoodLog"))
    for(let i =0;i<FoodItems.length;i++){
        if(index == i){
            FoodItems = FoodItems.splice(index , 1)
        }
    }
}

function CalculateFood(){
    let FoodStats = FoodLogSection[1].children
    let Items = FoodLogSection[2].children[1].children
    let Calories = 0
    let Proteins = 0
    let Carbs = 0
    let Fats = 0
    for(let i = 0;i<Items.length;i++){
        Calories += Number(Items[i].children[0].children[1].children[0].children[0].innerText)
        Proteins += Number(Items[i].children[0].children[1].children[1].children[0].innerText.split("g")[0])
        Carbs += Number(Items[i].children[0].children[1].children[1].children[1].innerText.split("g")[0])
        Fats += Number(Items[i].children[0].children[1].children[1].children[2].innerText.split("g")[0])
    }
    FoodStats[0].children[0].children[1].innerText = `${Calories} / 2000 kcal`
    FoodStats[1].children[0].children[1].innerText = `${Proteins} / 50 g`
    FoodStats[2].children[0].children[1].innerText = `${Carbs} / 250 g`
    FoodStats[3].children[0].children[1].innerText = `${Fats} / 65 g`
    FoodStats[0].children[1].children[0].style.width = ((Calories / 2000 * 100) > 100 ? 100 : (Calories / 2000) * 100 ) + "%"
    FoodStats[1].children[1].children[0].style.width = ((Proteins / 50) * 100 > 100 ? 100 : (Proteins / 50) * 100 ) + "%"
    FoodStats[2].children[1].children[0].style.width = ((Carbs / 250) * 100 > 100 ? 100 : (Carbs / 250) * 100) + "%"
    FoodStats[3].children[1].children[0].style.width = ((Fats / 65) * 100 > 100 ? 100 : (Fats / 65) * 100) + "%"
}
function SetMealRecipes(Meals , limit = 20){
    RecipesGrid.innerHTML = ""
    let box = ""
    for(let i = 0;i<limit;i++){
        let Recipe = Meals[i]
        box += `<div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${Recipe.idMeal}">
              <div class="relative h-48 overflow-hidden" ">
                <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${Recipe.strMealThumb}" alt="${Recipe.strMeal}" loading="lazy">
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                    ${Recipe.strCategory}
                  </span>
                  <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white ${Recipe.strArea == null ? "hidden" : "block"}">
                    ${Recipe.strArea}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  ${Recipe.strMeal}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${Recipe.strInstructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="mr-1 text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
                    ${Recipe.strCategory}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="mr-1 text-blue-500" data-fa-i2svg=""><svg class="svg-inline--fa fa-globe" data-prefix="fas" data-icon="globe" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"></path></svg></i>
                    ${Recipe.strArea == null ? "International" :Recipe.strArea }
                  </span>
                </div>
              </div>
            </div>`
        }
    RecipesGrid.innerHTML = box
    ToggleView()
    for(let i =0;i<RecipesGrid.children.length;i++){
      RecipesGrid.children[i].addEventListener("click" , (e)=>{
        window.scrollTo(0 , 0)
        SetMealDetails(RecipesGrid.children[i].getAttribute("data-meal-id"))
        setTimeout(SetPage("MealDetails") , 2000)
  
      })
    }
}
SetFoodItems()
SearchInput.addEventListener("change" , ()=>{
    GetMealBySearch(SearchInput.value)
    })
BarcodeSearch.addEventListener("change" ,() => {GetProductByBarcode(Number(BarcodeSearch.value))} )
for(let i =0 ;i<ProductRating.length;i++){
        ProductRating[i].addEventListener("click" , ()=>{
        for(let x =0; x<ProductRating.length;x++){
            ProductRating[x].classList.remove("ring-2" , "ring-gray-900")
        }
        ProductRating[i].classList.add("ring-2" , "ring-gray-900")
    })
}
async function PageLoading(){
    PageLoader.style.display = "flex"
    ProductSearch.addEventListener("change", ()=> GetProductBySearch(ProductSearch.value))
    await SetAreaTags()
    await SetCategoryTags()
    await SetProductTags()
    await GetMealBySearch("Chicken")
    SetPage(localStorage.getItem("Page"))
    ProductGrid.innerHTML = `<div class="text-center">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
                        </div>
                        <p class="text-gray-500 text-lg mb-2">No products to display</p>
                        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
                    </div>`
    setTimeout(() => {
        PageLoader.style.display = "none"
    }, 2000);
}
PageLoading()
