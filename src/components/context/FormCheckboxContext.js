import React, { createContext, useState } from "react";

export const FormCheckboxContext = createContext();


const FormCheckboxContextProvider = ({ children }) => {
	const [formData, setFormData] = useState([]);

	return (
		<FormCheckboxContext.Provider
			value={{
				formData,
				setFormData,

			}}
		>
			{children}
		</FormCheckboxContext.Provider>
	);
};

export default FormCheckboxContextProvider;
