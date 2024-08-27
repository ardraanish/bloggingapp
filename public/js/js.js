let createBlog = document.getElementById("createBlog")
let blogform = document.getElementById("blog_form")

      
      let add = document.getElementById("addBlog")
      
      
      createBlog.addEventListener("click",()=>{
        let createBlog = document.getElementById("createBlog")
        blogform.style.display = "block"
        add.style.display = "block"
        // edit_form.style.display = "none"
       
      
      })

let cancel = document.getElementById("cancel")
cancel.addEventListener("click", ()=>{
  blogform.style.display = "none"
})



