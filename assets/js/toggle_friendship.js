class ToggleFriendship {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleFriendship();
    }

    toggleFriendship() {
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
                success: function (data) {
                    console.log(data);

                    if (data.isFriend == false) {
                        $(self).html('Remove Friendship');
                    } else {
                        $(self).html('Add Friendship');
                    }

                    console.log(data.message);
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        });
    }
}