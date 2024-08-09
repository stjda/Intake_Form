import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  TextField
} from '@mui/material';
import styled from "styled-components";
import { Button as MuiButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CtaFooterSection } from '../CtaFooterSection';
import { Navigation } from '../HeroSection/HeroSubSections/Navigation';
import { TitleTextsButton } from '../HeroSection/HeroSubSections/TitleTextButtons';
import { CampRegistrationAccordion } from '../../sections/HeroSection/HeroSubSections/SignUpForm/index';
import { Card } from '../../../../components/Card'
// import { termsAndConditions } from '../../../../assets/terms';


const steps = ['Personal Information', 'Camp Selection', 'Review & Submit'];

const campInfo = [
  {
    name: 'Residential Camp',
    description: 'Experience a full immersion in camp life with our residential program. Stay overnight, make new friends, and enjoy a wide range of activities.',
  },
  {
    name: 'Science Camp',
    description: 'Explore the wonders of science through hands-on experiments, exciting projects, and engaging lectures from expert instructors.',
  },
  {
    name: 'Robotics Camp',
    description: 'Build and program your own robots in this cutting-edge camp. Learn about engineering, coding, and artificial intelligence.',
  },
  {
    name: 'Nature Camp',
    description: 'Connect with the great outdoors in our nature camp. Learn about local ecosystems, wildlife, and conservation efforts.',
  },
];
const termsAndConditions = [
  {
    english: "I/We hereby give my/our consent for my camper to attend and participate in all activities of Camp Freedom and hereby agree to hold harmless Camp Freedom and/ or its sponsors, its agents, servants or employees from any liability of whatsoever nature and injuries, sickness or other damages suffered by us or camper during his/her/their stay at Camp Freedom and by any act of omission of said organization, their agents, servants or employees.",
    spanish: "Por la presente, doy mi consentimiento para que mi campista asista y participe en todas las actividades de Camp Freedom y por la presente acepto eximir de toda responsabilidad a Camp Freedom y/o a sus patrocinadores, agentes, sirveintes, y empleados de cualquier tipo de responsabilidad, lesiones, y enfermedad y otros daños sufridos por nosotros o campista durante su estancia en Camp Freedom y por cualquier acto de omisión de dicha organización, sus agentes, sirvientes y empleados."
  },
  {
    english: "I/We authorize South Texas Juvenile Diabetes Association (STJDA) to use my child's photo/likeness to promote youth events, publicize the youth program, and/or fund-raise for South Texas Juvenile Diabetes Association.",
    spanish: "Autorizo a la Asociación de Diabetes Juvenil del Sur de Texas (STJDA) a usar la foto/semejanza de mi hijo para promover eventos juveniles, divulgar el programa juvenil y/o recaudar fondos para la Asociación de Diabetes Juvenil del Sur de Texas."
  },
  // Add more terms here...
];
export const CampRegistrationPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCamps, setSelectedCamps] = useState({});
  const [email, setEmail] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [consent, setConsent] = useState(false)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCamps({});
  };

  const handleCampChange = (event) => {
    setSelectedCamps({
      ...selectedCamps,
      [event.target.name]: event.target.checked,
    });
  };

  const getSelectedCampNames = () => {
    return Object.entries(selectedCamps)
      .filter(([_, isSelected]) => isSelected)
      .map(([campName, _]) => campName);
  };

  return (
    <>
        <Box sx={{  
          alignItems: "flex-start",
          alignSelf: "stretch",
          display: "flex",
          flex: '0 0 auto',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: "0px 10px",
          position: "relative",
          width: "100%"  
      }}>
      <Navigation />
      <TitleTextsButton />
    </Box>
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Summer Camp Registration
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Learn More About Our Camps
          </Typography>
    <StyledItemsWrapper className="items-wrapper">
      <Card
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo science-camp"
        property1="ver-1"
        text="Empowerment Through Education at Camp"
        text1="Through interactive, supportive, and fun learning experiences, we help each camper to understand their condition, and achieve their goals."
        textClassName="text-content"
      />
      <Card
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo nature-camp"
        property1="ver-1"
        text="Be Part of Something Bigger"
        text1="We ensure that no child is left behind because of Join us in this crucial mission—because every child deserves the right to a healthy future."
        textClassName="text-content"
      />

    <Card

        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo residential-camp"
        property1="ver-1"
        text="A Summer Experience Where Every Child Thrives"
        text1="Our mission is focused on breaking down barriers to diabetes management education for children, empowering youth with knowledge is the key."
        textClassName="text-content"
      />
      <Card
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo robotics-camp"
        property1="ver-1"
        text="Empowering Youth through Education for All"
        text1="By equipping children and their families with essential skills and knowledge, we're not just managing diabetes—we're transforming lives."
        textClassName="text-content"
      />
    </StyledItemsWrapper>
        </Box>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Please fill out your personal information.
                </Typography>
                <CampRegistrationAccordion />
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Select your desired camps:
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Available Camps (Select all that apply)</FormLabel>
                  <FormGroup>
                    {campInfo.map((camp) => (
                      <FormControlLabel
                        key={camp.name}
                        control={
                          <Checkbox
                            checked={!!selectedCamps[camp.name]}
                            onChange={handleCampChange}
                            name={camp.name}
                          />
                        }
                        label={camp.name}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>
            )}
            {activeStep === 2 && (
              <Box className="p-4">
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-4">
                    Please review your information and submit.
                  </Typography>
                  <Typography variant="subtitle1" className="mb-2">
                    Selected Camps:
                  </Typography>
                  <ul>
                    {getSelectedCampNames().map((campName) => (
                      <li key={campName}>{campName}</li>
                    ))}
                  </ul>
                  {getSelectedCampNames().length === 0 && (
                    <Typography className="text-red-500">
                      Please select at least one camp before proceeding.
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                  />
                  <TextField
                    fullWidth
                    label="Legal Guardian Name"
                    variant="outlined"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="mb-4"
                  />
                  <Box 
             
                    sx={{
                      height: '200px',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555',
                      },
                    }}
                  >
                    {termsAndConditions.map((term, index) => (
                      <Box key={index} className="mb-4">
                        <Typography variant="body2" className="mb-2">
                          {term.english}
                        </Typography>
                        <Typography variant="body2" className="mb-2 italic">
                          {term.spanish}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                    }
                    label="I agree to the terms and conditions"
                  />
                </Grid>
              </Grid>
              <Button 
                variant="contained" 
                color="primary" 
                className="mt-4"
                disabled={!email || !guardianName || !consent || getSelectedCampNames().length === 0}
                // onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button 
                onClick={handleNext}
                disabled={activeStep === 1 && getSelectedCampNames().length === 0}
              >
                {/* this is the outer next button */}
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
    <CtaFooterSection/>
    </>
  );
};

const StyledItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .card {
    flex: 1 1 calc(50% - 10px);
    min-width: 300px;
    box-shadow: 0px 4px 4px #00000040;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .photo {
    background-position: 50% 50%;
    background-size: cover;
    height: 60%;
    width: 100%;
  }

  .science-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-6@2x.png);
  }

  .nature-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-7@2x.png);
  }

    .residential-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-4@2x.png) !important;
  }

  .robotics-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-5@2x.png) !important;
  }

  .button {
    background-color: var(--blue);
    padding: 8px 24px;
    margin-top: auto;
    align-self: flex-start;
    margin-left: 10px
  }

  @media (max-width:1000px) {
    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;
    .card {
      flex: 1 1 100%;
    }
  }
`;