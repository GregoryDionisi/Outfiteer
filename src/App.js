import React, { useRef, useLayoutEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, CssBaseline, Box, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import logo from './assets/outfiteer logo.png';
import './index.css';
import CreateOutfit from './components/CreateOutfit';
import MyOutfits from './components/MyOutfits';
import Tappeto from './components/Tappeto';
import Armocromia from './components/Armocromia';
import Showroom from './components/Showroom';
import Login from './components/Login';
import Register from './components/Register';

import CapParallax from './components/parallax/CapParallax';
import TankTopParallax from './components/parallax/TankTopParallax';
import BaggyJeansParallax from './components/parallax/BaggyJeansParallax';
import AirForceParallax from './components/parallax/AirForceParallax';

import theme from './components/Theme';
import { OutfitProvider } from './components/OutfitContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppContext } from './components/AppContext';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const boxRef = useRef(null);
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const { isAnimating, setIsAnimating } = useContext(AppContext);

  useLayoutEffect(() => {
    gsap.to(boxRef.current, {
      scrollTrigger: {
        trigger: boxRef.current,
        start: '-130% center',
        end: '-60% center',
        toggleActions: "none play none reverse",
        //markers: true
      },
      x: 700,
      opacity: 1,
      ease: 'none',
    });
  }, []);

  useLayoutEffect(() => {
    gsap.to(boxRef1.current, {
      scrollTrigger: {
        trigger: boxRef1.current,
        start: '-130% center',
        end: '-60% center',
        toggleActions: "none play none reverse",
        //markers: true
      },
      x: -700,
      ease: 'none',
      opacity: 1
    });
  }, []);

  useLayoutEffect(() => {
    gsap.to(boxRef2.current, {
      scrollTrigger: {
        trigger: boxRef2.current,
        start: '-130% center',
        end: '-60% center',
        toggleActions: "none play none reverse",
        //markers: true
      },
      x: 700,
      ease: 'none',
      opacity: 1
    });
  }, []);

  useLayoutEffect(() => {
    gsap.to(boxRef3.current, {
      scrollTrigger: {
        trigger: boxRef3.current,
        start: '-130% center',
        end: '-60% center',
        toggleActions: "none play none reverse",
        //markers: true
      },
      x: -700,
      ease: 'none',
      opacity: 1
    });
  }, []);


  useLayoutEffect(() => {
    gsap.to('.fade-in', {
      scrollTrigger: {
        trigger: '.fade-in',
        start: '-225% center',
        end: '-160% center',
        toggleActions: "none play none reverse",
        //markers: true
      },
      y: -30,
      opacity: 1,
      ease: 'none',
    });
  }, []);


  useLayoutEffect(() => {
    gsap.to('.footer', {
      scrollTrigger: {
        trigger: '.footer',
        start: '-1020% center',
        end: '-820% center',
        toggleActions: "none play none reverse",
        //markers: true
      },
      y: -30,
      opacity: 1,
      ease: 'none',
    });
  }, []);

  useLayoutEffect(() => {
    const logoElement = document.querySelector("#logo");
    const paths = logoElement.querySelectorAll('path');
    const containerElement = document.querySelector('body'); // Modifica il selettore se necessario

    const onAnimationStart = (event) => {
      if (event.animationName === "line-anim") {
        // Blocca le interazioni e impedisce lo scroll
        containerElement.classList.add('animating');
        setIsAnimating(true); // Imposta isAnimating a true
      }
    };

    const onAnimationEnd = (event) => {
      if (event.animationName === "fill") {
        // Disabilita le animazioni CSS e imposta lo stato finale
        logoElement.style.animation = 'none';
        logoElement.style.fill = '#13665D';

        paths.forEach(path => {
          path.style.animation = 'none';
          path.style.strokeDashoffset = '0';
        });

        // Avvia l'animazione GSAP con un ritardo
        setTimeout(() => {
          gsap.to(logoElement, {
            duration: 1,
            scale: 0.5,
            y: '-45vh',
            ease: 'power1.out',
            onComplete: () => {
              // Riabilita le interazioni e lo scroll quando l'animazione GSAP è completa
              setIsAnimating(false);
              containerElement.classList.remove('animating');
            }
          });
        }, 500); // Ritardo di 500 ms
      }
    };

    // Aggiunge l'event listener per l'animazionestart e animationend
    logoElement.addEventListener("animationstart", onAnimationStart);
    logoElement.addEventListener("animationend", onAnimationEnd);

    // Pulisce gli event listener quando il componente viene smontato
    return () => {
      logoElement.removeEventListener("animationstart", onAnimationStart);
      logoElement.removeEventListener("animationend", onAnimationEnd);
    };
  }, []);

  useLayoutEffect(() => {
    const hasAnimated = localStorage.getItem('hasAnimated'); // Verifica se l'animazione è già stata eseguita

    if (!hasAnimated) {
      const interval = setInterval(() => {
        setIsAnimating(prevState => !prevState);
      }, 2000); // Cambia stato ogni 2 secondi (2000 ms)

      return () => clearInterval(interval); // Pulizia intervallo quando il componente viene smontato
    } else {
      // Se l'animazione è già stata eseguita, imposta l'opacità direttamente a 1
      gsap.set(buttonRef.current, { opacity: 1 });
      gsap.set(textRef.current, { opacity: 1 });
      gsap.set('.toolBarButton', { opacity: 1});
    }
  }, []);

  useLayoutEffect(() => {
    const duration = 1; // Durata dell'animazione in secondi

    if (isAnimating) {
      gsap.from(buttonRef.current, { opacity: 0, duration });
      gsap.from(textRef.current, { opacity: 0, duration });
      gsap.to(buttonRef.current, { opacity: 0, duration });
      gsap.to(textRef.current, { opacity: 0, duration });
    } else {
      gsap.to(buttonRef.current, { opacity: 1, duration });
      gsap.to(textRef.current, { opacity: 1, duration });

      // Memorizza in localStorage che l'animazione è stata eseguita
      localStorage.setItem('hasAnimated', 'true');
    }
  }, [isAnimating]);
  
  
  
  
  
  const logo = document.querySelectorAll('#logo path');
  
  for(let i = 0; i<logo.length; i++){
  console.log(`Letter ${i} is ${logo[i].getTotalLength()}`)
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          backgroundColor: '#FFFDD0',
        }}
      >
        <Typography sx={{ color: 'primary.main', fontSize: '12vh', textAlign: 'center', marginTop: '-20vh'}} ref={textRef}>
          Where Fashion Meets Innovation
        </Typography>
        <Button
        style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
          variant="contained"
          color="primary"
          sx={{
            width: 200,
            height: 50,
            fontFamily: 'FS Kim Bold, sans-serif',
            fontSize: '1.2rem',
            marginTop: '20px',
          }}
          ref={buttonRef}
          component={Link}
          to="/create-outfit"
        >
          Create Outfit
        </Button>
      </Box>

      <Box
  sx={{
    width: '100vw',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'background.default',
  }}
