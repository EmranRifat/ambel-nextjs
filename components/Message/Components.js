export const UserStatus = ({ active }) => {
  return <div className={`h-3 w-3 lg:h-4 border-2 border-white lg:w-4 rounded-full ${active ? 'bg-emerald-600' : 'bg-gray-400'}`}></div>
}

export const SUserStatus = ({ active }) => {
  return <div className={`h-3 border-2 border-white w-3 rounded-full  ${active ? 'bg-emerald-600' : 'bg-gray-400'}`}></div>
}
