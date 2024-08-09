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
import { RegistrationForm } from "./IntakeFormPages";

// Array of camp objects, each containing name, description, and component
const camps = [
  {
    name: "Register Here",
    description: "A camp for young freedom fighters",
    component: <RegistrationForm />
  },
  // Add more camps here as needed
];

export const CampRegistrationAccordion = () => {
  // State to manage which panels are expanded
  // Initialize with an object where each panel is set to true (opened)
  const [expandedPanels, setExpandedPanels] = useState(
    camps.reduce((acc, _, index) => ({ ...acc, [`panel${index}`]: true }), {})
  );

  // Function to handle expanding/collapsing panels
  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanels(prev => ({ ...prev, [panel]: isExpanded }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Camp Registration
      </Typography>
      {camps.map((camp, index) => (
        <Accordion
          key={camp.name}
          // Set expanded prop based on the state of this specific panel
          expanded={expandedPanels[`panel${index}`]}
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

