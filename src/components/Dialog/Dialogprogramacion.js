import { Dialog } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Form } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import Datepicker from "react-tailwindcss-datepicker";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  initialValues,
  validationSchema,
} from "@/layouts/LabsLayout/formsFecha/programacionForm.form";
import { TimePicker } from "@mui/x-date-pickers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Dialogprogramacion({
  openDialogProg,
  handleCloseDialogProg,
  lab,
  valueDateP,
  setValueDateP,
}) {
  const [valueTimerInic, setValueTimerInic] = React.useState(dayjs(""));
  const [valueTimerFin, setValueTimerFin] = React.useState(dayjs(""));
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(
        valueDateP.startDate,
        formValue.actividad,
        valueTimerInic.hour(),
        valueTimerInic.minute(),
        valueTimerFin.hour(),
        valueTimerFin.minute()
      );
    },
  });

  return (
    <Dialog
      open={openDialogProg}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogProg}
      aria-describedby="alert-dialog-slide-description"
    >
      <Form onSubmit={formik.handleSubmit}>
        <DialogContent className="h-[42rem] w-[42rem]">
          <div className="py-6 text-xl flex items-center justify-center">
            {" "}
            <p>
              Programación de monitoreo en {""}
              <b>{lab}</b>
            </p>
          </div>
          <div className="flex justify-start pb-2"> Fecha</div>

          <Datepicker
            placeholder={"Fecha programación"}
            containerClassName=""
            inputClassName="border-4 border-black hover:border-orange-400 rounded-lg py-3.5 h-22"
            primaryColor={"amber"}
            toggleClassName="absolute bg-orange-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            displayFormat={"DD/MM/YYYY"}
            showShortcuts={true}
            showFooter={true}
            asSingle={true}
            useRange={false}
            value={valueDateP}
            onChange={setValueDateP}
          />

          <div className="pt-16 ">
            <div className=" flex justify-start pb-2">Hora Inicio</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={valueTimerInic}
                onChange={(newValue) => setValueTimerInic(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="pt-16 ">
            <div className=" flex justify-start pb-2">Hora Término</div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={valueTimerFin}
                onChange={(newValue) => setValueTimerFin(newValue)}
              />
            </LocalizationProvider>
          </div>

          <div className="w-[38rem] pt-16">
            <div className=" flex justify-start pb-2"> Actividad</div>
            <Form.Input
              name="actividad"
              type="text"
              placeholder="Actividad"
              value={formik.values.actividad}
              onChange={formik.handleChange}
              error={formik.errors.actividad}
            />
          </div>
        </DialogContent>

        <DialogActions className="mb-4 mr-4">
          <Button type="submit" loading={formik.isSubmitting}>
            Programar monitoreo
          </Button>
          <Button
            type="button"
            className="big ui basic button border"
            onClick={handleCloseDialogProg}
          >
            Salir
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}