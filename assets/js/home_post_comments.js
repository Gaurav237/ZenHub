class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postItem = $(`#post-${postId}`);
        this.commentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);


        // call for all the existing comments
        let self = this;
        $(' #delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let postCommentsSelf = this; // postCommentsSelf is to create a reference to the current instance of the PostComments class.

        this.commentForm.submit(function(e) {
            e.preventDefault();
            let self = this;  //   reference to the current HTML form element being submitted.

            $.ajax({
                type: 'POST',
                url: '/comments/create',
                data: $(self).serialize(),  // It traverses all form elements within the self context (the form element targeted by $(self)) and collects their values. 
                success: function(data) {
                    console.log(data);
                    let newComment = postCommentsSelf.newCommentDOM(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);

                    // add delete function usign AJAX
                    postCommentsSelf.deleteComment($(' #delete-comment-button', newComment));

                    // [CHANGE] enable the functionality of the toggle like button on the new comment 
                    new ToggleLike($(' .toggle-like-button', newComment));
                    
                    new Noty({
                        theme: 'metroui',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1200,

                    }).show();
                }, 
                error: function(error){
                    console.log(error.responseText);
                }        
            });
        });
    }


    newCommentDOM(comment){
        return $(`
        <li id="comment-${ comment._id }" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
            <div>
                <h6 class="mb-0 small text-muted">${ comment.user.name }</h6>
            </div>
            <div>
                <a id="delete-comment-button" href="/comments/destroy/${ comment._id }" class="btn btn-sm btn-danger">
                    <i class="fa-solid fa-trash fa-xs"></i>
                </a>
            </div>
            </div>
            <p class="mb-0 font-weight-bold">${ comment.content }</p>
            
            <a data-likes="0" href="/likes/toggle/?id=${ comment._id }&type=Comment" class="toggle-like-button btn btn-sm btn-primary">
                <i class="fa-solid fa-heart"></i> 
                0 Likes
            </a>
        </li> 
        `);
    }

    deleteComment(deleteLink) {  // <a> tag
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'metroui',
                        text: 'Comment Deleted !',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1200,
                        animation: {
                            open: 'animated bounceInRight', // Animate.css class names
                            close: 'animated bounceOutRight' // Animate.css class names
                        }

                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
}