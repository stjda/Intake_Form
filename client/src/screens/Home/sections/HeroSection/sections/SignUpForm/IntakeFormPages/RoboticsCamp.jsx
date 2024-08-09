import React, { useState } from 'react';
import { 
  TextField, Button, Stepper, Step, StepLabel, FormControl, 
  InputLabel, Select, MenuItem, FormControlLabel, Checkbox,
  Typography, Box
} from '@mui/material';
import { formQuestions } from '../../../../../../../assets/formQuestions';

export const RoboticsCampForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return (
          <TextField
            fullWidth
            margin="normal"
            name={field.name}
            label={field.label}
            type={field.type}
            InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
            onChange={handleInputChange}
            value={formData[field.name] || ''}
          />
        );
      case 'textarea':
        return (
          <TextField
            fullWidth
            margin="normal"
            name={field.name}
            label={field.label}
            multiline
            rows={4}
            onChange={handleInputChange}
            value={formData[field.name] || ''}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              multiple={field.multiple}
              onChange={handleInputChange}
              value={formData[field.name] || (field.multiple ? [] : '')}
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'checkbox':
        return (
          <Box>
            <Typography variant="subtitle1">{field.label}</Typography>
            {field.options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    name={`${field.name}.${option.value}`}
                    onChange={handleInputChange}
                    checked={formData[`${field.name}.${option.value}`] || false}
                  />
                }
                label={option.label}
              />
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  const renderStep = (step) => {
    const section = formQuestions[step];
    return (
      <>
        <Typography variant="h6">{section.section}</Typography>
        {section.fields.map((field) => renderField(field))}
      </>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
      Robotics Camp Registration Form
      </Typography>
      <Stepper activeStep={activeStep}>
        {formQuestions.map((section) => (
          <Step key={section.section}>
            <StepLabel>{section.section}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {renderStep(activeStep)}
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
          <Button onClick={activeStep === formQuestions.length - 1 ? () => console.log(formData) : handleNext}>
            {activeStep === formQuestions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
