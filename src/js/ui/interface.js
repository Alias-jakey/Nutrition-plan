let RecipesGrid = document.querySelector("#recipes-grid");
let RecipesCount = document.querySelector("#recipes-count");
let GridViewBtn = document.querySelector("#grid-view-btn");
let ListViewBtn = document.querySelector("#list-view-btn");
let sections = document.querySelectorAll("section");
let headerContent = document.querySelector("#header-menu-btn + div").children
let AsideContent = document.querySelector("#sidebar").children[1].children[0].children[1].children
let SidebarOverlay = document.querySelector("#sidebar-overlay")
let Sidebar = document.querySelector("#sidebar")
let SideMenuBtn = document.querySelector("#header-menu-btn")
let BackToMealsBtn = document.querySelector("#back-to-meals-btn")
let SidebarCloseBtn = document.querySelector("#sidebar-close-btn")
let body = document.querySelector("body")
let sectionsContent = {
  Meals : [0 , "Meals and Recipes"],
  MealDetails: [3 , "Meals and Recipes"],
  Product : [4 , "Meals and Recipes"],
  Food : [5 , "Meals and Recipes"]
}
function SetPage(Page){
  if(Page == "MealDetails" || Page  == null ){
    localStorage.setItem("Page" ,"Meals")
  }else{
    localStorage.setItem("Page" , Page)
  }
  for(let i =0;i<sections.length;i++){
    sections[i].style.display = "block"
  }
  switch(sectionsContent[Page][0]){
    case 0:
      for(let i =3;i<sections.length;i++){
        sections[i].style.display = "none"
      }
        headerContent[0].innerText = "Meals & Recipes"
        headerContent[1].innerText = "Discover delicious and nutritious recipes tailored for you"
        return
    case 3:
      for(let i =0;i<sections.length;i++){
        if(i != 3){
          sections[i].style.display = "none"
        }
      }
        headerContent[0].innerText = "Recipe Details"
        headerContent[1].innerText = "View full recipe information and nutrition facts"
        return
    case 4:
      for(let i =0;i<sections.length;i++){
        if(i != 4){
          sections[i].style.display = "none"
        }
      }
      for(let x = 0; x<AsideContent.length;x++){
      AsideContent[x].children[0].classList.add("text-gray-600" ,"hover:bg-gray-50")
      AsideContent[x].children[0].classList.remove("text-emerald-700" ,"bg-emerald-50")
    }
        AsideContent[1].children[0].classList.remove("text-gray-600" ,"hover:bg-gray-50")
        AsideContent[1].children[0].classList.add("text-emerald-700" ,"bg-emerald-50")
      headerContent[0].innerText = "Product Scanner"
      headerContent[1].innerText = "Search packaged foods by name or barcode"
      
      return
    case 5:
      for(let i =0;i<sections.length - 1;i++){
          sections[i].style.display = "none"
      }
      for(let x = 0; x<AsideContent.length;x++){
      AsideContent[x].children[0].classList.add("text-gray-600" ,"hover:bg-gray-50")
      AsideContent[x].children[0].classList.remove("text-emerald-700" ,"bg-emerald-50")
    }
        AsideContent[2].children[0].classList.remove("text-gray-600" ,"hover:bg-gray-50")
        AsideContent[2].children[0].classList.add("text-emerald-700" ,"bg-emerald-50")
      headerContent[0].innerText = "Food Log"
      headerContent[1].innerText = "Track your daily nutrition and food intake"
      return
  } 
}
function loading(){
  if(document.querySelector(".loader") == null){
    RecipesGrid.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`
    RecipesCount.innerText = "Loading..."
    return true
  }
  return false
}
function OpenSidebar(){
  if(window.innerWidth > 1024){
    return
  }
  if(Sidebar.classList.contains("open")){
    Sidebar.classList.remove("open")
    SidebarOverlay.classList.remove("active")
    body.style.overflow = ""
  }else{
    Sidebar.classList.add("open")
    SidebarOverlay.classList.add("active")
    body.style.overflow = "hidden"
  }
}
GridViewBtn.addEventListener("click" , (e) =>{
  ListViewBtn.removeAttribute("selected")
  GridViewBtn.setAttribute("selected" , true)
  ToggleView(GridViewBtn)
  
})
ListViewBtn.addEventListener("click" , (e) =>{
  GridViewBtn.removeAttribute("selected")
  ListViewBtn.setAttribute("selected" , true)
  ToggleView()
  
})
function ToggleView(){
  if(document.querySelector(".recipe-card") == null){
    return
  }
  GridViewBtn.classList.remove("bg-white" ,"shadow-sm")
  ListViewBtn.classList.remove("bg-white" ,"shadow-sm")
  let target = ListViewBtn.hasAttribute("selected") ? ListViewBtn : GridViewBtn
  target.classList.add("bg-white" ,"shadow-sm")
  if(target == GridViewBtn){
    RecipesGrid.classList.add("grid-cols-4" , "gap-5")
      RecipesGrid.classList.remove("grid-cols-2" , "gap-4")
    for(let i = 0; i <RecipesGrid.children.length;i++){
      RecipesGrid.children[i].classList.remove("flex", "flex-row" , "h-40")
      RecipesGrid.children[i].children[0].classList.remove("h-full" , "w-1/4")
      RecipesGrid.children[i].children[1].classList.remove("w-3/4")
      RecipesGrid.children[i].children[0].children[1].classList.remove("hidden")
  }
  }
  if(target == ListViewBtn){
    RecipesGrid.classList.remove("grid-cols-4" , "gap-5")
      RecipesGrid.classList.add("grid-cols-2" , "gap-4")
    for(let i = 0; i <RecipesGrid.children.length;i++){
      RecipesGrid.children[i].classList.add("flex", "flex-row" , "h-40")
      RecipesGrid.children[i].children[0].classList.add("h-full" , "w-1/4")
      RecipesGrid.children[i].children[1].classList.add("w-3/4")
      RecipesGrid.children[i].children[0].classList.remove("h-48")
      RecipesGrid.children[i].children[0].children[1].classList.add("hidden")
  }
  }
}
for(let i =0; i<AsideContent.length;i++){
  AsideContent[i].addEventListener("click" , () => {
    for(let x = 0; x<AsideContent.length;x++){
      AsideContent[x].children[0].classList.add("text-gray-600" ,"hover:bg-gray-50")
      AsideContent[x].children[0].classList.remove("text-emerald-700" ,"bg-emerald-50")
    }
    AsideContent[i].children[0].classList.remove("text-gray-600" ,"hover:bg-gray-50")
    AsideContent[i].children[0].classList.add("text-emerald-700" ,"bg-emerald-50")
    let title = AsideContent[i].children[0].children[1].innerText.split(" ")
    SetPage(title[0])
    OpenSidebar()
  })
}
SidebarOverlay.addEventListener("click" , OpenSidebar)
SidebarCloseBtn.addEventListener("click" , OpenSidebar)
SideMenuBtn.addEventListener("click" , OpenSidebar)
BackToMealsBtn.addEventListener("click" , () => {
  SetPage("Meals")
})

export {loading , OpenSidebar , ToggleView , SetPage}