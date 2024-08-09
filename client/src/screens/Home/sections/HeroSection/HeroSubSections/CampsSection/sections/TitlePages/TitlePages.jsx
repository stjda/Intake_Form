import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export const TitlePages = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'flex-end' },
        justifyContent: { xs: 'flex-start', md: 'space-between' },
        gap: { xs: '24px', md: '0' },
        width: '100%',
        padding: { xs: '16px', md: '24px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: { xs: '100%', md: '60%' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'var(--blue)',
            fontFamily: 'var(--heading-2-font-family)',
            fontSize: { xs: 'var(--heading-3-font-size)', md: 'var(--heading-2-font-size)' },
            fontStyle: 'var(--heading-2-font-style)',
            fontWeight: 'var(--heading-2-font-weight)',
            letterSpacing: 'var(--heading-2-letter-spacing)',
            lineHeight: 'var(--heading-2-line-height)',
            whiteSpace: { xs: 'normal', md: 'nowrap' },
          }}
        >
          Transforming Lives - Through Camp
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'var(--black)',
            fontFamily: 'var(--paragraph-font-family)',
            fontSize: 'var(--paragraph-font-size)',
            fontStyle: 'var(--paragraph-font-style)',
            fontWeight: 'var(--paragraph-font-weight)',
            letterSpacing: 'var(--paragraph-letter-spacing)',
            lineHeight: 'var(--paragraph-line-height)',
            opacity: 0.5,
            whiteSpace: 'normal',
          }}
        >
          See how a camp can make a difference in the world for generations.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'flex-end', md: 'flex-start' },
          gap: '40px',
          width: { xs: '100%', md: 'auto' },
          marginTop: { xs: '24px', md: '0' },
        }}
      >
        {!isMobile && (
          <Box
            component="img"
            src="https://c.animaapp.com/I4tqUSkw/img/left-arrow.svg"
            alt="Left arrow"
            sx={{
              height: 'auto',
              width: 'auto',
              opacity: 0,
              display: { xs: 'none', md: 'block' },
            }}
          />
        )}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src="https://c.animaapp.com/I4tqUSkw/img/arrow.svg"
            alt="Arrow"
            sx={{
              height: { xs: '12px', md: '14.73px' },
              width: { xs: '40px', md: '49px' },
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              backgroundColor: '#1479cc',
              borderRadius: '20px',
              height: { xs: '32px', md: '40px' },
              width: { xs: '32px', md: '40px' },
              marginLeft: '-16px',
              zIndex: 0,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};