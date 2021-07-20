const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const previewImg = (imgInput, imgElement) => {
  const file = imgInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};


const fileChooserAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const DEFAULT_AVATAR_IMAGE = previewAvatar.src;

fileChooserAvatar.addEventListener('change', () => {
  previewImg(fileChooserAvatar, previewAvatar);
});


const fileChooserOfferPhoto = document.querySelector('#images');
const previewOfferPhoto = document.querySelector('.ad-form__photo');
const previewOfferPhotoImg = document.createElement('img');

fileChooserOfferPhoto.addEventListener('change', () => {
  previewOfferPhotoImg.style.marginTop = '15px';
  previewOfferPhotoImg.style.marginLeft = '13px';
  previewOfferPhotoImg.style.height = '40px';
  previewOfferPhotoImg.style.width = '44px';
  previewOfferPhoto.appendChild(previewOfferPhotoImg);

  previewImg(fileChooserOfferPhoto, previewOfferPhotoImg);
});


const resetImages = () => {
  previewAvatar.src = DEFAULT_AVATAR_IMAGE;

  if(previewOfferPhoto.children[0]) {
    previewOfferPhoto.children[0].remove();
  }
};

export {resetImages};
