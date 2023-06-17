import multer from "multer";

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./upload/')
  },
  filename:function(req,file,cb){
    cb(null,new Date().toISOString()+file.originalname)
  }
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
    cb(null,true)
  }else{
    cb(null,false)
  }
}

const upload =multer({
  storage:storage,
  fileFilter:fileFilter
})

export {upload}