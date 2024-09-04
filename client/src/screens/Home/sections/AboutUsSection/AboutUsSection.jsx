import React from "react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { MySvg } from "../../../../assets/littleSvg";

export const AboutUsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  return (
    <Box sx={{
      alignItems: "center",
      alignSelf: "stretch",
      backgroundColor: "#dfe6e9",
      backgroundPosition: "50% 50%",
      backgroundSize: "cover",
      display: "flex",
      // flex: "0 0 auto",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      padding: isMobile ? "32px 16px" : isTablet ? "48px 32px" : "64px 100px",
      position: "relative",
      width: "100%",
    }}>
      <Box className="ornament" sx={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "relative",
        width: isMobile ? "100%" : isTablet ? "50%" : "auto",
      }}>
        <Box className="photo-2" sx={{
          alignItems: "flex-end",
          backgroundImage: "url(https://imgur.com/tEwOw1M.png)",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          borderRadius: "25px",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          height: isMobile ? "200px" : "266px",
          padding: "0px 0px 16px 16px",
          position: "relative",
          width: "100%",
        }}>
          {["Volunteers", "Charity"].map((text, index) => (
            <Box key={index} className="div-wrapper" sx={{
              alignItems: "center",
              border: "1px solid",
              borderColor: "black",
              borderRadius: "50px",
              display: "inline-flex",
              justifyContent: "center",
              padding: isMobile ? "4px 12px" : "8px 24px",
            }}>
              <Typography className="text-wrapper-16" sx={{
                color: "black",
                fontFamily: "var(--heading-5-font-family)",
                fontSize: isMobile ? "0.8rem" : "var(--heading-5-font-size)",
                fontWeight: "var(--heading-5-font-weight)",
                whiteSpace: "nowrap",
              }}>
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className="numbers-photo" sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          width: "100%",
        }}>
          <Box className="numbers-2" sx={{
            alignItems: "flex-start",
            backgroundColor: "#1479cc",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "26px",
            padding: "16px",
            width: isMobile ? "100%" : "190px",
          }}>
            <MySvg className="vector-2" sx={{ flex: "0 0 auto" }} />
            <Box className="text-3" sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}>
              <Typography className="text-wrapper-17" sx={{
                color: "var(--white)",
                fontFamily: "var(--heading-3-font-family)",
                fontSize: isMobile ? "1.5rem" : "var(--heading-3-font-size)",
                fontWeight: "var(--heading-3-font-weight)",
                textShadow: "0px 4px 4px #00000040",
                whiteSpace: "nowrap",
              }}>
                1.1 Million
              </Typography>
              <Typography className="children-are-living" sx={{
                color: "var(--white)",
                fontFamily: "var(--heading-6-font-family)",
                fontSize: isMobile ? "0.8rem" : "var(--heading-6-font-size)",
                fontWeight: "var(--heading-6-font-weight)",
                opacity: 0.75,
              }}>
                children are living <br />
                with Type 1 diabetes.
              </Typography>
            </Box>
          </Box>
          <Box
            component="img"
            className="photo-3"
            sx={{
              height: isMobile ? "auto" : "170px",
              width: isMobile ? "100%" : "auto",
              objectFit: "cover",
              borderRadius: "25px",
            }}
            alt="Photo"
            src="https://imgur.com/CodgROb.png"
          />
        </Box>
      </Box>
      <Box className="contents-2" sx={{
        display: "flex",
        flexDirection: "column",
        gap: "56px",
        padding: isMobile ? "32px 0 0 0" : isTablet ? "0 0 0 32px" : "0 0 0 1rem",
        width: isMobile ? "100%" : isTablet ? "50%" : "auto",
        maxWidth: "500px",
      }}>
        <Box className="text-4" sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          <Typography className="text-wrapper-18" sx={{
            color: "var(--blue)",
            fontFamily: "var(--heading-2-font-family)",
            fontSize: isMobile ? "1.5rem" : isTablet ? "1.8rem" : "var(--heading-2-font-size)",
            fontWeight: "var(--heading-2-font-weight)",
            width: "100%",
          }}>
            Volunteers - <br /> A Beacon of Hope and Health
          </Typography>
          <Typography className="text-wrapper-19" sx={{
            color: "var(--black)",
            fontFamily: "var(--paragraph-font-family)",
            fontSize: isMobile ? "0.9rem" : "var(--paragraph-font-size)",
            fontWeight: "var(--paragraph-font-weight)",
            opacity: 0.5,
            width: "100%",
          }}>
            Our Camps are more than just summer camps—they are a vital part of our mission to empower young lives
            touched by diabetes. As a volunteer, you play a pivotal role in this transformative journey, helping to
            shape a brighter, healthier future for children in South Texas and beyond.
          </Typography>
        </Box>
        <Button
          className="button button-2"
          variant="contained"
          onClick={() => window.location.href = "https://www.stjda.org/mission"}
          sx={{
            backgroundColor: "#1479cc !important",
            display: "flex !important",
            color: "var(--light-gray) !important",
            width: isMobile ? "100%" : "84px !important",
            padding: "8px 24px",
            textTransform: "none !important",
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};