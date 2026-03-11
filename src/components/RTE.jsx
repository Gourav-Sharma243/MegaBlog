import { Controller } from 'react-hook-form';
import CustomEditor from './CustomEditor';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CustomEditor
            value={value || defaultValue}
            onChange={onChange}
            placeholder={`Enter ${label ? label.toLowerCase() : 'content'} here...`}
          />
        )}
      />
    </div>
  );
}
