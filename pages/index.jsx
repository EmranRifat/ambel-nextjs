import Title from "../components/Title";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Services from "../components/Home/Services/services";
import Hero from "../components/Home/Hero/Hero";
import SearchSection from "../components/Home/SearchSection/SearchSection";
import Content from "../components/Home/Content/Content";
import Appointment from "../components/Home/Appointment/appointment";
import Organization from "../components/Home/Business/business";
import Sponsor from "../components/Home/Sponsor/sponsor";
import useScrollPercentage from "../hooks/getScrollPercentage";
import NavHero from "../components/Home/Nav-hero/NavHero";
import Location from "../components/Home/Location/Location";
import Unlimited from "../components/Home/Unlimited/Unlimited";
import Secure from "../components/Home/Secure/Secure";
import Slider from "../components/Home/Slider/Slider.js";
import Form from "../components/Home/form/Form";

const Index = () => {
	const [scrollRef, scrollPercentage] = useScrollPercentage();

	return (
		<main
			className="bg-white h-screen overflow-scroll "
			// @ts-ignore
			ref={scrollRef}
		>
			<Title title="Ambel - Your Appointment Solution" />
			{
				// @ts-ignore
				scrollPercentage < 10 && <Navbar />
			}
			<div className=" max-w-[1536px] m-auto ">
				<Hero />
				<SearchSection />
				<NavHero/>
				<Content />
				<Location/>
				<Unlimited/>
		 		{/* <Appointment /> */}
			   <Secure/>
				{/* <Organization /> */}
		   	<Slider/>
				<Form></Form>
				{/* <Services />
				<Sponsor /> */}
				<Footer />
			</div>
		</main>
	);
};

export default Index;
