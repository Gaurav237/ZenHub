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
                        $(self).html('REMOVE');
                        const friendItem = `
                        <li class="friend-item list-group-item d-flex justify-content-between align-items-center" data-friend-id="${data.friend.id}">
                            <div class="d-flex align-items-center">
                            <img src="${data.friend.avatar}" alt="Profile Picture" class="rounded-circle me-3" width="40" height="40">
                            <a href="/users/profile/${data.friend.id}" class="user-a-name">
                                ${data.friend.name}
                            </a>
                            </div>
                        </li>
                        `;
                        $('#user-friends ul').append(friendItem);
                    } else {
                        $(self).html('ADD');
                        $('#user-friends ul').find(`[data-friend-id="${data.friend.id}"]`).remove();

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