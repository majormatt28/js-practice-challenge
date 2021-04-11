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



function animalSightings() {
    
    fetch ('http://localhost:3000/animalSightings')
        .then(response => response.json())
        .then(animalSightingArr => {

            animalSightingArr.forEach(animalSighting => {
                
                const updateLi = document.createElement('li')
                
                updateLi.dataset.id = animalSighting.id
    
                updateLi.innerHTML = `
                <p>${animalSighting.description}</p>
                <img src='${animalSighting.photo}' alt='${animalSighting.species}'/>
                <a href='${animalSighting.link}' target='_blank'>Here's a video about the ${animalSighting.species} species!</a>
                <p class='likes-display'>${animalSighting.likes} Likes</p>
                <button class="like-button" type="button">Like</button>
                <button class="delete-button" type="button">Delete</button>
                <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
                <form class="update-form" style="display: none;">
                  <input type="text" value="${animalSighting.description}"/>
                  <input type="submit" value="Update description">
                  </form>`
    
              const animalSightingsUl = document.querySelector('ul#animals')
    
              animalSightingsUl.append(updateLi)  
            })
        })

}
animalSightings()


const form = document.querySelector('form#new-animal-sighting-form')

form.addEventListener('submit', (event) => {
    
    event.preventDefault()
    
    const newSighting = {
        travelerId: 1,
        species: event.target.species.value,
        photo: event.target.photo.value, 
        link: event.target.video.value, 
        description: event.target.description.value,
        likes: 0
    }

    fetch ('http://localhost:3000/animalSightings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newSighting)
    })
        .then(response => response.json())
        .then(newSightingPost => {
            animalSightings(newSightingPost)
        })
    form.reset()
})


const travelerLikes = document.querySelector('div#profile')

travelerLikes.addEventListener('click', (event) => {
    if (event.target.className === 'like-button') {
        const likes = document.querySelector('p.likes')
        const recentLikes = parseInt(likes.textContent) 
        

        fetch ('http://localhost:3000/travelers/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({likes: recentLikes + 1})
        })
            .then(response => response.json())
            .then(data => {
                likes.textContent = `${data.likes} Likes` 
            })
    }
})


const animalLikes = document.querySelector('ul#animals')

animalLikes.addEventListener('click', (event) => {
    if (event.target.className === 'delete-button') {
        const sightingDesc = event.target.closest("[data-id]")
        

        fetch (`http://localhost:3000/animalSightings/${sightingDesc.dataset.id}`,{
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                sightingDesc.remove()
            })
        
    }
    else if (event.target.className === 'like-button') {
        const likes = document.querySelector('p.likes')
        const recentLikes = parseInt(likes.textContent) 

        fetch (`http://localhost:3000/animalSightings/${sightingDesc.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({likes: recentLikes + 1})
        })
            .then(response => response.json())
            .then(data => {
                likes.textContent = `${data.likes} Likes` 
            })
    }
    else if (event.target.className === 'toggle-update-form-button') {
        
        const sightingDesc = event.target.nextElementSibling 
        if (sightingDesc.style.display === 'none') {
            sightingDesc.style.display = 'block'
        } 
        else if (sightingDesc.style.display === 'block') {
            sightingDesc.style.display = 'none'
    }   }
})