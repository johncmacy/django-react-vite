interface PermissionType {
  name: string
  content_type: number
  codename: string
}

interface GroupType {
  name: string
  permissions: PermissionType[]
}

interface UserType {
  id: number
  username: string
  first_name: string
  last_name: string
  full_name: string
  is_authenticated: boolean
  groups: GroupType[]
}

export const currentUser: UserType = JSON.parse(
  document.getElementById("current_user")!.innerHTML
)
