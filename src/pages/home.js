import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  textContainer: {
    transform: (props) => `translateX(${props.showContent ? "0" : "100vw"})`,
    transition: "transform 1.5s ease-out",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100px",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const classes = useStyles({ showContent });
  const [showWelcome, setShowWelcome] = useState(false);
  const [hideScrollButton, setHideScrollButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setShowContent(false);
    setShowWelcome(false);
    setHideScrollButton(false);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const welcomeSection = document.getElementById("welcome-section");
      if (welcomeSection) {
        const welcomePosition = welcomeSection.offsetTop - window.innerHeight / 1.5;
        if (scrollPosition > welcomePosition) {
          setShowWelcome(true);
          setHideScrollButton(true);
        } else if (scrollPosition < welcomePosition - 200) {
          setShowWelcome(false);
          setHideScrollButton(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#F5F5DC",
        minHeight: "200vh",
        overflow: "hidden",
      }}
    >
      {/* First Section */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div className={classes.flexContainer}>
          {/* Logo */}
          <div>
            <img
              src="/imageslogo.jpeg"
              alt="ENTNT Logo"
              style={{
                width: "100px",
                height: "100px",
                transform: `translateX(${showContent ? "0" : "-100vw"})`,
                transition: "transform 1s ease-out",
                marginRight: "20px",
                objectFit: "cover",
                alignSelf: "center",
              }}
            />
          </div>

          {/* Text Container */}
          <div className={classes.textContainer}>
            <h1
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "3rem",
                transform: `translateX(${showContent ? "0" : "+100vw"})`,
                transition: "transform 1s ease-out",
                color: "#FF4500",
                fontWeight: "bold",
                margin: 0,
                textAlign: "left",
                lineHeight: "0.8",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              ENTNT
            </h1>
            <h2
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "2rem",
                color: "#000000",
                transform: `translateX(${showContent ? "0" : "+100vw"})`,
                transition: "transform 1.5s ease-out",
                fontWeight: "normal",
                margin: 0,
                textAlign: "center",
                lineHeight: "1",
                paddingBottom: "5px",
              }}
            >
              REMOTE TEAMS <span style={{ 
                opacity: showContent ? 1 : 0, 
                transition: "opacity 2s ease-out", 
                transitionDelay: "1.6s" 
              }}>MADE EASY</span>
            </h2>
          </div>
        </div>

        {/* Scroll Button */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            animation: "bounce 2s infinite",
            opacity: showContent && !hideScrollButton ? 1 : 0,
            transition: "opacity 0.5s ease-out",
            visibility: hideScrollButton ? "hidden" : "visible",
          }}
          onClick={() => {
            const welcomeSection = document.getElementById("welcome-section");
            welcomeSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <p
            style={{
              color: "#000000",
              marginBottom: "10px",
              fontSize: "1rem",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Scroll to explore
          </p>
          <div
            style={{
              width: "30px",
              height: "50px",
              border: "2px solid #000000",
              borderRadius: "15px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "8px",
                backgroundColor: "#000000",
                borderRadius: "2px",
                animation: "scrollWheel 2s infinite",
                marginTop: "8px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Welcome Section with Background Image */}
      <div
        id="welcome-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url(/blackimage.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: showWelcome ? 1 : 0,
            transition: "opacity 1s ease-out",
            zIndex: 0,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <h1
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#FFFFFF",
                opacity: showWelcome ? 1 : 0,
                transform: `translateY(${showWelcome ? "0" : "50px"})`,
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              Welcome to the Hiring Portal!
            </h1>
          </div>

          {/* Admin Login Button */}
          <div
            style={{
              display: "flex",
              opacity: showWelcome ? 1 : 0,
              transform: `translateY(${showWelcome ? "0" : "30px"})`,
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              transitionDelay: "0.3s",
            }}
          >
            <button
              onClick={() => navigate("/jobs")}
              style={{
                padding: "15px 30px",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "2px solid #FFFFFF",
                borderRadius: "5px",
                width: "200px",
                transition: "all 0.2s ease-in-out",
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;