>
  <Box
    sx={{
      position: 'absolute',
      left: '-40vw',
      top: '20vh',
      padding: '20px',
      width: { xs: '70%', md: '40%' },
      backgroundColor: 'primary.main',
      color: 'background.default',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
      borderRadius: '15px',
      textAlign: 'center',
      opacity: 0
    }}
    ref={boxRef}
  >
    <Typography variant="h3" gutterBottom>
      Benvenuto nel Futuro della Moda!
    </Typography>
    <Typography variant="h4" sx={{ fontFamily: 'FS Kim Heavy' }} gutterBottom>
      🌟 Esplora il Tuo Stile 🌟
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'FS Kim Medium' }}>
      Benvenuto in Outfiteer! Qui, la moda incontra la tecnologia. Scopri come puoi creare outfit unici attraverso un’esperienza visiva innovativa e interattiva. Scegli, personalizza e visualizza i tuoi abiti in un ambiente 3D all'avanguardia!
    </Typography>
  </Box>

  <Canvas className='canvas-parallax-right'>
    <ambientLight intensity={6} />
    <Suspense fallback={null}>
      <CapParallax />
    </Suspense>
  </Canvas>
</Box>


      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Box
        sx={{
      position: 'absolute',
      left: '100vw',
      top: '25vh',
      padding: '20px',
      width: { xs: '70%', md: '40%' },
      backgroundColor: 'primary.main',
      color: 'background.default',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
      borderRadius: '15px',
      textAlign: 'center',
      opacity: 0
        }}
        ref={boxRef1}
      >
        <Typography variant="h3" gutterBottom>
          Crea il Tuo Look Ideale
        </Typography>
        <Typography variant="h4" sx={{ fontFamily: 'FS Kim Heavy' }} gutterBottom>
          👗 Design Personalizzato 👗
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'FS Kim Medium' }}>
          Utilizza il nostro strumento di design per creare il tuo look ideale. Combina capi, accessori e colori per trovare l’outfit perfetto. Il nostro modello 3D ti consente di visualizzare ogni dettaglio del tuo outfit, rendendo la creazione del tuo stile un gioco da ragazzi!
        </Typography>
      </Box>

        <Canvas className='canvas-parallax-left'>
          <ambientLight intensity={2} />
          <Suspense fallback={null}>
            <TankTopParallax />
          </Suspense>
        </Canvas>
      </Box>

      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >

