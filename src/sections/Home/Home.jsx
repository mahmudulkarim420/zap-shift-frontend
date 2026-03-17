import React from 'react';
import Banner from '../../components/Banner/Banner.jsx';
import HowItWorks from '../../components/How It Works/HowItWorks.jsx';
import OurServices from '../../components/Our Services/OurServices.jsx';
import BrandLogo from '../../components/Brand Logo/BrandLogo.jsx';
import Info from '../../components/Info/Info.jsx';
import PriorityBanner from '../../components/Priority Banner/PriorityBanner.jsx';
import Reviews from '../../components/Reviews/Reviews.jsx';
import FAQSection from '../../components/FAQSection/FAQSection.jsx';

const Home = () => {
    return (
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24 pb-16 sm:pb-20 lg:pb-24">
            <Banner/>
            <HowItWorks/>
            <OurServices/>
            <BrandLogo/>
            <Info/>
            <PriorityBanner/>
            <Reviews/>
            <FAQSection/>
        </div>
    );
};

export default Home;