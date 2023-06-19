// [CHANGE] create a class to toggle likes when a like link is clicked using AJAX

class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // another way of writing ajax
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(data);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }

                $(self).attr('data-likes', likesCount);
                $(self).html(`<i class="fa-solid fa-heart"></i> ${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request', errData);
            });
        });
    }
}