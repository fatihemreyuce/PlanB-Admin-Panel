export function objectToFormData<T extends Record<string, unknown>>(
  obj: T
): FormData {
  const formData = new FormData();

  const append = (formKey: string, value: unknown) => {
    if (value === null || value === undefined) return;

    if (value instanceof File) {
      formData.append(formKey, value);
      return;
    }

    if (value instanceof FileList) {
      Array.from(value).forEach((file) => formData.append(formKey, file));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        // Use bracket notation for arrays: key[index]
        append(`${formKey}[${index}]`, item as unknown);
      });
      return;
    }

    if (typeof value === "object") {
      Object.entries(value as Record<string, unknown>).forEach(
        ([childKey, childVal]) => {
          // Use dot notation for nested object fields: key.child
          append(`${formKey}.${childKey}`, childVal);
        }
      );
      return;
    }

    // primitives
    const stringified = String(value);
    if (stringified !== "") formData.append(formKey, stringified);
  };

  Object.entries(obj).forEach(([key, value]) => append(key, value));

  return formData;
}
