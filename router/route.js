const express=require('express')
const controller = require("../controller/controller")
const usercontroller = require("../controller/usercontroller.js")
const postcontoller=require('../controller/postcontroller.js')
const admincontroller=require('../controller/admincontroller.js')
const {authentecate} = require("../middleware/authentication.js")
const {autheraization} = require("../middleware/autheraization.js")
const router = express.Router()

router.get("/signup",controller.register)
router.get("/login",controller.index)
router.get("/blog",controller.blog)
router.get("/admin",controller.admin)


router.get("/content",controller.content)

router.post("/signup",usercontroller.signUp)
router.post("/login",usercontroller.signIn)
router.get("/logout",usercontroller.logout)

router.get("/profile",authentecate,postcontoller.getAllPost)
router.post("/profile",authentecate,postcontoller.createpost)
router.put("/editform/:id",authentecate,postcontoller.updatepost)
router.get("/editform/:id",authentecate,postcontoller.editform)
router.delete("/editform/:id",authentecate,postcontoller.deletepost)

router.get("/admin/user",autheraization,admincontroller.getEveryUser)
router.post("/admin/user",admincontroller.adminIn)
router.get("/admin/user/:id",autheraization,admincontroller.getUserById)
router.put("/admin/user/:id",autheraization,admincontroller.editUser)
router.delete("/admin/user/:id",autheraization,admincontroller.deleteUser)

router.get("/admin/post/:id",autheraization,admincontroller.adminPostById)
router.get("/admin/user/post/:id",autheraization,admincontroller.specificUserPost)
router.put("/admin/post/:id",autheraization,admincontroller.adminEditPost)
router.delete("/admin/post/:id",autheraization,admincontroller.adminDeletePost)

module.exports=router

