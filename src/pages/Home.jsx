import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Contact from '../components/sections/Contact';
import Loading from '../components/common/Loading';
import ScrollToTop from '../components/common/ScrollToTop';
import { getContent, getServices, initializeDefaultContent, initializeDefaultServices } from '../services/dataService';

// Fallback data when Firebase is not configured
const fallbackData = {
  hero: {
    title: 'Av. Yunus Emre Koçyiğit',
    subtitle: 'Avukat',
    tagline: 'Hukukun Gücü, Güvenin Adresi',
    ctaText: 'İletişime Geçin'
  },
  about: {
    name: 'Yunus Emre Koçyiğit',
    title: 'Avukat',
    bio: 'Hukuk alanında uzman danışmanlık hizmeti sunuyoruz. Müvekkillerimizin haklarını korumak için titizlikle çalışıyoruz. Her dava için özel çözümler üretiyoruz.',
    education: 'Hukuk Fakültesi Mezunu',
    experience: '10+ Yıl Deneyim',
    photoUrl: '/yek.jpeg'
  },
  contact: {
    phone: '0 555 123 4567',
    email: 'info@yekavukat.com',
    address: 'İstanbul, Türkiye',
    whatsapp: '05551234567',
    linkedin: '',
    instagram: ''
  }
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState(null);
  const [aboutContent, setAboutContent] = useState(null);
  const [contactContent, setContactContent] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize default content if needed
        await initializeDefaultContent();
        await initializeDefaultServices();

        // Fetch all content
        const [hero, about, contact, servicesData] = await Promise.all([
          getContent('hero'),
          getContent('about'),
          getContent('contact'),
          getServices()
        ]);

        setHeroContent(hero || fallbackData.hero);
        setAboutContent(about || fallbackData.about);
        setContactContent(contact || fallbackData.contact);
        setServices(servicesData || []);
      } catch (error) {
        console.error('Error fetching content:', error);
        // Use fallback data when Firebase fails
        setHeroContent(fallbackData.hero);
        setAboutContent(fallbackData.about);
        setContactContent(fallbackData.contact);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Navbar contactInfo={contactContent} />
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Services services={services} />
      <Contact contactInfo={contactContent} heroContent={heroContent} />
      <Footer contactInfo={contactContent} heroContent={heroContent} />
      <ScrollToTop />
    </Box>
  );
};

export default Home;
