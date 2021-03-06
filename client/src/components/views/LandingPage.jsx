import 'antd/dist/antd.css';
import Carousel from 'antd/es/carousel';
import CarouselPage from 'components/LandingPage/CarouselPage.jsx';
import { carouselContent } from 'constants.js';
import Footer from '../LandingPage/Footer.jsx';
import { Flex } from '@chakra-ui/react';

const LandingPage = () => {
  return (
    <Flex bgColor="#EDF2F7" direction="column" justifyContent="space-between" height="90vh">
      <Carousel autoplay arrows>
        {carouselContent.map((item) => {
          return <CarouselPage key={item.title} title={item.title} imgSrc={item.imgName} />;
        })}
      </Carousel>
      <Footer />
    </Flex>
  );
};

export default LandingPage;
