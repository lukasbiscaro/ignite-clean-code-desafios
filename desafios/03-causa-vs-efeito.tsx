// Causa vs Efeito
import { useEffect, useState } from "react"

interface UserInformation {
  name: string;
  github: string;
}

function fetchUser() {
  return {
    data: {
      user: {
        name: 'Joseph Oliveira',
        github: 'https://github.com/josepholiveira'
      }
    }
  }
}

export function UserProfile() {
  const [isUserProfileInformationLoading, setIsUserProfileInformationLoading] = useState(false)
  const [userData, setUserData] = useState<UserInformation>()

  useEffect(() => {
    function getUserInformation() {
      setIsUserProfileInformationLoading(true)

      const fetchUserResponse = fetchUser()

      setUserData(fetchUserResponse.data.user)

      setIsUserProfileInformationLoading(false)
    }

    getUserInformation()
  })

  if (isUserProfileInformationLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <img src={`${userData?.github}.png`} alt="" />
      <a href={userData?.github}>{userData?.name}</a>
    </div>
  )
}


