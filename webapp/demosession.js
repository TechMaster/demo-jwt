//see https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

app.use(cookieParser())
app.use(session({
	secret: "JackCodeHammer",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}))

/*
cookie.secure = true yêu cầu kênh kết nối phải là https thì mới gửi cookie về server. Khuyến cáo dùng true tuy nhiên trong development env không có HTTPS thì đặt cookie: {secure: false}
*/

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++
      res.send("You visited this page " + req.session.page_views + " times")
   }else{
      req.session.page_views = 1
      res.send("Welcome to this page for the first time!")
   }
});
app.listen(3000, () => {
  console.log('Listens at port 3000. Try to refresh page to see page counter')
})