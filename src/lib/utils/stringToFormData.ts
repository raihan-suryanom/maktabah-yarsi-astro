const stringToFormData = (paramString: string) => {
  const formData = new FormData();
  const params = new URLSearchParams(paramString);

  for (const [key, value] of params.entries()) {
    formData.append(key, value);
  }

  return formData;
};

export default stringToFormData;