<Box
        sx={{
          position: 'absolute',
      left: '-40vw',
      top: '35vh',
      padding: '20px',
      width: { xs: '70%', md: '40%' },
      backgroundColor: 'primary.main',
      color: 'background.default',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
      borderRadius: '15px',
      textAlign: 'center',
      opacity: 0
        }}
        ref={boxRef2}
      >
        <Typography variant="h3" gutterBottom>
          Visualizzazione in 3D
        </Typography>
        <Typography variant="h4" sx={{ fontFamily: 'FS Kim Heavy' }} gutterBottom>
          💫 Tecnologia Avanzata 💫
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'FS Kim Medium' }}>
          Grazie a Three.js e React Three Fiber, i nostri modelli 3D sono resi con dettagli sorprendenti e animazioni fluide. Puoi esplorare il tuo outfit da ogni angolo e vedere come appare in un ambiente realistico e interattivo.
        </Typography>
      </Box>


        <Canvas>
          <ambientLight intensity={6} />
          <Suspense fallback={null}>
            <BaggyJeansParallax />
          </Suspense>
        </Canvas>
      </Box>

      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >

<Box
        sx={{
      position: 'absolute',
      left: '100vw',
      top: '25vh',
      padding: '20px',
      width: { xs: '70%', md: '40%' },
      backgroundColor: 'primary.main',
      color: 'background.default',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
      borderRadius: '15px',
      textAlign: 'center',
      opacity: 0
        }}
        ref={boxRef3}
      >
        <Typography variant="h3" gutterBottom>
          Personalizzazione Facile e Veloce
        </Typography>
        <Typography variant="h4" sx={{ fontFamily: 'FS Kim Heavy' }} gutterBottom>
          🛠️ Semplicità e Precisione 🛠️
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'FS Kim Medium' }}>
          La nostra piattaforma è progettata per essere intuitiva e facile da usare. Personalizza ogni aspetto del tuo outfit, dall’abbigliamento agli accessori, con pochi clic. La tua visione di moda è ora alla portata di mano!
        </Typography>
      </Box>
        <Canvas>
          <ambientLight intensity={2} />
          <Suspense fallback={null}>
            <AirForceParallax />
          </Suspense>
        </Canvas>
      </Box>

      <Box
  sx={{
    width: '100vw',
    height: 'auto', // Adjusts height based on content
    minHeight: '90vh', // Ensures a minimum height
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'primary.main',
    color: 'background.default',
    zIndex: 1,
    textAlign: 'center',
  }}
