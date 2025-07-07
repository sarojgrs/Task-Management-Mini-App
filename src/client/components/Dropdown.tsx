import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface Option<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  fontStyle?: object;
  size?: "small" | "medium";
  placeholder?: string;
}

function Dropdown<T extends string | number>({
  value,
  options,
  onChange,
  disabled = false,
  fontStyle = {},
  size = "small",
  placeholder,
}: DropdownProps<T>) {
  return (
    <Select
      fullWidth
      size={size}
      value={value}
      onChange={(e: SelectChangeEvent<T>) => onChange(e.target.value as T)}
      disabled={disabled}
      sx={fontStyle}
    >
      {placeholder && (
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
      )}
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Dropdown;
