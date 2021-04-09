// write code here
function travelerObj () {
fetch ('http://localhost:3000/travelers/1')
    .then(response => response.json())
    .then(travelerArr => {
        const profile = document.querySelector("div#profile")

        const profileImg = profile.querySelector("img")
        profileImg.src = travelerArr.photo
        profileImg.alt = travelerArr.name

        const profileH2 = document.querySelector("h2")
        profileH2.textContent = travelerArr.name

        const profileEm = document.querySelector("em")
        profileEm.textContent = travelerArr.nickname

        const likes = document.querySelector(".likes")
        likes.textContent = `${travelerArr.likes} Likes`
    })
} 
travelerObj()
   