>
  <Box
    className='fade-in'
    sx={{
      position: 'absolute',
      opacity: 0,
      width: { xs: '95%', md: '80%' },
      marginTop: { xs: '5vh', md: '-40vh' },
    }}
  >
    <Typography variant="h3" gutterBottom>
      Scopri e Divertiti
    </Typography>
    <Typography variant="h4" sx={{ fontFamily: 'FS Kim Heavy' }} gutterBottom>
      🚀 Inizia a Creare! 🚀
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'FS Kim Medium' }}>
      Non perdere tempo, inizia subito a esplorare e a creare il tuo stile unico. Accedi alla nostra piattaforma e scopri come la tecnologia può trasformare il tuo modo di fare moda. Il tuo outfit perfetto ti aspetta!
    </Typography>
  </Box>

  <Box
  sx={{
    position: 'absolute',
    bgcolor: 'background.default',
    width: { xs: '90%', sm: '80%', md: '90%' }, // Adjust width based on screen size
    height: { xs: '30vh', md: '40vh' },
    mt: { xs: '5vh', md: '40vh' },
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start of the flex container
    overflow: 'hidden', // Prevent image overflow
    paddingLeft: { xs: '10px', md: '30px' }, // Add padding on the left
  }}
>
<Box
  sx={{
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: { xs: '50%', md: '20%' },
    opacity: 0,
    top: '50%', // Add top margin to move it down
  }}
  className='footer'
>
  <img
    src={logo}
    alt="Logo"
    style={{
      width: '20%',
      objectFit: 'contain',
    }}
  />
  <Typography
    variant="h4"
    sx={{ textDecoration: 'none', color: 'primary.main', paddingLeft: '3%'}}
  >
    OutFiteer
  </Typography>
</Box>



<Box
  sx={{
    position: 'absolute',
    right: 0, // Aggiusta il posizionamento orizzontale per diverse dimensioni dello schermo
    top: '10vh', // Puoi regolare questo valore per posizionare verticalmente la box
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start', // Allinea il testo a sinistra all'interno della box
    justifyContent: 'space-between', // Distribuisce uniformemente le box interne
    borderRadius: '8px', // Opzionale: aggiunge bordi arrotondati
    width: { xs: '80%', sm: '60%', md: '70%' }, // Larghezza responsiva per diversi schermi
    opacity: 0
  }}
  className='footer'
