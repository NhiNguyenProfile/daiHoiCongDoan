import PropTypes from "prop-types";
import { useState } from "react";
// form
import { useForm, Controller } from "react-hook-form";
// @mui
import {
  Card,
  Stack,
  Divider,
  Popover,
  Checkbox,
  MenuItem,
  IconButton,
  CardHeader,
  FormControlLabel,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, subheader, list, ...other }) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ["2"],
    },
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <IconButton aria-label="settings">
            
          </IconButton>
        }
      />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task)
              ? field.value.filter((value) => value !== task)
              : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => field.onChange(onSelected(task.id))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
};

function TaskItem({ task, checked, onChange }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
  };


  const handleEdit = () => {
    handleCloseMenu();
  };

  const handleDelete = () => {
    handleCloseMenu();
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: "text.disabled",
          textDecoration: "line-through",
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.label}
        sx={{ flexGrow: 1, m: 0 }}
      />

      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={handleOpenMenu}
      >
        <Iconify icon={"eva:more-vertical-fill"} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" ,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >

        <MenuItem onClick={handleEdit}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Sửa đổi
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
    </Stack>
  );
}
