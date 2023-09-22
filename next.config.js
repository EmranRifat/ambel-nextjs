/** @type {import('next').NextConfig} */

const nextConfig = {


	
	images: {
		domains: [
			"localhost",
			"api.ambel.ca",
			"firebasestorage.googleapis.com",
			"lh3.googleusercontent.com",
			"pbs.twimg.com",
			"nyc3.digitaloceanspaces.com",
			"ambel-media.nyc3.digitaloceanspaces.com"
		],
	},
	reactStrictMode: true,

	

	typescript: {
		ignoreBuildErrors: true,
	},

};




module.exports = nextConfig;