>
  {/* Sezione Help */}
  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: '20px' }}>
    <Typography sx={{ color: 'primary.main', marginBottom: '8px' }}>
      Help
    </Typography>
    <Typography sx={{ color: 'primary.main', marginBottom: '4px', fontFamily: 'FS Kim Medium' }}>
      FAQs
    </Typography>
    <Typography sx={{ color: 'primary.main', marginBottom: '4px', fontFamily: 'FS Kim Medium' }}>
      Privacy Policy
    </Typography>
    <Typography sx={{ color: 'primary.main', marginBottom: '4px', fontFamily: 'FS Kim Medium' }}>
      Terms & Conditions
    </Typography>
    <Typography sx={{ color: 'primary.main', fontFamily: 'FS Kim Medium' }}>
      Cookies
    </Typography>
  </Box>

  {/* Sezione Follow us */}
  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: '20px' }}>
    <Typography sx={{ color: 'primary.main', marginBottom: '8px' }}>
      Follow us
    </Typography>
    <a href="https://www.instagram.com/_ilgreg_di0" target="_blank" rel="noopener noreferrer">
      <InstagramIcon sx={{ color: 'primary.main', fontSize: 30, marginBottom: '4px' }} />
    </a>
    <a href="https://www.facebook.com/outfiteer" target="_blank" rel="noopener noreferrer">
      <FacebookIcon sx={{ color: 'primary.main', fontSize: 30, marginBottom: '4px' }} />
    </a>
    <a href="https://www.x.com/_ilgreg_di0" target="_blank" rel="noopener noreferrer">
      <XIcon sx={{ color: 'primary.main', fontSize: 30, marginBottom: '4px' }} />
    </a>
    <a href="https://www.youtube.com/channel/UCOw3215bXS_D2FrZwsDMtDQ" target="_blank" rel="noopener noreferrer">
      <YouTubeIcon sx={{ color: 'primary.main', fontSize: 30, marginBottom: '4px' }} />
    </a>
  </Box>

  {/* Sezione Company */}
  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: '20px' }}>
    <Typography sx={{ color: 'primary.main', marginBottom: '8px' }}>
      Company
    </Typography>
    <Typography sx={{ color: 'primary.main', marginBottom: '4px', fontFamily: 'FS Kim Medium' }}>
      About Us
    </Typography>
    <Typography sx={{ color: 'primary.main', marginBottom: '4px', fontFamily: 'FS Kim Medium' }}>
      Careers
    </Typography>
    <Typography sx={{ color: 'primary.main', fontFamily: 'FS Kim Medium' }}>
      Blog
    </Typography>
  </Box>

  {/* Sezione Contact */}
  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
    <Typography sx={{ color: 'primary.main', marginBottom: '8px' }}>
      Contact Us
    </Typography>
    <Typography sx={{ color: 'primary.main', marginBottom: '4px', fontFamily: 'FS Kim Medium' }}>
      support@outfiteer.com
    </Typography>
    <Typography sx={{ color: 'primary.main', marginBottom: '4px', fontFamily: 'FS Kim Medium' }}>
      +39 331 125 9361
    </Typography>
  </Box>
</Box>
</Box>
</Box>
    </div>
  );
}

