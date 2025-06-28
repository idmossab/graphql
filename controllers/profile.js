export function render_user_profile(user){
    console.log("the received user is: ", user);
    
            const container = document.getElementById('profile_container');
            
            if (!user) {
                container.innerHTML = '<div class="error">No user data available</div>';
                return;
            }

            // Get first letters for avatar
            const initials = (user.firstName?.[0] || '') + (user.lastName?.[0] || '');
            
            container.innerHTML = `
                <div class="profile-card">
                    <div class="profile-avatar">
                        ${initials || '?'}
                    </div>
                    <div class="profile-info">
                        <h3>${user.firstName || ''} ${user.lastName || ''}</h3>
                        <div class="profile-details">
                            ${user.login ? `
                                <div class="profile-detail">
                                    <strong>Username</strong>
                                     <small>${user.login}</small>
                                </div>
                            ` : ''}
                            ${user.email ? `
                                <div class="profile-detail">
                                    <strong>Email</strong>
                                    <small>${user.email}</small>
                                </div>
                            ` : ''}
                            ${user.campus ? `
                                <div class="profile-detail">
                                    <strong>Campus</strong>
                                    <small> ${user.campus}</small>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }
