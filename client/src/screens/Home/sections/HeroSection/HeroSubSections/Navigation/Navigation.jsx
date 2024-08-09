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
      navigation: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '-46px',
        position: 'relative',
        width: 'auto',
      },
      companyLogo: {
        alignItems: 'center',
        display: 'flex',
        gap: 'auto',
        position: 'relative',
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
        alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: '2px',
        borderColor: 'var(--black)',
        display: 'flex',
        justifyContent: 'center',
        left: '142px',
        padding: '0px 0px 2px',
        position: 'absolute',
        top: '0',
        width: '55px',
      },
      textWrapper4: {
        color: 'var(--black)',
        fontFamily: 'var(--heading-5-font-family)',
        fontSize: 'var(--heading-5-font-size)',
        fontStyle: 'var(--heading-5-font-style)',
        fontWeight: 'var(--heading-5-font-weight)',
        letterSpacing: 'var(--heading-5-letter-spacing)',
        lineHeight: 'var(--heading-5-line-height)',
        marginTop: '-2px',
        position: 'relative',
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
      button: {
        borderRadius: '30%',
        textTransform: 'none',
      },
      buttonCommon: {
        backgroundColor: '#1479cc',
        display: 'flex',
        color: 'var(--light-gray)',
        padding: '2px',
      },
    };

    return (
      <div style={styles.navigation}>
        <div style={styles.companyLogo}>
          <div style={styles.companyLogo2} />
          <div style={styles.menu}>
            <div style={styles.home}>
              <div style={styles.textWrapper4} onMouseEnter={(e) => handleClick(e, "Camps")}>Camps</div>
              <Menu anchorEl={anchorElCamps} open={Boolean(anchorElCamps)} onClose={handleClose}>
                <MenuItem onClick={() => goTo('/example-path')}>Camp Application</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Parents Handbook</MenuItem>
              </Menu>
            </div>
            <div style={{...styles.textWrapper, left: '59px', top: '1px', width: '70px'}}>Programs</div>
            <div style={{...styles.textWrapper, left: '0', top: '2px', width: '50px'}}>Events</div>
            <div onMouseLeave={handleClose}>
              <div style={{...styles.textWrapper, left: '211px', top: '1px', width: '77px'}} onMouseEnter={(e) => handleClick(e, "Resources")}>Resources</div>
              <Menu anchorEl={anchorElResources} open={Boolean(anchorElResources)} onClose={handleClose}>
                <MenuItem onClick={() => goTo('/example-path')}>What is Diabetes</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Instructional Videos</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Inspiring Videos</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Halloween Guide</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>504 Plan</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Travel Checklist</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Surviving the Holidays</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Sick Days Video</MenuItem>
              </Menu>
            </div>
            <div style={{...styles.textWrapper, left: '300px', top: '1px', width: '66px'}}>Coalition</div>
            <div style={{...styles.textWrapper, left: '373px', top: '1px', width: '70px'}}>Sponsors</div>
            <div onMouseLeave={handleClose}>
              <div style={{...styles.textWrapper, left: '453px', top: '1px', width: '69px'}} onMouseEnter={(e) => handleClick(e, "About")}>About Us</div>
              <Menu anchorEl={anchorElAbout} open={Boolean(anchorElAbout)} onClose={handleClose} onMouseLeave={() => handleClose()}>
                <MenuItem onClick={() => goTo('/example-path')}>Mission</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Staff and Board</MenuItem>
                <MenuItem onClick={() => goTo('/example-path')}>Updates for Covid-19</MenuItem>
              </Menu>
            </div>
            <div style={{...styles.textWrapper, left: '524px', top: '1px', width: '61px'}}>Contact</div>
          </div>
        </div>
        <MuiButton style={{...styles.button, ...styles.buttonCommon, width: '84px'}} variant="contained">Volunteer</MuiButton>
        <MuiButton style={{...styles.button, ...styles.buttonCommon, width: '71px'}} variant="contained">Donate</MuiButton>
        <MuiButton style={{...styles.button, ...styles.buttonCommon, width: '99px'}} variant="contained">Board Login</MuiButton>
      </div>
    );
};