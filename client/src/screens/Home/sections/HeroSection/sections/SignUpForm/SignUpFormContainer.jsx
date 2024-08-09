import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import your camp form components here
import { CampFreedomForm, RoboticsCampForm, NatureCampForm } from "./IntakeFormPages";

const camps = [
  {
    name: "Camp Freedom",
    description: "A camp for young freedom fighters",
    component: <CampFreedomForm />
  },
  {
    name: "Robotics Camp",
    description: "Learn to build and program robots",
    component: <RoboticsCampForm />
  },
  {
    name: "Nature Camp",
    description: "Explore the great outdoors",
    component: <NatureCampForm />
  }
];

export const CampRegistrationAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Camp Registration Forms
      </Typography>
      {camps.map((camp, index) => (
        <Accordion
          key={camp.name}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {camp.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{camp.description}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {camp.component}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};