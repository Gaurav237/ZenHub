// added this ajax so that on posting page does not reloads (its traditional way)
{   
    // method to submit form  data for new post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                url: '/posts/create',
                type: 'post',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    // data => {data: {post}, message: "Post Created!"}
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list').prepend(newPost);

                }, 
                error : function (xhr, status, err) {
                    console.log(err);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDOM = function(post) {
        return $(`
        <li id="post-${ post._id }">
            <div class="card mb-3">
                <div class="card-body">
                <div class="row">
                    <div class="col-md-2">
                    <img src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png" alt="Author Profile Photo" class="img-fluid rounded-circle">
                    </div>
                    <div class="col-md-10">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="card-subtitle mb-2 text-muted">${ post.user.name }</h6>
                        <a id="delete-post-button" href="/posts/destroy/${ post.id }" class="btn btn-danger btn-sm">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </div>
                    <p class="card-text">${ post.content }</p>
                    <div class="row">
                        <div class="col-md-6">
                        <button class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-heart"></i> Like</button>
                        <button class="btn btn-sm btn-outline-secondary ms-2" data-bs-toggle="collapse" data-bs-target="#commentsCollapse-${ post._id }" aria-expanded="false" aria-controls="commentsCollapse-<%= post.id %>"><i class="fa-solid fa-comment"></i> Comment</button>
                        </div>
                        <div class="col-md-6 text-md-end">
                        <small class="text-muted">Posted on: ${new Date(post.createdAt).toISOString().substr(0, 10)}</small>
                        </div>
                    </div>

                    <div id="posts-comments">
                        <div class="collapse mt-3" id="commentsCollapse-${ post._id }">
                            <div class="card">
                            <div class="card-body">
                                <h6 class="card-title">Comments</h6>
                                
                                <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST" class="mb-3">
                                    <div class="form-group d-flex">
                                    <input type="text" class="form-control" name="post_content" placeholder="Type here to add a comment..." required>
                                    <input type="hidden" name="post_id" value="${ post._id }">
                                    <button type="submit" class="btn btn-primary ms-4">Comment</button>
                                    </div>
                                </form>

                                <div class="post-comments-list">
                                    <ul id="post-comments-${ post._id }" class="list-group">
                                    
                                    </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    </div>
                </div>
                </div>
            </div>
        </li>
        `);
    }

    createPost();
}