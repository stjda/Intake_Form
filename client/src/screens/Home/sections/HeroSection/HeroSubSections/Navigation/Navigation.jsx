import React from "react";
import { Button as MuiButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
    const [anchorElAbout, setAnchorElAbout] = React.useState(null);
    const [anchorElResources, setAnchorElResources] = React.useState(null);
    const [anchorElCamps, setAnchorElCamps] = React.useState(null);
    const navigate = useNavigate();

    const goTo = (address) => {
      navigate(address);
    };

    const handleClick = (event, menuType) => {
      switch(menuType) {
        case "About":
          setAnchorElAbout(event.currentTarget);
          break;
        case "Resources":
          setAnchorElResources(event.currentTarget);
          break;
        case "Camps":
          setAnchorElCamps(event.currentTarget);
          break;
        default:
          break;
      }
    };

    const handleClose = () => {
      setAnchorElCamps(null);
      setAnchorElResources(null);
      setAnchorElAbout(null);
    };

    const styles = {
      navigationWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      },
      navigation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1200px',
        maxWidth: '100%',
        padding: '0 20px',
        boxSizing: 'border-box',
      },
      companyLogo: {
        alignItems: 'center',
        display: 'flex',
        gap: 'auto',
        position: 'relative',
        padding: '15px',
      },
      companyLogo2: {
        backgroundImage: 'url(https://c.animaapp.com/I4tqUSkw/img/screenshot-2024-05-23-at-6-18-1@2x.png)',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
        height: '118px',
        position: 'relative',
        width: '118px',
      },
      menu: {
        height: '26px',
        marginRight: '-14px',
        position: 'relative',
        width: '599px',
      },
      home: {
        // alignItems: 'center',
        // borderBottomStyle: 'solid',
        // borderBottomWidth: '2px',
        // borderColor: 'var(--black)',
        // display: 'flex',
        // justifyContent: 'center',
        left: '142px',
        padding: '0px 0px 2px',
        position: 'absolute',
        top: '0',
        width: '55px',
      },
      textWrapper: {
        color: 'var(--black)',
        fontFamily: 'var(--heading-6-font-family)',
        fontSize: 'var(--heading-6-font-size)',
        fontStyle: 'var(--heading-6-font-style)',
        fontWeight: 'var(--heading-6-font-weight)',
        letterSpacing: 'var(--heading-6-letter-spacing)',
        lineHeight: 'var(--heading-6-line-height)',
        opacity: 0.5,
        position: 'absolute',
      },
      buttonContainer: {
        display: 'flex',
        gap: '10px',
      },
      button: {
        borderRadius: '50px',
        textTransform: 'none',
      },
      buttonCommon: {
        backgroundColor: '#1479cc',
        color: 'var(--light-gray)',
        padding: '6px 12px',
      },
    };

    return (
      <div style={styles.navigationWrapper}>
        <div style={styles.navigation}>
          <div style={styles.companyLogo}>
            <div style={styles.companyLogo2} />
            <div style={styles.menu}>
              <div style={styles.home}>
                <div 
                  style={styles.textWrapper} 
                  onClick={() => window.location.href = 'https://www.stjda.org/camp-freedom-1' } 
                  onMouseEnter={(e) => handleClick(e, "Camps")}>
                    Camps
                  </div>
                <Menu anchorEl={anchorElCamps} open={Boolean(anchorElCamps)} onClose={handleClose}>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/camp-application' }>Camp Application</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/parents-handbook' }>Parents Handbook</MenuItem>
                </Menu>
              </div>
              <a href="https://www.stjda.org/programs" target="_blank" rel="noopener noreferrer" style={{...styles.textWrapper, left: '59px', top: '1px', width: '70px'}}>Programs</a>
              <a href="https://www.stjda.org/events" target="_blank" rel="noopener noreferrer" style={{...styles.textWrapper, left: '0', top: '2px', width: '50px'}}>Events</a>
              <div onMouseLeave={handleClose}>
              <a href="https://example.com/events" target="_blank" rel="noopener noreferrer" 
              onClick={() => window.location.href = 'https://www.stjda.org/resources-1' } 
              style={{...styles.textWrapper, left: '211px', top: '1px', width:  '77px'}} onMouseEnter={(e) => handleClick(e, "Resources")}>Resources</a>
                <Menu anchorEl={anchorElResources} open={Boolean(anchorElResources)} onClose={handleClose}>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/what-is-diabetes'}>What is Diabetes</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/instructional-videos'}>Instructional Videos</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/inspiring-videos'}>Inspiring Videos</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/halloween-guide'}>Halloween Guide</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/504-plan'}>504 Plan</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/travel-checklist'}>Travel Checklist</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/surviving-the-holidays'}>Surviving the Holidays</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/surviving-the-holidays-copy'}>Sick Days Video</MenuItem>
                </Menu>
              </div>
              <a href="https://www.stjda.org/coalition" target="_blank" rel="noopener noreferrer" style={{...styles.textWrapper, left: '300px', top: '1px', width: '66px'}}>Coalition</a>
              <a href="https://www.stjda.org/sponsors" target="_blank" rel="noopener noreferrer" style={{...styles.textWrapper, left: '373px', top: '1px', width: '70px'}}>Sponsors</a>
              <div onMouseLeave={handleClose}>
              <a href="https://www.stjda.org/our-team-2"
                target="_blank" 
                rel="noopener noreferrer" 
                style={{...styles.textWrapper, left: '453px', top: '1px', width: '69px'}} 
                onMouseEnter={(e) => handleClick(e, "About")}>About Us</a>
                <Menu anchorEl={anchorElAbout} open={Boolean(anchorElAbout)} onClose={handleClose} onMouseLeave={() => handleClose()}>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/mission' }>Mission</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/staff-and-board' }>Staff and Board</MenuItem>
                  <MenuItem onClick={() => window.location.href = 'https://www.stjda.org/covid-19-updates' }>Updates for Covid-19</MenuItem>
                </Menu>
              </div>
              <a href="https://www.stjda.org/contact" target="_blank" rel="noopener noreferrer" style={{...styles.textWrapper, left: '524px', top: '1px', width: '61px'}}>Contact</a>
            </div>
          </div>
          <div style={styles.buttonContainer}>
            <MuiButton 
              style={{...styles.button, ...styles.buttonCommon}} 
              onClick={() => window.location.href = 'https://www.stjda.org/volunteers' } 
              variant="contained">Volunteer
            </MuiButton>
            <MuiButton 
              style={{...styles.button, ...styles.buttonCommon}} 
              onClick={() => window.location.href = 'https://www.stjda.org/donate' } 
              variant="contained">Donate
            </MuiButton>
            <MuiButton 
              style={{...styles.button, ...styles.buttonCommon}} 
              onClick={() => window.location.href = 'https://www.stjda.org/boardlogin' } 
              variant="contained">Board Login
            </MuiButton>
          </div>
        </div>
      </div>
    );
};