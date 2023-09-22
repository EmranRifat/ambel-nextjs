const topBarItems = (dashboardUrl) => {
	// console.log(user);

	let userType;

	if (dashboardUrl.includes("business-dashboard")) {
		userType = "Organization";
	} else if (dashboardUrl.includes("practitioner-dashboard")) {
		userType = "Practitioner";
	} else {
		userType = "User or Member";
	}

	switch (userType) {
		case "User or Member":
			return [
				{
					id: 0,
					name: "My Account",
					link: "/user-dashboard",
					slug: "my_account",
				},
				{
					id: 1,
					name: "Message",
					link: "/user-dashboard/message",
					slug: "message",
				},
				{
					id: 2,
					name: "Schedule",
					link: "/user-dashboard/schedule",
					slug: "schedule",
				},
				{
					id: 3,
					name: "Payment",
					link: "/user-dashboard/payment",
					slug: "payment",
				},
				{
					id: 4,
					name: "Reports",
					link: "/user-dashboard/reports",
					slug: "report",
				},
				{
					id: 5,
					name: "Settings",
					link: "/user-dashboard/setup",
					slug: "settings",
				},
			];
		case "Practitioner":
			return [
				{
					id: 0,
					name: "Dashboard",
					link: "/practitioner-dashboard",
					slug: "dashboard",
				},
				{
					id: 1,
					name: "Message",
					link: "/practitioner-dashboard/message",
					slug: "message",
				},
				{
					id: 2,
					name: "Customers",
					link: "/practitioner-dashboard/customers",
					slug: "customers",
				},
				{
					id: 3,
					name: "Staffs",
					link: "/practitioner-dashboard/staffs",
					slug: "staffs",
				},
				{
					id: 4,
					name: "Resources",
					link: "/practitioner-dashboard/chart",
					slug: "resources",
				},
				{
					id: 5,
					name: "Schedule",
					link: "/practitioner-dashboard/schedule",
					slug: "schedule",
				},
				{
					id: 6,
					name: "Payment",
					link: "/practitioner-dashboard/payment",
					slug: "payment",
				},
				{
					id: 7,
					name: "Reports",
					link: "/practitioner-dashboard/reports",
					slug: "report",
				},
				{
					id: 8,
					name: "Settings",
					link: "/practitioner-dashboard/setup",
					slug: "settings",
				},

				{
					id: 9,
					name: "Shop",
					link: "/practitioner-dashboard/shop",
					slug: "shop",
				},
			];
		case "Organization":
			return [
				{
					id: 0,
					name: "Dashboard",
					link: "/business-dashboard",
					slug: "dashboard",
				},
				{
					id: 1,
					name: "Message",
					link: "/business-dashboard/message",
					slug: "message",
				},
				{
					id: 2,
					name: "Customers",
					link: "/business-dashboard/customers",
					slug: "customers",
				},
				{
					id: 3,
					name: "Staffs",
					link: "/business-dashboard/staffs",
					slug: "staffs",
				},
				{
					id: 4,
					name: "Resources",
					link: "/business-dashboard/chart",
					slug: "resources",
				},
				{
					id: 5,
					name: "Schedule",
					link: "/business-dashboard/schedule",
					slug: "schedule",
				},
				{
					id: 6,
					name: "Payment",
					link: "/business-dashboard/payment",
					slug: "payment",
				},
				{
					id: 7,
					name: "Reports",
					link: "/business-dashboard/reports",
					slug: "report",
				},
				{
					id: 8,
					name: "Settings",
					link: "/business-dashboard/setup",
					slug: "settings",
				},

				{
					id: 9,
					name: "Shop",
					link: "/business-dashboard/shop",
					slug: "shop",
				},
			];
		default:
			return [
				{
					id: 0,
					name: "My Account",
					link: "/user-dashboard",
					slug: "my_account",
				},
				{
					id: 1,
					name: "Message",
					link: "/user-dashboard/message",
					slug: "message",
				},
				{
					id: 2,
					name: "Schedule",
					link: "/user-dashboard/schedule",
					slug: "schedule",
				},
				{
					id: 3,
					name: "Payment",
					link: "/user-dashboard/payment",
					slug: "payment",
				},
				{
					id: 4,
					name: "Reports",
					link: "/user-dashboard/reports",
					slug: "report",
				},
				{
					id: 5,
					name: "Settings",
					link: "/user-dashboard/setup",
					slug: "settings",
				},
			];
	}
};
export default topBarItems;
