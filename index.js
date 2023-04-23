import {posts} from './data.js'


render()

document.addEventListener('click', function(e){
    if (e.target.dataset.like){
        console.log(" tap")
        handleLikeClick(e.target.dataset.like)
    }
})

document.addEventListener('dblclick', function(e){
    
    if(e.target.dataset.post)
    {

        handleLikeClick(e.target.dataset.post)
    }
})
        
function handleLikeClick(postId){
    const targetPostObj = posts.filter(function(post){
        return post.uuid === postId
        })[0]

        if (targetPostObj.isLiked){
            targetPostObj.likes--
        }else{
            targetPostObj.likes++
        }
        
        targetPostObj.isLiked = !targetPostObj.isLiked
        


        render()
}


function getFeedHtml(){
    let feedHtml = ``
   
   posts.forEach(function(post){
       
       let likedIconClass = ''
       let bigPostHeartLiked = ''
       let bigPostHeartNotLiked = ''

       
       if (post.isLiked){
           likedIconClass = 'fa-solid'
           bigPostHeartLiked = 'big-post-heart-liked'
       }else{
           bigPostHeartNotLiked = 'big-post-heart-not-liked'
       }
       
       feedHtml += 
        `<section>
                <div class="profile">
                    <img class="img-avatar" src="${post.avatar}">  
                        <div class="profile-info">
                        <p id="name" class="name">${post.name}</p> 
                        <p id="location">${post.location}</p>
                        </div>
                </div>
                    <div class="heart-container">
                    <i class="fa-solid fa-heart ${bigPostHeartLiked} ${bigPostHeartNotLiked}" id="big-post-heart-id"></i>
                    <img class="post-img" data-post="${post.uuid}" src="${post.post}">
                    </div>    
                
    
                <div class="body">
                    <div class="icons">
                        <i class="fa-regular fa-heart ${likedIconClass} icon" 
                        data-like="${post.uuid}"></i>
                        <i class="fa-regular fa-comment icon" data-comment="${post.uuid}"></i>
                        <i class="fa-regular fa-paper-plane icon" data-dm="${post.uuid}"></i>
                    </div>
                    <p id="likes" class="likes">${post.likes} likes</p>
                    <p id="username" class="username">${post.username}</p>
                    <p id="comment">${post.comment}</p> 
                </div>
            </section>` 
    
   }) 
   
   return feedHtml
        
}

function render(){
    document.getElementById('container').innerHTML = getFeedHtml();
    setTimeout(removeHearts, 1000);
}


function removeHearts() {
    const heartIcons = document.querySelectorAll('.big-post-heart-liked')
    heartIcons.forEach((icon) => {
        icon.classList.add('fade-out')
        setTimeout(() => {
            icon.classList.remove('big-post-heart-liked')
            icon.classList.add('big-post-heart-not-liked')
            icon.classList.remove('fade-out');
        }, 1000);
    });
}


render()





