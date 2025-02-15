
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Grid2, Card, Dialog, DialogTitle, DialogContent, DialogActions, Typography,
  TextField, Select, InputLabel, MenuItem, FormControl, Box, Container, Paper, Stack
} from '@mui/material';
import { nameMedicine, addMyMedicationReminder, updateAllMedicineReminder, allMedicationReminder, deleteMyMedicationReminder, updateMyMedicationReminder, sendReminder } from '../redux/slicers/medicineRemainderSlicer';

const MedicineReminder = () => {
  const dispatch = useDispatch();
  const [days, setDays] = useState("");
  const [times, setTimes] = useState("");
  const [medication, setMedication] = useState("");
  const [medicationReminderId, setMedicationReminderId] = useState(null);
  const [selectedMedicationReminder, setSelectedMedicationReminder] = useState(null);
  const [deleteMedicationReminder, setDeleteMedicationReminder] = useState(null);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [showConfirmReminderDialog, setShowConfirmReminderDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showForm, setShowForm] = useState(false);  
  const status = useSelector((state) => state.medicine.status);
  const allNameMedicine = useSelector((state) => state.medicine.allNameMedicine || []);
  const allMedicationReminders = useSelector((state) => state.medicine.allMedicineReminder || []);
  const user = JSON.parse(localStorage.getItem('userLogin'));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(nameMedicine());
      dispatch(allMedicationReminder(user.id));
    }
  }, [dispatch, status]);

  const handleAddMedicationReminder = async (e) => {
    e.preventDefault();
    const newMedicationReminder = {
      medication: medication,
      date: Date.now(),
      days: days,
      times: times,
      amount: amount,
      myUser: { id: user.id }
    };
    try {
      const response = await dispatch(addMyMedicationReminder(newMedicationReminder));
      const updatedMedicationReminders = [...allMedicationReminders, response.payload];
      dispatch(updateAllMedicineReminder(updatedMedicationReminders));
      setDays("");
      setTimes("");
      setMedication("");
      setAmount(0);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteMyMedicationReminder(deleteMedicationReminder.id));
      const updatedMedicationReminders = allMedicationReminders.filter(reminder => reminder.id !== deleteMedicationReminder.id);
      dispatch(updateAllMedicineReminder(updatedMedicationReminders));
      setShowConfirmDeleteDialog(false);
      setDeleteMedicationReminder(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    const medicationReminderUpdate = {
      id: medicationReminderId,
      medication: medication,
      date: Date.now(),
      days: days,
      times: times,
      amount: amount,
      myUser: { id: user.id }
    };
    try {
      const response = await dispatch(updateMyMedicationReminder(medicationReminderUpdate));
      const updatedMedicationReminders = allMedicationReminders.filter(reminder => reminder.id !== medicationReminderId);
      updatedMedicationReminders.push(response.payload);
      dispatch(updateAllMedicineReminder(updatedMedicationReminders));
      setDays("");
      setTimes("");
      setMedication("");
      setAmount(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendReminder = async () => {
    const now = new Date();
    const currentHour = now.getHours();
    let targetDate;

    if (currentHour >= 0 && currentHour < 8) {
      targetDate = new Date(now.setHours(8, 0, 0, 0));
    } else {
      targetDate = new Date(now.setDate(now.getDate() + 1));
      targetDate.setHours(8, 0, 0, 0);
    }

    const scheduledMail = {
      userId: user.id,
      idYourObject: selectedMedicationReminder.id,
      recipient: "",
      subject: `Reminder for ${medication}`,
      msgBody: `Don't forget to take your ${medication} (Amount: ${amount}).`,
      sendTime: targetDate,
      endTimeToSend: new Date(targetDate.getTime() + selectedMedicationReminder.days * 24 * 60 * 60 * 1000),
      repeatCount: selectedMedicationReminder.times * selectedMedicationReminder.days,
      myInterval: 14 / selectedMedicationReminder.times,
      timesInDay: selectedMedicationReminder.times
    };

    try {
      const response = await dispatch(sendReminder(scheduledMail));
      console.log(response);
      alert("נשלח בהצלחה")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      <Box sx={{ marginBottom: 2, textAlign: 'center' ,marginTop:'4%'}}>
        <Typography variant="h3" gutterBottom sx={{ color: '#2c6e49' }}>התזכורות שלך</Typography>
      </Box>

      {/* add reminder/close window */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ marginBottom: 3 }}
      >
        {showForm ? 'Cancel Add Medication' : 'Add Medication'}
      </Button>

      {/* if showForm-true*/}
      {showForm &&
        (<Dialog open={showForm} onClose={() => setShowForm(false)} sx={{ backgroundColor: 'rgb(250, 245, 235)' }}>
          <DialogTitle>Add Medication Reminder</DialogTitle>
          <DialogContent>
            <form onSubmit={handleAddMedicationReminder}>
              <Grid2 container spacing={2} direction="column">
                <Grid2 item>
                  <TextField
                    label="Medication"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                    fullWidth
                    required
                    select
                  >
                    <MenuItem value="">Select Medicine</MenuItem>
                    {allNameMedicine.map((medicine) => (
                      <MenuItem key={medicine.id} value={medicine.name}>
                        {medicine.name}
                      </MenuItem>))}
                  </TextField>
                </Grid2>

                <Grid2 item>
                  <TextField
                    label="Days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    fullWidth
                    type="number"
                    min="1"
                    required
                  />
                </Grid2>

                <Grid2 item>
                  <TextField
                    label="Times per Day"
                    value={times}
                    onChange={(e) => setTimes(e.target.value)}
                    fullWidth
                    type="number"
                    min="1"
                    required
                  />
                </Grid2>

                <Grid2 item>
                  <TextField
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    type="number"
                    min="1"
                    required
                  />
                </Grid2>

                <Grid2 item>
                  <Button variant="contained" type="submit" fullWidth>
                    Add Medication Reminder
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForm(false)} variant="contained" color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>)}

      {/* Medication Reminders List */}
      <Grid2 container spacing={2}>
        {allMedicationReminders.map((medicationReminder) => (
          <Grid2 item xs={12} sm={6} md={4} key={medicationReminder.id}>
            <Card sx={{ padding: 2, backgroundColor: 'rgb(250, 245, 235)' }}>
              <Typography variant="h6">{medicationReminder.medication}</Typography>
              <Typography>Amount: {medicationReminder.amount}</Typography>
              <Typography>Times: {medicationReminder.times}</Typography>
              <Typography>Days: {medicationReminder.days}</Typography>
              <Stack direction="row" spacing={2} marginTop={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setDeleteMedicationReminder(medicationReminder);
                    setShowConfirmDeleteDialog(true);
                  }}
                >
                  Delete
                </Button>
                <Button
                  sx={{ color: 'rgb(47, 94, 51)' }}
                  variant="outlined"
                  onClick={() => {
                    setShowUpdateDialog(true);
                    setMedicationReminderId(medicationReminder.id);
                    setDays(medicationReminder.days);
                    setTimes(medicationReminder.times);
                    setMedication(medicationReminder.medication);
                  }}
                >
                  Update
                </Button>
                <Button
                  sx={{ color: 'rgb(5, 173, 19)' }}
                  variant="outlined"
                  onClick={() => {
                    setSelectedMedicationReminder(medicationReminder);
                    setShowConfirmReminderDialog(true);
                  }}
                >
                  Send Reminder
                </Button>
              </Stack>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/*delete */}
      <Dialog open={showConfirmDeleteDialog} onClose={() => setShowConfirmDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{deleteMedicationReminder?.medication}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>


      {/* send reminder */}
      <Dialog open={showConfirmReminderDialog} onClose={() => setShowConfirmReminderDialog(false)}>
        <DialogTitle>Confirm Send Reminder</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to send a reminder for "{selectedMedicationReminder?.medication}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmReminderDialog(false)}>Cancel</Button>
          <Button onClick={handleSendReminder} variant="contained" color="primary">Send Reminder</Button>
        </DialogActions>
      </Dialog>


      {/* update */}
      <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)}>
        <DialogTitle>Update Medication</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              sx={{ margin: '5%' }}
              label="Times per Day"
              value={times}
              onChange={(e) => setTimes(e.target.value)}
              fullWidth
              type="number"
              min="1"
            />
            <TextField
              sx={{ margin: '5%' }}
              label="Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              fullWidth
              type="number"
              min="1"
            />
            <TextField
              sx={{ margin: '5%' }}
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              type="number"
              min="1"
            />
            <InputLabel id="update-medication-label">Medication</InputLabel>
            <Select
              sx={{ margin: '5%' }}
              labelId="update-medication-label"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              fullWidth
              margin="normal"
            >
              {allNameMedicine.map((medicine) => (
                <MenuItem key={medicine.id} value={medicine.name}>{medicine.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateDialog(false)}>Close</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MedicineReminder;


