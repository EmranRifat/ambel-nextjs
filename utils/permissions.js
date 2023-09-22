export const hasPermission = (permissions, permissionSlug, permissionType) => {
	// console.log(permissions);
	if (!permissions) return true;

	const hasPermission = permissions.some(
		(permission) => {
			return (permission.slug.startsWith(permissionSlug) && permission[permissionType])
		}
	);

	const checkInPermissionList = permissions.some(
		(permission) => permission.slug.startsWith(permissionSlug)
	);

	return hasPermission || !checkInPermissionList;
};