function App() {

  const toolbarRef = useRef(null);
  const { isAnimating } = useContext(AppContext);

  useLayoutEffect(() => {
    let lastScrollY = window.scrollY;
    const toolbar = toolbarRef.current;

    const updateToolbar = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 10) { // Soglia di sensibilità
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          gsap.to(toolbar, { y: -80, ease: 'power2.out', duration: 0.5 });
        } else {
          // Scrolling up
          gsap.to(toolbar, { y: 0, ease: 'power2.out', duration: 0.5 });
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', updateToolbar);

    return () => {
      window.removeEventListener('scroll', updateToolbar);
    };
  }, []);

  useLayoutEffect(() => {
    const duration = 1; // Durata dell'animazione in secondi

    if (isAnimating) {
      gsap.from('.toolBarButton', { opacity: 0, duration });
      gsap.to('.toolBarButton', { opacity: 0, duration });
    } else {
      gsap.to('.toolBarButton', { opacity: 1, duration });

      // Memorizza in localStorage che l'animazione è stata eseguita
      localStorage.setItem('hasAnimated', 'true');
    }
  }, [isAnimating]);


  return (
    <OutfitProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
      ref={toolbarRef}
      position="fixed"
      sx={{
        bgcolor: 'background.default',
        boxShadow: 'none',
        transition: 'height 0.3s ease-in-out',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
          className='toolBarButton'
          style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
            sx={{
              marginTop: '0.5vh',
              marginRight: '2vh',
              opacity: 0
            }}
            component={Link}
            to="/my-outfits"
          >
            My Outfits
          </Button>
          <Button
          className='toolBarButton'
          style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
            sx={{
              marginTop: '0.5vh',
              marginRight: '2vh',
              opacity: 0
            }}
            component={Link}
            to="/tappeto"
          >
            Tappeto
          </Button>
          <Button
          className='toolBarButton'
          style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
            sx={{
              marginTop: '0.5vh',
              marginRight: '2vh',
              opacity: 0
            }}
            component={Link}
            to="/armocromia"
          >
            Armocromia
          </Button>
          <Button
          className='toolBarButton'
          style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
            sx={{
              marginTop: '0.5vh',
              marginRight: '2vh',
              opacity: 0
            }}
            component={Link}
            to="/showroom"
          >
            Showroom
          </Button>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: '50vw',
            transform: 'translateX(-50%)',
            textDecoration: 'none'
          }}
          component={Link}
          to="/"
        >
          <svg id="logo" className="animate-svg" width="524" height="76" viewBox="0 0 524 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M521.74 24.6793L521.94 23.9915L521.353 23.5808C520.158 22.744 518.249 22.2 516.58 22.2C510.996 22.2 506.442 25.4799 503.18 31.363V23.1V22.482L502.627 22.2056L502.027 21.9056L501.713 21.7488L501.371 21.8221L477.971 26.8221L477.18 26.9911V27.8V28.4V28.5541L477.226 28.7011L480.18 38.0541V60.7599L477.218 71.1253L477.18 71.2599V71.4V72V73H478.18H506.68H507.68V72V71.4V71.1947L507.599 71.0061L503.18 60.6947V41.0833C505.14 40.0246 507.353 39.4 509.28 39.4C511.383 39.4 513.055 40.1717 514.715 41.6474L515 41.9H515.38H515.98H516.73L516.94 41.1793L521.74 24.6793Z" stroke="#13665D" stroke-width="2"/>
<path d="M464.864 46.5985L465.166 46.5817L465.409 46.4L466.209 45.8L466.609 45.5V45C466.609 38.2695 464.35 32.5889 460.093 28.5956C455.841 24.6083 449.7 22.4 442.109 22.4C427.067 22.4 414.009 32.8427 414.009 48.6C414.009 56.1641 416.406 62.5438 421.038 67.0307C425.667 71.5151 432.415 74 440.909 74C453.417 74 464.03 66.5135 465.601 53.4191L465.699 52.6093L464.925 52.3513L464.325 52.1513L463.699 51.9428L463.261 52.4356C461.044 54.9297 457.113 57.2 451.809 57.2C448.15 57.2 445.09 56.1817 442.739 54.2089C440.636 52.4446 439.029 49.8576 438.094 46.3803C445.857 46.8207 458.026 46.9783 464.864 46.5985ZM437.209 39.614V38.8V38.4C437.209 35.3157 437.628 33.1103 438.288 31.7147C438.933 30.3485 439.72 29.9 440.509 29.9C441.46 29.9 442.605 30.4001 443.663 31.9211C444.637 33.3218 445.505 35.5547 445.984 38.8894L437.209 39.614Z" stroke="#13665D" stroke-width="2"/>
<path d="M404.493 46.5985L404.795 46.5817L405.038 46.4L405.837 45.8L406.237 45.5V45C406.237 38.2695 403.979 32.5889 399.722 28.5956C395.47 24.6083 389.329 22.4 381.737 22.4C366.696 22.4 353.638 32.8427 353.638 48.6C353.638 56.1641 356.035 62.5438 360.667 67.0307C365.296 71.5151 372.044 74 380.538 74C393.046 74 403.659 66.5135 405.23 53.4191L405.328 52.6093L404.554 52.3513L403.954 52.1513L403.328 51.9428L402.89 52.4356C400.673 54.9297 396.742 57.2 391.438 57.2C387.778 57.2 384.719 56.1817 382.368 54.2089C380.265 52.4446 378.658 49.8576 377.723 46.3803C385.486 46.8207 397.655 46.9783 404.493 46.5985ZM376.837 39.614V38.8V38.4C376.837 35.3157 377.257 33.1103 377.917 31.7147C378.562 30.3485 379.349 29.9 380.138 29.9C381.089 29.9 382.234 30.4001 383.292 31.9211C384.266 33.3218 385.134 35.5547 385.613 38.8894L376.837 39.614Z" stroke="#13665D" stroke-width="2"/>
<path d="M345.035 56.3318L344.516 56.0351L344.009 56.352C342.479 57.3081 340.469 58.2 338.439 58.2C336.011 58.2 334.368 57.4564 333.293 56.0639C332.177 54.6189 331.539 52.3072 331.539 48.9V36.7508L342.59 37.2988L343.458 37.3419L343.621 36.4875L346.121 23.3875L346.246 22.7359L345.694 22.3679L345.094 21.9679L344.614 21.6482L344.097 21.903L331.539 28.0923V14.5V13.9648L331.094 13.6679L330.494 13.2679L330.155 13.0419L329.754 13.1172C316.171 15.6704 305.073 24.0588 300.124 35.297L299.935 35.727L300.145 36.1472L300.445 36.7472L300.721 37.3H301.339H308.539V52.6C308.539 59.2141 309.909 64.5809 312.952 68.3075C316.026 72.0719 320.671 74 326.839 74C336.43 74 344.124 67.7512 346.218 57.806L346.368 57.0932L345.735 56.7318L345.035 56.3318Z" stroke="#13665D" stroke-width="2"/>
<path d="M265.188 72V73H266.188H293.188H294.188V72V71.4V71.26L294.149 71.1253L291.188 60.76V23.1V22.482L290.635 22.2056L290.035 21.9056L289.721 21.7488L289.379 21.8221L265.979 26.8221L265.188 26.9911V27.8V28.4V28.5541L265.234 28.7011L268.188 38.0541V60.7599L265.226 71.1253L265.188 71.26V71.4V72ZM266.788 11C266.788 14.1403 268.232 16.6778 270.539 18.4012C272.823 20.1075 275.922 21 279.288 21C282.794 21 285.923 20.1114 288.201 18.3994C290.505 16.6681 291.888 14.1268 291.888 11C291.888 7.91927 290.501 5.38101 288.204 3.6404C285.928 1.91663 282.801 0.999996 279.288 0.999996C275.916 0.999996 272.817 1.92073 270.536 3.63865C268.235 5.37122 266.788 7.90583 266.788 11Z" stroke="#13665D" stroke-width="2"/>
<path d="M258.935 8.35983L258.636 7.99999H258.167H207.867H206.867V8.99999V9.6V9.74005L206.906 9.87472L209.867 20.24V60.7599L206.906 71.1253L206.867 71.2599V71.4V72V73H207.867H237.167H238.167V72V71.4V71.1947L238.086 71.0061L233.667 60.6947V44.3337L246.087 47.9599L246.464 48.0699L246.814 47.8944L247.614 47.4944L248 47.3017L248.125 46.889L251.325 36.289L251.516 35.6554L251.007 35.2318L250.407 34.7318L250.046 34.4305L249.583 34.5171L233.667 37.4955V14.063C241.721 14.6867 248.267 18.2696 251.443 25.9807L251.697 26.6H252.367H253.367H254.089L254.316 25.9144L259.616 9.91444L259.791 9.38683L259.435 8.95984L258.935 8.35983Z" stroke="#13665D" stroke-width="2"/>
<path d="M195.465 56.3318L194.946 56.0351L194.439 56.352C192.909 57.3081 190.899 58.2 188.869 58.2C186.44 58.2 184.798 57.4564 183.723 56.0639C182.607 54.6189 181.969 52.3072 181.969 48.9V36.7508L193.019 37.2988L193.888 37.3419L194.051 36.4875L196.551 23.3875L196.675 22.7359L196.123 22.3679L195.523 21.9679L195.044 21.6482L194.527 21.903L181.969 28.0923V14.5V13.9648L181.523 13.6679L180.923 13.2679L180.584 13.0419L180.184 13.1172C166.601 15.6704 155.502 24.0588 150.554 35.297L150.364 35.727L150.574 36.1472L150.874 36.7472L151.151 37.3H151.769H158.969V52.6C158.969 59.2141 160.339 64.5809 163.382 68.3075C166.456 72.0719 171.1 74 177.269 74C186.859 74 194.554 67.7512 196.647 57.806L196.797 57.0932L196.165 56.7318L195.465 56.3318Z" stroke="#13665D" stroke-width="2"/>
<path d="M145.273 58.0318L144.808 57.7662L144.329 58.0056C143.862 58.2393 143.315 58.4 142.577 58.4C142.102 58.4 141.765 58.2972 141.514 58.1496C141.263 58.0017 141.045 57.7762 140.861 57.4478C140.474 56.7596 140.277 55.6917 140.277 54.3V23.1V22.482L139.724 22.2056L139.124 21.9056L138.81 21.7488L138.468 21.8221L115.068 26.8221L114.277 26.9911V27.8V28.4V28.5541L114.323 28.7011L117.277 38.0541V56.6388C116.189 57.4924 114.697 58 113.277 58C111.493 58 110.124 57.3885 109.155 56.0216C108.141 54.592 107.477 52.2118 107.477 48.5V23.1V22.482L106.924 22.2056L106.324 21.9056L106.01 21.7488L105.668 21.8221L82.2676 26.8221L81.4766 26.9911V27.8V28.4V28.5541L81.523 28.7011L84.4766 38.0541V51.4C84.4766 57.8169 85.7975 63.5843 88.5945 67.7797C91.4224 72.0216 95.7288 74.6 101.477 74.6C108.812 74.6 114.753 70.7053 117.955 64.8855C118.581 67.2598 119.636 69.2963 121.14 70.8768C123.316 73.1646 126.342 74.4 130.077 74.4C137.969 74.4 145.62 68.1313 146.472 59.3971L146.535 58.7529L145.973 58.4318L145.273 58.0318Z" stroke="#13665D" stroke-width="2"/>
<path d="M1.79999 40.3C1.79999 49.8642 4.87186 58.3073 10.8243 64.3635C16.7814 70.4244 25.5305 74 36.7 74C56.7754 74 72.2 60.3261 72.2 40.7C72.2 31.6252 69.122 23.1909 63.1831 17.0191C57.2359 10.8387 48.4898 7 37.3 7C17.2246 7 1.79999 20.6739 1.79999 40.3ZM48 53.2C48 57.8978 47.4013 61.2101 46.344 63.3134C45.8224 64.351 45.2054 65.0619 44.5229 65.5157C43.8466 65.9653 43.05 66.2 42.1 66.2C40.5322 66.2 38.7152 65.1637 36.8028 62.9975C34.9167 60.8612 33.0793 57.7806 31.4669 54.0759C28.2435 46.6695 26 36.9549 26 27.8C26 23.1022 26.5986 19.7899 27.6559 17.6866C28.1776 16.649 28.7946 15.9381 29.4771 15.4843C30.1534 15.0347 30.9499 14.8 31.9 14.8C33.4362 14.8 35.2397 15.8408 37.152 18.0271C39.0352 20.1802 40.8766 23.281 42.4956 26.9992C45.7326 34.4332 48 44.1478 48 53.2Z" stroke="#13665D" stroke-width="2"/>
          </svg>
        </Box>
        <Button
          className='toolBarButton'
          style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
            sx={{
              marginTop: '0.5vh',
              marginRight: '2vh',
              opacity: 0
            }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
      </Toolbar>
    </AppBar>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-outfit" element={<CreateOutfit />} />
            <Route path="/my-outfits" element={<MyOutfits />} />
            <Route path="/tappeto" element={<Tappeto />} />
            <Route path="/armocromia" element={<Armocromia />} />
            <Route path="/showroom" element={<Showroom />} />
          </Routes>
      </ThemeProvider>
    </OutfitProvider>
  );
}

export default App;
