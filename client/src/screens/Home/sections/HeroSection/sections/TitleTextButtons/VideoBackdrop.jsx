import React from "react";
import { Button, Typography, Box, useTheme, useMediaQuery } from "@mui/material";

export const TitleTextsButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: { xs: "1rem", md: "2rem" },
      minHeight: '400px', // Ensure minimum height for visibility
      borderRadius: '25px'
    }}>
      {/* Background Video */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, 
      }}>
        <video
          loop={true} 
          muted={true} 
          autoPlay={true}
          playsInline={true}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <source src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to ensure text readability */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust opacity as needed
          zIndex: 1,
        }} />
      </Box>

      {/* Main Content */}
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-end" },
        gap: { xs: "2rem", md: "124px" },
        position: 'relative',
        zIndex: 2,
      }}>
        <Typography variant="h1" component="p" sx={{
          fontFamily: "var(--heading-1-font-family)",
          fontSize: {
            xs: "calc(var(--heading-1-font-size) * 0.6)",
            sm: "calc(var(--heading-1-font-size) * 0.8)",
            md: "var(--heading-1-font-size)"
          },
          fontStyle: "var(--heading-1-font-style)",
          fontWeight: "var(--heading-1-font-weight)",
          letterSpacing: "var(--heading-1-letter-spacing)",
          lineHeight: "var(--heading-1-line-height)",
          marginTop: "-1px",
          position: "relative",
          width: "fit-content",
          textAlign: { xs: "center", md: "left" },
        }}>
          <span style={{ color: "#2f4f68" }}>Giving </span>
          <span style={{ color: "#1479cc" }}>Hope</span>
          <span style={{ color: "#2f4f68" }}>
            ,<br />
            Creating Impact
          </span>
        </Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          gap: "24px",
          maxWidth: { xs: "100%", md: "658px" },
        }}>
          <Typography variant="body1" sx={{
            color: "var(--black)",
            fontFamily: "var(--paragraph-font-family)",
            fontSize: "var(--paragraph-font-size)",
            fontStyle: "var(--paragraph-font-style)",
            fontWeight: "var(--paragraph-font-weight)",
            letterSpacing: "var(--paragraph-letter-spacing)",
            lineHeight: "var(--paragraph-line-height)",
            marginTop: "-1px",
            opacity: 0.75,
            position: "relative",
            width: "100%",
            textAlign: { xs: "center", md: "left" },
          }}>
            We are deeply committed to inspiring hope and making a meaningful difference in the lives of young people
            affected by diabetes.
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: "24px",
            width: { xs: "100%", sm: "auto" },
          }}>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#1479cc',
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Learn More
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                borderColor: 'var(--black)', 
                color: 'var(--black)',
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Donate
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                borderColor: 'var(--white)', 
                color: 'var(--white)',
                width: { xs: "100%", sm: "auto", 
                backgroundColor: "#2f4f68",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};