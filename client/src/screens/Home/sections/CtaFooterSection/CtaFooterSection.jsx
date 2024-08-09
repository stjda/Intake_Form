import React from "react";
import { Box, Typography, Button, TextField, Container, useTheme, useMediaQuery } from "@mui/material";

export const CtaFooterSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      alignItems: "flex-start",
      alignSelf: "stretch",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      position: "relative",
      width: "100%",
    }}>
      <Box sx={{
        alignItems: "flex-start",
        alignSelf: "stretch",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "764px",
        justifyContent: "flex-end",
        padding: isMobile ? "0px 24px" : "0px 100px",
        position: "relative",
        width: "100%",
        zIndex: 1,
      }}>
        <Box sx={{
          alignItems: "center",
          alignSelf: "stretch",
          backgroundImage: "url(https://c.animaapp.com/I4tqUSkw/img/contents.png)",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          height: "750px",
          padding: "24px 24px 0px",
          position: "relative",
          width: "100%",
          borderRadius: "35%",
        }}>
          <Box sx={{
            alignItems: "flex-start",
            backgroundColor: "#2f4f68",
            borderRadius: "50px",
            display: "inline-flex",
            padding: "8px 24px",
            margin: "0 auto 0 0",
            position: "relative",
          }}>
            <Typography sx={{
              color: "var(--white)",
              fontFamily: "var(--heading-5-font-family)",
              fontSize: "var(--heading-5-font-size)",
              fontStyle: "var(--heading-5-font-style)",
              fontWeight: "var(--heading-5-font-weight)",
              letterSpacing: "var(--heading-5-letter-spacing)",
              lineHeight: "var(--heading-5-line-height)",
              marginTop: "-1px",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}>
              Camp Freedom 2023
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        alignItems: "flex-start",
        alignSelf: "stretch",
        backgroundColor: "var(--blue, #1479cc)",
        display: "flex",
        flexDirection: "column",
        gap: "88px",
        height: "960px",
        justifyContent: "flex-end",
        marginTop: "-503px",
        padding: "0px 0px 32px",
        position: "relative",
        width: "100%",
        zIndex: 0,
      }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "56px",
            width: "100%",
            padding: isMobile ? "0px 24px" : "0px 100px",
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              width: "100%",
            }}>
              <Typography sx={{
                color: "var(--white)",
                fontFamily: "var(--paragraph-font-family)",
                fontSize: "var(--paragraph-font-size)",
                fontStyle: "var(--paragraph-font-style)",
                fontWeight: "var(--paragraph-font-weight)",
                letterSpacing: "var(--paragraph-letter-spacing)",
                lineHeight: "var(--paragraph-line-height)",
                opacity: 0.5,
                textAlign: "center",
              }}>
                STJDA is a non-profit organization dedicated to empowering families touched by juvenile diabetes,
                <br /> and promoting healthier lifestyles that benefit our entire community.
              </Typography>
              <Button sx={{
                color: "var(--white)",
                fontFamily: "var(--heading-5-font-family)",
                fontSize: "var(--heading-5-font-size)",
                fontStyle: "var(--heading-5-font-style)",
                fontWeight: "var(--heading-5-font-weight)",
                letterSpacing: "var(--heading-5-letter-spacing)",
                lineHeight: "var(--heading-5-line-height)",
              }}>
                Contact Us
              </Button>
            </Box>

            <Box sx={{
              position: "relative",
              width: isMobile ? "100%" : "690px",
              height: "108px",
            }}>
              <Typography sx={{
                color: "var(--white)",
                fontFamily: "var(--heading-3-font-family)",
                fontSize: "var(--heading-3-font-size)",
                fontStyle: "var(--heading-3-font-style)",
                fontWeight: "var(--heading-3-font-weight)",
                letterSpacing: "var(--heading-3-letter-spacing)",
                lineHeight: "var(--heading-3-line-height)",
                position: "absolute",
                left: isMobile ? "0" : "179px",
                top: 0,
                textAlign: "center",
                whiteSpace: "nowrap",
                width: "100%",
              }}>
                Subscribe to Newsletter
              </Typography>
              <TextField
                placeholder="Enter your email address ..."
                variant="outlined"
                sx={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  width: isMobile ? "100%" : "545px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    backgroundColor: "var(--white)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "var(--black)",
                    fontFamily: "var(--heading-6-font-family)",
                    fontSize: "var(--heading-6-font-size)",
                    fontStyle: "var(--heading-6-font-style)",
                    fontWeight: "var(--heading-6-font-weight)",
                    letterSpacing: "var(--heading-6-letter-spacing)",
                    lineHeight: "var(--heading-6-line-height)",
                    opacity: 0.5,
                    textAlign: "center",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  position: "absolute",
                  top: "60px",
                  left: isMobile ? "0" : "545px",
                  backgroundColor: "#2f4f68",
                  borderRadius: "50px",
                  padding: "12px 32px",
                  width: isMobile ? "100%" : "auto",
                  marginTop: isMobile ? "70px" : "0",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>

        <Container maxWidth="lg">
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: isMobile ? "0px 24px" : "0px 100px",
          }}>
            <Box sx={{
              height: "1px",
              backgroundColor: "var(--light-gray)",
              opacity: 0.25,
            }} />
            <Box sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "center" : "flex-start",
              gap: isMobile ? "16px" : "0",
            }}>
              <Typography sx={{
                color: "var(--white)",
                fontFamily: "var(--heading-6-font-family)",
                fontSize: "var(--heading-6-font-size)",
                fontStyle: "var(--heading-6-font-style)",
                fontWeight: "var(--heading-6-font-weight)",
                letterSpacing: "var(--heading-6-letter-spacing)",
                lineHeight: "var(--heading-6-line-height)",
                opacity: 0.5,
                textAlign: isMobile ? "center" : "left",
              }}>
                Copyright © STJDA 2023. All rights reserved.
              </Typography>
              <Typography sx={{
                color: "var(--white)",
                fontFamily: "var(--heading-6-font-family)",
                fontSize: "var(--heading-6-font-size)",
                fontStyle: "var(--heading-6-font-style)",
                fontWeight: "var(--heading-6-font-weight)",
                letterSpacing: "var(--heading-6-letter-spacing)",
                lineHeight: "var(--heading-6-line-height)",
                opacity: 0.5,
                textAlign: isMobile ? "center" : "right",
              }}>
                Privacy Policy | User Policy | Terms & Condition
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};