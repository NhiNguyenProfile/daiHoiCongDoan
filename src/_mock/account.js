// ----------------------------------------------------------------------
let currentId,
  currentDisplayName,
  currentEmail,
  currentPhotoURL,
  currentEmailVerified;

export function getUser() {
  return {
    currentId,
    currentDisplayName,
    currentEmail,
    currentPhotoURL,
    currentEmailVerified,
  };
}

export default function storeAccount(
  idUser,
  displayNameUser,
  emailUser,
  photoUrlUser,
  emailVerifiedUser
) {
  currentId = idUser
  currentDisplayName = displayNameUser
  currentEmail = emailUser
  currentPhotoURL = photoUrlUser
  currentEmailVerified = emailVerifiedUser
}

// export default Account;
