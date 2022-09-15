export const setupAvatarPopup = () => {
  const avatar = document.querySelector('img.profile-page__avatar')
  console.log(avatar)
  const togglePopup = () => {
    console.log('opened popup')
  }

  avatar.addEventListener('click', togglePopup)
}