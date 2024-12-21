import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import { Field, FieldArray } from 'formik';
import { TextField, DatePicker } from 'formik-mui';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ProjectScheduling = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Field
          component={DatePicker}
          name="startDate"
          label="Start Date"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Field
          component={DatePicker}
          name="endDate"
          label="End Date"
          fullWidth
          required
        />
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Project Milestones
        </Typography>
        
        <FieldArray name="milestones">
          {({ push, remove, form }) => (
            <Grid container spacing={2}>
              {form.values.milestones.map((_, index) => (
                <Grid item xs={12} key={index} container spacing={2} alignItems="center">
                  <Grid item xs={5}>
                    <Field
                      component={TextField}
                      name={`milestones.${index}.description`}
                      label="Milestone Description"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      component={DatePicker}
                      name={`milestones.${index}.date`}
                      label="Milestone Date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => remove(index)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <IconButton onClick={() => push({ description: '', date: null })}>
                  <AddCircleOutlineIcon /> Add Milestone
                </IconButton>
              </Grid>
            </Grid>
          )}
        </FieldArray>
      </Grid>
    </Grid>
  );
};

export default ProjectScheduling;
