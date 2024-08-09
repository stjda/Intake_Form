import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export const PhotoNumbers = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{
      alignItems: "flex-start",
      alignSelf: "stretch",
      display: "flex",
      flex: "0 0 auto",
      flexDirection: "column",
      gap: { xs: "20px", sm: "30px", md: "40px" },
      position: "relative",
      width: "100%"
    }}>
      <Box sx={{
        width: "100%",
        position: "relative",
        paddingTop: "56.25%", // 16:9 aspect ratio
        
      }}>
        <img 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: '25px'
          }} 
          alt="Photo" 
          src="https://c.animaapp.com/I4tqUSkw/img/photo.png" 
        />
      </Box>
      <Box sx={{
        alignItems: { xs: "flex-start", md: "center" },
        alignSelf: "stretch",
        display: "flex",
        flex: "0 0 auto",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: { sm: "wrap", md: "nowrap" },
        justifyContent: { xs: "flex-start", sm: "space-between" },
        position: "relative",
        width: "100%",
        gap: { xs: "20px", sm: "30px", md: "0" }
      }}>
        {[
          { value: "$1M+", label: "Fund Raised" },
          { value: "500+", label: "Dedicated Volunteers" },
          { value: "100%", label: "Delivered Donations" },
          { value: "250K", label: "Charity Participation" }
        ].map((item, index) => (
          <React.Fragment key={index}>
            <Box sx={{
              alignItems: "flex-start",
              display: "inline-flex",
              flex: { 
                xs: "1 1 100%", 
                sm: "0 0 calc(50% - 15px)",
                md: "0 0 auto" 
              },
              flexDirection: "column",
              gap: "8px",
              position: "relative"
            }}>
              <Typography sx={{
                color: "var(--blue)",
                fontFamily: "var(--heading-3-font-family)",
                fontSize: "var(--heading-3-font-size)",
                fontStyle: "var(--heading-3-font-style)",
                fontWeight: "var(--heading-3-font-weight)",
                letterSpacing: "var(--heading-3-letter-spacing)",
                lineHeight: "var(--heading-3-line-height)",
                marginTop: "-1px",
                position: "relative",
                whiteSpace: "nowrap",
                width: "fit-content"
              }}>
                {item.value}
              </Typography>
              <Typography sx={{
                color: "var(--black)",
                fontFamily: "var(--paragraph-font-family)",
                fontSize: "var(--paragraph-font-size)",
                fontStyle: "var(--paragraph-font-style)",
                fontWeight: "var(--paragraph-font-weight)",
                letterSpacing: "var(--paragraph-letter-spacing)",
                lineHeight: "var(--paragraph-line-height)",
                opacity: 0.75,
                position: "relative",
                whiteSpace: "nowrap",
                width: "fit-content"
              }}>
                {item.label}
              </Typography>
            </Box>
            {index < 3 && !isSmallScreen && !isMediumScreen && (
              <Box sx={{
                backgroundColor: "#1479cc",
                borderRadius: "6px",
                height: "12px",
                width: "12px",
              }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};