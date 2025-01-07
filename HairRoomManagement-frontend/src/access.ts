/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser && currentUser.userRole === 'Staff' || 'Manager',
    canAdmin: currentUser && currentUser.userRole === 'Manager',
  };
}
