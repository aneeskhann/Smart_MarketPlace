import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret_token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9"
export const authenticateToken=(req,res,next)=>{
  const authHeader=req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401)

  jwt.verify(token,secret_token,(err,user)=>{
      if(err){
          console.log(err)
          return res.sendStatus(403)
      }
      req.user=user
      next()
  })
}