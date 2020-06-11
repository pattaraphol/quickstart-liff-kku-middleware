// Jame 

// Import stylesheets
import "./style.css"

// Body element
const body = document.getElementById('body')

// Button elements
const btnSend = document.getElementById("btnSend")
const btnClose = document.getElementById("btnClose")
const btnShare = document.getElementById("btnShare")
const btnLogIn = document.getElementById("btnLogIn")
const btnLogOut = document.getElementById("btnLogOut")
const btnScanCode = document.getElementById("btnScanCode")
const btnOpenWindow = document.getElementById("btnOpenWindow")

// Profile elements
const email = document.getElementById("email")
const userId = document.getElementById("userId")
const pictureUrl = document.getElementById("pictureUrl")
const displayName = document.getElementById("displayName")
const statusMessage = document.getElementById("statusMessage")

// QR element
const code = document.getElementById("code")
const friendShip = document.getElementById("friendship")

async function main() {
  // 1. Initialize LIFF app)
  await liff.init({ liffId: "1654317178-aPj32E68"})
  
  // 2. Try a LIFF function
  switch(liff.getOS()) {
    case "andriod":
      body.style.backgroundColor = "#d1f5d3"
    break
    case "ios":
      body.style.backgroundColor = "#cccccc"
    break
  }

  // 5. Call getUserProfile()
  // 12. Move getUserProfile() to 2 places
  // getUserProfile()
  
  // 8. Check where LIFF was opened
  // 8.1 Show login and logout buttons
  // 11. Add condition to show/hide login and logout buttons
  // 16. Show send button only when LIFF was opened in LINE app
  // 20. Show share button where user loggedin
  // 25. Ensure LIFF was opened in LINE app for Android then show QR button
  // 32. Call getFriendship() to 2 places where user loggedin

  if(!liff.isInClient()){ // ถ้าไม่ได้เปิดในมือถือ
    if(liff.isLoggedIn()){
      btnLogIn.style.display = "none"
      btnLogOut.style.display = "block"
      getUserProfile()
      getFridendship()
    } else {
      btnLogIn.style.display = "block"
      btnLogOut.style.display = "none"
    }
  } else {
    getUserProfile()
    getFridendship()
    btnSend.style.display = "block"
    btnShare.style.display = "block"
    friendship.style.display = "block"
    if(liff.getOS()=== "andriod") {
      btnScanCode.style.display = "block"
    } 
  }
  
  // 28. Show OpenWindow button
  btnOpenWindow.style.display = "block"
}

main()

// 4. Create getUserProfile()
// 6. Get email *

async function getUserProfile() {
  const profile = await liff.getProfile()
  userId.innerHTML = "<b>UserId</b> " + profile.userId
  displayName.innerHTML = "<b>displayName</b> " + profile.displayName
  statusMessage.innerHTML = "<b>statusMessage</b> " + profile.statusMessage
  pictureUrl.src = profile.pictureUrl 
  email.innerHTML = "<b>email</b> " + liff.getDecodedIDToken().email
}

// 9. Add event listener to login button
btnLogIn.onclick = () => {
  liff.login()
}

// 10. Add event listener to logout button then reload the page
btnLogOut.onclick = () => {
  liff.logout()
  window.location.reload()
}

// 14. Create sendMsg()
// 14.1 Ensure LIFF was opened from LINE app (เปิดในไลน์แอพเท่านั้นถึงจะส่งได้)
// 29. Change alert to close
async function sendMsg() {
  // utouId, group, room, external, none
  if (liff.getContext().type !== "none" && liff.getContext().type !== "external"){
    await liff.sendMessages([
      {
      type: "text",
      text: "Thiss msg was send by LIFF"
      }
    ])
    //alert("Message is send")
    closed()
  }
}
// 15. Add event listener to send button
btnSend.onclick = () => {
  sendMsg()
}

// 18. Create shareMsg()
async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type : "image", //จะต้องเป็น https
      originalContentUrl: "https://linerookie.com/images/ic_liff.png",
      previewImageUrl: "https://linerookie.com/images/ic_liff.png"
    },
    {
      type : "image", //จะต้องเป็น https
      originalContentUrl: "https://linerookie.com/images/ic_liff.png",
      previewImageUrl: "https://linerookie.com/images/ic_liff.png"
    }
  ])
  closed()
}

// 19. Add event listener to share button
btnShare.onclick = () => {
  shareMsg()
}

// 23. Create scanCode()
async function scanCode() {
  const result = await liff.scanCode()
  //code.innerHTML = result.value
  window.location.href = result.value
}
// 24. Add event listener to QR button
btnScanCode.onclick = () => {
  scanCode()
}

// 27. Add event listener to OpenWindow button
btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: "https://line.me",
    external: false
  })
}
// 31. Create getFriendship()
// 31.1 Add condition to check friend status
async function getFridendship() {
  let msg = "Hooray you and our chatbot are firend"
  const friend = await liff.getFriendship()
  if(!friend.friendFlag) {
    msg = "<a href='https://line.me/R/ti/p/@119iommy'>Follow our chatbot here!"
  } else {
    msg = "We are friends"
  }
  friendShip.innerHTML = msg
}

function closed() {
    liff.closeWindow();
}