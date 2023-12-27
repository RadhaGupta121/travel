const cloudinary = require('cloudinary').v2;

 const fs=require('fs');       
cloudinary.config({ 
  cloud_name: 'ddaezua08', 
  api_key: '748279296242111', 
  api_secret: 'UFLCSiIME9EXH4J-3AVeDLKrImU' 
});

const ImageUpload=(localPath)=>{
  console.log(localPath);
    try {
     
        if(!localPath)return null;
      const output=  cloudinary.uploader.upload(`${localPath}`,
  { public_id: "myFileUpload" }, 
  function(error, result) 
  {
    if(error)console.log("errror",error);
   else console.log(result);
  
  });
  console.log("output",output);
  return output;
    } catch (error) {
        fs.unlinkSync(localPath);
        console.log("there is some error in uploading file in cloudinary");
    }
}
module.exports= ImageUpload;
